import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { HeroGiftBox } from "@/components/HeroGiftBox";
import { ApologyCard } from "@/components/ApologyCard";
import { MediaGallery } from "@/components/MediaGallery";
import { AskSection } from "@/components/AskSection";
import { LockoutScreen } from "@/components/LockoutScreen";
import { BirthdayMessageCard } from "@/components/BirthdayMessageCard";
import { VideoPlayer } from "@/components/VideoPlayer";
import { PhotoSlideshow } from "@/components/PhotoSlideshow";
import { Card } from "@/components/ui/card";
import { ClaimResponse } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, Sparkles, Flower } from "lucide-react";
import { ChronologicalMemories } from "@/components/ChronologicalMemories";

export default function GiftPage() {
  const [, navigate] = useLocation();
  const [unwrapped, setUnwrapped] = useState(true); // Set to true by default for direct access
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  // Try to unmute audio when the page loads
  useEffect(() => {
    const unmuteAudio = () => {
      const audioElement = document.querySelector('audio');
      if (audioElement) {
        audioElement.muted = false;
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(unmuteAudio, 1000);
    return () => clearTimeout(timer);
  }, []);

  const { data: claimData, isLoading, error } = useQuery<ClaimResponse>({
    queryKey: ["/api/claim"],
    queryFn: async () => {
      // Remove the word parameter from the API request
      const response = await apiRequest("GET", `/api/claim`);
      return response.json();
    },
    retry: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUnwrap = () => {
    if (unwrapped) return; // Prevent double execution

    setUnwrapped(true);

    // Scroll to the content section after a delay to ensure content is rendered
    setTimeout(() => {
      const contentSection = document.querySelector('.birthday-content-section');
      if (contentSection) {
        contentSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Fallback to scrolling to bottom of hero section
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }
    }, 1000); // Reduced delay to 1 second for quicker response
  };

  const handleReply = async (choice: "yes" | "need_time", message?: string) => {
    try {
      await apiRequest("POST", "/api/reply", {
        choice,
        message: message || "",
      });
    } catch (err) {
      console.error("Failed to send reply:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-50 to-rose-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Loader2 className="w-16 h-16 animate-spin text-pink-500 mx-auto mb-4" />
          <p className="text-lg text-pink-600">Preparing your birthday surprise...</p>
          <motion.div
            className="flex justify-center gap-2 mt-4"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Flower className="w-6 h-6 text-pink-400" />
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <Flower className="w-6 h-6 text-rose-400" />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Always show the gift content, regardless of token status
  const content = claimData?.content || {
    recipientName: "Chandrika",
    media: [],
    craigApology: {
      fullMessage: "Dearest Chandrika, Happy Birthday! May this new year bring you endless joy and happiness. With all my love, Craig",
      shortMessage: "Dearest Chandrika, Happy Birthday! May this new year bring you endless joy and happiness. With all my love, Craig"
    },
    simbisaiApology: {
      fullMessage: "Happy Birthday Chandrika! Hope you have an amazing day! Cheers, Simby",
      shortMessage: "Happy Birthday Chandrika! Hope you have an amazing day! Cheers, Simby"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-50 to-rose-100">
      <HeroGiftBox onUnwrap={handleUnwrap} unwrapped={unwrapped} />

      <AnimatePresence>
        {(unwrapped || scrolledPastHero) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Birthday Message Card - appears after unwrapping */}
            <section className="py-12 px-4 flex justify-center birthday-content-section">
              <BirthdayMessageCard />
            </section>

            {/* Memories Photo Slideshow - appears below the birthday message */}
            <section className="py-12 px-4">
              <div className="max-w-6xl mx-auto w-full">
                <div className="text-center mb-8">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-pink-700">
                    Your memories for the past year
                  </h2>
                  <p className="text-lg text-pink-600">
                    A slideshow of our cherished moments together
                  </p>
                </div>
                <div className="w-full">
                  <PhotoSlideshow
                    media={[
                      { src: "/memories/WhatsApp Image 2025-10-20 at 08.59.50_c7282973.jpg", type: "image" },
                      { src: "/memories/WhatsApp Image 2025-10-20 at 08.59.52_4374e524.jpg", type: "image" },
                      { src: "/memories/WhatsApp Image 2025-10-20 at 08.59.52_6a60b8e5.jpg", type: "image" },
                      { src: "/memories/WhatsApp Image 2025-10-20 at 08.59.56_77ddb625.jpg", type: "image" },
                      { src: "/memories/WhatsApp Image 2025-10-20 at 08.59.56_b6bf33e8.jpg", type: "image" },
                      { src: "/memories/WhatsApp Image 2025-10-20 at 08.59.57_791dd6bb.jpg", type: "image" },
                      { src: "/memories/WhatsApp Image 2025-10-20 at 08.59.58_6a2848df.jpg", type: "image" },
                      { src: "/memories/WhatsApp Image 2025-10-20 at 08.59.59_6a3a43cb.jpg", type: "image" }
                    ]}
                    interval={5000}
                    className="w-full h-[50vh] md:h-[80vh] max-h-[800px]"
                  />
                </div>
              </div>
            </section>

            {/* Chronological Memories */}
            <ChronologicalMemories />

            {/* Personal messages with apologies */}
            <section className="py-16 md:py-24 px-4">
              <div className="max-w-3xl mx-auto space-y-12">
                <div className="text-center mb-16">
                  <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-pink-700">
                    Messages from Your Friends
                  </h2>
                  <p className="text-lg text-pink-600">
                    With heartfelt apologies and warm birthday wishes
                  </p>
                </div>

                <ApologyCard
                  name="Craig"
                  shortMessage={content.craigApology.shortMessage}
                  fullMessage={content.craigApology.fullMessage}
                  photoUrl={content.craigApology.photoUrl}
                  index={0}
                />

                <ApologyCard
                  name="Simbisai"
                  shortMessage={content.simbisaiApology.shortMessage}
                  fullMessage={content.simbisaiApology.fullMessage}
                  photoUrl={content.simbisaiApology.photoUrl}
                  index={1}
                />
              </div>
            </section>

            <AskSection onReply={handleReply} />

            <footer className="py-12 text-center text-pink-600 border-t border-pink-200 bg-white/30 backdrop-blur-sm">
              <p className="text-lg font-medium">Made with love for {content.recipientName} 💖</p>
              <p className="text-sm mt-2">Happy Birthday! May all your dreams come true! 🎈</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}