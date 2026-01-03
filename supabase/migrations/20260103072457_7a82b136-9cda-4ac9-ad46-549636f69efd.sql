-- Create audios table
CREATE TABLE public.audios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  author_id TEXT NOT NULL,
  avatar TEXT,
  duration TEXT NOT NULL,
  category TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  description TEXT,
  audio_url TEXT,
  ipfs_cid TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.audios ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (everyone can listen)
CREATE POLICY "Anyone can view audios" 
ON public.audios 
FOR SELECT 
USING (true);

-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public)
VALUES ('audios', 'audios', true);

-- Create storage policies for audio files
CREATE POLICY "Anyone can view audio files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'audios');

CREATE POLICY "Authenticated users can upload audio files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'audios');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_audios_updated_at
BEFORE UPDATE ON public.audios
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();