import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Eye } from "lucide-react";

interface StoryCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  timeAgo: string;
  readTime: string;
  views?: number;
  index?: number;
}

export const StoryCard = ({ 
  title, 
  excerpt, 
  category, 
  timeAgo, 
  readTime, 
  views = 0,
  index = 0 
}: StoryCardProps) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full p-8 bg-card hover:bg-card-elevated transition-all duration-300 border border-border hover:border-primary/20 hover:shadow-lg cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <Badge 
            variant="secondary" 
            className="text-xs font-medium bg-primary/10 text-primary border-primary/20"
          >
            {category}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Eye className="w-3 h-3 mr-1" />
            {views}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span>Anonymous Driver</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{readTime}</span>
            </div>
            <span>{timeAgo}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};