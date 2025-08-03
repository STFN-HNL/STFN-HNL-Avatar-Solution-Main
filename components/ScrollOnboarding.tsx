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
  let pointerEvents: "none" | "auto" = "none";
  
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
      id: "welcome",
      gradient: "from-accent to-primary-light",
      content: (
        <div className="bg-neutral rounded-3xl shadow-2xl overflow-hidden h-[600px] shadow-stack">
          <div className="bg-gradient-to-r from-accent/10 to-primary-light/20 p-8 border-b border-primary-light">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold text-xl">
                1
              </div>
              <h2 className="text-3xl font-bold text-primary-dark">Meet Your Practice Partner</h2>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="text-2xl font-semibold text-primary-dark">Ready to Master Sales Conversations?</h3>
              <div className="flex-1">
                <p className="text-primary-dark mb-4">
                  Meet Jacob Fischer, owner of Fischer Accounting & Tax Consulting. He's analytical, cost-conscious, and protective of sensitive client data.
                </p>
                <p className="text-primary-light">
                  Practice authentic sales conversations that build your confidence and sharpen your objection-handling skills with a realistic business prospect.
                </p>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-6 rounded-2xl">
                <p className="text-primary-dark font-semibold">
                  Start your journey to sales excellence with personalized training scenarios.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "getting-started",
      gradient: "from-primary-dark to-accent",
      content: (
        <div className="bg-neutral rounded-3xl shadow-2xl overflow-hidden h-[600px] shadow-stack">
          <div className="bg-gradient-to-r from-accent/10 to-primary-light/20 p-8 border-b border-primary-light">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold text-xl">
                2
              </div>
              <h2 className="text-3xl font-bold text-primary-dark">Before You Start</h2>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="text-2xl font-semibold text-primary-dark">Set Yourself Up for Success</h3>
              <div className="flex-1 space-y-4">
                <p className="text-primary-dark">
                  For the best training experience, use headphones and ensure you have a stable internet connection. You'll need to allow microphone access when prompted.
                </p>
                <p className="text-primary-dark">
                  Jacob processes your responses naturally - just give him 10-15 seconds to reply, just like a real prospect would.
                </p>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-6 rounded-2xl">
                <p className="text-primary-dark font-semibold">
                  Your conversation data is processed securely and not stored permanently. Now you're ready to say "START TRAINING" and begin!
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "persona-selection",
      gradient: "from-accent to-primary-dark",
      content: (
        <div className="bg-neutral rounded-3xl shadow-2xl overflow-hidden h-[600px] shadow-stack">
          <div className="bg-gradient-to-r from-accent/10 to-primary-light/20 p-8 border-b border-primary-light">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold text-xl">
                3
              </div>
              <h2 className="text-3xl font-bold text-primary-dark">Choose Your Challenge Level</h2>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="text-2xl font-semibold text-primary-dark">Which Jacob Will You Face Today?</h3>
              <div className="flex-1">
                <p className="text-primary-dark mb-4">
                  Jacob adapts his personality to match the conversations you need to master:
                </p>
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-3 rounded-xl">
                    <h4 className="font-semibold text-primary-dark mb-1">• Cautious Jacob - Risk-Averse & Security-Focused</h4>
                    <p className="text-primary-light text-sm">Perfect for practicing with compliance-conscious prospects.</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-3 rounded-xl">
                    <h4 className="font-semibold text-primary-dark mb-1">• Dominant Jacob - Hard Negotiator & Price-Focused</h4>
                    <p className="text-primary-light text-sm">Ideal for building confidence with demanding, price-sensitive prospects.</p>
                    </div>
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-3 rounded-xl">
                    <h4 className="font-semibold text-primary-dark mb-1">• Analytical Jacob - Data-Driven Decision Maker</h4>
                    <p className="text-primary-light text-sm">Great for learning to present compelling ROI and detailed comparisons.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-6 rounded-2xl">
                <p className="text-primary-dark font-medium">
                  Choose the style that matches your current learning goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "conversation-flow",
      gradient: "from-primary-light to-accent",
      content: (
        <div className="bg-neutral rounded-3xl shadow-2xl overflow-hidden h-[600px] shadow-stack">
          <div className="bg-gradient-to-r from-accent/10 to-primary-light/20 p-8 border-b border-primary-light">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold text-xl">
                4
              </div>
              <h2 className="text-3xl font-bold text-primary-dark">Navigate Like a Pro</h2>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="text-2xl font-semibold text-primary-dark">Your Roadmap to Sales Success</h3>
              <div className="flex-1">
                <p className="text-primary-dark mb-4">
                  Follow this natural progression with Jacob:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      phase: "Discovery Phase",
                      description: "Ask about his current setup, pain points, and security concerns."
                    },
                    {
                      phase: "Solution Presentation", 
                      description: "Connect your features directly to the problems he described."
                    },
                    {
                      phase: "Objection Mastery",
                      description: "Handle his concerns about cost, security, and reliability authentically."
                    },
                    {
                      phase: "Commitment Close",
                      description: "Guide the conversation toward next steps and ask for commitment."
                    }
                  ].map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="bg-accent text-primary-dark text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                        {index + 1}
                      </span>
                      <div>
                        <span className="text-primary-dark font-semibold">· {step.phase}</span>
                        <p className="text-primary-light text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-6 rounded-2xl">
                <p className="text-primary-dark font-semibold">
                  Master each phase to become a confident sales professional.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "common-objections", 
      gradient: "from-primary-light to-accent",
      content: (
        <div className="bg-neutral rounded-3xl shadow-2xl overflow-hidden h-[600px] shadow-stack">
          <div className="bg-gradient-to-r from-accent/10 to-primary-light/20 p-8 border-b border-primary-light">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold text-xl">
                5
              </div>
              <h2 className="text-3xl font-bold text-primary-dark">Expect the Unexpected</h2>
            </div>
          </div>
          <div className="p-6 flex-1 h-full flex flex-col">
            <h3 className="text-2xl font-semibold text-primary-dark mb-4">Master the Art of Objection Handling</h3>
            <p className="text-primary-dark mb-4 text-base">
              Jacob runs a successful accounting firm, so he'll challenge you just like real prospects do. Here are the types of concerns you can expect:
            </p>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl h-fit">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">Cost Concerns:</h4>
                    <p className="text-primary-light text-sm italic">"Your competitors quoted 30% less. Why should I pay more?"</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl h-fit">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">Security Worries:</h4>
                    <p className="text-primary-light text-sm italic">"One data breach could destroy my firm. How do you guarantee protection?"</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl h-fit">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">Reliability Questions:</h4>
                    <p className="text-primary-light text-sm italic">"What happens if your service goes down during tax season?"</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl h-fit">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">Status Quo Bias:</h4>
                    <p className="text-primary-light text-sm italic">"My current provider works fine. Why should I switch?"</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-2xl mt-4">
              <p className="text-primary-dark font-semibold text-base">
                Remember: Objections aren't rejections – they're buying signals. Jacob is telling you exactly what he needs to hear to move forward.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "best-practices",
      gradient: "from-primary-dark to-accent",
      content: (
        <div className="bg-neutral rounded-3xl shadow-2xl overflow-hidden h-[600px] shadow-stack">
          <div className="bg-gradient-to-r from-accent/10 to-primary-light/20 p-8 border-b border-primary-light">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold text-xl">
                6
              </div>
              <h2 className="text-3xl font-bold text-primary-dark">Conversation Excellence</h2>
            </div>
          </div>
          <div className="p-6 flex-1 h-full flex flex-col">
            <h3 className="text-2xl font-semibold text-primary-dark mb-4">Make Every Word Count</h3>
            <p className="text-primary-dark mb-4 text-base">
              Great salespeople make conversations feel natural and consultative. Here's how to shine with Jacob:
            </p>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">Listen Actively:</h4>
                    <p className="text-primary-light text-sm">When Jacob shares concerns, acknowledge them before responding. Use phrases like "I understand that's important to you..."</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">Ask Smart Questions:</h4>
                    <p className="text-primary-light text-sm">Go beyond surface-level features. Explore the emotional impact: "How do you feel when your current system has issues during busy season?"</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">Paint the Picture:</h4>
                    <p className="text-primary-light text-sm">Don't just sell telecom services – sell peace of mind, operational efficiency, and competitive advantage.</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">Build Trust:</h4>
                    <p className="text-primary-light text-sm">Share relevant examples and demonstrate expertise without overwhelming Jacob with technical jargon.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-2xl mt-4">
              <p className="text-primary-dark font-semibold text-base">
                Stay professional and confident - help Jacob solve his real business problems.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "session-management",
      gradient: "from-accent to-primary-dark",
      content: (
        <div className="bg-neutral rounded-3xl shadow-2xl overflow-hidden h-[600px] shadow-stack">
          <div className="bg-gradient-to-r from-accent/10 to-primary-light/20 p-8 border-b border-primary-light">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold text-xl">
                7
              </div>
              <h2 className="text-3xl font-bold text-primary-dark">Keep It Flowing</h2>
            </div>
          </div>
          <div className="p-6 flex-1 h-full flex flex-col">
            <h3 className="text-2xl font-semibold text-primary-dark mb-4">Technical Tips for Smooth Practice</h3>
            <p className="text-primary-dark mb-4 text-base">
              To get the most from your practice session:
            </p>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">Optimal Length:</h4>
                    <p className="text-primary-light text-sm">Aim for 7-10 meaningful exchanges. This gives you enough time to practice discovery, handle objections, and attempt a close.</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">Stay Focused:</h4>
                    <p className="text-primary-light text-sm">Jacob will stay in character as your prospect. If you need coaching or have questions about sales techniques, save those for after the session.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">Natural Rhythm:</h4>
                    <p className="text-primary-light text-sm">Let the conversation flow naturally. Jacob will pause between responses to give you time to think and respond thoughtfully.</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">Take Notes:</h4>
                    <p className="text-primary-light text-sm">Keep track of key points and objections during the conversation for better post-session analysis.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-2xl mt-4">
              <p className="text-primary-dark font-semibold text-base">
                Take notes during the conversation - you'll get detailed feedback afterward.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "feedback",
      gradient: "from-primary-light to-accent",
      content: (
        <div className="bg-neutral rounded-3xl shadow-2xl overflow-hidden h-[600px] shadow-stack">
          <div className="bg-gradient-to-r from-accent/10 to-primary-light/20 p-8 border-b border-primary-light">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold text-xl">
                8
              </div>
              <h2 className="text-3xl font-bold text-primary-dark">Transform Practice into Progress</h2>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="text-2xl font-semibold text-primary-dark">Turn Every Session into Growth</h3>
              <div className="flex-1">
                <p className="text-primary-dark mb-4">
                  When you're ready to receive feedback, simply say "END TRAINING" and Jacob switches from prospect to sales coach.
                </p>
                <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl mb-4">
                  <h4 className="font-semibold text-primary-dark mb-3 text-sm">You'll receive detailed scoring across five crucial areas:</h4>
                  <div className="space-y-1">
                    {[
                      "Discovery & Needs Assessment",
                      "Objection Handling", 
                      "Value Communication",
                      "Relationship Building",
                      "Closing Technique"
                    ].map((area, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        <span className="text-primary-dark text-xs">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-primary-dark text-sm">
                  Each score comes with specific examples from your conversation, plus actionable suggestions for improvement.
                </p>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-6 rounded-2xl">
                <p className="text-primary-dark font-semibold">
                  Jacob notices everything from your questioning technique to how you handle price objections.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "troubleshooting",
      gradient: "from-accent to-primary-light",
      content: (
        <div className="bg-neutral rounded-3xl shadow-2xl overflow-hidden h-[600px] shadow-stack">
          <div className="bg-gradient-to-r from-accent/10 to-primary-light/20 p-8 border-b border-primary-light">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold text-xl">
                9
              </div>
              <h2 className="text-3xl font-bold text-primary-dark">When Things Go Off Track</h2>
            </div>
          </div>
          <div className="p-6 flex-1 h-full flex flex-col">
            <h3 className="text-2xl font-semibold text-primary-dark mb-4">Keep Your Practice Session on Course</h3>
            <p className="text-primary-dark mb-4 text-base">
              Sometimes conversations take unexpected turns. Here's how to get back on track:
            </p>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">If Jacob seems confused:</h4>
                    <p className="text-primary-light text-sm">He might say "I'm here to evaluate your services, where were we?" This means you might have slipped into training mode instead of selling mode.</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">If you need a reset:</h4>
                    <p className="text-primary-light text-sm">Simply restart by saying "START TRAINING" again. Jacob will begin fresh, ready for another practice round.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">If technical issues occur:</h4>
                    <p className="text-primary-light text-sm">Jacob will acknowledge connection problems and guide you back to where you left off.</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary-dark mb-2 text-base">If conversation stalls:</h4>
                    <p className="text-primary-light text-sm">Ask open-ended questions about Jacob's business challenges to restart meaningful dialogue.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-2xl mt-4">
              <p className="text-primary-dark font-semibold text-base">
                Remember: Jacob is designed to be a realistic prospect, so some pushback and skepticism is normal and beneficial for your learning.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "success-metrics",
      gradient: "from-primary-dark to-accent",
      content: (
        <div className="bg-neutral rounded-3xl shadow-2xl overflow-hidden h-[600px] shadow-stack">
          <div className="bg-gradient-to-r from-accent/10 to-primary-light/20 p-6 border-b border-primary-light">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary-dark font-bold text-xl">
                10
              </div>
              <h2 className="text-3xl font-bold text-primary-dark">Measure Your Growth</h2>
            </div>
          </div>
          <div className="p-6 flex-1 h-full flex flex-col">
            <h3 className="text-2xl font-semibold text-primary-dark mb-4">Know When You're Winning</h3>
            <p className="text-primary-dark mb-4 text-base">
              Great sales conversations have measurable qualities. Here's what success looks like with Jacob:
            </p>
            <div className="flex-1 min-h-0">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-primary-dark text-sm">You asked discovery questions that uncovered Jacob's specific business challenges</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-primary-dark text-sm">You handled his objections with relevant proof points and genuine empathy</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-primary-dark text-sm">You connected features to benefits that mattered to his accounting firm</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-primary-dark text-sm">You built rapport while maintaining professional credibility</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-primary-dark text-sm">You guided toward commitment with natural, non-pushy closing techniques</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-primary-light/20 p-4 rounded-2xl mt-2">
              <p className="text-primary-dark font-semibold text-base text-center">
                Master these skills here, and you'll excel in the field.
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
                ? "bg-neutral scale-125 shadow-lg"
                : index < activeCard
                ? "bg-accent"
                : "bg-primary-light bg-opacity-50"
            }`}
            onClick={() => setActiveCard(index)}
          />
        ))}
      </div>

      {/* Background gradient that changes based on active card */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br ${cards[activeCard]?.gradient || 'from-accent to-primary-light'} transition-all duration-700`}
      />

      {/* Navigation hint */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center z-40">
        {activeCard < cards.length - 1 ? (
          <p className="text-sm opacity-75">
            Use mouse wheel, arrow keys, or click dots to navigate
          </p>
        ) : (
          <p className="text-sm opacity-75">
            Ready to start your sales training?
          </p>
        )}
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

      {/* Start button - appears when on last card - MOVED AFTER CARDS */}
      {activeCard === cards.length - 1 && (
        <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-[110]">
          <Button 
            onClick={onComplete}
            className="bg-accent hover:bg-accent/80 text-primary-dark px-10 py-5 text-2xl font-bold rounded-3xl transition-all duration-300 transform hover:scale-110 shadow-2xl"
          >
            Start Sales Training with Jacob
          </Button>
        </div>
      )}

      {/* Debug info */}
      <div className="fixed bottom-4 left-4 text-neutral bg-primary-dark bg-opacity-50 p-2 rounded text-sm">
        Card: {activeCard + 1}/{cards.length}
      </div>
    </div>
  );
}; 