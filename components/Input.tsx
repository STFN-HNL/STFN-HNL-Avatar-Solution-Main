import React from "react";

interface InputProps {
  value: string | undefined | null;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Input = (props: InputProps) => {
  return (
    <input
      className={`w-full text-gray-900 text-sm bg-white border border-gray-300 py-2 px-6 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 ${props.className}`}
      placeholder={props.placeholder}
      type="text"
      value={props.value || ""}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};
