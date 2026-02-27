"use client";

import { useState, useEffect } from "react";
import { Recycle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AppPreloader() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show preloader for 1.5s then fade out
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShow(false), 500); // Wait for fade out animation
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500",
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <div className="relative flex flex-col items-center">
        <div className="bg-primary p-6 rounded-3xl shadow-2xl shadow-primary/20 animate-bounce mb-6">
          <Recycle className="h-16 w-16 text-primary-foreground" />
        </div>
        <h1 className="font-headline text-4xl font-black tracking-tighter text-primary">
          Scrapio
        </h1>
        <p className="text-muted-foreground font-medium mt-2 animate-pulse">
          Simplifying Sustainability...
        </p>
      </div>
    </div>
  );
}
