import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { mockStories } from '@/mock/stories';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Clock, ArrowLeft } from 'lucide-react';
import LikeButton from '@/components/LikeButton';
import CommentSection from '@/components/CommentSection';
import { setSEO } from '@/lib/seo';

const readTime = (text: string) => `${Math.max(1, Math.round(text.split(/\s+/).length / 200))} min read`;
const timeAgo = (iso: string) => {
  const diff = Date.now() - +new Date(iso);
  const hours = Math.round(diff / (1000 * 60 * 60));
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
};

const Story = () => {
  const { id } = useParams();
  const story = useMemo(() => mockStories.find((s) => s.id === id), [id]);

  useEffect(() => {
    if (story) {
      setSEO({ title: `${story.title} | Driver Voices`, description: story.excerpt, canonical: window.location.href });
    }
  }, [story]);

  if (!story) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container">
            <Card className="p-8 bg-card border border-border">
              <p className="text-foreground mb-6">Story not found.</p>
              <Link to="/stories" className="text-primary story-link">← Back to stories</Link>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container max-w-3xl">
          <Link to="/stories" className="inline-flex items-center text-primary mb-6 story-link"><ArrowLeft className="mr-2" /> Back</Link>

          <header className="mb-6">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 mb-3">{story.category}</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{story.title}</h1>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {readTime(story.content)}</div>
                <span>{timeAgo(story.createdAt)}</span>
              </div>
              <LikeButton storyId={story.id} initialLikes={story.likes} size="default" />
            </div>
          </header>

          <article className="prose prose-invert max-w-none prose-p:leading-relaxed text-foreground">
            <p className="text-lg leading-8">{story.content}</p>
          </article>

          <CommentSection
            storyId={story.id}
            approvedComments={story.comments.filter((c) => c.status === 'approved').map((c) => ({ id: c.id, author: c.author, text: c.text, createdAt: c.createdAt }))}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Story;
