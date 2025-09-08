import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Eye, Send, Image, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "Unfair Pay",
  "Deactivation",
  "Safety Issues",
  "Customer Abuse",
  "Other",
];

export const StoryForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    story: "",
    category: "",
    mediaFiles: [] as File[],
  });
  const [isPreview, setIsPreview] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.story || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Story Submitted Successfully!",
      description:
        "Your story has been submitted for review. You'll receive an email when it's published.",
    });

    setFormData({
      title: "",
      story: "",
      category: "",
      mediaFiles: [],
    });
    setIsPreview(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...files],
    }));
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter((_, i) => i !== index),
    }));
  };

  if (isPreview) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl mx-auto p-4 sm:p-6"
      >
        <Card className="p-6 sm:p-8 bg-card border border-border">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {formData.category}
              </span>
              <span className="text-sm text-muted-foreground">
                Preview Mode
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 break-words">
              {formData.title}
            </h1>
            <div className="prose prose-sm sm:prose-lg text-muted-foreground leading-relaxed whitespace-pre-wrap break-words">
              {formData.story}
            </div>

            {formData.mediaFiles.length > 0 && (
              <div className="mt-6 overflow-x-auto">
                <h3 className="text-lg font-semibold mb-3">Attached Media</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.mediaFiles.map((file, index) => (
                    <div
                      key={index}
                      className="p-3 sm:p-4 bg-muted rounded-lg flex items-center gap-2 overflow-hidden"
                    >
                      {file.type.startsWith("image/") ? (
                        <Image className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <Video className="w-5 h-5 text-primary flex-shrink-0" />
                      )}
                      <span className="truncate">{file.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={() => setIsPreview(false)}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Edit Story
            </Button>
            <Button onClick={handleSubmit} className="w-full sm:w-auto">
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
      className="w-full max-w-xl mx-auto p-4 sm:p-6"
    >
      <Card className="p-6 sm:p-8 bg-card border border-border">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Share Your Story
          </h1>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            Your experience matters. Sharing your story helps create
            transparency and drive positive change.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Story Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Give your story a descriptive title..."
              className="text-sm sm:text-base w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
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
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, story: e.target.value }))
              }
              placeholder="Tell us about your experience..."
              className="min-h-[150px] sm:min-h-[200px] w-full"
            />
          </div>

          <div className="space-y-4">
            <Label>Supporting Media (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center">
              <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-3 text-sm sm:text-base">
                Upload images or videos supporting your story.
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
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Choose Files
                </Button>
              </Label>
            </div>

            {formData.mediaFiles.length > 0 && (
              <div className="space-y-2 overflow-x-auto">
                <h4 className="font-medium text-sm sm:text-base">
                  Uploaded Files:
                </h4>
                {formData.mediaFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 sm:p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-2 truncate">
                      {file.type.startsWith("image/") ? (
                        <Image className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      ) : (
                        <Video className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      )}
                      <span className="truncate text-sm sm:text-base">
                        {file.name}
                      </span>
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

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPreview(true)}
              disabled={
                !formData.title || !formData.story || !formData.category
              }
              className="w-full sm:w-auto"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Story
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              <Send className="w-4 h-4 mr-2" />
              Submit Story
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};
