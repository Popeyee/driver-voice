import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { mockStories, categories, Story } from '@/mock/stories';
import { StoryCard } from '@/components/StoryCard';
import LikeButton from '@/components/LikeButton';
import { setSEO } from '@/lib/seo';

const sortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Most Liked', value: 'liked' },
] as const;

type SortBy = (typeof sortOptions)[number]['value'];

const Stories = () => {
  // Local working copy so likes can update in UI
  const [stories, setStories] = useState<Story[]>(() => [...mockStories]);
  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('latest');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSEO({
      title: 'Approved Driver Stories | Driver Voices',
      description:
        'Browse approved driver stories by category. Filter, search, and discover real experiences from drivers.',
      canonical: window.location.href,
    });
  }, []);

  // Simulate loading for smooth transitions
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [category, search, sortBy]);

  const filtered = useMemo(() => {
    let list = [...stories];

    if (category !== 'all') list = list.filter((s) => s.category === category);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) => s.title.toLowerCase().includes(q) || s.excerpt.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'latest') list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    if (sortBy === 'liked') list.sort((a, b) => b.likes - a.likes);

    return list;
  }, [stories, category, search, sortBy]);

  const updateLikes = (id: string, likes: number) => {
    setStories((prev) => prev.map((s) => (s.id === id ? { ...s, likes } : s)));
  };

  const readTime = (text: string) => `${Math.max(1, Math.round(text.split(/\s+/).length / 200))} min read`;

  const timeAgo = (iso: string) => {
    const diff = Date.now() - +new Date(iso);
    const hours = Math.round(diff / (1000 * 60 * 60));
    if (hours < 24) return `${hours}h ago`;
    const days = Math.round(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-center mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Driver Stories</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Browse approved stories from drivers. Filter by category, search by keywords, and discover most liked.</p>
          </motion.div>

          <Card className="p-4 md:p-6 mb-8 bg-card border border-border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2">
                <label htmlFor="search" className="sr-only">Search stories</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input id="search" placeholder="Search by keyword" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger aria-label="Category filter">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent align="start">
                    <SelectItem value="all">All</SelectItem>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Sort by</label>
                <Select value={sortBy} onValueChange={(v: SortBy) => setSortBy(v)}>
                  <SelectTrigger aria-label="Sort stories">
                    <SelectValue placeholder="Latest" />
                  </SelectTrigger>
                  <SelectContent align="start">
                    {sortOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => { setCategory('all'); setSearch(''); setSortBy('latest'); }}>
                <Filter className="mr-2" /> Reset filters
              </Button>
            </div>
          </Card>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="p-8 bg-card border border-border">
                  <div className="flex items-start justify-between mb-4">
                    <Skeleton className="h-5 w-24 rounded" />
                    <Skeleton className="h-4 w-10 rounded" />
                  </div>
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-6" />
                  <Skeleton className="h-4 w-2/3" />
                </Card>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((s, index) => (
                  <motion.div key={s.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25, delay: index * 0.03 }} className="group">
                    <Link to={`/stories/${s.id}`} className="block">
                      <StoryCard
                        id={s.id}
                        title={s.title}
                        excerpt={s.excerpt}
                        category={s.category}
                        timeAgo={timeAgo(s.createdAt)}
                        readTime={readTime(s.content)}
                        views={0}
                        index={index}
                      />
                    </Link>
                    <div className="mt-3 flex items-center justify-between">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{s.category}</Badge>
                      <LikeButton storyId={s.id} initialLikes={s.likes} onChange={(_, likes) => updateLikes(s.id, likes)} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Stories;
