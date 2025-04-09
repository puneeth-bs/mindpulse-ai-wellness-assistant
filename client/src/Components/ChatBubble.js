import React from "react";

function ChatBubble({ role, content }) {
  return (
    <div
      className={`${
        role === "user" ? "col-start-1 col-end-8" : "col-start-6 col-end-13"
      } p-2 rounded-lg`}
    >
      <div
        className={`flex ${
          role === "user" ? "flex-row" : "flex-row-reverse"
        } items-center`}
      >
        <div
          className={`flex items-center justify-center h-10 w-10 rounded-full ${
            role === "user" ? "bg-indigo-300" : "bg-indigo-500"
          } flex-shrink-0`}
        >
          {role[0].toUpperCase()}
        </div>
        <div
          className={`relative ${role === "user" ? "ml-3" : "mr-3"} text-sm ${
            role === "user"
              ? "bg-white dark:bg-cyan-900"
              : "bg-blue-500 dark:bg-sky-900"
          } p-3 shadow rounded-xl`}
        >
          <span
            className={`whitespace-pre-wrap ${
              role === "user" ? "text-black dark:text-white" : "text-white"
            }`}
          >
            {content}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;
