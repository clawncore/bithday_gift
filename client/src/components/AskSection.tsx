import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, Cake } from "lucide-react";
import { ConfettiEffect } from "@/components/ConfettiEffect";

interface AskSectionProps {
  onReply?: (choice: "yes" | "need_time", message?: string) => void;
}

export function AskSection({ onReply }: AskSectionProps) {
  const [choice, setChoice] = useState<"yes" | "need_time" | null>(null);
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChoice = (selected: "yes" | "need_time") => {
    setChoice(selected);
    if (selected === "yes") {
      setShowConfetti(true);
    }
  };

  const handleSend = () => {
    if (onReply && message.trim().length > 0) {
      onReply(choice!, message);
    }
  };

  return (
    <section className="py-32 md:py-48 px-4 relative overflow-hidden bg-gradient-to-b from-pink-50 to-white">
      {showConfetti && <ConfettiEffect />}

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-16 text-pink-700 flex items-center justify-center">
            <Heart className="text-red-400 mr-4" strokeWidth={1.5} />
            Are You Willing To Start Over?
            <Heart className="text-red-400 ml-4" strokeWidth={1.5} />
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-pink-600 mb-16 max-w-2xl mx-auto"
          >
            We both wronged you in different and unimaginable ways, and we deeply regret how things have been between us. 
            We're here to ask if you're willing to start over and give us a chance to show you we've changed. 
            What do you say?
          </motion.p>

          {!choice ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Button
                size="lg"
                onClick={() => handleChoice("yes")}
                className="text-lg px-12 py-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
              >
                <Sparkles className="w-6 h-6" />
                Yes, I'm Willing To Start Over
                <Sparkles className="w-6 h-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleChoice("need_time")}
                className="text-lg px-12 py-6 rounded-full border-2 border-pink-300 text-pink-600 hover:bg-pink-50 font-medium transition-all duration-300 shadow hover:shadow-lg flex items-center gap-3"
              >
                <Cake className="w-6 h-6" />
                I Need More Time
                <Cake className="w-6 h-6" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-pink-700">
                    {choice === "yes" ? "Thank You For Giving Me A Chance 🙏" : "I Understand, Take Your Time"}
                  </h3>
                  
                  <p className="text-lg text-pink-600 mb-8">
                    {choice === "yes" 
                      ? "Thank you for giving me a chance to start over. I promise to show you through my actions that I've truly changed and to value our renewed friendship." 
                      : "I completely understand. I'll be here whenever you're ready. Please let me know if there's anything I can do to show you I've changed."}
                  </p>
                  
                  <Textarea
                    placeholder={choice === "yes" 
                      ? "Tell me what this means to you..." 
                      : "Let me know what you need or when you'd like to talk..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[120px] text-lg p-4 mb-6 border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                  />
                  
                  <Button
                    size="lg"
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="text-lg px-12 py-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send My Response
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}