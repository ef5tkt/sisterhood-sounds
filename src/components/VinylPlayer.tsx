import { cn } from "@/lib/utils";

interface VinylPlayerProps {
  isPlaying: boolean;
  progress: number; // 0-100
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: { outer: 120, inner: 80, stroke: 4 },
  md: { outer: 160, inner: 110, stroke: 5 },
  lg: { outer: 200, inner: 140, stroke: 6 },
  xl: { outer: 240, inner: 170, stroke: 7 },
};

const VinylPlayer = ({ 
  isPlaying, 
  progress, 
  size = "xl",
  className 
}: VinylPlayerProps) => {
  const { outer, inner, stroke } = sizeMap[size];
  const radius = (outer - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div 
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: outer, height: outer }}
    >
      {/* 进度圈背景 */}
      <svg
        className="absolute inset-0 -rotate-90"
        width={outer}
        height={outer}
      >
        <circle
          cx={outer / 2}
          cy={outer / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--foreground) / 0.1)"
          strokeWidth={stroke}
        />
        {/* 进度圈 */}
        <circle
          cx={outer / 2}
          cy={outer / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300 ease-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="hsl(350 70% 65%)" />
            <stop offset="100%" stopColor="hsl(270 60% 70%)" />
          </linearGradient>
        </defs>
      </svg>

      {/* 唱片本体 */}
      <div
        className={cn(
          "relative rounded-full flex items-center justify-center transition-all duration-500",
          isPlaying && "animate-spin-slow"
        )}
        style={{ 
          width: inner, 
          height: inner,
          background: `
            radial-gradient(circle at 50% 50%, 
              hsl(var(--foreground) / 0.9) 0%, 
              hsl(var(--foreground) / 0.95) 15%,
              hsl(var(--foreground) / 0.85) 16%,
              hsl(var(--foreground) / 0.9) 30%,
              hsl(var(--foreground) / 0.8) 31%,
              hsl(var(--foreground) / 0.85) 45%,
              hsl(var(--foreground) / 0.75) 46%,
              hsl(var(--foreground) / 0.8) 60%,
              hsl(var(--foreground) / 0.7) 61%,
              hsl(var(--foreground) / 0.75) 75%,
              hsl(var(--foreground) / 0.65) 76%,
              hsl(var(--foreground) / 0.7) 100%
            )
          `,
          boxShadow: `
            inset 0 0 30px rgba(0,0,0,0.3),
            0 4px 20px rgba(0,0,0,0.2)
          `
        }}
      >
        {/* 唱片纹路 */}
        <div 
          className="absolute inset-2 rounded-full opacity-30"
          style={{
            background: `
              repeating-radial-gradient(
                circle at 50% 50%,
                transparent 0px,
                transparent 2px,
                hsl(var(--background) / 0.3) 2px,
                hsl(var(--background) / 0.3) 3px
              )
            `
          }}
        />
        
        {/* 唱片标签（中心圆） */}
        <div 
          className="relative rounded-full flex items-center justify-center"
          style={{ 
            width: inner * 0.38, 
            height: inner * 0.38,
            background: `linear-gradient(135deg, 
              hsl(350 70% 75%) 0%, 
              hsl(270 60% 80%) 50%,
              hsl(200 70% 75%) 100%
            )`,
            boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          {/* 中心小孔 */}
          <div 
            className="rounded-full"
            style={{ 
              width: inner * 0.08, 
              height: inner * 0.08,
              background: 'hsl(var(--foreground) / 0.8)',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
            }}
          />
        </div>

        {/* 光泽效果 */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(255,255,255,0.15) 0%,
              transparent 50%,
              rgba(0,0,0,0.1) 100%
            )`
          }}
        />
      </div>

      {/* 播放/暂停指示 */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300",
          isPlaying ? "opacity-0" : "opacity-100"
        )}
      >
        <div 
          className="rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
          style={{ width: inner * 0.25, height: inner * 0.25 }}
        >
          <div 
            className="w-0 h-0 ml-1"
            style={{
              borderTop: `${inner * 0.06}px solid transparent`,
              borderBottom: `${inner * 0.06}px solid transparent`,
              borderLeft: `${inner * 0.1}px solid hsl(var(--foreground))`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VinylPlayer;
