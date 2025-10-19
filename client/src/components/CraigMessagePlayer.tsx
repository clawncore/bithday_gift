import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Zap } from "lucide-react";

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

  useEffect(() => {
    // When dialog opens/closes, handle audio
    if (open && audioRef.current) {
      // Automatically play audio when dialog opens
      const playAudio = async () => {
        try {
          audioRef.current!.volume = 1.0;
          await audioRef.current!.play();
        } catch (error) {
          console.log("Auto-play prevented:", error);
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
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <audio ref={audioRef} src="/craig-message.mp3" />
    </>
  );
}