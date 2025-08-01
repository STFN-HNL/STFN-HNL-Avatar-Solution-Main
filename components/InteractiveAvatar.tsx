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

import { Button } from "./Button";
import { AvatarConfig } from "./AvatarConfig";
import { AvatarVideo } from "./AvatarSession/AvatarVideo";
import { useStreamingAvatarSession } from "./logic/useStreamingAvatarSession";
import { AvatarControls } from "./AvatarSession/AvatarControls";
import { useVoiceChat } from "./logic/useVoiceChat";
import { StreamingAvatarProvider, StreamingAvatarSessionState, useStreamingAvatarContext } from "./logic";
import { LoadingIcon } from "./Icons";
import { MessageHistory } from "./AvatarSession/MessageHistory";
import { AVATARS } from "@/app/lib/constants";

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

function InteractiveAvatar() {
  const { initAvatar, startAvatar, stopAvatar, sessionState, stream } =
    useStreamingAvatarSession();
  const { startVoiceChat } = useVoiceChat();
  const { avatarRef } = useStreamingAvatarContext();

  const [config, setConfig] = useState<StartAvatarRequest>(DEFAULT_CONFIG);
  const [error, setError] = useState<string | null>(null);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);

  const mediaStream = useRef<HTMLVideoElement>(null);

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
          avatar.speak({
            text: "Hi, I'm Jacob Fischer from Fischer Accounting & Tax Consulting. In the next 5 minutes, we'll roleplay a sales call—your job is to sell me your telecom services while handling my objections on price and value. Say \"START Training\" to begin.",
            taskType: TaskType.REPEAT,
            taskMode: TaskMode.SYNC,
          });
          setHasSpokenIntro(true);
          console.log(">>>>> Intro message sent");
        }, 2000);
      }

    } catch (error) {
      console.error("Error starting avatar session:", error);
      setError(error instanceof Error ? error.message : "Failed to start avatar session. Please check your API configuration.");
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
    <div className="w-full flex flex-col gap-4">
      {sessionState === StreamingAvatarSessionState.CONNECTED ? (
        // Side-by-side layout when connected
        <div className="flex flex-row gap-6">
          {/* Avatar section - left side, smaller */}
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
      ) : (
        // Original layout when not connected - full width with preview image
        <div className="flex flex-col rounded-xl bg-neutral shadow-lg border border-primary-light overflow-hidden">
          <div className="relative w-full aspect-video overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-accent/10 to-primary-light/10">
            {sessionState !== StreamingAvatarSessionState.INACTIVE ? (
              <AvatarVideo ref={mediaStream} />
            ) : (
              // Show avatar preview image instead of config
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-32 h-32 bg-accent rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-16 h-16 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-primary-dark">AI Avatar Ready</h3>
                  <p className="text-primary-light">Click below to start your interactive session</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 items-center justify-center p-4 border-t border-primary-light w-full bg-primary-light/10">
            {error && (
              <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg border border-red-200 w-full text-center">
                {error}
              </div>
            )}
            {sessionState === StreamingAvatarSessionState.INACTIVE && (
              <div className="flex flex-row gap-4">
                <Button 
                  onClick={() => startSession()}
                  className="bg-accent hover:bg-accent/80 text-primary-dark px-8 py-3 font-semibold rounded-full transition-all duration-300"
                >
                  Start Voice Chat
                </Button>
              </div>
            )}
            {sessionState === StreamingAvatarSessionState.CONNECTING && (
              <LoadingIcon />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function InteractiveAvatarWrapper() {
  return (
    <StreamingAvatarProvider>
      <InteractiveAvatar />
    </StreamingAvatarProvider>
  );
}
