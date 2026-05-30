import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  siteConfig,
} from "@/lib/schema";
import { toolLandings } from "@/lib/configs/tool-landings";

const config = toolLandings.find((t) => t.slug === "metadata-checker")!;

export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  keywords: [...config.keywords],
  alternates: { canonical: `${siteConfig.url}/${config.slug}/` },
};

const faqs = [
      {
        question: "What can a metadata checker find?",
        answer: "A metadata checker reveals all embedded data in a file including EXIF data, GPS coordinates, camera info, author names, creation dates, and any other hidden metadata fields.",
      },
      {
        question: "What file types can be checked?",
        answer: "MetaClean's metadata checker supports images (JPG, PNG, WEBP, HEIC), PDFs, and text files, giving you a comprehensive view of metadata across different file types.",
      },
      {
        question: "Is my file uploaded when checking metadata?",
        answer: "No, MetaClean processes files entirely in your browser. Your files are never uploaded to any server, ensuring complete privacy during the metadata inspection process.",
      },
      {
        question: "Should I check metadata before sharing files?",
        answer: "Yes, always check metadata before sharing files publicly. You may be surprised by how much personal information is embedded in your documents and photos.",
      },
      {
        question: "Can I use this to audit file privacy?",
        answer: "Yes, the metadata checker is an essential privacy audit tool that helps you understand what information your files contain before distributing them to others.",
      }
];


export default function MetadataCheckerPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: config.title, url: `/${config.slug}/` },
  ]);
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <nav
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">{config.title}</span>
        </nav>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            {config.heroBadge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            {config.h1}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {config.description}
          </p>
          <div className="mt-8">
            <Link
              href={config.toolUrl}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-primary-hover transition-all hover:shadow-md active:scale-[0.98]"
            >
              Try {config.title} Free
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Three simple steps to protect your privacy
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Upload",
                description: "Drag and drop or select your files to get started.",
              },
              {
                step: "02",
                title: "Review",
                description:
                  "See all detected metadata and choose what to remove.",
              },
              {
                step: "03",
                title: "Clean",
                description:
                  "One click to clean. Download your privacy-safe file.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <FAQSection
            title="Frequently Asked Questions"
            description={`Everything you need to know about ${config.title}`}
            faqs={faqs}
          />
        </section>

        {/* Related Tools */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Related Tools
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <li key="metadata-analyzer">
                <Link
                  href="/metadata-analyzer/"
                  className="flex items-center gap-3 rounded-xl border border-border bg-white p-5 hover:border-primary/30 hover:shadow-sm transition-all group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-foreground">Metadata Analyzer</span>
                </Link>
              </li>
              <li key="metadata-scanner">
                <Link
                  href="/metadata-scanner/"
                  className="flex items-center gap-3 rounded-xl border border-border bg-white p-5 hover:border-primary/30 hover:shadow-sm transition-all group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-foreground">Metadata Scanner</span>
                </Link>
              </li>
              <li key="photo-privacy-checker">
                <Link
                  href="/photo-privacy-checker/"
                  className="flex items-center gap-3 rounded-xl border border-border bg-white p-5 hover:border-primary/30 hover:shadow-sm transition-all group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-foreground">Photo Privacy Checker</span>
                </Link>
              </li>
          </ul>
        </section>

        {/* Learn More */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Learn More
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
              <li key="what-metadata-is-stored-in-photos">
                <Link
                  href="/learn/what-metadata-is-stored-in-photos/"
                  className="flex items-center gap-3 rounded-xl border border-border bg-white p-5 hover:border-primary/30 hover:shadow-sm transition-all group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-foreground">What Metadata Is Stored In Photos</span>
                </Link>
              </li>
              <li key="metadata-security-risks">
                <Link
                  href="/learn/metadata-security-risks/"
                  className="flex items-center gap-3 rounded-xl border border-border bg-white p-5 hover:border-primary/30 hover:shadow-sm transition-all group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-foreground">Metadata Security Risks</span>
                </Link>
              </li>
          </ul>
        </section>
      </div>
    </>
  );
}
