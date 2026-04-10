
import React from 'react';
import { stories, currentUser } from '../constants';
import { PlusIcon } from './icons/Icons';

const Stories: React.FC = () => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      {/* Create Story Card */}
      <div className="flex-shrink-0 w-28 h-48 rounded-xl shadow-md overflow-hidden relative cursor-pointer">
        <img src={currentUser.avatar} alt="Create Story" className="h-3/4 w-full object-cover"/>
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-white flex flex-col items-center justify-end pb-2">
            <p className="text-xs font-semibold text-gray-700">建立限時動態</p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 transform -translate-y-full bg-blue-600 rounded-full border-4 border-white flex items-center justify-center h-10 w-10">
            <PlusIcon className="h-6 w-6 text-white"/>
        </div>
      </div>
      
      {stories.map((story) => (
        <div key={story.id} className="flex-shrink-0 w-28 h-48 rounded-xl shadow-md overflow-hidden relative group cursor-pointer">
          <img
            src={story.storyImage}
            alt={story.user.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <img
            src={story.user.avatar}
            alt={story.user.name}
            className="absolute top-3 left-3 w-9 h-9 rounded-full border-4 border-blue-600"
          />
          <p className="absolute bottom-2 left-2 text-white font-semibold text-xs">
            {story.user.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Stories;
