import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Served at /robots.txt — tells crawlers everything is allowed and points to the sitemap.
export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
