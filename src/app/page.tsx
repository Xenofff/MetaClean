"use client";

import Link from "next/link";
import ToolCard from "@/components/tool-card";
import FAQSection from "@/components/faq-section";
import JsonLd from "@/components/json-ld";
import { siteConfig, generateWebApplicationSchema, generateFAQSchema } from "@/lib/schema";

const faqs = [
  {
    question: "What is MetaClean?",
    answer: "MetaClean is a free, client-side tool that removes metadata from photos, PDFs, and text files. All processing happens in your browser — your files are never uploaded to any server.",
  },
  {
    question: "Is MetaClean really free?",
    answer: "Yes, MetaClean is completely free to use. There are no hidden fees, subscriptions, or usage limits. We believe privacy tools should be accessible to everyone.",
  },
  {
    question: "How does client-side processing work?",
    answer: "When you upload a file, it stays entirely in your browser. JavaScript processes the file locally, removing metadata before you download the cleaned version. No data is ever sent to our servers.",
  },
  {
    question: "What metadata can be removed from photos?",
    answer: "MetaClean can remove GPS coordinates, camera information, device model, software tags, timestamps, and other EXIF data from JPG, JPEG, PNG, and WEBP images.",
  },
  {
    question: "Can I remove metadata from PDF files?",
    answer: "Yes, MetaClean can remove author information, title, creator, producer, keywords, and other metadata from PDF files while preserving the document content.",
  },
  {
    question: "What text file formats are supported?",
    answer: "MetaClean supports TXT, CSV, JSON, and XML files. It can remove hidden Unicode characters, BOM markers, normalize line endings, and remove invisible tracking characters.",
  },
  {
    question: "Is my data safe when using MetaClean?",
    answer: "Absolutely. Since all processing happens locally in your browser, your files never leave your device. We have no access to your data, and no information is stored or transmitted.",
  },
  {
    question: "Do I need to install any software?",
    answer: "No, MetaClean is a web-based tool that works directly in your browser. There's nothing to download or install. Simply visit the website and start cleaning your files.",
  },
  {
    question: "Can I use MetaClean on mobile?",
    answer: "Yes, MetaClean is fully responsive and works on all devices including smartphones, tablets, and desktops. The interface adapts to your screen size for the best experience.",
  },
  {
    question: "What is EXIF data?",
    answer: "EXIF (Exchangeable Image File Format) is metadata embedded in photos by cameras and smartphones. It can include GPS location, camera model, date/time, and other technical information.",
  },
  {
    question: "Why should I remove metadata from photos?",
    answer: "Metadata can reveal sensitive information like your location, the device you use, and when photos were taken. Removing metadata protects your privacy before sharing photos online.",
  },
  {
    question: "Can I batch process multiple files?",
    answer: "Yes, MetaClean supports batch processing. You can upload and clean multiple files at once, saving time when you need to remove metadata from many files.",
  },
  {
    question: "What is a privacy score?",
    answer: "MetaClean calculates a privacy score from 0-100 based on the metadata found in your files. Higher scores mean better privacy. GPS data, device info, and author tags all lower your score.",
  },
  {
    question: "Does MetaClean work offline?",
    answer: "Yes, once the page is loaded, MetaClean can work offline since all processing happens locally in your browser. You can even bookmark the page for offline use.",
  },
  {
    question: "How do I know if my file has been cleaned properly?",
    answer: "After cleaning, MetaClean shows you a before/after comparison of the metadata. You can verify that sensitive information has been removed before downloading the cleaned file.",
  },
];

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "100% Private",
    description: "All processing happens in your browser. Files never leave your device.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Instant Processing",
    description: "Clean files in milliseconds with our optimized client-side engine.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: "No Uploads",
    description: "Zero server uploads. Your data stays on your machine, always.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Completely Free",
    description: "No hidden fees. No subscriptions. Free forever.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Upload Your File",
    description: "Drag and drop or click to select your photos, PDFs, or text files.",
  },
  {
    step: "02",
    title: "Review Metadata",
    description: "See all detected metadata and choose what to remove.",
  },
  {
    step: "03",
    title: "Clean & Download",
    description: "One click to clean. Download your privacy-safe file instantly.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={generateWebApplicationSchema()} />
      <JsonLd data={generateFAQSchema(faqs)} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
              100% Client-Side Processing
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Remove Metadata{" "}
              <span className="text-primary">Instantly</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {siteConfig.description}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/remove-photo-metadata/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-primary-hover transition-all hover:shadow-md active:scale-[0.98]"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Remove Photo Metadata
              </Link>
              <Link
                href="/remove-pdf-metadata/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-8 py-3.5 text-base font-semibold text-foreground hover:bg-muted transition-all"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Remove PDF Metadata
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {["Client-Side", "No Uploads", "Private", "Free"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  <svg className="h-3.5 w-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tool Cards Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Privacy Tools</h2>
            <p className="mt-3 text-lg text-muted-foreground">Choose the right tool for your needs</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ToolCard
              title="Photo Metadata Remover"
              description="Remove EXIF data, GPS coordinates, camera info, and timestamps from images."
              href="/remove-photo-metadata/"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              features={["JPG, PNG, WEBP support", "Remove GPS data", "Remove camera info", "Before/after preview"]}
            />

            <ToolCard
              title="GPS Remover"
              description="Extract and display GPS coordinates. Remove location data to protect your privacy."
              href="/remove-gps-from-photo/"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              features={["Extract GPS coords", "Google Maps link", "Remove GPS only", "Privacy warnings"]}
            />

            <ToolCard
              title="EXIF Viewer"
              description="Inspect all metadata embedded in your photos. Searchable table with categories."
              href="/exif-viewer/"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              features={["Drag & drop", "Searchable fields", "Category filters", "Privacy score"]}
            />

            <ToolCard
              title="Social Media Cleaner"
              description="Analyze photos for privacy risks before posting. One-click clean for social media."
              href="/social-media-cleaner/"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2" />
                </svg>
              }
              features={["Device detection", "GPS warnings", "Date exposure", "One-click clean"]}
            />

            <ToolCard
              title="Batch Metadata Remover"
              description="Upload multiple files and clean metadata from all of them. Download as ZIP."
              href="/batch-metadata-remover/"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
              features={["Multiple files", "Progress tracking", "ZIP download", "Photo & PDF support"]}
            />

            <ToolCard
              title="Privacy Score"
              description="Calculate privacy score from 0-100. See detailed risk breakdown for your files."
              href="/privacy-score-tool/"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              features={["Score circle", "Risk level", "Detailed breakdown", "Issue detection"]}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Why Choose MetaClean?</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Built with privacy as the foundation, not an afterthought
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Explanation */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-white p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Your Files Stay Private</h2>
                <p className="mt-4 text-muted-foreground">
                  Unlike other tools that upload your files to their servers, MetaClean processes everything directly in your browser using WebAssembly and modern JavaScript APIs.
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Zero server uploads — ever",
                    "No cookies or tracking",
                    "No data collection",
                    "Open-source code",
                    "Works offline after first load",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-success shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-muted/50 p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 text-success">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Before MetaClean</p>
                      <p className="text-xs text-muted-foreground">Your files contain sensitive metadata</p>
                    </div>
                  </div>

                  <div className="ml-5 border-l-2 border-border pl-5 space-y-2 text-xs text-muted-foreground font-mono">
                    <p>GPS: 40.7128° N, 74.0060° W</p>
                    <p>Device: iPhone 15 Pro</p>
                    <p>Author: John Doe</p>
                    <p>Software: Adobe Photoshop</p>
                    <p>Date: 2024-01-15T14:30:00Z</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">After MetaClean</p>
                      <p className="text-xs text-muted-foreground">Metadata removed, content preserved</p>
                    </div>
                  </div>

                  <div className="ml-5 border-l-2 border-border pl-5 space-y-2 text-xs text-muted-foreground font-mono">
                    <p className="text-success">GPS: [REMOVED]</p>
                    <p className="text-success">Device: [REMOVED]</p>
                    <p className="text-success">Author: [REMOVED]</p>
                    <p className="text-success">Software: [REMOVED]</p>
                    <p className="text-success">Date: [REMOVED]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-3 text-lg text-muted-foreground">Three simple steps to protect your privacy</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-1/2 w-full h-0.5 bg-border" />
                )}
                <div className="relative text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Previews */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Privacy Resources</h2>
            <p className="mt-3 text-lg text-muted-foreground">Learn how to protect your digital privacy</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "How to Remove EXIF Data From Photos",
                description: "A complete guide to removing hidden metadata from your photos before sharing online.",
                href: "/blog/how-to-remove-exif-data/",
                readTime: "5 min read",
              },
              {
                title: "Why Photo Metadata Can Be Dangerous",
                description: "Learn how metadata in your photos can expose sensitive information about you.",
                href: "/blog/photo-metadata-danger/",
                readTime: "7 min read",
              },
              {
                title: "GPS Metadata: How It Reveals Your Location",
                description: "Discover how GPS data in photos can pinpoint your exact location.",
                href: "/blog/gps-metadata-danger/",
                readTime: "6 min read",
              },
            ].map((post, index) => (
              <Link
                key={index}
                href={post.href}
                className="group rounded-xl border border-border bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <span className="text-xs font-medium text-primary">{post.readTime}</span>
                <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read more
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FAQSection
            title="Frequently Asked Questions"
            description="Everything you need to know about MetaClean and metadata removal"
            faqs={faqs}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Protect Your Privacy?</h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Start removing metadata from your files in seconds. No signup required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/remove-photo-metadata/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary hover:bg-white/90 transition-all"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
