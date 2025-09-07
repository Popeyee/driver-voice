import { motion } from "framer-motion";
import { StoryCard } from "./StoryCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Mock data for sample stories
const mockStories = [
  {
    id: "1",
    title: "Deactivated Without Warning After 3 Years of Perfect Service",
    excerpt: "After maintaining a 4.9 rating for three years, I was suddenly deactivated due to a false accusation. The appeals process was a nightmare, and I lost my primary income overnight with no explanation or recourse.",
    category: "Deactivation",
    timeAgo: "3 days ago",
    readTime: "4 min read",
    views: 1247
  },
  {
    id: "2", 
    title: "Fare Cuts Made It Impossible to Cover Gas and Car Payments",
    excerpt: "The latest fare reduction means I'm earning less than minimum wage after expenses. I used to make enough to support my family, but now I'm working 12-hour days just to break even. This isn't sustainable.",
    category: "Unfair Pay",
    timeAgo: "1 week ago",
    readTime: "3 min read",
    views: 892
  },
  {
    id: "3",
    title: "Passenger Threatened Me, But Support Blamed Me for 'Escalating'",
    excerpt: "A passenger became aggressive and threatening when I couldn't wait for their friend. When I reported it to support, they said I should have handled it better and warned me about future complaints. I fear for my safety daily.",
    category: "Safety Issues",
    timeAgo: "5 days ago", 
    readTime: "5 min read",
    views: 1056
  }
];

export const StoriesSection = () => {
  return (
    <section id="stories" className="py-24 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Real Stories, Real Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every story shared here represents a real driver's experience. Together, these voices create 
            a powerful narrative that demands attention and drives change.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockStories.map((story, index) => (
            <StoryCard
              key={story.id}
              {...story}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Button variant="outline" size="lg" className="text-lg px-8 py-4">
            View All Stories
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};