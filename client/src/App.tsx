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
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/gift" component={GiftPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showFallingElements, setShowFallingElements] = useState(false);

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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;