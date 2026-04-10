
import React from 'react';
import { currentUser } from '../constants';
import { UserIcon, UsersIcon, UserGroupIcon, BuildingStorefrontIcon, VideoCameraIcon, ClockIcon } from './icons/Icons';

const sidebarItems = [
  { icon: <UserIcon className="h-6 w-6 text-blue-500" />, label: currentUser.name },
  { icon: <UsersIcon className="h-6 w-6 text-blue-500" />, label: '朋友' },
  { icon: <UserGroupIcon className="h-6 w-6 text-blue-500" />, label: '社團' },
  { icon: <BuildingStorefrontIcon className="h-6 w-6 text-blue-500" />, label: '市集' },
  { icon: <VideoCameraIcon className="h-6 w-6 text-blue-500" />, label: 'Watch' },
  { icon: <ClockIcon className="h-6 w-6 text-blue-500" />, label: '我的珍藏' },
];

const LeftSidebar: React.FC = () => {
  return (
    <aside className="hidden lg:block w-80 p-4 fixed top-14 left-0 h-full">
      <div className="space-y-2">
        {sidebarItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {item.label === currentUser.name ? (
               <img src={currentUser.avatar} alt={currentUser.name} className="w-7 h-7 rounded-full" />
            ) : (
              item.icon
            )}
            <span className="font-semibold text-black">{item.label}</span>
          </a>
        ))}
      </div>
      <hr className="my-4" />
      <h2 className="text-black font-semibold mb-2">你的捷徑</h2>
      {/* Add shortcut items here */}
    </aside>
  );
};

export default LeftSidebar;
