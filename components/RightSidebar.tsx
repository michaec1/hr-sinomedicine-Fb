
import React from 'react';
import { users } from '../constants';
import { EllipsisHorizontalIcon, VideoCameraIcon as VideoIcon, MagnifyingGlassIcon as SearchIcon } from './icons/Icons';
import { User } from '../types';

interface RightSidebarProps {
  onOpenChat: (user: User) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ onOpenChat }) => {
  return (
    <aside className="hidden xl:block w-80 p-4 fixed top-14 right-0 h-full">
      <div className="space-y-4">
        <div>
          <h2 className="text-black font-semibold">贊助</h2>
          <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 mt-2">
            <img src="https://picsum.photos/seed/ad1/100/100" alt="Ad" className="w-24 h-24 object-cover rounded-lg" />
            <div>
              <p className="font-semibold text-black">Premium Gadgets</p>
              <p className="text-sm text-gray-500">shop.example.com</p>
            </div>
          </a>
        </div>

        <hr />

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-black font-semibold">聯絡人</h2>
            <div className="flex space-x-2 text-gray-500">
               <button className="hover:bg-gray-200 rounded-full p-1"><VideoIcon className="h-5 w-5" /></button>
               <button className="hover:bg-gray-200 rounded-full p-1"><SearchIcon className="h-5 w-5" /></button>
               <button className="hover:bg-gray-200 rounded-full p-1"><EllipsisHorizontalIcon className="h-5 w-5" /></button>
            </div>
          </div>
          <div className="space-y-2">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => onOpenChat(user)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 transition-colors w-full text-left"
              >
                <div className="relative">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
                </div>
                <span className="font-semibold text-black">{user.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
