import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Building2, UserPlus, CreditCard, Target } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const { language, t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t('how.s1.title'),
      description: t('how.s1.desc'),
      icon: Building2,
      mockup: (
        <div className="w-full h-full bg-gradient-to-br from-[#1a1f3a] to-[#0f1320] rounded-2xl border border-white/10 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white font-semibold">Acme Corporation</div>
              <div className="text-xs text-gray-400">Enterprise Account</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-white/5 rounded-full overflow-hidden" dir="ltr">
              <div className="h-full w-4/5 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full" />
            </div>
            <div className="text-xs text-gray-400">Setup Progress: 80%</div>
          </div>
        </div>
      ),
    },
    {
      number: "02",
      title: t('how.s2.title'),
      description: t('how.s2.desc'),
      icon: UserPlus,
      mockup: (
        <div className="w-full h-full bg-gradient-to-br from-[#1a1f3a] to-[#0f1320] rounded-2xl border border-white/10 p-6">
          <div className="space-y-3">
            {[
              { name: "Sarah Miller", role: "Sales Director", status: "Active" },
              { name: "Mike Chen", role: "Product Manager", status: "Pending" },
              { name: "Lisa Park", role: "Engineer", status: "Active" },
            ].map((user, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white/5 rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="text-start">
                    <div className="text-white text-sm font-medium">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-400">{user.role}</div>
                  </div>
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full ${
                    user.status === "Active"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {user.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      number: "03",
      title: t('how.s3.title'),
      description: t('how.s3.desc'),
      icon: CreditCard,
      mockup: (
        <div className="w-full h-full bg-gradient-to-br from-[#1a1f3a] to-[#0f1320] rounded-2xl border border-white/10 p-6 flex items-center justify-center">
          <div className="relative">
            <div className="w-48 h-28 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-white/10 p-4 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-cyan-600" />
                <div className="text-white text-xs font-bold font-sans">iD+</div>
              </div>
              <div className="text-start">
                <div className="text-white text-sm font-semibold">
                  John Smith
                </div>
                <div className="text-cyan-400 text-xs">CEO</div>
              </div>
              <div className="absolute top-2 end-2 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "04",
      title: t('how.s4.title'),
      description: t('how.s4.desc'),
      icon: Target,
      mockup: (
        <div className="w-full h-full bg-gradient-to-br from-[#1a1f3a] to-[#0f1320] rounded-2xl border border-white/10 p-6">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-cyan-400">47</div>
                <div className="text-xs text-gray-400">Today</div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">312</div>
                <div className="text-xs text-gray-400">This Week</div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-emerald-400">1.2k</div>
                <div className="text-xs text-gray-400">Total</div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-xs text-gray-400 mb-2">Recent Activity</div>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">New lead captured</span>
                <span className="text-cyan-400 text-xs">2m ago</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Map scroll progress to step index
      const stepIndex = Math.min(
        Math.floor(latest * steps.length * 1.5),
        steps.length - 1
      );
      setActiveStep(Math.max(0, stepIndex));
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, steps.length]);

  return (
    <section ref={containerRef} className="py-28 px-6 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm mb-6">
            <span className={`text-cyan-400 text-sm font-medium ${language === 'ar' ? 'font-cairo-body' : ''}`}>
              {t('how.badge')}
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold text-white mb-4 ${language === 'ar' ? 'font-cairo-display' : ''}`}>
             {t('how.title.part1')}{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent pb-1 inline-block">
              {t('how.title.highlight')}
            </span>
          </h2>
          <p className={`text-xl text-gray-400 max-w-2xl mx-auto ${language === 'ar' ? 'font-cairo-body' : ''}`}>
             {t('how.description')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid lg:grid-cols-2 gap-16 items-center relative">
          {/* Left: Steps */}
          <div className="relative">
            {/* Connecting Line - Using logical properties for RTL support */}
            <div className="absolute start-8 top-0 bottom-0 w-0.5 bg-white/[0.06] z-0 hidden sm:block">
              <motion.div
                className="w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                style={{
                  height: useTransform(
                    scrollYProgress,
                    [0, 1],
                    ["0%", "100%"]
                  ),
                }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-12 relative z-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep >= index;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex gap-6 cursor-pointer group items-start"
                    onClick={() => setActiveStep(index)}
                    whileHover={{ x: language === 'ar' ? -5 : 5 }}
                  >
                    {/* Icon */}
                    <div className="relative z-10 shrink-0">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          backgroundColor: isActive
                            ? "rgba(6, 182, 212, 0.2)"
                            : "rgba(255, 255, 255, 0.05)",
                          borderColor: isActive
                            ? "rgb(6, 182, 212)"
                            : "rgba(255, 255, 255, 0.1)",
                        }}
                        className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 bg-[#0a0e27] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                      >
                        <Icon
                          className="w-7 h-7 transition-colors duration-500"
                          style={{
                            color: isActive
                              ? "rgb(6, 182, 212)"
                              : "rgb(156, 163, 175)",
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-sm font-mono transition-colors duration-500"
                          style={{
                            color: isActive
                              ? "rgb(6, 182, 212)"
                              : "rgb(107, 114, 128)",
                          }}
                        >
                          {step.number}
                        </span>
                        <motion.h3
                          className={`text-2xl font-bold transition-colors duration-500 ${language === 'ar' ? 'font-cairo-display' : ''}`}
                          style={{
                            color: isActive
                              ? "rgb(255, 255, 255)"
                              : "rgb(156, 163, 175)",
                          }}
                        >
                          {step.title}
                        </motion.h3>
                      </div>
                      <motion.p
                        className={`text-gray-400 leading-relaxed transition-opacity duration-500 ${language === 'ar' ? 'font-cairo-body' : ''}`}
                        style={{ opacity: isActive ? 1 : 0.6 }}
                      >
                        {step.description}
                      </motion.p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Mockup */}
          <div className="relative lg:sticky lg:top-32 h-[400px]">
            <div className="absolute inset-0 max-w-sm mx-auto w-full">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{
                    opacity: activeStep === index ? 1 : 0,
                    scale: activeStep === index ? 1 : 0.9,
                    y: activeStep === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                  style={{ pointerEvents: activeStep === index ? "auto" : "none" }}
                >
                  {/* Glow */}
                  <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />
                  {/* Mockup */}
                  <div className="relative h-full shadow-2xl shadow-black/40 rounded-2xl hover:shadow-cyan-900/20 transition-shadow duration-500">{step.mockup}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}