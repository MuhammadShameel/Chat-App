"use client";
import React, { useState } from "react";
import { FiSend, FiPhoneCall, FiVideo } from "react-icons/fi";

const Chat: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between p-4 bg-gray-100 dark:bg-gray-900 lg:ml-60 md:ml-60 sm:ml-60 ">
      <div className="overflow-y-auto p-4 space-y-4 mt-10">
        {/* Display messages here */}
        <div className="flex justify-start">
          <div className="bg-blue-500 text-white p-2 rounded-lg">Hello!</div>
        </div>
        <div className="flex justify-end">
          <div className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg">
            Hi, how are you?
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-gray-300 dark:border-gray-700 flex items-center">
        <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          <FiPhoneCall size={24} />
        </button>
        <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 ml-2">
          <FiVideo size={24} />
        </button>
        <input
          type="text"
          className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none ml-2"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 ml-2"
          onClick={handleSendMessage}
        >
          <FiSend size={24} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
