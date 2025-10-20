import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import GiftPage from "@/pages/GiftPage";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/not-found";
import { useEffect, useState, useRef } from "react";

function Router() {
  const urlParams = new URLSearchParams(window.location.search);
  const hasWord = urlParams.has("word");

  return (
    <Switch>
      <Route path="/" component={hasWord ? GiftPage : HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showFallingElements, setShowFallingElements] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");

    // Show falling elements on special occasions or user interactions
    // For now, we'll show them when the app loads
    const timer = setTimeout(() => {
      setShowFallingElements(true);
    }, 2000);

    // Also show them on user interaction
    const handleUserInteraction = () => {
      setShowFallingElements(true);
      // Remove event listeners after first interaction
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  // Handle background audio
  useEffect(() => {
    if (audioRef.current) {
      // Set background music volume to 40%
      audioRef.current.volume = 0.4;

      // Try to play the audio automatically when the component mounts
      const attemptAutoPlay = async () => {
        try {
          // Attempt autoplay
          await audioRef.current!.play();
        } catch (error) {
          // Auto-play was prevented by browser policies
          console.log("Auto-play prevented by browser:", error);
        }
      };

      attemptAutoPlay();

      // Set up a more reliable autoplay mechanism
      const enableAutoPlay = () => {
        if (audioRef.current) {
          audioRef.current.play()
            .catch((error) => {
              console.log("Failed to play on user interaction:", error);
            });
        }
      };

      // Add event listeners for various user interactions
      const userEvents = ['click', 'touchstart', 'keydown', 'scroll'];
      userEvents.forEach(event => {
        document.addEventListener(event, enableAutoPlay, { once: true });
      });

      // Cleanup event listeners on component unmount
      return () => {
        userEvents.forEach(event => {
          document.removeEventListener(event, enableAutoPlay);
        });
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <audio
          ref={audioRef}
          loop
          src="/panda-song.mp3"
        />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;