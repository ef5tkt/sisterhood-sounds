import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star, MessageCircle, Share2, ChevronLeft, User, ChevronUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAudios, AudioItem } from "@/hooks/useAudios";
import VinylPlayer from "@/components/VinylPlayer";
import AudioVisualizer from "@/components/AudioVisualizer";
import TagFilterMenu from "@/components/TagFilterMenu";
import WalletGateModal, { isUserVerified } from "@/components/WalletGateModal";
import CommentSheet from "@/components/CommentSheet";
import { cn } from "@/lib/utils";

// 标签映射
const TAG_CATEGORY_MAP: Record<string, string[]> = {
  "冥想": ["冥想"],
  "故事": ["故事"],
  "她力量": ["演讲", "诗词"],
  "兔子洞": [], // 全局随机
  "共创": [], // 跳转 Relay
};

const ListenPage = () => {
  const navigate = useNavigate();
  const { data: audios, isLoading } = useAudios();
  const [currentAudio, setCurrentAudio] = useState<AudioItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showTagMenu, setShowTagMenu] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTag, setCurrentTag] = useState<string>("兔子洞");
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<"save" | "comment" | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [showCommentSheet, setShowCommentSheet] = useState(false);
  
  // 滑动相关的 refs
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 音频播放器 ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // 长按检测
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef<boolean>(false);

  // 用于存储 switchAudio 回调的 ref
  const switchAudioRef = useRef<((tag?: string) => void) | null>(null);

  // 初始化音频播放器
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = false; // 不循环，播放完切换下一个
    audioRef.current.preload = "auto";
    
    const handlePlay = () => {
      setIsPlaying(true);
      setIsAudioLoading(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setIsPlaying(false);
      setIsAudioLoading(false);
    };
    const handleLoadStart = () => setIsAudioLoading(true);
    const handleCanPlay = () => setIsAudioLoading(false);
    const handleTimeUpdate = () => {
      if (audioRef.current && audioRef.current.duration) {
        const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setAudioProgress(progress);
      }
    };
    const handleEnded = () => {
      // 播放结束后自动切换到下一个音频
      if (switchAudioRef.current) {
        switchAudioRef.current();
      }
    };
    
    audioRef.current.addEventListener('play', handlePlay);
    audioRef.current.addEventListener('pause', handlePause);
    audioRef.current.addEventListener('error', handleError);
    audioRef.current.addEventListener('loadstart', handleLoadStart);
    audioRef.current.addEventListener('canplay', handleCanPlay);
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('ended', handleEnded);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.removeEventListener('loadstart', handleLoadStart);
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current = null;
      }
    };
  }, []);

  // 当 currentAudio 变化时，加载并播放新音频
  useEffect(() => {
    if (currentAudio?.audioUrl && audioRef.current) {
      audioRef.current.src = currentAudio.audioUrl;
      audioRef.current.load();
      
      // 监听 canplay 事件后自动播放
      const handleCanPlayThrough = () => {
        if (audioRef.current) {
          audioRef.current.play().catch((err) => {
            console.log("Autoplay blocked:", err);
            setIsPlaying(false);
          });
        }
      };
      
      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough, { once: true });
      
      return () => {
        audioRef.current?.removeEventListener('canplaythrough', handleCanPlayThrough);
      };
    } else if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentAudio]);

  // 切换播放/暂停
  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !currentAudio?.audioUrl) {
      toast.error("该音频暂无播放源");
      return;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Play error:", err);
        toast.error("播放失败");
      });
    }
  }, [isPlaying, currentAudio]);

  // 根据标签获取随机音频
  const getRandomAudio = useCallback((tag?: string) => {
    if (!audios || audios.length === 0) return null;
    
    let filteredAudios = audios;
    
    if (tag && tag !== "兔子洞" && TAG_CATEGORY_MAP[tag]?.length > 0) {
      const categories = TAG_CATEGORY_MAP[tag];
      filteredAudios = audios.filter(audio => 
        categories.includes(audio.category)
      );
    }
    
    // 如果没有符合条件的音频，使用全部
    if (filteredAudios.length === 0) {
      filteredAudios = audios;
    }
    
    // 随机选择，避免选到当前的
    let randomIndex = Math.floor(Math.random() * filteredAudios.length);
    if (filteredAudios.length > 1 && currentAudio) {
      while (filteredAudios[randomIndex].id === currentAudio.id) {
        randomIndex = Math.floor(Math.random() * filteredAudios.length);
      }
    }
    
    return filteredAudios[randomIndex];
  }, [audios, currentAudio]);

  // 切换音频（带淡入淡出）
  const switchAudio = useCallback((tag?: string) => {
    setIsTransitioning(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    setTimeout(() => {
      const newAudio = getRandomAudio(tag);
      setCurrentAudio(newAudio);
      setIsLiked(false);
      setIsSaved(false);
      setAudioProgress(0);
      
      // 提示用户已切换
      if (newAudio && !newAudio.audioUrl) {
        toast("已切换到新内容，暂无音频源", {
          className: "glass-panel",
        });
      }
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 400);
  }, [getRandomAudio]);

  // 更新 switchAudioRef 以便在 ended 事件中调用
  useEffect(() => {
    switchAudioRef.current = () => switchAudio(currentTag);
  }, [switchAudio, currentTag]);

  // 初始化时随机播放
  useEffect(() => {
    if (audios && audios.length > 0 && !currentAudio) {
      const randomAudio = getRandomAudio();
      setCurrentAudio(randomAudio);
    }
  }, [audios]);

  // 滑动手势处理
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = true;
    isLongPress.current = false;
    
    // 开始长按计时
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setShowTagMenu(true);
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 500);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    
    const currentY = e.touches[0].clientY;
    const diff = touchStartY.current - currentY;
    
    // 如果移动了，取消长按
    if (Math.abs(diff) > 10 && longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    
    // 只允许上滑（正值），限制最大偏移
    if (diff > 0) {
      setSwipeOffset(Math.min(diff * 0.5, 150));
    } else {
      setSwipeOffset(Math.max(diff * 0.3, -50));
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    // 清除长按计时器
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    
    if (!isDragging.current) return;
    isDragging.current = false;
    
    // 如果上滑超过阈值，切换到下一个音频
    if (swipeOffset > 80) {
      switchAudio(currentTag);
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    }
    
    // 重置偏移
    setSwipeOffset(0);
  }, [swipeOffset, switchAudio, currentTag]);

  // 鼠标拖拽和长按处理（桌面端）
  const mouseStartY = useRef<number>(0);
  const isMouseDragging = useRef<boolean>(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    mouseStartY.current = e.clientY;
    isMouseDragging.current = true;
    isLongPress.current = false;
    
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setShowTagMenu(true);
    }, 500);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isMouseDragging.current) return;
    
    const diff = mouseStartY.current - e.clientY;
    
    // 如果移动了，取消长按
    if (Math.abs(diff) > 10 && longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    
    // 只允许上滑（正值），限制最大偏移
    if (diff > 0) {
      setSwipeOffset(Math.min(diff * 0.5, 150));
    } else {
      setSwipeOffset(Math.max(diff * 0.3, -50));
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    
    if (!isMouseDragging.current) return;
    isMouseDragging.current = false;
    
    // 如果上滑超过阈值，切换到下一个音频
    if (swipeOffset > 80) {
      switchAudio(currentTag);
    }
    
    // 重置偏移
    setSwipeOffset(0);
  }, [swipeOffset, switchAudio, currentTag]);

  const handleMouseLeave = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    
    if (isMouseDragging.current) {
      isMouseDragging.current = false;
      setSwipeOffset(0);
    }
  }, []);

  // 点击处理 - 暂停/播放
  const handleScreenClick = useCallback(() => {
    // 如果是长按触发的，不处理点击
    if (isLongPress.current) {
      isLongPress.current = false;
      return;
    }
    togglePlayPause();
  }, [togglePlayPause]);

  // 处理标签选择
  const handleTagSelect = (tag: string) => {
    setShowTagMenu(false);
    setCurrentTag(tag);
    
    if (tag === "共创") {
      navigate("/relay");
      return;
    }
    
    switchAudio(tag);
  };

  // 创作入口处理
  const handleCreateClick = () => {
    setShowTagMenu(false);
    if (!isUserVerified()) {
      setShowWalletModal(true);
      return;
    }
    navigate("/create");
  };

  // 点赞处理 - 所有人都可以
  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      toast("姐妹，我支持你！ 💗", {
        className: "glass-panel text-center",
      });
    }
  };

  // 收藏处理 - 需要验证
  const handleSave = () => {
    if (!isUserVerified()) {
      setPendingAction("save");
      setShowWalletModal(true);
      return;
    }
    setIsSaved(!isSaved);
    if (!isSaved) {
      toast.success("已收藏到你的珍藏 ⭐");
    }
  };

  // 评论处理 - 打开评论面板
  const handleComment = () => {
    setShowCommentSheet(true);
  };

  // 需要登录时跳转到登录页
  const handleLoginRequired = () => {
    navigate('/auth');
  };

  // 分享处理 - 所有人都可以
  const handleShare = () => {
    toast.success("已复制分享链接 🔗");
  };

  // 钱包验证成功后的回调
  const handleWalletSuccess = () => {
    if (pendingAction === "save") {
      setIsSaved(true);
      toast.success("已收藏到你的珍藏 ⭐");
    } else if (pendingAction === "comment") {
      toast("评论功能即将开放 💬");
    }
    setPendingAction(null);
  };

  // 点击头像跳转到发布者主页
  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentAudio) {
      navigate(`/profile/${currentAudio.id}`);
    }
  };

  if (isLoading || !currentAudio) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        <div className="text-muted-foreground">加载中...</div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden touch-pan-x"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 流动渐变背景 */}
      <div 
        className="absolute inset-0 animate-fluid-bg"
        style={{
          background: "linear-gradient(135deg, hsl(350 70% 85%) 0%, hsl(270 60% 88%) 25%, hsl(200 70% 85%) 50%, hsl(30 80% 88%) 75%, hsl(350 70% 85%) 100%)",
          backgroundSize: "400% 400%",
        }}
      />
      
      {/* 噪点纹理 */}
      <div className="absolute inset-0 noise-texture opacity-20" />

      {/* 顶部导航 */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 safe-area-top">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="w-12 h-12 rounded-2xl glass-card-solid flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          
          {/* 当前标签指示 */}
          <div className="px-4 py-2 rounded-full glass-card-solid text-sm font-medium text-foreground/80">
            {currentTag === "兔子洞" ? "🐰 随机探索" : currentTag}
          </div>
          
          <button
            onClick={() => navigate("/profile")}
            className="w-12 h-12 rounded-2xl glass-card-solid flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          >
            <User className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* 主内容区域 - 点击暂停/播放，长按唤起标签菜单，支持滑动 */}
      <div 
        className={cn(
          "relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-32 transition-all duration-300 select-none",
          isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}
        style={{
          transform: `translateY(${-swipeOffset}px)`,
          transition: (isDragging.current || isMouseDragging.current) ? 'none' : 'transform 0.3s ease-out, opacity 0.5s, scale 0.5s'
        }}
        onClick={handleScreenClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* 唱片播放器 */}
        <div className="mb-6 animate-fade-in">
          <VinylPlayer 
            isPlaying={isPlaying}
            progress={audioProgress}
            size="xl"
          />
          {isAudioLoading && currentAudio?.audioUrl && (
            <div className="text-center mt-4 text-sm text-muted-foreground/70 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              加载中...
            </div>
          )}
          {!isAudioLoading && !isPlaying && currentAudio?.audioUrl && (
            <div className="text-center mt-4 text-sm text-muted-foreground/70">
              点击屏幕播放
            </div>
          )}
          {!currentAudio?.audioUrl && (
            <div className="text-center mt-4 text-sm text-muted-foreground/50">
              暂无音频
            </div>
          )}
        </div>

        {/* 作者和标题 */}
        <div className="text-center mb-8 max-w-md">
          <h2 
            className="text-sm font-medium text-muted-foreground mb-2 font-body cursor-pointer hover:text-foreground transition-colors"
            onClick={handleAvatarClick}
          >
            {currentAudio.author}
          </h2>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight mb-4">
            {currentAudio.title}
          </h1>
          <p className="text-sm text-muted-foreground/80 font-body line-clamp-2">
            {currentAudio.description}
          </p>
        </div>

        {/* 滑动提示 */}
        <div className="flex flex-col items-center gap-1 text-muted-foreground/50">
          <ChevronUp 
            className={cn(
              "w-5 h-5 transition-all duration-300",
              swipeOffset > 0 ? "opacity-100 -translate-y-1" : "opacity-50 animate-bounce"
            )} 
          />
          <span className="text-xs font-body">
            {swipeOffset > 80 ? "松开切换" : "上滑听下一个"}
          </span>
        </div>
      </div>

      {/* 下一个音频预览提示（滑动时显示） */}
      {swipeOffset > 30 && (
        <div 
          className="absolute bottom-0 left-0 right-0 z-5 flex items-center justify-center pb-40 pointer-events-none"
          style={{
            opacity: Math.min(swipeOffset / 100, 0.8),
            transform: `translateY(${100 - swipeOffset * 0.5}px)`
          }}
        >
          <div className="text-sm text-foreground/60 font-body">
            下一个声音等着你...
          </div>
        </div>
      )}

      {/* 底部互动按钮 */}
      <div className="fixed bottom-8 left-0 right-0 z-20 px-6 safe-area-bottom">
        <div className="flex items-center justify-center gap-4">
          {/* 点赞 - 所有人可用 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            className={cn(
              "w-14 h-14 rounded-2xl glass-card-solid flex items-center justify-center transition-all duration-300",
              "hover:scale-110 active:scale-95",
              isLiked && "bg-candy-coral/20 border-candy-coral/30"
            )}
          >
            <Heart 
              className={cn(
                "w-7 h-7 transition-all duration-300",
                isLiked ? "text-candy-coral fill-candy-coral scale-110" : "text-foreground/70"
              )} 
            />
          </button>

          {/* 收藏 - 需要验证 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            className={cn(
              "w-14 h-14 rounded-2xl glass-card-solid flex items-center justify-center transition-all duration-300",
              "hover:scale-110 active:scale-95",
              isSaved && "bg-candy-orange/20 border-candy-orange/30"
            )}
          >
            <Star 
              className={cn(
                "w-7 h-7 transition-all duration-300",
                isSaved ? "text-candy-orange fill-candy-orange scale-110" : "text-foreground/70"
              )} 
            />
          </button>

          {/* 评论 - 需要验证 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleComment();
            }}
            className="w-14 h-14 rounded-2xl glass-card-solid flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <MessageCircle className="w-7 h-7 text-foreground/70" />
          </button>

          {/* 分享 - 所有人可用 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            className="w-14 h-14 rounded-2xl glass-card-solid flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <Share2 className="w-7 h-7 text-foreground/70" />
          </button>
        </div>
      </div>

      {/* 标签筛选菜单 */}
      <TagFilterMenu
        isOpen={showTagMenu}
        onClose={() => setShowTagMenu(false)}
        onSelectTag={handleTagSelect}
        onCreateClick={handleCreateClick}
        currentTag={currentTag}
      />

      {/* 评论面板 */}
      {currentAudio && (
        <CommentSheet
          isOpen={showCommentSheet}
          onClose={() => setShowCommentSheet(false)}
          audioId={currentAudio.id}
          onLoginRequired={handleLoginRequired}
        />
      )}

      {/* 钱包验证模态框 */}
      <WalletGateModal
        isOpen={showWalletModal}
        onClose={() => {
          setShowWalletModal(false);
          setPendingAction(null);
        }}
        onSuccess={handleWalletSuccess}
      />
    </div>
  );
};

export default ListenPage;
