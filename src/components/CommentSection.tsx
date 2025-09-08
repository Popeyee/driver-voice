import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface CommentItem {
  id: string;
  author: string;
  text: string;
  createdAt: string; // ISO
}

interface CommentSectionProps {
  storyId: string;
  approvedComments: CommentItem[];
}

export const CommentSection = ({ storyId, approvedComments }: CommentSectionProps) => {
  const [text, setText] = useState('');
  const [pending, setPending] = useState<CommentItem | null>(null);

  const sorted = useMemo(
    () => [...approvedComments].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [approvedComments]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    // Simulate moderation flow: set as pending locally
    const pendingComment: CommentItem = {
      id: `${storyId}-pending-${Date.now()}`,
      author: 'You',
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    setPending(pendingComment);
    setText('');
    toast.success('Comment submitted', { description: 'Visible after admin approval.' });
  };

  return (
    <section aria-labelledby="comments-title" className="mt-12">
      <h2 id="comments-title" className="text-2xl font-semibold text-foreground mb-4">
        Comments
      </h2>
      <Card className="p-6 bg-card border border-border">
        <form onSubmit={handleSubmit} className="space-y-4">
          {pending && (
            <div className="text-sm text-muted-foreground bg-muted/30 rounded-md p-3">
              Your comment is pending approval.
            </div>
          )}
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts (visible after admin approval)"
            className="min-h-28"
          />
          <div className="flex justify-end">
            <Button type="submit">Submit Comment</Button>
          </div>
        </form>
        <Separator className="my-6" />
        <div className="space-y-6">
          {sorted.length === 0 ? (
            <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts.</p>
          ) : (
            sorted.map((c) => (
              <div key={c.id} className="space-y-2">
                <div className="text-sm text-muted-foreground">{new Date(c.createdAt).toLocaleString()}</div>
                <p className="text-foreground leading-relaxed">{c.text}</p>
              </div>
            ))
          )}
        </div>
      </Card>
    </section>
  );
};

export default CommentSection;
