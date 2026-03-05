import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <span className="text-white font-bold text-xl font-sans">iD</span>
              </div>
              <div className="flex flex-col text-start">
                <span className="text-white font-semibold text-lg font-sans">iD+</span>
                <span className={`text-gray-500 text-xs ${language === 'ar' ? 'font-cairo-body' : ''}`}>{t('nav.byMhawer')}</span>
              </div>
            </div>
            <p className={`text-gray-500 text-sm text-start ${language === 'ar' ? 'font-cairo-body' : ''}`}>
              {t('footer.description')}
            </p>
          </div>

          {/* Links */}
          <div className="text-start">
            <h4 className={`text-white font-semibold mb-4 ${language === 'ar' ? 'font-cairo-display' : ''}`}>{t('footer.product')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className={`hover:text-cyan-400 transition-colors cursor-pointer ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                {language === 'ar' ? 'المميزات' : 'Features'}
              </li>
              <li className={`hover:text-cyan-400 transition-colors cursor-pointer ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                {language === 'ar' ? 'الأسعار' : 'Pricing'}
              </li>
              <li className={`hover:text-cyan-400 transition-colors cursor-pointer ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                {language === 'ar' ? 'التكامل' : 'Integrations'}
              </li>
              <li className={`hover:text-cyan-400 transition-colors cursor-pointer ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                {language === 'ar' ? 'مستندات API' : 'API Docs'}
              </li>
            </ul>
          </div>

          <div className="text-start">
            <h4 className={`text-white font-semibold mb-4 ${language === 'ar' ? 'font-cairo-display' : ''}`}>{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className={`hover:text-cyan-400 transition-colors cursor-pointer ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                {language === 'ar' ? 'من نحن' : 'About Us'}
              </li>
              <li className={`hover:text-cyan-400 transition-colors cursor-pointer ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                {language === 'ar' ? 'الوظائف' : 'Careers'}
              </li>
              <li className={`hover:text-cyan-400 transition-colors cursor-pointer ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                {language === 'ar' ? 'المدونة' : 'Blog'}
              </li>
              <li className={`hover:text-cyan-400 transition-colors cursor-pointer ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                {language === 'ar' ? 'اتصل بنا' : 'Contact'}
              </li>
            </ul>
          </div>

          <div className="text-start">
            <h4 className={`text-white font-semibold mb-4 ${language === 'ar' ? 'font-cairo-display' : ''}`}>{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className={`hover:text-cyan-400 transition-colors cursor-pointer ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </li>
              <li className={`hover:text-cyan-400 transition-colors cursor-pointer ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                {language === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
              </li>
              <li className={`hover:text-cyan-400 transition-colors cursor-pointer ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                {language === 'ar' ? 'أمان' : 'Security'}
              </li>
              <li className={`hover:text-cyan-400 transition-colors cursor-pointer ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                {language === 'ar' ? 'الامتثال' : 'Compliance'}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`text-gray-500 text-sm ${language === 'ar' ? 'font-cairo-body' : ''}`}>
            {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className={`text-gray-500 hover:text-cyan-400 transition-colors ${language === 'ar' ? 'font-cairo-body' : ''}`}
            >
              {language === 'ar' ? 'تويتر' : 'Twitter'}
            </a>
            <a
              href="#"
              className={`text-gray-500 hover:text-cyan-400 transition-colors ${language === 'ar' ? 'font-cairo-body' : ''}`}
            >
               {language === 'ar' ? 'لينكد إن' : 'LinkedIn'}
            </a>
            <a
              href="#"
              className={`text-gray-500 hover:text-cyan-400 transition-colors ${language === 'ar' ? 'font-cairo-body' : ''}`}
            >
               {language === 'ar' ? 'جيت هب' : 'GitHub'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
