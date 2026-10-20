"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl font-bold sm:text-5xl">
      <span className="bg-gradient-to-r from-[#00d4ff] to-[#a855f7] bg-clip-text text-transparent">
        {count}
        {suffix}
      </span>
    </div>
  );
}

const stats = [
  { value: 8, suffix: "+", label: { en: "Production Systems", he: "\u05de\u05e2\u05e8\u05db\u05d5\u05ea \u05d1\u05e4\u05e8\u05d5\u05d3\u05e7\u05e9\u05df" } },
  { value: 12, suffix: "+", label: { en: "Technologies", he: "\u05d8\u05db\u05e0\u05d5\u05dc\u05d5\u05d2\u05d9\u05d5\u05ea" } },
  { value: 6, suffix: "", label: { en: "Languages", he: "\u05e9\u05e4\u05d5\u05ea \u05ea\u05db\u05e0\u05d5\u05ea" } },
  { value: 50, suffix: "K+", label: { en: "Lines of Code", he: "\u05e9\u05d5\u05e8\u05d5\u05ea \u05e7\u05d5\u05d3" } },
];

export default function Stats() {
  const { lang } = useLanguage();

  return (
    <section className="relative px-6 py-16 sm:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl"
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-gray-300">{stat.label[lang]}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
