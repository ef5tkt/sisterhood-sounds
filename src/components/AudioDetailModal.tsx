import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import {
  X, Play, Pause, Heart, MessageCircle, Bookmark, Share2,
  Send, MoreHorizontal, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Comment {
  id: string;
  author: string;
  authorId: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
}

interface AudioDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  audio: {
    id: string;
    title: string;
    author: string;
    authorId?: string;
    avatar: string;
    duration: string;
    category: string;
    likes: number;
    comments: number;
    description?: string;
  };
}

// Mock 评论数据
const mockComments: Comment[] = [
  {
    id: "1",
    author: "温暖的阳光",
    authorId: "user_sun",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=sun",
    content: "听完这个声音，感觉整个人都放松下来了，谢谢分享 💜",
    time: "2小时前",
    likes: 23,
  },
  {
    id: "2",
    author: "夜空中的星",
    authorId: "user_star",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=star",
    content: "每晚睡前都会听，已经成为我的入睡仪式了",
    time: "5小时前",
    likes: 45,
  },
  {
    id: "3",
    author: "清风徐来",
    authorId: "user_wind",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=wind",
    content: "声音好温柔，配乐也很棒！期待更多作品",
    time: "1天前",
    likes: 18,
  },
  {
    id: "4",
    author: "花开半夏",
    authorId: "user_flower",
    avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=flower",
    content: "分享给了我的好姐妹，她也很喜欢 ✨",
    time: "2天前",
    likes: 12,
  },
];

const AudioDetailModal = ({ isOpen, onClose, audio }: AudioDetailModalProps) => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(audio.likes);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(mockComments);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      toast("已点赞 💜", { duration: 1500 });
    } else {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    if (!saved) {
      toast("已收藏到你的声音盒子 📦", { duration: 2000 });
    }
  };

  const handleShare = () => {
    toast.success("分享链接已复制 ✨", {
      description: "把温暖传递给更多人",
    });
  };

  const handleSendComment = () => {
    if (!newComment.trim()) {
      toast.error("请输入评论内容");
      return;
    }
    const comment: Comment = {
      id: Date.now().toString(),
      author: "我",
      authorId: "myprofile",
      avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=user",
      content: newComment,
      time: "刚刚",
      likes: 0,
    };
    setComments([comment, ...comments]);
    setNewComment("");
    toast.success("评论发送成功 💬");
  };

  const handleLikeComment = (commentId: string) => {
    if (likedComments.has(commentId)) {
      setLikedComments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
    } else {
      setLikedComments((prev) => new Set(prev).add(commentId));
    }
  };

  const handleAuthorClick = () => {
    onClose();
    navigate(`/profile/${audio.authorId || audio.id}`);
  };

  // 生成声波条
  const waveformBars = Array.from({ length: 48 }, (_, i) => ({
    height: Math.random() * 60 + 20,
    delay: i * 0.03,
  }));

  return createPortal(
    <div className="fixed inset-0 z-50 bg-background animate-fade-in flex flex-col">
      {/* 头部导航 */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 h-14 border-b border-border bg-background safe-area-top">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>
        <h3 className="font-display text-lg font-semibold text-foreground">作品详情</h3>
        <div className="w-10" />
      </header>

      {/* 可滚动内容区 - 自适应填充剩余空间 */}
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-2xl mx-auto">
          {/* 作者信息 */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <button onClick={handleAuthorClick} className="hover:scale-105 transition-transform">
                <img
                  src={audio.avatar}
                  alt={audio.author}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
              </button>
              <div className="flex-1">
                <button
                  onClick={handleAuthorClick}
                  className="font-medium text-foreground hover:text-primary transition-colors"
                >
                  {audio.author}
                </button>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="bg-secondary px-2 py-0.5 rounded-full">{audio.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {audio.duration}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-3 rounded-lg"
              >
                关注
              </Button>
            </div>
          </div>

          {/* 标题和描述 */}
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-medium text-foreground mb-2 leading-relaxed">
              {audio.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {audio.description || "用声音记录生活中的点滴感动，愿这段声音能给你带来片刻的宁静与温暖。在这个快节奏的世界里，让我们一起放慢脚步，倾听内心的声音。"}
            </p>
          </div>

          {/* 播放器 */}
          <div className="p-4 border-b border-border">
            <div className="bg-secondary/50 rounded-2xl p-4">
              <div className="flex items-center gap-4">
                {/* 播放按钮 */}
                <button
                  onClick={handlePlayToggle}
                  className="w-14 h-14 flex-shrink-0 rounded-full bg-primary flex items-center justify-center
                           text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300
                           hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </button>

                {/* 声波可视化 */}
                <div className="flex-1 flex items-center justify-between gap-0.5 h-12 px-2">
                  {waveformBars.map((bar, index) => (
                    <div
                      key={index}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        isPlaying
                          ? "bg-primary animate-pulse"
                          : "bg-muted-foreground/30"
                      }`}
                      style={{
                        height: `${bar.height}%`,
                        animationDelay: `${bar.delay}s`,
                      }}
                    />
                  ))}
                </div>

                <span className="text-sm text-muted-foreground font-mono">{audio.duration}</span>
              </div>
            </div>
          </div>

          {/* 互动按钮 */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-around">
              <button
                onClick={handleLike}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  liked ? "text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart className={`w-6 h-6 ${liked ? "fill-current" : ""}`} />
                <span className="text-xs">{likeCount}</span>
              </button>

              <button className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground">
                <MessageCircle className="w-6 h-6" />
                <span className="text-xs">{comments.length}</span>
              </button>

              <button
                onClick={handleSave}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  saved ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Bookmark className={`w-6 h-6 ${saved ? "fill-current" : ""}`} />
                <span className="text-xs">收藏</span>
              </button>

              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-foreground transition-all"
              >
                <Share2 className="w-6 h-6" />
                <span className="text-xs">分享</span>
              </button>
            </div>
          </div>

          {/* 评论区 */}
          <div className="p-4">
            <h4 className="font-medium text-foreground mb-4">
              全部评论 ({comments.length})
            </h4>

            {/* 评论列表 */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      navigate(`/profile/${comment.authorId}`);
                    }}
                    className="flex-shrink-0"
                  >
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-9 h-9 rounded-full object-cover hover:scale-105 transition-transform"
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="text-sm text-foreground/80 mb-2">{comment.content}</p>
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className={`flex items-center gap-1 text-xs transition-colors ${
                        likedComments.has(comment.id)
                          ? "text-accent"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedComments.has(comment.id) ? "fill-current" : ""}`} />
                      <span>
                        {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 评论输入框 - 固定在底部 */}
      <footer className="flex-shrink-0 p-4 border-t border-border bg-background safe-area-bottom">
        <div className="max-w-2xl mx-auto flex gap-3">
          <img
            src="https://api.dicebear.com/7.x/lorelei/svg?seed=user"
            alt="我的头像"
            className="w-9 h-9 rounded-full flex-shrink-0"
          />
          <div className="flex-1 flex gap-2">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="写下你的评论..."
              className="bg-secondary/50 border-border min-h-[40px] max-h-[100px] py-2 px-3 rounded-xl resize-none text-sm"
              rows={1}
            />
            <Button
              onClick={handleSendComment}
              size="icon"
              className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>,
    document.body
  );
};

export default AudioDetailModal;
