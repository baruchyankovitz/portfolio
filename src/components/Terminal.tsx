"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const COMMANDS: Record<string, { en: string; he: string }> = {
  help: {
    en: `Available commands:
  about     - Who am I
  skills    - Tech stack
  projects  - What I've built
  contact   - How to reach me
  experience - Work background
  hire      - Why hire me
  clear     - Clear terminal
  cat ascii - Show ASCII art`,
    he: `פקודות זמינות:
  about     - מי אני
  skills    - טכנולוגיות
  projects  - מה בניתי
  contact   - איך ליצור קשר
  experience - ניסיון
  hire      - למה לגייס אותי
  clear     - נקה טרמינל
  cat ascii - ASCII art`,
  },
  about: {
    en: `> Baruch Yankovitz
  Backend developer who builds production-grade systems.
  Specializing in Node.js, TypeScript, and AI solutions.
  I don't just write code — I engineer products that solve real problems.`,
    he: `> ברוך ינקוביץ
  מפתח בק-אנד שבונה מערכות ברמת פרודקשן.
  מתמחה ב-Node.js, TypeScript ופתרונות AI.
  אני לא סתם כותב קוד — אני מהנדס מוצרים שפותרים בעיות אמיתיות.`,
  },
  skills: {
    en: `> Tech Stack:
  Backend:   Node.js | Express | Next.js | REST | WebSocket
  Frontend:  React | TypeScript | Tailwind | Redux
  Database:  MongoDB | PostgreSQL | Prisma | Redis
  DevOps:    Docker | Git | Vercel | CI/CD
  AI/ML:     LangChain | Claude API | Gemini | Ollama | RAG
  Languages: JS | TS | Python | Java | C# | SQL`,
    he: `> טכנולוגיות:
  Backend:   Node.js | Express | Next.js | REST | WebSocket
  Frontend:  React | TypeScript | Tailwind | Redux
  Database:  MongoDB | PostgreSQL | Prisma | Redis
  DevOps:    Docker | Git | Vercel | CI/CD
  AI/ML:     LangChain | Claude API | Gemini | Ollama | RAG
  Languages: JS | TS | Python | Java | C# | SQL`,
  },
  projects: {
    en: `> Featured Projects:
  [1] MailFlow      — Email marketing, learning project, not launched (Next.js, Stripe)
  [2] Light         — In-store dimmability testing app (Base44)
  [3] Synagogue     — Full-stack platform, sold to a client (React, Node.js, MongoDB)
  [4] DailyRecorder — AI audio transcription (Python, WhatsApp)`,
    he: `> פרויקטים נבחרים:
  [1] MailFlow      — שיווק במייל, פרויקט לימוד, לא הושק (Next.js, Stripe)
  [2] Light         — אפליקציה לבדיקת עמעום בחנויות (Base44)
  [3] Synagogue     — מערכת Full Stack שנמכרה ללקוח (React, Node.js, MongoDB)
  [4] DailyRecorder — תמלול AI (Python, WhatsApp)`,
  },
  contact: {
    en: `> Contact Info:
  Email:    baruchyankovitz@gmail.com
  Phone:    055-678-2035
  GitHub:   github.com/baruchyankovitz
  LinkedIn: linkedin.com/in/baruch-yankovitz`,
    he: `> פרטי קשר:
  אימייל:   baruchyankovitz@gmail.com
  טלפון:    055-678-2035
  GitHub:   github.com/baruchyankovitz
  LinkedIn: linkedin.com/in/baruch-yankovitz`,
  },
  experience: {
    en: `> Experience:
  Full-stack development with focus on backend architecture.
  Built 8+ production systems across multiple domains:
  - Platforms with payment integration
  - Real-time systems with WebSocket
  - AI-powered automation tools
  - Containerized services with Docker`,
    he: `> ניסיון:
  פיתוח פול-סטאק עם התמקדות בארכיטקטורת בק-אנד.
  בניתי 8+ מערכות פרודקשן במגוון תחומים:
  - פלטפורמות עם אינטגרציית תשלומים
  - מערכות real-time עם WebSocket
  - כלי אוטומציה מבוססי AI
  - שירותים בקונטיינרים עם Docker`,
  },
  hire: {
    en: `> Why hire me?
  ✓ I ship complete products, not just features
  ✓ Backend-first thinking with full-stack capability
  ✓ AI/ML integration experience (not just buzzwords)
  ✓ Self-learner who picks up new tech fast
  ✓ I build things that actually work in production

  Ready to talk? → baruchyankovitz@gmail.com`,
    he: `> למה לגייס אותי?
  ✓ אני משחרר מוצרים שלמים, לא רק פיצ'רים
  ✓ חשיבה backend-first עם יכולת פול-סטאק
  ✓ ניסיון באינטגרציית AI/ML (לא רק באזוורדס)
  ✓ לומד עצמי שמתפקד מהר עם טכנולוגיות חדשות
  ✓ אני בונה דברים שבאמת עובדים בפרודקשן

  מוכנים לדבר? → baruchyankovitz@gmail.com`,
  },
  "cat ascii": {
    en: `
  ____                   _
 | __ )  __ _ _ __ _   _| | __
 |  _ \\ / _\` | '__| | | | |/ /
 | |_) | (_| | |  | |_| |   <
 |____/ \\__,_|_|   \\__,_|_|\\_\\

   Backend Developer & AI Builder`,
    he: `
  ____                   _
 | __ )  __ _ _ __ _   _| | __
 |  _ \\ / _\` | '__| | | | |/ /
 | |_) | (_| | |  | |_| |   <
 |____/ \\__,_|_|   \\__,_|_|\\_\\

   מפתח בק-אנד ובונה AI`,
  },
};

interface Line {
  type: "input" | "output";
  text: string;
}

export default function Terminal() {
  const { lang } = useLanguage();
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    {
      type: "output",
      text:
        lang === "en"
          ? '> Welcome! Type "help" to see available commands.'
          : '> !ברוכים הבאים! הקלידו "help" לרשימת פקודות',
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newLines: Line[] = [
      ...lines,
      { type: "input", text: `$ ${input}` },
    ];

    if (cmd === "clear") {
      setLines([]);
    } else if (cmd in COMMANDS) {
      newLines.push({
        type: "output",
        text: COMMANDS[cmd][lang],
      });
      setLines(newLines);
    } else {
      newLines.push({
        type: "output",
        text:
          lang === "en"
            ? `Command not found: ${cmd}. Type "help" for available commands.`
            : `פקודה לא נמצאה: ${cmd}. הקלידו "help" לרשימת פקודות.`,
      });
      setLines(newLines);
    }

    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <section className="relative px-6 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-white/20 bg-gray-900/80 shadow-2xl shadow-purple-500/10 backdrop-blur-xl"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-gray-800/50 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-3 text-xs text-gray-400 font-mono">
              baruch@portfolio ~ %
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            className="h-[320px] overflow-y-auto p-4 font-mono text-sm"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <div
                key={i}
                className={`mb-1 whitespace-pre-wrap ${
                  line.type === "input"
                    ? "text-green-400"
                    : "text-gray-300"
                }`}
              >
                {line.text}
              </div>
            ))}

            {/* Input line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-green-400">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-green-400 caret-green-400 outline-none placeholder:text-gray-600"
                placeholder={lang === "en" ? 'type "help"...' : '"help" הקלידו...'}
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
