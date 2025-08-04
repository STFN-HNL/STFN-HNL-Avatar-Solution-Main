import {
  AvatarQuality,
  StreamingEvents,
  VoiceChatTransport,
  VoiceEmotion,
  StartAvatarRequest,
  STTProvider,
  ElevenLabsModel,
  TaskType,
  TaskMode,
} from "@heygen/streaming-avatar";
import { useEffect, useRef, useState } from "react";
import { useMemoizedFn, useUnmount } from "ahooks";
import Image from "next/image";

import { Button } from "./Button";
import { AvatarVideo } from "./AvatarSession/AvatarVideo";
import { useStreamingAvatarSession } from "./logic/useStreamingAvatarSession";
import { AvatarControls } from "./AvatarSession/AvatarControls";
import { useVoiceChat } from "./logic/useVoiceChat";
import {
  StreamingAvatarProvider,
  StreamingAvatarSessionState,
  useStreamingAvatarContext,
  useLanguage,
  INTRO_MESSAGES,
} from "./logic";
import { LoadingIcon, BackIcon } from "./Icons";
import { MessageHistory } from "./AvatarSession/MessageHistory";



const DEFAULT_CONFIG: StartAvatarRequest = {
  quality: AvatarQuality.High,
  avatarName: "Graham_Black_Shirt_public",
  knowledgeId: "503b21e15b7c4e72913a0a212378e688",
  voice: {
    rate: 1.5,
    emotion: VoiceEmotion.EXCITED,
    model: ElevenLabsModel.eleven_flash_v2_5,
  },
  language: "en",
  voiceChatTransport: VoiceChatTransport.WEBSOCKET,
  sttSettings: {
    provider: STTProvider.DEEPGRAM,
  },
};

interface InteractiveAvatarProps {
  onBack?: () => void;
}

