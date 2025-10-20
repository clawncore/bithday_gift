import { useEffect, useRef } from "react";

interface VideoPlayerProps {
    videoSrc: string;
    className?: string;
}

export function VideoPlayer({ videoSrc, className = "" }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const playVideo = async () => {
            if (videoRef.current) {
                try {
                    // Ensure video is muted for autoplay policies
                    videoRef.current.muted = true;
                    videoRef.current.volume = 0.7;
                    await videoRef.current.play();
                } catch (error) {
                    console.log("Auto-play prevented:", error);
                }
            }
        };

        // Small delay to ensure DOM is ready
        const timer = setTimeout(playVideo, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`relative rounded-xl overflow-hidden shadow-lg ${className}`}>
            <video
                ref={videoRef}
                src={videoSrc}
                controls
                autoPlay
                muted
                playsInline
                className="w-full h-auto max-w-full"
                onPlay={() => console.log("Video is playing")}
                onError={(e) => console.error("Video playback error:", e)}
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
}