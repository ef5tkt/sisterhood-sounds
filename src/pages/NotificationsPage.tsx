import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, Heart, Bookmark, Play } from "lucide-react";

// Tab 类型
type TabType = "all" | "comments" | "likes" | "collects";

// Mock 通知数据
const mockNotifications = {
  comments: [
    {
      id: "c1",
      user: "月光姐姐",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=moon",
      action: "评论了你的作品",
      target: "晚安冥想 #001",
      content: "太治愈了，听着听着就睡着了 💤",
      time: "2分钟前",
    },
    {
      id: "c2",
      user: "诗意人生",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=poetry",
      action: "评论了你的作品",
      target: "海子的诗",
      content: "声音好温柔，朗诵得真好",
      time: "15分钟前",
    },
    {
      id: "c3",
      user: "咖啡与书",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=coffee",
      action: "评论了你的作品",
      target: "雨天的咖啡馆",
      content: "故事好有画面感！",
      time: "1小时前",
    },
    {
      id: "c4",
      user: "瑜伽小姐姐",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=yoga",
      action: "回复了你的评论",
      target: "清晨唤醒冥想",
      content: "谢谢姐妹的支持 ❤️",
      time: "3小时前",
    },
  ],
  likes: [
    {
      id: "l1",
      user: "温柔说书人",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=book",
      action: "赞了你的作品",
      target: "写给18岁的自己",
      time: "刚刚",
    },
    {
      id: "l2",
      user: "职场姐姐",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=career",
      action: "赞了你的作品",
      target: "晚安冥想 #001",
      time: "5分钟前",
    },
    {
      id: "l3",
      user: "暖心妈妈",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=mama",
      action: "赞了你的作品",
      target: "林徽因 · 四月天",
      time: "20分钟前",
    },
    {
      id: "l4",
      user: "古典之声",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=classic",
      action: "赞了你的作品",
      target: "海子的诗",
      time: "1小时前",
    },
    {
      id: "l5",
      user: "星空女孩",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=star",
      action: "赞了你的作品",
      target: "清晨唤醒冥想",
      time: "2小时前",
    },
  ],
  collects: [
    {
      id: "s1",
      user: "梦想家",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=dream",
      action: "收藏了你的作品",
      target: "晚安冥想 #001",
      time: "10分钟前",
    },
    {
      id: "s2",
      user: "夜猫子",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=night",
      action: "收藏了你的作品",
      target: "写给18岁的自己",
      time: "30分钟前",
    },
    {
      id: "s3",
      user: "文艺青年",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=art",
      action: "收藏了你的作品",
      target: "海子的诗",
      time: "2小时前",
    },
  ],
};

const tabs = [
  { id: "all" as TabType, label: "全部", icon: null },
  { id: "comments" as TabType, label: "评论", icon: MessageCircle },
  { id: "likes" as TabType, label: "赞", icon: Heart },
  { id: "collects" as TabType, label: "收藏", icon: Bookmark },
];

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("all");

  // 从 URL 参数读取初始 tab
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["all", "comments", "likes", "collects"].includes(tabParam)) {
      setActiveTab(tabParam as TabType);
    }
  }, [searchParams]);

  // 根据当前 tab 获取通知列表
  const getNotifications = () => {
    if (activeTab === "all") {
      // 合并所有通知并按时间排序
      return [
        ...mockNotifications.comments.map((n) => ({ ...n, type: "comment" as const })),
        ...mockNotifications.likes.map((n) => ({ ...n, type: "like" as const })),
        ...mockNotifications.collects.map((n) => ({ ...n, type: "collect" as const })),
      ].sort(() => Math.random() - 0.5); // 模拟混合排序
    }
    if (activeTab === "comments") {
      return mockNotifications.comments.map((n) => ({ ...n, type: "comment" as const }));
    }
    if (activeTab === "likes") {
      return mockNotifications.likes.map((n) => ({ ...n, type: "like" as const }));
    }
    return mockNotifications.collects.map((n) => ({ ...n, type: "collect" as const }));
  };

  const notifications = getNotifications();

  const getTypeIcon = (type: "comment" | "like" | "collect") => {
    switch (type) {
      case "comment":
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case "like":
        return <Heart className="w-4 h-4 text-primary fill-primary" />;
      case "collect":
        return <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      {/* 头部导航 */}
      <header className="relative z-10 glass-card border-b border-border/30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          <h1 className="font-display text-lg font-semibold text-foreground">通知</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Tab 切换 */}
      <div className="relative z-10 glass-card border-b border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium
                          transition-all duration-300 ${
                            activeTab === tab.id
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                          }`}
              >
                {tab.icon && <tab.icon className="w-4 h-4" />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 通知列表 */}
      <main className="relative z-10 container mx-auto px-4 py-4">
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className="glass-card rounded-2xl p-4 animate-fade-in-up hover:bg-secondary/20 
                       transition-colors cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex gap-3">
                {/* 头像 */}
                <div className="relative flex-shrink-0">
                  <img
                    src={notification.avatar}
                    alt={notification.user}
                    className="w-12 h-12 rounded-full ring-2 ring-primary/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-background
                                flex items-center justify-center shadow-sm">
                    {getTypeIcon(notification.type)}
                  </div>
                </div>

                {/* 内容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm">
                        <span className="font-medium text-foreground">{notification.user}</span>
                        <span className="text-muted-foreground"> {notification.action} </span>
                        <span className="font-medium text-primary">{notification.target}</span>
                      </p>
                      {"content" in notification && notification.content && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          "{notification.content}"
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {notification.time}
                    </span>
                  </div>

                  {/* 作品预览（可选） */}
                  {notification.type === "like" || notification.type === "collect" ? (
                    <div className="mt-3 flex items-center gap-2 p-2 bg-secondary/30 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Play className="w-4 h-4 text-primary ml-0.5" />
                      </div>
                      <span className="text-sm text-foreground truncate">{notification.target}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {notifications.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">暂无通知</p>
          </div>
        )}

        {/* 底部提示 */}
        <p className="text-center text-sm text-muted-foreground/60 mt-8">
          只显示最近 30 天的通知
        </p>
      </main>
    </div>
  );
};

export default NotificationsPage;
