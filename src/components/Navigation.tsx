"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const navItems = ["about", "experience", "skills", "projects", "contact"] as const;

export default function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    const sections = navItems.map((id) => document.getElementById(id));
    let current = "";
    for (const section of sections) {
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120) {
          current = section.id;
        }
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <nav
      dir={dir}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-2xl border-b border-[var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-xl font-bold text-white transition-colors duration-300 hover:text-[var(--color-accent)]"
        >
          B.Y.
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={`relative text-sm font-medium transition-colors duration-200 ${
                activeSection === item
                  ? "text-white"
                  : "text-[var(--color-text-secondary)] hover:text-white"
              }`}
            >
              {t.nav[item]}
              {activeSection === item && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--color-accent)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}

          {/* Download CV */}
          <a
            href="/cv/baruch-yankovitz-cv.pdf"
            download
            className="rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-accent)]/20 hover:border-[var(--color-accent)]/50"
          >
            {t.nav.cv}
          </a>

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "he" : "en")}
            className="rounded-full border border-[var(--color-border-hover)] px-3 py-1.5 text-xs font-bold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/5"
          >
            {lang === "en" ? "\u05e2\u05d1" : "EN"}
          </button>
        </div>

        {/* Mobile: language toggle + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setLang(lang === "en" ? "he" : "en")}
            className="rounded-full border border-[var(--color-border-hover)] px-3 py-1.5 text-xs font-bold text-white"
          >
            {lang === "en" ? "\u05e2\u05d1" : "EN"}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col items-center justify-center gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-white"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-6 bg-white"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-white"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-b border-[var(--color-border)] bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    lang === "he" ? "text-right" : "text-left"
                  } ${
                    activeSection === item
                      ? "bg-white/5 text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {t.nav[item]}
                </button>
              ))}
              <a
                href="/cv/baruch-yankovitz-cv.pdf"
                download
                className="mt-2 rounded-lg bg-[var(--color-accent)]/10 px-4 py-3 text-center text-sm font-semibold text-[var(--color-accent)]"
              >
                {t.nav.cv}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
