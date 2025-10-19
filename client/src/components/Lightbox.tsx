import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaItem } from "@shared/schema";
import { Button } from "@/components/ui/button";
import ReactPlayer from "react-player";

interface LightboxProps {
  items: MediaItem[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ items, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        onClick={onClose}
        data-testid="lightbox-overlay"
      >
        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
          data-testid="button-close-lightbox"
          className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
        >
          <X className="w-6 h-6" />
        </Button>

        {items.length > 1 && (
          <>
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              data-testid="button-previous"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              data-testid="button-next"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </>
        )}

        <div
          className="max-w-7xl max-h-[90vh] w-full mx-4 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex items-center justify-center mb-6"
          >
            {currentItem.type === "image" ? (
              <img
                src={currentItem.url}
                alt={currentItem.caption}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            ) : (
              <div className="w-full max-w-4xl aspect-video">
                <ReactPlayer
                  url={currentItem.url}
                  controls
                  playing
                  width="100%"
                  height="100%"
                />
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-background/80 backdrop-blur-md rounded-lg p-6 text-center"
          >
            <h3 className="font-medium text-lg mb-2 text-foreground">{currentItem.caption}</h3>
            <p className="text-sm text-muted-foreground mb-1">{currentItem.date}</p>
            {currentItem.note && (
              <p className="text-sm text-foreground/80 italic mt-2">{currentItem.note}</p>
            )}
            <p className="text-xs text-muted-foreground mt-4">
              {currentIndex + 1} / {items.length}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
