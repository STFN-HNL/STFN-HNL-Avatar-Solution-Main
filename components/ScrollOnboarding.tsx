"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./Button";

interface ScrollOnboardingProps {
  onComplete: () => void;
}

interface StackedCardProps {
  children: React.ReactNode;
  index: number;
  isActive: boolean;
  isPassed: boolean;
  progress: number;
}

const StackedCard: React.FC<StackedCardProps> = ({ 
  children, 
  index, 
  isActive,
  isPassed,
  progress
}) => {
  // Calculate transforms for proper stacking effect
  let transform = "";
  let opacity = 1;
  let zIndex = 50 - index;
  let pointerEvents = "none";
  
  if (isPassed) {
    // Cards that have been passed - completely hide them
    transform = `translateY(-200vh) scale(0.5)`;
    opacity = 0;
    zIndex = 1; // Send them to the back
  } else if (isActive) {
    // Active card - center, full size, and on top
    transform = `translateY(0px) scale(1)`;
    opacity = 1;
    zIndex = 100; // Ensure active card is always on top
    pointerEvents = "auto"; // Make it interactive
  } else {
    // Future cards - stack them behind, much further back
    const offset = index * 30; // Simple offset calculation
    transform = `translateY(${offset + 40}px) scale(${0.95 - (index * 0.02)})`;
    opacity = Math.max(0.3, 0.8 - (index * 0.15));
    zIndex = 50 - index;
  }
  
  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-6"
      style={{
        zIndex: zIndex,
        transform: transform,
        opacity: opacity,
        transition: 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)',
        pointerEvents: pointerEvents,
      }}
    >
      <div className="max-w-5xl w-full">
        {children}
      </div>
    </div>
  );
};

export const ScrollOnboarding: React.FC<ScrollOnboardingProps> = ({ onComplete }) => {
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      id: "hero",
      gradient: "from-blue-500 to-purple-600",
      content: (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex items-center shadow-stack">
          <div className="w-full p-12 text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Smart Conversations,
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Real Results
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the future of AI-powered customer interactions with our interactive avatar demo
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-bounce">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Scroll down to continue</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "step1",
      gradient: "from-emerald-500 to-blue-600",
      content: (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] shadow-stack">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome to Your Demo</h2>
            </div>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">What You'll Experience</h3>
                <div className="space-y-4">
                  {[
                    "Interactive AI avatar conversations",
                    "Real-time voice and text interactions",
                    "Telecom customer service simulation",
                    "Professional business communication"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
                <h4 className="font-semibold text-gray-800 mb-3">Demo Overview</h4>
                <p className="text-gray-600 mb-4">
                  You'll interact with an AI avatar playing the role of a telecom customer service representative. 
                  Experience natural conversations and realistic customer service scenarios.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-600">Duration: ~10 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "step2",
      gradient: "from-purple-500 to-pink-600",
      content: (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] shadow-stack">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Before You Start</h2>
            </div>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Technical Requirements</h3>
                <div className="space-y-4">
                  {[
                    "Use headphones for the best experience",
                    "Ensure stable internet connection",
                    "Allow microphone access when prompted",
                    "Be patient - responses take 10-15 seconds"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">!</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Important Note</h4>
                      <p className="text-gray-700 text-sm">
                        This is AI technology, not a human. It's sophisticated but may have limitations. 
                        Perfect for learning and experiencing modern customer service solutions.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Privacy & Security</h4>
                  <p className="text-gray-700 text-sm">
                    Your conversation data is processed securely and not stored permanently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "step3",
      gradient: "from-indigo-500 to-purple-600",
      content: (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] shadow-stack">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <h2 className="text-3xl font-bold text-gray-900">How to Interact</h2>
            </div>
          </div>
          <div className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Your Role</h3>
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-blue-800 font-medium">You are the customer</p>
                  </div>
                  <p className="text-blue-700 text-sm">
                    Interact naturally with the AI service agent. Ask questions, request help, or simulate real customer scenarios.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Getting Started</h3>
                <div className="space-y-3">
                  {[
                    'Say "START Training" to begin',
                    'Ask about telecom services',
                    'Try billing or technical questions',
                    'End with "End session and give feedback"'
                  ].map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl">
              <h4 className="font-semibold text-gray-800 mb-4">Sample Conversation Starters</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-700">Service Inquiries</h5>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>• "What plans do you offer?"</p>
                    <p>• "Can you explain your data packages?"</p>
                    <p>• "What's included in your premium plan?"</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-700">Support Issues</h5>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>• "I'm having connection issues"</p>
                    <p>• "Can you help with my billing?"</p>
                    <p>• "My internet is running slowly"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "ready",
      gradient: "from-green-500 to-emerald-600",
      content: (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex items-center shadow-stack">
          <div className="w-full p-12 text-center space-y-8">
            <div className="space-y-6">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Ready to Begin?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Click the button below to start your interactive customer service session with our AI avatar.
              </p>
            </div>
            <div className="space-y-4">
              <Button 
                onClick={onComplete}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-12 py-6 text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Start Avatar Session
              </Button>
              <p className="text-sm text-gray-500">
                The avatar will appear and introduce itself
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Simple wheel scroll handler
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0 && activeCard < cards.length - 1) {
          // Scroll down - next card
          setActiveCard(prev => Math.min(prev + 1, cards.length - 1));
        } else if (e.deltaY < 0 && activeCard > 0) {
          // Scroll up - previous card
          setActiveCard(prev => Math.max(prev - 1, 0));
        }
      }, 50);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          setActiveCard(prev => Math.min(prev + 1, cards.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveCard(prev => Math.max(prev - 1, 0));
          break;
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      clearTimeout(scrollTimeout);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCard, cards.length]);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden">
      {/* Progress indicator */}
      <div className="fixed top-8 right-8 z-50 flex space-x-2">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === activeCard
                ? "bg-white scale-125 shadow-lg"
                : index < activeCard
                ? "bg-green-400"
                : "bg-gray-400 bg-opacity-50"
            }`}
            onClick={() => setActiveCard(index)}
          />
        ))}
      </div>

      {/* Background gradient that changes based on active card */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br ${cards[activeCard]?.gradient || 'from-blue-500 to-purple-600'} transition-all duration-700`}
      />

      {/* Navigation hint */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center z-40">
        <p className="text-sm opacity-75">
          Use mouse wheel, arrow keys, or click dots to navigate
        </p>
      </div>

      {/* Stacked cards */}
      {cards.map((card, index) => (
        <StackedCard
          key={card.id}
          index={index}
          isActive={activeCard === index}
          isPassed={index < activeCard}
          progress={0}
        >
          {card.content}
        </StackedCard>
      ))}

      {/* Debug info */}
      <div className="fixed bottom-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded text-sm">
        Card: {activeCard + 1}/{cards.length}
      </div>
    </div>
  );
}; 