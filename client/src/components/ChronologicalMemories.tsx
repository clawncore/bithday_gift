import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function ChronologicalMemories() {
    // Define all memories with their details
    const memories = [
        {
            id: 0,
            date: "Our Beginning",
            title: "Our Special Beginning",
            description: "The very first moment of our journey together",
            imageUrl: "/memories together/initial.jpg",
            position: "right",
            memoryNote: "Where it all started..."
        },
        {
            id: 1,
            date: "October 24, 2024",
            title: "Our Beginning",
            description: "The start of our wonderful journey together",
            imageUrl: "/chronological_memories/2024-10-24_first_memory.jpg",
            position: "right",
            memoryNote: "Where it all began..."
        },
        {
            id: 2,
            date: "November 15, 2024",
            title: "Special Day",
            description: "A day we'll always remember",
            imageUrl: "/chronological_memories/2024-11-15_second_memory.jpg",
            position: "left",
            memoryNote: "Memories worth cherishing"
        },
        {
            id: 3,
            date: "December 5, 2024",
            title: "Winter Moments",
            description: "Beautiful winter days together",
            imageUrl: "/chronological_memories/2024-12-05_third_memory.jpg",
            position: "right",
            memoryNote: "Winter warmth in our hearts"
        },
        {
            id: 4,
            date: "January 10, 2025",
            title: "New Year Beginnings",
            description: "Starting the new year with wonderful memories",
            imageUrl: "/chronological_memories/2025-01-10_fourth_memory.jpg",
            position: "left",
            memoryNote: "New year, new adventures"
        },
        {
            id: 5,
            date: "January 25, 2025",
            title: "Special Video Moment",
            description: "A captured moment we'll treasure forever",
            videoUrl: "/chronological_memories/2025-01-25_fifth_memory.mp4",
            position: "right",
            memoryNote: "Captured in motion"
        },
        {
            id: 6,
            date: "February 15, 2025",
            title: "Valentine Days",
            description: "Celebrating love and friendship",
            imageUrl: "/chronological_memories/2025-02-15_sixth_memory.jpg",
            position: "left",
            memoryNote: "Love is in the air"
        },
        {
            id: 7,
            date: "March 10, 2025",
            title: "Spring Adventures",
            description: "Exploring new places as spring arrived",
            imageUrl: "/chronological_memories/2025-03-10_seventh_memory.jpg",
            position: "right",
            memoryNote: "Spring blooms and smiles"
        },
        {
            id: 8,
            date: "April 5, 2025",
            title: "Easter Celebrations",
            description: "Celebrating together with joy",
            imageUrl: "/chronological_memories/2025-04-05_eighth_memory.jpg",
            position: "left",
            memoryNote: "Easter joy and laughter"
        },
        {
            id: 9,
            date: "April 10, 2025",
            title: "Special Getaway",
            description: "A memorable trip we'll never forget",
            imageUrl: "/chronological_memories/2025-04-10_ninth_memory.jpg",
            position: "right",
            memoryNote: "Escape to happiness"
        },
        {
            id: 10,
            date: "April 12, 2025",
            title: "Fun Times",
            description: "Laughter and joy filled this special day",
            imageUrl: "/chronological_memories/2025-04-12_tenth_memory.jpg",
            position: "left",
            memoryNote: "Pure joy and laughter"
        },
        {
            id: 11,
            date: "April 15, 2025",
            title: "Beautiful Moments",
            description: "Capturing the beauty of our friendship",
            imageUrl: "/chronological_memories/2025-04-15_eleventh_memory.jpg",
            position: "right",
            memoryNote: "Friendship at its finest"
        },
        {
            id: 12,
            date: "April 18, 2025",
            title: "Spring Blooms",
            description: "Enjoying the beauty of spring together",
            imageUrl: "/chronological_memories/2025-04-18_twelfth_memory.jpg",
            position: "left",
            memoryNote: "Nature's beauty with you"
        },
        {
            id: 13,
            date: "April 20, 2025",
            title: "Wonderful Day",
            description: "A day filled with happiness and laughter",
            imageUrl: "/chronological_memories/2025-04-20_thirteenth_memory.jpg",
            position: "right",
            memoryNote: "Perfect moments together"
        },
        {
            id: 14,
            date: "April 22, 2025",
            title: "Memorable Experience",
            description: "An experience we'll treasure forever",
            imageUrl: "/chronological_memories/2025-04-22_fourteenth_memory.jpg",
            position: "left",
            memoryNote: "Unforgettable memories"
        },
        {
            id: 15,
            date: "April 25, 2025",
            title: "Special Occasion",
            description: "Celebrating a special moment together",
            imageUrl: "/chronological_memories/2025-04-25_fifteenth_memory.jpg",
            position: "right",
            memoryNote: "Celebrating life with you"
        },
        {
            id: 16,
            date: "April 30, 2025",
            title: "April's End",
            description: "Ending April with beautiful memories",
            imageUrl: "/chronological_memories/2025-04-30_sixteenth_memory.jpg",
            position: "left",
            memoryNote: "April showers, May flowers"
        }
    ];

    return (
        <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-pink-50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-pink-700 flex flex-col md:flex-row items-center justify-center">
                        Our Journey Together
                        <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 ml-0 md:ml-3 mt-2 md:mt-0" />
                    </h2>
                    <p className="text-base md:text-lg text-pink-600 px-4">
                        A timeline of our cherished moments from October 2024 to October 2025
                    </p>
                </motion.div>

                {/* Timeline container */}
                <div className="relative">
                    {/* Timeline line - hidden on mobile, visible on desktop */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-200 hidden md:block"></div>

                    <div className="space-y-8 md:space-y-0">
                        {memories.map((memory, index) => (
                            <div
                                key={memory.id}
                                className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                            >
                                {/* Timeline dot - visible on mobile and desktop */}
                                <motion.div
                                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-pink-400 rounded-full border-4 border-white shadow-lg z-10"
                                ></motion.div>

                                {/* Image/Video container */}
                                <div className={`w-full md:w-5/12 mb-4 md:mb-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="cursor-pointer"
                                    >
                                        <Card className="overflow-hidden bg-white border-pink-200 h-full shadow-md hover:shadow-lg transition-all duration-300">
                                            <div className="relative w-full overflow-hidden">
                                                {memory.videoUrl ? (
                                                    <div className="relative w-full bg-pink-50 flex items-center justify-center">
                                                        <video
                                                            ref={(el) => {
                                                                if (el) {
                                                                    // Clean up any existing observer
                                                                    if (el.dataset.hasObserver) {
                                                                        return;
                                                                    }

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
                                                                    el.dataset.hasObserver = "true";

                                                                    // Clean up observer when element is removed
                                                                    const cleanup = () => {
                                                                        observer.disconnect();
                                                                        el.removeEventListener('loadeddata', cleanup);
                                                                    };

                                                                    el.addEventListener('loadeddata', cleanup);
                                                                }
                                                            }}
                                                            src={memory.videoUrl}
                                                            className="w-full object-contain"
                                                            muted
                                                            controls={false}
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-pink-500/80 flex items-center justify-center">
                                                                <div className="w-0 h-0 border-l-6 md:border-l-8 border-l-white border-y-4 md:border-y-6 border-y-transparent ml-0.5 md:ml-1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={memory.imageUrl}
                                                        alt={memory.title}
                                                        className="w-full object-contain ken-burns"
                                                        loading="lazy"
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                            <div className="p-3 md:p-4">
                                                <p className="font-medium text-sm mb-1 text-pink-700">{memory.title}</p>
                                                <p className="text-xs text-pink-500 italic">{memory.memoryNote}</p>
                                            </div>
                                        </Card>
                                    </motion.div>
                                </div>

                                {/* Spacer for desktop layout */}
                                <div className="hidden md:block md:w-2/12"></div>

                                {/* Text content */}
                                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pl-8 md:text-left' : 'md:pr-8 md:text-right'}`}>
                                    <motion.div
                                        className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-xl p-4 md:p-6 shadow-md"
                                    >
                                        <h3 className="font-serif text-lg md:text-xl font-bold text-pink-700 mb-1 md:mb-2">{memory.title}</h3>
                                        <p className="text-pink-500 text-xs md:text-sm mb-1 md:mb-2 italic">{memory.memoryNote}</p>
                                        <p className="text-pink-600 text-sm">{memory.description}</p>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}