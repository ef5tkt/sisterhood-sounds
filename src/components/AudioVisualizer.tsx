import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AudioVisualizerProps {
  isPlaying: boolean;
  className?: string;
  barCount?: number;
}

const AudioVisualizer = ({ 
  isPlaying, 
  className,
  barCount = 32
}: AudioVisualizerProps) => {
  const [heights, setHeights] = useState<number[]>(
    Array(barCount).fill(20)
  );

  useEffect(() => {
    if (!isPlaying) {
      setHeights(Array(barCount).fill(20));
      return;
    }

    const interval = setInterval(() => {
      setHeights(prev => 
        prev.map(() => Math.random() * 80 + 20)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, barCount]);

  return (
    <div className={cn(
      "flex items-center justify-center gap-1",
      className
    )}>
      {heights.map((height, index) => (
        <div
          key={index}
          className="w-1 md:w-1.5 rounded-full transition-all duration-100"
          style={{
            height: `${height}%`,
            background: `linear-gradient(180deg, 
              hsl(12 90% 70% / 0.9) 0%, 
              hsl(340 85% 75% / 0.7) 50%,
              hsl(270 70% 75% / 0.5) 100%)`,
            animationDelay: `${index * 50}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
