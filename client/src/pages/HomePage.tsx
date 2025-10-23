import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift, Lock, Eye, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [, navigate] = useLocation();
  const [showAuth, setShowAuth] = useState(false);
  const [secretWord, setSecretWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleOpenGift = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAuth(true);
  };

  const handleSecretSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      // Call the backend authentication API with a relative URL
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secretWord }),
      });

      // Check if response is OK before trying to parse JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.ok) {
        // Set authenticated state and redirect directly to the gift page
        setAuthenticated(true);
        // Redirect directly to the gift page without showing the unwrapping animation
        navigate("/gift");
      } else {
        setError(data.error || "Authentication failed. Please try again.");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background GIF - using the external URL with reduced size and borders */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-center"
        style={{
          backgroundImage: "url('https://www.funimada.com/assets/images/cards/big/bday-1281.gif')",
          backgroundSize: "80%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          border: "20px solid #8B4513",
          borderRadius: "20px",
          margin: "20px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl w-full relative z-20"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-block mb-8"
        >
          <div className="relative">
            {/* Birthday GIF as icon */}
            <img
              src="https://www.funimada.com/assets/images/cards/big/bday-1281.gif"
              alt="Happy Birthday"
              className="w-32 h-32 mx-auto rounded-lg shadow-xl border-4 border-yellow-400"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          Happy Birthday, <br />
          <span className="text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            Chandrika!
          </span>
        </motion.h1>

        <AnimatePresence mode="wait">
          {!showAuth ? (
            <motion.div
              key="initial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl mb-12 font-medium"
                style={{
                  color: '#FFD700',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  padding: '0 10px'
                }}
              >
                A special birthday surprise awaits you — click below to unwrap! 🎁
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <button
                  onClick={handleOpenGift}
                  data-testid="button-open-gift-home"
                  className="text-xl md:text-2xl px-8 py-4 md:px-12 md:py-6 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-600 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                >
                  Reveal the Surprise
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl"
            >
              <div className="flex flex-col items-center">
                <Gift className="w-16 h-16 text-yellow-300 mb-6" />

                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-white">
                  Unlock Your Gift
                </h2>

                <div className="bg-pink-900/50 rounded-xl p-4 md:p-6 mb-6 md:mb-8 w-full">
                  <div className="flex items-start mb-4">
                    <Eye className="w-6 h-6 text-yellow-300 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white mb-2">Instructions:</h3>
                      <ul className="text-pink-100 text-left space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block w-5 h-5 bg-pink-500 rounded-full text-center text-xs mr-2 mt-1 flex-shrink-0">1</span>
                          <span>Look at the back of the birthday card</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-5 h-5 bg-pink-500 rounded-full text-center text-xs mr-2 mt-1 flex-shrink-0">2</span>
                          <span>Find the secret word written there</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-5 h-5 bg-pink-500 rounded-full text-center text-xs mr-2 mt-1 flex-shrink-0">3</span>
                          <span>Enter it in the field below to unlock your surprise</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <form onSubmit={handleSecretSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="secret-word" className="block text-white font-medium mb-2 text-left">
                        Secret Word
                      </label>
                      <div className="relative">
                        <input
                          id="secret-word"
                          type="text"
                          value={secretWord}
                          onChange={(e) => setSecretWord(e.target.value)}
                          placeholder="Enter the secret word"
                          className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                          disabled={isLoading}
                        />
                        <Lock className="absolute right-3 top-3.5 w-5 h-5 text-pink-300" />
                      </div>
                    </div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-300 bg-red-900/50 p-3 rounded-lg text-sm"
                      >
                        {error}
                      </motion.p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        type="button"
                        onClick={() => setShowAuth(false)}
                        className="flex-1 px-6 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors border border-white/30 text-sm md:text-base"
                        disabled={isLoading}
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={isLoading || !secretWord.trim()}
                        className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Unlocking...
                          </>
                        ) : (
                          <>
                            Unlock Gift
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 md:mt-16"
          style={{
            color: '#FFD700',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            padding: '0 10px'
          }}
        >
          <Sparkles className="w-6 h-6 inline mx-2 animate-pulse" />
          <Sparkles className="w-6 h-6 inline mx-2 animate-pulse delay-300" />
          <Sparkles className="w-6 h-6 inline mx-2 animate-pulse delay-700" />
        </motion.div>
      </motion.div>
    </div>
  );
}