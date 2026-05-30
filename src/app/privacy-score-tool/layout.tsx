import type { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";
import { toolConfigs } from "@/lib/tool-configs";

const config = toolConfigs["privacy-score-tool"];

export const metadata: Metadata = generatePageSEO({
  title: "Privacy Score Calculator — Rate Photo Privacy Risk | MetaClean",
  description: config.metaDescription,
  keywords: config.keywords,
  canonical: "/privacy-score/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
