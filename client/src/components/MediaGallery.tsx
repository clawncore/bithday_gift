import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import { MediaItem } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Lightbox } from "@/components/Lightbox";
import { Sparkles } from "lucide-react";

interface MediaGalleryProps {
  items: MediaItem[];
}

export function MediaGallery({ items }: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <section className="py-24 md:py-32 px-4 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4 text-pink-700 flex items-center justify-center">
              Our Memories Together <Sparkles className="w-8 h-8 text-yellow-400 ml-3" />
            </h2>
            <p className="text-lg text-pink-600">
              A timeline of moments we've shared throughout the year
            </p>
          </motion.div>

          {/* Timeline container */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-200 hidden md:block"></div>

            <div className="space-y-12 md:space-y-0">
              {items.map((item, index) => {
                const isEven = index % 2 === 0;

                return (
                  <TimelineItem
                    key={item.id}
                    item={item}
                    index={index}
                    isEven={isEven}
                    onSelect={() => setSelectedIndex(index)}
                    isLastItem={index === items.length - 1}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {selectedIndex !== null && (
        <Lightbox
          items={items}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}

interface TimelineItemProps {
  item: MediaItem;
  index: number;
  isEven: boolean;
  onSelect: () => void;
  isLastItem: boolean;
}

function TimelineItem({ item, index, isEven, onSelect, isLastItem }: TimelineItemProps) {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  // Smooth the scroll values for better performance
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scroll progress to animation values
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.5, 1, 0.5, 0]);
  const y = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [50, 25, 0, -25, -50]);
  const xImage = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [isEven ? 50 : -50, isEven ? 25 : -25, 0, isEven ? -25 : 25, isEven ? -50 : 50]);
  const xText = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [isEven ? -50 : 50, isEven ? -25 : 25, 0, isEven ? 25 : -25, isEven ? 50 : -50]);
  const scaleDot = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.5, 1, 0.5, 0]);

  return (
    <motion.div
      ref={itemRef}
      style={{ opacity, y }}
      className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""}
        ${!isLastItem ? "md:mb-24" : ""}`}
    >
      {/* Timeline dot for mobile */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg md:hidden z-10"
        style={{ scale: scaleDot }}
      ></motion.div>

      {/* Timeline dot for desktop */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-pink-400 rounded-full border-4 border-white shadow-lg hidden md:block z-10"
        style={{ scale: scaleDot }}
      ></motion.div>

      {/* Content side */}
      <div className={`w-full md:w-5/12 mb-4 md:mb-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
        <motion.div
          whileHover={{ y: -5 }}
          className="cursor-pointer"
          onClick={onSelect}
          style={{ x: xImage }}
        >
          <Card className="overflow-hidden bg-white border-pink-200 h-full shadow-md hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-square overflow-hidden">
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover ken-burns"
                  loading="lazy"
                />
              ) : (
                <div className="relative w-full h-full bg-pink-50 flex items-center justify-center">
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-16 h-16 rounded-full bg-pink-500/80 flex items-center justify-center">
                      <div className="w-0 h-0 border-l-8 border-l-white border-y-6 border-y-transparent ml-1" />
                    </div>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-4">
              <p className="font-medium text-sm mb-1 text-pink-700">{item.caption}</p>
              <p className="text-xs text-pink-500">{item.date}</p>
              {item.note && (
                <p className="text-xs text-pink-400 mt-1 italic">{item.note}</p>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Spacer for desktop timeline */}
      <div className="hidden md:block md:w-2/12"></div>

      {/* Text side */}
      <div className={`w-full md:w-5/12 ${isEven ? "md:pl-12 md:text-left" : "md:pr-12 md:text-right"}`}>
        <motion.div
          className={`bg-white/80 backdrop-blur-sm border border-pink-200 rounded-xl p-6 shadow-md ${isEven ? "md:mr-8" : "md:ml-8"}`}
          style={{ x: xText }}
        >
          <h3 className="font-serif text-xl font-bold text-pink-700 mb-2">{item.caption}</h3>
          <p className="text-pink-500 text-sm mb-2">{item.date}</p>
          {item.note && (
            <p className="text-pink-600 italic">{item.note}</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}