import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, Cake } from "lucide-react";
import { ConfettiEffect } from "@/components/ConfettiEffect";
import { FallingElements } from "@/components/FallingElements";

interface AskSectionProps {
  onReply?: (choice: "yes" | "need_time", message?: string) => void;
}

export function AskSection({ onReply }: AskSectionProps) {
  const [choice, setChoice] = useState<"yes" | "need_time" | null>(null);
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFallingElements, setShowFallingElements] = useState(false);

  const handleChoice = (selected: "yes" | "need_time") => {
    setChoice(selected);
    if (selected === "yes") {
      setShowConfetti(true);
      setShowFallingElements(true);
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
      {showFallingElements && <FallingElements duration={8000} elementCount={40} />}

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-16 text-pink-700 flex items-center justify-center">
            Happy Birthday, Chandrika! <Cake className="w-12 h-12 text-pink-500 ml-4" />
          </h2>

          {!choice ? (
            <div className="space-y-8">
              <p className="text-xl text-pink-600 mb-8 font-medium">
                We hope you enjoyed this special birthday experience and our heartfelt messages.
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
                <div className="flex-1 max-w-xs mx-auto md:mx-0">
                  <Button
                    size="lg"
                    onClick={() => handleChoice("yes")}
                    data-testid="button-yes"
                    className="w-full h-auto py-8 px-12 text-xl rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Heart className="w-6 h-6 mr-3" />
                    Thank You!
                  </Button>
                </div>

                <div className="flex-1 max-w-xs mx-auto md:mx-0">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => handleChoice("need_time")}
                    data-testid="button-need-time"
                    className="w-full h-auto py-8 px-12 text-xl rounded-2xl border-2 border-pink-400 text-pink-600 hover:bg-pink-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Sparkles className="w-6 h-6 mr-3" />
                    This is Beautiful!
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="backdrop-blur-md bg-white/70 border-pink-200 shadow-lg">
                <CardContent className="p-8">
                  {choice === "yes" ? (
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-4"
                      >
                        <Heart className="w-16 h-16 mx-auto text-pink-500" fill="currentColor" />
                      </motion.div>
                      <h3 className="font-serif text-3xl font-bold text-pink-700 mb-4">
                        Thank you for your kind words!
                      </h3>
                      <p className="text-lg text-pink-600 mb-6">
                        We're so glad you're enjoying your birthday surprise!
                        Wishing you the happiest of birthdays and a wonderful year ahead.
                      </p>
                      <Textarea
                        placeholder="Would you like to share a birthday wish or thought? (Optional)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        data-testid="textarea-reply"
                        className="min-h-32 resize-none border-pink-200 focus:border-pink-400 bg-white/80 backdrop-blur-sm"
                      />
                      {onReply && (
                        <Button
                          onClick={handleSend}
                          data-testid="button-send-reply"
                          size="lg"
                          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                          disabled={message.trim().length === 0}
                        >
                          Send Birthday Wish
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex justify-center mb-4">
                        <Sparkles className="w-12 h-12 text-yellow-400 mx-auto animate-pulse" />
                      </div>
                      <h3 className="font-serif text-3xl font-bold text-pink-700 mb-4">
                        So Happy You Love It!
                      </h3>
                      <p className="text-lg text-pink-600 mb-6">
                        We're thrilled you're enjoying this special birthday experience!
                        May your day be filled with joy, laughter, and all your favorite things.
                      </p>
                      <Textarea
                        placeholder="Share your birthday wishes or thoughts... (Optional)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        data-testid="textarea-reply"
                        className="min-h-32 resize-none border-pink-200 focus:border-pink-400 bg-white/80 backdrop-blur-sm"
                      />
                      {onReply && (
                        <Button
                          onClick={handleSend}
                          data-testid="button-send-reply"
                          size="lg"
                          variant="outline"
                          className="w-full border-pink-400 text-pink-600 hover:bg-pink-50"
                          disabled={message.trim().length === 0}
                        >
                          Send Message
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}