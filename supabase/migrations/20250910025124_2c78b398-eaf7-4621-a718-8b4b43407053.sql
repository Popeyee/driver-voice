-- Create storage bucket for story media uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('story-media', 'story-media', false);

-- Create RLS policies for story media uploads
CREATE POLICY "Users can upload their own story media" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'story-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own story media" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'story-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own story media" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'story-media' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create stories table to store story data
CREATE TABLE public.stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  media_files TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Create policies for stories
CREATE POLICY "Users can view their own stories" 
ON public.stories 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own stories" 
ON public.stories 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stories" 
ON public.stories 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Published stories are viewable by everyone
CREATE POLICY "Published stories are viewable by everyone" 
ON public.stories 
FOR SELECT 
USING (status = 'published');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_stories_updated_at
BEFORE UPDATE ON public.stories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();