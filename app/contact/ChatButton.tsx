'use client';

import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

export function ChatButton() {
  const [chatOpen, setChatOpen] = useState(false);
  
  return (
    <>
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all z-50"
        aria-label="Chat with us"
      >
        <MessageCircle size={24} />
      </button>
      
      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-black border border-gray-800 rounded-lg shadow-xl z-50">
          <div className="p-4 bg-emerald-600 text-white rounded-t-lg flex justify-between items-center">
            <h4 className="font-bold">Live Chat</h4>
            <button onClick={() => setChatOpen(false)} className="text-white">
              &times;
            </button>
          </div>
          <div className="p-4 max-h-80 overflow-y-auto">
            <div className="mb-4">
              <div className="bg-gray-800 p-3 rounded-lg inline-block text-white">
                Hello! How can we help you today?
              </div>
            </div>
            <div className="flex justify-end mb-4">
              <div className="bg-emerald-600 p-3 rounded-lg inline-block text-white">
                I&apos;m interested in learning more about your products.
              </div>
            </div>
            <div className="mb-4">
              <div className="bg-gray-800 p-3 rounded-lg inline-block text-white">
                Great! Our Illuminati Energy drinks come in several flavors. Which ones would you like to know more about?
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-800">
            <form className="flex" onSubmit={(e) => {
              e.preventDefault();
              alert('In a real implementation, this would send a chat message.');
            }}>
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-gray-900 border border-gray-700 text-white px-3 py-2 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-r-md"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 