"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replySchema = exports.insertTokenSchema = exports.replies = exports.tokens = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
exports.tokens = (0, pg_core_1.pgTable)("tokens", {
    id: (0, pg_core_1.varchar)("id").primaryKey(),
    used: (0, pg_core_1.boolean)("used").notNull().default(false),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    openedAt: (0, pg_core_1.timestamp)("opened_at"),
    // Note: expiresAt field is kept for database schema compatibility but not used
    expiresAt: (0, pg_core_1.timestamp)("expires_at"),
});
// Add replies table
exports.replies = (0, pg_core_1.pgTable)("replies", {
    id: (0, pg_core_1.varchar)("id").primaryKey(),
    tokenId: (0, pg_core_1.varchar)("token_id").notNull(),
    choice: (0, pg_core_1.varchar)("choice", { enum: ["yes", "need_time"] }).notNull(),
    message: (0, pg_core_1.text)("message").notNull(),
    recipientName: (0, pg_core_1.varchar)("recipient_name").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
});
exports.insertTokenSchema = (0, drizzle_zod_1.createInsertSchema)(exports.tokens).pick({
    id: true,
});
exports.replySchema = zod_1.z.object({
    token: zod_1.z.string(),
    message: zod_1.z.string().min(1),
    choice: zod_1.z.enum(["yes", "need_time"]),
});
