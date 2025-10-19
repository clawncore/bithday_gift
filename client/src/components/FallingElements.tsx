import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Simple Panda SVG component
const PandaSVG = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Panda body */}
        <circle cx="50" cy="50" r="40" fill="white" />
        {/* Panda ears */}
        <circle cx="30" cy="25" r="15" fill="black" />
        <circle cx="70" cy="25" r="15" fill="black" />
        {/* Panda eyes */}
        <circle cx="35" cy="45" r="8" fill="black" />
        <circle cx="65" cy="45" r="8" fill="black" />
        <circle cx="35" cy="45" r="4" fill="white" />
        <circle cx="65" cy="45" r="4" fill="white" />
        {/* Panda nose */}
        <circle cx="50" cy="55" r="5" fill="black" />
        {/* Panda mouth */}
        <path d="M45 60 Q50 65 55 60" stroke="black" strokeWidth="2" fill="none" />
    </svg>
);

// Simple Flower SVG component
const FlowerSVG = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Flower center */}
        <circle cx="50" cy="50" r="8" fill="#FFD700" />
        {/* Flower petals */}
        <ellipse cx="50" cy="25" rx="12" ry="20" fill="#FF69B4" />
        <ellipse cx="50" cy="75" rx="12" ry="20" fill="#FF69B4" />
        <ellipse cx="25" cy="50" rx="20" ry="12" fill="#FF69B4" />
        <ellipse cx="75" cy="50" rx="20" ry="12" fill="#FF69B4" />
        <ellipse cx="35" cy="35" rx="15" ry="15" fill="#FF69B4" transform="rotate(-45 35 35)" />
        <ellipse cx="65" cy="35" rx="15" ry="15" fill="#FF69B4" transform="rotate(45 65 35)" />
        <ellipse cx="35" cy="65" rx="15" ry="15" fill="#FF69B4" transform="rotate(45 35 65)" />
        <ellipse cx="65" cy="65" rx="15" ry="15" fill="#FF69B4" transform="rotate(-45 65 65)" />
        {/* Stem */}
        <rect x="48" y="70" width="4" height="25" fill="#32CD32" />
    </svg>
);

// Simple Leaf SVG component
const LeafSVG = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M20,80 Q50,20 80,80 Q50,60 20,80"
            fill="#32CD32"
            stroke="#228B22"
            strokeWidth="2"
        />
    </svg>
);

// Simple Heart SVG component
const HeartSVG = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M50,85 C30,70 15,55 15,35 C15,20 25,10 40,10 C50,10 60,15 65,25 C70,15 80,10 90,10 C105,10 115,20 115,35 C115,55 100,70 80,85 L50,85 Z"
            fill="#FF69B4"
        />
    </svg>
);

type ElementType = 'panda' | 'flower' | 'leaf' | 'heart';

interface FallingElement {
    id: number;
    x: number;
    delay: number;
    type: ElementType;
    size: number;
    rotation: number;
    duration: number;
    sway: number; // Horizontal sway amount
}

export function FallingElements({
    duration = 10000,
    elementCount = 30
}: {
    duration?: number;
    elementCount?: number;
}) {
    const [elements, setElements] = useState<FallingElement[]>([]);
    const [shouldAnimate, setShouldAnimate] = useState(true);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            setShouldAnimate(false);
            return;
        }

        const newElements: FallingElement[] = Array.from({ length: elementCount }, (_, i) => {
            const types: ElementType[] = ['panda', 'flower', 'leaf', 'heart'];
            const type = types[Math.floor(Math.random() * types.length)];

            return {
                id: i,
                x: Math.random() * 100,
                delay: Math.random() * 5,
                type,
                size: Math.random() * 20 + 15, // Random size between 15-35px
                rotation: Math.random() * 360,
                duration: Math.random() * 5 + 5, // Random duration between 5-10s
                sway: Math.random() * 100 - 50, // Random sway between -50 and 50
            };
        });

        setElements(newElements);

        // Clear elements after duration
        const timer = setTimeout(() => {
            setElements([]);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, elementCount]);

    if (!shouldAnimate) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
            {elements.map((element) => (
                <motion.div
                    key={element.id}
                    initial={{
                        y: -100,
                        x: `${element.x}vw`,
                        rotate: element.rotation,
                        opacity: 1,
                        scale: element.size / 30
                    }}
                    animate={{
                        y: window.innerHeight + 100,
                        x: `${element.x + element.sway}vw`, // Add horizontal sway for more natural movement
                        rotate: element.rotation + 360,
                        opacity: 0,
                    }}
                    transition={{
                        duration: element.duration,
                        delay: element.delay,
                        ease: "linear",
                    }}
                    className="absolute"
                    style={{ left: `${element.x}%` }}
                >
                    {element.type === 'panda' ? (
                        <PandaSVG className="text-black drop-shadow-lg" />
                    ) : element.type === 'flower' ? (
                        <FlowerSVG className="text-pink-500 drop-shadow-lg" />
                    ) : element.type === 'leaf' ? (
                        <LeafSVG className="text-green-500 drop-shadow-lg" />
                    ) : (
                        <HeartSVG className="text-red-500 drop-shadow-lg" />
                    )}
                </motion.div>
            ))}
        </div>
    );
}