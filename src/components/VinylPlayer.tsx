import { cn } from "@/lib/utils";

interface VinylPlayerProps {
  isPlaying: boolean;
  progress: number; // 0-100
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: { outer: 140, stroke: 3, needle: 50 },
  md: { outer: 180, stroke: 4, needle: 65 },
  lg: { outer: 220, stroke: 5, needle: 80 },
  xl: { outer: 260, stroke: 6, needle: 95 },
};

const VinylPlayer = ({ 
  isPlaying, 
  progress, 
  size = "xl",
  className 
}: VinylPlayerProps) => {
  const { outer, stroke, needle } = sizeMap[size];
  const inner = outer - stroke * 2;
  const radius = (outer - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // 唱针角度：根据进度从 -30 度转到 15 度
  const needleAngle = -30 + (progress / 100) * 45;

  return (
    <div 
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: outer + needle, height: outer + 20 }}
    >
      {/* 唱片主体容器 */}
      <div 
        className="relative"
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
            stroke="hsl(var(--foreground) / 0.08)"
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
              filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.5))'
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
            "absolute rounded-full transition-all duration-500",
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
                  rgba(255, 255, 255, 0.4) 0%,
                  rgba(255, 255, 255, 0.1) 30%,
                  rgba(200, 220, 255, 0.15) 50%,
                  rgba(180, 200, 255, 0.1) 70%,
                  rgba(255, 255, 255, 0.2) 100%
                )
              `,
              boxShadow: `
                inset 0 2px 20px rgba(255, 255, 255, 0.3),
                inset 0 -2px 20px rgba(0, 0, 0, 0.1),
                0 8px 32px rgba(0, 0, 0, 0.1)
              `,
              border: '1px solid rgba(255, 255, 255, 0.3)'
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
                  transparent 8px,
                  rgba(255, 255, 255, 0.15) 9px,
                  transparent 10px
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
              height: '20%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)',
              borderRadius: '50%',
              filter: 'blur(4px)'
            }}
          />

          {/* 中心标签 */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ 
              width: inner * 0.28, 
              height: inner * 0.28,
              background: `
                radial-gradient(circle at 40% 40%,
                  rgba(255, 255, 255, 0.6) 0%,
                  rgba(200, 220, 255, 0.4) 50%,
                  rgba(180, 200, 255, 0.3) 100%
                )
              `,
              boxShadow: `
                inset 0 2px 10px rgba(255, 255, 255, 0.4),
                0 2px 8px rgba(0, 0, 0, 0.1)
              `,
              border: '1px solid rgba(255, 255, 255, 0.4)'
            }}
          >
            {/* 中心小孔 */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ 
                width: inner * 0.06, 
                height: inner * 0.06,
                background: 'rgba(0, 0, 0, 0.2)',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)'
              }}
            />
          </div>

          {/* 彩虹折射效果 */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none opacity-30"
            style={{
              background: `
                conic-gradient(
                  from 0deg at 50% 50%,
                  transparent 0deg,
                  rgba(255, 100, 100, 0.2) 60deg,
                  rgba(255, 255, 100, 0.2) 120deg,
                  rgba(100, 255, 100, 0.2) 180deg,
                  rgba(100, 100, 255, 0.2) 240deg,
                  rgba(255, 100, 255, 0.2) 300deg,
                  transparent 360deg
                )
              `
            }}
          />
        </div>

        {/* 播放/暂停指示 */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div 
              className="rounded-full backdrop-blur-sm flex items-center justify-center"
              style={{ 
                width: inner * 0.2, 
                height: inner * 0.2,
                background: 'rgba(255, 255, 255, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.4)'
              }}
            >
              <div 
                className="w-0 h-0 ml-1"
                style={{
                  borderTop: `${inner * 0.04}px solid transparent`,
                  borderBottom: `${inner * 0.04}px solid transparent`,
                  borderLeft: `${inner * 0.07}px solid hsl(var(--foreground) / 0.7)`
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 唱针 */}
      <div 
        className="absolute transition-transform duration-300 ease-out"
        style={{
          top: -10,
          right: 10,
          width: needle,
          height: needle * 1.6,
          transformOrigin: '85% 12%',
          transform: `rotate(${needleAngle}deg)`
        }}
      >
        {/* 唱针底座 */}
        <div 
          className="absolute rounded-full"
          style={{
            top: 0,
            right: 0,
            width: needle * 0.3,
            height: needle * 0.3,
            background: `
              radial-gradient(circle at 40% 40%,
                rgba(200, 200, 210, 0.9) 0%,
                rgba(150, 150, 160, 0.8) 100%
              )
            `,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        />
        
        {/* 唱臂 */}
        <div 
          className="absolute"
          style={{
            top: needle * 0.12,
            right: needle * 0.12,
            width: needle * 0.85,
            height: 4,
            background: `linear-gradient(90deg, 
              rgba(180, 180, 190, 0.9) 0%,
              rgba(220, 220, 230, 0.9) 50%,
              rgba(180, 180, 190, 0.9) 100%
            )`,
            borderRadius: 2,
            transformOrigin: 'right center',
            transform: 'rotate(40deg)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
          }}
        />
        
        {/* 唱头 */}
        <div 
          className="absolute"
          style={{
            bottom: needle * 0.15,
            left: needle * 0.05,
            width: needle * 0.15,
            height: needle * 0.25,
            background: `linear-gradient(180deg,
              rgba(60, 60, 70, 0.9) 0%,
              rgba(40, 40, 50, 0.9) 100%
            )`,
            borderRadius: '2px 2px 1px 1px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          {/* 唱针尖 */}
          <div 
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              bottom: -4,
              width: 2,
              height: 6,
              background: 'linear-gradient(180deg, rgba(180,180,180,1) 0%, rgba(100,100,100,1) 100%)',
              borderRadius: '0 0 1px 1px'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VinylPlayer;
