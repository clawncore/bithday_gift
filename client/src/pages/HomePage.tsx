import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift, Lock, Eye, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { apiCall } from "@/lib/utils";

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

    // Mock authentication - if demo is entered, grant access
    if (secretWord.trim().toLowerCase() === 'demo') {
      // Set authenticated state and redirect directly to the gift page
      setAuthenticated(true);
      // Redirect directly to the gift page without showing the unwrapping animation
      navigate("/gift");
    } else {
      setError("Wrong word! Hint: What is the demo password?");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background image - using the local file you provided covering the whole page */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-center"
        style={{
          backgroundImage: "url('/happy birthday background photo.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Glitter effects */}
      <div className="absolute inset-0 z-10">
        {/* Multiple glitter elements for animation */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-300 rounded-full animate-ping opacity-70"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-pink-300 rounded-full animate-ping opacity-60 delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-purple-300 rounded-full animate-ping opacity-50 delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-ping opacity-80 delay-300"></div>
        <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-green-300 rounded-full animate-ping opacity-60 delay-1500"></div>
        <div className="absolute top-1/5 right-1/5 w-2 h-2 bg-red-300 rounded-full animate-ping opacity-70 delay-500"></div>
        <div className="absolute bottom-1/5 left-1/5 w-3 h-3 bg-indigo-300 rounded-full animate-ping opacity-60 delay-1200"></div>
      </div>

      {/* Flower decorations */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-8 left-8 text-pink-400 opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.994l-3.5-3.5a1 1 0 00-1.414 1.414L11.586 10l-2.793 2.793a1 1 0 101.414 1.414l3.5-3.5a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute top-12 right-12 text-purple-400 opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.994l-3.5-3.5a1 1 0 00-1.414 1.414L11.586 10l-2.793 2.793a1 1 0 101.414 1.414l3.5-3.5a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute bottom-16 left-16 text-yellow-300 opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.994l-3.5-3.5a1 1 0 00-1.414 1.414L11.586 10l-2.793 2.793a1 1 0 101.414 1.414l3.5-3.5a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-20 text-blue-300 opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-11 w-11" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.994l-3.5-3.5a1 1 0 00-1.414 1.414L11.586 10l-2.793 2.793a1 1 0 101.414 1.414l3.5-3.5a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        {/* Additional flowers */}
        <div className="absolute top-1/4 right-1/4 text-green-400 opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.994l-3.5-3.5a1 1 0 00-1.414 1.414L11.586 10l-2.793 2.793a1 1 0 101.414 1.414l3.5-3.5a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute bottom-1/4 left-1/4 text-red-400 opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.994l-3.5-3.5a1 1 0 00-1.414 1.414L11.586 10l-2.793 2.793a1 1 0 101.414 1.414l3.5-3.5a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

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
            {/* Birthday GIF removed as requested */}
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent">
            Happy Birthday,
          </span>
          <br />
          <span className="text-5xl md:text-7xl lg:text-8xl bg-gradient-to-r from-red-600 via-red-700 to-red-900 bg-clip-text text-transparent">
            Jane Doe!
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
                      <h3 className="font-bold text-white mb-2">Demo Version:</h3>
                      <ul className="text-pink-100 text-left space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block w-5 h-5 bg-pink-500 rounded-full text-center text-xs mr-2 mt-1 flex-shrink-0">1</span>
                          <span>This is a demo version - no authentication required</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-5 h-5 bg-pink-500 rounded-full text-center text-xs mr-2 mt-1 flex-shrink-0">2</span>
                          <span>Simply enter <strong>demo</strong> in the field below to access the gift</span>
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
                          placeholder="Enter 'demo' to unlock"
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