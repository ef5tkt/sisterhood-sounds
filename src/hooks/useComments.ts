import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Comment {
  id: string;
  audio_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  likes: number;
  created_at: string;
  profile?: {
    nickname: string | null;
    avatar_url: string | null;
  };
  replies?: Comment[];
  isLiked?: boolean;
}

export function useComments(audioId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchComments = useCallback(async () => {
    if (!audioId) return;
    
    setLoading(true);
    
    // 获取评论
    const { data: commentsData, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .eq('audio_id', audioId)
      .order('created_at', { ascending: false });

    if (commentsError) {
      console.error('Error fetching comments:', commentsError);
      setLoading(false);
      return;
    }

    // 获取用户资料
    const userIds = [...new Set(commentsData?.map(c => c.user_id) || [])];
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('id, nickname, avatar_url')
      .in('id', userIds);

    // 获取当前用户的点赞状态
    let userLikes: string[] = [];
    if (user) {
      const { data: likesData } = await supabase
        .from('comment_likes')
        .select('comment_id')
        .eq('user_id', user.id);
      userLikes = likesData?.map(l => l.comment_id) || [];
    }

    // 组装评论数据
    const profileMap = new Map(profilesData?.map(p => [p.id, p]) || []);
    const commentsWithProfiles = commentsData?.map(comment => ({
      ...comment,
      profile: profileMap.get(comment.user_id) || { nickname: '匿名用户', avatar_url: null },
      isLiked: userLikes.includes(comment.id),
    })) || [];

    // 分离顶级评论和回复
    const topLevelComments = commentsWithProfiles.filter(c => !c.parent_id);
    const replies = commentsWithProfiles.filter(c => c.parent_id);

    // 将回复挂载到对应的评论下
    const commentsWithReplies = topLevelComments.map(comment => ({
      ...comment,
      replies: replies.filter(r => r.parent_id === comment.id).sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      ),
    }));

    setComments(commentsWithReplies);
    setLoading(false);
  }, [audioId, user]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = async (content: string, parentId?: string) => {
    if (!user) return { error: new Error('请先登录') };

    const { error } = await supabase
      .from('comments')
      .insert({
        audio_id: audioId,
        user_id: user.id,
        parent_id: parentId || null,
        content,
      });

    if (!error) {
      await fetchComments();
    }

    return { error };
  };

  const toggleLike = async (commentId: string) => {
    if (!user) return { error: new Error('请先登录') };

    const comment = comments.find(c => c.id === commentId) || 
                   comments.flatMap(c => c.replies || []).find(c => c.id === commentId);
    
    if (!comment) return { error: new Error('评论不存在') };

    if (comment.isLiked) {
      // 取消点赞
      const { error } = await supabase
        .from('comment_likes')
        .delete()
        .eq('comment_id', commentId)
        .eq('user_id', user.id);

      if (!error) {
        // 更新评论的点赞数
        await supabase
          .from('comments')
          .update({ likes: Math.max(0, (comment.likes || 0) - 1) })
          .eq('id', commentId);
        
        await fetchComments();
      }
      return { error };
    } else {
      // 点赞
      const { error } = await supabase
        .from('comment_likes')
        .insert({
          comment_id: commentId,
          user_id: user.id,
        });

      if (!error) {
        // 更新评论的点赞数
        await supabase
          .from('comments')
          .update({ likes: (comment.likes || 0) + 1 })
          .eq('id', commentId);
        
        await fetchComments();
      }
      return { error };
    }
  };

  return {
    comments,
    loading,
    addComment,
    toggleLike,
    refetch: fetchComments,
  };
}
