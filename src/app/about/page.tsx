import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/json-ld";
import { siteConfig, generateOrganizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About MetaClean — Privacy-First Metadata Removal",
  description:
    "Learn about MetaClean's mission to protect digital privacy through free, client-side metadata removal tools. Your files never leave your device.",
  keywords: [
    "about metaclean",
    "metadata removal",
    "privacy tool",
    "client-side processing",
    "free privacy tool",
  ],
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: "About MetaClean",
    description:
      "Learn about MetaClean's mission to protect digital privacy through free, client-side metadata removal tools.",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
  },
};

const trustBadges = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Zero Data Collection",
    description: "We never collect, store, or transmit your files or personal data.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: "100% Client-Side",
    description: "All processing runs in your browser using JavaScript and WebAssembly.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Open & Transparent",
    description: "Our code is open-source. Verify our privacy claims yourself.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Free Forever",
    description: "No hidden fees, no subscriptions, no premium tiers. Everything is free.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={generateOrganizationSchema()} />

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              About <span className="text-primary">MetaClean</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe privacy is a fundamental right. MetaClean exists to make metadata removal
              accessible, free, and trustworthy for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-muted/30">
        <div className="about-content mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2>Our Mission</h2>
          <p>
            Every photo you take, every document you create, every file you share contains hidden data
            about you. GPS coordinates that reveal where you live. Device information that identifies your
            phone. Author names embedded in PDFs. Most people have no idea this metadata exists.
          </p>
          <p>
            MetaClean was built to solve this problem with a simple principle: <strong>your files should
            never leave your device</strong>. While other tools require uploading your photos to remote servers,
            we process everything directly in your browser. No uploads. No servers. No trust required.
          </p>
          <p>
            Privacy tools should be free. Metadata removal is not a luxury — it&apos;s a basic digital hygiene
            practice. That&apos;s why MetaClean will always be free to use, with no usage limits or hidden paywalls.
          </p>
        </div>
      </section>

      {/* How Client-Side Processing Works */}
      <section className="py-20">
        <div className="about-content mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2>How Client-Side Processing Works</h2>
          <p>
            When you use MetaClean, your files are processed entirely within your web browser. Here&apos;s how:
          </p>

          <div className="mt-8 space-y-6">
            {[
              {
                step: "1",
                title: "File Stays in Your Browser",
                description:
                  "When you select a file, it is loaded into your browser's memory using the FileReader API. The file is never sent over the network.",
              },
              {
                step: "2",
                title: "JavaScript Parses the File",
                description:
                  "Our client-side code reads the file's binary structure, identifying metadata sections (EXIF headers in photos, document properties in PDFs, BOM markers in text files).",
              },
              {
                step: "3",
                title: "Metadata Is Removed Locally",
                description:
                  "The code strips the identified metadata while preserving the file's content. For photos, this means removing GPS, camera info, and timestamps. For PDFs, author and title fields are cleared.",
              },
              {
                step: "4",
                title: "Clean File Is Generated",
                description:
                  "A new file is created in your browser with the metadata removed. You download this clean version directly — it never touches any server.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold">
                  {item.step}
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p className="mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-border bg-muted/50 p-6">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Technical note:</strong> MetaClean uses the browser&apos;s built-in
              ArrayBuffer and DataView APIs for binary file manipulation, along with specialized libraries for
              format-specific parsing (EXIF, PDF structure). No data is ever transmitted to external servers.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Trust & Transparency</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-white p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {badge.icon}
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{badge.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="about-content mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2>Who We Are</h2>
          <p>
            MetaClean is built by a small team of privacy-conscious developers who believe the web should be
            a safer place. We saw how easily metadata exposes personal information and decided to build the
            tool we wished existed — one that puts privacy first without compromising on usability.
          </p>
          <p>
            We&apos;re not a large corporation. We&apos;re developers who care about digital privacy and want to
            make these tools available to everyone, regardless of technical skill or budget.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Try MetaClean Today</h2>
          <p className="mt-4 text-lg text-white/80">
            Remove metadata from your files in seconds. No signup required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/remove-photo-metadata/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary hover:bg-white/90 transition-all"
            >
              Remove Photo Metadata
            </Link>
            <Link
              href="/remove-pdf-metadata/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/20 transition-all"
            >
              Remove PDF Metadata
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
