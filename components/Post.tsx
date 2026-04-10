import React, { useState } from 'react';
import { Post as PostType, Comment } from '../types';
import { currentUser } from '../constants';
import { EllipsisHorizontalIcon, GlobeAltIcon, HandThumbUpIcon, ChatBubbleOvalLeftIcon, ArrowUturnRightIcon } from './icons/Icons';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const newCommentObject: Comment = {
      id: Date.now(),
      user: currentUser,
      content: newComment,
    };
    
    setComments([...comments, newCommentObject]);
    setNewComment('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold text-gray-800">{post.user.name}</p>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span>{post.timestamp}</span>
              <span>·</span>
              <GlobeAltIcon className="h-3 w-3" />
            </div>
          </div>
        </div>
        <button className="text-gray-500 hover:bg-gray-100 rounded-full p-2">
          <EllipsisHorizontalIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Post Content */}
      <p className="px-4 pb-2 whitespace-pre-wrap">{post.content}</p>
      {post.image && (
        <div className="bg-black">
            <img src={post.image} alt="Post content" className="w-full object-contain max-h-96" />
        </div>
      )}

      {/* Post Stats */}
      <div className="p-4 flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <div className="bg-blue-600 rounded-full p-0.5">
            <HandThumbUpIcon className="h-3 w-3 text-white" />
          </div>
          <span>{post.likes + (liked ? 1 : 0)}</span>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => setShowComments(true)} className="hover:underline">
            {comments.length} 則留言
          </button>
          <span>{post.shares} 次分享</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="border-t mx-4">
        <div className="flex justify-around py-1">
          <button 
            onClick={() => setLiked(!liked)}
            className={`flex items-center space-x-2 py-2 px-4 rounded-lg w-1/3 justify-center transition-colors ${liked ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <HandThumbUpIcon className="h-6 w-6" />
            <span className="font-semibold">讚</span>
          </button>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 py-2 px-4 rounded-lg w-1/3 justify-center"
          >
            <ChatBubbleOvalLeftIcon className="h-6 w-6" />
            <span className="font-semibold">留言</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 py-2 px-4 rounded-lg w-1/3 justify-center">
            <ArrowUturnRightIcon className="h-6 w-6" />
            <span className="font-semibold">分享</span>
          </button>
        </div>
      </div>
      
      {/* Comments Section */}
      {showComments && (
        <div className="p-4 border-t mx-4">
          {/* Existing Comments */}
          <div className="space-y-3 mb-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-2">
                <img src={comment.user.avatar} alt={comment.user.name} className="w-8 h-8 rounded-full" />
                <div className="bg-gray-100 rounded-xl p-2 px-3">
                  <p className="font-semibold text-sm text-gray-800">{comment.user.name}</p>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* New Comment Input */}
          <div className="flex items-center space-x-2">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full" />
            <form onSubmit={handleCommentSubmit} className="flex-grow">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="寫下你的留言..."
                className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
