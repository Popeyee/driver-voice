import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Eye, Send, Image, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "Unfair Pay",
  "Deactivation", 
  "Safety Issues",
  "Customer Abuse",
  "Other"
];

export const StoryForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    story: "",
    category: "",
    mediaFiles: [] as File[]
  });
  const [isPreview, setIsPreview] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.story || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    toast({
      title: "Story Submitted Successfully!",
      description: "Your story has been submitted for review. You'll receive an email when it's published.",
    });

    // Reset form
    setFormData({
      title: "",
      story: "",
      category: "",
      mediaFiles: []
    });
    setIsPreview(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter((_, i) => i !== index)
    }));
  };

  if (isPreview) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-6"
      >
        <Card className="p-8 bg-card border border-border">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {formData.category}
              </span>
              <span className="text-sm text-muted-foreground">Preview Mode</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">{formData.title}</h1>
            <div className="prose prose-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {formData.story}
            </div>
            
            {formData.mediaFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Attached Media</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.mediaFiles.map((file, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center text-sm">
                        {file.type.startsWith('image/') ? (
                          <Image className="w-4 h-4 mr-2 text-primary" />
                        ) : (
                          <Video className="w-4 h-4 mr-2 text-primary" />
                        )}
                        <span className="truncate">{file.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-4">
            <Button onClick={() => setIsPreview(false)} variant="outline">
              Edit Story
            </Button>
            <Button onClick={handleSubmit}>
              <Send className="w-4 h-4 mr-2" />
              Submit Story
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <Card className="p-8 bg-card border border-border">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Share Your Story</h1>
          <p className="text-muted-foreground leading-relaxed">
            Your experience matters. By sharing your story, you're helping to create transparency 
            and drive positive change in the rideshare industry. All submissions are reviewed 
            for authenticity and published anonymously.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="title">Story Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Give your story a descriptive title..."
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category that best describes your experience" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="story">Your Story *</Label>
            <Textarea
              id="story"
              value={formData.story}
              onChange={(e) => setFormData(prev => ({ ...prev, story: e.target.value }))}
              placeholder="Tell us about your experience in detail. What happened? How did it affect you? What would you like to see change?"
              className="min-h-[200px] leading-relaxed"
            />
          </div>

          <div className="space-y-4">
            <Label>Supporting Media (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Upload images or videos that support your story (screenshots, photos, etc.)
              </p>
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="media-upload"
              />
              <Label htmlFor="media-upload" className="cursor-pointer">
                <Button type="button" variant="outline" asChild>
                  <span>Choose Files</span>
                </Button>
              </Label>
            </div>
            
            {formData.mediaFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Uploaded Files:</h4>
                {formData.mediaFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center">
                      {file.type.startsWith('image/') ? (
                        <Image className="w-4 h-4 mr-2 text-primary" />
                      ) : (
                        <Video className="w-4 h-4 mr-2 text-primary" />
                      )}
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsPreview(true)}
              disabled={!formData.title || !formData.story || !formData.category}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Story
            </Button>
            <Button type="submit">
              <Send className="w-4 h-4 mr-2" />
              Submit Story
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};