import { motion } from "motion/react";
import { ShieldCheck, Lock, Eye, BadgeCheck } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function SecuritySection() {
  const { language, t } = useLanguage();

  const points = [t('security.item1'), t('security.item2'), t('security.item3')];
  const stats = [
    { value: t('security.stat1.value'), label: t('security.stat1.label') },
    { value: t('security.stat2.value'), label: t('security.stat2.label') },
    { value: t('security.stat3.value'), label: t('security.stat3.label') },
  ];

  return (
    <section id="security" className="py-28 px-6 relative overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[420px] h-[420px] bg-emerald-500/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 right-0 w-[460px] h-[460px] bg-cyan-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/25">
            <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span className={`text-emerald-300 text-sm font-medium ${language === 'ar' ? 'font-cairo-body' : ''}`}>
              {t('security.badge')}
            </span>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold text-white leading-tight ${language === 'ar' ? 'font-cairo-display' : ''}`}>
            {t('security.title.part1')} {" "}
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent inline-block pb-1">
              {t('security.title.highlight')}
            </span>
          </h2>

          <p className={`text-lg text-gray-300 leading-relaxed ${language === 'ar' ? 'font-cairo-body' : ''}`}>
            {t('security.description')}
          </p>

          <div className="space-y-3 pt-2">
            {points.map((point, index) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <BadgeCheck className="w-5 h-5 mt-0.5 text-cyan-300 shrink-0" aria-hidden="true" />
                <span className={`text-gray-200 ${language === 'ar' ? 'font-cairo-body' : ''}`}>{point}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-cyan-500/30 to-blue-500/30 blur-2xl rounded-3xl" />
          <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-[#131b34] via-[#0d1327] to-[#0a1020] p-8 md:p-10 shadow-2xl shadow-black/40">
            <div className="grid grid-cols-3 gap-3 mb-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className="rounded-xl bg-white/5 border border-white/10 px-3 py-4 text-center"
                >
                  <div className="text-xl md:text-2xl font-bold text-emerald-300 mb-1" dir="ltr">{stat.value}</div>
                  <div className={`text-xs text-gray-400 ${language === 'ar' ? 'font-cairo-body' : ''}`}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/10 p-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-300" aria-hidden="true" />
                  <span className={`text-gray-200 text-sm ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                    {language === 'ar' ? 'طبقة تشفير متعددة للمؤسسة' : 'Multi-layer enterprise encryption'}
                  </span>
                </div>
                <span className="text-emerald-300 text-xs">{language === 'ar' ? 'مفعل' : 'Active'}</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/10 p-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-300" aria-hidden="true" />
                  <span className={`text-gray-200 text-sm ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                    {language === 'ar' ? 'مراقبة تشغيلية لحظية للأنشطة' : 'Real-time operational monitoring'}
                  </span>
                </div>
                <span className="text-emerald-300 text-xs">{language === 'ar' ? 'مباشر' : 'Live'}</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/10 p-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-300" aria-hidden="true" />
                  <span className={`text-gray-200 text-sm ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                    {language === 'ar' ? 'امتثال جاهز للتدقيق الداخلي والخارجي' : 'Internal and external audit-ready compliance'}
                  </span>
                </div>
                <span className="text-emerald-300 text-xs">{language === 'ar' ? 'جاهز' : 'Ready'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
