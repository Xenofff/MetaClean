import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Journalists Remove Metadata",
  description:
    "Journalists face unique metadata risks when protecting sources. Learn how media professionals strip EXIF data from photos and documents to safeguard confidential information.",
  keywords: [
    "journalist metadata removal",
    "source protection metadata",
    "media privacy metadata",
    "journalist photo privacy",
    "press freedom metadata",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/how-journalists-remove-metadata/`,
  },
};

const faqs = [
  {
    question: "Why do journalists need to remove metadata?",
    answer:
      "Journalists handle sensitive materials from confidential sources. Metadata in photos, documents, and other files can reveal source identities, locations, and other information that could compromise source safety and journalistic integrity. Removing metadata is essential for protecting press freedom.",
  },
  {
    question: "What metadata risks do journalists face?",
    answer:
      "Journalists face risks including source identification through GPS data, device tracking through serial numbers, location exposure of confidential meeting places, and timeline analysis through timestamps. Metadata in leaked documents can also reveal the source of the leak.",
  },
  {
    question: "How do journalists safely share photos from sources?",
    answer:
      "Journalists strip all metadata from photos before publishing or sharing them. They use client-side tools that process files locally, avoiding cloud services that could store or analyze the metadata. Many newsrooms have specific protocols for metadata handling.",
  },
  {
    question: "Can metadata in leaked documents identify sources?",
    answer:
      "Yes. Leaked documents often contain metadata that identifies the original author, creation date, and file path. This information can be used to trace the document back to its source, putting the source at risk. Journalists must clean metadata from leaked documents before publishing.",
  },
  {
    question: "Do newsrooms have metadata policies?",
    answer:
      "Many newsrooms have established metadata policies that require staff to strip metadata from all published materials. These policies typically cover photos, documents, and other digital files. However, not all newsrooms have formal policies, and individual journalists must take responsibility for metadata hygiene.",
  },
];

const tocItems = [
  { id: "journalist-metadata-risks", title: "Unique Risks for Journalists" },
  { id: "source-protection", title: "Source Protection" },
  { id: "document-handling", title: "Handling Leaked Documents" },
  { id: "photo-privacy", title: "Photo Privacy in Journalism" },
  { id: "newsroom-practices", title: "Newsroom Practices" },
  { id: "tools-and-workflows", title: "Tools and Workflows" },
];

export default function HowJournalistsRemoveMetadataPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "How Journalists Remove Metadata", url: "/blog/how-journalists-remove-metadata/" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={generateFAQSchema(faqs)} />

      <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/blog/" className="hover:text-foreground">Blog</Link>
          <span>/</span>
          <span className="text-foreground">How Journalists Remove Metadata</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Guide</span>
                <span className="text-sm text-muted-foreground">10 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">How Journalists Remove Metadata</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Protecting sources is a fundamental principle of journalism. Here is how metadata removal plays a critical role in source safety and press freedom.
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <h2 id="journalist-metadata-risks">Unique Metadata Risks for Journalists</h2>

              <p>
                Journalists operate in an environment where the stakes of metadata exposure
                are extraordinarily high. Unlike casual social media users who risk
                location tracking or identity exposure, journalists face risks that can
                compromise confidential sources, ongoing investigations, and personal safety.
                A single metadata leak can expose a source in a repressive regime, reveal
                the existence of a confidential source, or put a journalist&apos;s life in danger.
              </p>

              <p>
                The challenge is compounded by the fact that journalists handle an enormous
                volume of digital materials. Leaked documents, source photographs, interview
                recordings, and investigative materials all contain metadata that can be
                analyzed. In the digital age, the traditional practice of protecting source
                identity extends to protecting every piece of metadata associated with that
                source&apos;s materials.
              </p>

              <p>
                This article examines the specific metadata risks journalists face and the
                practices that media professionals use to protect sources and maintain the
                confidentiality that is essential to investigative journalism.
              </p>

              <h2 id="source-protection">Source Protection Through Metadata Removal</h2>

              <p>
                The most critical metadata concern for journalists is source protection.
                When a source provides photographs, documents, or other digital materials,
                the metadata in those files can reveal the source&apos;s identity:
              </p>

              <ul>
                <li><strong>GPS coordinates:</strong> Photos taken by sources may contain GPS data revealing where the source was when they captured the material, which can identify their home, workplace, or the location of a sensitive event.</li>
                <li><strong>Device information:</strong> The make, model, and serial number of the source&apos;s device can be traced back to the source through purchase records or device registration.</li>
                <li><strong>Timestamps:</strong> The exact time a photo was taken can be correlated with the source&apos;s known schedule or presence at a location.</li>
                <li><strong>Software information:</strong> The apps or software used to create or process the material can reveal the source&apos;s digital habits and technical sophistication.</li>
              </ul>

              <p>
                When a journalist publishes material from a source without removing metadata,
                they are effectively publishing the source&apos;s location, device identity, and
                activity timeline alongside the content. This information can be extracted by
                anyone — including the subjects of the investigation or government surveillance
                operations.
              </p>

              <h3>Real-World Consequences</h3>

              <p>
                The consequences of metadata exposure in journalism are not hypothetical.
                In several documented cases, metadata in published materials has been used
                to identify sources:
              </p>

              <ul>
                <li>Photographs published by news outlets have contained GPS data that revealed the location of confidential sources.</li>
                <li>Leaked government documents published with metadata intact have been traced back to their original authors.</li>
                <li>Whistleblower materials shared with journalists have contained device serial numbers that could identify the leaker.</li>
              </ul>

              <h2 id="document-handling">Handling Leaked Documents Safely</h2>

              <p>
                Leaked documents present one of the most complex metadata challenges for
                journalists. These documents often contain extensive metadata about their
                creation, modification, and distribution:
              </p>

              <ul>
                <li><strong>Author information:</strong> The original author&apos;s name, email, and organizational affiliation.</li>
                <li><strong>Revision history:</strong> A complete log of who edited the document and when, which can reveal the chain of custody.</li>
                <li><strong>File paths:</strong> Internal server names and directory structures that reveal organizational information.</li>
                <li><strong>Template information:</strong> Internal templates that can identify the organization or department.</li>
                <li><strong>Comments and annotations:</strong> Internal discussions that may contain sensitive information.</li>
              </ul>

              <p>
                Before publishing leaked documents, journalists must strip all metadata to
                protect the source. This requires using tools that process files locally
                rather than uploading them to cloud services, which could store or analyze
                the metadata.
              </p>

              <p>
                The{" "}
                <Link href="/remove-pdf-metadata/" className="text-primary hover:underline">
                  PDF Metadata Remover
                </Link>{" "}
                processes files entirely in the browser, ensuring that the document never
                leaves the journalist&apos;s device during the cleaning process.
              </p>

              <h2 id="photo-privacy">Photo Privacy in Journalism</h2>

              <p>
                Journalists handle photographs from multiple sources — their own camera
                equipment, source-provided images, wire services, and social media. Each
                source carries different metadata risks:
              </p>

              <h3>Journalist-Captured Photos</h3>

              <p>
                Photos taken by journalists during investigations may reveal the locations
                of confidential meetings, safe houses, or sensitive events. GPS metadata
                in these photos can be used to trace the journalist&apos;s movements and
                identify their sources.
              </p>

              <h3>Source-Provided Photos</h3>

              <p>
                Photos provided by sources carry the source&apos;s device metadata, which can
                identify them. Before publishing, journalists must strip all metadata to
                protect the source&apos;s identity.
              </p>

              <h3>Social Media Photos</h3>

              <p>
                Photos from social media may contain metadata from the original upload,
                even if the platform stripped some data from the displayed version. The
                original metadata may be recoverable from the source or from cached versions.
              </p>

              <h2 id="newsroom-practices">Newsroom Metadata Practices</h2>

              <p>
                Leading news organizations have developed formal metadata handling policies
                to protect sources and maintain journalistic integrity:
              </p>

              <ul>
                <li><strong>Mandatory metadata removal:</strong> Many newsrooms require all published materials to have metadata stripped before publication.</li>
                <li><strong>Client-side processing:</strong> Newsrooms increasingly use tools that process files locally rather than uploading to cloud services.</li>
                <li><strong>Staff training:</strong> Journalists are trained to recognize metadata risks and follow established protocols for handling sensitive materials.</li>
                <li><strong>Audit procedures:</strong> Some newsrooms audit published materials for metadata before and after publication.</li>
                <li><strong>Source communication:</strong> Journalists advise sources on metadata hygiene, including how to disable GPS tagging and clean files before sharing.</li>
              </ul>

              <h2 id="tools-and-workflows">Tools and Workflows for Journalists</h2>

              <p>
                Effective metadata removal for journalists requires tools that prioritize
                security and privacy:
              </p>

              <ol>
                <li>
                  <strong>Use client-side tools:</strong> Tools like MetaClean process files in
                  the browser, ensuring that sensitive materials never leave the journalist&apos;s
                  device. This is essential for protecting source confidentiality.
                </li>
                <li>
                  <strong>Clean before any sharing:</strong> Remove metadata from all materials
                  before sharing them with editors, colleagues, or publishing platforms.
                </li>
                <li>
                  <strong>Verify the cleanup:</strong> After cleaning, verify that all metadata
                  has been removed using the{" "}
                  <Link href="/exif-viewer/" className="text-primary hover:underline">
                    EXIF Viewer
                  </Link>
                  .
                </li>
                <li>
                  <strong>Batch process efficiently:</strong> When handling large document dumps,
                  use the{" "}
                  <Link href="/batch-metadata-remover/" className="text-primary hover:underline">
                    Batch Metadata Remover
                  </Link>{" "}
                  to clean entire folders at once.
                </li>
                <li>
                  <strong>Maintain a clean workflow:</strong> Establish a standard process for
                  handling all digital materials that includes metadata removal as a mandatory step.
                </li>
              </ol>

              <h2>Conclusion</h2>

              <p>
                Metadata removal is not just a privacy practice for journalists — it is
                an ethical obligation. Protecting sources is fundamental to press freedom,
                and metadata in digital materials can compromise source safety. By using
                client-side tools to strip metadata from all published materials, journalists
                can maintain the confidentiality that their sources depend on.
              </p>

              <p>
                Start by checking your current materials with the{" "}
                <Link href="/exif-viewer/" className="text-primary hover:underline">
                  EXIF Viewer
                </Link>{" "}
                and establishing a metadata removal workflow for all future materials.
                The few seconds it takes to clean a file can protect a source&apos;s life.
              </p>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h4 className="text-sm font-semibold text-foreground mb-4">Table of Contents</h4>
              <nav className="space-y-2">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>

        <section className="mt-16 rounded-xl border border-border bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Protect Your Sources</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Strip metadata from all materials before publishing. Client-side processing ensures sensitive files never leave your device.
          </p>
          <Link
            href="/remove-pdf-metadata/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Try the PDF Metadata Remover — Free
          </Link>
        </section>

        <div id="faq">
          <FAQSection
            title="Frequently Asked Questions"
            description="Questions about metadata removal for journalists and source protection"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
