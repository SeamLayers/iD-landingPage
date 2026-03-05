import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { Languages } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`rounded-2xl transition-all duration-500 ${
            scrolled
              ? "bg-[#1a1f3a]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-cyan-500/5"
              : "bg-[#1a1f3a]/40 backdrop-blur-md border border-white/5"
          }`}
        >
          <div className="flex items-center justify-between px-8 py-4">
            
            {/* Logo Group */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30" aria-hidden="true">
                <span className="text-white font-bold text-xl leading-none pt-1">iD</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-tight font-cairo-display leading-none mb-1">
                  iD+
                </span>
                <span className="text-gray-400 text-xs tracking-wide font-cairo-body leading-none">
                  {t('nav.byMhawer')}
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons & Language Switcher */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                aria-label="Toggle Language"
              >
                <Languages className="w-5 h-5" />
                <span className="text-sm font-medium font-cairo-body uppercase tracking-wider">
                  {language === 'ar' ? 'EN' : 'عربي'}
                </span>
              </motion.button>
              
              <div className="w-px h-6 bg-white/10 hidden sm:block"></div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 text-gray-300 hover:text-white transition-colors font-cairo-body hidden sm:block"
                aria-label={t('nav.login')}
              >
                {t('nav.login')}
              </motion.button>
              
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all font-cairo-body"
                aria-label={t('nav.bookDemo')}
              >
                {t('nav.bookDemo')}
              </motion.button>
              
            </div>

          </div>
        </div>
      </div>
    </motion.nav>
  );
}