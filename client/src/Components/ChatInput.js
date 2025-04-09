import React, { useState, forwardRef } from 'react';

const ChatInput = forwardRef(({ onSendMessage }, ref) => {
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex items-center">
      <input
        ref={ref}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSendMessage}
        className="p-2 ml-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-20"
      >
        Send
      </button>
    </div>
  );
});

export default ChatInput;