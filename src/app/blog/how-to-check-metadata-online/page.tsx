import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How To Check Metadata Online",
  description:
    "Learn how to view and analyze metadata in your photos and documents using online tools. Check what hidden data your files reveal before sharing them.",
  keywords: [
    "check metadata online",
    "view photo metadata",
    "online EXIF viewer",
    "check file metadata",
    "metadata viewer tool",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/how-to-check-metadata-online/`,
  },
};

const faqs = [
  {
    question: "What is the best way to check metadata online?",
    answer:
      "The best approach is to use a client-side metadata viewer like MetaClean's EXIF Viewer. It processes your files entirely in your browser without uploading them to any server, ensuring your privacy while you check what metadata your files contain.",
  },
  {
    question: "Can I check metadata without uploading my files?",
    answer:
      "Yes. Client-side metadata viewers like MetaClean process files locally in your browser. Your files never leave your device, so you can check metadata without any privacy risk. Avoid online tools that require you to upload files to their servers.",
  },
  {
    question: "What metadata can I see in a photo?",
    answer:
      "You can typically see GPS coordinates, camera make and model, lens information, exposure settings (aperture, shutter speed, ISO), timestamp, flash information, white balance, and sometimes the software used to process the image. The exact metadata depends on the device and settings used.",
  },
  {
    question: "How do I check metadata in a PDF?",
    answer:
      "Use a metadata viewer that supports PDF files. MetaClean's Metadata Checker displays all PDF metadata including author, creator software, creation date, modification date, file path, and other document properties. Upload the PDF to see all embedded metadata.",
  },
  {
    question: "Why should I check my file metadata?",
    answer:
      "Checking metadata helps you understand what information your files reveal before sharing them. You may discover GPS coordinates, personal names, device serial numbers, or other sensitive data that you did not realize was embedded in your files. This awareness allows you to clean files before sharing.",
  },
];

const tocItems = [
  { id: "why-check-metadata", title: "Why Check Metadata" },
  { id: "photo-metadata", title: "Checking Photo Metadata" },
  { id: "pdf-metadata", title: "Checking PDF Metadata" },
  { id: "client-side-vs-cloud", title: "Client-Side vs Cloud Tools" },
  { id: "what-to-look-for", title: "What to Look For" },
  { id: "next-steps", title: "Next Steps After Checking" },
];

export default function HowToCheckMetadataOnlinePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "How To Check Metadata Online", url: "/blog/how-to-check-metadata-online/" },
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
          <span className="text-foreground">How To Check Metadata Online</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Guide</span>
                <span className="text-sm text-muted-foreground">7 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">How To Check Metadata Online</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Before you share any file, you should know what metadata it contains. Here is how to check your photos and documents for hidden data.
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <h2 id="why-check-metadata">Why You Should Check Metadata Before Sharing</h2>

              <p>
                Most people share digital files without ever examining what hidden data
                those files contain. A photo that looks innocent may contain GPS coordinates
                revealing your exact location. A document that appears straightforward may
                contain author names, revision history, and file paths that expose internal
                information. Checking metadata before sharing is a fundamental privacy
                practice that takes only seconds but prevents irreversible privacy violations.
              </p>

              <p>
                The challenge is that metadata is invisible in normal use. You cannot see
                GPS coordinates by looking at a photo, and you cannot see author information
                by reading a document. You need specialized tools to extract and display
                this hidden data. Fortunately, several free tools make this process quick
                and easy.
              </p>

              <p>
                This guide walks you through how to check metadata in different file types,
                explains what to look for, and recommends the safest tools for the job.
              </p>

              <h2 id="photo-metadata">Checking Photo Metadata</h2>

              <p>
                Photo metadata — commonly called EXIF data — is the most well-known type
                of hidden file data. Here is how to check it:
              </p>

              <h3>Using MetaClean&apos;s EXIF Viewer</h3>

              <p>
                The simplest and safest way to check photo metadata is to use the{" "}
                <Link href="/exif-viewer/" className="text-primary hover:underline">
                  EXIF Viewer
                </Link>
                :
              </p>

              <ol>
                <li>Open the EXIF Viewer in your web browser.</li>
                <li>Upload your photo by dragging it onto the page or clicking to browse.</li>
                <li>The tool displays all metadata found in the image, organized by category.</li>
                <li>Review the GPS section for location data, the Camera section for device details, and the Timestamp section for time information.</li>
              </ol>

              <p>
                The EXIF Viewer processes your photo entirely in your browser. Your image
                is never uploaded to any server, which means your privacy is protected
                throughout the checking process.
              </p>

              <h3>What You Will Find in Photo Metadata</h3>

              <p>
                Common metadata fields in photos include:
              </p>

              <ul>
                <li><strong>GPS Latitude/Longitude:</strong> Your exact location when the photo was taken.</li>
                <li><strong>Camera Make/Model:</strong> The specific device used to take the photo.</li>
                <li><strong>Date/Time Original:</strong> When the photo was taken.</li>
                <li><strong>Exposure Settings:</strong> Aperture, shutter speed, and ISO.</li>
                <li><strong>Focal Length:</strong> The lens setting used.</li>
                <li><strong>Flash:</strong> Whether the flash was used.</li>
                <li><strong>Software:</strong> The app or firmware used to process the image.</li>
              </ul>

              <h2 id="pdf-metadata">Checking PDF Metadata</h2>

              <p>
                PDFs contain metadata that is different from photo EXIF data. To check
                PDF metadata:
              </p>

              <ol>
                <li>
                  Use the{" "}
                  <Link href="/metadata-checker/" className="text-primary hover:underline">
                    Metadata Checker
                  </Link>{" "}
                  to analyze your PDF file.
                </li>
                <li>Upload the PDF and review the displayed metadata.</li>
                <li>Check the Author field for personal or organizational names.</li>
                <li>Review the Creator and Producer fields for software information.</li>
                <li>Check the File Path field for internal directory structures.</li>
                <li>Review creation and modification dates for timeline information.</li>
              </ol>

              <p>
                PDF metadata often contains more identifying information than people realize,
                including the author&apos;s full name, the company name from the software license,
                and the file path on the creator&apos;s computer.
              </p>

              <h2 id="client-side-vs-cloud">Client-Side vs Cloud-Based Tools</h2>

              <p>
                The tool you use to check metadata matters significantly for your privacy:
              </p>

              <h3>Client-Side Tools (Recommended)</h3>

              <p>
                Client-side tools like MetaClean process files entirely in your browser.
                Your files never leave your device, which means:
              </p>

              <ul>
                <li>Your photos and documents remain on your computer.</li>
                <li>No server receives or stores your files.</li>
                <li>No third party can access the metadata you are checking.</li>
                <li>The process works offline after the page loads.</li>
              </ul>

              <h3>Cloud-Based Tools (Higher Risk)</h3>

              <p>
                Cloud-based metadata viewers require you to upload your files to their
                servers. This creates privacy risks:
              </p>

              <ul>
                <li>Your files are transmitted over the internet to third-party servers.</li>
                <li>The service provider may store your files after processing.</li>
                <li>Your metadata is accessible to the service provider and potentially to others.</li>
                <li>Files may be retained even after you delete them.</li>
              </ul>

              <p>
                Always prefer client-side tools when checking metadata, especially for
                sensitive files.
              </p>

              <h2 id="what-to-look-for">What to Look For in Metadata</h2>

              <p>
                When checking metadata, focus on these high-risk fields:
              </p>

              <ul>
                <li><strong>GPS coordinates:</strong> The most dangerous metadata for personal privacy. If present, your exact location is exposed.</li>
                <li><strong>Personal names:</strong> Author names, creator names, or other identifying information.</li>
                <li><strong>Device serial numbers:</strong> Unique identifiers that can be traced to the device owner.</li>
                <li><strong>Timestamps:</strong> Date and time information that reveals your schedule and activity patterns.</li>
                <li><strong>File paths:</strong> Internal directory structures that reveal organizational information.</li>
                <li><strong>Software versions:</strong> Specific application versions that can indicate vulnerabilities.</li>
              </ul>

              <p>
                For a comprehensive assessment, use the{" "}
                <Link href="/privacy-score-tool/" className="text-primary hover:underline">
                  Privacy Score Tool
                </Link>{" "}
                which analyzes your files for all common privacy risks and gives you
                a clear rating.
              </p>

              <h2 id="next-steps">Next Steps After Checking Metadata</h2>

              <p>
                Once you have checked your metadata, take action based on what you find:
              </p>

              <ol>
                <li><strong>Remove GPS data:</strong> If your photos contain GPS coordinates, use the{" "}
                  <Link href="/remove-gps-from-photo/" className="text-primary hover:underline">
                    GPS Removal Tool
                  </Link>{" "}
                  to strip location data.
                </li>
                <li><strong>Clean all metadata:</strong> For maximum privacy, remove all metadata using the{" "}
                  <Link href="/remove-photo-metadata/" className="text-primary hover:underline">
                    Photo Metadata Remover
                  </Link>{" "}
                  or{" "}
                  <Link href="/remove-pdf-metadata/" className="text-primary hover:underline">
                    PDF Metadata Remover
                  </Link>
                  .
                </li>
                <li><strong>Verify the cleanup:</strong> After cleaning, upload the file back to the viewer to confirm all metadata has been removed.</li>
                <li><strong>Make it a habit:</strong> Check metadata before every external share to ensure your privacy is protected.</li>
              </ol>

              <h2>Conclusion</h2>

              <p>
                Checking metadata before sharing files is a simple but critical privacy
                practice. Use client-side tools like MetaClean to examine your photos and
                documents for hidden data, and remove any sensitive information before
                sharing. The few seconds it takes to check metadata can prevent
                irreversible privacy violations.
              </p>

              <p>
                Start by uploading one of your recent photos to the{" "}
                <Link href="/exif-viewer/" className="text-primary hover:underline">
                  EXIF Viewer
                </Link>{" "}
                to see what metadata it contains. You may be surprised by how much
                hidden data your files carry.
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
          <h2 className="text-2xl font-bold text-foreground mb-3">Check Your Files for Hidden Metadata</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Upload your photos and documents to see what metadata they contain. All processing happens in your browser.
          </p>
          <Link
            href="/exif-viewer/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Try the EXIF Viewer — Free
          </Link>
        </section>

        <div id="faq">
          <FAQSection
            title="Frequently Asked Questions"
            description="Questions about checking file metadata online"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
