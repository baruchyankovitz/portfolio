"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import SectionHeading from "./SectionHeading";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="relative px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={t.contact.title} subtitle={t.contact.subtitle} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Email */}
          <motion.a
            variants={itemVariants}
            whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.12)" }}
            href="mailto:baruchyankovitz@gmail.com"
            className="flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all duration-300"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-lg font-bold text-white">
              @
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)]">{t.contact.email}</p>
              <p className="text-sm font-medium text-white">baruchyankovitz@gmail.com</p>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.a
            variants={itemVariants}
            whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.12)" }}
            href="tel:+972556782035"
            className="flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all duration-300"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-lg">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)]">{t.contact.phone}</p>
              <p className="text-sm font-medium text-white">055-678-2035</p>
            </div>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            variants={itemVariants}
            whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.12)" }}
            href="https://wa.me/972556782035"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all duration-300"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-green-600 text-lg">
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)]">{t.contact.whatsapp}</p>
              <p className="text-sm font-medium text-white">WhatsApp</p>
            </div>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            variants={itemVariants}
            whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.12)" }}
            href="https://www.linkedin.com/in/baruch-yankovitz/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all duration-300"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-lg font-bold text-white">
              in
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)]">LinkedIn</p>
              <p className="text-sm font-medium text-white">Baruch Yankovitz</p>
            </div>
          </motion.a>

          {/* GitHub */}
          <motion.a
            variants={itemVariants}
            whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.12)" }}
            href="https://github.com/baruchyankovitz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all duration-300"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-600 to-gray-800">
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)]">GitHub</p>
              <p className="text-sm font-medium text-white">baruchyankovitz</p>
            </div>
          </motion.a>

          {/* Download CV */}
          <motion.a
            variants={itemVariants}
            whileHover={{ y: -4, borderColor: "rgba(0,212,255,0.3)" }}
            href="/cv/baruch-yankovitz-cv.pdf"
            download
            className="flex items-center gap-4 rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/[0.05] p-5 transition-all duration-300"
          >
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-blue-500">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[var(--color-accent)]">{t.contact.cv}</p>
              <p className="text-sm font-medium text-white">PDF</p>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
