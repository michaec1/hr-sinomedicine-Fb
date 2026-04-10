
import React, { useState, useRef, useEffect } from 'react';
import { User, ChatMessage } from '../types';
import { XMarkIcon, PaperAirplaneIcon } from './icons/Icons';
import { currentUser } from '../constants';
import { GoogleGenAI } from '@google/genai';

interface ChatBoxProps {
  user: User;
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ user, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: trimmedMessage,
      user: currentUser,
    };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `你是 ${user.name}，正在和你的朋友 ${currentUser.name} 聊天。他剛剛說：「${trimmedMessage}」。請寫一個簡短、自然的回應。`,
      });
      
      const aiResponseText = response.text;
      
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        text: aiResponseText,
        user: user,
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        text: "抱歉，我現在無法回覆。請稍後再試。",
        user: user,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-80 h-96 bg-white rounded-t-lg shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-2 bg-white rounded-t-lg border-b cursor-pointer">
        <div className="flex items-center space-x-2">
          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
          <span className="font-semibold text-gray-800">{user.name}</span>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:bg-gray-200 rounded-full p-1">
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      
      {/* Body */}
      <div className="flex-grow p-3 overflow-y-auto">
        {messages.length === 0 && !isTyping ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-center text-gray-400 text-sm">開始與 {user.name} 對話</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end space-x-2 ${message.user.id === currentUser.id ? 'justify-end' : ''}`}
              >
                {message.user.id !== currentUser.id && (
                  <img src={message.user.avatar} alt={message.user.name} className="w-6 h-6 rounded-full" />
                )}
                <div
                  className={`max-w-[70%] p-2 px-3 rounded-2xl ${
                    message.user.id === currentUser.id
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
                <div className="flex items-end space-x-2">
                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                    <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-bl-none p-2 px-3">
                       <div className="flex items-center space-x-1">
                          <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                       </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center bg-gray-100 rounded-full px-2">
          <input 
            type="text" 
            placeholder="輸入訊息..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow bg-transparent focus:outline-none p-2 text-sm text-black" 
          />
          <button type="submit" className="text-blue-600 p-2 hover:bg-gray-200 rounded-full disabled:text-gray-400" disabled={!newMessage.trim()}>
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
