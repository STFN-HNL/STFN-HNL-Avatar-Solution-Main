export interface EnvironmentConfig {
  avatars: Array<{
    avatar_id: string;
    name: string;
  }>;
  features: {
    openAI: boolean;
    analytics: boolean;
    voiceChat: boolean;
    textChat: boolean;
  };
  branding?: {
    title: string;
    logo?: string;
    primaryColor?: string;
    companyName?: string;
  };
  limits?: {
    maxSessionDuration?: number;
    maxMessagesPerSession?: number;
  };
}

export const ENVIRONMENT_CONFIGS: Record<string, EnvironmentConfig> = {
  development: {
    avatars: [
      {
        avatar_id: "Graham_Black_Shirt_public",
        name: "Graham Black Shirt",
      },
      {
        avatar_id: "Ann_Therapist_public",
        name: "Ann Therapist",
      },
      {
        avatar_id: "Shawn_Therapist_public", 
        name: "Shawn Therapist",
      },
      {
        avatar_id: "Bryan_FitnessCoach_public",
        name: "Bryan Fitness Coach",
      },
      {
        avatar_id: "Dexter_Doctor_Standing2_public",
        name: "Dexter Doctor Standing",
      },
      {
        avatar_id: "Elenora_IT_Sitting_public",
        name: "Elenora Tech Expert",
      },
    ],
    features: {
      openAI: true,
      analytics: false,
      voiceChat: true,
      textChat: true,
    },
    branding: {
      title: "HeyGen Avatar Demo - Development",
      companyName: "HeyGen Development",
    },
  },

  'client-production': {
    avatars: [
      {
        avatar_id: "Dexter_Doctor_Standing2_public",
        name: "Dr. Dexter - Professional Consultant",
      },
      {
        avatar_id: "Ann_Therapist_public",
        name: "Ann - Customer Service Expert",
      },
    ],
    features: {
      openAI: true,
      analytics: true,
      voiceChat: true,
      textChat: true,
    },
    branding: {
      title: "Professional AI Assistant",
      companyName: "Client Company",
      primaryColor: "#1f2937",
    },
    limits: {
      maxSessionDuration: 30 * 60 * 1000, // 30 minutes
      maxMessagesPerSession: 50,
    },
  },

  'demo-telecom': {
    avatars: [
      {
        avatar_id: "Elenora_IT_Sitting_public",
        name: "Elena - Telecom Support Specialist",
      },
      {
        avatar_id: "Bryan_FitnessCoach_public", 
        name: "Bryan - Technical Expert",
      },
    ],
    features: {
      openAI: false,
      analytics: false,
      voiceChat: true,
      textChat: true,
    },
    branding: {
      title: "Telecom AI Assistant Demo",
      companyName: "Telecom Solutions",
      primaryColor: "#0ea5e9",
    },
    limits: {
      maxSessionDuration: 15 * 60 * 1000, // 15 minutes
      maxMessagesPerSession: 25,
    },
  },

  'demo-2': {
    avatars: [
      {
        avatar_id: "Ann_Therapist_public",
        name: "Ann - Virtual Assistant",
      },
      {
        avatar_id: "Shawn_Therapist_public",
        name: "Shawn - Business Consultant", 
      },
    ],
    features: {
      openAI: false,
      analytics: false,
      voiceChat: true,
      textChat: false, // Text chat disabled for this demo
    },
    branding: {
      title: "Business AI Demo",
      companyName: "Business Solutions Inc",
      primaryColor: "#059669",
    },
    limits: {
      maxSessionDuration: 10 * 60 * 1000, // 10 minutes
      maxMessagesPerSession: 20,
    },
  },
};

// Get current environment configuration
function getCurrentEnvironment(): string {
  if (typeof window !== 'undefined') {
    // Client-side: check for environment passed from server
    return (window as any).__DEPLOYMENT_ENV__ || 'development';
  }
  
  // Server-side: check environment variables
  const deploymentEnv = process.env.DEPLOYMENT_ENV;
  const nodeEnv = process.env.NODE_ENV;
  
  if (deploymentEnv && ENVIRONMENT_CONFIGS[deploymentEnv]) {
    return deploymentEnv;
  }
  
  return nodeEnv === 'production' ? 'client-production' : 'development';
}

export const CURRENT_ENVIRONMENT = getCurrentEnvironment();
export const CURRENT_CONFIG = ENVIRONMENT_CONFIGS[CURRENT_ENVIRONMENT] || ENVIRONMENT_CONFIGS.development; 