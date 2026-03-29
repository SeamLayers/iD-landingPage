import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export function LogoMarquee() {
  const { language, t } = useLanguage();

  const logos = language === 'ar'
    ? [
        'مجموعة النخبة',
        'شركة تمكين',
        'التحول الوطنية',
        'حلول أعمال الرياض',
        'مؤسسة آفاق',
        'شركة نمو',
        'مراكز أعمال جدة',
        'مجموعة الابتكار',
        'تمويل بلس',
        'منظومات الشرق',
      ]
    : [
        'Elite Group',
        'Tamkeen Co.',
        'National Digital Shift',
        'Riyadh Business Solutions',
        'Afaq Holdings',
        'Nomo Enterprises',
        'Jeddah Business Centers',
        'Innovation Group',
        'Finance Plus',
        'East Systems',
      ];

  return (
    <section id="trusted-companies" className="py-16 sm:py-20 border-y border-white/5 bg-gradient-to-b from-[#0a0e27] via-[#0f1320] to-[#0a0e27] relative overflow-hidden scroll-mt-28">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-center text-gray-500 text-sm uppercase tracking-[0.2em] font-medium ${language === 'ar' ? 'font-cairo-body' : ''}`}
        >
          {t('marquee.title')}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`text-center text-sm sm:text-base text-gray-400 mt-3 sm:mt-4 max-w-3xl mx-auto ${language === 'ar' ? 'font-cairo-body' : ''}`}
        >
          {t('marquee.vision')}
        </motion.p>
      </div>

      <div className="relative group/marquee">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-[#0f1320] via-[#0f1320]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-[#0f1320] via-[#0f1320]/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee Container - Pauses on Hover */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 28,
                ease: "linear",
              },
            }}
            style={{ willChange: 'transform' }}
            className="flex w-max gap-6 sm:gap-20 pe-6 sm:pe-20 group-hover/marquee:[animation-play-state:paused]"
          >
            {/* First Set */}
            {logos.map((logo, index) => (
              <div
                key={`logo-1-${index}`}
                className="relative flex items-center justify-center min-w-[140px] sm:min-w-[180px] h-14 sm:h-20 rounded-xl sm:rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-all duration-500 cursor-pointer group/logo"
              >
                <span className="text-sm sm:text-2xl font-bold text-white/30 group-hover/logo:text-white/80 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]">{logo}</span>
              </div>
            ))}
            {/* Duplicate for Seamless Loop */}
            {logos.map((logo, index) => (
              <div
                key={`logo-2-${index}`}
                className="relative flex items-center justify-center min-w-[140px] sm:min-w-[180px] h-14 sm:h-20 rounded-xl sm:rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-all duration-500 cursor-pointer group/logo"
              >
                <span className="text-sm sm:text-2xl font-bold text-white/30 group-hover/logo:text-white/80 transition-all duration-500 group-hover/logo:scale-110 group-hover/logo:drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]">{logo}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
