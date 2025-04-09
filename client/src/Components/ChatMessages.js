import React from "react";
import ChatBubble from "./ChatBubble";

function ChatMessages({ messages, loading }) {
  return (
    <>
      <div className="grid grid-cols-12 gap-y-2 px-2">
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            role={message.role}
            content={message.content.map((block) => block.text).join("\n")}
          />
        ))}
      </div>
      {loading && (
        <div className="flex justify-end items-start mt-4 mb-4">
          <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-2xl max-w-[70%]">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatMessages;
