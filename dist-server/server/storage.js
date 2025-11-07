"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.MemStorage = void 0;
const crypto_1 = require("crypto");
const supabaseClient_1 = require("./supabaseClient");
class MemStorage {
    constructor() {
        this.tokens = new Map();
        this.replies = new Map();
        this.initializeSampleToken();
    }
    initializeSampleToken() {
        try {
            const sampleContent = {
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
            });
        }
        catch (error) {
            console.error("Error initializing sample token:", error);
        }
    }
    async getToken(id) {
        try {
            return this.tokens.get(id);
        }
        catch (error) {
            console.error(`Error getting token ${id}:`, error);
            throw error;
        }
    }
    async createToken(content) {
        try {
            const id = (0, crypto_1.randomUUID)();
            const token = {
                id,
                used: false,
                createdAt: new Date(),
                openedAt: null,
                expiresAt: null,
                content,
            };
            this.tokens.set(id, token);
            return id;
        }
        catch (error) {
            console.error("Error creating token:", error);
            throw error;
        }
    }
    async markTokenUsed(id, openedAt) {
        try {
            const token = this.tokens.get(id);
            if (token) {
                token.used = true;
                token.openedAt = openedAt;
                // Note: We are not checking expiration here, tokens can be used anytime
                this.tokens.set(id, token);
            }
        }
        catch (error) {
            console.error(`Error marking token ${id} as used:`, error);
            throw error;
        }
    }
    async saveReply(token, choice, message) {
        try {
            // Save to in-memory storage
            const replies = this.replies.get(token) || [];
            replies.push({ choice, message, timestamp: new Date() });
            this.replies.set(token, replies);
            // Also save to database using Supabase
            try {
                const { error } = await supabaseClient_1.supabase
                    .from("replies")
                    .insert({
                        id: (0, crypto_1.randomUUID)(),
                        choice: choice,
                        message: message,
                        recipient_name: "Jane Doe",
                        created_at: new Date(),
                    });
                if (error) {
                    console.error(`Error saving reply to Supabase:`, error);
                }
            }
            catch (dbError) {
                console.error(`Error saving reply to database:`, dbError);
                // We dont throw the error here because we want to continue working
                // even if the database is not available
            }
        }
        catch (error) {
            console.error(`Error saving reply for token ${token}:`, error);
            throw error;
        }
    }
    // Updated method to get simplified replies from Supabase
    async getReplies(token) {
        try {
            // First try to get replies from Supabase
            try {
                const { data, error } = await supabaseClient_1.supabase
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
                    return data.map((reply) => ({
                        choice: reply.choice,
                        message: reply.message,
                        timestamp: new Date(reply.created_at)
                    }));
                }
                // Fall back to in-memory storage if no data
                return this.replies.get(token);
            }
            catch (dbError) {
                console.error("Database error when fetching replies:", dbError);
                // Fall back to in-memory storage
                return this.replies.get(token);
            }
        }
        catch (error) {
            console.error(`Error getting replies for token ${token}:`, error);
            return undefined;
        }
    }
}
exports.MemStorage = MemStorage;
exports.storage = new MemStorage();
