import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
    src: string;
    type: "image" | "video";
}

interface PhotoSlideshowProps {
    media: MediaItem[];
    interval?: number;
    className?: string;
}

export function PhotoSlideshow({
    media,
    interval = 5000,
    className = ""
}: PhotoSlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextMedia = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }, [media.length]);

    const prevMedia = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? media.length - 1 : prevIndex - 1
        );
    }, [media.length]);

    useEffect(() => {
        if (media.length <= 1) return;

        const timer = setInterval(() => {
            nextMedia();
        }, interval);

        return () => clearInterval(timer);
    }, [media.length, interval, nextMedia]);

    if (media.length === 0) {
        return (
            <div className={`flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-12 ${className}`}>
                <p className="text-pink-500 text-lg">No memories to display yet</p>
            </div>
        );
    }

    const slideVariants = {
        enter: {
            opacity: 0,
            scale: 0.8
        },
        center: {
            zIndex: 1,
            opacity: 1,
            scale: 1
        },
        exit: {
            zIndex: 0,
            opacity: 0,
            scale: 0.8
        }
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const currentMedia = media[currentIndex];

    return (
        <div className={`relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-pink-50 to-rose-50 p-2 md:p-4 ${className}`}>
            {/* Responsive container for slideshow */}
            <div className="relative w-full h-full min-h-[200px] md:min-h-[500px]">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            opacity: { duration: 0.5 },
                            scale: { duration: 0.5 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) {
                                nextMedia();
                            } else if (swipe > swipeConfidenceThreshold) {
                                prevMedia();
                            }
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {currentMedia.type === "image" ? (
                            <img
                                src={currentMedia.src}
                                alt={`Memory ${currentIndex + 1}`}
                                className="object-contain w-full h-full rounded-xl md:rounded-2xl"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center rounded-xl md:rounded-2xl overflow-hidden">
                                <video
                                    src={currentMedia.src}
                                    controls
                                    autoPlay
                                    muted
                                    playsInline
                                    className="object-contain w-full h-full max-h-full max-w-full"
                                    onPlay={() => console.log(`Playing video: ${currentMedia.src}`)}
                                    onError={(e) => console.error("Video playback error:", e)}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            {media.length > 1 && (
                <>
                    <button
                        onClick={prevMedia}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-pink-600 rounded-full p-1.5 md:p-2 shadow-lg transition-all duration-200 z-10 hover:scale-110"
                        aria-label="Previous media"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextMedia}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-pink-600 rounded-full p-1.5 md:p-2 shadow-lg transition-all duration-200 z-10 hover:scale-110"
                        aria-label="Next media"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Media counter */}
            {media.length > 1 && (
                <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 bg-pink-500/90 text-white text-xs font-medium px-2 py-1 rounded-full shadow-lg">
                    {currentIndex + 1} / {media.length}
                </div>
            )}
        </div>
    );
}