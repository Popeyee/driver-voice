import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthModal } from "./AuthModal";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container flex items-center justify-between py-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2"
        >
          <h1 className="text-2xl font-bold text-foreground">Driver Voices</h1>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/stories" className="text-muted-foreground hover:text-foreground transition-colors">
            Stories
          </Link>
          <Link to="/#about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
          <Button size="sm" asChild>
            <Link to="/share-story">
              <Plus className="w-4 h-4 mr-2" />
              Share Story
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden"
          >
            <div className="container py-4 space-y-4">
              <Link to="/stories" className="block text-muted-foreground hover:text-foreground transition-colors">
                Stories
              </Link>
              <Link to="/#about" className="block text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button size="sm" asChild>
                  <Link to="/share-story">
                    <Plus className="w-4 h-4 mr-2" />
                    Share Story
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </motion.nav>
  );
};