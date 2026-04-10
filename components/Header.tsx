import React from 'react';
import { currentUser } from '../constants';
import { HomeIcon, UsersIcon, VideoCameraIcon, UserGroupIcon, PuzzlePieceIcon, BellIcon, ChatBubbleOvalLeftEllipsisIcon, Bars3Icon } from './icons/Icons';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 flex items-center justify-between px-4 h-14">
      {/* Left Section */}
      <div className="flex items-center space-x-2">
        <img src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='200' height='40' viewBox='0 0 200 40'%3e%3ctext x='100' y='25' dominant-baseline='middle' text-anchor='middle' font-family='-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif' font-size='28' font-weight='bold' fill='%231877F2'%3e尊昇資訊%3c/text%3e%3c/svg%3e" alt="尊昇資訊 社群平台 Logo" className="h-10" />
        <div className="relative hidden md:block">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="搜尋 尊昇資訊 社群平台"
            className="bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none"
          />
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex-grow flex justify-center items-center space-x-2 sm:space-x-4">
        <a href="#" className="text-blue-600 border-b-2 border-blue-600 px-2 sm:px-6 py-3">
          <HomeIcon className="h-6 w-6" />
        </a>
        <a href="#" className="text-gray-600 hover:bg-gray-100 px-2 sm:px-6 py-3 rounded-lg">
          <UsersIcon className="h-6 w-6" />
        </a>
        <a href="#" className="text-gray-600 hover:bg-gray-100 px-2 sm:px-6 py-3 rounded-lg">
          <VideoCameraIcon className="h-6 w-6" />
        </a>
        <a href="#" className="text-gray-600 hover:bg-gray-100 px-2 sm:px-6 py-3 rounded-lg hidden sm:block">
          <UserGroupIcon className="h-6 w-6" />
        </a>
        <a href="#" className="text-gray-600 hover:bg-gray-100 px-2 sm:px-6 py-3 rounded-lg hidden sm:block">
          <PuzzlePieceIcon className="h-6 w-6" />
        </a>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
         <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 hidden sm:flex items-center justify-center">
          <Bars3Icon className="h-5 w-5" />
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 flex items-center justify-center">
          <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 flex items-center justify-center">
          <BellIcon className="h-5 w-5" />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};

export default Header;