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
  description?: string;
}

export const mockAudios: AudioItem[] = [];

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
