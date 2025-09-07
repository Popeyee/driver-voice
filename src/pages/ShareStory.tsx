import { Navigation } from "@/components/Navigation";
import { StoryForm } from "@/components/StoryForm";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const ShareStory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Share Your Story
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your experience can help drive meaningful change. Share your story anonymously 
              and join a community of drivers advocating for fair treatment.
            </p>
          </motion.div>
          <StoryForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShareStory;