import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

export function BirthdayMessagePlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Cleanup function to stop audio when component unmounts
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    const playMessage = async () => {
        if (audioRef.current) {
            try {
                // Pause if already playing
                if (isPlaying) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                } else {
                    // Play the birthday message
                    // Set volume to 100% to match Jane Doe's message volume
                    audioRef.current.volume = 1.0; // 100% volume
                    await audioRef.current.play();
                    setIsPlaying(true);

                    // Reset button when audio finishes
                    audioRef.current.onended = () => {
                        setIsPlaying(false);
                    };
                }
            } catch (error) {
                console.error("Error playing birthday message:", error);
            }
        }
    };

    return (
        <>
            <audio ref={audioRef} src="/birthday-message.mp3" />
            <Button
                onClick={playMessage}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
                {isPlaying ? (
                    <>
                        <VolumeX className="w-5 h-5" />
                        Stop Birthday Message
                    </>
                ) : (
                    <>
                        <Volume2 className="w-5 h-5" />
                        Play Birthday Message
                    </>
                )}
            </Button>
        </>
    );
}