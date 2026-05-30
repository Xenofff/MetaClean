import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import { learnPages } from "@/lib/configs/learn-pages";
import type { Metadata } from "next";

const config = learnPages.find((p) => p.slug === "exif-explained")!;

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  keywords: [...config.keywords],
  alternates: {
    canonical: `${siteConfig.url}/learn/${config.slug}/`,
  },
};

export default function LearnExifExplainedPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Learn", url: "/learn" },
    { name: config.title, url: `/learn/${config.slug}/` },
  ]);
  const faqSchema = generateFAQSchema(config.faqs);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/learn" className="hover:text-foreground">Learn</Link>
          <span>/</span>
          <span className="text-foreground">{config.title}</span>
        </nav>

        <div className="flex gap-12">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <h2 className="text-sm font-semibold text-foreground mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                {config.sections.map((section) => (
                  <a key={section.title} href={`#${section.title.toLowerCase().replace(/\s+/g, "-")}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="flex-1 min-w-0">
            <div className="mb-8">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">{config.category}</span>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{config.title}</h1>
              <p className="text-lg text-muted-foreground">{config.description}</p>
            </div>

            {config.sections.map((section) => (
              <section key={section.title} id={section.title.toLowerCase().replace(/\s+/g, "-")} className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">{section.title}</h2>
                {section.content.map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>
                ))}
              </section>
            ))}

            <FAQSection title="Frequently Asked Questions" faqs={config.faqs} />

            <section className="py-12 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {config.relatedTools.map((tool) => (
                  <Link key={tool} href={`/${tool}/`} className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow">
                    <span className="text-sm font-semibold text-foreground hover:text-primary">{tool.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="py-12 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {config.relatedArticles.map((article) => (
                  <Link key={article.slug} href={`/learn/${article.slug}/`} className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow">
                    <span className="text-sm font-semibold text-foreground hover:text-primary">{article.title}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="py-12 border-t border-border text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Protect Your Privacy?</h2>
              <p className="text-muted-foreground mb-6">Remove metadata from your files in seconds with MetaClean.</p>
              <Link href="/remove-photo-metadata/" className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors">
                Clean Your Photos
              </Link>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
