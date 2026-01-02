export interface AudioItem {
  id: string;
  title: string;
  author: string;
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
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=classic",
    duration: "4:15",
    category: "诗词",
    likes: 789,
    comments: 92,
  },
];
