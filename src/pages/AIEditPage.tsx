import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Web3UploadAnimation from "@/components/Web3UploadAnimation";
import { toast } from "sonner";

interface AIEditPageProps {
  onBack: () => void;
  onPublish: () => void;
  recordingTime: number;
}

const musicTags = [
  { id: "meditation", label: "冥想", emoji: "🧘‍♀️" },
  { id: "quote", label: "金句", emoji: "💫" },
  { id: "story", label: "故事", emoji: "📖" },
  { id: "speech", label: "演讲", emoji: "🎤" },
];

// AI 生成的模拟内容
const aiGeneratedContent = {
  titles: [
    "写给深夜失眠的你：愿你被世界温柔以待 🌙",
    "那些藏在心底的话，终于可以说出来了 ✨",
    "给自己的一封情书：你值得被爱 💕",
    "在最暗的夜里，我想对你说... 🌟",
  ],
  descriptions: [
    "每个深夜辗转难眠的时刻，都是心灵在寻找出口。这段声音，送给每一个在黑暗中独行的灵魂。愿你知道，你从不孤单。\n\n#治愈系 #晚安语录 #疗愈之声",
    "有些话，说给懂的人听。有些情绪，只有夜晚才敢释放。把这份温暖收好，下次难过的时候，记得拿出来听一听。\n\n#女性力量 #自我成长 #温暖治愈",
    "生活已经够累了，别再为难自己了。给自己一个拥抱，告诉自己：你做得很好。这段声音，是我想送给你的礼物 🎁\n\n#正能量 #每日一句 #心灵鸡汤",
  ],
};

const AIEditPage = ({ onBack, onPublish, recordingTime }: AIEditPageProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(
    aiGeneratedContent.titles[Math.floor(Math.random() * aiGeneratedContent.titles.length)]
  );
  const [description, setDescription] = useState(
    aiGeneratedContent.descriptions[Math.floor(Math.random() * aiGeneratedContent.descriptions.length)]
  );
  const [selectedTag, setSelectedTag] = useState("story");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showUploadAnimation, setShowUploadAnimation] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setTitle(aiGeneratedContent.titles[Math.floor(Math.random() * aiGeneratedContent.titles.length)]);
      setDescription(aiGeneratedContent.descriptions[Math.floor(Math.random() * aiGeneratedContent.descriptions.length)]);
      setIsRegenerating(false);
      toast.success("已重新生成文案 ✨");
    }, 1500);
  };

  const handlePublish = () => {
    if (!title.trim()) {
      toast.error("请输入作品标题");
      return;
    }
    setShowUploadAnimation(true);
  };

  const handleUploadComplete = () => {
    setShowUploadAnimation(false);
    onPublish();
    navigate("/home");
  };

  if (showUploadAnimation) {
    return <Web3UploadAnimation onComplete={handleUploadComplete} />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-candy-purple/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 glass-panel border-b border-border/30 rounded-none">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          <h1 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI 智能编辑
          </h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-6 pb-32">
        {/* Audio preview */}
        <div className="glass-panel rounded-3xl p-4 mb-6 animate-fade-in-up">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-candy-orange flex items-center justify-center">
              <span className="text-2xl">🎙️</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">你的录音</p>
              <p className="text-xs text-muted-foreground">时长 {formatTime(recordingTime)}</p>
            </div>
            <div className="glass-badge">
              ✨ AI 已分析
            </div>
          </div>
        </div>

        {/* AI Generated hint */}
        <div className="flex items-center gap-2 mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-candy-purple to-candy-pink flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <p className="text-sm text-muted-foreground">
            以下内容由 AI 智能生成，你可以自由编辑
          </p>
        </div>

        {/* Title input */}
        <div className="mb-5 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <label className="text-sm font-bold text-foreground mb-2 block">作品标题</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="给你的声音起个名字"
            className="glass-input h-12 text-base font-medium"
          />
        </div>

        {/* Description */}
        <div className="mb-5 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <label className="text-sm font-bold text-foreground mb-2 block">作品详情</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="描述一下这段声音的故事..."
            rows={6}
            className="glass-input text-base resize-none"
          />
        </div>

        {/* Tags */}
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
          <label className="text-sm font-bold text-foreground mb-3 block">内容标签</label>
          <div className="flex flex-wrap gap-2">
            {musicTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold transition-all duration-300",
                  "active:scale-95",
                  selectedTag === tag.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "glass-card hover:bg-secondary/50"
                )}
              >
                <span className="mr-1.5">{tag.emoji}</span>
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Regenerate button */}
        <button
          onClick={handleRegenerate}
          disabled={isRegenerating}
          className={cn(
            "w-full py-3 rounded-2xl text-sm font-medium",
            "glass-card flex items-center justify-center gap-2",
            "transition-all duration-300 hover:bg-secondary/50",
            "animate-fade-in-up"
          )}
          style={{ animationDelay: "0.3s" }}
        >
          <RefreshCw className={cn("w-4 h-4", isRegenerating && "animate-spin")} />
          {isRegenerating ? "正在重新生成..." : "重新生成文案"}
        </button>
      </main>

      {/* Fixed bottom publish button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 glass-panel rounded-t-3xl border-t border-border/30">
        <Button
          onClick={handlePublish}
          className={cn(
            "w-full h-14 rounded-full text-lg font-bold",
            "bg-gradient-to-r from-primary via-candy-orange to-candy-coral",
            "text-white shadow-lg shadow-primary/30",
            "hover:shadow-xl hover:shadow-primary/40",
            "transition-all duration-300 active:scale-95"
          )}
        >
          <Check className="w-5 h-5 mr-2" />
          确认发布
        </Button>
      </div>
    </div>
  );
};

export default AIEditPage;
