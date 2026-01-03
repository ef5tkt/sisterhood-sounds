import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Mic, Play, Pause, Users, Clock, 
  ChevronRight, Sparkles, Heart, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock 话题数据
const mockTopics = [
  {
    id: "1",
    title: "给18岁的自己",
    description: "如果可以穿越时空，你想对年轻的自己说什么？",
    cover: "https://api.dicebear.com/7.x/shapes/svg?seed=topic1&backgroundColor=ffe4e1,ffd8b1",
    participants: 128,
    voices: 342,
    isHot: true,
  },
  {
    id: "2",
    title: "新年祝福接龙",
    description: "用声音传递新年的温暖，把祝福送给每一个姐妹",
    cover: "https://api.dicebear.com/7.x/shapes/svg?seed=topic2&backgroundColor=e6e6fa,ffd8b1",
    participants: 89,
    voices: 156,
    isHot: true,
  },
  {
    id: "3",
    title: "晚安故事",
    description: "分享一个让你安心入睡的小故事",
    cover: "https://api.dicebear.com/7.x/shapes/svg?seed=topic3&backgroundColor=f5f5dc,e6e6fa",
    participants: 67,
    voices: 98,
    isHot: false,
  },
  {
    id: "4",
    title: "妈妈的话",
    description: "那些妈妈常说的话，现在听来格外温暖",
    cover: "https://api.dicebear.com/7.x/shapes/svg?seed=topic4&backgroundColor=fff0f5,ffe4e1",
    participants: 234,
    voices: 567,
    isHot: true,
  },
  {
    id: "5",
    title: "我最喜欢的诗",
    description: "用你的声音朗诵一首最打动你的诗",
    cover: "https://api.dicebear.com/7.x/shapes/svg?seed=topic5&backgroundColor=fffacd,e6e6fa",
    participants: 156,
    voices: 289,
    isHot: false,
  },
  {
    id: "6",
    title: "职场加油站",
    description: "分享工作中的小确幸，为姐妹们打气",
    cover: "https://api.dicebear.com/7.x/shapes/svg?seed=topic6&backgroundColor=ffefd5,ffe4e1",
    participants: 78,
    voices: 134,
    isHot: false,
  },
];

// Mock 接龙声音数据
const mockRelayVoices = [
  {
    id: "v1",
    user: "月光姐姐",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=moon&backgroundColor=ffd5dc,c0aede,b6e3f4&backgroundType=gradientLinear",
    duration: "0:45",
    likes: 89,
    time: "2小时前",
  },
  {
    id: "v2",
    user: "温柔说书人",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=book&backgroundColor=ffd5dc,c0aede,b6e3f4&backgroundType=gradientLinear",
    duration: "1:12",
    likes: 156,
    time: "3小时前",
  },
  {
    id: "v3",
    user: "诗意人生",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=poetry&backgroundColor=ffd5dc,c0aede,b6e3f4&backgroundType=gradientLinear",
    duration: "0:58",
    likes: 234,
    time: "5小时前",
  },
  {
    id: "v4",
    user: "咖啡与书",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=coffee&backgroundColor=ffd5dc,c0aede,b6e3f4&backgroundType=gradientLinear",
    duration: "1:30",
    likes: 67,
    time: "8小时前",
  },
  {
    id: "v5",
    user: "暖心妈妈",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=mama&backgroundColor=ffd5dc,c0aede,b6e3f4&backgroundType=gradientLinear",
    duration: "2:05",
    likes: 345,
    time: "1天前",
  },
];

