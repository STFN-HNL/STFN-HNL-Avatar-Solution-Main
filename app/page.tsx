"use client";

import InteractiveAvatar from "@/components/InteractiveAvatar";
import { ScrollOnboarding } from "@/components/ScrollOnboarding";
import { useState } from "react";

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return (
    <>
      {showOnboarding ? (
        <ScrollOnboarding onComplete={handleOnboardingComplete} />
      ) : (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral via-primary-light/10 to-accent/10">
          {/* Avatar appears after onboarding with smooth transition */}
          <div className="w-[960px] flex flex-col items-start justify-start gap-5 mx-auto animate-fade-in">
            <div className="w-full">
              <InteractiveAvatar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
