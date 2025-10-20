import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PhotoSlideshowProps {
    photos: string[];
    interval?: number;
    className?: string;
}

export function PhotoSlideshow({
    photos,
    interval = 5000,
    className = ""
}: PhotoSlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextPhoto = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, [photos.length]);

    const prevPhoto = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? photos.length - 1 : prevIndex - 1
        );
    }, [photos.length]);

    useEffect(() => {
        if (photos.length <= 1) return;

        const timer = setInterval(() => {
            nextPhoto();
        }, interval);

        return () => clearInterval(timer);
    }, [photos.length, interval, nextPhoto]);

    if (photos.length === 0) {
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

    return (
        <div className={`relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-pink-50 to-rose-50 p-4 ${className}`}>
            <div className="relative h-[500px] md:h-[600px]">
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
                                nextPhoto();
                            } else if (swipe > swipeConfidenceThreshold) {
                                prevPhoto();
                            }
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <img
                            src={photos[currentIndex]}
                            alt={`Memory ${currentIndex + 1}`}
                            className="object-contain w-full h-full rounded-2xl"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            {photos.length > 1 && (
                <>
                    <button
                        onClick={prevPhoto}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-pink-600 rounded-full p-3 shadow-lg transition-all duration-200 z-10 hover:scale-110"
                        aria-label="Previous photo"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextPhoto}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-pink-600 rounded-full p-3 shadow-lg transition-all duration-200 z-10 hover:scale-110"
                        aria-label="Next photo"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Photo counter */}
            {photos.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-pink-500/90 text-white text-base font-medium px-4 py-2 rounded-full shadow-lg">
                    {currentIndex + 1} / {photos.length}
                </div>
            )}
        </div>
    );
}