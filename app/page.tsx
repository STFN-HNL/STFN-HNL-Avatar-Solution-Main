"use client";

import { useState } from "react";

import InteractiveAvatar from "@/components/InteractiveAvatar";
import { ScrollOnboarding } from "@/components/ScrollOnboarding";

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOnboardingComplete = () => {
    setIsTransitioning(true);
    // Delay the actual switch to allow for smooth transition
    setTimeout(() => {
      setShowOnboarding(false);
      setIsTransitioning(false);
    }, 800); // 800ms transition duration
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Shared background that persists during transition */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary-dark to-accent transition-all duration-1000" />

      {/* Onboarding - fades out during transition */}
      {showOnboarding && (
        <div
          className={`absolute inset-0 transition-all duration-800 ${
            isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <ScrollOnboarding onComplete={handleOnboardingComplete} />
        </div>
      )}

      {/* Avatar Interface - fades in during transition */}
      {(!showOnboarding || isTransitioning) && (
        <div
          className={`absolute inset-0 transition-all duration-800 ${
            showOnboarding
              ? "opacity-0 scale-105 translate-y-10"
              : "opacity-100 scale-100 translate-y-0"
          }`}
        >
          <InteractiveAvatar />
        </div>
      )}
    </div>
  );
}
