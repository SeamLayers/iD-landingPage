import { lazy, Suspense, useMemo } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero-arabic";
import { Footer } from "./components/footer";

// Lazy load components below the fold for better initial load performance
const LogoMarquee = lazy(() =>
  import("./components/logo-marquee").then((m) => ({ default: m.LogoMarquee }))
);
const BentoFeatures = lazy(() =>
  import("./components/bento-features").then((m) => ({ default: m.BentoFeatures }))
);
const HowItWorks = lazy(() =>
  import("./components/how-it-works").then((m) => ({ default: m.HowItWorks }))
);
const SecuritySection = lazy(() =>
  import("./components/security-section").then((m) => ({ default: m.SecuritySection }))
);
const FinalCTA = lazy(() =>
  import("./components/final-cta").then((m) => ({ default: m.FinalCTA }))
);

// Lazy-loaded sub-routes (small bundles, only fetched when needed).
const LegalPage = lazy(() =>
  import("./components/legal-page").then((m) => ({ default: m.LegalPage }))
);
const CardPublicPage = lazy(() =>
  import("./components/card-public-page").then((m) => ({ default: m.CardPublicPage }))
);

// Loading skeleton component
function SectionLoader() {
  return (
    <div className="py-24 px-6 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  );
}

function FullPageLoader() {
  return (
    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  );
}

import { LanguageProvider } from "./context/LanguageContext";
import { ConstantsProvider } from "./context/ConstantsContext";

type Route =
  | { kind: 'home' }
  | { kind: 'privacy' }
  | { kind: 'terms' }
  | { kind: 'card'; publicUrl: string };

function detectRoute(): Route {
  if (typeof window === 'undefined') return { kind: 'home' };
  // Use raw pathname; trim trailing slashes; lowercase for comparison.
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  if (path === '/privacy' || path === '/privacy-policy') return { kind: 'privacy' };
  if (path === '/terms' || path === '/terms-conditions' || path === '/terms-of-service') {
    return { kind: 'terms' };
  }
  // /card/:publicUrl  — case-preserving slug (the URL is base62-ish, keep original casing)
  const rawPath = window.location.pathname.replace(/\/+$/, '');
  const cardMatch = rawPath.match(/^\/card\/([^/?#]+)/i);
  if (cardMatch) {
    return { kind: 'card', publicUrl: decodeURIComponent(cardMatch[1]) };
  }
  return { kind: 'home' };
}

function LandingHome() {
  return (
    <div className="min-h-screen bg-[#0a0e27] antialiased" style={{ position: 'relative' }}>
      <Navbar />
      <main style={{ position: 'relative' }}>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <LogoMarquee />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <BentoFeatures />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SecuritySection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <FinalCTA />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  // Detect route once per mount. Browser navigations to `/privacy`, `/terms`,
  // or `/card/...` will hit a fresh document on this static site, so a one-shot
  // read of window.location is fine — no need to subscribe to popstate.
  const route = useMemo(detectRoute, []);

  return (
    <LanguageProvider>
      <ConstantsProvider>
        <ErrorBoundary>
          {route.kind === 'home' && <LandingHome />}
          {route.kind === 'privacy' && (
            <Suspense fallback={<FullPageLoader />}>
              <LegalPage path="privacy-policy" />
            </Suspense>
          )}
          {route.kind === 'terms' && (
            <Suspense fallback={<FullPageLoader />}>
              <LegalPage path="terms-conditions" />
            </Suspense>
          )}
          {route.kind === 'card' && (
            <Suspense fallback={<FullPageLoader />}>
              <CardPublicPage publicUrl={route.publicUrl} />
            </Suspense>
          )}
        </ErrorBoundary>
      </ConstantsProvider>
    </LanguageProvider>
  );
}
