import { motion } from "motion/react";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function FinalCTA() {
  const { language, t } = useLanguage();

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]"
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
          }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Glow Border Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-[#1a1f3a] via-[#2d3452] to-[#1a1f3a] rounded-3xl border border-white/10 p-12 md:p-16 text-center overflow-hidden group/card hover:border-white/20 transition-all duration-700 shadow-2xl shadow-black/40">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-10 left-10 w-20 h-20 border border-cyan-500/20 rounded-full" />
              <div className="absolute bottom-10 right-10 w-32 h-32 border border-blue-500/20 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className={`text-cyan-400 text-sm font-medium ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                  {t('cta.badge')}
                </span>
              </motion.div>

              {/* Headline */}
              <div className="space-y-4">
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight ${language === 'ar' ? 'font-cairo-display' : ''}`}>
                  {t('cta.title.part1')}
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent pb-2 inline-block">
                    {t('cta.title.highlight')}
                  </span>
                </h2>
                <p className={`text-xl text-gray-400 max-w-2xl mx-auto ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                  {t('cta.description')}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto py-8">
                {[
                  { value: t('cta.stat1.value'), label: t('cta.stat1.label') },
                  { value: t('cta.stat2.value'), label: t('cta.stat2.label') },
                  { value: t('cta.stat3.value'), label: t('cta.stat3.label') },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1" dir="ltr">
                      {stat.value}
                    </div>
                    <div className={`text-sm text-gray-400 ${language === 'ar' ? 'font-cairo-body' : ''}`}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 50px rgba(6, 182, 212, 0.6)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all overflow-hidden ${language === 'ar' ? 'font-cairo-body' : ''}`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t('cta.btn.primary')}
                    <ArrowRight className={`w-5 h-5 group-hover:${language === 'ar' ? '-translate-x-1' : 'translate-x-1'} transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(6, 182, 212, 0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold backdrop-blur-sm flex items-center gap-2 ${language === 'ar' ? 'font-cairo-body' : ''}`}
                  style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <MessageSquare className="w-5 h-5 shrink-0" />
                  {t('cta.btn.secondary')}
                </motion.button>
              </div>

              {/* Trust Badge */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className={`text-sm text-gray-500 pt-4 ${language === 'ar' ? 'font-cairo-body' : ''}`}
              >
                {t('cta.trust')}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}