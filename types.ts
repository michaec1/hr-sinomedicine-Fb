
export interface User {
  id: number;
  name: string;
  avatar: string;
}

export interface Story {
  id: number;
  user: User;
  storyImage: string;
}

export interface Comment {
  id: number;
  user: User;
  content: string;
}

export interface Post {
  id: number;
  user: User;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  shares: number;
}

export interface ChatMessage {
  id: number;
  text: string;
  user: User;
}
