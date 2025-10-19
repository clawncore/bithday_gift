import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { replySchema, type GiftContent, type ClaimResponse } from "../shared/schema";

// Add a helper function for error handling
function handleRouteError(res: any, error: any, operation: string) {
  console.error(`Error in ${operation}:`, error);
  return res.status(500).json({
    ok: false,
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong"
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/claim", async (req, res) => {
    try {
      // Always return the gift content, regardless of secret word
      // Get the sample token content directly
      const tokenRecord = await storage.getToken("sample-token-123");

      if (!tokenRecord) {
        // Return default content even if token not found
        const defaultContent: GiftContent = {
          recipientName: "Chandrika",
          craigApology: {
            shortMessage: "Craig's heartfelt message",
            fullMessage: `Dear Chandrika,

Happy Birthday! We hope you have a wonderful day.`
          },
          simbisaiApology: {
            shortMessage: "Message from Simby",
            fullMessage: `Dear Chandrika,

Happy Birthday! We hope you have a wonderful day.`
          },
          media: []
        };

        return res.json({
          ok: true,
          content: defaultContent,
          openedAt: new Date().toISOString(),
        } as ClaimResponse);
      }

      // Return the gift content
      return res.json({
        ok: true,
        content: tokenRecord.content,
        openedAt: new Date().toISOString(),
      } as ClaimResponse);
    } catch (error) {
      return handleRouteError(res, error, "claiming gift");
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
      return handleRouteError(res, error, "creating token");
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
      return handleRouteError(res, error, "saving reply");
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}