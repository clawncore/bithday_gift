﻿import { randomUUID } from "crypto";
import { prisma } from "./prismaClient";
import { supabase } from "./supabaseClient";

// Define the interfaces directly instead of importing from JS file
interface Token {
  id: string;
  used: boolean;
  createdAt: Date;
  openedAt: Date | null;
  expiresAt: Date | null;
}

interface GiftContent {
  recipientName: string;
  craigApology: {
    shortMessage: string;
    fullMessage: string;
    photoUrl?: string;
  };
  simbisaiApology: {
    shortMessage: string;
    fullMessage: string;
    photoUrl?: string;
  };
  media: any[];
}

// Simplified reply interface for our use case
export interface SimpleReply {
  choice: "yes" | "need_time";
  message: string;
  timestamp: Date;
}

export interface IStorage {
  getToken(id: string): Promise<(Token & { content: GiftContent }) | undefined>;
  createToken(content: GiftContent): Promise<string>;
  markTokenUsed(id: string, openedAt: Date): Promise<void>;
  saveReply(token: string, choice: "yes" | "need_time", message: string): Promise<void>;
  // Updated method to get simplified replies
  getReplies(token: string): Promise<SimpleReply[] | undefined>;
}

export class MemStorage implements IStorage {
  private tokens: Map<string, Token & { content: GiftContent }>;
  private replies: Map<string, SimpleReply[]>;

  constructor() {
    this.tokens = new Map();
    this.replies = new Map();
    this.initializeSampleToken();
  }

  private initializeSampleToken() {
    try {
      const sampleContent: GiftContent = {
        recipientName: "Jane Doe",
        craigApology: {
          shortMessage: "Dearest Jane Doe, Happy Birthday! May this new year bring you endless joy and happiness. With all my love, John Doe",
          fullMessage: "Dearest Jane Doe, Happy Birthday! May this new year bring you endless joy and happiness. With all my love, John Doe",
          photoUrl: undefined,
        },
        simbisaiApology: {
          shortMessage: "Happy Birthday Jane Doe! Hope you have an amazing day! Cheers, Jane Doe",
          fullMessage: "Happy Birthday Jane Doe! Hope you have an amazing day! Cheers, Jane Doe",
          photoUrl: undefined,
        },
        media: [],
      };

      this.tokens.set("sample-token-123", {
        id: "sample-token-123",
        used: false,
        createdAt: new Date(),
        openedAt: null,
        expiresAt: null,
        content: sampleContent,
      } as Token & { content: GiftContent });
    } catch (error) {
      console.error("Error initializing sample token:", error);
    }
  }

  async getToken(id: string): Promise<(Token & { content: GiftContent }) | undefined> {
    try {
      return this.tokens.get(id);
    } catch (error) {
      console.error(`Error getting token ${id}:`, error);
      throw error;
    }
  }

  async createToken(content: GiftContent): Promise<string> {
    try {
      const id = randomUUID();
      const token: Token & { content: GiftContent } = {
        id,
        used: false,
        createdAt: new Date(),
        openedAt: null,
        expiresAt: null,
        content,
      } as Token & { content: GiftContent };
      this.tokens.set(id, token);
      return id;
    } catch (error) {
      console.error("Error creating token:", error);
      throw error;
    }
  }

  async markTokenUsed(id: string, openedAt: Date): Promise<void> {
    try {
      const token = this.tokens.get(id);
      if (token) {
        token.used = true;
        token.openedAt = openedAt;
        // Note: We are not checking expiration here, tokens can be used anytime
        this.tokens.set(id, token);
      }
    } catch (error) {
      console.error(`Error marking token ${id} as used:`, error);
      throw error;
    }
  }

  async saveReply(token: string, choice: "yes" | "need_time", message: string): Promise<void> {
    try {
      // Save to in-memory storage
      const replies = this.replies.get(token) || [];
      replies.push({ choice, message, timestamp: new Date() });
      this.replies.set(token, replies);

      // Also save to database using Supabase
      try {
        // Log environment variables for debugging (remove in production)
        console.log("SUPABASE_URL:", process.env.SUPABASE_URL ? "SET" : "NOT SET");
        console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "NOT SET");

        const { error } = await supabase
          .from("replies")
          .insert({
            id: randomUUID(),
            choice: choice,
            message: message,
            recipient_name: "Jane Doe",
            created_at: new Date(),
          });

        if (error) {
          console.error(`Error saving reply to Supabase:`, error);
          throw new Error(`Database error: ${error.message}`);
        } else {
          console.log("Reply successfully saved to Supabase");
        }
      } catch (dbError: any) {
        console.error(`Error saving reply to database:`, dbError);
        // Re-throw the error so it can be handled by the API route
        throw new Error(`Failed to save reply to database: ${dbError.message}`);
      }
    } catch (error) {
      console.error(`Error saving reply for token ${token}:`, error);
      throw error;
    }
  }

  // Updated method to get simplified replies from Supabase
  async getReplies(token: string): Promise<SimpleReply[] | undefined> {
    try {
      // First try to get replies from Supabase
      try {
        const { data, error } = await supabase
          .from("replies")
          .select("choice, message, created_at")
          .eq("recipient_name", "Jane Doe")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching replies from Supabase:", error);
          // Fall back to in-memory storage
          return this.replies.get(token);
        }

        if (data) {
          return data.map((reply: any) => ({
            choice: reply.choice,
            message: reply.message,
            timestamp: new Date(reply.created_at)
          }));
        }

        // Fall back to in-memory storage if no data
        return this.replies.get(token);
      } catch (dbError) {
        console.error("Database error when fetching replies:", dbError);
        // Fall back to in-memory storage
        return this.replies.get(token);
      }
    } catch (error) {
      console.error(`Error getting replies for token ${token}:`, error);
      return undefined;
    }
  }
}

export const storage = new MemStorage();