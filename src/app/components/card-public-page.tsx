import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageCircle,
  Download,
  Copy,
  Check,
  Building2,
  MapPin,
  Briefcase,
  Languages,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getJSON, postJSON } from '../../utils/api';
import { waNumber } from '../hooks/useContactInfo';

interface CardData {
  employee_number?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  branch?: string;
  department?: string;
  role?: string;
  // Allow arbitrary extra fields without forcing a recompile.
  [key: string]: string | undefined;
}

interface CardResponse {
  id: number;
  employee_id: number;
  card_data_json: CardData;
  qr_code: string | null;
  nfc_code: string | null;
  public_url: string;
  expiry_public_url: string | null;
  is_active: boolean;
  status: string;
}

interface CardPublicPageProps {
  publicUrl: string;
}

type Source = 'QR' | 'NFC' | 'LINK';

function detectSource(): Source {
  if (typeof window === 'undefined') return 'LINK';
  const params = new URLSearchParams(window.location.search);
  const from = (params.get('from') || '').toLowerCase();
  if (from === 'qr') return 'QR';
  if (from === 'nfc') return 'NFC';
  return 'LINK';
}

function initialsFrom(name: string | undefined): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function buildVCard(data: CardData): string {
  const esc = (v: string | undefined) => (v || '').replace(/[,;\\]/g, (m) => '\\' + m);
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${esc(data.name)}`,
    data.company ? `ORG:${esc(data.company)}` : '',
    data.role ? `TITLE:${esc(data.role)}` : '',
    data.email ? `EMAIL;TYPE=INTERNET:${esc(data.email)}` : '',
    data.phone ? `TEL;TYPE=CELL:${esc(data.phone)}` : '',
    data.branch ? `ADR:;;${esc(data.branch)};;;;` : '',
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\n');
}

function downloadVCard(data: CardData) {
  try {
    const blob = new Blob([buildVCard(data)], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(data.name || 'contact').replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch {
    /* swallow */
  }
}

export function CardPublicPage({ publicUrl }: CardPublicPageProps) {
  const { language, setLanguage } = useLanguage();
  const [card, setCard] = useState<CardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setUnavailable(false);
    (async () => {
      try {
        const data = await getJSON<CardResponse>(`/cards/${encodeURIComponent(publicUrl)}`);
        if (cancelled) return;
        setCard(data);
        // Fire-and-forget tracking — never block render.
        try {
          await postJSON(`/cards/${encodeURIComponent(publicUrl)}/track`, {
            interaction_type: 'view',
            source: detectSource(),
          });
        } catch {
          /* swallow */
        }
      } catch {
        if (!cancelled) setUnavailable(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [publicUrl]);

  const data: CardData = card?.card_data_json ?? {};
  const initials = useMemo(() => initialsFrom(data.name), [data.name]);
  const waLink = data.phone ? `https://wa.me/${waNumber(data.phone)}` : null;

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/card/${publicUrl}`
      : `/card/${publicUrl}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 1500);
    } catch {
      /* swallow */
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] antialiased relative overflow-hidden">
      {/* Animated ambient gradient — mirrors Hero */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
          className="absolute top-1/4 -start-1/4 w-1/2 h-1/2 bg-cyan-500/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
          className="absolute bottom-0 -end-1/4 w-1/2 h-1/2 bg-blue-600/20 rounded-full blur-[140px]"
        />
      </div>

      {/* Minimal header */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur-xl bg-[#0a0e27]/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <a
            href="/"
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm group"
            aria-label={language === 'ar' ? 'العودة إلى الرئيسية' : 'Back to home'}
          >
            <ArrowLeft className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''} transition-transform group-hover:-translate-x-0.5`} />
            <span className={language === 'ar' ? 'font-cairo-body' : ''}>
              {language === 'ar' ? 'iD+' : 'iD+'}
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
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          </div>
        ) : unavailable || !card ? (
          <UnavailableState language={language} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-[#1a1f3a]/70 border border-cyan-500/25 backdrop-blur-md p-6 sm:p-10 shadow-[0_20px_60px_rgba(6,182,212,0.15)] overflow-hidden relative"
          >
            {/* Top inner glow */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[420px] h-[200px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

            {/* Avatar + name */}
            <div className="relative flex flex-col items-center text-center">
              <div className="relative mb-5">
                <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-40 rounded-full" />
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-700 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.45)] border-2 border-cyan-300/40">
                  <span className="text-white text-3xl sm:text-4xl font-bold tracking-wide">{initials}</span>
                </div>
              </div>

              <h1 className={`text-2xl sm:text-3xl font-bold text-white ${language === 'ar' ? 'font-cairo-display' : ''}`}>
                {data.name || (language === 'ar' ? 'اسم غير متوفر' : 'Name unavailable')}
              </h1>
              {data.role && (
                <p className={`mt-1 text-cyan-300 text-sm sm:text-base ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                  {data.role}
                </p>
              )}

              {(data.company || data.branch || data.department) && (
                <div className={`mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-gray-400 ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                  {data.company && (
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      {data.company}
                    </span>
                  )}
                  {data.branch && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {data.branch}
                    </span>
                  )}
                  {data.department && (
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                      {data.department}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Contact buttons */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {data.email && (
                <ContactButton
                  href={`mailto:${data.email}`}
                  icon={<Mail className="w-4 h-4" />}
                  label={language === 'ar' ? 'البريد' : 'Email'}
                />
              )}
              {data.phone && (
                <ContactButton
                  href={`tel:${data.phone.replace(/\s+/g, '')}`}
                  icon={<Phone className="w-4 h-4" />}
                  label={language === 'ar' ? 'اتصال' : 'Call'}
                />
              )}
              {waLink && (
                <ContactButton
                  href={waLink}
                  external
                  icon={<MessageCircle className="w-4 h-4" />}
                  label={language === 'ar' ? 'واتساب' : 'WhatsApp'}
                />
              )}
            </div>

            {/* Share / Public URL block (QR placeholder until qrcode.react is added) */}
            {/* TODO: Render an actual animated QR with `qrcode.react` once it's added to deps. */}
            <div className="mt-8 p-5 rounded-2xl bg-[#0a0e27]/70 border border-cyan-500/15">
              <p className={`text-xs uppercase tracking-wider text-cyan-400/80 mb-2 ${language === 'ar' ? 'font-cairo-body' : ''}`}>
                {language === 'ar' ? 'رابط البطاقة' : 'Card link'}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <code className="flex-1 min-w-0 truncate text-xs sm:text-sm text-cyan-100 bg-black/30 border border-cyan-500/20 rounded-lg px-3 py-2 font-mono">
                  {shareUrl}
                </code>
                <button
                  onClick={copyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 hover:text-white transition-all text-sm"
                  aria-label={language === 'ar' ? 'نسخ الرابط' : 'Copy link'}
                >
                  {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className={language === 'ar' ? 'font-cairo-body' : ''}>
                    {linkCopied
                      ? language === 'ar'
                        ? 'تم النسخ'
                        : 'Copied'
                      : language === 'ar'
                        ? 'نسخ'
                        : 'Copy'}
                  </span>
                </button>
              </div>
            </div>

            {/* Add-to-contacts CTA */}
            <div className="mt-6 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(6,182,212,0.45)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => downloadVCard(data)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/30 transition-all"
              >
                <Download className="w-4 h-4" />
                <span className={language === 'ar' ? 'font-cairo-body' : ''}>
                  {language === 'ar' ? 'إضافة إلى جهات الاتصال' : 'Add to contacts'}
                </span>
              </motion.button>
            </div>

            <p className={`mt-8 text-center text-xs text-gray-500 ${language === 'ar' ? 'font-cairo-body' : ''}`}>
              {language === 'ar' ? 'مدعومة بواسطة iD+ by Mhawer' : 'Powered by iD+ by Mhawer'}
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}

function ContactButton({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(6,182,212,0.25)' }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0a0e27]/70 border border-cyan-500/25 text-cyan-200 hover:text-white hover:border-cyan-500/55 transition-all text-sm font-medium"
    >
      <span className="text-cyan-400">{icon}</span>
      {label}
    </motion.a>
  );
}

function UnavailableState({ language }: { language: 'en' | 'ar' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-[#1a1f3a]/70 border border-cyan-500/15 p-10 sm:p-14 text-center backdrop-blur-md"
    >
      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
        <span className="text-cyan-400 text-2xl">!</span>
      </div>
      <h2 className={`text-xl sm:text-2xl font-bold text-white mb-2 ${language === 'ar' ? 'font-cairo-display' : ''}`}>
        {language === 'ar' ? 'البطاقة غير متاحة' : 'Card unavailable'}
      </h2>
      <p className={`text-gray-400 max-w-md mx-auto ${language === 'ar' ? 'font-cairo-body' : ''}`}>
        {language === 'ar'
          ? 'لم نعثر على هذه البطاقة، أو ربما لم تعد متاحة. يرجى التأكد من الرابط أو التواصل مع صاحب البطاقة.'
          : 'This card is no longer available. The link may have expired or the card may have been removed.'}
      </p>
      <a
        href="/"
        className="inline-block mt-6 px-5 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 hover:text-white transition-all text-sm font-semibold"
      >
        {language === 'ar' ? 'العودة إلى الرئيسية' : 'Back to home'}
      </a>
    </motion.div>
  );
}
