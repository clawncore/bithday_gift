import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, Cake, CheckCircle } from "lucide-react";
import { ConfettiEffect } from "@/components/ConfettiEffect";

interface AskSectionProps {
  onReply?: (choice: "yes" | "need_time", message?: string) => void;
}

export function AskSection({ onReply }: AskSectionProps) {
  const [choice, setChoice] = useState<"yes" | "need_time" | null>(null);
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [responseSent, setResponseSent] = useState(false); // New state to track if response was sent

  const handleChoice = (selected: "yes" | "need_time") => {
    setChoice(selected);
    if (selected === "yes") {
      setShowConfetti(true);
    }
  };

  const handleSend = () => {
    if (onReply && message.trim().length > 0) {
      onReply(choice!, message);
      setResponseSent(true); // Set response sent to true after sending
    }
  };

  // If response has been sent, show thank you message
  if (responseSent) {
    return (
      <section className="py-32 md:py-48 px-4 relative overflow-hidden bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-sm border-pink-200 shadow-xl rounded-2xl p-8 md:p-12"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-pink-700">
              Thank You for Your Response
            </h2>
            <p className="text-lg text-pink-600 mb-8">
              We've received your message and are deeply moved that you took the time to respond from your heart.
              Your feelings and perspective mean everything to us, and we're incredibly grateful for the chance to prove to you that we've truly changed and are committed to being better friends.
            </p>
            <p className="text-lg text-pink-600">
              With all our love and deepest hope,<br />
              <span className="font-semibold">Your devoted friends</span>
            </p>

            {/* Removed Twilio test button */}
          </motion.div>
        </div>
      </section>
    );
  }

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
            We know we've both hurt you deeply in ways that were inexcusable, and the pain we caused has weighed heavily on our hearts every single day.
            We've spent countless nights reflecting on our mistakes and how much we've missed having you in our lives.
            We're not here with excuses, but with a sincere hope that you might find it in your heart to give us another chance to show you the friends we truly want to be.
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
              <Card className="bg-gradient-to-br from-pink-100/80 via-white/80 to-rose-50/80 backdrop-blur-sm border-pink-200 shadow-xl rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-pink-700">
                    {choice === "yes" ? "Thank You For Giving Me A Chance 🙏" : "I Understand, Take Your Time"}
                  </h3>

                  <p className="text-lg text-pink-600 mb-8">
                    {choice === "yes"
                      ? "Thank you from the bottom of my heart for giving us a chance to start over. I know words aren't enough, but I promise to show you through every action how much our friendship means to me and how committed I am to being the friend you deserve."
                      : "I completely understand and respect whatever you need. I know I have a lot to make up for, and I'll be here patiently waiting for you. Please know that I'm committed to doing whatever it takes to show you that I've truly changed and that our friendship means everything to me."}
                  </p>

                  <Textarea
                    placeholder={choice === "yes"
                      ? "Tell me what this means to you..."
                      : "Let me know what you need or when you'd like to talk..."}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[120px] text-lg p-4 mb-6 border-pink-200 focus:border-pink-400 focus:ring-pink-400 bg-white/50 placeholder-pink-400 text-black"
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