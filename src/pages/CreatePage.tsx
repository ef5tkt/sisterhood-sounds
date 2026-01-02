import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, Square, Play, Pause, Check, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import AILoadingScreen from "@/components/AILoadingScreen";
import AIEditPage from "@/pages/AIEditPage";

type RecordingState = "idle" | "recording" | "recorded";
type PageState = "create" | "aiLoading" | "aiEdit";

const CreatePage = () => {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState<PageState>("create");
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Recording timer
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

  const handleUpload = () => {
    toast.success("已选择音频文件", {
      description: "正在准备上传...",
    });
    // Simulate upload completion
    setTimeout(() => {
      setRecordingState("recorded");
      setRecordingTime(180); // Simulate 3 min audio
    }, 1000);
  };

  const handleContinue = () => {
    setPageState("aiLoading");
  };

  const handleAILoadingComplete = () => {
    setPageState("aiEdit");
  };

  const handleBackToCreate = () => {
    setPageState("create");
  };

  const handlePublish = () => {
    toast.success("作品已发布！", {
      description: "音频将永久存储于 IPFS，由你完全掌控",
    });
  };

  const handleReset = () => {
    setRecordingState("idle");
    setRecordingTime(0);
    setIsPlaying(false);
  };

  // Show AI loading screen
  if (pageState === "aiLoading") {
    return <AILoadingScreen onComplete={handleAILoadingComplete} />;
  }

  // Show AI edit page
  if (pageState === "aiEdit") {
    return (
      <AIEditPage 
        onBack={handleBackToCreate} 
        onPublish={handlePublish}
        recordingTime={recordingTime}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-24">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-candy-purple/15 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 glass-panel border-b border-border/30 rounded-none">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">返回</span>
          </button>
          <h1 className="font-display text-lg font-bold text-foreground">声音创作</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center">
        {/* Recording prompt */}
        <p className="text-center text-muted-foreground mb-8 animate-fade-in-up font-medium">
          {recordingState === "idle" && "点击下方按钮，开始录制你的声音 🎙️"}
          {recordingState === "recording" && "正在聆听你的声音... ✨"}
          {recordingState === "recorded" && "录制完成！点击继续进入 AI 编辑 🪄"}
        </p>

        {/* Recording button area */}
        <div className="relative mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {/* Outer breathing glow */}
          <div
            className={cn(
              "absolute rounded-full transition-all duration-1000",
              recordingState === "recording"
                ? "bg-red-400/30 animate-pulse scale-125"
                : recordingState === "idle"
                ? "bg-primary/20 animate-breathe"
                : "bg-candy-mint/20"
            )}
            style={{ width: 200, height: 200, left: -20, top: -20 }}
          />
          
          {/* Middle ring */}
          <div
            className={cn(
              "absolute rounded-full transition-all duration-500",
              recordingState === "recording"
                ? "bg-red-400/20 scale-110"
                : "bg-primary/10"
            )}
            style={{ width: 180, height: 180, left: -10, top: -10 }}
          />

          {/* Main button */}
          <button
            onClick={handleRecordToggle}
            disabled={recordingState === "recorded"}
            className={cn(
              "relative w-40 h-40 rounded-full flex items-center justify-center",
              "transition-all duration-300 shadow-2xl",
              recordingState === "recording"
                ? "bg-gradient-to-br from-red-400 to-red-500 scale-105"
                : recordingState === "recorded"
                ? "bg-gradient-to-br from-candy-mint to-teal-400 cursor-default"
                : "bg-gradient-to-br from-primary to-candy-orange hover:scale-105 animate-pulse-glow"
            )}
          >
            {recordingState === "recording" ? (
              <Square className="w-12 h-12 text-white fill-white" />
            ) : recordingState === "recorded" ? (
              <Check className="w-12 h-12 text-white" />
            ) : (
              <Mic className="w-12 h-12 text-white" />
            )}
          </button>
        </div>

        {/* Recording time */}
        {(recordingState === "recording" || recordingState === "recorded") && (
          <div className="text-4xl font-display font-bold text-foreground mb-8 animate-fade-in-up">
            {formatTime(recordingTime)}
          </div>
        )}

        {/* Actions after recording */}
        {recordingState === "recorded" && (
          <div className="w-full max-w-md space-y-4 animate-fade-in-up">
            {/* Playback preview */}
            <div className="glass-panel rounded-3xl p-4 flex items-center gap-4">
              <button
                onClick={handlePlayToggle}
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center",
                  "bg-gradient-to-br from-primary to-candy-orange",
                  "text-white shadow-lg hover:scale-105 transition-transform active:scale-95"
                )}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>
              <div className="flex-1">
                <div className="h-10 flex items-center gap-0.5">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-1 rounded-full transition-all duration-200",
                        isPlaying ? "bg-primary" : "bg-muted-foreground/30"
                      )}
                      style={{
                        height: `${Math.random() * 60 + 20}%`,
                        animation: isPlaying ? `audio-wave 0.8s ease-in-out infinite` : "none",
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm font-medium text-muted-foreground">{formatTime(recordingTime)}</span>
            </div>

            {/* Continue button */}
            <Button
              onClick={handleContinue}
              className={cn(
                "w-full h-14 rounded-full text-lg font-bold",
                "bg-gradient-to-r from-primary via-candy-orange to-candy-coral",
                "text-white shadow-lg shadow-primary/30",
                "hover:shadow-xl hover:shadow-primary/40",
                "transition-all duration-300 active:scale-95"
              )}
            >
              <span className="mr-2">✨</span>
              继续，让 AI 帮你编辑
            </Button>

            {/* Reset button */}
            <button
              onClick={handleReset}
              className="w-full text-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              重新录制
            </button>
          </div>
        )}

        {/* Upload option when idle */}
        {recordingState === "idle" && (
          <button
            onClick={handleUpload}
            className={cn(
              "mt-6 flex items-center gap-2 px-6 py-3 rounded-full",
              "glass-card hover:bg-secondary/50 transition-all duration-300",
              "text-muted-foreground hover:text-foreground",
              "animate-fade-in-up"
            )}
            style={{ animationDelay: "0.2s" }}
          >
            <Upload className="w-5 h-5" />
            <span className="font-medium">或者上传本地音频</span>
          </button>
        )}

        {/* IPFS hint */}
        <p className="absolute bottom-28 text-xs text-muted-foreground/60 text-center">
          音频将永久存储于 IPFS，由你完全掌控
        </p>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default CreatePage;
