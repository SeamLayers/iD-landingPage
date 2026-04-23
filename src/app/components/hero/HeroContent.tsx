import { motion } from "motion/react";
import { Sparkles, Zap, Shield } from "lucide-react";
import { slideInVariant } from "../../../utils/animations";

interface HeroContentProps {
  language: string;
  t: (key: string) => string;
}

export function HeroContent({ language, t }: HeroContentProps) {
  return (
    <motion.div
      variants={slideInVariant(language === 'ar' ? 'right' : 'left')}
      initial="initial"
      animate="animate"
      className="space-y-6 sm:space-y-8"
    >
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md shadow-lg shadow-cyan-900/20"
      >
        <Sparkles className="w-4 h-4 text-cyan-400" aria-hidden="true" />
        <span className="text-cyan-400 text-sm font-medium font-cairo-body">
          {t('hero.badge')}
        </span>
      </motion.div>

      {/* Headline */}
      <div className="space-y-4">
        <h1 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.2] ${language === 'ar' ? 'font-cairo-display' : ''}`}>
          {t('hero.title.part1')}{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent inline-block pb-2">
            {t('hero.title.highlight')}
          </span>
        </h1>
        <p className="text-base sm:text-xl text-gray-400 leading-relaxed max-w-xl font-cairo-body">
          {t('hero.description')}
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
        <motion.a
          href="/login"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 40px rgba(6, 182, 212, 0.6)",
          }}
          whileTap={{ scale: 0.98 }}
          className="group relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all overflow-hidden font-cairo-body flex items-center justify-center gap-3 border border-cyan-400/30"
          aria-label={t('hero.cta.primary')}
        >
          <span className="relative z-10">
            {t('hero.cta.primary')}
          </span>
          <Zap className={`w-5 h-5 relative z-10 ${language === 'ar' ? 'rotate-180' : ''}`} aria-hidden="true" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
        </motion.a>
        <motion.a
          href="/login"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 text-white rounded-xl font-semibold border border-white/10 hover:border-white/30 transition-all backdrop-blur-md font-cairo-body shadow-xl shadow-black/20 text-center"
          aria-label={t('hero.cta.secondary')}
        >
          {t('hero.cta.secondary')}
        </motion.a>
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/10">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" aria-hidden="true" />
          <span className="text-sm text-gray-300 font-cairo-body font-medium">
            {t('hero.trust.security')}
          </span>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
             <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
           </div>
          <span className="text-sm text-gray-300 font-cairo-body font-medium">{t('hero.trust.soc2')}</span>
        </div>
      </div>
    </motion.div>
  );
}
