"use client";

import InteractiveAvatar from "@/components/InteractiveAvatar";

export default function App() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-[960px] flex flex-col items-start justify-start gap-5 mx-auto">
        <div className="w-full">
          <InteractiveAvatar />
        </div>
      </div>
    </div>
  );
}
