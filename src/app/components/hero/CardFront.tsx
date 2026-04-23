import { motion, MotionValue, useMotionTemplate } from "motion/react";
import { Wifi, Phone, Mail, Globe, QrCode } from "lucide-react";

interface CardFrontProps {
  language: string;
  t: (key: string) => string;
  isFlipped: boolean;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}

export function CardFront({ language, t, isFlipped, pointerX, pointerY }: CardFrontProps) {
  return (
    <div
      className="absolute inset-0 rounded-2xl border border-white/15 overflow-hidden shadow-2xl"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(0deg) translateZ(1px)",
        WebkitTransform: "rotateY(0deg) translateZ(1px)",
        opacity: isFlipped ? 0 : 1,
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050810] via-[#0f142b] to-[#131b3e] z-0" />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Interactive Spotlight */}
      <motion.div
        className="absolute inset-0 z-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: isFlipped ? 0 : undefined,
          background: useMotionTemplate`radial-gradient(600px circle at ${pointerX}px ${pointerY}px, rgba(56, 189, 248, 0.12), transparent 40%)`
        }}
      />

      {/* Holographic Gradient */}
      <motion.div 
        animate={{ backgroundPosition: !isFlipped ? ["0% 0%", "100% 100%"] : "0% 0%" }}
        transition={{ duration: 4, ease: "linear", repeat: !isFlipped ? Infinity : 0, repeatType: "reverse" }}
        className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_50%_0%,_#38bdf8_0%,_transparent_50%),radial-gradient(circle_at_100%_100%,_#818cf8_0%,_transparent_50%)] z-0 mix-blend-screen"
      />

      {/* Inner Border */}
      <div className="absolute inset-[1px] rounded-2xl border border-white/[0.08] pointer-events-none z-30" />

      {/* Front Content */}
      <div className="relative z-40 p-3.5 sm:p-6 h-full flex flex-col justify-between" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-indigo-500 via-cyan-500 to-blue-600 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <div className="w-full h-full bg-[#030712] rounded-[7px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent z-0" />
                <span className="text-white font-bold text-sm sm:text-base relative z-10 leading-none pt-0.5 font-sans">iD</span>
              </div>
            </div>
            <span className="text-white/30 font-mono text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.2em] uppercase">{language === 'ar' ? 'نخبة' : 'Premium'}</span>
          </div>

          {/* NFC Indicator */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 bg-cyan-500/30 rounded-full blur-md"
            />
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0a0e27]/80 border border-cyan-400/50 flex items-center justify-center relative z-10 backdrop-blur-sm shadow-[0_0_12px_rgba(6,182,212,0.4)]">
              <Wifi className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-300 drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
            </div>
          </div>
        </div>

        {/* Center: Avatar + Name */}
        <div className="flex flex-col items-center justify-center flex-1 min-h-0 py-1 sm:py-2">
          <div className="relative mb-2 sm:mb-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1.5 rounded-full border border-transparent border-t-cyan-400/50 border-b-cyan-600/50 opacity-40"
            />
            <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-15 rounded-full" />
            <img
              src="/images/profile-avatar.png"
              alt="Profile" 
                loading="eager"
                fetchPriority="high"
                decoding="async"
              className="w-[62px] h-[62px] sm:w-[72px] sm:h-[72px] rounded-full border-2 border-[#050810] relative z-10 object-cover shadow-xl"
            />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide sm:tracking-wider font-cairo-display leading-tight mb-0.5 text-center break-words max-w-full px-1">
            {t('card.name')}
          </h3>
          <p className="text-cyan-400/70 font-medium tracking-[0.08em] sm:tracking-[0.15em] font-cairo-body uppercase text-[11px] sm:text-xs text-center px-1">
            {t('card.title')}
          </p>
        </div>

        {/* Bottom Dock */}
        <div className="w-full rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-lg p-1.5 sm:p-2 flex justify-between items-center">
          <div className="flex gap-0">
            {[Phone, Mail, Globe].map((Icon, i) => (
              <div key={i} className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer group/icon">
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500 group-hover/icon:text-cyan-400 transition-colors" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 pe-1">
            <span className="text-[10px] text-white/30 uppercase tracking-[0.15em] font-mono hidden sm:block">{language === 'ar' ? 'تواصل' : 'Connect'}</span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.25)] hover:shadow-[0_0_18px_rgba(6,182,212,0.5)] cursor-pointer hover:scale-105 transition-all">
              <QrCode className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
