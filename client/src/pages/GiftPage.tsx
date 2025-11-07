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
// Define the ClaimResponse type locally to avoid import issues
interface ClaimResponse {
  ok: boolean;
  openedAt?: string;
  content?: {
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
  };
  error?: string;
  message?: string;
}
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

  const { data: claimData, isLoading, error } = useQuery<ClaimResponse | undefined>({
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
    recipientName: "Jane Doe",
    media: [
      { src: "/memories/initial.jpg", type: "image" },
      { src: "/memories/together/initial.jpg", type: "image" }
    ],
    craigApology: {
      fullMessage: "Dearest friend, Happy Birthday! May this new year bring you endless joy and happiness. With all my love",
      shortMessage: "Dearest friend, Happy Birthday! May this new year bring you endless joy and happiness. With all my love"
    },
    simbisaiApology: {
      fullMessage: "Happy Birthday! Hope you have an amazing day! Cheers",
      shortMessage: "Happy Birthday! Hope you have an amazing day! Cheers"
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
                      { src: "https://giftedpenguin.co.uk/wp-content/uploads/2024/03/Maintaining-Independence-Balancing-Couple-Time-and-Alone-Time.jpg", type: "image" },
                      { src: "https://images.squarespace-cdn.com/content/v1/646505dd870afa7ffbcf5f89/2f564bb2-2370-4210-8968-f2ccc84b1037/25+Exciting+Activities+to+Bond+and+Create+Memories+with+Your+Boyfriend.jpg", type: "image" },
                      { src: "https://st.depositphotos.com/62628780/58680/i/1600/depositphotos_586807668-stock-photo-young-couple-celebrating-birthday-home.jpg", type: "image" },
                      { src: "https://st3.depositphotos.com/3332767/17983/i/1600/depositphotos_179835204-stock-photo-couple-with-a-birthday-cake.jpg", type: "image" },
                      { src: "https://www.shutterstock.com/image-photo/couple-love-enjoy-moment-happiness-260nw-120828235.jpg", type: "image" },
                      { src: "https://thumbs.dreamstime.com/b/couple-love-woman-riding-back-man-park-romantic-enjoying-moment-happiness-time-happy-smiling-women-men-166359420.jpg", type: "image" },
                      { src: "https://as1.ftcdn.net/jpg/05/95/63/62/1000_F_595636241_gwDiu2TJxQJuaMiSaQvmU6zakdgPYfWN.jpg", type: "image" },
                      { src: "https://c8.alamy.com/comp/KX36XC/group-adults-friends-birthday-celebration-enjoy-party-in-hotel-KX36XC.jpg", type: "image" }
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
                  name="Friend"
                  shortMessage={content.craigApology.shortMessage}
                  fullMessage={content.craigApology.fullMessage}
                  photoUrl={content.craigApology.photoUrl}
                  index={0}
                />

                <ApologyCard
                  name="Friend"
                  shortMessage={content.simbisaiApology.shortMessage}
                  fullMessage={content.simbisaiApology.fullMessage}
                  photoUrl={content.simbisaiApology.photoUrl}
                  index={1}
                />
              </div>
            </section>

            <AskSection onReply={handleReply} />

            <footer className="py-12 text-center text-pink-600 border-t border-pink-200 bg-white/30 backdrop-blur-sm">
              <p className="text-lg font-medium">Made with love 💖</p>
              <p className="text-sm mt-2">Happy Birthday! May all your dreams come true! 🎈</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}