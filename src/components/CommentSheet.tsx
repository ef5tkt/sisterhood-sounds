import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Send, Loader2, User } from 'lucide-react';
import { isUserVerified } from '@/components/WalletGateModal';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface CommentData {
  id: string;
  audioId: string;
  nickname: string;
  avatarUrl?: string;
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: Date;
  replies?: CommentData[];
}

interface CommentSheetProps {
  isOpen: boolean;
  onClose: () => void;
  audioId: string;
  onLoginRequired: () => void;
}

// 本地存储评论
const COMMENTS_KEY = 'audio_comments';

const getStoredComments = (): CommentData[] => {
  try {
    const stored = localStorage.getItem(COMMENTS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((c: any) => ({
        ...c,
        createdAt: new Date(c.createdAt),
        replies: c.replies?.map((r: any) => ({
          ...r,
          createdAt: new Date(r.createdAt),
        })),
      }));
    }
  } catch (e) {
    console.error('Failed to parse comments', e);
  }
  return [];
};

const saveComments = (comments: CommentData[]) => {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
};

// 模拟初始评论
const mockComments: CommentData[] = [
  {
    id: '1',
    audioId: 'mock',
    nickname: '小红',
    content: '这段话太治愈了，每次听都会泪目 💕',
    likes: 128,
    isLiked: false,
    createdAt: new Date(Date.now() - 3600000 * 2),
    replies: [
      {
        id: '1-1',
        audioId: 'mock',
        nickname: '阿月',
        content: '同感！已经循环听了好多遍',
        likes: 23,
        isLiked: false,
        createdAt: new Date(Date.now() - 3600000),
      },
    ],
  },
  {
    id: '2',
    audioId: 'mock',
    nickname: '晓晓',
    content: '女性力量！我们一起加油 ✨',
    likes: 89,
    isLiked: false,
    createdAt: new Date(Date.now() - 86400000),
  },
];

