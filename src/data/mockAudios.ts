export interface AudioItem {
  id: string;
  title: string;
  author: string;
  authorId: string;
  avatar: string;
  duration: string;
  category: string;
  likes: number;
  comments: number;
}

export const mockAudios: AudioItem[] = [
  {
    id: "1",
    title: "晚安冥想 | 释放今天的疲惫，拥抱宁静的夜晚",
    author: "月光姐姐",
    authorId: "user_moon",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=moon",
    duration: "8:32",
    category: "冥想",
    likes: 324,
    comments: 45,
  },
  {
    id: "2",
    title: "写给 18 岁的自己：那些我想告诉你的事",
    author: "温柔说书人",
    authorId: "user_book",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=book",
    duration: "5:18",
    category: "故事",
    likes: 567,
    comments: 89,
  },
  {
    id: "3",
    title: "海子的诗 | 面朝大海，春暖花开",
    author: "诗意人生",
    authorId: "user_poetry",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=poetry",
    duration: "3:45",
    category: "诗词",
    likes: 892,
    comments: 123,
  },
  {
    id: "4",
    title: "职场女性成长日记 | 如何优雅地说「不」",
    author: "职场姐姐",
    authorId: "user_career",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=career",
    duration: "12:20",
    category: "演讲",
    likes: 456,
    comments: 78,
  },
  {
    id: "5",
    title: "雨天的咖啡馆 | 一段关于等待的故事",
    author: "咖啡与书",
    authorId: "user_coffee",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=coffee",
    duration: "6:55",
    category: "故事",
    likes: 234,
    comments: 34,
  },
  {
    id: "6",
    title: "清晨唤醒 | 用呼吸开启美好的一天",
    author: "瑜伽小姐姐",
    authorId: "user_yoga",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=yoga",
    duration: "10:00",
    category: "冥想",
    likes: 678,
    comments: 56,
  },
  {
    id: "7",
    title: "妈妈的话 | 那些年你不愿意听的道理",
    author: "暖心妈妈",
    authorId: "user_mama",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=mama",
    duration: "7:30",
    category: "故事",
    likes: 1024,
    comments: 156,
  },
  {
    id: "8",
    title: "林徽因 | 你是人间四月天",
    author: "古典之声",
    authorId: "user_classic",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=classic",
    duration: "4:15",
    category: "诗词",
    likes: 789,
    comments: 92,
  },
];

// 用户资料数据
export interface UserProfile {
  id: string;
  nickname: string;
  bio: string;
  avatarSeed: string;
  walletAddress: string;
  totalComments: number;
  totalLikes: number;
  totalCollects: number;
  works: number;
}

export const mockUsers: Record<string, UserProfile> = {
  user_moon: {
    id: "user_moon",
    nickname: "月光姐姐",
    bio: "每晚陪你入眠的冥想导师 🌙",
    avatarSeed: "moon",
    walletAddress: "0x1234...5678",
    totalComments: 245,
    totalLikes: 1024,
    totalCollects: 367,
    works: 12,
  },
  user_book: {
    id: "user_book",
    nickname: "温柔说书人",
    bio: "用声音讲述温暖的故事",
    avatarSeed: "book",
    walletAddress: "0x2345...6789",
    totalComments: 189,
    totalLikes: 567,
    totalCollects: 234,
    works: 8,
  },
  user_poetry: {
    id: "user_poetry",
    nickname: "诗意人生",
    bio: "诗词是心灵的栖息地",
    avatarSeed: "poetry",
    walletAddress: "0x3456...7890",
    totalComments: 312,
    totalLikes: 892,
    totalCollects: 456,
    works: 15,
  },
  user_career: {
    id: "user_career",
    nickname: "职场姐姐",
    bio: "分享职场成长的点滴智慧",
    avatarSeed: "career",
    walletAddress: "0x4567...8901",
    totalComments: 178,
    totalLikes: 456,
    totalCollects: 189,
    works: 6,
  },
  user_coffee: {
    id: "user_coffee",
    nickname: "咖啡与书",
    bio: "一杯咖啡，一本书，一段故事",
    avatarSeed: "coffee",
    walletAddress: "0x5678...9012",
    totalComments: 134,
    totalLikes: 234,
    totalCollects: 98,
    works: 5,
  },
  user_yoga: {
    id: "user_yoga",
    nickname: "瑜伽小姐姐",
    bio: "用呼吸感受生命的美好",
    avatarSeed: "yoga",
    walletAddress: "0x6789...0123",
    totalComments: 267,
    totalLikes: 678,
    totalCollects: 312,
    works: 10,
  },
  user_mama: {
    id: "user_mama",
    nickname: "暖心妈妈",
    bio: "妈妈的爱，永远在线",
    avatarSeed: "mama",
    walletAddress: "0x7890...1234",
    totalComments: 423,
    totalLikes: 1024,
    totalCollects: 567,
    works: 18,
  },
  user_classic: {
    id: "user_classic",
    nickname: "古典之声",
    bio: "传承经典，品味人生",
    avatarSeed: "classic",
    walletAddress: "0x8901...2345",
    totalComments: 289,
    totalLikes: 789,
    totalCollects: 345,
    works: 14,
  },
};
