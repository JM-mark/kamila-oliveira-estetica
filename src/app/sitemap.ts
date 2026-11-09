import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.siteUrl.replace(/\/$/, "");
  const paths = ["/", ...SERVICES.map((s) => `/${s.slug}/`), "/agendar/", "/sobre/", "/contato/", "/privacidade/"];
  return paths.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
