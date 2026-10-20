"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Lang, translations } from "@/lib/i18n";
import { LanguageContext } from "@/hooks/useLanguage";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  // Restore the saved language on first load (falls back to browser language).
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("lang");
      if (stored === "en" || stored === "he") {
        setLangState(stored);
      } else if (navigator.language?.toLowerCase().startsWith("he")) {
        setLangState("he");
      }
    } catch {
      /* localStorage unavailable — keep default */
    }
  }, []);

  // Persist the choice and keep the <html> lang/dir in sync for a11y + SEO.
  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang]);

  const contextValue = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang],
    }),
    [lang, setLang]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      <div dir={lang === "he" ? "rtl" : "ltr"} className="relative min-h-screen">
        {mounted && <ParticleFieldLazy />}
        {mounted && <MouseGlow />}

        <div className="relative z-10">
          <Navigation />
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </div>

        {mounted && <ChatWidget />}
      </div>
    </LanguageContext.Provider>
  );
}

function ParticleFieldLazy() {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    import("@/components/ParticleField").then((mod) => {
      setComponent(() => mod.default);
    });
  }, []);

  if (!Component) return null;
  return <Component />;
}
