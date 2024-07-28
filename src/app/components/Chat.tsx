import React from "react";
import { FaPaperPlane, FaVideo, FaPhone } from "react-icons/fa";

const Chat: React.FC = () => {
  return (
    // <div className="p-4 sm:ml-56">
    <div className="flex flex-col h-full  sm:ml-64">
      <div className="flex-grow p-4 bg-white rounded-lg shadow-md ">
        {/* Add chat messages here */}
      </div>
      <div className="flex items-center p-2 bg-gray-200 rounded-lg mt-2">
        <input
          type="text"
          className="flex-grow p-2 border rounded-lg"
          placeholder="Type a message"
        />
        <button className="ml-2 p-2 text-blue-500">
          <FaPaperPlane />
        </button>
        <button className="ml-2 p-2 text-green-500">
          <FaPhone />
        </button>
        <button className="ml-2 p-2 text-red-500">
          <FaVideo />
        </button>
      </div>
    </div>
    // </div>
  );
};

export default Chat;
