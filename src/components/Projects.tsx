"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { projects, type ProjectCategory } from "@/lib/projects";
import SectionHeading from "./SectionHeading";

type FilterKey = "all" | ProjectCategory;

const filterKeys: FilterKey[] = ["all", "ai", "fullstack", "backend", "frontend"];

const filterI18nMap: Record<FilterKey, keyof typeof import("@/lib/i18n").translations.en.projects> = {
  all: "filterAll",
  ai: "filterAI",
  fullstack: "filterFullstack",
  backend: "filterBackend",
  frontend: "filterFrontend",
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Projects() {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t.projects.title} subtitle={t.projects.subtitle} />

        {/* Filter tabs */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {filterKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                activeFilter === key
                  ? "bg-white text-black"
                  : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-white"
              }`}
            >
              {t.projects[filterI18nMap[key]]}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.12)" }}
                className={`group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] transition-all duration-300 ${
                  project.featured ? "md:col-span-2" : ""
                }`}
              >
                {/* Gradient header */}
                <div
                  className={`flex items-center justify-center bg-gradient-to-r ${project.gradient} ${
                    project.featured ? "h-36" : "h-28"
                  } opacity-80`}
                >
                  <span className={project.featured ? "text-6xl" : "text-5xl"}>
                    {project.icon}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {project.title[lang]}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {project.description[lang]}
                  </p>

                  {/* Tech badges */}
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-white/[0.04]"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        {t.projects.viewCode}
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
                      >
                        {t.projects.liveDemo}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
