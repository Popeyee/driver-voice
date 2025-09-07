import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Shield,
    title: "Anonymous & Safe",
    description: "Share your story safely with complete anonymity protection",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Connect with fellow drivers and build a stronger community",
  },
  {
    icon: Megaphone,
    title: "Make Change",
    description: "Your voice can drive real policy and platform improvements",
  },
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50" />

      {/* Content */}
      <div className="relative z-10 container py-32 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold text-black mb-8 tracking-tight"
          >
            Your Voice
            <span className="text-primary block">Matters</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-black mb-12 leading-relaxed drop-shadow-md"
          >
            A platform for rideshare drivers to share their experiences with
            unfair treatment, creating transparency and driving positive change
            in the gig economy.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button size="lg" className="text-lg px-8 py-4" asChild>
              <Link to="/share-story">
                Share Your Story
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4"
              asChild
            >
              <Link to="#stories">Read Stories</Link>
            </Button>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-primary/70 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-white drop-shadow-md" />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2 drop-shadow-lg ">
                    {feature.title}
                  </h3>
                  <p className="text-black drop-shadow-sm max-w-xs">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
