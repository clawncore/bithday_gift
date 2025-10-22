import { pgTable, text, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tokens = pgTable("tokens", {
  id: varchar("id").primaryKey(),
  used: boolean("used").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  openedAt: timestamp("opened_at"),
  // Note: expiresAt field is kept for database schema compatibility but not used
  expiresAt: timestamp("expires_at"),
});

// Add replies table
export const replies = pgTable("replies", {
  id: varchar("id").primaryKey(),
  tokenId: varchar("token_id").notNull(),
  choice: varchar("choice", { enum: ["yes", "need_time"] }).notNull(),
  message: text("message").notNull(),
  recipientName: varchar("recipient_name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTokenSchema = createInsertSchema(tokens).pick({
  id: true,
});

export type InsertToken = z.infer<typeof insertTokenSchema>;
export type Token = typeof tokens.$inferSelect;

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  caption: string;
  date: string;
  note: string;
}

export interface GiftContent {
  recipientName: string;
  media: MediaItem[];
  craigApology: {
    fullMessage: string;
    shortMessage: string;
    photoUrl?: string;
  };
  simbisaiApology: {
    fullMessage: string;
    shortMessage: string;
    photoUrl?: string;
  };
}

export interface ClaimResponse {
  ok: boolean;
  openedAt?: string;
  content?: GiftContent;
}

export const replySchema = z.object({
  token: z.string(),
  message: z.string().min(1),
  choice: z.enum(["yes", "need_time"]),
});

export type Reply = z.infer<typeof replySchema>;