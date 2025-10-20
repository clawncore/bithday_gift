import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function AudioControls() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      // Set background music volume to 40%
      audioRef.current.volume = 0.4; // 40% volume

      // Try to play the audio automatically when the component mounts
      const attemptAutoPlay = async () => {
        try {
          // Attempt autoplay
          await audioRef.current!.play();
          setIsMuted(false);
        } catch (error) {
          // Auto-play was prevented by browser policies
          console.log("Auto-play prevented by browser:", error);
          // Even if autoplay fails, we won't show a button
          // The user can use the mute toggle to control audio
          setIsMuted(true);
        }
      };

      attemptAutoPlay();

      // Set up a more reliable autoplay mechanism
      const enableAutoPlay = () => {
        if (audioRef.current && isMuted) {
          audioRef.current.play()
            .then(() => {
              setIsMuted(false);
            })
            .catch((error) => {
              console.log("Failed to play on user interaction:", error);
            });
        }
      };

      // Add event listeners for various user interactions
      const userEvents = ['click', 'touchstart', 'keydown', 'scroll'];
      userEvents.forEach(event => {
        document.addEventListener(event, enableAutoPlay, { once: true });
      });

      // Pause audio when user leaves the page
      const handleBeforeUnload = () => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      // Cleanup event listeners on component unmount
      return () => {
        userEvents.forEach(event => {
          document.removeEventListener(event, enableAutoPlay);
        });
        window.removeEventListener("beforeunload", handleBeforeUnload);
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };
    }
  }, [isMuted]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => { });
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src="/panda-song.mp3"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          size="icon"
          variant="outline"
          onClick={toggleMute}
          data-testid="button-audio-toggle"
          className="rounded-full w-14 h-14 bg-card/80 backdrop-blur-md border-border hover-elevate active-elevate-2 shadow-lg"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          <AnimatePresence mode="wait">
            {isMuted ? (
              <motion.div
                key="muted"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <VolumeX className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="unmuted"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <Volume2 className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </>
  );
}