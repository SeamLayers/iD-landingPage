import { motion } from "motion/react";
import { Phone, Mail, Globe, MapPin, Download, Share2, QrCode } from "lucide-react";
import { ContactDetail, CardAction } from "../../../types";

interface CardBackProps {
  language: string;
  t: (key: string) => string;
  isFlipped: boolean;
}

export function CardBack({ language, t, isFlipped }: CardBackProps) {
  const contactDetails: ContactDetail[] = [
    { icon: Phone, label: "+966 50 123 4567", sublabel: language === 'ar' ? 'الجوال' : 'Mobile', isLtr: true },
    { icon: Mail, label: "fahad@company.sa", sublabel: language === 'ar' ? 'البريد' : 'Email', isLtr: true },
    { icon: Globe, label: "www.company.sa", sublabel: language === 'ar' ? 'الموقع' : 'Website', isLtr: true },
    { icon: MapPin, label: language === 'ar' ? 'الرياض، السعودية' : 'Riyadh, KSA', sublabel: language === 'ar' ? 'المدينة' : 'Location', isLtr: false },
  ];

  const actions: CardAction[] = [
    { icon: Download, label: language === 'ar' ? 'حفظ' : 'Save' },
    { icon: Share2, label: language === 'ar' ? 'مشاركة' : 'Share' },
    { icon: QrCode, label: language === 'ar' ? 'رمز QR' : 'QR Code' },
  ];

  return (
    <div
      className="absolute inset-0 rounded-2xl border border-white/15 overflow-hidden shadow-2xl"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg) translateZ(1px)",
        WebkitTransform: "rotateY(180deg) translateZ(1px)",
        opacity: isFlipped ? 1 : 0,
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#0f142b] to-[#050810] z-0" />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none bg-[url('/noise.svg')]" />

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-cyan-500/8 rounded-full blur-[80px] pointer-events-none" />

      {/* Inner Border */}
      <div className="absolute inset-[1px] rounded-2xl border border-white/[0.08] pointer-events-none z-30" />

      {/* Back Content */}
      <div className="relative z-40 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-5 h-full flex flex-col justify-between" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {/* Profile Header on Back */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <img
            src="/images/profile-avatar.png"
            alt="Profile"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/10 object-cover shadow-lg"
          />
          <div className="flex flex-col text-start flex-1 min-w-0">
            <h4 className="text-white font-bold text-sm tracking-wide font-cairo-display truncate">
              {t('card.name')}
            </h4>
            <span className="text-cyan-400/60 text-[11px] font-cairo-body tracking-wider">
              {t('card.title')}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-emerald-400/70 text-[10px] font-mono">{language === 'ar' ? 'نشط' : 'Active'}</span>
          </div>
        </div>

        {/* Subtle Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        {/* Contact Details - 2x2 Horizontal Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {contactDetails.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={isFlipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.3 }}
              className="flex items-start gap-2.5 group/item cursor-pointer hover:bg-white/[0.03] rounded-lg p-2 -m-1 transition-colors duration-300"
            >
              <div className="w-7 h-7 rounded-md bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover/item:bg-cyan-500/15 group-hover/item:border-cyan-400/25 transition-all duration-300 mt-0.5">
                <item.icon className="w-3 h-3 text-cyan-400/70 group-hover/item:text-cyan-400" />
              </div>
              <div className="flex flex-col text-start min-w-0 flex-1">
                <span
                  dir={item.isLtr ? "ltr" : "rtl"}
                  style={{ unicodeBidi: "plaintext" }}
                  className={`text-white/80 text-[11px] font-medium tracking-wide truncate leading-tight ${item.isLtr ? "text-left font-mono" : "text-right"}`}
                >
                  {item.label}
                </span>
                <span className="text-white/20 text-[9px] uppercase tracking-[0.12em] font-mono mt-0.5">{item.sublabel}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="flex gap-2">
          {actions.map((action, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={isFlipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ delay: 0.55 + i * 0.07, duration: 0.25 }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300 cursor-pointer group/action"
            >
              <action.icon className="w-3 h-3 text-gray-500 group-hover/action:text-cyan-400 transition-colors" />
              <span className="text-[10px] text-gray-500 group-hover/action:text-cyan-400 transition-colors font-medium">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
