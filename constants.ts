import { User, Story, Post } from './types';

export const currentUser: User = {
  id: 0,
  name: '尊昇資訊 社群平台',
  avatar: 'data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3e%3ccircle cx=%2750%27 cy=%2750%27 r=%2750%27 fill=%27%231877F2%27/%3e%3ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 font-family=%27Helvetica, Arial, sans-serif%27 font-size=%2740%27 font-weight=%27bold%27 fill=%27white%27%3eZS%3c/text%3e%3c/svg%3e',
};

export const users: User[] = [
  { id: 1, name: 'Jane Smith', avatar: 'https://picsum.photos/seed/janesmith/40/40' },
  { id: 2, name: 'Mike Johnson', avatar: 'https://picsum.photos/seed/mikejohnson/40/40' },
  { id: 3, name: 'Emily Davis', avatar: 'https://picsum.photos/seed/emilydavis/40/40' },
  { id: 4, name: 'Chris Lee', avatar: 'https://picsum.photos/seed/chrislee/40/40' },
  { id: 5, name: 'Sarah Wilson', avatar: 'https://picsum.photos/seed/sarahwilson/40/40' },
  { id: 6, name: 'David Chen', avatar: 'https://picsum.photos/seed/davidchen/40/40' },
  { id: 7, name: 'Laura Taylor', avatar: 'https://picsum.photos/seed/laurataylor/40/40' },
  { id: 8, name: 'James Brown', avatar: 'https://picsum.photos/seed/jamesbrown/40/40' },
];

export const stories: Story[] = [
  { id: 1, user: users[0], storyImage: 'https://picsum.photos/seed/story1/110/200' },
  { id: 2, user: users[1], storyImage: 'https://picsum.photos/seed/story2/110/200' },
  { id: 3, user: users[2], storyImage: 'https://picsum.photos/seed/story3/110/200' },
  { id: 4, user: users[3], storyImage: 'https://picsum.photos/seed/story4/110/200' },
  { id: 5, user: users[4], storyImage: 'https://picsum.photos/seed/story5/110/200' },
];

export const posts: Post[] = [
  {
    id: 1,
    user: users[0],
    timestamp: '8小時前',
    content: '在海灘的美好一天！☀️🌊 天氣很好，海水也很清爽。等不及要回去了！',
    image: 'https://picsum.photos/seed/post1/500/300',
    likes: 128,
    comments: [
      { id: 1, user: users[4], content: '看起來真好玩！' },
      { id: 2, user: users[2], content: '照片拍得真美！' },
    ],
    shares: 8,
  },
  {
    id: 2,
    user: users[1],
    timestamp: '1天前',
    content: '剛讀完一本很棒的書。強烈推薦《午夜圖書館》給任何尋找發人深省讀物的人。接下來我該讀什麼？',
    likes: 72,
    comments: [
        { id: 3, user: users[3], content: '這本我也很喜歡！' },
    ],
    shares: 5,
  },
  {
    id: 3,
    user: users[2],
    timestamp: '2天前',
    content: '我的新家庭辦公室終於完成了！準備好提高生產力。💻 #在家工作 #辦公室',
    image: 'https://picsum.photos/seed/post3/500/350',
    likes: 256,
    comments: [
        { id: 4, user: users[0], content: '佈置得很好看！' },
        { id: 5, user: users[1], content: '看起來很舒服。' },
        { id: 6, user: users[5], content: '請問桌子在哪裡買的？' },
    ],
    shares: 12,
  },
   {
    id: 4,
    user: users[3],
    timestamp: '3天前',
    content: '探索這座城市時，發現了這家超棒的咖啡店。這是我喝過最好喝的拿鐵！☕️',
    image: 'https://picsum.photos/seed/post4/500/400',
    likes: 98,
    comments: [],
    shares: 3,
  },
];