import { Smartphone, TrendingUp, Users, Settings } from "lucide-react";
import { motion } from "motion/react";
import { Feature } from "../types";

export const getFeatures = (t: (key: string) => string, language: string): Feature[] => [
  {
    title: t('features.f1.title'),
    description: t('features.f1.desc'),
    icon: Smartphone,
    gradient: "from-cyan-500/20 to-blue-500/20",
    borderGradient: "from-cyan-500/50 to-blue-500/50",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-24 h-36 sm:w-32 sm:h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center relative"
        >
          <div className="w-24 h-24 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="w-16 h-16 rounded-full bg-cyan-400"
            />
          </div>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 2, 2.5],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
              }}
              className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-cyan-400"
            />
          ))}
        </motion.div>
      </div>
    ),
  },
  {
    title: t('features.f2.title'),
    description: t('features.f2.desc'),
    icon: TrendingUp,
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderGradient: "from-emerald-500/50 to-teal-500/50",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center p-6">
        <div className="space-y-2 w-full">
          {[
            { name: language === 'ar' ? "عملاء جدد" : "New Leads", value: 24, color: "cyan" },
            { name: language === 'ar' ? "قيد المتابعة" : "In Progress", value: 18, color: "blue" },
            { name: language === 'ar' ? "صفقات مغلقة" : "Closed Won", value: 12, color: "emerald" },
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">{item.name}</span>
                <span className="text-sm font-semibold text-white">
                  {item.value}
                </span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden" dir="ltr">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(item.value / 24) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.15 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`h-full rounded-full ${
                    item.color === 'cyan' 
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-600 shadow-[0_0_8px_rgba(6,182,212,0.5)]'
                      : item.color === 'blue'
                      ? 'bg-gradient-to-r from-blue-400 to-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                      : 'bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                  }`}
                  style={{ willChange: 'width' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: t('features.f3.title'),
    description: t('features.f3.desc'),
    icon: Users,
    gradient: "from-purple-500/20 to-pink-500/20",
    borderGradient: "from-purple-500/50 to-pink-500/50",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center p-6">
        <div className="relative">
          {[
            { name: "AM", color: "bg-cyan-500", x: 0, y: 0 },
            { name: "JD", color: "bg-purple-500", x: 30, y: 10 },
            { name: "SK", color: "bg-pink-500", x: 15, y: 35 },
            { name: "TC", color: "bg-blue-500", x: 45, y: 30 },
          ].map((avatar, i) => (
            <motion.div
              key={avatar.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.2, zIndex: 10, boxShadow: "0 0 20px rgba(6,182,212,0.4)" }}
              className={`absolute w-16 h-16 rounded-full ${avatar.color} flex items-center justify-center text-white font-bold border-4 border-[#1a1f3a] shadow-lg cursor-pointer transition-shadow duration-300`}
              style={{ left: `${avatar.x}px`, top: `${avatar.y}px` }}
            >
              {avatar.name}
            </motion.div>
          ))}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
            <motion.line
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              x1="32"
              y1="32"
              x2="62"
              y2="42"
              stroke="rgba(6,182,212,0.3)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
        </div>
      </div>
    ),
  },
  {
    title: t('features.f4.title'),
    description: t('features.f4.desc'),
    icon: Settings,
    gradient: "from-orange-500/20 to-red-500/20",
    borderGradient: "from-orange-500/50 to-red-500/50",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center p-6">
        <div className="grid grid-cols-2 gap-3 w-full">
          {[
            { label: language === 'ar' ? "مستخدمون نشطون" : "Active Users", value: language === 'ar' ? "١٬٢٤٨" : "1,248" },
            { label: language === 'ar' ? "فرق العمل" : "Teams", value: "42" },
            { label: language === 'ar' ? "بطاقات مصدرة" : "Cards Issued", value: language === 'ar' ? "٣٬٥٦٧" : "3,567" },
            { label: language === 'ar' ? "تكاملات" : "Integrations", value: "18" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.08, borderColor: "rgba(6,182,212,0.4)" }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center cursor-pointer hover:bg-white/[0.08] hover:shadow-[0_4px_20px_rgba(6,182,212,0.1)] transition-all duration-300"
            >
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
];
