import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metadata Cleaner Guide",
  description:
    "Complete tutorial for all MetaClean tools. Learn how to remove metadata from photos, PDFs, and text files with step-by-step instructions and tips.",
  keywords: [
    "metadata cleaner guide",
    "MetaClean tutorial",
    "how to use MetaClean",
    "remove metadata tutorial",
    "EXIF remover guide",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/metadata-cleaner-guide/`,
  },
};

const faqs = [
  {
    question: "Is MetaClean free to use?",
    answer:
      "Yes, MetaClean is completely free. There are no subscriptions, no hidden fees, and no premium tiers. All tools are available to everyone.",
  },
  {
    question: "Do my files get uploaded to a server?",
    answer:
      "No. All MetaClean processing happens entirely in your browser using client-side JavaScript. Your files never leave your device.",
  },
  {
    question: "What file formats does MetaClean support?",
    answer:
      "MetaClean supports photos (JPG, JPEG, PNG, WEBP, HEIC), PDF documents, and plain text files (TXT). We regularly add support for additional formats.",
  },
  {
    question: "Can I use MetaClean on my phone?",
    answer:
      "Yes. MetaClean is fully responsive and works on any device with a modern web browser, including iPhones, Android phones, and tablets.",
  },
  {
    question: "What is the Privacy Score tool?",
    answer:
      "The Privacy Score tool analyzes your files and assigns a rating based on the metadata they contain. It identifies potential privacy risks and recommends actions to improve your score.",
  },
  {
    question: "How do I batch process multiple files?",
    answer:
      "Open any of the cleaning tools, then select multiple files by dragging a folder or holding Ctrl/Cmd while clicking individual files. All selected files will be processed together.",
  },
];

const tocItems = [
  { id: "photo-tool", label: "Photo Metadata Remover" },
  { id: "gps-tool", label: "GPS Remover" },
  { id: "pdf-tool", label: "PDF Metadata Remover" },
  { id: "batch-tool", label: "Batch Metadata Remover" },
  { id: "exif-viewer", label: "EXIF Viewer" },
  { id: "privacy-score", label: "Privacy Score Tool" },
  { id: "tips", label: "Tips and Tricks" },
];

export default function MetadataCleanerGuidePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    {
      name: "Metadata Cleaner Guide",
      url: "/blog/metadata-cleaner-guide/",
    },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={generateFAQSchema(faqs)} />

      <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <nav
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog/" className="hover:text-foreground">
            Blog
          </Link>
          <span>/</span>
          <span className="text-foreground">Metadata Cleaner Guide</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Guide
                </span>
                <span className="text-sm text-muted-foreground">
                  10 min read
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Metadata Cleaner Guide
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                The complete guide to every MetaClean tool — when to use each
                one and how to get the best results.
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <p>
                MetaClean is a suite of free, privacy-focused tools designed to
                help you remove hidden metadata from your files. Every tool
                processes your files entirely in your browser, meaning your data
                never leaves your device. This guide walks you through each tool,
                explains when to use it, and shares tips for getting the most out
                of MetaClean.
              </p>

              <section id="photo-tool">
                <h2>Photo Metadata Remover</h2>
                <p>
                  The{" "}
                  <Link
                    href="/remove-photo-metadata/"
                    className="text-primary hover:underline"
                  >
                    Photo Metadata Remover
                  </Link>{" "}
                  is MetaClean&apos;s primary tool for stripping EXIF data from
                  images. It supports JPG, JPEG, PNG, WEBP, and HEIC formats and
                  gives you full control over which metadata fields to remove.
                </p>
                <h3>When to Use It</h3>
                <ul>
                  <li>
                    Before posting photos on social media platforms that preserve
                    metadata
                  </li>
                  <li>
                    When sharing photos via email or messaging apps
                  </li>
                  <li>
                    Before selling or giving away a device with photos on it
                  </li>
                  <li>
                    When publishing photos on a website or blog
                  </li>
                  <li>
                    Before submitting photos for a job application or contest
                  </li>
                </ul>
                <h3>How to Use It</h3>
                <ol>
                  <li>
                    Visit the Photo Metadata Remover page on any device with a
                    web browser
                  </li>
                  <li>
                    Drag and drop your photos onto the upload area, or click to
                    browse and select files
                  </li>
                  <li>
                    Review the detected metadata displayed for each photo. You
                    will see GPS coordinates, camera information, timestamps, and
                    other embedded data
                  </li>
                  <li>
                    Choose which metadata to remove. You can selectively remove
                    specific fields or strip everything at once
                  </li>
                  <li>
                    Click &quot;Clean Metadata&quot; and download your cleaned
                    photos
                  </li>
                </ol>
                <p>
                  The cleaned photos are visually identical to the originals. Only
                  the hidden metadata is removed — the image data itself is
                  completely untouched.
                </p>
              </section>

              <section id="gps-tool">
                <h2>GPS Remover</h2>
                <p>
                  The{" "}
                  <Link
                    href="/remove-gps-from-photo/"
                    className="text-primary hover:underline"
                  >
                    GPS Remover
                  </Link>{" "}
                  is a focused tool that strips only GPS coordinates from your
                  photos while preserving all other EXIF data. This is ideal for
                  photographers who want to share their camera settings without
                  revealing their location.
                </p>
                <h3>When to Use It</h3>
                <ul>
                  <li>
                    When you want to share camera settings but keep your location
                    private
                  </li>
                  <li>
                    For photography communities where EXIF data is valued but
                    location is not relevant
                  </li>
                  <li>
                    When you need to quickly strip location data without affecting
                    other metadata fields
                  </li>
                </ul>
                <h3>How It Differs from the Photo Metadata Remover</h3>
                <p>
                  The GPS Remover targets only the GPS-related fields in your
                  photo&apos;s metadata. Camera model, focal length, aperture,
                  ISO, and other settings are preserved. The Photo Metadata
                  Remover, on the other hand, gives you the option to remove all
                  metadata fields or selectively choose which ones to strip.
                </p>
              </section>

              <section id="pdf-tool">
                <h2>PDF Metadata Remover</h2>
                <p>
                  The{" "}
                  <Link
                    href="/remove-pdf-metadata/"
                    className="text-primary hover:underline"
                  >
                    PDF Metadata Remover
                  </Link>{" "}
                  handles metadata embedded in PDF documents. PDFs can contain
                  author names, creation dates, modification history, software
                  versions, and even hidden layers that reveal editing
                  information.
                </p>
                <h3>When to Use It</h3>
                <ul>
                  <li>
                    Before sharing resumes, cover letters, or job applications
                  </li>
                  <li>
                    When publishing documents that contain author or organization
                    information
                  </li>
                  <li>
                    Before submitting legal or business documents
                  </li>
                  <li>
                    When distributing sensitive documents that should not reveal
                    their creation history
                  </li>
                </ul>
                <h3>How to Use It</h3>
                <ol>
                  <li>
                    Visit the PDF Metadata Remover page
                  </li>
                  <li>
                    Upload your PDF by dragging and dropping or browsing
                  </li>
                  <li>
                    Review the detected metadata including author, creator
                    tool, and creation date
                  </li>
                  <li>
                    Click &quot;Clean Metadata&quot; to strip the identified
                    fields
                  </li>
                  <li>
                    Download your cleaned PDF
                  </li>
                </ol>
              </section>

              <section id="batch-tool">
                <h2>Batch Metadata Remover</h2>
                <p>
                  The{" "}
                  <Link
                    href="/batch-metadata-remover/"
                    className="text-primary hover:underline"
                  >
                    Batch Metadata Remover
                  </Link>{" "}
                  lets you process multiple files simultaneously, regardless of
                  format. You can mix photos, PDFs, and text files in a single
                  batch operation.
                </p>
                <h3>When to Use It</h3>
                <ul>
                  <li>
                    When you have a large number of files to clean
                  </li>
                  <li>
                    When working with mixed file types (photos and PDFs together)
                  </li>
                  <li>
                    For periodic privacy maintenance on your file library
                  </li>
                  <li>
                    When preparing files for publication or distribution
                  </li>
                </ul>
                <h3>How to Use It</h3>
                <ol>
                  <li>
                    Open the Batch Metadata Remover page
                  </li>
                  <li>
                    Select multiple files by dragging a folder onto the page or
                    holding Ctrl/Cmd while clicking individual files
                  </li>
                  <li>
                    All files will be processed with the same cleaning options
                  </li>
                  <li>
                    Download all cleaned files at once as a batch
                  </li>
                </ol>
                <p>
                  Batch processing is entirely client-side, so it runs as fast as
                  your device&apos;s processor allows. There are no file size
                  limits or server-side delays.
                </p>
              </section>

              <section id="exif-viewer">
                <h2>EXIF Viewer</h2>
                <p>
                  The{" "}
                  <Link
                    href="/exif-viewer/"
                    className="text-primary hover:underline"
                  >
                    EXIF Viewer
                  </Link>{" "}
                  is an inspection tool that displays all metadata embedded in
                  your files. It does not remove anything — it simply shows you
                  what is there.
                </p>
                <h3>When to Use It</h3>
                <ul>
                  <li>
                    Before cleaning files, to understand what metadata they
                    contain
                  </li>
                  <li>
                    When you want to verify that metadata was successfully removed
                  </li>
                  <li>
                    To audit your photo library for privacy risks
                  </li>
                  <li>
                    For educational purposes — learning what metadata your devices
                    record
                  </li>
                </ul>
                <h3>How to Use It</h3>
                <ol>
                  <li>
                    Visit the EXIF Viewer page
                  </li>
                  <li>
                    Upload any photo or image file
                  </li>
                  <li>
                    Browse the displayed metadata organized by category
                  </li>
                  <li>
                    Search for specific fields using the search bar
                  </li>
                  <li>
                    Expand and collapse sections to focus on the data you care
                    about
                  </li>
                </ol>
                <p>
                  For a complete walkthrough of the EXIF Viewer&apos;s features,
                  see our{" "}
                  <Link
                    href="/blog/exif-viewer-guide/"
                    className="text-primary hover:underline"
                  >
                    EXIF Viewer Guide
                  </Link>{" "}
                  .
                </p>
              </section>

              <section id="privacy-score">
                <h2>Privacy Score Tool</h2>
                <p>
                  The{" "}
                  <Link
                    href="/privacy-score-tool/"
                    className="text-primary hover:underline"
                  >
                    Privacy Score Tool
                  </Link>{" "}
                  analyzes your files and assigns a privacy rating based on the
                  metadata they contain. It identifies specific privacy risks and
                  recommends actions to improve your score.
                </p>
                <h3>When to Use It</h3>
                <ul>
                  <li>
                    When you want a quick assessment of a file&apos;s privacy
                    risk
                  </li>
                  <li>
                    Before sharing files, to verify they are safe
                  </li>
                  <li>
                    To prioritize which files in your library need cleaning first
                  </li>
                </ul>
                <h3>How It Works</h3>
                <p>
                  The Privacy Score is calculated based on the types of metadata
                  present in your file. GPS coordinates receive the highest risk
                  weight, followed by device identifiers, timestamps, and camera
                  information. Files with no metadata receive the highest
                  (safest) score. The tool provides a clear breakdown of what
                  each piece of metadata contributes to the overall risk.
                </p>
              </section>

              <section id="tips">
                <h2>Tips and Tricks</h2>
                <h3>Establish a Pre-Sharing Workflow</h3>
                <p>
                  Make metadata cleaning a habit before sharing any file. Develop
                  a simple workflow: open MetaClean, upload, clean, and share.
                  This takes only seconds and prevents accidental metadata
                  leakage.
                </p>
                <h3>Use the EXIF Viewer First</h3>
                <p>
                  Before cleaning a file, use the EXIF Viewer to understand what
                  metadata it contains. This helps you decide whether to remove
                  everything or just specific fields. It also helps you
                  understand the privacy implications of what you are sharing.
                </p>
                <h3>Check Your Privacy Score</h3>
                <p>
                  After cleaning a file, run it through the Privacy Score Tool to
                  verify that it has achieved a safe rating. This is especially
                  important when cleaning files that contain sensitive
                  information.
                </p>
                <h3>Disable Location Tags for Future Photos</h3>
                <p>
                  The best metadata is metadata that was never collected. Disable
                  location access for your Camera app to prevent GPS data from
                  being embedded in new photos. See our guides on{" "}
                  <Link
                    href="/blog/iphone-photo-metadata-explained/"
                    className="text-primary hover:underline"
                  >
                    iPhone
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/blog/android-photo-metadata-explained/"
                    className="text-primary hover:underline"
                  >
                    Android
                  </Link>{" "}
                  privacy for device-specific instructions.
                </p>
                <h3>Process Sensitive Files Immediately</h3>
                <p>
                  Files containing personal information — resumes, legal
                  documents, photos of sensitive locations — should be cleaned as
                  soon as they are created. Do not wait until you are ready to
                  share them.
                </p>
                <h3>Verify After Cleaning</h3>
                <p>
                  After cleaning a file, upload it to the EXIF Viewer to confirm
                  that the metadata was successfully removed. While MetaClean
                  reliably strips metadata, verifying the result gives you peace
                  of mind before sharing.
                </p>
              </section>

              <h2>Start Cleaning Your Files Today</h2>
              <p>
                MetaClean makes it easy to protect your privacy by removing
                hidden metadata from photos, PDFs, and text files. All tools are
                free, work entirely in your browser, and require no installation
                or account creation.
              </p>
              <p>
                Start with whichever tool matches your needs — or try them all to
                understand the full capabilities of the suite.
              </p>
            </div>

            <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground mb-3">
                Try all MetaClean tools
              </h2>
              <p className="text-muted-foreground mb-5">
                Remove metadata from photos, PDFs, and text files — all free,
                all private, all in your browser.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/remove-photo-metadata/"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
                >
                  Photo Metadata Remover
                </Link>
                <Link
                  href="/remove-pdf-metadata/"
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  PDF Metadata Remover
                </Link>
                <Link
                  href="/batch-metadata-remover/"
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  Batch Remover
                </Link>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                On this page
              </p>
              <nav className="space-y-1">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-muted-foreground hover:text-foreground py-1 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>

        <FAQSection
          title="Frequently Asked Questions"
          description="Common questions about using MetaClean tools"
          faqs={faqs}
        />
      </article>
    </>
  );
}
