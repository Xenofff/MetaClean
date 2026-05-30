import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import { comparisons } from "@/lib/configs/comparisons";
import type { Metadata } from "next";

const config = comparisons.find((c) => c.slug === "metaclean-vs-ilovepdf")!;

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  keywords: config.keywords,
  alternates: {
    canonical: `${siteConfig.url}/${config.slug}/`,
  },
};

export default function ComparisonPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Comparisons", url: "/comparisons/" },
    { name: config.title, url: `/${config.slug}/` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={generateFAQSchema(config.faqs)} />

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/comparisons/" className="hover:text-foreground">Comparisons</Link>
          <span>/</span>
          <span className="text-foreground">{config.title}</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{config.h1}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">{config.intro}</p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Feature</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">MetaClean</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">{config.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {config.features.map((feature, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                    <td className="px-4 py-3 font-medium text-foreground">{feature.name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-sm ${feature.metacleanWins ? "text-green-700 dark:text-green-400" : "text-muted-foreground"}`}>
                        {feature.metacleanWins ? (
                          <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        {feature.metaclean}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{feature.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid gap-8 sm:grid-cols-2 mb-12">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">MetaClean Pros</h2>
            <ul className="space-y-3">
              {config.metacleanPros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20">
                  <svg className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-foreground">{pro}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">MetaClean Cons</h2>
            <ul className="space-y-3">
              {config.metacleanCons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-900/20">
                  <svg className="h-5 w-5 shrink-0 text-yellow-600 dark:text-yellow-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm text-foreground">{con}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 mb-12">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">{config.competitor} Pros</h2>
            <ul className="space-y-3">
              {config.competitorPros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                  <svg className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-foreground">{pro}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">{config.competitor} Cons</h2>
            <ul className="space-y-3">
              {config.competitorCons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                  <svg className="h-5 w-5 shrink-0 text-yellow-600 dark:text-yellow-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm text-foreground">{con}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mb-12 rounded-xl border border-primary bg-primary/5 p-6">
          <h2 className="text-xl font-bold text-foreground mb-3">Verdict</h2>
          <p className="text-muted-foreground leading-relaxed">{config.verdict}</p>
        </section>

        <FAQSection
          title={`Frequently Asked Questions About ${config.title}`}
          description={`Common questions about comparing MetaClean and ${config.competitor}`}
          faqs={config.faqs}
        />

        <section className="mt-12 text-center rounded-xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground mb-3">Try MetaClean Today</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Experience the privacy-first approach to metadata removal. No installation, no uploads — just clean files.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Start Removing Metadata
          </Link>
        </section>
      </article>
    </>
  );
}
