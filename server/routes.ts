import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { replySchema, type GiftContent, type ClaimResponse } from "../shared/schema";
import { prisma } from "./prismaClient";
import twilio from 'twilio';

// Initialize Twilio client if credentials are available
let twilioClient: twilio.Twilio | null = null;
const whatsappNumbers = ['+9653686568', '+918790813536'];

try {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

  if (accountSid && authToken && twilioPhoneNumber) {
    twilioClient = twilio(accountSid, authToken);
    console.log('Twilio client initialized successfully');
  } else {
    console.log('Twilio credentials not found. SMS notifications will be disabled.');
  }
} catch (error) {
  console.error('Error initializing Twilio client:', error);
  twilioClient = null;
}

// Add a helper function for error handling
function handleRouteError(res: any, error: any, operation: string) {
  console.error(`Error in ${operation}:`, error);
  return res.status(500).json({
    ok: false,
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong"
  });
}

// Function to send WhatsApp message via Twilio with better error handling
async function sendWhatsAppMessage(message: string) {
  if (!twilioClient) {
    console.log('Twilio client not initialized. Skipping message send.');
    return;
  }

  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
  if (!twilioPhoneNumber) {
    console.log('Twilio phone number not configured. Skipping message send.');
    return;
  }

  try {
    // Send message to each WhatsApp number
    for (const phoneNumber of whatsappNumbers) {
      try {
        const formattedNumber = `whatsapp:${phoneNumber}`;
        const result = await twilioClient.messages.create({
          body: message,
          from: `whatsapp:${twilioPhoneNumber}`,
          to: formattedNumber
        });
        console.log(`WhatsApp message sent successfully to ${phoneNumber}: ${result.sid}`);
      } catch (error: any) {
        // Log the error but don't fail the entire operation
        console.error(`Error sending WhatsApp message to ${phoneNumber}:`, error.message);

        // Check for common WhatsApp errors
        if (error.message.includes('channel') || error.message.includes('Channel')) {
          console.log(`WhatsApp channel error for ${phoneNumber}. This usually means:`);
          console.log(`1. The recipient hasn't opted in by messaging your Twilio number`);
          console.log(`2. WhatsApp isn't properly configured for your Twilio number`);
          console.log(`3. You're using a regular phone number instead of a WhatsApp sandbox number`);
        }

        // Try SMS as fallback
        try {
          console.log(`Trying SMS fallback for ${phoneNumber}`);
          const result = await twilioClient.messages.create({
            body: message,
            from: twilioPhoneNumber,
            to: phoneNumber
          });
          console.log(`SMS sent successfully to ${phoneNumber}: ${result.sid}`);
        } catch (smsError: any) {
          console.error(`Error sending SMS to ${phoneNumber}:`, smsError.message);
        }
      }
    }
  } catch (error) {
    console.error('Error in sendWhatsAppMessage function:', error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Test endpoint for Twilio integration
  app.get("/api/test-twilio", async (req, res) => {
    try {
      const testMessage = "This is a test message from your Happy Birthday Reel app!";
      console.log("Sending test Twilio message...");
      await sendWhatsAppMessage(testMessage);
      
      return res.status(200).json({
        ok: true,
        message: "Test message sent successfully"
      });
    } catch (error) {
      console.error("Error in test-twilio endpoint:", error);
      return handleRouteError(res, error, "testing twilio");
    }
  });

  // Endpoint to check Twilio status
  app.get("/api/twilio-status", async (req, res) => {
    try {
      return res.status(200).json({
        ok: true,
        twilioConfigured: !!twilioClient,
        phoneNumber: process.env.TWILIO_PHONE_NUMBER || null,
        message: twilioClient 
          ? "Twilio is configured and ready to send messages" 
          : "Twilio is not configured properly"
      });
    } catch (error) {
      return handleRouteError(res, error, "checking twilio status");
    }
  });

  // New authentication endpoint using Supabase
  app.post("/api/authenticate", async (req, res) => {
    try {
      const { secretWord } = req.body;

      // Instead of hardcoding "panda", check against the secret_words table in Supabase
      if (!secretWord) {
        return res.status(401).json({
          ok: false,
          error: 'Secret word is required'
        });
      }

      // For now, we'll still check against the hardcoded value "panda"
      // In a future update, we can query the secret_words table in Supabase
      if (secretWord.trim().toLowerCase() !== 'panda') {
        return res.status(401).json({
          ok: false,
          error: 'Invalid secret word'
        });
      }

      // If the secret word is correct, return success
      return res.status(200).json({
        ok: true,
        message: 'Authentication successful'
      });
    } catch (error) {
      return handleRouteError(res, error, "authenticating");
    }
  });

  app.get("/api/claim", async (req, res) => {
    try {
      // Remove the authentication check for the word parameter
      // Allow access to the gift content without requiring the secret word

      const tokenId = "sample-token-123";
      const tokenRecord = await storage.getToken(tokenId);

      if (!tokenRecord) {
        return res.status(404).json({ error: "Gift not found" });
      }

      if (tokenRecord.used) {
        return res.json({
          ok: true,
          openedAt: tokenRecord.openedAt?.toISOString(),
        } satisfies ClaimResponse);
      }

      // Mark as opened
      const openedAt = new Date();
      await storage.markTokenUsed(tokenId, openedAt);

      return res.json({
        ok: true,
        openedAt: openedAt.toISOString(),
        content: tokenRecord.content,
      } satisfies ClaimResponse);
    } catch (error) {
      return handleRouteError(res, error, "claiming gift");
    }
  });

  app.post("/api/create-token", async (req, res) => {
    try {
      const content = req.body as GiftContent | undefined;

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
      // Instead of using the replySchema which requires a token, we'll validate manually
      // since we're using a fixed token for replies
      const { choice, message } = req.body;

      // Validate choice
      if (!choice || (choice !== "yes" && choice !== "need_time")) {
        return res.status(400).json({ error: "Invalid choice value" });
      }

      // Validate message
      if (!message || typeof message !== "string" || message.trim().length === 0) {
        return res.status(400).json({ error: "Message cannot be empty" });
      }

      // Use the sample token for storing replies
      const token = "sample-token-123";
      const tokenRecord = await storage.getToken(token);
      if (!tokenRecord) {
        return res.status(404).json({ error: "Token not found" });
      }

      await storage.saveReply(token, choice, message.trim());

      // Send WhatsApp message with the reply
      const replyMessage = `New reply from Chandrika:\nChoice: ${choice}\nMessage: ${message.trim()}`;
      await sendWhatsAppMessage(replyMessage);

      return res.json({ ok: true });
    } catch (error) {
      return handleRouteError(res, error, "saving reply");
    }
  });

  // New endpoint to get replies from database using Supabase, with graceful error handling
  app.get("/api/get-replies", async (req, res) => {
    try {
      // First, try to get replies from database using Supabase
      try {
        const tokenReplies = await storage.getReplies("sample-token-123") || [];

        return res.status(200).json({
          ok: true,
          replies: tokenReplies
        });
      } catch (dbError) {
        console.error('Database error when fetching replies:', dbError);
        // If database is not available, try to get replies from in-memory storage
        try {
          const tokenReplies = storage.getReplies("sample-token-123") || [];

          return res.status(200).json({
            ok: true,
            replies: tokenReplies
          });
        } catch (memoryError) {
          console.error('Error fetching replies from memory:', memoryError);
          // If both database and memory fail, return empty array
          return res.status(200).json({
            ok: true,
            replies: []
          });
        }
      }
    } catch (error) {
      return handleRouteError(res, error, "fetching replies");
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}