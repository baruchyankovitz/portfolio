export type ProjectCategory = "ai" | "fullstack" | "backend" | "frontend";

export interface Project {
  id: string;
  title: { en: string; he: string };
  description: { en: string; he: string };
  tech: string[];
  github?: string;
  live?: string;
  gradient: string;
  icon: string;
  category: ProjectCategory;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "lightstory-ai",
    title: {
      en: "Light Story \u2014 AI Video Pipeline",
      he: "Light Story \u2014 \u05e6\u05d9\u05e0\u05d5\u05e8 \u05d5\u05d9\u05d3\u05d0\u05d5 AI",
    },
    description: {
      en: "End-to-end automated AI video generation system for a Shopify lighting store. Generates product videos with Kling AI, includes a Flask-based review interface for manual approval, and uploads approved videos to Shopify via GraphQL API with custom metafields.",
      he: "\u05de\u05e2\u05e8\u05db\u05ea \u05d0\u05d5\u05d8\u05d5\u05de\u05d8\u05d9\u05ea \u05dc\u05d9\u05e6\u05d9\u05e8\u05ea \u05e1\u05e8\u05d8\u05d5\u05e0\u05d9 AI \u05dc\u05d7\u05e0\u05d5\u05ea Shopify \u05e9\u05dc \u05d2\u05d5\u05e4\u05d9 \u05ea\u05d0\u05d5\u05e8\u05d4. \u05db\u05d5\u05dc\u05dc\u05ea \u05de\u05de\u05e9\u05e7 \u05e1\u05e7\u05d9\u05e8\u05d4 \u05dc\u05d0\u05d9\u05e9\u05d5\u05e8 \u05d9\u05d3\u05e0\u05d9, \u05d9\u05d9\u05e6\u05d5\u05e8 \u05de\u05d7\u05d3\u05e9 \u05e2\u05dd \u05d4\u05e2\u05e8\u05d5\u05ea \u05de\u05e6\u05d8\u05d1\u05e8\u05d5\u05ea, \u05d5\u05d4\u05e2\u05dc\u05d0\u05d4 \u05dc-Shopify \u05d3\u05e8\u05da GraphQL API.",
    },
    tech: ["Python", "Flask", "Kling AI", "Shopify GraphQL", "Liquid"],
    gradient: "from-amber-500 to-orange-400",
    icon: "\u{1f4a1}",
    category: "ai",
    featured: true,
  },
  {
    id: "multi-agent-ads",
    title: {
      en: "Multi-Agent Ad Campaign Generator",
      he: "\u05de\u05d7\u05d5\u05dc\u05dc \u05e7\u05de\u05e4\u05d9\u05d9\u05e0\u05d9\u05dd \u05de\u05e8\u05d5\u05d1\u05d4 \u05e1\u05d5\u05db\u05e0\u05d9\u05dd",
    },
    description: {
      en: "A 7-agent AI pipeline (Orchestrator, Strategist, Copywriter, Creative, Image Generator, Image Reviewer, QA) that automatically generates complete Facebook ad campaigns. Includes real-time dashboard with Socket.io and costs ~$0.10 per campaign.",
      he: "\u05de\u05e2\u05e8\u05db\u05ea 7 \u05e1\u05d5\u05db\u05e0\u05d9 AI \u05d1\u05e9\u05e8\u05e9\u05e8\u05ea \u05e9\u05de\u05d9\u05d9\u05e6\u05e8\u05ea \u05e7\u05de\u05e4\u05d9\u05d9\u05e0\u05d9 \u05e4\u05e8\u05e1\u05d5\u05dd \u05dc\u05e4\u05d9\u05d9\u05e1\u05d1\u05d5\u05e7 \u05d0\u05d5\u05d8\u05d5\u05de\u05d8\u05d9\u05ea \u2014 \u05d8\u05e7\u05e1\u05d8, \u05d0\u05e1\u05d8\u05e8\u05d8\u05d2\u05d9\u05d4 \u05d5\u05ea\u05de\u05d5\u05e0\u05d5\u05ea. \u05db\u05d5\u05dc\u05dc \u05d3\u05e9\u05d1\u05d5\u05e8\u05d3 \u05d1\u05d6\u05de\u05df \u05d0\u05de\u05ea \u05d5\u05e2\u05d5\u05dc\u05d4 ~$0.10 \u05dc\u05e7\u05de\u05e4\u05d9\u05d9\u05df.",
    },
    tech: ["TypeScript", "Node.js", "Claude API", "Gemini API", "Socket.io", "Docker"],
    gradient: "from-purple-500 to-pink-400",
    icon: "\u{1f916}",
    category: "ai",
    featured: true,
  },
  {
    id: "everyonedj",
    title: {
      en: "EveryoneDJ \u2014 YouTube Audio Mixer",
      he: "EveryoneDJ \u2014 \u05de\u05d9\u05e7\u05e1\u05e8 \u05d0\u05d5\u05d3\u05d9\u05d5 \u05de\u05d9\u05d5\u05d8\u05d9\u05d5\u05d1",
    },
    description: {
      en: "Full-stack web app that lets users paste YouTube URLs, cut audio by timestamps, reorder clips with drag-and-drop, apply crossfade, and merge into a single MP3 megamix. Features project management and real-time progress via SSE.",
      he: "\u05d0\u05e4\u05dc\u05d9\u05e7\u05e6\u05d9\u05d4 \u05e9\u05de\u05d0\u05e4\u05e9\u05e8\u05ea \u05dc\u05d7\u05ea\u05d5\u05da \u05d0\u05d5\u05d3\u05d9\u05d5 \u05de\u05d9\u05d5\u05d8\u05d9\u05d5\u05d1, \u05dc\u05e1\u05d3\u05e8 \u05e7\u05dc\u05d9\u05e4\u05d9\u05dd \u05d1\u05d2\u05e8\u05d9\u05e8\u05d4, \u05dc\u05d4\u05d5\u05e1\u05d9\u05e3 crossfade \u05d5\u05dc\u05de\u05d6\u05d2 \u05dc-MP3 \u05d0\u05d7\u05d3. \u05db\u05d5\u05dc\u05dc \u05e0\u05d9\u05d4\u05d5\u05dc \u05e4\u05e8\u05d5\u05d9\u05e7\u05d8\u05d9\u05dd \u05d5\u05d4\u05ea\u05e7\u05d3\u05de\u05d5\u05ea \u05d1\u05d6\u05de\u05df \u05d0\u05de\u05ea.",
    },
    tech: ["TypeScript", "Node.js", "Express", "Docker", "ffmpeg", "yt-dlp"],
    gradient: "from-green-500 to-emerald-400",
    icon: "\u{1f3b5}",
    category: "fullstack",
  },
  {
    id: "mailflow",
    title: {
      en: "MailFlow \u2014 Email Marketing SaaS",
      he: "MailFlow \u2014 \u05e4\u05dc\u05d8\u05e4\u05d5\u05e8\u05de\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 \u05de\u05d9\u05d9\u05dc\u05d9\u05dd",
    },
    description: {
      en: "Full-stack email marketing platform with campaign management, CSV import, analytics dashboard, HMAC-signed unsubscribe tokens, and Stripe billing integration.",
      he: "\u05e4\u05dc\u05d8\u05e4\u05d5\u05e8\u05de\u05ea \u05e9\u05d9\u05d5\u05d5\u05e7 \u05de\u05d9\u05d9\u05dc\u05d9\u05dd \u05de\u05dc\u05d0\u05d4 \u05e2\u05dd \u05e0\u05d9\u05d4\u05d5\u05dc \u05e7\u05de\u05e4\u05d9\u05d9\u05e0\u05d9\u05dd, \u05d9\u05d9\u05d1\u05d5\u05d0 CSV, \u05d3\u05e9\u05d1\u05d5\u05e8\u05d3 \u05d0\u05e0\u05dc\u05d9\u05d8\u05d9\u05e7\u05e1, \u05d8\u05d5\u05e7\u05e0\u05d9 \u05d4\u05e1\u05e8\u05d4 \u05de\u05d0\u05d5\u05d1\u05d8\u05d7\u05d9\u05dd \u05d5\u05d0\u05d9\u05e0\u05d8\u05d2\u05e8\u05e6\u05d9\u05d9\u05ea \u05ea\u05e9\u05dc\u05d5\u05de\u05d9\u05dd \u05e2\u05dd Stripe.",
    },
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Resend"],
    gradient: "from-blue-500 to-cyan-400",
    icon: "\u2709\ufe0f",
    category: "fullstack",
  },
  {
    id: "daily-recorder",
    title: {
      en: "Daily Recorder \u2014 AI Transcription",
      he: "Daily Recorder \u2014 \u05ea\u05de\u05dc\u05d5\u05dc AI",
    },
    description: {
      en: "macOS daily audio recorder that captures full workday audio (9-17), transcribes with OpenAI Whisper, summarizes with Claude API, and sends automatic WhatsApp summaries. Runs via macOS LaunchAgent.",
      he: "\u05de\u05e2\u05e8\u05db\u05ea \u05d4\u05e7\u05dc\u05d8\u05ea \u05e9\u05de\u05e2 \u05d9\u05d5\u05de\u05d9\u05ea \u05d0\u05d5\u05d8\u05d5\u05de\u05d8\u05d9\u05ea \u05e2\u05dd \u05ea\u05de\u05dc\u05d5\u05dc Whisper, \u05e1\u05d9\u05db\u05d5\u05dd Claude \u05d5\u05e9\u05dc\u05d9\u05d7\u05ea \u05e1\u05d9\u05db\u05d5\u05dd \u05d0\u05d5\u05d8\u05d5\u05de\u05d8\u05d9\u05ea \u05d1-WhatsApp. \u05e8\u05e6\u05d4 \u05d3\u05e8\u05da LaunchAgent.",
    },
    tech: ["Python", "Whisper API", "Claude API", "Playwright", "LaunchAgent"],
    github: "https://github.com/baruchyankovitz/daily-recorder",
    gradient: "from-red-500 to-rose-400",
    icon: "\u{1f3a4}",
    category: "ai",
  },
  {
    id: "whatsapp-bot",
    title: {
      en: "WhatsApp Task Manager Bot",
      he: "\u05d1\u05d5\u05d8 \u05e0\u05d9\u05d4\u05d5\u05dc \u05de\u05e9\u05d9\u05de\u05d5\u05ea \u05d1\u05d5\u05d5\u05d0\u05d8\u05e1\u05d0\u05e4",
    },
    description: {
      en: "WhatsApp bot for team task management with role-based permissions, 6-state conversation state machine, and persistent JSON storage. Uses Playwright for WhatsApp Web automation.",
      he: "\u05d1\u05d5\u05d8 \u05d5\u05d5\u05d0\u05d8\u05e1\u05d0\u05e4 \u05dc\u05e0\u05d9\u05d4\u05d5\u05dc \u05de\u05e9\u05d9\u05de\u05d5\u05ea \u05e6\u05d5\u05d5\u05ea\u05d9\u05d5\u05ea \u05e2\u05dd \u05d4\u05e8\u05e9\u05d0\u05d5\u05ea \u05de\u05d1\u05d5\u05e1\u05e1\u05d5\u05ea \u05ea\u05e4\u05e7\u05d9\u05d3, \u05de\u05db\u05d5\u05e0\u05ea \u05de\u05e6\u05d1\u05d9\u05dd \u05d5\u05d0\u05d7\u05e1\u05d5\u05df JSON.",
    },
    tech: ["Python", "Playwright", "Docker"],
    gradient: "from-emerald-500 to-green-400",
    icon: "\u{1f4ac}",
    category: "backend",
  },
  {
    id: "construction",
    title: {
      en: "Construction Project Manager",
      he: "\u05de\u05e2\u05e8\u05db\u05ea \u05e0\u05d9\u05d4\u05d5\u05dc \u05e4\u05e8\u05d5\u05d9\u05e7\u05d8\u05d9 \u05d1\u05e0\u05d9\u05d9\u05d4",
    },
    description: {
      en: "Enterprise project management system for construction companies with Angular 19 frontend and ASP.NET Core backend. Role-based access control and REST API.",
      he: "\u05de\u05e2\u05e8\u05db\u05ea \u05e0\u05d9\u05d4\u05d5\u05dc \u05e4\u05e8\u05d5\u05d9\u05e7\u05d8\u05d9\u05dd \u05dc\u05d7\u05d1\u05e8\u05d5\u05ea \u05d1\u05e0\u05d9\u05d9\u05d4, \u05e2\u05dd \u05e4\u05e8\u05d5\u05e0\u05d8 Angular 19 \u05d5\u05d1\u05e7-\u05d0\u05e0\u05d3 ASP.NET Core. \u05d1\u05e7\u05e8\u05ea \u05d4\u05e8\u05e9\u05d0\u05d5\u05ea \u05dc\u05e4\u05d9 \u05ea\u05e4\u05e7\u05d9\u05d3.",
    },
    tech: ["Angular", "C#", ".NET", "TypeScript", "REST API"],
    github: "https://github.com/baruchyankovitz/ConstructionSystem",
    gradient: "from-sky-500 to-blue-400",
    icon: "\u{1f3d7}\ufe0f",
    category: "fullstack",
  },
  {
    id: "synagogue",
    title: {
      en: "Synagogue Management Platform",
      he: "\u05de\u05e2\u05e8\u05db\u05ea \u05e0\u05d9\u05d4\u05d5\u05dc \u05d1\u05ea\u05d9 \u05db\u05e0\u05e1\u05ea",
    },
    description: {
      en: "Backend API for synagogue management with JWT authentication, MongoDB, event booking, member management, and automated email notifications via Mailtrap.",
      he: "\u05de\u05e2\u05e8\u05db\u05ea \u05d1\u05e7-\u05d0\u05e0\u05d3 \u05dc\u05e0\u05d9\u05d4\u05d5\u05dc \u05d1\u05ea\u05d9 \u05db\u05e0\u05e1\u05ea \u05e2\u05dd \u05d0\u05d9\u05de\u05d5\u05ea JWT, MongoDB, \u05d4\u05d6\u05de\u05e0\u05ea \u05d0\u05d9\u05e8\u05d5\u05e2\u05d9\u05dd \u05d5\u05d4\u05ea\u05e8\u05d0\u05d5\u05ea \u05d0\u05d5\u05d8\u05d5\u05de\u05d8\u05d9\u05d5\u05ea.",
    },
    tech: ["Node.js", "Express", "MongoDB", "JWT", "Mailtrap"],
    github: "https://github.com/baruchyankovitz/synagogue-backend",
    gradient: "from-amber-500 to-yellow-400",
    icon: "\u{1f3db}\ufe0f",
    category: "backend",
  },
  {
    id: "radio-speed",
    title: {
      en: "Radio Speed \u2014 Chrome Extension",
      he: "\u05de\u05d0\u05d9\u05e5 \u05e8\u05d3\u05d9\u05d5 \u2014 \u05ea\u05d5\u05e1\u05e3 Chrome",
    },
    description: {
      en: "Unofficial Chrome extension (Manifest V3) that adds speed control (0.5x\u20133x) and a modern replacement player to recorded shows on Israeli radio sites: 103FM on the Chrome Web Store, plus Galei Tzahal and Kan in the latest GitHub version. Includes a waveform seek bar, resume position, sleep timer, and a Picture-in-Picture player; no data leaves the browser.",
      he: "\u05ea\u05d5\u05e1\u05e3 Chrome \u05dc\u05d0 \u05e8\u05e9\u05de\u05d9 (Manifest V3) \u05e9\u05de\u05d5\u05e1\u05d9\u05e3 \u05e9\u05dc\u05d9\u05d8\u05d4 \u05d1\u05de\u05d4\u05d9\u05e8\u05d5\u05ea (0.5x\u20133x) \u05d5\u05e0\u05d2\u05df \u05d7\u05dc\u05d5\u05e4\u05d9 \u05de\u05d5\u05d3\u05e8\u05e0\u05d9 \u05dc\u05ea\u05d5\u05db\u05e0\u05d9\u05d5\u05ea \u05de\u05d5\u05e7\u05dc\u05d8\u05d5\u05ea \u05d1\u05d0\u05ea\u05e8\u05d9 \u05e8\u05d3\u05d9\u05d5 \u05d9\u05e9\u05e8\u05d0\u05dc\u05d9\u05d9\u05dd: 103FM \u05d1-Chrome Web Store, \u05d5\u05d1\u05d2\u05e8\u05e1\u05d4 \u05d4\u05e2\u05d3\u05db\u05e0\u05d9\u05ea \u05d1-GitHub \u05d2\u05dd \u05d2\u05dc\u05d9 \u05e6\u05d4\u05f4\u05dc \u05d5\u05db\u05d0\u05df. \u05db\u05d5\u05dc\u05dc \u05e1\u05e8\u05d2\u05dc \u05d2\u05dc\u05d9 \u05e7\u05d5\u05dc, \u05d4\u05de\u05e9\u05da \u05de\u05d4\u05de\u05e7\u05d5\u05dd \u05e9\u05d1\u05d5 \u05e2\u05e6\u05e8\u05ea, \u05d8\u05d9\u05d9\u05de\u05e8 \u05e9\u05d9\u05e0\u05d4 \u05d5\u05e0\u05d2\u05df \u05e6\u05e3 (Picture-in-Picture). \u05e9\u05d5\u05dd \u05de\u05d9\u05d3\u05e2 \u05dc\u05d0 \u05d9\u05d5\u05e6\u05d0 \u05de\u05d4\u05d3\u05e4\u05d3\u05e4\u05df.",
    },
    tech: ["JavaScript", "Manifest V3", "Chrome Extensions API"],
    github: "https://github.com/baruchyankovitz/103fm-speed",
    live: "https://chromewebstore.google.com/detail/nkajbcjkbeacfjjkpogehjkjohlbdcoj",
    gradient: "from-rose-500 to-pink-400",
    icon: "\u{1f4fb}",
    category: "frontend",
  },
];

