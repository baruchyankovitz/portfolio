import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Served at /sitemap.xml — single-page portfolio, so one canonical URL.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
