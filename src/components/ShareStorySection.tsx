import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Shield, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: Plus,
    title: "Share Your Story",
    description: "Tell us about your experience with unfair treatment. All submissions are anonymous."
  },
  {
    icon: Shield,
    title: "Review Process",
    description: "Our team reviews submissions to ensure authenticity and remove any identifying information."
  },
  {
    icon: CheckCircle,
    title: "Published",
    description: "Your story joins thousands of others, creating a powerful voice for change."
  }
];

export const ShareStorySection = () => {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Join thousands of drivers who have found their voice. Your experience matters, 
            and sharing it can help create positive change for the entire community.
          </p>
          <Button size="lg" className="text-lg px-8 py-4" asChild>
            <Link to="/share-story">
              <Plus className="w-5 h-5 mr-2" />
              Start Sharing
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="p-8 text-center bg-card border border-border hover:border-primary/20 transition-all duration-300 h-full">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            Stories are typically reviewed and published within 24-48 hours
          </div>
        </motion.div>
      </div>
    </section>
  );
};