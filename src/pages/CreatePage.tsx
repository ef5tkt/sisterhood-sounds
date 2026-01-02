import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, Square, Play, Pause, Sparkles, Music2, BookOpen, Waves, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const musicTags = [
  { id: "meditation", label: "冥想", icon: Waves, description: "轻柔舒缓的氛围音乐" },
  { id: "speech", label: "演讲", icon: Mic, description: "清晰有力的背景配乐" },
  { id: "poetry", label: "诗词", icon: BookOpen, description: "空灵典雅的古风韵律" },
  { id: "story", label: "故事", icon: Music2, description: "温暖治愈的叙事旋律" },
];

type RecordingState = "idle" | "recording" | "recorded" | "processing";

const CreatePage = () => {
  const navigate = useNavigate();
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 录音计时器
  useEffect(() => {
    if (recordingState === "recording") {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [recordingState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRecordToggle = () => {
    if (recordingState === "idle") {
      setRecordingState("recording");
      setRecordingTime(0);
      toast("开始录制...", {
        description: "放轻松，用你最舒适的方式表达",
      });
    } else if (recordingState === "recording") {
      setRecordingState("recorded");
      toast.success("录制完成！", {
        description: `时长 ${formatTime(recordingTime)}`,
      });
    }
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTagSelect = (tagId: string) => {
    setSelectedTag(tagId);
    const tag = musicTags.find((t) => t.id === tagId);
    toast(`已选择「${tag?.label}」风格`, {
      description: tag?.description,
    });
  };

  const handleAIMatch = () => {
    if (!selectedTag) {
      toast.error("请先选择一个配乐风格");
      return;
    }
    setIsProcessing(true);
    // 模拟 AI 配乐过程
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("AI 配乐匹配完成 ✨", {
        description: "已为你生成专属背景音乐",
      });
    }, 2500);
  };

  const handlePublish = () => {
    toast.success("作品已发布！", {
      description: "音频将永久存储于 IPFS，由你完全掌控",
    });
    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };

  const handleReset = () => {
    setRecordingState("idle");
    setRecordingTime(0);
    setSelectedTag(null);
    setIsPlaying(false);
    setIsProcessing(false);
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
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          <h1 className="font-display text-lg font-semibold text-foreground">声音创作</h1>
          <div className="w-16" /> {/* 占位 */}
        </div>
      </header>

      {/* 主内容区 */}
      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center">
        {/* 录音提示 */}
        <p className="text-center text-muted-foreground mb-8 animate-fade-in-up">
          {recordingState === "idle" && "点击下方按钮，开始录制你的声音"}
          {recordingState === "recording" && "正在聆听你的声音..."}
          {recordingState === "recorded" && "录制完成，选择配乐风格吧"}
        </p>

        {/* 录音按钮区域 */}
        <div className="relative mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {/* 外圈呼吸光效 */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-1000 ${
              recordingState === "recording"
                ? "bg-accent/30 animate-pulse scale-125"
                : recordingState === "idle"
                ? "bg-primary/20 animate-breathe"
                : "bg-primary/10"
            }`}
            style={{ width: 200, height: 200, left: -20, top: -20 }}
          />
          
          {/* 中圈光晕 */}
          <div
            className={`absolute rounded-full transition-all duration-500 ${
              recordingState === "recording"
                ? "bg-accent/20 scale-110"
                : "bg-primary/10"
            }`}
            style={{ width: 180, height: 180, left: -10, top: -10 }}
          />

          {/* 主按钮 */}
          <button
            onClick={handleRecordToggle}
            disabled={recordingState === "recorded"}
            className={`relative w-40 h-40 rounded-full flex items-center justify-center
                       transition-all duration-300 shadow-2xl ${
                         recordingState === "recording"
                           ? "bg-accent hover:bg-accent/90 scale-105"
                           : recordingState === "recorded"
                           ? "bg-muted cursor-default"
                           : "bg-primary hover:bg-primary/90 hover:scale-105 animate-pulse-glow"
                       }`}
          >
            {recordingState === "recording" ? (
              <Square className="w-12 h-12 text-white fill-white" />
            ) : recordingState === "recorded" ? (
              <Check className="w-12 h-12 text-muted-foreground" />
            ) : (
              <Mic className="w-12 h-12 text-primary-foreground" />
            )}
          </button>
        </div>

        {/* 录音时长 */}
        {(recordingState === "recording" || recordingState === "recorded") && (
          <div className="text-3xl font-mono text-foreground mb-8 animate-fade-in-up">
            {formatTime(recordingTime)}
          </div>
        )}

        {/* 录制完成后的操作区 */}
        {recordingState === "recorded" && (
          <div className="w-full max-w-md space-y-6 animate-fade-in-up">
            {/* 播放预览 */}
            <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
              <button
                onClick={handlePlayToggle}
                className="w-12 h-12 rounded-full bg-primary flex items-center justify-center
                         text-primary-foreground shadow-lg hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <div className="flex-1">
                <div className="h-8 flex items-center gap-0.5">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-200 ${
                        isPlaying ? "bg-primary animate-pulse" : "bg-muted-foreground/30"
                      }`}
                      style={{
                        height: `${Math.random() * 60 + 20}%`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{formatTime(recordingTime)}</span>
            </div>

            {/* 配乐风格选择 */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground text-center">选择 AI 配乐风格</p>
              <div className="grid grid-cols-2 gap-3">
                {musicTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => handleTagSelect(tag.id)}
                    className={`glass-card rounded-xl p-4 flex flex-col items-center gap-2
                               transition-all duration-300 ${
                                 selectedTag === tag.id
                                   ? "ring-2 ring-primary bg-primary/10"
                                   : "hover:bg-secondary/50"
                               }`}
                  >
                    <tag.icon className={`w-6 h-6 ${selectedTag === tag.id ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-medium ${selectedTag === tag.id ? "text-primary" : "text-foreground"}`}>
                      {tag.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI 配乐按钮 */}
            <Button
              onClick={handleAIMatch}
              disabled={!selectedTag || isProcessing}
              className="w-full h-12 bg-secondary hover:bg-secondary/80 text-secondary-foreground
                       rounded-xl font-medium transition-all duration-300"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                  <span>AI 正在匹配音乐...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>AI 智能配乐</span>
                </div>
              )}
            </Button>

            {/* 发布按钮 */}
            <Button
              onClick={handlePublish}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground
                       rounded-xl font-medium text-lg shadow-lg shadow-primary/30
                       hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
            >
              发布作品
            </Button>

            {/* 重新录制 */}
            <button
              onClick={handleReset}
              className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              重新录制
            </button>
          </div>
        )}

        {/* IPFS 提示 */}
        <p className="absolute bottom-8 text-xs text-muted-foreground/60 text-center">
          音频将永久存储于 IPFS，由你完全掌控
        </p>
      </main>
    </div>
  );
};

export default CreatePage;
