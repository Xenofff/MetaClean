import type { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";
import { toolConfigs } from "@/lib/tool-configs";

const config = toolConfigs["remove-text-metadata"];

export const metadata: Metadata = generatePageSEO({
  title: config.metaTitle,
  description: config.metaDescription,
  keywords: config.keywords,
  canonical: `/${config.slug}/`,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
