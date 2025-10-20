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

export default function GiftPage() {
  const [, navigate] = useLocation();
  const [unwrapped, setUnwrapped] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const secretWord = urlParams.get("word");

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
      const response = await apiRequest("GET", "/api/claim");
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
      shortMessage: "Craig's heartfelt message",
      fullMessage: "Dear Chandrika, Happy Birthday! We hope you have a wonderful day."
    },
    simbisaiApology: {
      shortMessage: "Message from Simby",
      fullMessage: "Dear Chandrika, Happy Birthday! We hope you have a wonderful day."
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
                    className="w-full"
                  />
                </div>
              </div>
            </section>

            {/* Timeline of memories */}
            <section className="py-24 md:py-32 px-4 bg-gradient-to-b from-white to-pink-50">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4 text-pink-700 flex items-center justify-center">
                    Our Memories Together <Sparkles className="w-8 h-8 text-yellow-400 ml-3" />
                  </h2>
                  <p className="text-lg text-pink-600">
                    A timeline of moments we've shared throughout the year
                  </p>
                </motion.div>

                {/* Timeline container */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-200 hidden md:block"></div>

                  <div className="space-y-12 md:space-y-0">
                    {/* Spring adventures - March 2024 */}
                    <div className="relative flex flex-col md:flex-row items-center">
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg md:hidden z-10"
                      ></motion.div>
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg hidden md:block z-10"
                      ></motion.div>

                      <div className="w-full md:w-5/12 mb-4 md:mb-0 md:pr-12 md:text-right">
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="cursor-pointer"
                        >
                          <Card className="overflow-hidden bg-white border-pink-200 h-full shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="relative aspect-square overflow-hidden">
                              <img
                                src="/memories together/WhatsApp Image 2025-10-19 at 21.22.45_1090d65d.jpg"
                                alt="Spring adventures"
                                className="w-full h-full object-cover ken-burns"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-4">
                              <p className="font-medium text-sm mb-1 text-pink-700">Spring adventures</p>
                              <p className="text-xs text-pink-500">March 2024</p>
                            </div>
                          </Card>
                        </motion.div>
                      </div>

                      <div className="hidden md:block md:w-2/12"></div>

                      <div className="w-full md:w-5/12 md:pl-12 md:text-left">
                        <motion.div
                          className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-xl p-6 shadow-md md:mr-8"
                        >
                          <h3 className="font-serif text-xl font-bold text-pink-700 mb-2">Spring adventures</h3>
                          <p className="text-pink-500 text-sm mb-2">March 2024</p>
                          <p className="text-pink-600">Exploring new places together</p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Summer fun - June 2024 */}
                    <div className="relative flex flex-col md:flex-row items-center md:flex-row-reverse">
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg md:hidden z-10"
                      ></motion.div>
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg hidden md:block z-10"
                      ></motion.div>

                      <div className="w-full md:w-5/12 mb-4 md:mb-0 md:pl-12 md:text-left">
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="cursor-pointer"
                        >
                          <Card className="overflow-hidden bg-white border-pink-200 h-full shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="relative aspect-square overflow-hidden">
                              <img
                                src="/memories together/WhatsApp Image 2025-10-19 at 21.22.45_a66d6714.jpg"
                                alt="Summer fun"
                                className="w-full h-full object-cover ken-burns"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-4">
                              <p className="font-medium text-sm mb-1 text-pink-700">Summer fun</p>
                              <p className="text-xs text-pink-500">June 2024</p>
                            </div>
                          </Card>
                        </motion.div>
                      </div>

                      <div className="hidden md:block md:w-2/12"></div>

                      <div className="w-full md:w-5/12 md:pr-12 md:text-right">
                        <motion.div
                          className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-xl p-6 shadow-md md:ml-8"
                        >
                          <h3 className="font-serif text-xl font-bold text-pink-700 mb-2">Summer fun</h3>
                          <p className="text-pink-500 text-sm mb-2">June 2024</p>
                          <p className="text-pink-600">Beach days and barbecues</p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Special moment - August 2024 */}
                    <div className="relative flex flex-col md:flex-row items-center">
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg md:hidden z-10"
                      ></motion.div>
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg hidden md:block z-10"
                      ></motion.div>

                      <div className="w-full md:w-5/12 mb-4 md:mb-0 md:pr-12 md:text-right">
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="cursor-pointer"
                        >
                          <Card className="overflow-hidden bg-white border-pink-200 h-full shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="relative aspect-square overflow-hidden">
                              <div className="relative w-full h-full bg-pink-50 flex items-center justify-center">
                                <video
                                  ref={(el) => {
                                    if (el) {
                                      // Try to play the video when it's loaded
                                      el.muted = true;
                                      el.autoplay = true;
                                      el.loop = true;
                                      el.playsInline = true;
                                      el.load();
                                      // Play when in view
                                      const playVideo = () => {
                                        if (el.paused) {
                                          el.play().catch(e => console.log("Autoplay prevented:", e));
                                        }
                                      };

                                      // Check if element is in viewport
                                      const observer = new IntersectionObserver((entries) => {
                                        entries.forEach(entry => {
                                          if (entry.isIntersecting) {
                                            playVideo();
                                          }
                                        });
                                      }, { threshold: 0.5 });

                                      observer.observe(el);

                                      // Clean up observer
                                      return () => observer.disconnect();
                                    }
                                  }}
                                  src="/memories together/WhatsApp Video 2025-10-19 at 21.22.46_d163c53e.mp4"
                                  className="w-full h-full object-cover"
                                  muted
                                  controls
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                  <div className="w-16 h-16 rounded-full bg-pink-500/80 flex items-center justify-center">
                                    <div className="w-0 h-0 border-l-8 border-l-white border-y-6 border-y-transparent ml-1" />
                                  </div>
                                </div>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-4">
                              <p className="font-medium text-sm mb-1 text-pink-700">Special moment</p>
                              <p className="text-xs text-pink-500">August 2024</p>
                            </div>
                          </Card>
                        </motion.div>
                      </div>

                      <div className="hidden md:block md:w-2/12"></div>

                      <div className="w-full md:w-5/12 md:pl-12 md:text-left">
                        <motion.div
                          className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-xl p-6 shadow-md md:mr-8"
                        >
                          <h3 className="font-serif text-xl font-bold text-pink-700 mb-2">Special moment</h3>
                          <p className="text-pink-500 text-sm mb-2">August 2024</p>
                          <p className="text-pink-600">A surprise video capture</p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Autumn memories - October 2024 */}
                    <div className="relative flex flex-col md:flex-row items-center md:flex-row-reverse">
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg md:hidden z-10"
                      ></motion.div>
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg hidden md:block z-10"
                      ></motion.div>

                      <div className="w-full md:w-5/12 mb-4 md:mb-0 md:pl-12 md:text-left">
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="cursor-pointer"
                        >
                          <Card className="overflow-hidden bg-white border-pink-200 h-full shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="relative aspect-square overflow-hidden">
                              <img
                                src="/memories together/WhatsApp Image 2025-10-20 at 08.51.04_5f34aabc.jpg"
                                alt="Autumn memories"
                                className="w-full h-full object-cover ken-burns"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-4">
                              <p className="font-medium text-sm mb-1 text-pink-700">Autumn memories</p>
                              <p className="text-xs text-pink-500">October 2024</p>
                            </div>
                          </Card>
                        </motion.div>
                      </div>

                      <div className="hidden md:block md:w-2/12"></div>

                      <div className="w-full md:w-5/12 md:pr-12 md:text-right">
                        <motion.div
                          className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-xl p-6 shadow-md md:ml-8"
                        >
                          <h3 className="font-serif text-xl font-bold text-pink-700 mb-2">Autumn memories</h3>
                          <p className="text-pink-500 text-sm mb-2">October 2024</p>
                          <p className="text-pink-600">Falling leaves and cozy moments</p>
                        </motion.div>
                      </div>
                    </div>

                    {/* More autumn moments - October 2024 */}
                    <div className="relative flex flex-col md:flex-row items-center">
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg md:hidden z-10"
                      ></motion.div>
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg hidden md:block z-10"
                      ></motion.div>

                      <div className="w-full md:w-5/12 mb-4 md:mb-0 md:pr-12 md:text-right">
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="cursor-pointer"
                        >
                          <Card className="overflow-hidden bg-white border-pink-200 h-full shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="relative aspect-square overflow-hidden">
                              <img
                                src="/memories together/WhatsApp Image 2025-10-20 at 08.51.15_04d3752c.jpg"
                                alt="Autumn moments"
                                className="w-full h-full object-cover ken-burns"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-4">
                              <p className="font-medium text-sm mb-1 text-pink-700">More autumn moments</p>
                              <p className="text-xs text-pink-500">October 2024</p>
                            </div>
                          </Card>
                        </motion.div>
                      </div>

                      <div className="hidden md:block md:w-2/12"></div>

                      <div className="w-full md:w-5/12 md:pl-12 md:text-left">
                        <motion.div
                          className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-xl p-6 shadow-md md:mr-8"
                        >
                          <h3 className="font-serif text-xl font-bold text-pink-700 mb-2">More autumn moments</h3>
                          <p className="text-pink-500 text-sm mb-2">October 2024</p>
                          <p className="text-pink-600">Beautiful autumn days together</p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Cozy evenings - October 2024 */}
                    <div className="relative flex flex-col md:flex-row items-center md:flex-row-reverse">
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg md:hidden z-10"
                      ></motion.div>
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg hidden md:block z-10"
                      ></motion.div>

                      <div className="w-full md:w-5/12 mb-4 md:mb-0 md:pl-12 md:text-left">
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="cursor-pointer"
                        >
                          <Card className="overflow-hidden bg-white border-pink-200 h-full shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="relative aspect-square overflow-hidden">
                              <img
                                src="/memories together/WhatsApp Image 2025-10-20 at 08.51.20_49bd9308.jpg"
                                alt="Cozy evenings"
                                className="w-full h-full object-cover ken-burns"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-4">
                              <p className="font-medium text-sm mb-1 text-pink-700">Cozy evenings</p>
                              <p className="text-xs text-pink-500">October 2024</p>
                            </div>
                          </Card>
                        </motion.div>
                      </div>

                      <div className="hidden md:block md:w-2/12"></div>

                      <div className="w-full md:w-5/12 md:pr-12 md:text-right">
                        <motion.div
                          className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-xl p-6 shadow-md md:ml-8"
                        >
                          <h3 className="font-serif text-xl font-bold text-pink-700 mb-2">Cozy evenings</h3>
                          <p className="text-pink-500 text-sm mb-2">October 2024</p>
                          <p className="text-pink-600">Warm drinks and good conversations</p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Special memories - October 2024 */}
                    <div className="relative flex flex-col md:flex-row items-center">
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg md:hidden z-10"
                      ></motion.div>
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg hidden md:block z-10"
                      ></motion.div>

                      <div className="w-full md:w-5/12 mb-4 md:mb-0 md:pr-12 md:text-right">
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="cursor-pointer"
                        >
                          <Card className="overflow-hidden bg-white border-pink-200 h-full shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="relative aspect-square overflow-hidden">
                              <img
                                src="/memories together/WhatsApp Image 2025-10-20 at 08.51.24_ed6cb64a.jpg"
                                alt="Special memories"
                                className="w-full h-full object-cover ken-burns"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-4">
                              <p className="font-medium text-sm mb-1 text-pink-700">Special memories</p>
                              <p className="text-xs text-pink-500">October 2024</p>
                            </div>
                          </Card>
                        </motion.div>
                      </div>

                      <div className="hidden md:block md:w-2/12"></div>

                      <div className="w-full md:w-5/12 md:pl-12 md:text-left">
                        <motion.div
                          className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-xl p-6 shadow-md md:mr-8"
                        >
                          <h3 className="font-serif text-xl font-bold text-pink-700 mb-2">Special memories</h3>
                          <p className="text-pink-500 text-sm mb-2">October 2024</p>
                          <p className="text-pink-600">Memorable moments from our time together</p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Final moments - October 2024 */}
                    <div className="relative flex flex-col md:flex-row items-center md:flex-row-reverse">
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg md:hidden z-10"
                      ></motion.div>
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg hidden md:block z-10"
                      ></motion.div>

                      <div className="w-full md:w-5/12 mb-4 md:mb-0 md:pl-12 md:text-left">
                        <motion.div
                          whileHover={{ y: -5 }}
                          className="cursor-pointer"
                        >
                          <Card className="overflow-hidden bg-white border-pink-200 h-full shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="relative aspect-square overflow-hidden">
                              <img
                                src="/memories together/WhatsApp Image 2025-10-20 at 09.04.20_937c91df.jpg"
                                alt="Final moments"
                                className="w-full h-full object-cover ken-burns"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-4">
                              <p className="font-medium text-sm mb-1 text-pink-700">Final moments</p>
                              <p className="text-xs text-pink-500">October 2024</p>
                            </div>
                          </Card>
                        </motion.div>
                      </div>

                      <div className="hidden md:block md:w-2/12"></div>

                      <div className="w-full md:w-5/12 md:pr-12 md:text-right">
                        <motion.div
                          className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-xl p-6 shadow-md md:ml-8"
                        >
                          <h3 className="font-serif text-xl font-bold text-pink-700 mb-2">Final moments</h3>
                          <p className="text-pink-500 text-sm mb-2">October 2024</p>
                          <p className="text-pink-600">Ending the year with beautiful memories</p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

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