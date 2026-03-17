import { useEffect, lazy, Suspense } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero-arabic";
import { Footer } from "./components/footer";
import { usePerformanceMonitoring } from "./hooks/usePerformanceMonitoring";

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

// Loading skeleton component
function SectionLoader() {
  return (
    <div className="py-24 px-6 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
  );
}

import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </LanguageProvider>
  );
}