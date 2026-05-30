import Link from "next/link";
import JsonLd from "@/components/json-ld";
import { generateBreadcrumbSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Guide - How to Protect Your Digital Privacy",
  description: "Learn how metadata in your files can expose sensitive information and how to protect your privacy online. Complete guide to digital privacy protection.",
  keywords: ["privacy guide", "digital privacy", "metadata privacy", "online privacy protection", "data privacy"],
  alternates: {
    canonical: `${siteConfig.url}/privacy-guide/`,
  },
};

export default function PrivacyGuidePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Privacy Guide", url: "/privacy-guide/" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground">Privacy Guide</span>
        </nav>

        <article className="prose prose-gray max-w-none">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Complete Guide to Digital Privacy</h1>

          <p className="text-lg text-muted-foreground">
            Learn how metadata in your files can expose sensitive information and how to protect yourself online.
          </p>

          <div className="not-prose rounded-xl border border-border bg-muted/50 p-6 my-8">
            <h2 className="text-lg font-semibold text-foreground mb-2">Quick Summary</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Photos contain hidden data including GPS location and device info
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                PDF files can reveal author identity and creation software
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Text files may contain invisible tracking characters
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Always remove metadata before sharing files online
              </li>
            </ul>
          </div>

          <h2>What is Metadata?</h2>

          <p>
            Metadata is information about your files that you typically cannot see but is stored alongside the actual content.
            When you take a photo with your smartphone, it doesn&apos;t just capture the image — it also records details like
            where the photo was taken, what device you used, the camera settings, and even the time and date.
          </p>

          <p>
            While metadata can be useful for organizing your files, it can also pose serious privacy risks when shared online.
            Social media platforms often strip some metadata, but not all of it, and many file-sharing methods preserve the
            original metadata completely.
          </p>

          <h2>Photo Metadata (EXIF Data)</h2>

          <p>
            EXIF (Exchangeable Image File Format) data is metadata embedded in image files by cameras and smartphones.
            This data can include:
          </p>

          <ul>
            <li><strong>GPS Coordinates:</strong> Your exact location when the photo was taken</li>
            <li><strong>Device Information:</strong> Make and model of your camera or phone</li>
            <li><strong>Camera Settings:</strong> Aperture, shutter speed, ISO, and focal length</li>
            <li><strong>Timestamps:</strong> When the photo was taken and modified</li>
            <li><strong>Software:</strong> What app or software was used to edit the photo</li>
            <li><strong>Author Information:</strong> Your name if you&apos;re logged into your device</li>
          </ul>

          <h3>Why GPS Data is Dangerous</h3>

          <p>
            GPS metadata is perhaps the most concerning because it can reveal:
          </p>

          <ul>
            <li>Your home address (if you take photos at home)</li>
            <li>Your workplace location</li>
            <li>Frequent locations you visit</li>
            <li>Your daily routine and patterns</li>
            <li>Places you&apos;ve traveled to</li>
          </ul>

          <p>
            Attackers can use this information for stalking, burglary planning, or social engineering attacks.
            Even seemingly innocent photos of your pets or garden can reveal your exact address.
          </p>

          <h2>PDF Metadata</h2>

          <p>
            PDF files often contain metadata that can reveal information about the document and its creator:
          </p>

          <ul>
            <li><strong>Author Name:</strong> Your full name if you created the document</li>
            <li><strong>Creation Date:</strong> When the document was created</li>
            <li><strong>Software:</strong> What application was used to create or edit the PDF</li>
            <li><strong>Company Name:</strong> Organization information if using enterprise software</li>
            <li><strong>Keywords:</strong> Terms you&apos;ve used to categorize the document</li>
          </ul>

          <h2>Text File Metadata</h2>

          <p>
            Text files can contain hidden characters that serve as tracking mechanisms:
          </p>

          <ul>
            <li><strong>BOM (Byte Order Mark):</strong> Hidden characters at the start of files</li>
            <li><strong>Invisible Unicode:</strong> Zero-width spaces and other invisible characters</li>
            <li><strong>Control Characters:</strong> Non-printable characters that can carry information</li>
            <li><strong>Tracking Characters:</strong> Unique identifiers embedded in text</li>
          </ul>

          <h2>How to Protect Yourself</h2>

          <p>
            The best way to protect your privacy is to remove metadata from files before sharing them online.
            Here are some best practices:
          </p>

          <ol>
            <li><strong>Use MetaClean:</strong> Our tool processes files entirely in your browser, ensuring your data never leaves your device.</li>
            <li><strong>Check Before Sharing:</strong> Always review metadata before sending files to others.</li>
            <li><strong>Disable Location Services:</strong> Consider turning off location tagging for your camera.</li>
            <li><strong>Regular Audits:</strong> Periodically check your files for unwanted metadata.</li>
            <li><strong>Use Privacy-Focused Tools:</strong> Choose tools that prioritize client-side processing.</li>
          </ol>

          <h2>Why Client-Side Processing Matters</h2>

          <p>
            Many online tools claim to remove metadata but actually upload your files to their servers.
            This means your files are transmitted over the internet and potentially stored on third-party servers.
          </p>

          <p>
            MetaClean is different. All processing happens directly in your browser using modern JavaScript APIs.
            Your files are never uploaded anywhere, ensuring complete privacy and security.
          </p>

          <div className="not-prose rounded-xl border border-primary/20 bg-primary/5 p-6 my-8">
            <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Protect Your Privacy?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start removing metadata from your files in seconds with MetaClean.
            </p>
            <div className="flex gap-3">
              <a
                href="/remove-photo-metadata/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
              >
                Clean Photos
              </a>
              <a
                href="/remove-pdf-metadata/"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Clean PDFs
              </a>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
