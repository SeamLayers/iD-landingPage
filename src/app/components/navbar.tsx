import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { Languages, Sparkles, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { label: t('nav.features'), href: '#features' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.about'), href: '#about' },
  ];

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "py-3" : "py-6"
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`rounded-2xl transition-all duration-700 relative overflow-hidden ${
            scrolled
            ? "bg-[#0a0e27]/90 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(6,182,212,0.15)]"
            : "bg-[#0a0e27]/50 backdrop-blur-xl border border-white/5"
          }`}
        >
          {/* Animated Top Border Glow */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: scrolled
                ? "linear-gradient(90deg, transparent, rgba(6,182,212,0.6), rgba(99,102,241,0.6), rgba(6,182,212,0.6), transparent)"
                : "linear-gradient(90deg, transparent, rgba(6,182,212,0.2), transparent)"
            }}
          />

          <div className="flex items-center justify-between px-8 py-4">
            
            {/* Logo Group */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-xl" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 relative z-10 group-hover:shadow-cyan-400/50 transition-shadow duration-500" aria-hidden="true">
                  <span className="text-white font-bold text-xl leading-none pt-1 font-sans">iD</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-tight font-cairo-display leading-none mb-1 group-hover:text-cyan-100 transition-colors duration-300">
                  iD+
                </span>
                <span className="text-gray-500 text-xs tracking-wide font-cairo-body leading-none group-hover:text-gray-400 transition-colors duration-300">
                  {t('nav.byMhawer')}
                </span>
              </div>
            </motion.div>

            {/* Section Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-cyan-300 transition-colors duration-300 font-cairo-body text-sm"
                  aria-label={item.label}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Buttons & Language Switcher */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 text-gray-400 hover:text-cyan-400 rounded-xl transition-all duration-300 flex items-center gap-2 overflow-hidden group/lang"
                aria-label="Toggle Language"
              >
                <div className="absolute inset-0 bg-cyan-500/0 group-hover/lang:bg-cyan-500/10 rounded-xl transition-colors duration-300 border border-transparent group-hover/lang:border-cyan-500/20" />
                <Languages className="w-5 h-5 relative z-10" />
                <span className="text-sm font-semibold font-cairo-body uppercase tracking-wider relative z-10">
                  {language === 'ar' ? 'EN' : 'عربي'}
                </span>
              </motion.button>
              
              <div className="w-px h-6 bg-white/10 hidden sm:block"></div>

              <motion.a
                href="/login"
                whileHover={{ scale: 1.05, color: "#22d3ee" }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 text-gray-400 hover:text-cyan-400 transition-all duration-300 font-cairo-body hidden sm:block relative group/login"
                aria-label={t('nav.login')}
              >
                <span className="relative z-10">{t('nav.login')}</span>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-cyan-400 group-hover/login:w-3/4 transition-all duration-300" />
              </motion.a>
              
              <motion.a
                href="/login"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(6, 182, 212, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                className="relative px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all duration-500 font-cairo-body overflow-hidden group/cta"
                aria-label={t('nav.goToDashboard')}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('nav.goToDashboard')}
                  <Sparkles className="w-4 h-4 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500"
                />
              </motion.a>

              <button
                className="lg:hidden p-2 rounded-xl border border-white/10 text-gray-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
            </div>

          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-white/10 px-6 pb-6 pt-4 bg-[#0a0e27]/95 backdrop-blur-xl">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-start text-gray-200 hover:text-cyan-300 py-2 font-cairo-body"
                    aria-label={item.label}
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href="/login"
                  className="mt-2 inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-cairo-body font-semibold"
                  aria-label={t('nav.goToDashboard')}
                >
                  {t('nav.goToDashboard')}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}