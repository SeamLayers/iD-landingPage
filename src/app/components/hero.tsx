import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Sparkles, Zap, Shield } from "lucide-react";

export function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), {
    stiffness: 100,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 px-6">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden" style={{ willChange: 'transform' }}>
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
          className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-500/20 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Right: 3D Floating Card (on the LEFT for RTL, which appears on the RIGHT visually) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center order-first lg:order-none"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">
              Enterprise Digital Identity Platform
            </span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              The Future of{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Enterprise Digital Identity
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
              Empower your workforce with smart digital business cards, seamless
              CRM integration, and secure team collaboration—all in one
              platform.
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
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl font-semibold shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all overflow-hidden"
              aria-label="Transform your enterprise with iD+"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Transform Your Enterprise
                <Zap className="w-5 h-5" aria-hidden="true" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
              aria-label="Watch product demo"
            >
              Watch Demo
            </motion.button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-8 pt-8">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span className="text-sm text-gray-400">
                Enterprise-Grade Security
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 text-cyan-400 font-bold">✓</div>
              <span className="text-sm text-gray-400">SOC 2 Certified</span>
            </div>
          </div>
        </motion.div>

        {/* Right: 3D Floating Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Glow Effect */}
          <motion.div
            animate={{
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? 0.6 : 0.3,
            }}
            className="absolute inset-0 bg-cyan-500/30 blur-3xl rounded-full"
          />

          {/* 3D Card */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-md aspect-[1.6/1]"
          >
            {/* Card Shadow */}
            <motion.div
              animate={{
                y: isHovered ? 20 : 10,
                opacity: isHovered ? 0.6 : 0.3,
              }}
              className="absolute inset-0 bg-black/50 blur-2xl rounded-3xl transform translate-y-8"
            />

            {/* Card Body */}
            <div className="relative w-full h-full bg-gradient-to-br from-[#1a1f3a] via-[#2d3452] to-[#1a1f3a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Glass Reflection Effect */}
              <motion.div
                animate={{
                  x: isHovered ? "100%" : "-100%",
                }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
              />

              {/* Card Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/50 mb-4">
                    <span className="text-white font-bold text-xl">iD</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Alex Johnson
                  </h3>
                  <p className="text-cyan-400 text-sm font-medium">
                    Chief Technology Officer
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    alex.johnson@company.com
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    +1 (555) 123-4567
                  </div>
                </div>

                {/* NFC Indicator */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center"
                >
                  <div className="w-6 h-6 rounded-full bg-cyan-400" />
                </motion.div>
              </div>

              {/* Holographic Pattern */}
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,_transparent_20%,_rgba(6,182,212,0.1)_80%)]" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1"
        >
          <motion.div className="w-1.5 h-3 bg-cyan-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
