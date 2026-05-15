/**
 * Thin fetch wrapper for the ID-Platform public API.
 *
 * - Reads BASE_URL from `import.meta.env.VITE_API_URL` with a hard-coded fallback.
 * - Auto-sets `Accept: application/json` and `Accept-Language` from `<html lang>`.
 * - Throws `Error(humanMessage)` on `success === false` or non-2xx.
 * - Returns the `data` from the envelope so callers can ignore the wrapper shape.
 */

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const FALLBACK_BASE = 'https://idplus.cfd/ID-platform/api/v1';

export const BASE_URL: string =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || FALLBACK_BASE;

type Envelope<T> = {
  success?: boolean;
  message?: string | null;
  data?: T;
  errors?: Record<string, string[] | string> | null;
};

interface JSONOpts {
  /** Override `Accept-Language` (default reads `document.documentElement.lang`). */
  lang?: string;
  /** Extra headers merged on top of the defaults. */
  headers?: Record<string, string>;
  /** Optional AbortSignal. */
  signal?: AbortSignal;
}

function resolveLang(opts?: JSONOpts): string {
  if (opts?.lang) return opts.lang;
  if (typeof document !== 'undefined') {
    const docLang = document.documentElement.getAttribute('lang');
    if (docLang) return docLang;
  }
  return 'en';
}

function humanError(body: Envelope<unknown> | null, status: number): string {
  if (body?.errors) {
    const firstKey = Object.keys(body.errors)[0];
    const firstVal = firstKey ? body.errors[firstKey] : undefined;
    if (Array.isArray(firstVal) && firstVal.length) return firstVal[0];
    if (typeof firstVal === 'string') return firstVal;
  }
  if (body?.message) return body.message;
  return `Request failed (${status})`;
}

function buildHeaders(opts?: JSONOpts, body?: unknown): Headers {
  const h = new Headers({
    Accept: 'application/json',
    'Accept-Language': resolveLang(opts),
  });
  if (body !== undefined) {
    h.set('Content-Type', 'application/json');
  }
  if (opts?.headers) {
    for (const [k, v] of Object.entries(opts.headers)) h.set(k, v);
  }
  return h;
}

async function readEnvelope<T>(res: Response): Promise<Envelope<T> | null> {
  try {
    return (await res.json()) as Envelope<T>;
  } catch {
    return null;
  }
}

export async function getJSON<T>(path: string, opts?: JSONOpts): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: buildHeaders(opts),
    signal: opts?.signal,
  });
  const body = await readEnvelope<T>(res);
  if (!res.ok || body?.success === false) {
    throw new Error(humanError(body, res.status));
  }
  return (body?.data as T) ?? (body as unknown as T);
}

export async function postJSON<T>(
  path: string,
  body: unknown,
  opts?: JSONOpts
): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: buildHeaders(opts, body),
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: opts?.signal,
  });
  const env = await readEnvelope<T>(res);
  if (!res.ok || env?.success === false) {
    throw new Error(humanError(env, res.status));
  }
  return (env?.data as T) ?? (env as unknown as T);
}
