import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function AudioControls({ playOnLogin = false }: { playOnLogin?: boolean }) {
  const [isMuted, setIsMuted] = useState(true); // Start muted by default
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      // Set background music volume to 50% as per requirements
      audioRef.current.volume = 0.5;

      // If playOnLogin is true, start playing the audio
      if (playOnLogin) {
        audioRef.current.play()
          .then(() => {
            setIsMuted(false);
          })
          .catch((error) => {
            console.log("Failed to play audio after login:", error);
            setIsMuted(true);
          });
      }

      // Pause audio when user leaves the page
      const handleBeforeUnload = () => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      // Cleanup event listeners on component unmount
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };
    }
  }, [playOnLogin]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play()
          .then(() => {
            setIsMuted(false);
          })
          .catch((error) => {
            console.log("Failed to play audio:", error);
          });
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
        src="/background-music.mp3"
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