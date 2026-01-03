import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface AudioItem {
  id: string;
  title: string;
  author: string;
  authorId: string;
  avatar: string;
  duration: string;
  category: string;
  likes: number;
  comments: number;
  description?: string;
  audioUrl?: string;
  ipfsCid?: string;
  createdAt?: string;
}

const fetchAudios = async (): Promise<AudioItem[]> => {
  const { data, error } = await supabase
    .from("audios")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching audios:", error);
    throw error;
  }

  return (data || []).map((audio) => ({
    id: audio.id,
    title: audio.title,
    author: audio.author,
    authorId: audio.author_id,
    avatar: audio.avatar || "",
    duration: audio.duration,
    category: audio.category,
    likes: audio.likes || 0,
    comments: audio.comments || 0,
    description: audio.description,
    audioUrl: audio.audio_url,
    ipfsCid: audio.ipfs_cid,
    createdAt: audio.created_at,
  }));
};

export const useAudios = () => {
  return useQuery({
    queryKey: ["audios"],
    queryFn: fetchAudios,
  });
};

export const useAudiosByCategory = (category: string) => {
  const { data: audios, ...rest } = useAudios();
  
  const filteredAudios = category === "全部" 
    ? audios 
    : audios?.filter(audio => audio.category === category);
  
  return { data: filteredAudios, ...rest };
};
