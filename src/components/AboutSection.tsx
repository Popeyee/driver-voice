import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Target, Heart, Scale, TrendingUp } from "lucide-react";

const stats = [
  { label: "Stories Shared", value: "1,200+", icon: Heart },
  { label: "Drivers Reached", value: "15,000+", icon: Target },
  { label: "Policy Changes", value: "8", icon: Scale },
  { label: "Platform Improvements", value: "23", icon: TrendingUp },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
              Building a Fairer
              <span className="text-primary block">Gig Economy</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Driver Voices was created by drivers, for drivers. We believe that transparency 
                and collective action are the keys to creating meaningful change in the rideshare industry.
              </p>
              
              <p>
                Every story shared here serves multiple purposes: it provides emotional support 
                to drivers who have faced similar challenges, creates accountability for platform 
                decisions, and builds a comprehensive database of experiences that researchers, 
                policymakers, and advocates can use to drive systemic improvements.
              </p>
              
              <p>
                Your voice has power. When drivers speak up together, platforms listen, 
                policies change, and working conditions improve for everyone.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="p-6 text-center bg-card hover:bg-card-elevated transition-all duration-300 border border-border hover:border-primary/20">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};