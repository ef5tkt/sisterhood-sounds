import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Play, Pause, UserPlus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import NFTAvatar from "./NFTAvatar";
import AudioVisualizer from "./AudioVisualizer";
import { AudioItem } from "@/data/mockAudios";
import { toast } from "sonner";

interface FullScreenAudioCardProps {
  audio: AudioItem;
  isPlaying: boolean;
  onPlayToggle: () => void;
  onOpenDetail: () => void;
  gradientIndex: number;
}

const gradients = [
  "from-rose-200/80 via-purple-200/60 to-blue-200/80",
  "from-amber-200/80 via-pink-200/60 to-violet-200/80",
  "from-teal-200/80 via-cyan-200/60 to-indigo-200/80",
  "from-orange-200/80 via-red-200/60 to-pink-200/80",
  "from-lime-200/80 via-emerald-200/60 to-teal-200/80",
  "from-fuchsia-200/80 via-purple-200/60 to-blue-200/80",
];

const FullScreenAudioCard = ({ 
  audio, 
  isPlaying, 
  onPlayToggle,
  onOpenDetail,
  gradientIndex
}: FullScreenAudioCardProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(false);
  const [likeCount, setLikeCount] = useState(audio.likes);

  const gradient = gradients[gradientIndex % gradients.length];

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    if (!liked) {
      toast.success("已点赞 💖");
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    toast.success(saved ? "已取消收藏" : "已收藏 ✨");
  };

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFollowing(!following);
    toast.success(following ? `已取消关注 ${audio.author}` : `已关注 ${audio.author} 💜`);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`听她说 | ${audio.title}`);
    toast.success("分享链接已复制 ✨");
  };

  return (
    <div className="snap-item relative flex flex-col">
      {/* Fluid gradient background */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br animate-fluid-bg",
        gradient
      )} style={{ backgroundSize: "200% 200%" }} />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 20% 80%, hsla(12, 90%, 70%, 0.3) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, hsla(270, 70%, 75%, 0.3) 0%, transparent 50%)`
      }} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Play/Pause button with visualizer */}
        <button 
          onClick={onPlayToggle}
          className="relative group mb-8"
        >
          {/* Outer glow ring */}
          <div className={cn(
            "absolute inset-0 rounded-full transition-all duration-500",
            isPlaying 
              ? "animate-pulse-glow scale-110" 
              : "scale-100 opacity-50"
          )} style={{
            background: "radial-gradient(circle, hsla(12, 90%, 70%, 0.4) 0%, transparent 70%)"
          }} />
          
          {/* Audio visualizer circle */}
          <div className={cn(
            "w-40 h-40 md:w-56 md:h-56 rounded-full",
            "glass-card flex items-center justify-center",
            "transition-all duration-300 group-hover:scale-105"
          )}>
            {isPlaying ? (
              <AudioVisualizer 
                isPlaying={isPlaying} 
                className="w-full h-24 md:h-32 px-4"
                barCount={24}
              />
            ) : (
              <Play className="w-16 h-16 md:w-20 md:h-20 text-primary ml-2" fill="currentColor" />
            )}
          </div>
          
          {/* Pause overlay on hover when playing */}
          {isPlaying && (
            <div className={cn(
              "absolute inset-0 rounded-full flex items-center justify-center",
              "bg-foreground/10 backdrop-blur-sm opacity-0 group-hover:opacity-100",
              "transition-opacity duration-300"
            )}>
              <Pause className="w-16 h-16 md:w-20 md:h-20 text-foreground/80" fill="currentColor" />
            </div>
          )}
        </button>

        {/* Duration badge */}
        <div className="glass-badge mb-4">
          {audio.duration}
        </div>

        {/* Category */}
        <div className="px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-bold mb-4">
          #{audio.category}
        </div>
      </div>

      {/* Right side action buttons */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20">
        {/* Like */}
        <button
          onClick={handleLike}
          className={cn(
            "flex flex-col items-center gap-1 transition-transform active:scale-90"
          )}
        >
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            "glass-card transition-all duration-300",
            liked && "bg-red-500/20"
          )}>
            <Heart 
              className={cn(
                "w-6 h-6 transition-colors",
                liked ? "text-red-500 fill-red-500" : "text-foreground"
              )} 
            />
          </div>
          <span className="text-xs font-medium text-foreground">{likeCount}</span>
        </button>

        {/* Comment */}
        <button
          onClick={onOpenDetail}
          className="flex flex-col items-center gap-1 transition-transform active:scale-90"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center glass-card">
            <MessageCircle className="w-6 h-6 text-foreground" />
          </div>
          <span className="text-xs font-medium text-foreground">{audio.comments}</span>
        </button>

        {/* Save */}
        <button
          onClick={handleSave}
          className="flex flex-col items-center gap-1 transition-transform active:scale-90"
        >
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            "glass-card transition-all duration-300",
            saved && "bg-amber-500/20"
          )}>
            <Bookmark 
              className={cn(
                "w-6 h-6 transition-colors",
                saved ? "text-amber-500 fill-amber-500" : "text-foreground"
              )} 
            />
          </div>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1 transition-transform active:scale-90"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center glass-card">
            <Share2 className="w-6 h-6 text-foreground" />
          </div>
        </button>
      </div>

      {/* Bottom info section - 20% height */}
      <div className="h-[20vh] min-h-[160px] px-6 pb-24 relative z-10">
        <div className="glass-panel p-4 md:p-5 h-full">
          <div className="flex items-start gap-4">
            {/* Author avatar with follow button */}
            <div className="relative">
              <NFTAvatar 
                src={audio.avatar}
                alt={audio.author}
                size="lg"
              />
              {/* Follow button overlay */}
              <button
                onClick={handleFollow}
                className={cn(
                  "absolute -bottom-1 -right-1 w-7 h-7 rounded-full",
                  "flex items-center justify-center",
                  "transition-all duration-300 active:scale-90",
                  following 
                    ? "bg-muted text-muted-foreground" 
                    : "bg-primary text-primary-foreground"
                )}
              >
                {following ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground">
                @{audio.author}
              </p>
              <h2 className="text-base md:text-lg font-bold text-foreground mt-1 line-clamp-2 font-display">
                {audio.title}
              </h2>
              {audio.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {audio.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenAudioCard;
