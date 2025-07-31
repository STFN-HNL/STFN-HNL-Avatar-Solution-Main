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
}

export const ENVIRONMENT_CONFIG: EnvironmentConfig = {
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
    title: "Avatar Solution",
    companyName: "Avatar Solution",
  },
};

// Export the single configuration
export const CURRENT_CONFIG = ENVIRONMENT_CONFIG; 