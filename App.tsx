
import React from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Feed from './components/Feed';
import { User } from './types';
import ChatBox from './components/ChatBox';

const App: React.FC = () => {
  const [openChats, setOpenChats] = React.useState<User[]>([]);

  const handleOpenChat = (user: User) => {
    setOpenChats(prev => {
      if (prev.find(u => u.id === user.id)) {
        return prev;
      }
      return [...prev, user];
    });
  };

  const handleCloseChat = (userId: number) => {
    setOpenChats(prev => prev.filter(u => u.id !== userId));
  };


  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="flex justify-between pt-14">
        <LeftSidebar />
        <Feed />
        <RightSidebar onOpenChat={handleOpenChat} />
      </main>
      <div className="fixed bottom-0 right-4 flex items-end space-x-2 z-50">
        {openChats.map((user) => (
          <ChatBox
            key={user.id}
            user={user}
            onClose={() => handleCloseChat(user.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
