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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to your interactive telco demo session.</h2>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-blue-800 font-medium">
              In this interactive simulation, you will experience a virtual telco customer service interaction:
            </p>
            <p className="text-blue-700 mt-2 font-semibold">
              Customer Service – Support, Solutions, Satisfaction – for effective customer interactions
            </p>
          </div>

          <p className="text-gray-600">
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">✅ Before You Start</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">Use headphones for the best experience</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">Ensure a stable internet connection – the avatar requires good connectivity</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">Be patient – responses can take 10–15 seconds</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">This is AI, not a human – it's not perfect, but it's a powerful way to learn</p>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Your Role</h2>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 space-y-2">
              <p className="text-yellow-800"><strong>You are the customer</strong> – your job is to interact with the service agent</p>
              <p className="text-yellow-800"><strong>The avatar is the service agent</strong> – they will assist you</p>
              <p className="text-yellow-700 text-sm">If the avatar gets confused, say: <em>"Stay in the role of your prompt."</em></p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🛠️ How to Use</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">1</span>
                <p className="text-gray-700">Click 'Start session' to begin</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">2</span>
                <p className="text-gray-700">Select your preferred language when the session starts</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">3</span>
                <p className="text-gray-700">Type 'START Session' to begin the interaction</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">4</span>
                <p className="text-gray-700">Ask questions about telco services, billing, or technical support</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">5</span>
                <p className="text-gray-700">Say: <em>"End session and give feedback."</em></p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">6</span>
                <p className="text-gray-700">Receive personalized feedback on your interaction</p>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🔍 Want to Learn More?</h2>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 space-y-3">
              <p className="text-green-800 font-medium">Try asking questions like:</p>
              <div className="space-y-2 text-green-700">
                <p>• "Can you explain more about [specific service]?"</p>
                <p>• "What are the benefits of this plan?"</p>
                <p>• "How can I troubleshoot this issue?"</p>
                <p>• "What other services do you offer?"</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-6 rounded-lg text-white text-center">
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
          <span className="text-sm font-medium text-gray-500">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm text-gray-500">{steps[currentStep].title}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto mb-6">
        {steps[currentStep].content}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300"
        >
          Previous
        </Button>
        
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
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