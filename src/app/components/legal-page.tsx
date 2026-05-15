import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getJSON } from '../../utils/api';

type LegalPath = 'privacy-policy' | 'terms-conditions';

interface LegalPageProps {
  path: LegalPath;
}

const FALLBACK_HTML: Record<LegalPath, { en: string; ar: string }> = {
  'privacy-policy': {
    en: '<h2>Privacy Policy</h2><p>We respect your privacy. This is the placeholder privacy policy shown while the full document is being loaded or while the server is briefly unavailable. Please check back shortly.</p>',
    ar: '<h2>سياسة الخصوصية</h2><p>نحن نحترم خصوصيتك. هذا نص بديل يظهر أثناء تحميل الوثيقة الكاملة أو في حال تعذّر الوصول إلى الخادم لحظياً. يرجى المحاولة مرة أخرى.</p>',
  },
  'terms-conditions': {
    en: '<h2>Terms &amp; Conditions</h2><p>This is the placeholder terms of service shown while the full document is being loaded or while the server is briefly unavailable. Please check back shortly.</p>',
    ar: '<h2>الشروط والأحكام</h2><p>هذا نص بديل يظهر أثناء تحميل وثيقة الشروط الكاملة أو في حال تعذّر الوصول إلى الخادم لحظياً. يرجى المحاولة مرة أخرى.</p>',
  },
};

export function LegalPage({ path }: LegalPageProps) {
  const { language, setLanguage, t } = useLanguage();
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const data = await getJSON<{ content: string }>(`/${path}?lang=${language}`);
        if (cancelled) return;
        setHtml(
          data?.content && data.content.trim().length > 0
            ? data.content
            : FALLBACK_HTML[path][language]
        );
      } catch {
        if (!cancelled) setHtml(FALLBACK_HTML[path][language]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [path, language]);

  const heading =
    path === 'privacy-policy'
      ? language === 'ar'
        ? 'سياسة الخصوصية'
        : 'Privacy Policy'
      : language === 'ar'
        ? 'الشروط والأحكام'
        : 'Terms & Conditions';

  return (
    <div className="min-h-screen bg-[#0a0e27] antialiased relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -start-1/4 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 -end-1/4 w-1/2 h-1/2 bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur-xl bg-[#0a0e27]/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <a
            href="/"
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm group"
            aria-label={language === 'ar' ? 'العودة إلى الرئيسية' : 'Back to home'}
          >
            <ArrowLeft className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''} transition-transform group-hover:-translate-x-0.5`} />
            <span className={language === 'ar' ? 'font-cairo-body' : ''}>
              {language === 'ar' ? 'العودة إلى الرئيسية' : 'Back to home'}
            </span>
          </a>

          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <span className="text-white font-bold text-sm">iD</span>
              </div>
              <span className={`text-white font-semibold text-sm hidden sm:inline ${language === 'ar' ? 'font-cairo-display' : ''}`}>
                iD+ {t('nav.byMhawer')}
              </span>
            </a>

            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="p-2 text-gray-400 hover:text-cyan-400 rounded-lg transition-colors border border-transparent hover:border-cyan-500/20 flex items-center gap-1.5"
              aria-label="Toggle Language"
            >
              <Languages className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {language === 'ar' ? 'EN' : 'عربي'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-3xl sm:text-4xl font-bold text-white mb-2 ${language === 'ar' ? 'font-cairo-display text-end' : ''}`}
        >
          {heading}
        </motion.h1>
        <p className={`text-gray-500 text-sm mb-10 ${language === 'ar' ? 'font-cairo-body text-end' : ''}`}>
          {language === 'ar' ? 'آخر تحديث: 2026' : 'Last updated: 2026'}
        </p>

        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className={`
            rounded-2xl bg-[#1a1f3a]/60 border border-cyan-500/20 backdrop-blur-sm
            p-6 sm:p-10 shadow-[0_8px_32px_rgba(6,182,212,0.08)]
            text-gray-200 leading-relaxed
            prose prose-invert max-w-none
            legal-content
            ${language === 'ar' ? 'font-cairo-body text-end' : ''}
          `}
        >
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            </div>
          ) : (
            // eslint-disable-next-line react/no-danger
            <div dangerouslySetInnerHTML={{ __html: html }} />
          )}
        </motion.article>
      </main>

      {/* Inline styles to give the HTML content the dark/cyan look without pulling Tailwind typography plugin */}
      <style>{`
        .legal-content h1, .legal-content h2, .legal-content h3, .legal-content h4 {
          color: #e6f6ff;
          margin-top: 1.6em;
          margin-bottom: 0.6em;
          font-weight: 600;
        }
        .legal-content h2 { font-size: 1.5rem; }
        .legal-content h3 { font-size: 1.25rem; }
        .legal-content p { color: #c8d2e6; margin: 0.8em 0; }
        .legal-content a { color: #06b6d4; text-decoration: underline; }
        .legal-content a:hover { color: #22d3ee; }
        .legal-content ul, .legal-content ol { padding-inline-start: 1.5rem; margin: 0.8em 0; color: #c8d2e6; }
        .legal-content li { margin: 0.35em 0; }
        .legal-content strong { color: #f1f5f9; }
        .legal-content code {
          background: rgba(6, 182, 212, 0.12);
          color: #67e8f9;
          padding: 0.1em 0.4em;
          border-radius: 4px;
          font-size: 0.9em;
        }
        .legal-content hr { border-color: rgba(6, 182, 212, 0.18); margin: 1.8em 0; }
      `}</style>
    </div>
  );
}
