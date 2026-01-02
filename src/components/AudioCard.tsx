import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { toast } from "sonner";

interface AudioCardProps {
  id: string;
  title: string;
  author: string;
  authorId?: string;
  avatar: string;
  duration: string;
  category: string;
  likes: number;
  comments: number;
  isPlaying?: boolean;
  onPlayToggle?: (id: string) => void;
}
const AudioCard = ({
  id,
  title,
  author,
  authorId,
  avatar,
  duration,
  category,
  likes,
  comments,
  isPlaying = false,
  onPlayToggle,
}: AudioCardProps) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [likeCount, setLikeCount] = useState(likes);

  const handleAvatarClick = () => {
    // 跳转到用户个人主页，使用 authorId 或默认 ID
    navigate(`/profile/${authorId || id}`);
  };

  const handlePlayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 创建波纹效果
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    onPlayToggle?.(id);
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      toast("姐妹，我支持你！ 💜", {
        description: "你的温暖已送达",
        duration: 2000,
      });
    } else {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    if (!saved) {
      toast("已收藏到你的声音盒子 📦", {
        duration: 2000,
      });
    }
  };

  const handleShare = () => {
    toast("分享链接已复制 ✨", {
      description: "把温暖传递给更多人",
      duration: 2000,
    });
  };

  const handleComment = () => {
    toast("评论功能即将开放 💭", {
      description: "你的声音我们都想听见",
      duration: 2000,
    });
  };

  // 生成模拟声波条
  const waveformBars = Array.from({ length: 24 }, (_, i) => ({
    height: Math.random() * 60 + 20,
    delay: i * 0.05,
  }));

  return (
    <div className="glass-card rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group">
      {/* 顶部：作者信息 */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <button
            onClick={handleAvatarClick}
            className="block hover:scale-110 transition-transform duration-200"
          >
            <img
              src={avatar}
              alt={author}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 hover:ring-primary/50 transition-all"
            />
          </button>
          {isPlaying && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate">{author}</p>
          <p className="text-xs text-muted-foreground">{category}</p>
        </div>
        <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
          {duration}
        </span>
      </div>

      {/* 标题 */}
      <h3 className="font-medium text-foreground mb-4 line-clamp-2 leading-relaxed">
        {title}
      </h3>

      {/* 声波可视化 + 播放按钮 */}
      <div className="relative h-16 mb-4 flex items-center gap-3">
        {/* 播放按钮 */}
        <button
          onClick={handlePlayClick}
          className="relative w-12 h-12 flex-shrink-0 rounded-full bg-primary flex items-center justify-center
                   text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300
                   hover:shadow-xl hover:shadow-primary/40 hover:scale-105 overflow-hidden"
        >
          {/* 波纹效果 */}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute bg-white/40 rounded-full animate-ripple pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 16,
                height: 16,
                marginLeft: -8,
                marginTop: -8,
              }}
            />
          ))}
          {isPlaying ? (
            <Pause className="w-5 h-5 relative z-10" />
          ) : (
            <Play className="w-5 h-5 ml-0.5 relative z-10" />
          )}
        </button>

        {/* 声波条 */}
        <div className="flex-1 flex items-center justify-between gap-0.5 h-full px-2">
          {waveformBars.map((bar, index) => (
            <div
              key={index}
              className={`w-1 rounded-full transition-all duration-300 ${
                isPlaying
                  ? "bg-primary animate-pulse"
                  : "bg-muted-foreground/30 group-hover:bg-primary/40"
              }`}
              style={{
                height: `${bar.height}%`,
                animationDelay: `${bar.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 互动按钮 */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-4">
          {/* 点赞 */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-sm transition-all duration-300 ${
              liked ? "text-accent scale-110" : "text-muted-foreground hover:text-accent"
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
            <span>{likeCount}</span>
          </button>

          {/* 评论 */}
          <button
            onClick={handleComment}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{comments}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* 收藏 */}
          <button
            onClick={handleSave}
            className={`transition-all duration-300 ${
              saved ? "text-primary scale-110" : "text-muted-foreground hover:text-primary"
            }`}
          >
            <Bookmark className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />
          </button>

          {/* 分享 */}
          <button
            onClick={handleShare}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
