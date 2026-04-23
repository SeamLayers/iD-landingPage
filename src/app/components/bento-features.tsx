import { useMemo } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { Feature } from "../../types";
import { getFeatures } from "../../data/features";
import { cn } from "../../utils/cn";

function FeatureCard({ feature, index, language }: { feature: Feature; index: number; language: string }) {
  const Icon = feature.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      className={cn("relative group", index === 0 ? "md:col-span-2" : "")}
    >
      {/* Glow Effect */}
      <div
        className={cn(
          "absolute -inset-1 bg-gradient-to-br rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none",
          feature.gradient
        )}
      />

      {/* Card */}
      <div className="relative h-full bg-gradient-to-br from-[#1a1f3a]/80 to-[#0f1320] rounded-3xl border border-white/[0.08] group-hover:border-white/20 transition-all duration-700 overflow-hidden shadow-xl shadow-black/30 group-hover:shadow-2xl group-hover:shadow-cyan-900/20">
        {/* Interactive spotlight */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.08), transparent 40%)`
          }}
        />

        {/* Border Glow */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-15 transition-opacity duration-700 rounded-3xl pointer-events-none",
            feature.borderGradient
          )}
        />

        <div className={cn("relative p-5 sm:p-8", index === 0 ? "grid md:grid-cols-2 gap-6 sm:gap-8 items-center" : "")}>
          {/* Content */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center shadow-inner group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-shadow duration-500"
            >
              <Icon className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            </motion.div>
            <h3 className={cn("text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-50 transition-colors duration-300", language === 'ar' && 'font-cairo-display')}>
              {feature.title}
            </h3>
            <p className={cn("text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300", language === 'ar' && 'font-cairo-body')}>
              {feature.description}
            </p>
          </div>

          {/* Visual */}
          <div className={cn(index === 0 ? "" : "mt-6 sm:mt-8", "h-40 sm:h-48")}>
            {feature.visual}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function BentoFeatures() {
  const { language, t } = useLanguage();

  const features = useMemo(() => getFeatures(t, language), [t, language]);

  return (
    <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden scroll-mt-28">
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm mb-6 shadow-lg shadow-cyan-900/10"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className={cn("text-cyan-400 text-sm font-medium", language === 'ar' && 'font-cairo-body')}>
              {t('features.badge')}
            </span>
          </motion.div>
          <h2 className={cn("text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6", language === 'ar' && 'font-cairo-display')}>
            {t('features.title.part1')}{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent inline-block pb-1">
              {t('features.title.highlight')}
            </span>
          </h2>
           <p className={cn("text-base sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed", language === 'ar' && 'font-cairo-body')}>
             {t('features.description')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
}
