import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

const logos = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Netflix",
  "Tesla",
  "IBM",
  "Oracle",
  "Salesforce",
];

export function LogoMarquee() {
  const { language, t } = useLanguage();

  return (
    <section className="py-20 border-y border-white/5 bg-gradient-to-b from-[#0a0e27] via-[#0f1320] to-[#0a0e27] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-center text-gray-500 text-sm uppercase tracking-[0.2em] font-medium ${language === 'ar' ? 'font-cairo-body' : ''}`}
        >
          {t('marquee.title')}
        </motion.p>
      </div>

      <div className="relative group/marquee">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#0f1320] via-[#0f1320]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#0f1320] via-[#0f1320]/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee Container - Pauses on Hover */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
            style={{ willChange: 'transform' }}
            className="flex gap-20 pr-20 group-hover/marquee:[animation-play-state:paused]"
          >
            {/* First Set */}
            {logos.map((logo, index) => (
              <div
                key={`logo-1-${index}`}
                className="relative flex items-center justify-center min-w-[180px] h-20 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-all duration-500 cursor-pointer group/logo"
              >
                <span className="text-2xl font-bold text-white/30 group-hover/logo:text-white/80 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]">{logo}</span>
              </div>
            ))}
            {/* Duplicate for Seamless Loop */}
            {logos.map((logo, index) => (
              <div
                key={`logo-2-${index}`}
                className="relative flex items-center justify-center min-w-[180px] h-20 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-all duration-500 cursor-pointer group/logo"
              >
                <span className="text-2xl font-bold text-white/30 group-hover/logo:text-white/80 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]">{logo}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
