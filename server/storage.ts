import { type Token, type GiftContent } from "../shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getToken(id: string): Promise<(Token & { content: GiftContent }) | undefined>;
  createToken(content: GiftContent): Promise<string>;
  markTokenUsed(id: string, openedAt: Date): Promise<void>;
  saveReply(token: string, choice: "yes" | "need_time", message: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private tokens: Map<string, Token & { content: GiftContent }>;
  private replies: Map<string, Array<{ choice: "yes" | "need_time"; message: string; timestamp: Date }>>;

  constructor() {
    this.tokens = new Map();
    this.replies = new Map();
    this.initializeSampleToken();
  }

  private initializeSampleToken() {
    try {
      const sampleContent: GiftContent = {
        recipientName: "Chandrika",
        craigApology: {
          shortMessage: "Dearest Chandrika, Happy Birthday! May this new year bring you endless joy and happiness. With all my love, Craig",
          fullMessage: "Dearest Chandrika, Happy Birthday! May this new year bring you endless joy and happiness. With all my love, Craig",
          photoUrl: undefined,
        },
        simbisaiApology: {
          shortMessage: "Happy Birthday Chandrika! Hope you have an amazing day! Cheers, Simby",
          fullMessage: "Happy Birthday Chandrika! Hope you have an amazing day! Cheers, Simby",
          photoUrl: undefined,
        },
        media: [
          {
            id: "1",
            type: "image",
            url: "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?w=800&q=80",
            caption: "Spring adventures",
            date: "March 2024",
            note: "Exploring new places together",
          },
          {
            id: "2",
            type: "image",
            url: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&q=80",
            caption: "Summer movie nights",
            date: "June 2024",
            note: "Cozy evenings with our favorite films",
          },
          {
            id: "3",
            type: "image",
            url: "https://images.unsplash.com/photo-1543332143-4e8c27e3256a?w=800&q=80",
            caption: "Autumn coffee dates",
            date: "October 2024",
            note: "Warm conversations over warm drinks",
          },
          {
            id: "4",
            type: "image",
            url: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80",
            caption: "Winter celebrations",
            date: "December 2024",
            note: "Holiday memories we'll always treasure",
          },
          {
            id: "5",
            type: "image",
            url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80",
            caption: "Special moments",
            date: "Various times",
            note: "The little things that made us smile",
          },
          {
            id: "6",
            type: "image",
            url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
            caption: "Friendship goals",
            date: "Throughout the year",
            note: "Celebrating our bond",
          },
        ],
      };

      const sampleToken: Token & { content: GiftContent } = {
        id: "sample-token-123",
        used: false,
        createdAt: new Date(),
        openedAt: null,
        expiresAt: null, // No expiration
        content: sampleContent,
      };

      this.tokens.set(sampleToken.id, sampleToken);
    } catch (error) {
      console.error("Error initializing sample token:", error);
    }
  }

  async getToken(id: string): Promise<(Token & { content: GiftContent }) | undefined> {
    try {
      const token = this.tokens.get(id);

      // Remove expiration check - tokens never expire
      return token;
    } catch (error) {
      console.error(`Error getting token ${id}:`, error);
      return undefined;
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
        expiresAt: null, // No expiration - tokens never expire
        content,
      };
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
        // Note: We're not checking expiration here, tokens can be used anytime
        this.tokens.set(id, token);
      }
    } catch (error) {
      console.error(`Error marking token ${id} as used:`, error);
      throw error;
    }
  }

  async saveReply(token: string, choice: "yes" | "need_time", message: string): Promise<void> {
    try {
      const replies = this.replies.get(token) || [];
      replies.push({ choice, message, timestamp: new Date() });
      this.replies.set(token, replies);
    } catch (error) {
      console.error(`Error saving reply for token ${token}:`, error);
      throw error;
    }
  }
}

export const storage = new MemStorage();