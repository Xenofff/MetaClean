import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Best Free Metadata Cleaner Tools",
  description: "Compare the best free tools for removing metadata from photos, PDFs, and text files. Find the right tool for your privacy needs.",
  keywords: ["metadata cleaner", "EXIF remover", "free privacy tools", "metadata removal tool"],
  alternates: {
    canonical: `${siteConfig.url}/blog/best-metadata-cleaner-tools/`,
  },
};

const faqs = [
  {
    question: "What is the best free metadata removal tool?",
    answer: "MetaClean is one of the best free metadata removal tools because it processes files entirely in your browser, ensuring your data never leaves your device.",
  },
  {
    question: "Are online metadata removers safe?",
    answer: "Not all online tools are safe. Many upload your files to their servers. Choose tools like MetaClean that process files locally without uploading them.",
  },
  {
    question: "Can I remove metadata from multiple files at once?",
    answer: "Yes, MetaClean supports batch processing, allowing you to clean multiple files simultaneously while maintaining the same privacy guarantees.",
  },
];

const tools = [
  {
    name: "MetaClean",
    type: "Web-Based",
    features: ["Client-side processing", "Batch cleaning", "Multiple formats", "Privacy score"],
    pros: ["100% private", "No uploads required", "Free forever", "Works offline"],
    cons: ["Requires modern browser"],
    recommended: true,
    href: "/",
  },
  {
    name: "ExifTool",
    type: "Desktop Application",
    features: ["Command-line tool", "Batch processing", "Scriptable", "Cross-platform"],
    pros: ["Powerful", "Highly customizable", "Open source"],
    cons: ["Command-line only", "Steep learning curve"],
    recommended: false,
  },
  {
    name: "mat2",
    type: "Desktop Application",
    features: ["Metadata removal", "Multiple formats", "Command-line", "Library support"],
    pros: ["Open source", "Privacy-focused", "Extensive format support"],
    cons: ["Command-line only", "Limited GUI options"],
    recommended: false,
  },
];

export default function BestMetadataCleanerToolsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Best Free Metadata Cleaner Tools", url: "/blog/best-metadata-cleaner-tools/" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={generateFAQSchema(faqs)} />

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/blog/" className="hover:text-foreground">Blog</Link>
          <span>/</span>
          <span className="text-foreground">Best Free Metadata Cleaner Tools</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Tools</span>
            <span className="text-sm text-muted-foreground">8 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Best Free Metadata Cleaner Tools</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Comparison of the best free tools for removing metadata from files.
          </p>
        </header>

        <div className="prose prose-gray max-w-none">
          <h2>Why You Need a Metadata Cleaner</h2>

          <p>
            In today&apos;s digital world, metadata in your files can reveal sensitive information about you.
            Whether it&apos;s GPS coordinates in photos, author information in PDFs, or hidden characters in
            text files, removing this metadata is essential for protecting your privacy.
          </p>

          <h2>Top Metadata Cleaner Tools</h2>

          <div className="not-prose space-y-6 my-8">
            {tools.map((tool, index) => (
              <div
                key={index}
                className={`rounded-xl border p-6 ${
                  tool.recommended ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{tool.name}</h3>
                    <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {tool.type}
                    </span>
                  </div>
                  {tool.recommended && (
                    <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-white">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Features</h4>
                    <ul className="space-y-1">
                      {tool.features.map((feature, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Pros</h4>
                    <ul className="space-y-1">
                      {tool.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-success flex items-center gap-2">
                          <span>+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                    <h4 className="text-sm font-medium text-foreground mb-2 mt-3">Cons</h4>
                    <ul className="space-y-1">
                      {tool.cons.map((con, i) => (
                        <li key={i} className="text-sm text-danger flex items-center gap-2">
                          <span>-</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {tool.href && (
                  <Link
                    href={tool.href}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
                  >
                    Try {tool.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <h2>How to Choose the Right Tool</h2>

          <p>
            When selecting a metadata cleaner, consider these factors:
          </p>

          <ul>
            <li><strong>Privacy:</strong> Does the tool process files locally or upload them to servers?</li>
            <li><strong>Format Support:</strong> Does it support the file types you need to clean?</li>
            <li><strong>Ease of Use:</strong> Is the interface user-friendly for your technical level?</li>
            <li><strong>Batch Processing:</strong> Can you clean multiple files at once?</li>
            <li><strong>Cost:</strong> Is the tool free, and are there any hidden fees?</li>
          </ul>

          <h2>Why MetaClean Stands Out</h2>

          <p>
            MetaClean offers several advantages that make it the best choice for most users:
          </p>

          <ol>
            <li><strong>Complete Privacy:</strong> All processing happens in your browser — files never leave your device</li>
            <li><strong>No Installation:</strong> Works directly in your web browser without any downloads</li>
            <li><strong>Multiple Formats:</strong> Supports photos, PDFs, and text files</li>
            <li><strong>Batch Processing:</strong> Clean multiple files simultaneously</li>
            <li><strong>Free Forever:</strong> No subscriptions, no hidden fees</li>
            <li><strong>Privacy Score:</strong> Get a privacy rating for your files</li>
          </ol>

          <h2>Conclusion</h2>

          <p>
            Protecting your privacy by removing metadata from files doesn&apos;t have to be complicated
            or expensive. With tools like MetaClean, you can quickly and easily clean your files while
            maintaining complete privacy.
          </p>

          <p>
            Start protecting your privacy today with our{" "}
            <Link href="/" className="text-primary hover:underline">free metadata removal tools</Link>.
          </p>
        </div>

        <FAQSection
          title="Frequently Asked Questions"
          description="Choosing the right metadata cleaner tool"
          faqs={faqs}
        />
      </article>
    </>
  );
}
