import React from "react";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, onClick, ...props }) => {
  return (
    <button
      className={`bg-accent hover:bg-accent/80 text-primary-dark text-sm px-6 py-2 rounded-lg disabled:opacity-50 h-fit transition-colors duration-200 shadow-sm font-medium ${className}`}
      onClick={props.disabled ? undefined : onClick}
      {...props}
    >
      {children}
    </button>
  );
};
