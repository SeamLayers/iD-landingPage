import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getJSON } from '../../utils/api';

type ConstantsMap = Record<string, string>;

interface ConstantRow {
  id?: number;
  key: string;
  value: string;
}

interface ConstantsContextValue {
  constants: ConstantsMap;
  loading: boolean;
}

// Minimal fallback so the page never renders empty when /global-constants is down.
const FALLBACK_CONSTANTS: ConstantsMap = {
  app_name: 'iD+ by Mhawer',
  app_version: '1.0.0',
};

const ConstantsContext = createContext<ConstantsContextValue>({
  constants: FALLBACK_CONSTANTS,
  loading: true,
});

export function ConstantsProvider({ children }: { children: ReactNode }) {
  const [constants, setConstants] = useState<ConstantsMap>(FALLBACK_CONSTANTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await getJSON<ConstantRow[]>('/global-constants');
        if (cancelled) return;
        if (Array.isArray(rows)) {
          const map: ConstantsMap = { ...FALLBACK_CONSTANTS };
          for (const r of rows) {
            if (!r?.key) continue;
            map[r.key.replace(/^constants_/, '')] = String(r.value ?? '');
          }
          setConstants(map);
        }
      } catch {
        // Silent — fallback already in place.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ constants, loading }), [constants, loading]);
  return <ConstantsContext.Provider value={value}>{children}</ConstantsContext.Provider>;
}

export function useConstants() {
  return useContext(ConstantsContext);
}
