import React from "react";

import { useVoiceChat } from "../logic/useVoiceChat";
import { useInterrupt } from "../logic/useInterrupt";
import { CloseIcon } from "../Icons";

import { AudioInput } from "./AudioInput";

export const AvatarControls: React.FC = () => {
  const {
    isVoiceChatLoading,
    isVoiceChatActive,
  } = useVoiceChat();
  const { interrupt } = useInterrupt();

  return (
    <div className="flex flex-col gap-3 relative w-full items-center">
      <div className="flex items-center gap-6">
        <AudioInput />
        <button
          className="
            w-16 h-16 rounded-full border-none transition-all duration-300 shadow-lg
            flex items-center justify-center hover:scale-105
            bg-red-500 hover:bg-red-600
          "
          onClick={interrupt}
        >
          <CloseIcon className="text-white" size={24} />
        </button>
      </div>
    </div>
  );
};
