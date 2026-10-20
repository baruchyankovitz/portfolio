"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { experience } from "@/lib/projects";
import SectionHeading from "./SectionHeading";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Experience() {
  const { lang, t } = useLanguage();

  return (
    <section id="experience" className="relative px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={t.experience.title} subtitle={t.experience.subtitle} />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 hidden w-px bg-[var(--color-border)] md:block ltr:left-1/2 rtl:right-1/2" />

          {experience.map((entry, i) => {
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className={`relative mb-12 last:mb-0 md:flex md:items-start ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute top-6 hidden md:block ltr:left-1/2 rtl:right-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2">
                  <div
                    className={`h-3 w-3 rounded-full border-2 border-[var(--color-card)] ${
                      entry.current
                        ? "bg-[var(--color-accent)] pulse-dot"
                        : "bg-[var(--color-text-muted)]"
                    }`}
                  />
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden w-1/2 md:block" />

                {/* Card */}
                <div
                  className={`w-full md:w-1/2 ${
                    isLeft ? "md:ltr:pr-12 md:rtl:pl-12" : "md:ltr:pl-12 md:rtl:pr-12"
                  }`}
                >
                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all duration-300 hover:border-[var(--color-border-hover)]">
                    {/* Period badge */}
                    <div className="mb-3 inline-flex items-center gap-2">
                      {entry.current && (
                        <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] pulse-dot" />
                      )}
                      <span className="text-xs font-medium text-[var(--color-accent)]">
                        {entry.period[lang]}
                      </span>
                    </div>

                    {/* Company & Role */}
                    <h3 className="mb-1 text-lg font-semibold text-white">
                      {entry.company[lang]}
                    </h3>
                    <p className="mb-3 text-sm text-[var(--color-text-secondary)]">
                      {entry.role[lang]}
                    </p>

                    {/* Description */}
                    <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {entry.description[lang]}
                    </p>

                    {/* Tech pills */}
                    {entry.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-text-secondary)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
