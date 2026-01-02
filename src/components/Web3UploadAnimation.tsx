import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Web3UploadAnimationProps {
  onComplete: () => void;
}

const Web3UploadAnimation = ({ onComplete }: Web3UploadAnimationProps) => {
  const [phase, setPhase] = useState<"uploading" | "processing" | "complete">("uploading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("complete");
          setTimeout(onComplete, 1500);
          return 100;
        }
        if (prev >= 60 && phase === "uploading") {
          setPhase("processing");
        }
        return prev + 3;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete, phase]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl">
      {/* Rotating background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "conic-gradient(from 0deg, hsl(12 90% 70%), hsl(270 70% 75%), hsl(340 85% 75%), hsl(45 100% 55%), hsl(12 90% 70%))",
          animation: "spin-glow 8s linear infinite"
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Hexagon container */}
        <div className="relative mb-8">
          {/* Rotating ring */}
          <svg 
            className="w-48 h-48 animate-spin-glow"
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(45, 100%, 55%)" />
                <stop offset="50%" stopColor="hsl(12, 90%, 70%)" />
                <stop offset="100%" stopColor="hsl(270, 70%, 75%)" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray={`${progress * 2.83} ${283 - progress * 2.83}`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center",
              "transition-all duration-500",
              phase === "complete" 
                ? "bg-gradient-to-br from-candy-mint to-teal-400 scale-110" 
                : "glass-card"
            )}>
              {phase === "complete" ? (
                <Check className="w-12 h-12 text-white animate-scale-in" />
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status text */}
        <p className="text-xl font-display font-bold text-foreground mb-2">
          {phase === "uploading" && "正在上传至 IPFS..."}
          {phase === "processing" && "区块链确认中..."}
          {phase === "complete" && "发布成功！🎉"}
        </p>

        {/* Progress info */}
        <p className="text-sm text-muted-foreground">
          {phase !== "complete" ? `${progress}%` : "你的声音已永久保存"}
        </p>

        {/* Blockchain blocks animation */}
        {phase === "processing" && (
          <div className="flex gap-2 mt-6">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-4 h-4 rounded bg-primary/50"
                style={{
                  animation: "pulse-breathe 0.6s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Success particles */}
        {phase === "complete" && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: `hsl(${Math.random() * 60 + 10}, 90%, 70%)`,
                  left: `${50 + (Math.random() - 0.5) * 100}%`,
                  top: `${50 + (Math.random() - 0.5) * 100}%`,
                  animation: `fade-in-up 1s ease-out forwards`,
                  animationDelay: `${i * 0.05}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Web3UploadAnimation;
