import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";
import { Sparkles, Zap, Shield, Fingerprint, Wifi, Phone, Mail, Globe, MapPin, QrCode, CreditCard, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const { language, t } = useLanguage();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [25, -25]), {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-25, 25]), {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
    pointerX.set(e.clientX - rect.left);
    pointerY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 px-6">
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

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        
        {/* Text Content Area */}
        <motion.div
          initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
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
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.2] ${language === 'ar' ? 'font-cairo-display' : ''}`}>
              {t('hero.title.part1')}{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent inline-block pb-2">
                {t('hero.title.highlight')}
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-xl font-cairo-body">
              {t('hero.description')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(6, 182, 212, 0.6)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all overflow-hidden font-cairo-body flex items-center justify-center gap-3 border border-cyan-400/30"
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
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/5 text-white rounded-xl font-semibold border border-white/10 hover:border-white/30 transition-all backdrop-blur-md font-cairo-body shadow-xl shadow-black/20"
              aria-label={t('hero.cta.secondary')}
            >
              {t('hero.cta.secondary')}
            </motion.button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-white/10">
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

        {/* 3D Floating Premium Business Card */}
        <motion.div
          initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center w-full"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Card Outer Glow Glow Effect */}
          <motion.div
            animate={{
              scale: isHovered ? 1.15 : 1,
              opacity: isHovered ? 0.8 : 0.4,
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-tr from-cyan-600/40 to-blue-600/40 blur-[80px] rounded-full z-0 pointer-events-none"
          />

          {/* Container for 3D Perspective */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-[480px] aspect-[1.586/1] z-10 cursor-pointer"
          >
            {/* Card Drop Shadow (3D Depth) */}
            <motion.div
              animate={{
                y: isHovered ? 30 : 15,
                opacity: isHovered ? 0.4 : 0.2,
                scale: isHovered ? 0.95 : 1
              }}
              className="absolute inset-0 bg-black blur-2xl rounded-3xl transform translate-y-12"
            />

            {/* Actual Card Surface */}
            <div className="relative w-full h-full rounded-2xl border border-white/20 overflow-hidden shadow-2xl group transition-all duration-500 bg-black/40 backdrop-blur-md">
                
              {/* Premium Dark Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#050810] via-[#0f142b] to-[#131b3e] z-0" />
              
              {/* Noise Texture layer for realism */}
              <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              
              {/* Interactive Spotlight using Motion Template */}
              <motion.div
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
                style={{
                  background: useMotionTemplate`radial-gradient(800px circle at ${pointerX}px ${pointerY}px, rgba(56, 189, 248, 0.15), transparent 40%)`
                }}
              />

              {/* Multi-layered Holographic Gradient */}
              <motion.div 
                 animate={{
                   backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%"
                 }}
                 transition={{ duration: 4, ease: "linear", repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
                 className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_50%_0%,_#38bdf8_0%,_transparent_50%),radial-gradient(circle_at_100%_100%,_#818cf8_0%,_transparent_50%)] z-0 mix-blend-screen"
              />

              {/* Glowing Metallic Border effect inner highlight */}
              <div className="absolute inset-[1px] rounded-2xl border border-white/10 pointer-events-none z-30 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-30 z-30 pointer-events-none rounded-2xl" />

              {/* Inner Content Area - With 3D Floating Effect */}
              <motion.div 
                style={{ translateZ: 60, transformStyle: "preserve-3d" }}
                className="relative z-40 p-7 h-full flex flex-col justify-between" 
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                
                {/* Header (Logo + Pulse) */}
                <div className="flex justify-between items-start" style={{ transform: "translateZ(30px)" }}>
                  {/* Premium Brand Logo Icon inside Card */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-cyan-500 to-blue-600 p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                      <div className="w-full h-full bg-[#030712] rounded-[11px] flex items-center justify-center relative overflow-hidden group-hover:bg-[#0a0e27] transition-colors duration-500">
                         <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent z-0" />
                         <span className="text-white font-bold text-xl relative z-10 leading-none pt-1 font-sans">iD</span>
                      </div>
                    </div>
                    <span className="text-white/40 font-mono text-xs tracking-widest uppercase">Premium</span>
                  </div>

                  {/* Pulsing NFC/RFID Logo Pattern */}
                  <div className="relative flex items-center justify-center cursor-default group/nfc">
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 bg-cyan-500/40 rounded-full blur-md"
                    />
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0a0e27] to-cyan-900/40 border border-cyan-400/60 flex items-center justify-center relative z-10 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover/nfc:bg-cyan-500/30 group-hover/nfc:border-cyan-300 transition-all duration-500">
                      <Wifi className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)] group-hover/nfc:text-white" />
                    </div>
                  </div>
                </div>

                {/* Main Body (Avatar + Name) */}
                <div className="flex flex-col items-center justify-center -mt-6" style={{ transform: "translateZ(50px)" }}>
                    {/* Avatar with luxury ring */}
                    <div className="relative group/avatar mb-4">
                      {/* Rotating Outer Ring */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-2 rounded-full border border-transparent border-t-cyan-400 border-b-cyan-600 opacity-30 group-hover/avatar:opacity-100 transition-opacity duration-700"
                      />
                      <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-20 rounded-full group-hover/avatar:opacity-50 group-hover/avatar:blur-2xl transition-all duration-700" />
                      <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop" 
                        alt="Profile" 
                        className="w-20 h-20 rounded-full border-2 border-[#050810] relative z-10 object-cover shadow-2xl"
                      />
                    </div>
                    <div className="space-y-1 text-center drop-shadow-2xl">
                     <h3 className="text-3xl font-bold text-white tracking-widest font-cairo-display leading-tight mb-1">
                       {t('card.name')}
                     </h3>
                     <p className="text-cyan-400/80 font-medium tracking-widest font-cairo-body uppercase text-sm">
                       {t('card.title')}
                     </p>
                    </div>
                </div>

                {/* Bottom Dock (Glassmorphism inside Glassmorphism) */}
                <div className="w-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-2.5 flex justify-between items-center shadow-inner" style={{ transform: "translateZ(40px)" }}>
                  <div className="flex gap-1">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer group/icon">
                      <Phone className="w-4 h-4 text-gray-400 group-hover/icon:text-cyan-400 transition-colors" />
                    </div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer group/icon">
                      <Mail className="w-4 h-4 text-gray-400 group-hover/icon:text-cyan-400 transition-colors" />
                    </div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer group/icon">
                      <Globe className="w-4 h-4 text-gray-400 group-hover/icon:text-cyan-400 transition-colors" />
                    </div>
                  </div>
                  
                  {/* Subtle Save Contact Button */}
                  <div className="flex items-center gap-3 pe-2">
                    <span className="text-xs text-white/50 uppercase tracking-widest font-mono hidden sm:block">Connect</span>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] cursor-pointer hover:scale-105 transition-all group/connect">
                      <QrCode className="w-4 h-4 text-white group-hover/connect:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>

              </motion.div>
              
              {/* Security Chip Details */}
              <div className="absolute top-5 start-5 w-10 h-8 rounded bg-gradient-to-br from-yellow-300/20 via-yellow-500/10 to-yellow-600/20 border border-yellow-500/20 opacity-20 mix-blend-screen pointer-events-none overflow-hidden" style={{ transform: "translateZ(10px)" }}>
                <div className="w-full h-px bg-yellow-500/30 absolute top-1/2 -translate-y-1/2" />
                <div className="w-px h-full bg-yellow-500/30 absolute left-1/2 -translate-x-1/2" />
                <div className="absolute inset-1 rounded-sm border border-yellow-500/30" />
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
