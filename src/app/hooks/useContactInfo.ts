import { useEffect, useState } from 'react';
import { getJSON } from '../../utils/api';

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
}

// Bundled fallback so the footer always renders something.
const FALLBACK_CONTACT: ContactInfo = {
  email: 'support@idplus.cfd',
  phone: '+966500000000',
  whatsapp: '+966500000000',
  address: 'Riyadh, Saudi Arabia',
};

export function useContactInfo() {
  const [data, setData] = useState<ContactInfo>(FALLBACK_CONTACT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const remote = await getJSON<Partial<ContactInfo>>('/contact-us');
        if (cancelled || !remote) return;
        setData({
          email: remote.email || FALLBACK_CONTACT.email,
          phone: remote.phone || FALLBACK_CONTACT.phone,
          whatsapp: remote.whatsapp || FALLBACK_CONTACT.whatsapp,
          address: remote.address || FALLBACK_CONTACT.address,
        });
      } catch {
        // Fall back silently.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { contact: data, loading };
}

/** Strip non-digit chars before building wa.me URLs. */
export function waNumber(value: string): string {
  return (value || '').replace(/\D+/g, '');
}
