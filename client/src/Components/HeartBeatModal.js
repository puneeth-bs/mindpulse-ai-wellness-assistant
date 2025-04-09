import React, { useEffect } from 'react';

function HeartBeatModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        onClose();
      }, 60000); // 60 seconds

      return () => clearTimeout(timeout); // Clear timeout if modal closes early
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-sm p-6 text-center">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Measuring Heart Rate</h2>
        <div className="flex justify-center items-center mb-4">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
        <p className="text-gray-700 dark:text-gray-300">Please stay still we are measuring your heart beat.</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">(This will close automatically in 60 seconds)</p>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default HeartBeatModal;
