import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AILoadingScreenProps {
  onComplete: () => void;
}

const AILoadingScreen = ({ onComplete }: AILoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "AI 正在感悟你的声音...",
    "分析情感色彩...",
    "匹配最佳标签...",
    "生成创意文案...",
    "即将完成 ✨"
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Flowing gradient background */}
      <div className="absolute inset-0 flowing-gradient opacity-50" />
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-64 h-64 rounded-full bg-primary/20 blur-3xl animate-float"
          style={{ top: "20%", left: "10%" }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full bg-candy-purple/20 blur-3xl animate-float"
          style={{ top: "40%", right: "5%", animationDelay: "-2s" }}
        />
        <div 
          className="absolute w-48 h-48 rounded-full bg-candy-pink/20 blur-3xl animate-float"
          style={{ bottom: "20%", left: "20%", animationDelay: "-4s" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-8">
        {/* Pulsing center orb */}
        <div className="relative mb-12">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl scale-150 animate-pulse-breathe" />
          
          {/* Inner circle with visualizer */}
          <div className={cn(
            "relative w-40 h-40 rounded-full",
            "glass-card flex items-center justify-center",
            "animate-pulse-breathe"
          )}>
            {/* Audio wave bars */}
            <div className="flex items-center justify-center gap-1 h-20">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-primary to-candy-pink"
                  style={{
                    height: `${20 + Math.sin(Date.now() / 200 + i) * 30}%`,
                    animation: `audio-wave 0.8s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Loading text */}
        <p className="text-xl font-display font-bold text-foreground mb-4 animate-pulse">
          {loadingTexts[currentText]}
        </p>

        {/* Progress bar */}
        <div className="w-64 h-2 rounded-full bg-muted overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-primary via-candy-pink to-candy-purple transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <p className="text-sm text-muted-foreground mt-3">
          {progress}%
        </p>
      </div>

      {/* Bottom hint */}
      <p className="absolute bottom-12 text-sm text-muted-foreground/60">
        AI 正在为你的声音赋予灵魂
      </p>
    </div>
  );
};

export default AILoadingScreen;
