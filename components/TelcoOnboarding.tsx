import React, { useState } from "react";
import { Button } from "./Button";

interface TelcoOnboardingProps {
  onComplete: () => void;
}

export const TelcoOnboarding: React.FC<TelcoOnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Telco Demo",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-primary-dark mb-4">Welcome to your interactive telco demo session.</h2>
          
          <div className="bg-accent/20 p-4 rounded-lg border border-accent/30">
            <p className="text-primary-dark font-medium">
              In this interactive simulation, you will experience a virtual telco customer service interaction:
            </p>
            <p className="text-primary-dark mt-2 font-semibold">
              Customer Service – Support, Solutions, Satisfaction – for effective customer interactions
            </p>
          </div>

          <p className="text-primary-light">
            The virtual agent will respond naturally—sometimes helpful, sometimes uncertain, and occasionally challenged. 
            Your task is to stay engaged, ask relevant questions, and experience the service quality.
          </p>
        </div>
      )
    },
    {
      title: "Before You Start",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-primary-dark mb-4">✅ Before You Start</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-primary-dark">Use headphones for the best experience</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-primary-dark">Ensure a stable internet connection – the avatar requires good connectivity</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-primary-dark">Be patient – responses can take 10–15 seconds</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-primary-dark">This is AI, not a human – it's not perfect, but it's a powerful way to learn</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Your Role & How to Use",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">🎯 Your Role</h2>
            <div className="bg-accent/20 p-4 rounded-lg border border-accent/30 space-y-2">
              <p className="text-primary-dark"><strong>You are the customer</strong> – your job is to interact with the service agent</p>
              <p className="text-primary-dark"><strong>The avatar is the service agent</strong> – they will assist you</p>
              <p className="text-primary-light text-sm">If the avatar gets confused, say: <em>"Stay in the role of your prompt."</em></p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">🛠️ How to Use</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="bg-accent text-primary-dark text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">1</span>
                <p className="text-primary-dark">Click 'Start session' to begin</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-accent text-primary-dark text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">2</span>
                <p className="text-primary-dark">Select your preferred language when the session starts</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-accent text-primary-dark text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">3</span>
                <p className="text-primary-dark">Type 'START Session' to begin the interaction</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-accent text-primary-dark text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">4</span>
                <p className="text-primary-dark">Ask questions about telco services, billing, or technical support</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-accent text-primary-dark text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">5</span>
                <p className="text-primary-dark">Say: <em>"End session and give feedback."</em></p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-accent text-primary-dark text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">6</span>
                <p className="text-primary-dark">Receive personalized feedback on your interaction</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Sample Questions & Ready to Start",
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-primary-dark mb-4">🔍 Want to Learn More?</h2>
            <div className="bg-accent/20 p-4 rounded-lg border border-accent/30 space-y-3">
              <p className="text-primary-dark font-medium">Try asking questions like:</p>
              <div className="space-y-2 text-primary-dark">
                <p>• "Can you explain more about [specific service]?"</p>
                <p>• "What are the benefits of this plan?"</p>
                <p>• "How can I troubleshoot this issue?"</p>
                <p>• "What other services do you offer?"</p>
              </div>
            </div>
          </div>

          <div className="bg-accent p-6 rounded-lg text-primary-dark text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Begin Your Telco Demo?</h3>
            <p className="mb-4">Click the button below to start your interactive customer service session.</p>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="relative flex flex-col w-[800px] max-h-[600px] py-8 px-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-primary-light">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm text-primary-light">{steps[currentStep].title}</span>
        </div>
        <div className="w-full bg-primary-light/30 rounded-full h-2">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto mb-6">
        {steps[currentStep].content}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-primary-light">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="bg-primary-light hover:bg-primary-light/80 disabled:bg-primary-light/50 text-primary-dark"
        >
          Previous
        </Button>
        
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentStep ? 'bg-accent' : 'bg-primary-light/50'
              }`}
            />
          ))}
        </div>

        <Button onClick={handleNext}>
          {currentStep < steps.length - 1 ? 'Next' : 'Start Session'}
        </Button>
      </div>
    </div>
  );
}; 