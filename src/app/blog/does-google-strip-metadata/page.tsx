import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Does Google Strip Metadata",
  description:
    "Learn how Google handles photo metadata across Google Photos, Gmail, Drive, and Android. Understand what metadata Google strips and what it retains.",
  keywords: [
    "Google photo metadata",
    "Google Photos privacy",
    "Android EXIF data",
    "Google metadata stripping",
    "Google Drive photo privacy",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/does-google-strip-metadata/`,
  },
};

const faqs = [
  {
    question: "Does Google Photos strip metadata from my photos?",
    answer:
      "Google Photos does not strip EXIF metadata from your photos. Your photos are stored with all metadata intact, including GPS coordinates, camera details, and timestamps. Google uses this metadata for features like location-based organization and search.",
  },
  {
    question: "Does Gmail strip metadata from photo attachments?",
    answer:
      "Gmail does not strip metadata from photo attachments. Photos sent via Gmail retain all EXIF data, including GPS coordinates. Always strip metadata before attaching photos to emails.",
  },
  {
    question: "Does Google Drive strip metadata from uploaded photos?",
    answer:
      "Google Drive does not strip metadata from uploaded photos. Your photos are stored with all EXIF data intact. Anyone with access to your Drive can view the full metadata of your photos.",
  },
  {
    question: "Can Google use my photo metadata for advertising?",
    answer:
      "Google's privacy policy allows it to use data from its services, which may include photo metadata, for purposes like improving services and personalizing ads. While Google states it does not use Gmail content for ad targeting, photo metadata from Google Photos may be used for service improvement.",
  },
  {
    question: "How do I remove metadata from Google Photos?",
    answer:
      "Google Photos does not offer a built-in option to remove metadata. Use MetaClean's free online tool to strip all metadata from your photos before uploading them to Google Photos or sharing them from Google Photos.",
  },
];

const tableOfContents = [
  { id: "google-photos-metadata", label: "Google Photos Metadata" },
  { id: "gmail-attachments", label: "Gmail Attachment Metadata" },
  { id: "google-drive", label: "Google Drive Privacy" },
  { id: "android-camera", label: "Android Camera Metadata" },
  { id: "google-data-collection", label: "Google Data Collection" },
  { id: "how-to-protect", label: "How to Protect Your Privacy" },
  { id: "faq", label: "FAQ" },
];

export default function DoesGoogleStripMetadataPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Does Google Strip Metadata", url: "/blog/does-google-strip-metadata/" },
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
          <span className="text-foreground">Does Google Strip Metadata</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Platform Guide</span>
            <span className="text-sm text-muted-foreground">9 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Does Google Strip Metadata? Google Services Privacy</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Google handles billions of photos daily across its services. Here is what happens to your photo metadata in the Google ecosystem.
          </p>
        </header>

        <div className="flex gap-12">
          <aside className="hidden lg:block w-56 shrink-0">
            <nav className="sticky top-24 space-y-1" aria-label="Table of Contents">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">On This Page</p>
              {tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="prose prose-gray max-w-none flex-1 min-w-0">
            <section id="google-photos-metadata">
              <h2>Google Photos: Metadata Storage, Not Stripping</h2>
              <p>
                Google Photos is one of the most popular photo storage and sharing services in the
                world, with over a billion users. When you upload photos to Google Photos, the
                platform stores your images with all EXIF metadata intact — it does not strip
                metadata during the upload process.
              </p>
              <p>
                Google uses your photo metadata for several purposes:
              </p>
              <ul>
                <li><strong>Location-based organization:</strong> Google Photos uses GPS metadata to organize your photos by place, creating a map of everywhere you have taken photos.</li>
                <li><strong>Search functionality:</strong> Metadata helps Google Photos provide search results when you look for photos by date, location, or device.</li>
                <li><strong>Memories and suggestions:</strong> Google Photos uses metadata to create Memories, suggest edits, and organize your library.</li>
                <li><strong>AI analysis:</strong> Google uses your photos and metadata to train its AI models and improve its image recognition capabilities.</li>
              </ul>
              <p>
                While Google Photos provides convenient organization features, the retention of
                metadata means your location history, camera details, and shooting patterns are
                stored on Google&apos;s servers. This data is tied to your Google account and
                persists indefinitely until you delete the photos.
              </p>
            </section>

            <section id="gmail-attachments">
              <h2>Gmail: Photo Attachments Retain Full Metadata</h2>
              <p>
                When you attach photos to a Gmail message, the files are sent with all EXIF metadata
                intact. The recipient receives the complete image file, including GPS coordinates,
                camera details, timestamps, and any other embedded metadata.
              </p>
              <p>
                This is a commonly overlooked privacy risk. Many people email photos to friends,
                family, and colleagues without realizing that the metadata reveals sensitive
                information about where and when the photo was taken. If you email a photo of
                your home to a contractor, the metadata reveals your home address. If you email
                a photo from a vacation, the metadata reveals the exact location.
              </p>
              <p>
                Gmail does not strip metadata during processing, and the photos are stored on
                Google&apos;s servers with metadata intact. Even after you delete the email, the
                photos may persist in Google&apos;s backup systems and on the recipient&apos;s device.
              </p>
            </section>

            <section id="google-drive">
              <h2>Google Drive: Cloud Storage With Metadata</h2>
              <p>
                Google Drive stores uploaded files with all metadata intact. Photos uploaded to
                Google Drive retain their complete EXIF data, including GPS coordinates, camera
                details, and timestamps.
              </p>
              <p>
                Google Drive is commonly used for file sharing and collaboration, which means
                photos stored in Drive may be accessible to multiple people. If you share a folder
                containing photos, all recipients receive the files with metadata intact. This
                creates privacy risks for both the uploader and the subjects of the photos.
              </p>
              <p>
                Additionally, Google Drive files are stored on Google&apos;s servers and are subject
                to Google&apos;s data policies. While Google encrypts data in transit and at rest,
                the company holds the encryption keys and can access your files for service
                improvement, legal compliance, and other purposes outlined in its privacy policy.
              </p>
            </section>

            <section id="android-camera">
              <h2>Android Camera: Default Metadata Recording</h2>
              <p>
                Android smartphones record extensive metadata by default when you take photos.
                This includes GPS coordinates, camera settings, timestamps, device information,
                and unique device identifiers. The exact metadata varies by manufacturer and
                Android version, but most Android devices record:
              </p>
              <ul>
                <li><strong>GPS coordinates:</strong> Exact location where the photo was taken.</li>
                <li><strong>Device model and manufacturer:</strong> The specific phone used to take the photo.</li>
                <li><strong>Camera settings:</strong> Aperture, shutter speed, ISO, focal length, and white balance.</li>
                <li><strong>Timestamps:</strong> Date and time the photo was taken.</li>
                <li><strong>Software version:</strong> The camera app and Android version used.</li>
                <li><strong>Unique identifiers:</strong> Some Android devices include unique identifiers that can be traced to the specific device.</li>
              </ul>
              <p>
                Android allows you to disable location services for the Camera app, but this
                must be done manually in Settings &gt; Apps &gt; Camera &gt; Permissions. Most
                users do not change this default setting, meaning their photos contain location
                data by default.
              </p>
            </section>

            <section id="google-data-collection">
              <h2>Google&apos;s Data Collection Practices</h2>
              <p>
                Google collects and uses data from its services for multiple purposes. While
                Google states that it does not sell your personal data, it uses data to improve
                its services and personalize your experience:
              </p>
              <ul>
                <li><strong>Service improvement:</strong> Google uses data from Google Photos to improve image recognition, search, and organization features.</li>
                <li><strong>AI training:</strong> Your photos and metadata may be used to train Google&apos;s AI models, including image recognition and generation systems.</li>
                <li><strong>Advertising:</strong> While Google states it does not use Gmail content for ad targeting, data from other services may inform advertising profiles.</li>
                <li><strong>Legal compliance:</strong> Google must comply with legal requests for user data, which may include photo metadata.</li>
                <li><strong>Account management:</strong> Your photo data is tied to your Google account and can be accessed, downloaded, or deleted through Google Takeout and account settings.</li>
              </ul>
              <p>
                Understanding Google&apos;s data collection practices is essential for making
                informed decisions about what you store in Google services and what metadata
                you allow to be collected.
              </p>
            </section>

            <section id="how-to-protect">
              <h2>How to Protect Your Photo Privacy on Google</h2>
              <p>
                Follow these steps to protect your privacy in the Google ecosystem:
              </p>
              <ol>
                <li><strong>Strip metadata before uploading:</strong> Use MetaClean to remove all metadata before uploading photos to Google Photos, Drive, or Gmail.</li>
                <li><strong>Disable location for Camera:</strong> On Android, go to Settings &gt; Apps &gt; Camera &gt; Permissions and disable Location.</li>
                <li><strong>Review Google Photos settings:</strong> Check your Google Photos settings for location sharing and face grouping options.</li>
                <li><strong>Manage your Google account:</strong> Review your Google account privacy settings and data collection preferences.</li>
                <li><strong>Use Google Takeout:</strong> Periodically download and review your Google data to understand what is being stored.</li>
                <li><strong>Be selective with sharing:</strong> Only share Google Photos albums and Drive folders with people you trust.</li>
                <li><strong>Clean before every upload:</strong> Make metadata removal a standard part of your photo workflow.</li>
              </ol>
              <p>
                For more tips on protecting your photo privacy, see our guide on{" "}
                <Link href="/remove-photo-metadata/" className="text-primary hover:underline">
                  removing photo metadata
                </Link>
                .
              </p>
            </section>

            <h2>Conclusion</h2>
            <p>
              Google does not strip metadata from your photos across its services. Google Photos,
              Gmail, Drive, and Android all retain EXIF data including GPS coordinates, camera
              details, and timestamps. While Google provides useful features powered by this
              metadata, it also creates significant privacy risks. The only reliable way to
              protect your privacy is to strip metadata before using any Google service.
            </p>
            <p>
              Use{" "}
              <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                MetaClean&apos;s free tool
              </Link>{" "}
              to strip all metadata from your photos before uploading them to Google Photos,
              sending them via Gmail, or storing them in Google Drive. The process happens entirely
              in your browser, ensuring your files never leave your device.
            </p>
          </div>
        </div>

        <section className="mt-16 rounded-xl border border-border bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Protect Your Google Photos</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Strip metadata from your photos before uploading to Google Photos, Gmail, or Drive.
          </p>
          <Link
            href="/social-media-cleaner/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Try the Social Media Cleaner — Free
          </Link>
        </section>

        <div id="faq">
          <FAQSection
            title="Frequently Asked Questions"
            description="Google photo metadata and privacy questions"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
