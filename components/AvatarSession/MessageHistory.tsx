import React, { useEffect, useRef } from "react";

import { useMessageHistory, MessageSender } from "../logic";

export const MessageHistory: React.FC = () => {
  const { messages } = useMessageHistory();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || messages.length === 0) return;

    container.scrollTop = container.scrollHeight;
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Transcript</h3>
        <div
          ref={containerRef}
          className="overflow-y-auto flex flex-col gap-2 text-gray-900 max-h-[400px] min-h-[300px]"
        >
          {messages.length === 0 ? (
            <div className="text-gray-500 text-sm italic">
              The conversation transcript will appear here once the conversation begins...
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col gap-1 max-w-[90%] ${
                  message.sender === MessageSender.CLIENT
                    ? "self-end items-end"
                    : "self-start items-start"
                }`}
              >
                <p className="text-xs text-gray-500">
                  {message.sender === MessageSender.AVATAR ? "Avatar" : "You"}
                </p>
                <div className={`p-3 rounded-lg text-sm ${
                  message.sender === MessageSender.CLIENT
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {message.content}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
