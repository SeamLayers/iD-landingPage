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
    <section className="py-16 border-y border-white/5 bg-[#0f1320] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-center text-gray-500 text-sm uppercase tracking-wider ${language === 'ar' ? 'font-cairo-body' : ''}`}
        >
          {t('marquee.title')}
        </motion.p>
      </div>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0f1320] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0f1320] to-transparent z-10 pointer-events-none" />

        {/* Marquee Container */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{ willChange: 'transform' }}
            className="flex gap-16 pr-16"
          >
            {/* First Set */}
            {logos.map((logo, index) => (
              <div
                key={`logo-1-${index}`}
                className="flex items-center justify-center min-w-[160px] h-16 grayscale opacity-40 hover:opacity-70 hover:grayscale-0 transition-all duration-300"
              >
                <span className="text-2xl font-bold text-white">{logo}</span>
              </div>
            ))}
            {/* Duplicate for Seamless Loop */}
            {logos.map((logo, index) => (
              <div
                key={`logo-2-${index}`}
                className="flex items-center justify-center min-w-[160px] h-16 grayscale opacity-40 hover:opacity-70 hover:grayscale-0 transition-all duration-300"
              >
                <span className="text-2xl font-bold text-white">{logo}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
