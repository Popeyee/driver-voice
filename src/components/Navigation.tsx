import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Plus, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

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
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <div className="flex items-center space-x-8">
          <Link to="/stories" className="text-muted-foreground hover:text-foreground transition-colors">
            Stories
          </Link>
          <Link to="/#about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          {user ? (
            <>
              <Button size="sm" asChild>
                <Link to="/share-story">
                  <Plus className="w-4 h-4 mr-2" />
                  Share Story
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/auth">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/share-story">
                  <Plus className="w-4 h-4 mr-2" />
                  Share Story
                </Link>
              </Button>
            </>
          )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-muted-foreground hover:text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

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
                {user ? (
                  <>
                    <Button size="sm" asChild>
                      <Link to="/share-story" onClick={() => setIsOpen(false)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Share Story
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => { signOut(); setIsOpen(false); }}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/auth" onClick={() => setIsOpen(false)}>
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to="/share-story" onClick={() => setIsOpen(false)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Share Story
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};