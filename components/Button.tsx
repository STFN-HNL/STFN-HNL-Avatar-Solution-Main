import React from "react";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, onClick, ...props }) => {
  return (
    <button
      className={`bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2 rounded-lg disabled:opacity-50 h-fit transition-colors duration-200 shadow-sm ${className}`}
      onClick={props.disabled ? undefined : onClick}
      {...props}
    >
      {children}
    </button>
  );
};
