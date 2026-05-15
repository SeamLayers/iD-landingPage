import { motion } from "motion/react";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useContactInfo, waNumber } from "../hooks/useContactInfo";
import { useConstants } from "../context/ConstantsContext";

export function Footer() {
  const { language, t } = useLanguage();
  const { contact } = useContactInfo();
  const { constants } = useConstants();

  const productLinks = [
    { en: 'Features', ar: 'الميزات', href: '#features' },
    { en: 'Pricing', ar: 'الأسعار', href: '#pricing' },
    { en: 'Integrations', ar: 'التكاملات', href: '#' },
    { en: 'API Docs', ar: 'وثائق API', href: '#' },
  ];

  const companyLinks = [
    { en: 'About Us', ar: 'من نحن', href: '#' },
    { en: 'Careers', ar: 'الفرص الوظيفية', href: '#' },
    { en: 'Blog', ar: 'المدونة', href: '#' },
    { en: 'Contact', ar: 'تواصل معنا', href: `mailto:${contact.email}` },
  ];

  const legalLinks = [
    { en: 'Privacy Policy', ar: 'سياسة الخصوصية', href: '/privacy' },
    { en: 'Terms of Service', ar: 'شروط الخدمة', href: '/terms' },
    { en: 'Security', ar: 'الأمان', href: '#security' },
    { en: 'Compliance', ar: 'الامتثال', href: '#' },
  ];

  const socialLinks = [
    { en: 'Twitter', ar: 'X' },
    { en: 'LinkedIn', ar: 'لينكد إن' },
    { en: 'GitHub', ar: 'جيت هب' },
  ];

  const appName = constants.app_name || 'iD+ by Mhawer';
  const appVersion = constants.app_version || '1.0.0';
  const rightsText =
    t('footer.rights') ||
    (language === 'ar'
      ? `© 2026 ${appName}. جميع الحقوق محفوظة.`
      : `© 2026 ${appName}. All rights reserved.`);

  return (
    <footer className="border-t border-white/5 py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/3 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-5 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-xl" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 relative z-10">
                  <span className="text-white font-bold text-xl font-sans">iD</span>
                </div>
              </div>
              <div className="flex flex-col text-start">
                <span className="text-white font-semibold text-lg font-sans group-hover:text-cyan-100 transition-colors duration-300">iD+</span>
                <span className={`text-gray-500 text-xs ${language === 'ar' ? 'font-cairo-body' : ''}`}>{t('nav.byMhawer')}</span>
              </div>
            </div>
            <p className={`text-gray-500 text-sm text-start leading-relaxed ${language === 'ar' ? 'font-cairo-body' : ''}`}>
              {t('footer.description')}
            </p>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-start"
          >
            <h4 className={`text-white font-semibold mb-5 ${language === 'ar' ? 'font-cairo-display' : ''}`}>{t('footer.product')}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {productLinks.map((link) => (
                <li key={link.en} className="group/link">
                  <a href={link.href} className={`hover:text-cyan-400 transition-colors duration-300 relative inline-block ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                    {language === 'ar' ? link.ar : link.en}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover/link:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-start"
          >
            <h4 className={`text-white font-semibold mb-5 ${language === 'ar' ? 'font-cairo-display' : ''}`}>{t('footer.company')}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {companyLinks.map((link) => (
                <li key={link.en} className="group/link">
                  <a href={link.href} className={`hover:text-cyan-400 transition-colors duration-300 relative inline-block ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                    {language === 'ar' ? link.ar : link.en}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover/link:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact (from /contact-us) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-start"
          >
            <h4 className={`text-white font-semibold mb-5 ${language === 'ar' ? 'font-cairo-display' : ''}`}>
              {t('footer.contact')}
            </h4>
            <ul className={`space-y-3 text-sm text-gray-400 ${language === 'ar' ? 'font-cairo-body' : ''}`}>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-cyan-400 transition-colors duration-300 break-all"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className="hover:text-cyan-400 transition-colors duration-300"
                  dir="ltr"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <a
                  href={`https://wa.me/${waNumber(contact.whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors duration-300"
                >
                  {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>{contact.address}</span>
              </li>
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-start"
          >
            <h4 className={`text-white font-semibold mb-5 ${language === 'ar' ? 'font-cairo-display' : ''}`}>{t('footer.legal')}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {legalLinks.map((link) => (
                <li key={link.en} className="group/link">
                  <a href={link.href} className={`hover:text-cyan-400 transition-colors duration-300 relative inline-block ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                    {language === 'ar' ? link.ar : link.en}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover/link:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-white/5 pt-8 sm:pt-10 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
            <p className={`text-gray-500 text-xs sm:text-sm text-center md:text-start ${language === 'ar' ? 'font-cairo-body' : ''}`}>
              {rightsText}
            </p>
            <span className="hidden md:inline text-gray-700">·</span>
            <p className={`text-gray-600 text-[11px] sm:text-xs ${language === 'ar' ? 'font-cairo-body' : ''}`}>
              v{appVersion}
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-2 sm:gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.en}
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all duration-300 hover:shadow-[0_4px_15px_rgba(6,182,212,0.15)] ${language === 'ar' ? 'font-cairo-body' : ''}`}
              >
                {language === 'ar' ? link.ar : link.en}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
