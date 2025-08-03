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
  // Calculate transforms for proper stacking effect with Heinrich Co. sophistication
  let transform = "";
  let opacity = 1;
  let zIndex = 50 - index;
  let pointerEvents: "none" | "auto" = "none";
  
  if (isPassed) {
    // Cards that have been passed - elegant fade with upward movement
    transform = `translateY(-200vh) scale(0.95)`;
    opacity = 0;
    zIndex = 1;
  } else if (isActive) {
    // Active card - center, full size, with subtle elevation
    transform = `translateY(0px) scale(1)`;
    opacity = 1;
    zIndex = 100;
    pointerEvents = "auto";
  } else {
    // Future cards - sophisticated stacking with premium feel
    const offset = index * 25;
    transform = `translateY(${offset + 30}px) scale(${0.96 - (index * 0.015)})`;
    opacity = Math.max(0.4, 0.85 - (index * 0.12));
    zIndex = 50 - index;
  }
  
  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-6"
      style={{
        zIndex: zIndex,
        transform: transform,
        opacity: opacity,
        transition: 'all 400ms cubic-bezier(0.4, 0.0, 0.2, 1)', // Heinrich Co. sophisticated timing
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
      gradient: "from-accent/20 to-primary-light/30",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          {/* Heinrich Co. inspired header */}
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                1
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">Meet Your Practice Partner</h2>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="text-2xl font-medium text-primary-dark">Ready to Master Sales Conversations?</h3>
              <div className="flex-1">
                <p className="text-primary-dark/80 mb-4 leading-relaxed">
                  Meet Jacob Fischer, owner of Fischer Accounting & Tax Consulting. He's analytical, cost-conscious, and protective of sensitive client data.
                </p>
                <p className="text-primary-dark/70 leading-relaxed">
                  Practice authentic sales conversations that build your confidence and sharpen your objection-handling skills with a realistic business prospect.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-6 rounded-xl border border-primary-light/20">
                <p className="text-primary-dark font-medium">
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
      gradient: "from-primary-dark/20 to-accent/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                2
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">Before You Start</h2>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="text-2xl font-medium text-primary-dark">Set Yourself Up for Success</h3>
              <div className="flex-1 space-y-4">
                <p className="text-primary-dark/80 leading-relaxed">
                  For the best training experience, use headphones and ensure you have a stable internet connection. You'll need to allow microphone access when prompted.
                </p>
                <p className="text-primary-dark/80 leading-relaxed">
                  Jacob processes your responses naturally - just give him 10-15 seconds to reply, just like a real prospect would.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-6 rounded-xl border border-primary-light/20">
                <p className="text-primary-dark font-medium">
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
      gradient: "from-accent/20 to-primary-dark/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                3
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">Choose Your Challenge Level</h2>
            </div>
          </div>
          <div className="p-6 flex-1">
            <div className="space-y-4 h-full flex flex-col">
              <h3 className="text-2xl font-medium text-primary-dark">Which Jacob Will You Face Today?</h3>
              <div className="flex-1">
                <p className="text-primary-dark/80 mb-3 leading-relaxed">
                  Jacob adapts his personality to match the conversations you need to master:
                </p>
                <div className="space-y-2">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-3 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-1">• Cautious Jacob - Risk-Averse & Security-Focused</h4>
                    <p className="text-primary-dark/70 text-sm">Perfect for practicing with compliance-conscious prospects.</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-3 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-1">• Dominant Jacob - Hard Negotiator & Price-Focused</h4>
                    <p className="text-primary-dark/70 text-sm">Ideal for building confidence with demanding, price-sensitive prospects.</p>
                    </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-3 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-1">• Analytical Jacob - Data-Driven Decision Maker</h4>
                    <p className="text-primary-dark/70 text-sm">Great for learning to present compelling ROI and detailed comparisons.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-4 rounded-xl border border-primary-light/20">
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
      gradient: "from-primary-light/20 to-accent/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                4
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">Navigate Like a Pro</h2>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="text-2xl font-medium text-primary-dark">Your Roadmap to Sales Success</h3>
              <div className="flex-1">
                <p className="text-primary-dark/80 mb-4 leading-relaxed">
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
                        <span className="text-primary-dark font-medium">{step.phase}</span>
                        <p className="text-primary-dark/70">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-6 rounded-xl border border-primary-light/20">
                <p className="text-primary-dark font-medium">
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
      gradient: "from-primary-light/20 to-accent/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                5
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">Expect the Unexpected</h2>
            </div>
          </div>
          <div className="p-6 flex-1 h-full flex flex-col">
            <h3 className="text-2xl font-medium text-primary-dark mb-4">Master the Art of Objection Handling</h3>
            <p className="text-primary-dark/80 mb-4 leading-relaxed">
              Jacob runs a successful accounting firm, so he'll challenge you just like real prospects do. Here are the types of concerns you can expect:
            </p>
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl h-fit border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">Cost Concerns:</h4>
                    <p className="text-primary-dark/70 italic">"Your competitors quoted 30% less. Why should I pay more?"</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl h-fit border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">Security Worries:</h4>
                    <p className="text-primary-dark/70 italic">"One data breach could destroy my firm. How do you guarantee protection?"</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl h-fit border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">Reliability Questions:</h4>
                    <p className="text-primary-dark/70 italic">"What happens if your service goes down during tax season?"</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl h-fit border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">Status Quo Bias:</h4>
                    <p className="text-primary-dark/70 italic">"My current provider works fine. Why should I switch?"</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-primary-dark font-medium">
              Remember: Objections aren't rejections – they're buying signals. Jacob is telling you exactly what he needs to hear to move forward.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "best-practices",
      gradient: "from-primary-dark/20 to-accent/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                6
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">Conversation Excellence</h2>
            </div>
          </div>
          <div className="p-6 flex-1 h-full flex flex-col">
            <h3 className="text-2xl font-medium text-primary-dark mb-4">Make Every Word Count</h3>
            <p className="text-primary-dark/80 mb-4 leading-relaxed">
              Great salespeople make conversations feel natural and consultative. Here's how to shine with Jacob:
            </p>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">Listen Actively:</h4>
                    <p className="text-primary-dark/70">When Jacob shares concerns, acknowledge them before responding. Use phrases like "I understand that's important to you..."</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">Ask Smart Questions:</h4>
                    <p className="text-primary-dark/70">Go beyond surface-level features. Explore the emotional impact: "How do you feel when your current system has issues during busy season?"</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">Paint the Picture:</h4>
                    <p className="text-primary-dark/70">Don't just sell telecom services – sell peace of mind, operational efficiency, and competitive advantage.</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">Build Trust:</h4>
                    <p className="text-primary-dark/70">Share relevant examples and demonstrate expertise without overwhelming Jacob with technical jargon.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-4 rounded-xl mt-4 border border-primary-light/20">
              <p className="text-primary-dark font-medium">
                Stay professional and confident - help Jacob solve his real business problems.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "session-management",
      gradient: "from-accent/20 to-primary-dark/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                7
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">Keep It Flowing</h2>
            </div>
          </div>
          <div className="p-6 flex-1 h-full flex flex-col">
            <h3 className="text-2xl font-medium text-primary-dark mb-4">Technical Tips for Smooth Practice</h3>
            <p className="text-primary-dark/80 mb-4 leading-relaxed">
              To get the most from your practice session:
            </p>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">Optimal Length:</h4>
                    <p className="text-primary-dark/70">Aim for 7-10 meaningful exchanges. This gives you enough time to practice discovery, handle objections, and attempt a close.</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">Stay Focused:</h4>
                    <p className="text-primary-dark/70">Jacob will stay in character as your prospect. If you need coaching or have questions about sales techniques, save those for after the session.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">Natural Rhythm:</h4>
                    <p className="text-primary-dark/70">Let the conversation flow naturally. Jacob will pause between responses to give you time to think and respond thoughtfully.</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">Take Notes:</h4>
                    <p className="text-primary-dark/70">Keep track of key points and objections during the conversation for better post-session analysis.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-4 rounded-xl mt-4 border border-primary-light/20">
              <p className="text-primary-dark font-medium">
                Take notes during the conversation - you'll get detailed feedback afterward.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "feedback",
      gradient: "from-primary-light/20 to-accent/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                8
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">Transform Practice into Progress</h2>
            </div>
          </div>
          <div className="p-8 flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <h3 className="text-2xl font-medium text-primary-dark">Turn Every Session into Growth</h3>
              <div className="flex-1">
                <p className="text-primary-dark/80 mb-4 leading-relaxed">
                  When you're ready to receive feedback, simply say "END TRAINING" and Jacob switches from prospect to sales coach.
                </p>
                <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl mb-4 border border-primary-light/20">
                  <h4 className="font-medium text-primary-dark mb-3 text-sm">You'll receive detailed scoring across five crucial areas:</h4>
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
                        <span className="text-primary-dark text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-primary-dark/80 leading-relaxed">
                  Each score comes with specific examples from your conversation, plus actionable suggestions for improvement.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-6 rounded-xl border border-primary-light/20">
                <p className="text-primary-dark font-medium">
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
      gradient: "from-accent/20 to-primary-light/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-8 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                9
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">When Things Go Off Track</h2>
            </div>
          </div>
          <div className="p-6 flex-1 h-full flex flex-col">
            <h3 className="text-2xl font-medium text-primary-dark mb-4">Keep Your Practice Session on Course</h3>
            <p className="text-primary-dark/80 mb-4 leading-relaxed">
              Sometimes conversations take unexpected turns. Here's how to get back on track:
            </p>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">If Jacob seems confused:</h4>
                    <p className="text-primary-dark/70">He might say "I'm here to evaluate your services, where were we?" This means you might have slipped into training mode instead of selling mode.</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">If you need a reset:</h4>
                    <p className="text-primary-dark/70">Simply restart by saying "START TRAINING" again. Jacob will begin fresh, ready for another practice round.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">If technical issues occur:</h4>
                    <p className="text-primary-dark/70">Jacob will acknowledge connection problems and guide you back to where you left off.</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-light/15 to-accent/8 p-4 rounded-xl border border-primary-light/20 hover:shadow-paper transition-all duration-400">
                    <h4 className="font-medium text-primary-dark mb-2">If conversation stalls:</h4>
                    <p className="text-primary-dark/70">Ask open-ended questions about Jacob's business challenges to restart meaningful dialogue.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-4 rounded-xl mt-4 border border-primary-light/20">
              <p className="text-primary-dark font-medium">
                Remember: Jacob is designed to be a realistic prospect, so some pushback and skepticism is normal and beneficial for your learning.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "success-metrics",
      gradient: "from-primary-dark/20 to-accent/20",
      content: (
        <div className="bg-neutral rounded-2xl shadow-heinrich overflow-hidden h-[600px] border border-primary-light/20">
          <div className="bg-gradient-to-r from-primary-light/10 to-accent/5 p-6 border-b border-primary-light/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark font-bold text-xl shadow-paper">
                10
              </div>
              <h2 className="text-3xl font-light text-primary-dark tracking-wide">Measure Your Growth</h2>
            </div>
          </div>
          <div className="p-6 flex-1 h-full flex flex-col">
            <h3 className="text-2xl font-medium text-primary-dark mb-4">Know When You're Winning</h3>
            <p className="text-primary-dark/80 mb-4 leading-relaxed">
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
                    <p className="text-primary-dark/80">You asked discovery questions that uncovered Jacob's specific business challenges</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-primary-dark/80">You handled his objections with relevant proof points and genuine empathy</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-primary-dark/80">You connected features to benefits that mattered to his accounting firm</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-primary-dark/80">You built rapport while maintaining professional credibility</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-primary-dark/80">You guided toward commitment with natural, non-pushy closing techniques</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-light/15 to-accent/10 p-4 rounded-xl mt-2 border border-primary-light/20">
              <p className="text-primary-dark font-medium text-center">
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
      {/* Heinrich Co. inspired progress indicator */}
      <div className="fixed top-8 right-8 z-50 flex space-x-3">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-400 cursor-pointer ${
              index === activeCard
                ? "bg-primary-dark scale-125 shadow-heinrich"
                : index < activeCard
                ? "bg-accent shadow-paper"
                : "bg-primary-light/50"
            }`}
            onClick={() => setActiveCard(index)}
          />
        ))}
      </div>

      {/* Sophisticated background gradient */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br ${cards[activeCard]?.gradient || 'from-accent/20 to-primary-light/30'} transition-all duration-700`}
      />

      {/* Heinrich Co. navigation hint */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-primary-dark text-center z-40">
        {activeCard < cards.length - 1 ? (
          <p className="text-sm opacity-75 font-light">
            Use mouse wheel, arrow keys, or click dots to navigate
          </p>
        ) : (
          <p className="text-sm opacity-75 font-light">
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

      {/* Heinrich Co. inspired CTA button */}
      {activeCard === cards.length - 1 && (
        <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-[110]">
          <Button 
            onClick={onComplete}
            className="bg-primary-dark hover:bg-primary-dark/90 text-white px-12 py-6 text-xl font-medium rounded-xl transition-all duration-400 transform hover:scale-105 hover:shadow-heinrich-hover border border-primary-light/20"
          >
            Start Sales Training with Jacob
          </Button>
        </div>
      )}

      {/* Debug info with Heinrich Co. styling */}
      <div className="fixed bottom-4 left-4 text-primary-dark bg-neutral/80 backdrop-blur-sm border border-primary-light/30 p-3 rounded-xl text-sm font-light">
        Card: {activeCard + 1}/{cards.length}
      </div>
    </div>
  );
}; 