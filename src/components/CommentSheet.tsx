import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Send, Loader2, User } from 'lucide-react';
import { useComments, Comment } from '@/hooks/useComments';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface CommentSheetProps {
  isOpen: boolean;
  onClose: () => void;
  audioId: string;
  onLoginRequired: () => void;
}

function CommentItem({ 
  comment, 
  onReply, 
  onLike, 
  isLoggedIn,
  onLoginRequired,
}: { 
  comment: Comment; 
  onReply: (commentId: string, nickname: string) => void;
  onLike: (commentId: string) => void;
  isLoggedIn: boolean;
  onLoginRequired: () => void;
}) {
  const handleLike = () => {
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }
    onLike(comment.id);
  };

  const handleReply = () => {
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }
    onReply(comment.id, comment.profile?.nickname || '匿名用户');
  };

  return (
    <div className="py-3">
      <div className="flex gap-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={comment.profile?.avatar_url || ''} />
          <AvatarFallback className="bg-muted">
            <User className="w-4 h-4 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-foreground truncate">
              {comment.profile?.nickname || '匿名用户'}
            </span>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {formatDistanceToNow(new Date(comment.created_at), { 
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
                <AvatarImage src={reply.profile?.avatar_url || ''} />
                <AvatarFallback className="bg-muted text-xs">
                  <User className="w-3 h-3 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium text-foreground truncate">
                    {reply.profile?.nickname || '匿名用户'}
                  </span>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatDistanceToNow(new Date(reply.created_at), { 
                      addSuffix: true, 
                      locale: zhCN 
                    })}
                  </span>
                </div>
                <p className="text-xs text-foreground/90 break-words">{reply.content}</p>
                <div className="flex items-center gap-3 mt-1">
                  <button 
                    onClick={() => {
                      if (!isLoggedIn) {
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
  const { comments, loading, addComment, toggleLike } = useComments(audioId);
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<{ id: string; nickname: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      onLoginRequired();
      return;
    }

    const content = newComment.trim();
    if (!content) {
      toast.error('请输入评论内容');
      return;
    }

    setSubmitting(true);
    const { error } = await addComment(content, replyTo?.id);
    setSubmitting(false);

    if (error) {
      toast.error('发送失败，请重试');
    } else {
      setNewComment('');
      setReplyTo(null);
      toast.success('评论成功');
    }
  };

  const handleReply = (commentId: string, nickname: string) => {
    setReplyTo({ id: commentId, nickname });
  };

  const handleLike = async (commentId: string) => {
    const { error } = await toggleLike(commentId);
    if (error) {
      toast.error(error.message);
    }
  };

  const cancelReply = () => {
    setReplyTo(null);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 pt-4 pb-2 border-b">
            <SheetTitle className="text-center text-base">
              {comments.length} 条评论
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
                    isLoggedIn={!!user}
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
                placeholder={user ? "说点什么..." : "登录后发表评论"}
                className="min-h-[40px] max-h-[100px] resize-none rounded-2xl bg-muted/50 border-0 focus-visible:ring-1"
                rows={1}
                disabled={!user}
              />
              <Button
                size="icon"
                onClick={handleSubmit}
                disabled={submitting || !newComment.trim() || !user}
                className="rounded-full h-10 w-10 flex-shrink-0"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            {!user && (
              <button 
                onClick={onLoginRequired}
                className="w-full text-center text-xs text-primary mt-2 hover:underline"
              >
                点击登录
              </button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
