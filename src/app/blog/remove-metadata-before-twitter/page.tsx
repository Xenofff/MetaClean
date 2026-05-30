import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Metadata Before Uploading To X",
  description:
    "Learn how X (formerly Twitter) handles photo metadata, what data survives upload, and how to strip EXIF data before posting to protect your privacy.",
  keywords: [
    "X metadata privacy",
    "Twitter photo metadata",
    "remove EXIF X",
    "Twitter EXIF data",
    "X privacy tips photos",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/remove-metadata-before-twitter/`,
  },
};

const faqs = [
  {
    question: "Does X (Twitter) strip metadata from photos?",
    answer:
      "X strips most EXIF metadata from images uploaded through the platform. However, the stripping is not guaranteed to be complete, and the original file with metadata may be retained on X's servers. Images shared via direct messages or through the API may be handled differently.",
  },
  {
    question: "Can someone track me through my X photos?",
    answer:
      "If your photos contain GPS metadata that X does not strip, they could be used to determine your location. Additionally, X collects its own data about your posts including IP address, device info, and upload time, which can be used for tracking regardless of EXIF data.",
  },
  {
    question: "What metadata does X keep from my photos?",
    answer:
      "X records the upload time, your IP address, device information, and may retain the original file on its servers. Even when EXIF data is stripped from the displayed image, X has its own metadata about your activity on the platform.",
  },
  {
    question: "Are photos in X DMs stripped of metadata?",
    answer:
      "Photos shared via X Direct Messages may not undergo the same metadata stripping as public posts. The handling of metadata in DMs is less transparent, making it important to clean photos before sending them through any channel.",
  },
  {
    question: "Should I remove metadata before every post on X?",
    answer:
      "Yes. While X strips most metadata from public posts, the process is not comprehensive, and X may retain original files. Removing metadata before uploading guarantees your privacy regardless of X's processing behavior or future policy changes.",
  },
];

const tocItems = [
  { id: "how-x-handles-images", title: "How X Handles Images" },
  { id: "metadata-stripping", title: "X's Metadata Stripping" },
  { id: "x-collects-internally", title: "What X Collects Internally" },
  { id: "dms-and-api", title: "DMs and API Uploads" },
  { id: "how-to-clean", title: "How to Clean Before Posting" },
  { id: "best-practices", title: "X Privacy Best Practices" },
];

export default function RemoveMetadataBeforeTwitterPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Remove Metadata Before Uploading To X", url: "/blog/remove-metadata-before-twitter/" },
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
          <span className="text-foreground">Remove Metadata Before Uploading To X</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Guide</span>
                <span className="text-sm text-muted-foreground">8 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Remove Metadata Before Uploading To X</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                X (formerly Twitter) processes your photos before displaying them. Here is what happens to your metadata in that process and why you should still clean your images first.
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <h2 id="how-x-handles-images">How X Handles Image Uploads</h2>

              <p>
                When you post a photo on X, the platform receives the image file and processes it
                through its infrastructure. X resizes images, compresses them for delivery, converts
                them to optimized formats, and strips certain metadata. This processing is designed
                to optimize images for the platform&apos;s feed, timeline, and direct message systems.
              </p>

              <p>
                X supports JPEG, PNG, GIF, and WebP formats for images. The platform applies different
                processing depending on the format and how the image is being used — a timeline image
                receives different treatment than an image in a direct message or an image uploaded
                via the API.
              </p>

              <p>
                For most users posting through the X app or website, the metadata stripping happens
                automatically as part of the upload process. However, the specifics of what is
                stripped and what remains are not publicly documented in detail, which makes it
                impossible to know exactly what metadata survives each upload.
              </p>

              <h2 id="metadata-stripping">What X Strips and What Remains</h2>

              <p>
                X removes most standard EXIF metadata from images posted publicly. This typically
                includes GPS coordinates, camera make and model, lens information, and most camera
                settings. The goal of this stripping is to reduce file size and remove data that
                is not relevant to the displayed image.
              </p>

              <p>
                However, several pieces of information may remain or be collected separately:
              </p>

              <ul>
                <li><strong>Upload timestamp:</strong> X records exactly when you posted the image, which is permanently associated with your tweet.</li>
                <li><strong>Device information:</strong> X collects the device model and operating system used for the upload, stored as platform metadata separate from the image file.</li>
                <li><strong>IP address:</strong> Your IP address at the time of upload reveals your approximate geographic location and internet service provider.</li>
                <li><strong>Original file:</strong> X may retain the original, unprocessed image on its servers, including any metadata that was stripped from the displayed version.</li>
                <li><strong>Geotag feature:</strong> If you add location to your tweet through X&apos;s own geotag feature, that location data is stored separately and publicly visible.</li>
              </ul>

              <p>
                The critical point is that while X strips metadata from the image you see, it
                collects its own metadata about your activity. This platform-level metadata can
                be used for advertising, analytics, and may be disclosed in response to legal
                requests.
              </p>

              <h2 id="x-collects-internally">What X Collects About Your Uploads</h2>

              <p>
                Beyond image metadata, X collects significant information about every photo you
                post:
              </p>

              <ul>
                <li><strong>Post metadata:</strong> The time, text, hashtags, mentions, and engagement metrics of every tweet containing your photos.</li>
                <li><strong>Location data:</strong> If you enable location services for X, the app may record your location at the time of posting.</li>
                <li><strong>Usage patterns:</strong> X tracks what you post, when you post, and how others interact with your content.</li>
                <li><strong>Device fingerprint:</strong> The combination of device model, OS version, browser, and other factors creates a unique identifier.</li>
                <li><strong>Network information:</strong> Your IP address, carrier, and network type are recorded with each upload.</li>
              </ul>

              <p>
                This data is stored on X&apos;s servers and is subject to X&apos;s privacy policy. It
                can be accessed by law enforcement through legal requests, used for targeted
                advertising, and shared with third-party partners.
              </p>

              <h2 id="dms-and-api">Direct Messages and API Uploads</h2>

              <p>
                Photos shared through X Direct Messages may not undergo the same metadata
                stripping as public posts. The DM system is a separate pipeline with its own
                processing rules, and the metadata handling in DMs is less transparent than
                for public tweets.
              </p>

              <p>
                Similarly, images uploaded through X&apos;s API — by third-party apps, bots, or
                automated systems — may retain more metadata than images uploaded through the
                official X app or website. The API allows developers to control how images are
                processed, and not all third-party applications strip metadata before uploading.
              </p>

              <p>
                This means that even if X strips metadata from your public posts, your photos
                may retain metadata when shared through DMs or third-party tools. The only way
                to guarantee that your photos are clean is to remove metadata before uploading
                them to any channel.
              </p>

              <h2 id="how-to-clean">How to Clean Photos Before Posting to X</h2>

              <p>
                The safest approach is to remove all metadata from your photos before uploading
                them to X. Here is the process:
              </p>

              <ol>
                <li>
                  Visit the{" "}
                  <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                    Social Media Cleaner
                  </Link>{" "}
                  on MetaClean.
                </li>
                <li>Upload the photos you want to share on X.</li>
                <li>Review the metadata detected in each image, including GPS coordinates, device information, and timestamps.</li>
                <li>Select all metadata for removal to ensure maximum privacy.</li>
                <li>Click the clean button to strip all metadata from the files.</li>
                <li>Download the cleaned images and upload them to X.</li>
              </ol>

              <p>
                The entire cleaning process happens in your browser. Your photos never leave
                your device, ensuring complete privacy. For multiple images, the{" "}
                <Link href="/batch-metadata-remover/" className="text-primary hover:underline">
                  Batch Metadata Remover
                </Link>{" "}
                lets you process an entire folder at once.
              </p>

              <h2 id="best-practices">X Privacy Best Practices</h2>

              <p>
                Beyond removing metadata, follow these practices to protect your privacy on X:
              </p>

              <ul>
                <li><strong>Disable location services:</strong> Prevent X from collecting location data beyond what you explicitly share.</li>
                <li><strong>Be selective with geotags:</strong> Only add location to tweets when it is not sensitive and you intentionally want to share your location.</li>
                <li><strong>Use a private account:</strong> For sensitive content, restrict who can see your posts and photos.</li>
                <li><strong>Clean before DMs:</strong> Remove metadata from photos before sending them via Direct Messages, as DM metadata handling is less transparent.</li>
                <li><strong>Review old posts:</strong> Audit your photo history and clean or delete posts that contain sensitive information.</li>
                <li><strong>Use a clean workflow:</strong> Make metadata removal a standard step before every X post, the same way you would crop or filter an image.</li>
              </ul>

              <h2>Conclusion</h2>

              <p>
                X strips most EXIF metadata from publicly posted images, but the process is
                not comprehensive, and the platform collects its own metadata about your
                activity. Photos shared via DMs or through third-party tools may retain full
                metadata. The only reliable way to protect your privacy is to remove metadata
                before uploading.
              </p>

              <p>
                Use{" "}
                <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                  MetaClean&apos;s Social Media Cleaner
                </Link>{" "}
                to strip all metadata from your photos before posting to X. The process is
                free, fast, and happens entirely in your browser.
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
          <h2 className="text-2xl font-bold text-foreground mb-3">Clean Your Photos Before Posting</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Strip metadata from your photos in seconds before sharing them on X or any social media platform.
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
            description="Questions about X (Twitter) photo metadata and privacy"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