export interface ExperienceEntry {
  company: { en: string; he: string };
  role: { en: string; he: string };
  period: { en: string; he: string };
  description: { en: string; he: string };
  tech: string[];
  current?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    company: { en: "Self-employed", he: "\u05e2\u05e6\u05de\u05d0\u05d9" },
    role: {
      en: "Freelance Full Stack & AI Developer",
      he: "\u05de\u05e4\u05ea\u05d7 Full Stack \u05d5-AI \u05d1\u05e4\u05e8\u05d9\u05dc\u05e0\u05e1",
    },
    period: { en: "2026 \u2014 Present", he: "2026 \u2014 \u05d4\u05d9\u05d5\u05dd" },
    description: {
      en: "AI, automation, and e-commerce work for clients. For a nonprofit, designed a ledger-based inventory and task system and recommended building it as an extension of the client's existing CRM instead of a standalone app; it is built and in use. Continued developing the BOM and quoting wizard for EnoLED's owner.",
      he: "\u05e2\u05d1\u05d5\u05d3\u05d5\u05ea AI, \u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d4 \u05d5\u05d0\u05d9\u05e7\u05d5\u05de\u05e8\u05e1 \u05dc\u05dc\u05e7\u05d5\u05d7\u05d5\u05ea. \u05dc\u05e2\u05de\u05d5\u05ea\u05d4: \u05d0\u05e4\u05d9\u05d9\u05e0\u05ea\u05d9 \u05de\u05e2\u05e8\u05db\u05ea \u05de\u05dc\u05d0\u05d9 \u05d5\u05de\u05e9\u05d9\u05de\u05d5\u05ea \u05d4\u05de\u05d1\u05d5\u05e1\u05e1\u05ea \u05e2\u05dc \u05d9\u05d5\u05de\u05df \u05ea\u05e0\u05d5\u05e2\u05d5\u05ea, \u05d5\u05d4\u05de\u05dc\u05e6\u05ea\u05d9 \u05dc\u05d1\u05e0\u05d5\u05ea \u05d0\u05d5\u05ea\u05d4 \u05db\u05d4\u05e8\u05d7\u05d1\u05d4 \u05dc-CRM \u05d4\u05e7\u05d9\u05d9\u05dd \u05e9\u05dc \u05d4\u05dc\u05e7\u05d5\u05d7 \u05d1\u05de\u05e7\u05d5\u05dd \u05de\u05e2\u05e8\u05db\u05ea \u05e2\u05e6\u05de\u05d0\u05d9\u05ea. \u05d4\u05de\u05e2\u05e8\u05db\u05ea \u05e0\u05d1\u05e0\u05ea\u05d4 \u05d5\u05e0\u05de\u05e6\u05d0\u05ea \u05d1\u05e9\u05d9\u05de\u05d5\u05e9. \u05d1\u05e0\u05d5\u05e1\u05e3, \u05d4\u05de\u05e9\u05db\u05ea\u05d9 \u05dc\u05e4\u05ea\u05d7 \u05d0\u05ea \u05d0\u05e9\u05e3 \u05d4-BOM \u05d5\u05d4\u05e6\u05e2\u05d5\u05ea \u05d4\u05de\u05d7\u05d9\u05e8 \u05e2\u05d1\u05d5\u05e8 \u05d4\u05d1\u05e2\u05dc\u05d9\u05dd \u05e9\u05dc EnoLED.",
    },
    tech: ["React", "Vercel", "Playwright", "Claude Code", "Fireberry CRM"],
    current: true,
  },
  {
    company: { en: "MBN Tech \u2014 EnoLED & Light Story", he: "MBN Tech \u2014 EnoLED & Light Story" },
    role: {
      en: "Full Stack & AI Engineer",
      he: "\u05de\u05d4\u05e0\u05d3\u05e1 Full Stack \u05d5-AI",
    },
    period: { en: "2025 \u2014 2026", he: "2025 \u2014 2026" },
    description: {
      en: "Main technology person at a lighting company. Built the lightstory.co.il Shopify store (custom Liquid, Hebrew RTL, 100+ products), a 7-agent AI pipeline for Facebook ads that cut creation time by 90%, an AI video-generation service, n8n automations, and a BOM and quoting wizard for EnoLED's LED product line.",
      he: "\u05d0\u05d9\u05e9 \u05d4\u05d8\u05db\u05e0\u05d5\u05dc\u05d5\u05d2\u05d9\u05d4 \u05d4\u05de\u05e8\u05db\u05d6\u05d9 \u05d1\u05d7\u05d1\u05e8\u05ea \u05ea\u05d0\u05d5\u05e8\u05d4. \u05d1\u05e0\u05d9\u05ea\u05d9 \u05d0\u05ea \u05d7\u05e0\u05d5\u05ea \u05d4-Shopify \u05e9\u05dc lightstory.co.il (Liquid \u05de\u05d5\u05ea\u05d0\u05dd, RTL \u05d1\u05e2\u05d1\u05e8\u05d9\u05ea, 100+ \u05de\u05d5\u05e6\u05e8\u05d9\u05dd), \u05e6\u05d9\u05e0\u05d5\u05e8 AI \u05e9\u05dc 7 \u05e1\u05d5\u05db\u05e0\u05d9\u05dd \u05dc\u05de\u05d5\u05d3\u05e2\u05d5\u05ea \u05e4\u05d9\u05d9\u05e1\u05d1\u05d5\u05e7 \u05e9\u05e7\u05d9\u05e6\u05e8 \u05d0\u05ea \u05d6\u05de\u05df \u05d4\u05d9\u05e6\u05d9\u05e8\u05d4 \u05d1-90%, \u05e9\u05d9\u05e8\u05d5\u05ea \u05dc\u05d9\u05e6\u05d9\u05e8\u05ea \u05e1\u05e8\u05d8\u05d5\u05e0\u05d9 AI, \u05d0\u05d5\u05d8\u05d5\u05de\u05e6\u05d9\u05d5\u05ea n8n \u05d5\u05d0\u05e9\u05e3 BOM \u05d5\u05d4\u05e6\u05e2\u05d5\u05ea \u05de\u05d7\u05d9\u05e8 \u05dc\u05e7\u05d5 \u05de\u05d5\u05e6\u05e8\u05d9 \u05d4-LED \u05e9\u05dc EnoLED.",
    },
    tech: ["Shopify", "Liquid", "TypeScript", "Python", "Claude API", "n8n"],
  },
  {
    company: { en: "ORT Singalovski", he: "ORT \u05e1\u05d9\u05e0\u05d2\u05dc\u05d5\u05d1\u05e1\u05e7\u05d9" },
    role: {
      en: "Full Stack Development Course",
      he: "\u05e7\u05d5\u05e8\u05e1 \u05e4\u05d9\u05ea\u05d5\u05d7 Full Stack",
    },
    period: { en: "2023 \u2014 2024", he: "2023 \u2014 2024" },
    description: {
      en: "Intensive Full Stack development program covering React, TypeScript, Node.js, databases, and modern web development practices.",
      he: "\u05ea\u05d5\u05db\u05e0\u05d9\u05ea \u05e4\u05d9\u05ea\u05d5\u05d7 Full Stack \u05d0\u05d9\u05e0\u05d8\u05e0\u05e1\u05d9\u05d1\u05d9\u05ea \u05d4\u05db\u05d5\u05dc\u05dc\u05ea React, TypeScript, Node.js, \u05d1\u05e1\u05d9\u05e1\u05d9 \u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05d5\u05e4\u05e8\u05e7\u05d8\u05d9\u05e7\u05d5\u05ea \u05e4\u05d9\u05ea\u05d5\u05d7 \u05de\u05d5\u05d3\u05e8\u05e0\u05d9\u05d5\u05ea.",
    },
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "C#", ".NET"],
  },
];

