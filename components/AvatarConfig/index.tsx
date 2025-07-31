import React from "react";
import {
  StartAvatarRequest,
} from "@heygen/streaming-avatar";

import { Select } from "../Select";

import { Field } from "./Field";

import { AVATARS, STT_LANGUAGE_LIST } from "@/app/lib/constants";

interface AvatarConfigProps {
  onConfigChange: (config: StartAvatarRequest) => void;
  config: StartAvatarRequest;
}

export const AvatarConfig: React.FC<AvatarConfigProps> = ({
  onConfigChange,
  config,
}) => {
  const onChange = <T extends keyof StartAvatarRequest>(
    key: T,
    value: StartAvatarRequest[T],
  ) => {
    onConfigChange({ ...config, [key]: value });
  };

  // Get the predefined avatar name for display
  const avatarName = "Graham Black Shirt";

  return (
    <div className="relative flex flex-col gap-4 w-[550px] py-8 max-h-full overflow-y-auto px-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-zinc-100 mb-2">
          Configure Your Experience
        </h2>
        <p className="text-sm text-zinc-400">
          You'll be speaking with <span className="text-zinc-200 font-medium">{avatarName}</span>
        </p>
      </div>
      
      <Field label="Language">
        <Select
          isSelected={(option) => option.value === config.language}
          options={STT_LANGUAGE_LIST}
          renderOption={(option) => option.label}
          value={
            STT_LANGUAGE_LIST.find((option) => option.value === config.language)
              ?.label
          }
          onSelect={(option) => onChange("language", option.value)}
        />
      </Field>
      
      <div className="mt-4 p-4 bg-zinc-800 rounded-lg text-center space-y-2">
        <p className="text-sm text-zinc-300">
          🎤 Voice chat will start automatically
        </p>
        <p className="text-xs text-zinc-400">
          Make sure your microphone is enabled
        </p>
      </div>
    </div>
  );
};
