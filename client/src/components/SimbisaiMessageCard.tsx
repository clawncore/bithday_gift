import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Gift, Sparkles, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallingElements } from "@/components/FallingElements";

interface SimbisaiMessageCardProps {
    fullMessage: string;
}

export function SimbisaiMessageCard({ fullMessage }: SimbisaiMessageCardProps) {
    const [isUnwrapped, setIsUnwrapped] = useState(false);
    const [audioError, setAudioError] = useState(false);
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
                    // Reset audio to start
                    audioRef.current!.currentTime = 0;
                    audioRef.current!.volume = 0.8;

                    // Attempt to play the audio
                    const playPromise = audioRef.current!.play();

                    if (playPromise !== undefined) {
                        await playPromise;
                        // Audio playback started successfully
                        setAudioError(false);
                    }
                } catch (error) {
                    // Audio autoplay was prevented, show manual play button
                    console.log("Audio autoplay prevented:", error);
                    setAudioError(true);
                }
            };

            // Small delay to ensure DOM is ready
            const timer = setTimeout(playAudio, 300);
            return () => clearTimeout(timer);
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
            <>
                <FallingElements duration={15000} elementCount={50} />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/90 backdrop-blur-sm border-2 border-green-200 rounded-2xl p-6 md:p-8 shadow-xl max-w-2xl w-full mx-4 relative"
                >
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-green-500 hover:text-green-700 transition-colors"
                    >
                        <Sparkles className="w-6 h-6" />
                    </button>

                    <div className="text-center">
                        <motion.div
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            className="mb-6"
                        >
                            <Gift className="w-16 h-16 text-green-500 mx-auto" />
                        </motion.div>

                        <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="font-serif text-3xl md:text-4xl font-bold mb-6 text-green-700"
                        >
                            A Special Message from Simbisai 🎂
                        </motion.h3>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4 text-green-600"
                        >
                            <div className="text-lg md:text-xl leading-relaxed">
                                {fullMessage.split('\n').map((paragraph, i) => (
                                    <p key={i} className="mb-4">{paragraph}</p>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex justify-center mt-8"
                        >
                            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                            <Sparkles className="w-6 h-6 text-green-400 animate-pulse mx-2 delay-300" />
                            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse delay-700" />
                        </motion.div>
                    </div>

                    <audio
                        ref={audioRef}
                        src="/simby-message.mp3"
                        preload="auto"
                    />

                    {audioError && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 text-center"
                        >
                            <Button
                                onClick={() => {
                                    if (audioRef.current) {
                                        audioRef.current.play().catch(e => console.error("Manual play failed:", e));
                                    }
                                }}
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg"
                            >
                                <Volume2 className="w-5 h-5 mr-2 inline" />
                                Play Simbisai's Message
                            </Button>
                            <p className="text-sm text-green-500 mt-3">
                                Click to play Simbisai's message
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl p-8 shadow-lg max-w-md w-full mx-4 text-center cursor-pointer hover:from-green-500 hover:to-teal-500 transition-all duration-300"
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
                Unwrap Simbisai's Message
            </h3>

            <p className="text-green-100 mb-6">
                Click to reveal a special message from Simbisai
            </p>

            <Button
                className="bg-white text-green-600 hover:bg-green-50 px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 mx-auto shadow-md hover:shadow-lg transition-all duration-200"
            >
                <Volume2 className="w-5 h-5" />
                Open Message
            </Button>

            <div className="flex justify-center gap-2 mt-6">
                <Sparkles className="w-5 h-5 text-green-200 animate-pulse" />
                <Sparkles className="w-5 h-5 text-green-100 animate-pulse delay-300" />
                <Sparkles className="w-5 h-5 text-green-200 animate-pulse delay-700" />
            </div>
        </motion.div>
    );
}
