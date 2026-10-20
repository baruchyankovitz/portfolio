"use client";

import { useLanguage } from "@/hooks/useLanguage";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="mb-2 text-lg font-bold text-white">Baruch Yankovitz</p>
            <p className="text-sm text-[var(--color-text-muted)]">
              Full Stack Developer & AI Solutions
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              {t.nav.about === "About" ? "Navigation" : "\u05e0\u05d9\u05d5\u05d5\u05d8"}
            </p>
            <div className="flex flex-col gap-2">
              {(["about", "experience", "skills", "projects", "contact"] as const).map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-white"
                  >
                    {t.nav[item]}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              {t.nav.contact === "Contact" ? "Connect" : "\u05e7\u05e9\u05e8"}
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/baruchyankovitz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-white"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/baruch-yankovitz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="https://wa.me/972556782035"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-white"
              >
                WhatsApp
              </a>
              <a
                href="mailto:baruchyankovitz@gmail.com"
                className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-white"
              >
                baruchyankovitz@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-[var(--color-border)] pt-6 text-center">
          <p className="text-xs text-[var(--color-text-muted)]">{t.footer.built}</p>
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} Baruch Yankovitz. {t.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}
