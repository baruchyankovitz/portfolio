"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import SectionHeading from "./SectionHeading";

const highlights = [
  { key: "highlight1" as const, icon: ">_", color: "from-blue-500 to-cyan-500" },
  { key: "highlight2" as const, icon: "\u2699", color: "from-purple-500 to-pink-500" },
  { key: "highlight3" as const, icon: "\u2191", color: "from-amber-500 to-orange-500" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={t.about.title} />

        {/* Bio with photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="mb-16 flex flex-col items-center gap-8 md:flex-row"
        >
          {/* Monogram */}
          <div className="flex-shrink-0">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-accent)]/25 to-[var(--color-accent-2)]/25 text-5xl font-bold tracking-tight text-white md:h-44 md:w-44">
              BY
            </div>
          </div>

          {/* Bio text */}
          <p className="max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
            {t.about.description}
          </p>
        </motion.div>

        {/* Highlight cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {highlights.map(({ key, icon, color }) => (
            <motion.div
              key={key}
              variants={cardVariants}
              whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.12)" }}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all duration-300"
            >
              <div
                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-lg font-bold text-white`}
              >
                {icon}
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">
                {t.about[key]}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {t.about[`${key}desc`]}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
