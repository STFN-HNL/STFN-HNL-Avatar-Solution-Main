import React from "react";

import { useVoiceChat } from "../logic/useVoiceChat";
import { LoadingIcon, MicIcon, MicOffIcon } from "../Icons";
import { useConversationState } from "../logic/useConversationState";

export const AudioInput: React.FC = () => {
  const { muteInputAudio, unmuteInputAudio, isMuted, isVoiceChatLoading } =
    useVoiceChat();
  const { isUserTalking } = useConversationState();

  const handleMuteClick = () => {
    if (isMuted) {
      unmuteInputAudio();
    } else {
      muteInputAudio();
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        className={`
          relative w-16 h-16 rounded-full border-none transition-all duration-300 shadow-lg
          flex items-center justify-center disabled:opacity-50 hover:scale-105
          ${
            isMuted 
                      ? "bg-red-500 hover:bg-red-600"
        : "bg-accent hover:bg-accent/80"
          }
        `}
        disabled={isVoiceChatLoading}
        onClick={handleMuteClick}
      >
        <div
          className={`absolute left-0 top-0 rounded-full border-2 border-white w-full h-full ${isUserTalking ? "animate-ping" : ""} opacity-30`}
        />
        {isVoiceChatLoading ? (
          <LoadingIcon className="animate-spin text-white" size={24} />
        ) : isMuted ? (
          <MicOffIcon className="text-white" size={24} />
        ) : (
          <MicIcon className="text-white" size={24} />
        )}
      </button>
      <span className="text-xs text-gray-600">
        {isMuted ? "unmute" : "mute"}
      </span>
    </div>
  );
};
