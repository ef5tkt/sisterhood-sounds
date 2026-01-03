import { cn } from "@/lib/utils";

interface VinylPlayerProps {
  isPlaying: boolean;
  progress: number; // 0-100
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: { outer: 100, stroke: 3 },
  md: { outer: 130, stroke: 3 },
  lg: { outer: 160, stroke: 4 },
  xl: { outer: 190, stroke: 4 },
};

const VinylPlayer = ({ 
  isPlaying, 
  progress, 
  size = "xl",
  className 
}: VinylPlayerProps) => {
  const { outer, stroke } = sizeMap[size];
  const inner = outer - stroke * 2;
  const radius = (outer - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div 
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: outer, height: outer }}
    >
      {/* 进度条 - 作为唱片描边 */}
      <svg
        className="absolute inset-0 -rotate-90"
        width={outer}
        height={outer}
      >
        {/* 背景描边 */}
        <circle
          cx={outer / 2}
          cy={outer / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--foreground) / 0.1)"
          strokeWidth={stroke}
        />
        {/* 进度描边 */}
        <circle
          cx={outer / 2}
          cy={outer / 2}
          r={radius}
          fill="none"
          stroke="url(#glassProgressGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-150 ease-out"
          style={{
            filter: 'drop-shadow(0 0 6px hsl(var(--primary) / 0.4))'
          }}
        />
        <defs>
          <linearGradient id="glassProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(200 80% 70%)" />
            <stop offset="50%" stopColor="hsl(280 70% 75%)" />
            <stop offset="100%" stopColor="hsl(350 70% 75%)" />
          </linearGradient>
        </defs>
      </svg>

      {/* 玻璃唱片 */}
      <div
        className={cn(
          "absolute rounded-full transition-all duration-500 overflow-hidden",
          isPlaying && "animate-spin-slow"
        )}
        style={{ 
          top: stroke,
          left: stroke,
          width: inner, 
          height: inner,
        }}
      >
        {/* 玻璃主体 */}
        <div 
          className="absolute inset-0 rounded-full backdrop-blur-md"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, 
                rgba(255, 255, 255, 0.45) 0%,
                rgba(255, 255, 255, 0.15) 30%,
                rgba(200, 220, 255, 0.2) 50%,
                rgba(180, 200, 255, 0.15) 70%,
                rgba(255, 255, 255, 0.25) 100%
              )
            `,
            boxShadow: `
              inset 0 2px 20px rgba(255, 255, 255, 0.35),
              inset 0 -2px 20px rgba(0, 0, 0, 0.08),
              0 8px 32px rgba(0, 0, 0, 0.1)
            `,
            border: '1px solid rgba(255, 255, 255, 0.35)'
          }}
        />

        {/* 水波动画层 1 */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 100%, 
                rgba(255, 255, 255, 0.3) 0%, 
                transparent 50%
              )
            `,
            animation: 'waterWave1 3s ease-in-out infinite'
          }}
        />

        {/* 水波动画层 2 */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 30% 70%, 
                rgba(200, 230, 255, 0.25) 0%, 
                transparent 50%
              )
            `,
            animation: 'waterWave2 4s ease-in-out infinite 0.5s'
          }}
        />

        {/* 水波动画层 3 */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 45% at 70% 60%, 
                rgba(220, 200, 255, 0.2) 0%, 
                transparent 50%
              )
            `,
            animation: 'waterWave3 3.5s ease-in-out infinite 1s'
          }}
        />

        {/* 水波纹理 - 同心圆 */}
        <div 
          className="absolute inset-2 rounded-full pointer-events-none"
          style={{
            background: `
              repeating-radial-gradient(
                circle at 50% 50%,
                transparent 0px,
                transparent 6px,
                rgba(255, 255, 255, 0.12) 7px,
                transparent 8px
              )
            `
          }}
        />

        {/* 光泽高光 */}
        <div 
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '8%',
            left: '15%',
            width: '35%',
            height: '18%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)',
            borderRadius: '50%',
            filter: 'blur(3px)'
          }}
        />

        {/* 中心标签 */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ 
            width: inner * 0.3, 
            height: inner * 0.3,
            background: `
              radial-gradient(circle at 40% 40%,
                rgba(255, 255, 255, 0.55) 0%,
                rgba(200, 220, 255, 0.35) 50%,
                rgba(180, 200, 255, 0.25) 100%
              )
            `,
            boxShadow: `
              inset 0 2px 8px rgba(255, 255, 255, 0.4),
              0 2px 6px rgba(0, 0, 0, 0.08)
            `,
            border: '1px solid rgba(255, 255, 255, 0.4)'
          }}
        >
          {/* 中心小孔 */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ 
              width: inner * 0.07, 
              height: inner * 0.07,
              background: 'rgba(0, 0, 0, 0.15)',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)'
            }}
          />
        </div>

        {/* 彩虹折射效果 */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none opacity-25"
          style={{
            background: `
              conic-gradient(
                from 0deg at 50% 50%,
                transparent 0deg,
                rgba(255, 150, 150, 0.3) 60deg,
                rgba(255, 255, 150, 0.3) 120deg,
                rgba(150, 255, 150, 0.3) 180deg,
                rgba(150, 150, 255, 0.3) 240deg,
                rgba(255, 150, 255, 0.3) 300deg,
                transparent 360deg
              )
            `,
            animation: 'shimmerRotate 8s linear infinite'
          }}
        />
      </div>

      {/* 播放/暂停指示 */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        >
          <div 
            className="rounded-full backdrop-blur-sm flex items-center justify-center"
            style={{ 
              width: inner * 0.22, 
              height: inner * 0.22,
              background: 'rgba(255, 255, 255, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.45)'
            }}
          >
            <div 
              className="w-0 h-0 ml-1"
              style={{
                borderTop: `${inner * 0.045}px solid transparent`,
                borderBottom: `${inner * 0.045}px solid transparent`,
                borderLeft: `${inner * 0.075}px solid hsl(var(--foreground) / 0.6)`
              }}
            />
          </div>
        </div>
      )}

      {/* 内联样式 - 水波动画 */}
      <style>{`
        @keyframes waterWave1 {
          0%, 100% { 
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-15%) scale(1.05);
            opacity: 0.3;
          }
        }
        @keyframes waterWave2 {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
          }
          50% { 
            transform: translate(10%, -10%) scale(1.1);
            opacity: 0.25;
          }
        }
        @keyframes waterWave3 {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.4;
          }
          50% { 
            transform: translate(-8%, -12%) scale(1.08);
            opacity: 0.2;
          }
        }
        @keyframes shimmerRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default VinylPlayer;
