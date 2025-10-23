import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Heart } from "lucide-react";

interface ApologyCardProps {
  name: string;
  shortMessage: string;
  fullMessage: string;
  photoUrl?: string;
  accentColor?: string;
  index: number;
}

export function ApologyCard({
  name,
  shortMessage,
  fullMessage,
  photoUrl,
  accentColor = "pink",
  index,
}: ApologyCardProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        className="w-full"
      >
        <Card className="backdrop-blur-md bg-pink-100 border-pink-300 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.3 }}
              >
                <Avatar className="w-24 h-24 border-4 border-pink-400">
                  <AvatarImage src={photoUrl} alt={name} />
                  <AvatarFallback className="text-2xl font-serif bg-pink-200 text-black">
                    {name[0]}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="font-serif text-3xl md:text-4xl font-bold mb-4 text-black"
                >
                  A Message from {name}
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  className="mb-6"
                >
                  <div className="text-base md:text-lg leading-relaxed text-black">
                    {fullMessage}
                  </div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}