export const skillCategories = [
  {
    name: { en: "Frontend", he: "Frontend" },
    skills: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "text-blue-400",
  },
  {
    name: { en: "Backend", he: "Backend" },
    skills: ["Node.js", "Express", "Python", "Flask", "C# / .NET", "REST APIs", "GraphQL"],
    color: "text-green-400",
  },
  {
    name: { en: "AI / ML", he: "AI / ML" },
    skills: ["Claude API", "Gemini API", "Whisper API", "Kling AI", "Multi-Agent Systems", "n8n"],
    color: "text-purple-400",
  },
  {
    name: { en: "Database", he: "\u05d1\u05e1\u05d9\u05e1\u05d9 \u05e0\u05ea\u05d5\u05e0\u05d9\u05dd" },
    skills: ["MongoDB", "PostgreSQL", "Prisma", "Redis", "SQL Server"],
    color: "text-yellow-400",
  },
  {
    name: { en: "E-Commerce", he: "\u05d0\u05d9\u05e7\u05d5\u05de\u05e8\u05e1" },
    skills: ["Shopify", "Liquid", "Matrixify", "Google Ads", "GA4", "SEO", "Schema.org"],
    color: "text-pink-400",
  },
  {
    name: { en: "DevOps & Tools", he: "DevOps" },
    skills: ["Docker", "Git", "Vercel", "Playwright", "ffmpeg", "Linux"],
    color: "text-orange-400",
  },
  {
    name: { en: "Languages", he: "\u05e9\u05e4\u05d5\u05ea" },
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C#", "SQL", "Liquid"],
    color: "text-cyan-400",
  },
];
