import type { Metadata } from "next";
import { Inter, Noto_Sans_Hebrew, JetBrains_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoHebrew = Noto_Sans_Hebrew({
  variable: "--font-noto-hebrew",
  subsets: ["hebrew"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Baruch Yankovitz | Full Stack Developer & AI Builder",
  description:
    "Baruch Yankovitz — Full Stack developer & AI specialist in Tel Aviv, shipping multi-agent AI pipelines (Claude, Gemini), AI video systems, full-stack platforms, and Shopify automation — production systems built end-to-end.",
  keywords: [
    "Baruch Yankovitz",
    "Full Stack Developer",
    "AI Engineer",
    "AI Builder",
    "Multi-Agent AI",
    "Claude API",
    "Gemini API",
    "Generative AI",
    "AI Automation",
    "Node.js",
    "TypeScript",
    "React",
    "Python",
    "Shopify",
    "Tel Aviv Developer",
  ],
  authors: [{ name: "Baruch Yankovitz", url: SITE_URL }],
  creator: "Baruch Yankovitz",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Baruch Yankovitz | Full Stack Developer & AI Builder",
    description:
      "Full Stack & AI developer in Tel Aviv shipping multi-agent AI pipelines (Claude, Gemini), AI video systems, full-stack platforms, and Shopify automation — production systems built end-to-end.",
    url: SITE_URL,
    siteName: "Baruch Yankovitz",
    locale: "en_US",
    alternateLocale: "he_IL",
    type: "profile",
    firstName: "Baruch",
    lastName: "Yankovitz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baruch Yankovitz | Full Stack Developer & AI Builder",
    description:
      "Full Stack developer & AI specialist in Tel Aviv. Multi-agent AI pipelines, AI video systems, full-stack platforms & Shopify automation — shipped end-to-end.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "5DeP66xqYse02lnomjzmkUUskxYITV8Ot1IPb1DPnr8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ProfilePage",
                  "@id": `${SITE_URL}/#profilepage`,
                  url: SITE_URL,
                  name: "Baruch Yankovitz — Full Stack Developer & AI Builder",
                  inLanguage: "en",
                  isPartOf: { "@id": `${SITE_URL}/#website` },
                  about: { "@id": `${SITE_URL}/#person` },
                  mainEntity: { "@id": `${SITE_URL}/#person` },
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "Baruch Yankovitz",
                  description:
                    "Portfolio of Baruch Yankovitz — Full Stack developer and AI specialist in Tel Aviv.",
                  inLanguage: ["en", "he"],
                  publisher: { "@id": `${SITE_URL}/#person` },
                },
                {
                  "@type": "Person",
                  "@id": `${SITE_URL}/#person`,
                  name: "Baruch Yankovitz",
                  alternateName: "ברוך ינקוביץ",
                  jobTitle: "Full Stack Developer & AI Builder",
                  description:
                    "Baruch Yankovitz is a Full Stack developer and AI specialist based in Tel Aviv. He ships production-grade systems end-to-end — multi-agent AI pipelines with Claude and Gemini, AI video-generation systems, full-stack platforms, and Shopify e-commerce with custom automation. He currently works as a freelance Full Stack & AI developer; previously (2025–2026) he was the main technology person at MBN Tech (EnoLED & Light Story), independently owning development, e-commerce, automation, and infrastructure.",
                  url: SITE_URL,
                  email: "baruchyankovitz@gmail.com",
                  telephone: "+972556782035",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Tel Aviv",
                    addressCountry: "IL",
                  },
                  homeLocation: { "@type": "Place", name: "Tel Aviv, Israel" },
                  knowsLanguage: ["Hebrew", "English"],
                  knowsAbout: [
                    "Full Stack Development",
                    "Multi-Agent AI Systems",
                    "Claude API",
                    "Gemini API",
                    "Next.js",
                    "React",
                    "TypeScript",
                    "Node.js",
                    "Python",
                    "AI Video Pipelines",
                    "Shopify & Liquid",
                    "E-Commerce Automation",
                    "Marketing Automation",
                    "SEO",
                    "PostgreSQL",
                    "MongoDB",
                    "Docker",
                  ],
                  alumniOf: {
                    "@type": "EducationalOrganization",
                    name: "ORT Singalovski",
                  },
                  sameAs: [
                    "https://github.com/baruchyankovitz",
                    "https://www.linkedin.com/in/baruch-yankovitz/",
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${notoHebrew.variable} ${jetbrainsMono.variable} antialiased text-white`}
      >
        {children}
      </body>
    </html>
  );
}
