import { siteConfig } from "@/lib/schema";
import { blogArticles } from "@/lib/blog-data";
import { toolLandings } from "@/lib/configs/tool-landings";
import { comparisons } from "@/lib/configs/comparisons";
import { learnPages } from "@/lib/configs/learn-pages";

export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = siteConfig.url;

  const toolRoutes = [
    "", "/remove-photo-metadata/", "/remove-gps-from-photo/", "/exif-viewer/",
    "/social-media-cleaner/", "/batch-metadata-remover/", "/privacy-score-tool/",
    "/remove-pdf-metadata/", "/remove-text-metadata/", "/privacy-guide/",
  ];

  const toolLandingRoutes = toolLandings.map((t) => `/${t.slug}/`);
  const comparisonRoutes = comparisons.map((c) => `/${c.slug}/`);
  const learnRoutes = learnPages.map((l) => `/learn/${l.slug}/`);
  const blogRoutes = blogArticles.map((a) => `/blog/${a.slug}/`);

  const trustRoutes = ["/about/", "/privacy/", "/terms/", "/contact/"];

  const allRoutes = [
    "/blog/",
    ...toolRoutes,
    ...toolLandingRoutes,
    ...comparisonRoutes,
    ...learnRoutes,
    ...blogRoutes,
    ...trustRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route.startsWith("/blog/") || route.startsWith("/learn/") ? 0.8 : 0.9,
  }));
}
