import { useState } from "react";
import Navbar from "@/components/Navbar";
import AudioCard from "@/components/AudioCard";
import { mockAudios } from "@/data/mockAudios";
import { Sparkles, TrendingUp, Clock, Heart } from "lucide-react";

const categories = [
  { id: "all", label: "全部", icon: Sparkles },
  { id: "trending", label: "热门", icon: TrendingUp },
  { id: "recent", label: "最新", icon: Clock },
  { id: "following", label: "关注", icon: Heart },
];

const HomeFeed = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlayToggle = (id: string) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      {/* 导航栏 */}
      <Navbar />

      {/* 主内容区 */}
      <main className="relative z-10 container mx-auto px-4 py-6">
        {/* 欢迎语 */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            下午好，姐妹 ✨
          </h1>
          <p className="text-muted-foreground">
            今天有 {mockAudios.length} 个新声音等你发现
          </p>
        </div>

        {/* 分类标签 */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap
                        transition-all duration-300 ${
                          activeCategory === cat.id
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                            : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* 音频卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {mockAudios.map((audio, index) => (
            <div
              key={audio.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <AudioCard
                {...audio}
                isPlaying={playingId === audio.id}
                onPlayToggle={handlePlayToggle}
              />
            </div>
          ))}
        </div>

        {/* 加载更多提示 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            ✨ 更多声音正在路上...
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomeFeed;
