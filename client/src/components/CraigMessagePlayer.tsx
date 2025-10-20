import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Volume2, Zap } from "lucide-react";

interface CraigMessagePlayerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fullMessage: string;
}

export function CraigMessagePlayer({
  open,
  onOpenChange,
  fullMessage,
}: CraigMessagePlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    // When dialog opens/closes, handle audio
    if (open && audioRef.current) {
      // Automatically play audio when dialog opens
      const playAudio = async () => {
        try {
          // Small delay to ensure DOM is ready
          await new Promise(resolve => setTimeout(resolve, 300));
          audioRef.current!.volume = 0.8;
          await audioRef.current!.play();
          setAudioError(false);
        } catch (error) {
          console.log("Auto-play prevented:", error);
          setAudioError(true);
          // Try to play on next user interaction
          const playOnUserInteraction = () => {
            if (audioRef.current) {
              audioRef.current.play().catch(err => console.log("Manual play also failed:", err));
            }
            // Remove event listeners after first attempt
            window.removeEventListener('click', playOnUserInteraction);
            window.removeEventListener('touchstart', playOnUserInteraction);
            window.removeEventListener('keydown', playOnUserInteraction);
          };

          // Add event listeners for user interaction
          window.addEventListener('click', playOnUserInteraction);
          window.addEventListener('touchstart', playOnUserInteraction);
          window.addEventListener('keydown', playOnUserInteraction);
        }
      };
      playAudio();
    } else if (!open && audioRef.current) {
      // When dialog closes, stop audio
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [open]);

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white border-pink-200">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl mb-4 text-pink-700 flex items-center justify-between">
              <span>Craig's Message</span>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500 fill-current" />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4 text-base leading-relaxed text-pink-600">
                {fullMessage.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                {audioError && (
                  <div className="mt-4 text-center">
                    <Button
                      onClick={() => {
                        if (audioRef.current) {
                          audioRef.current.play().catch(e => console.error("Manual play failed:", e));
                        }
                      }}
                      className="bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Play Craig's Message
                    </Button>
                    <p className="text-sm text-pink-500 mt-2">
                      Click to play the audio message
                    </p>
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <audio ref={audioRef} src="/craig-message.mp3" />
    </>
  );
}