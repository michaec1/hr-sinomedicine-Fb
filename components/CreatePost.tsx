import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { currentUser } from '../constants';
import { VideoCameraIcon, PhotoIcon, FaceSmileIcon, SparklesIcon } from './icons/Icons';

const CreatePost: React.FC = () => {
  const [postText, setPostText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePost = async () => {
    if (!postText.trim()) return;
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `根據這個想法，產生一篇適合社群媒體的貼文: "${postText}"`,
      });
      setPostText(response.text);
    } catch (error) {
      console.error("Error generating post:", error);
      alert("生成貼文時發生錯誤，請稍後再試。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-start space-x-3 border-b pb-3 mb-3">
        <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full" />
        <div className="w-full relative">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder={`你在想什麼，${currentUser.name}？`}
            className="w-full bg-gray-100 rounded-lg py-2 px-4 pr-12 focus:outline-none hover:bg-gray-200 resize-none"
            rows={2}
          />
          <button 
            onClick={handleGeneratePost} 
            disabled={isLoading || !postText.trim()}
            title="使用 AI 生成內容"
            className="absolute bottom-2 right-2 bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed rounded-full p-2 flex items-center justify-center transition-colors"
          >
            {isLoading ? (
                <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <SparklesIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      <div className="flex justify-around">
        <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 py-2 px-4 rounded-lg w-1/3 justify-center">
          <VideoCameraIcon className="h-6 w-6 text-red-500" />
          <span className="font-semibold">直播視訊</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 py-2 px-4 rounded-lg w-1/3 justify-center">
          <PhotoIcon className="h-6 w-6 text-green-500" />
          <span className="font-semibold">相片/影片</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 py-2 px-4 rounded-lg w-1/3 justify-center">
          <FaceSmileIcon className="h-6 w-6 text-yellow-500" />
          <span className="font-semibold">感受/活動</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;