import { cn } from "@/lib/utils";

interface NFTAvatarProps {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-20 h-20",
  xl: "w-28 h-28",
};

const borderSizeClasses = {
  sm: "p-0.5",
  md: "p-1",
  lg: "p-1",
  xl: "p-1.5",
};

const NFTAvatar = ({ 
  src, 
  alt = "Avatar", 
  size = "md", 
  className,
  onClick 
}: NFTAvatarProps) => {
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
        className="absolute inset-0 rounded-full animate-nft-glow"
        style={{
          background: "inherit",
          filter: "blur(8px)",
          opacity: 0.6,
          zIndex: -1,
        }}
      />
      
      {/* Avatar image */}
      <div className={cn(
        "rounded-full overflow-hidden bg-background",
        sizeClasses[size]
      )}>
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default NFTAvatar;