function CommentItem({ 
  comment, 
  onReply, 
  onLike, 
  isVerified,
  onLoginRequired,
}: { 
  comment: CommentData; 
  onReply: (commentId: string, nickname: string) => void;
  onLike: (commentId: string) => void;
  isVerified: boolean;
  onLoginRequired: () => void;
}) {
  const handleLike = () => {
    if (!isVerified) {
      onLoginRequired();
      return;
    }
    onLike(comment.id);
  };

  const handleReply = () => {
    if (!isVerified) {
      onLoginRequired();
      return;
    }
    onReply(comment.id, comment.nickname);
  };

  return (
    <div className="py-3">
      <div className="flex gap-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={comment.avatarUrl || ''} />
          <AvatarFallback className="bg-muted">
            <User className="w-4 h-4 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-foreground truncate">
              {comment.nickname}
            </span>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {formatDistanceToNow(comment.createdAt, { 
                addSuffix: true, 
                locale: zhCN 
              })}
            </span>
          </div>
          <p className="text-sm text-foreground/90 break-words">{comment.content}</p>
          <div className="flex items-center gap-4 mt-2">
            <button 
              onClick={handleLike}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Heart 
                className={cn(
                  "w-4 h-4 transition-all",
                  comment.isLiked && "fill-red-500 text-red-500"
                )} 
              />
              <span>{comment.likes || 0}</span>
            </button>
            <button 
              onClick={handleReply}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>回复</span>
            </button>
          </div>
        </div>
      </div>

      {/* 回复列表 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 mt-3 pl-3 border-l-2 border-muted space-y-3">
          {comment.replies.map(reply => (
            <div key={reply.id} className="flex gap-2">
              <Avatar className="w-6 h-6 flex-shrink-0">
                <AvatarImage src={reply.avatarUrl || ''} />
                <AvatarFallback className="bg-muted text-xs">
                  <User className="w-3 h-3 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium text-foreground truncate">
                    {reply.nickname}
                  </span>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatDistanceToNow(reply.createdAt, { 
                      addSuffix: true, 
                      locale: zhCN 
                    })}
                  </span>
                </div>
                <p className="text-xs text-foreground/90 break-words">{reply.content}</p>
                <div className="flex items-center gap-3 mt-1">
                  <button 
                    onClick={() => {
                      if (!isVerified) {
                        onLoginRequired();
                        return;
                      }
                      onLike(reply.id);
                    }}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Heart 
                      className={cn(
                        "w-3 h-3 transition-all",
                        reply.isLiked && "fill-red-500 text-red-500"
                      )} 
                    />
                    <span>{reply.likes || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentSheet({ isOpen, onClose, audioId, onLoginRequired }: CommentSheetProps) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<{ id: string; nickname: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const isVerified = isUserVerified();

  // 加载评论
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // 模拟加载延迟
      setTimeout(() => {
        const stored = getStoredComments();
        const audioComments = stored.filter(c => c.audioId === audioId);
        
        // 如果没有评论，添加一些模拟评论
        if (audioComments.length === 0) {
          const initialComments = mockComments.map(c => ({ ...c, audioId }));
          setComments(initialComments);
        } else {
          setComments(audioComments);
        }
        setLoading(false);
      }, 300);
    }
  }, [isOpen, audioId]);

  const handleSubmit = async () => {
    if (!isVerified) {
      onLoginRequired();
      return;
    }

    const content = newComment.trim();
    if (!content) {
      toast.error('请输入评论内容');
      return;
    }

    setSubmitting(true);
    
    // 模拟提交延迟
    await new Promise(resolve => setTimeout(resolve, 300));

    const newCommentData: CommentData = {
      id: Date.now().toString(),
      audioId,
      nickname: '我',
      content,
      likes: 0,
      isLiked: false,
      createdAt: new Date(),
    };

    let updatedComments: CommentData[];
    
    if (replyTo) {
      // 作为回复添加
      updatedComments = comments.map(c => {
        if (c.id === replyTo.id) {
          return {
            ...c,
            replies: [...(c.replies || []), { ...newCommentData, id: `${c.id}-${Date.now()}` }],
          };
        }
        return c;
      });
    } else {
      // 作为新评论添加
      updatedComments = [newCommentData, ...comments];
    }

    setComments(updatedComments);
    
    // 保存到本地存储
    const allComments = getStoredComments().filter(c => c.audioId !== audioId);
    saveComments([...allComments, ...updatedComments]);

    setNewComment('');
    setReplyTo(null);
    setSubmitting(false);
    toast.success('评论成功');
  };

  const handleReply = (commentId: string, nickname: string) => {
    setReplyTo({ id: commentId, nickname });
  };

  const handleLike = (commentId: string) => {
    const updateLike = (items: CommentData[]): CommentData[] => {
      return items.map(c => {
        if (c.id === commentId) {
          return {
            ...c,
            isLiked: !c.isLiked,
            likes: c.isLiked ? c.likes - 1 : c.likes + 1,
          };
        }
        if (c.replies) {
          return {
            ...c,
            replies: updateLike(c.replies),
          };
        }
        return c;
      });
    };

    const updated = updateLike(comments);
    setComments(updated);
    
    // 保存到本地存储
    const allComments = getStoredComments().filter(c => c.audioId !== audioId);
    saveComments([...allComments, ...updated]);
  };

  const cancelReply = () => {
    setReplyTo(null);
  };

  const totalComments = comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 pt-4 pb-2 border-b">
            <SheetTitle className="text-center text-base">
              {totalComments} 条评论
            </SheetTitle>
          </SheetHeader>

          {/* 评论列表 */}
          <div className="flex-1 overflow-y-auto px-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : comments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <MessageCircle className="w-12 h-12 mb-2 opacity-50" />
                <p className="text-sm">暂无评论，来说点什么吧</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {comments.map(comment => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onReply={handleReply}
                    onLike={handleLike}
                    isVerified={isVerified}
                    onLoginRequired={onLoginRequired}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 输入区域 */}
          <div className="border-t bg-background p-3 safe-area-bottom">
            {replyTo && (
              <div className="flex items-center justify-between mb-2 px-2 py-1 bg-muted/50 rounded-lg">
                <span className="text-xs text-muted-foreground">
                  回复 @{replyTo.nickname}
                </span>
                <button 
                  onClick={cancelReply}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  取消
                </button>
              </div>
            )}
            <div className="flex items-end gap-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={isVerified ? "说点什么..." : "连接钱包后发表评论"}
                className="min-h-[40px] max-h-[100px] resize-none rounded-2xl bg-muted/50 border-0 focus-visible:ring-1"
                rows={1}
                disabled={!isVerified}
              />
              <Button
                size="icon"
                onClick={handleSubmit}
                disabled={submitting || !newComment.trim() || !isVerified}
                className="rounded-full h-10 w-10 flex-shrink-0"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            {!isVerified && (
              <button 
                onClick={onLoginRequired}
                className="w-full text-center text-xs text-primary mt-2 hover:underline"
              >
                点击连接钱包
              </button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