const RelayPage = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<typeof mockTopics[0] | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleTopicClick = (topic: typeof mockTopics[0]) => {
    setSelectedTopic(topic);
  };

  const handleBack = () => {
    if (selectedTopic) {
      setSelectedTopic(null);
    } else {
      navigate("/");
    }
  };

  const handlePlayToggle = (id: string) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  const handleJoinRelay = () => {
    toast.success("准备录制你的声音", {
      description: "加入接龙，让更多姐妹听到你",
    });
    navigate("/create");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      {/* 头部导航 */}
      <header className="relative z-10 glass-card border-b border-border/30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          <h1 className="font-display text-lg font-semibold text-foreground">
            {selectedTopic ? selectedTopic.title : "声音接龙"}
          </h1>
          <div className="w-16" />
        </div>
      </header>

      {/* 主内容区 */}
      <main className="relative z-10 container mx-auto px-4 py-6">
        {!selectedTopic ? (
          // 话题广场
          <>
            <p className="text-muted-foreground mb-6 animate-fade-in-up">
              选择一个话题，加入姐妹们的声音接龙
            </p>

            {/* 热门话题横向滚动 */}
            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="font-medium text-foreground">热门话题</h2>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
                {mockTopics
                  .filter((t) => t.isHot)
                  .map((topic, index) => (
                    <button
                      key={topic.id}
                      onClick={() => handleTopicClick(topic)}
                      className="flex-shrink-0 w-64 glass-card rounded-2xl overflow-hidden 
                               hover:scale-[1.02] hover:shadow-xl transition-all duration-300 snap-start
                               text-left"
                      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                    >
                      <div className="h-24 relative overflow-hidden">
                        <img
                          src={topic.cover}
                          alt={topic.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                        <div className="absolute bottom-2 left-3 right-3">
                          <h3 className="font-medium text-white text-sm truncate">{topic.title}</h3>
                        </div>
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                          🔥 热门
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {topic.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {topic.participants}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mic className="w-3 h-3" />
                            {topic.voices}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* 全部话题 */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-medium text-foreground mb-4">全部话题</h2>
              <div className="grid gap-3">
                {mockTopics.map((topic, index) => (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicClick(topic)}
                    className="glass-card rounded-2xl p-4 flex items-center gap-4
                             hover:bg-secondary/30 transition-all duration-300 text-left"
                    style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                  >
                    <img
                      src={topic.cover}
                      alt={topic.title}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground truncate">{topic.title}</h3>
                        {topic.isHot && (
                          <span className="text-xs">🔥</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                        {topic.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {topic.participants} 人参与
                        </span>
                        <span className="flex items-center gap-1">
                          <Mic className="w-3 h-3" />
                          {topic.voices} 条声音
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          // 话题详情 - 接龙时间线
          <>
            {/* 话题信息 */}
            <div className="glass-card rounded-2xl p-5 mb-6 animate-fade-in-up">
              <p className="text-muted-foreground mb-4">{selectedTopic.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {selectedTopic.participants} 人参与
                </span>
                <span className="flex items-center gap-1">
                  <Mic className="w-4 h-4" />
                  {selectedTopic.voices} 条声音
                </span>
              </div>
            </div>

            {/* 加入接龙按钮 */}
            <Button
              onClick={handleJoinRelay}
              className="w-full h-14 mb-6 bg-primary hover:bg-primary/90 text-primary-foreground
                       rounded-2xl font-medium text-lg shadow-lg shadow-primary/30
                       hover:shadow-xl hover:shadow-primary/40 transition-all duration-300
                       animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <Plus className="w-5 h-5 mr-2" />
              加入我的声音
            </Button>

            {/* 接龙时间线 */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-medium text-foreground mb-4">接龙时间线</h2>
              
              {/* 时间线 */}
              <div className="relative">
                {/* 连接线 */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/20" />
                
                {/* 声音卡片 */}
                <div className="space-y-4">
                  {mockRelayVoices.map((voice, index) => (
                    <div
                      key={voice.id}
                      className="relative pl-14 animate-fade-in-up"
                      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                    >
                      {/* 时间线节点 */}
                      <div className="absolute left-4 top-4 w-4 h-4 rounded-full bg-primary 
                                    ring-4 ring-background shadow-lg shadow-primary/30
                                    animate-pulse-glow" />
                      
                      {/* 声音卡片 */}
                      <div className="glass-card rounded-2xl p-4 hover:bg-secondary/20 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={voice.avatar}
                            alt={voice.user}
                            className="w-10 h-10 rounded-full ring-2 ring-primary/20"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-foreground text-sm">{voice.user}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {voice.time}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
                            {voice.duration}
                          </span>
                        </div>

                        {/* 播放器 */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handlePlayToggle(voice.id)}
                            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center
                                     text-primary-foreground shadow-md hover:scale-105 transition-transform"
                          >
                            {playingId === voice.id ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4 ml-0.5" />
                            )}
                          </button>
                          
                          {/* 声波 */}
                          <div className="flex-1 flex items-center gap-0.5 h-8">
                            {Array.from({ length: 20 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-1 rounded-full transition-all duration-200 ${
                                  playingId === voice.id
                                    ? "bg-primary animate-pulse"
                                    : "bg-muted-foreground/30"
                                }`}
                                style={{
                                  height: `${Math.random() * 60 + 20}%`,
                                  animationDelay: `${i * 0.05}s`,
                                }}
                              />
                            ))}
                          </div>

                          {/* 点赞 */}
                          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                            <Heart className="w-4 h-4" />
                            <span className="text-xs">{voice.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 加载更多 */}
                <div className="pl-14 pt-4">
                  <button className="text-sm text-primary hover:underline">
                    查看更多声音...
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default RelayPage;
