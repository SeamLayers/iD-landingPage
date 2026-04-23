import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { HeroContent } from "./hero/HeroContent";
import { HeroCard } from "./hero/HeroCard";

export function Hero() {
  const { language, t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-14 sm:pb-20 px-4 sm:px-6">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ willChange: 'transform' }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
          style={{ willChange: 'transform, opacity' }}
          className="absolute top-1/4 -start-1/4 w-1/2 h-1/2 bg-cyan-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
          style={{ willChange: 'transform, opacity' }}
          className="absolute bottom-1/4 -end-1/4 w-1/2 h-1/2 bg-blue-600/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center relative z-10 w-full">
        <HeroContent language={language} t={t} />
        <HeroCard language={language} t={t} />
      </div>
    </section>
  );
}
