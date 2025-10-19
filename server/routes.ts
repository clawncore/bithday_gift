import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { replySchema, type GiftContent, type ClaimResponse } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/claim", async (req, res) => {
    try {
      const secretWord = req.query.word as string;

      // Check if the special word is provided and matches "panda" (case insensitive)
      if (!secretWord || secretWord.toLowerCase() !== "panda") {
        return res.status(400).json({
          ok: false,
          reason: "invalid",
        } as ClaimResponse);
      }

      // Get the sample token content directly since we're not using tokens anymore
      const tokenRecord = await storage.getToken("sample-token-123");

      if (!tokenRecord) {
        return res.status(404).json({
          ok: false,
          reason: "invalid",
        } as ClaimResponse);
      }

      // For the special word approach, we don't mark it as used
      // So anyone with the word can access it

      return res.json({
        ok: true,
        content: tokenRecord.content,
        openedAt: new Date().toISOString(),
      } as ClaimResponse);
    } catch (error) {
      console.error("Error claiming with word:", error);
      return res.status(500).json({
        ok: false,
        reason: "invalid",
      } as ClaimResponse);
    }
  });

  // Keep the create-token endpoint for development/testing purposes
  app.post("/api/create-token", async (req, res) => {
    try {
      const content: GiftContent = req.body;

      if (!content || !content.recipientName) {
        return res.status(400).json({ error: "Invalid gift content" });
      }

      const tokenId = await storage.createToken(content);

      const baseUrl = req.get("host");
      const protocol = req.get("x-forwarded-proto") || req.protocol;
      const giftUrl = `${protocol}://${baseUrl}/?word=panda`;

      return res.json({
        token: tokenId,
        url: giftUrl,
      });
    } catch (error) {
      console.error("Error creating token:", error);
      return res.status(500).json({ error: "Failed to create token" });
    }
  });

  // Keep the reply endpoint for functionality
  app.post("/api/reply", async (req, res) => {
    try {
      const result = replySchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ error: "Invalid reply data" });
      }

      // For the special word approach, we'll use a fixed token for replies
      const { choice, message } = result.data;

      if (!message || message.trim().length === 0) {
        return res.status(400).json({ error: "Message cannot be empty" });
      }

      // Use the sample token for storing replies
      const token = "sample-token-123";
      const tokenRecord = await storage.getToken(token);
      if (!tokenRecord) {
        return res.status(404).json({ error: "Token not found" });
      }

      await storage.saveReply(token, choice, message.trim());

      return res.json({ ok: true });
    } catch (error) {
      console.error("Error saving reply:", error);
      return res.status(500).json({ error: "Failed to save reply" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}