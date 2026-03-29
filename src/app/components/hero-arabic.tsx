import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from "motion/react";
import { Sparkles, Zap, Shield, Fingerprint, Wifi, Phone, Mail, Globe, MapPin, QrCode, Share2, Download, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipDirection, setFlipDirection] = useState(1); // 1 = right, -1 = left
  const flipCount = useRef(0);
  const { language, t } = useLanguage();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [15, -15]), {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-15, 15]), {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
    pointerX.set(e.clientX - rect.left);
    pointerY.set(e.clientY - rect.top);
  };

  const handleMouseEnterCard = useCallback(() => {
    setIsHovered(true);
    // Small delay before flipping for a natural feel
    setTimeout(() => {
      flipCount.current += 1;
      setFlipDirection(flipCount.current % 2 === 0 ? 1 : -1);
      setIsFlipped(true);
    }, 200);
  }, []);

  const handleMouseLeaveCard = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    setIsFlipped(false);
  }, [mouseX, mouseY]);

  // Calculate the actual rotateY for the flip, alternating direction
  const flipAngle = isFlipped ? 180 * flipDirection : 0;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-14 sm:pb-20 px-4 sm:px-6">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ willChange: 'transform' }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
          style={{ willChange: 'transform, opacity' }}
          className="absolute top-1/4 -start-1/4 w-1/2 h-1/2 bg-cyan-500/20 rounded-full blur-[120px]"
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
            repeatType: "reverse",
          }}
          style={{ willChange: 'transform, opacity' }}
          className="absolute bottom-1/4 -end-1/4 w-1/2 h-1/2 bg-blue-600/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center relative z-10 w-full">
        
        {/* Text Content Area */}
        <motion.div
          initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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

        {/* 3D Floating Premium Business Card with HOVER FLIP */}
        <motion.div
          initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
          animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
            x: { duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative flex items-center justify-center w-full"
          style={{ perspective: "1200px", WebkitPerspective: "1200px" }}
        >
          {/* Card Outer Glow */}
          <motion.div
            animate={{
              scale: isHovered ? 1.15 : 1,
              opacity: isHovered ? 0.8 : 0.4,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-tr from-cyan-600/40 to-blue-600/40 blur-[80px] rounded-full z-0 pointer-events-none"
          />

          {/* Card Wrapper with hover detection */}
          <div
            className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[480px] aspect-[1.44/1] sm:aspect-[1.586/1] z-10 cursor-pointer"
            onMouseEnter={handleMouseEnterCard}
            onMouseLeave={handleMouseLeaveCard}
            onMouseMove={handleMouseMove}
          >
            {/* Card Drop Shadow */}
            <motion.div
              animate={{
                y: isHovered ? 30 : 15,
                opacity: isHovered ? 0.4 : 0.2,
                scale: isHovered ? 0.95 : 1
              }}
              className="absolute inset-0 bg-black blur-2xl rounded-3xl transform translate-y-12"
            />

            {/* Parallax tilt container (only when not flipped) */}
            <motion.div
              style={{
                rotateX: isFlipped ? 0 : rotateX,
                rotateY: isFlipped ? 0 : rotateY,
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
              }}
              className="w-full h-full"
            >

              {/* CARD FLIPPER */}
              <motion.div
                animate={{ rotateY: flipAngle }}
                transition={{ type: "spring", stiffness: 80, damping: 14, mass: 1 }}
                style={{ transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d", willChange: "transform" }}
                className="relative w-full h-full"
              >

                {/* ======== FRONT FACE ======== */}
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

                {/* ======== BACK FACE ======== */}
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
                  <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

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
                      {[
                        { icon: Phone, label: "+966 50 123 4567", sublabel: language === 'ar' ? 'الجوال' : 'Mobile', isLtr: true },
                        { icon: Mail, label: "fahad@company.sa", sublabel: language === 'ar' ? 'البريد' : 'Email', isLtr: true },
                        { icon: Globe, label: "www.company.sa", sublabel: language === 'ar' ? 'الموقع' : 'Website', isLtr: true },
                        { icon: MapPin, label: language === 'ar' ? 'الرياض، السعودية' : 'Riyadh, KSA', sublabel: language === 'ar' ? 'المدينة' : 'Location', isLtr: false },
                      ].map((item, i) => (
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
                      {[
                        { icon: Download, label: language === 'ar' ? 'حفظ' : 'Save' },
                        { icon: Share2, label: language === 'ar' ? 'مشاركة' : 'Share' },
                        { icon: QrCode, label: language === 'ar' ? 'رمز QR' : 'QR Code' },
                      ].map((action, i) => (
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

              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
