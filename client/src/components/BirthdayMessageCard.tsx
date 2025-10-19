import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Gift, Sparkles, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BirthdayMessageCard() {
    const [isUnwrapped, setIsUnwrapped] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Cleanup function to stop audio when component unmounts
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    useEffect(() => {
        // Play audio when unwrapped
        if (isUnwrapped && audioRef.current) {
            const playAudio = async () => {
                try {
                    audioRef.current!.volume = 0.8;
                    await audioRef.current!.play();
                } catch (error) {
                    console.error("Error playing birthday message:", error);
                }
            };
            playAudio();
        }
    }, [isUnwrapped]);

    const handleUnwrap = () => {
        setIsUnwrapped(true);
    };

    const handleClose = () => {
        setIsUnwrapped(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    if (isUnwrapped) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/90 backdrop-blur-sm border-2 border-pink-200 rounded-2xl p-6 md:p-8 shadow-xl max-w-2xl w-full mx-4 relative"
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-pink-500 hover:text-pink-700 transition-colors"
                >
                    <Sparkles className="w-6 h-6" />
                </button>

                <div className="text-center">
                    <motion.div
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        className="mb-6"
                    >
                        <Gift className="w-16 h-16 text-pink-500 mx-auto" />
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="font-serif text-3xl md:text-4xl font-bold mb-6 text-pink-700"
                    >
                        A Special Birthday Message 🎂
                    </motion.h3>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4 text-pink-600"
                    >
                        <p className="text-lg md:text-xl leading-relaxed">
                            On your special day, we want you to know how grateful we are to have you in our lives.
                            Your kindness, warmth, and beautiful spirit make the world a better place.
                        </p>

                        <p className="text-lg md:text-xl leading-relaxed">
                            May your birthday be filled with joy, laughter, and all the love you deserve.
                            Here's to another year of wonderful memories and new adventures ahead!
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex justify-center mt-8"
                    >
                        <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                        <Sparkles className="w-6 h-6 text-pink-400 animate-pulse mx-2 delay-300" />
                        <Sparkles className="w-6 h-6 text-purple-400 animate-pulse delay-700" />
                    </motion.div>
                </div>

                <audio ref={audioRef} src="/birthday-message.mp3" />
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl p-8 shadow-lg max-w-md w-full mx-4 text-center cursor-pointer hover:from-pink-500 hover:to-rose-500 transition-all duration-300"
            onClick={handleUnwrap}
        >
            <motion.div
                animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="mb-6"
            >
                <Gift className="w-16 h-16 text-white mx-auto" />
            </motion.div>

            <h3 className="font-serif text-2xl font-bold mb-4 text-white">
                Unwrap Your Birthday Message
            </h3>

            <p className="text-pink-100 mb-6">
                Click to reveal a special message just for you
            </p>

            <Button
                className="bg-white text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 mx-auto shadow-md hover:shadow-lg transition-all duration-200"
            >
                <Volume2 className="w-5 h-5" />
                Open Message
            </Button>

            <div className="flex justify-center gap-2 mt-6">
                <Sparkles className="w-5 h-5 text-pink-200 animate-pulse" />
                <Sparkles className="w-5 h-5 text-pink-100 animate-pulse delay-300" />
                <Sparkles className="w-5 h-5 text-pink-200 animate-pulse delay-700" />
            </div>
        </motion.div>
    );
}