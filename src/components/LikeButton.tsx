import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  storyId: string;
  initialLikes: number;
  size?: 'sm' | 'default' | 'lg';
  onChange?: (liked: boolean, likes: number) => void;
}

export const LikeButton = ({ storyId, initialLikes, size = 'sm', onChange }: LikeButtonProps) => {
  const storageKey = 'likedStories';
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const list: string[] = raw ? JSON.parse(raw) : [];
      const isLiked = list.includes(storyId);
      setLiked(isLiked);
    } catch {}
  }, [storyId]);

  useEffect(() => {
    setLikes(initialLikes);
  }, [initialLikes]);

  const handleToggle = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      const list: string[] = raw ? JSON.parse(raw) : [];
      let next: string[];
      let nextLikes = likes;
      let nextLiked = liked;

      if (liked) {
        next = list.filter((id) => id !== storyId);
        nextLikes = Math.max(0, likes - 1);
        nextLiked = false;
      } else {
        next = [...new Set([...list, storyId])];
        nextLikes = likes + 1;
        nextLiked = true;
      }

      localStorage.setItem(storageKey, JSON.stringify(next));
      setLikes(nextLikes);
      setLiked(nextLiked);
      onChange?.(nextLiked, nextLikes);
    } catch {
      // no-op
    }
  };

  const iconClasses = useMemo(() => (liked ? 'text-primary fill-primary' : 'text-foreground/70'), [liked]);

  return (
    <Button variant="ghost" size={size} aria-pressed={liked} aria-label={liked ? 'Unlike story' : 'Like story'} onClick={handleToggle} className="gap-1">
      <Heart className={iconClasses} />
      <span className="text-sm tabular-nums">{likes}</span>
    </Button>
  );
};

export default LikeButton;
