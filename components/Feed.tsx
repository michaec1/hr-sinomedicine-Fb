
import React from 'react';
import Stories from './Stories';
import CreatePost from './CreatePost';
import Post from './Post';
import { posts } from '../constants';

const Feed: React.FC = () => {
  return (
    <div className="flex-grow max-w-2xl mx-auto px-2 sm:px-4 pt-6 pb-12">
      <div className="space-y-6">
        <Stories />
        <CreatePost />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
