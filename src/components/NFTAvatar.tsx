import { cn } from "@/lib/utils";

interface NFTAvatarProps {
  src?: string;
  seed?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
  glowing?: boolean;
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-20 h-20",
  xl: "w-32 h-32",
};

const borderSizeClasses = {
  sm: "p-0.5",
  md: "p-1",
  lg: "p-1.5",
  xl: "p-2",
};

const NFTAvatar = ({ 
  src, 
  seed,
  alt = "Avatar", 
  size = "md", 
  className,
  onClick,
  glowing = false
}: NFTAvatarProps) => {
  // 使用 seed 生成 dicebear 头像 URL - adventurer 风格更可爱
  const avatarSrc = src || `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed || "default"}&backgroundColor=ffd5dc,c0aede,b6e3f4&backgroundType=gradientLinear`;
  
  return (
    <div 
      className={cn(
        "relative rounded-full cursor-pointer transition-transform duration-300 hover:scale-105",
        borderSizeClasses[size],
        className
      )}
      onClick={onClick}
      style={{
        background: "linear-gradient(135deg, hsl(45 100% 60%) 0%, hsl(35 100% 55%) 50%, hsl(55 100% 65%) 100%)",
      }}
    >
      {/* Glow effect */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full",
          glowing ? "animate-nft-glow" : ""
        )}
        style={{
          background: "inherit",
          filter: glowing ? "blur(12px)" : "blur(6px)",
          opacity: glowing ? 0.8 : 0.5,
          zIndex: -1,
        }}
      />
      
      {/* Avatar image */}
      <div className={cn(
        "rounded-full overflow-hidden bg-background",
        sizeClasses[size]
      )}>
        <img 
          src={avatarSrc} 
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default NFTAvatar;