function InteractiveAvatar({ onBack }: InteractiveAvatarProps) {
  const { initAvatar, startAvatar, stopAvatar, sessionState, stream } =
    useStreamingAvatarSession();
  const { startVoiceChat } = useVoiceChat();
  const { avatarRef } = useStreamingAvatarContext();
  const { selectedLanguage, t } = useLanguage();

  const [config, setConfig] = useState<StartAvatarRequest>(DEFAULT_CONFIG);
  const [error, setError] = useState<string | null>(null);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);

  const mediaStream = useRef<HTMLVideoElement>(null);

  // Update config when language changes
  useEffect(() => {
    const handleLanguageChange = async () => {
      console.log(`Language changing to: ${selectedLanguage}`);
      setConfig(prev => ({ 
        ...prev, 
        language: selectedLanguage,
        sttSettings: {
          ...prev.sttSettings,
          language: selectedLanguage
        }
      }));
      
      // If we have an active session with voice chat, restart voice chat with new language
      if (sessionState === StreamingAvatarSessionState.CONNECTED && avatarRef.current) {
        try {
          console.log(`Restarting voice chat for language change to: ${selectedLanguage}`);
          // Stop current voice chat
          avatarRef.current.closeVoiceChat();
          // Wait a moment for cleanup
          await new Promise(resolve => setTimeout(resolve, 500));
          // Restart voice chat with new language settings
          await startVoiceChat();
          console.log(`Voice chat restarted with language: ${selectedLanguage}`);
        } catch (error) {
          console.error('Error restarting voice chat for language change:', error);
        }
      }
    };
    
    handleLanguageChange();
  }, [selectedLanguage, sessionState, startVoiceChat, avatarRef]);

  async function fetchAccessToken() {
    try {
      const response = await fetch("/api/get-access-token", {
        method: "POST",
      });
      const token = await response.text();

      console.log("Access Token:", token); // Log the token to verify

      return token;
    } catch (error) {
      throw error;
    }
  }

  // Always start with voice chat enabled
  const startSession = useMemoizedFn(async () => {
    try {
      setError(null); // Clear any previous errors
      setHasSpokenIntro(false); // Reset intro flag
      const accessToken = await fetchAccessToken();

      const avatar = await initAvatar(accessToken);

      avatar.on(StreamingEvents.USER_START, (event) => {
        console.log(">>>>> User started:", event);
      });
      avatar.on(StreamingEvents.USER_STOP, (event) => {
        console.log(">>>>> User stopped:", event);
      });
      avatar.on(StreamingEvents.AVATAR_START_TALKING, (event) => {
        console.log(">>>>> Avatar started talking:", event);
      });
      avatar.on(StreamingEvents.AVATAR_STOP_TALKING, (event) => {
        console.log(">>>>> Avatar stopped talking:", event);
      });
      avatar.on(StreamingEvents.USER_TALKING_MESSAGE, (event) => {
        console.log(">>>>> User talking message:", event);
      });
      avatar.on(StreamingEvents.AVATAR_TALKING_MESSAGE, (event) => {
        console.log(">>>>> Avatar talking message:", event);
      });
      avatar.on(StreamingEvents.AVATAR_END_MESSAGE, (event) => {
        console.log(">>>>> Avatar end message:", event);
      });

      // Hook into STREAM_READY to send intro when avatar is actually ready
      avatar.on(StreamingEvents.STREAM_READY, () => {
        console.log(">>>>> Stream ready, preparing intro message");
      });

      await startAvatar(config);

      // Automatically start voice chat
      await startVoiceChat();

      // Send intro message after voice chat is started
      console.log(">>>>> Voice chat started, sending intro message");
      if (!hasSpokenIntro) {
        setTimeout(() => {
          console.log(">>>>> Attempting to speak intro message");
          const introText = INTRO_MESSAGES[selectedLanguage] || INTRO_MESSAGES.en;
          avatar.speak({
            text: introText,
            taskType: TaskType.REPEAT,
            taskMode: TaskMode.SYNC,
          });
          setHasSpokenIntro(true);
          console.log(">>>>> Intro message sent");
        }, 2000);
      }
    } catch (error) {
      console.error("Error starting avatar session:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to start avatar session. Please check your API configuration.",
      );
    }
  });

  useUnmount(() => {
    stopAvatar();
  });

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
      };
    }
  }, [mediaStream, stream]);

  return (
    <>
      {sessionState === StreamingAvatarSessionState.CONNECTED ? (
        // Full-screen layout when connected - back to original dimensions
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral via-primary-light/10 to-accent/10">
          {/* Back button for connected state */}
          {onBack && (
            <div className="absolute top-6 left-6 z-10">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 bg-neutral/90 backdrop-blur-sm border border-primary-light/30 hover:border-primary-light/50 text-primary-dark hover:text-primary-dark/80 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-neutral/95 hover:shadow-lg"
              >
                <BackIcon size={20} />
                <span className="text-sm font-medium">{t('backToInstructions')}</span>
              </button>
            </div>
          )}
          <div className="w-[960px] flex flex-col items-start justify-start gap-5 mx-auto">
            <div className="w-full flex flex-row gap-6">
              {/* Avatar section - left side, original size */}
              <div className="flex-shrink-0 w-[560px]">
                <div className="flex flex-col rounded-xl bg-neutral shadow-lg border border-primary-light overflow-hidden">
                  <div className="relative w-full aspect-video overflow-hidden flex flex-col items-center justify-center">
                    <AvatarVideo ref={mediaStream} />
                  </div>
                  <div className="flex flex-col gap-3 items-center justify-center p-4 border-t border-primary-light w-full bg-primary-light/10">
                    {error && (
                      <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg border border-red-200 w-full text-center">
                        {error}
                      </div>
                    )}
                    <AvatarControls />
                  </div>
                </div>
              </div>

              {/* Transcript section - right side */}
              <div className="flex-1 flex flex-col">
                <MessageHistory />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Card layout when not connected - matches onboarding cards positioning exactly
        <div className="fixed inset-0 flex items-center justify-center p-6">
          <div className="max-w-5xl w-full">
            <div className="bg-neutral rounded-3xl shadow-2xl overflow-hidden h-[600px] shadow-stack relative">
              {/* Back button for card layout */}
              {onBack && (
                <div className="absolute top-6 left-6 z-10">
                  <button
                    onClick={onBack}
                    className="flex items-center space-x-2 bg-primary-light/10 backdrop-blur-sm border border-primary-light/30 hover:border-primary-light/50 text-primary-dark hover:text-primary-dark/80 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-primary-light/20 hover:shadow-lg"
                  >
                    <BackIcon size={20} />
                    <span className="text-sm font-medium">{t('backToInstructions')}</span>
                  </button>
                </div>
              )}
              <div className="flex flex-col h-full">
                <div className="relative w-full h-[400px] overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-accent/10 to-primary-light/10 rounded-t-3xl">
                  {sessionState !== StreamingAvatarSessionState.INACTIVE ? (
                    <AvatarVideo ref={mediaStream} />
                  ) : (
                    // Show Jacob's avatar preview image
                    <div className="flex flex-col items-center justify-center space-y-6">
                      <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-accent bg-gradient-to-br from-accent/20 to-primary-light/20">
                        <Image
                          priority
                          alt="Jacob Fischer - AI Avatar"
                          className="w-full h-full object-cover"
                          height={160}
                          src="/jacob-preview.jpg"
                          width={160}
                          onError={(e) => {
                            // Fallback to generic icon if image fails to load
                            console.log(
                              "Jacob avatar image not found, showing fallback",
                            );
                            const target = e.target as HTMLImageElement;

                            target.style.display = "none";
                            const fallback =
                              target.parentElement?.querySelector(
                                ".fallback-icon",
                              );

                            if (fallback) {
                              (fallback as HTMLElement).style.display = "flex";
                            }
                          }}
                        />
                        {/* Fallback icon */}
                        <div className="fallback-icon hidden absolute inset-0 w-full h-full bg-accent rounded-full flex items-center justify-center">
                          <svg
                            className="w-20 h-20 text-primary-dark"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl font-bold text-primary-dark">
                          {t('jacobName')}
                        </h3>
                        <p className="text-primary-light font-medium">
                          {t('jacobCompany')}
                        </p>
                        <div className="bg-accent/20 rounded-full px-4 py-2 inline-block">
                          <p className="text-primary-dark text-sm font-medium">
                            {t('aiPartner')}
                          </p>
                        </div>
                        <p className="text-primary-light text-sm mt-3">
                          {t('readyToHelp')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3 items-center justify-center p-4 border-t border-primary-light w-full bg-primary-light/10 flex-1">
                  {error && (
                    <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg border border-red-200 w-full text-center">
                      {error}
                    </div>
                  )}

                  {sessionState === StreamingAvatarSessionState.INACTIVE ? (
                    <>                      
                      {/* Start Training Button */}
                      <Button
                        className="bg-primary-dark hover:bg-primary-dark/90 text-white px-12 py-6 text-xl font-medium rounded-xl transition-all duration-400 transform hover:scale-105 hover:shadow-heinrich-hover border border-primary-light/20"
                        onClick={startSession}
                      >
                        {t('startTraining')}
                      </Button>
                    </>
                  ) : sessionState ===
                    StreamingAvatarSessionState.CONNECTING ? (
                    <div className="flex items-center space-x-2">
                      <LoadingIcon />
                      <span>{t('startingAvatar')}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function InteractiveAvatarWrapper({ onBack }: InteractiveAvatarProps) {
  return (
    <StreamingAvatarProvider>
      <InteractiveAvatar onBack={onBack} />
    </StreamingAvatarProvider>
  );
}
