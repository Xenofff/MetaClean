import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Metadata Before Facebook Uploads",
  description:
    "Understand how Facebook handles photo metadata, what data it collects, and how to protect your privacy by removing EXIF data before uploading.",
  keywords: [
    "Facebook metadata",
    "Facebook photo privacy",
    "remove EXIF Facebook",
    "Facebook EXIF data",
    "Facebook privacy protection",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/remove-metadata-before-facebook-uploads/`,
  },
};

const faqs = [
  {
    question: "Does Facebook strip EXIF data from photos?",
    answer:
      "Facebook strips most EXIF metadata when you upload photos. However, the stripping is not guaranteed to be complete, and Facebook collects its own data about your uploads, including location data if you choose to tag a location.",
  },
  {
    question: "Can someone find my address from a Facebook photo?",
    answer:
      "If your photo contains GPS metadata and Facebook does not fully strip it, yes. Additionally, Facebook's location tagging feature explicitly reveals your location. Even without metadata, visual clues in photos can help someone identify where you live.",
  },
  {
    question: "Does Facebook store my photo location?",
    answer:
      "Facebook stores location data if you add a location tag to your post. The platform also collects IP address data, device information, and usage patterns that can reveal your location independently of photo metadata.",
  },
  {
    question: "Is it safe to share photos on Facebook without removing metadata?",
    answer:
      "While Facebook strips most metadata, the process is not foolproof. For maximum privacy, remove metadata before uploading. This protects you regardless of how Facebook processes your images.",
  },
  {
    question: "How do I remove metadata from photos before uploading to Facebook?",
    answer:
      "Use MetaClean's Social Media Cleaner to strip all metadata from your photos before uploading. The process happens entirely in your browser, ensuring your files are never uploaded to a server.",
  },
  {
    question: "Does Facebook Messenger preserve photo metadata?",
    answer:
      "Photos sent through Facebook Messenger may retain more metadata than public posts, as they go through a different processing pipeline. Always clean metadata before sharing photos through any channel.",
  },
];

const tableOfContents = [
  { id: "facebook-metadata-handling", label: "How Facebook Handles Metadata" },
  { id: "what-facebook-collects", label: "What Facebook Collects" },
  { id: "messenger-risks", label: "Messenger Privacy Risks" },
  { id: "location-tagging", label: "Location Tagging Dangers" },
  { id: "who-can-see-your-photos", label: "Who Can See Your Photos" },
  { id: "how-to-clean", label: "How to Clean Before Uploading" },
  { id: "privacy-checklist", label: "Facebook Privacy Checklist" },
  { id: "faq", label: "FAQ" },
];

export default function RemoveMetadataBeforeFacebookUploadsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Remove Metadata Before Facebook Uploads", url: "/blog/remove-metadata-before-facebook-uploads/" },
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
          <span className="text-foreground">Remove Metadata Before Facebook Uploads</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Guide</span>
            <span className="text-sm text-muted-foreground">9 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Remove Metadata Before Facebook Uploads</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Facebook processes billions of photos daily. Here is what happens to your metadata in that process — and why you should clean your photos first.
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
            <section id="facebook-metadata-handling">
              <h2>How Facebook Handles Photo Metadata</h2>
              <p>
                Facebook is one of the largest photo-sharing platforms in the world, hosting billions of
                images. When you upload a photo to Facebook, the platform processes the image through
                its servers, where it undergoes resizing, compression, and — importantly — metadata
                stripping.
              </p>
              <p>
                Facebook removes most EXIF data from uploaded photos, including camera settings, GPS
                coordinates, device serial numbers, and timestamps. This means that when someone views
                your photo on Facebook, the image file they receive generally does not contain the
                original metadata from your camera or phone.
              </p>
              <p>
                However, this stripping is not a guarantee of complete privacy. Facebook&apos;s metadata
                handling has several nuances that users should understand to make informed decisions
                about what they share and how.
              </p>
            </section>

            <section id="what-facebook-collects">
              <h2>What Facebook Collects About Your Photos</h2>
              <p>
                Even though Facebook strips EXIF data from the image file, the platform collects its own
                data about your uploads. This data is stored on Facebook&apos;s servers and is used for
                advertising, analytics, and platform improvement:
              </p>
              <ul>
                <li><strong>Upload timestamp:</strong> Facebook records exactly when you uploaded each photo, creating a timeline of your activity.</li>
                <li><strong>Device information:</strong> The platform logs the device model, operating system, and browser used for the upload.</li>
                <li><strong>IP address:</strong> Your IP address reveals your approximate geographic location and internet service provider.</li>
                <li><strong>Location tags:</strong> If you add a location to your post, that data is stored and associated with your profile.</li>
                <li><strong>Face recognition:</strong> Facebook&apos;s face recognition technology can identify you in photos and build a biometric profile.</li>
                <li><strong>Image analysis:</strong> Facebook uses AI to analyze the content of your photos, identifying objects, scenes, text, and people.</li>
              </ul>
              <p>
                This data is subject to Meta&apos;s data policies and can be accessed by law enforcement
                through legal requests. It also feeds into Facebook&apos;s advertising system, which uses
                your photo activity to build detailed profiles for targeted advertising.
              </p>
            </section>

            <section id="messenger-risks">
              <h2>Facebook Messenger: A Hidden Metadata Risk</h2>
              <p>
                Facebook Messenger is one of the most commonly overlooked metadata risks. When you send
                a photo through Messenger, the image goes through a different processing pipeline than
                public posts. This means:
              </p>
              <ul>
                <li><strong>Less metadata stripping:</strong> Messenger photos may retain more EXIF data than photos posted to your timeline.</li>
                <li><strong>Original quality:</strong> Messenger often preserves more of the original image data, which can include metadata.</li>
                <li><strong>Recipient access:</strong> The person receiving your photo can download the original file, potentially including metadata.</li>
                <li><strong>Forwarding:</strong> Photos sent via Messenger can be forwarded to others, spreading any remaining metadata to a wider audience.</li>
              </ul>
              <p>
                If you send photos through Facebook Messenger, you should treat them with the same caution
                as any other file transfer. Remove metadata before sending, especially if the photo was
                taken at or near your home or other sensitive locations.
              </p>
            </section>

            <section id="location-tagging">
              <h2>The Danger of Facebook Location Tagging</h2>
              <p>
                Facebook actively encourages users to add location tags to their posts. This feature is
                separate from EXIF GPS data and represents an explicit sharing of your location. However,
                many users add location tags without fully understanding the privacy implications:
              </p>
              <ul>
                <li><strong>Public visibility:</strong> Location-tagged posts on public profiles reveal your whereabouts to anyone on the internet.</li>
                <li><strong>Pattern analysis:</strong> A history of location-tagged posts creates a detailed map of your movements over time.</li>
                <li><strong>Friends-of-friends exposure:</strong> Even on private profiles, your posts may be visible to a large network of people you do not know well.</li>
                <li><strong>Check-in data:</strong> Facebook check-ins create permanent records of your visits to specific locations.</li>
              </ul>
              <p>
                Be especially cautious about tagging your home, workplace, children&apos;s school, or any
                other location that reveals your daily routine. Even a few location-tagged posts can
                provide enough information for someone to track your schedule.
              </p>
            </section>

            <section id="who-can-see-your-photos">
              <h2>Who Can Actually See Your Facebook Photos</h2>
              <p>
                Understanding Facebook&apos;s privacy settings is crucial because they determine who can
                access your photos and any metadata they may contain:
              </p>
              <ul>
                <li><strong>Public posts:</strong> Visible to anyone on the internet, including search engines, data scrapers, and archived by third parties.</li>
                <li><strong>Friends only:</strong> Visible to your entire friends list, which may include people you barely know.</li>
                <li><strong>Custom audiences:</strong> Visible to selected groups, but the recipients can still download and re-share your photos.</li>
                <li><strong>Albums:</strong> Shared albums can be viewed by anyone with the link, even without a Facebook account.</li>
              </ul>
              <p>
                Remember that even with strict privacy settings, your photos can be screenshotted, saved,
                and re-shared by anyone who can see them. Once a photo leaves Facebook&apos;s ecosystem,
                you lose all control over how it is handled and what metadata it may carry.
              </p>
            </section>

            <section id="how-to-clean">
              <h2>How to Clean Metadata Before Uploading to Facebook</h2>
              <p>
                The most effective way to protect your privacy is to remove all metadata from your photos
                before uploading them to Facebook. Here is how to do it:
              </p>
              <ol>
                <li>
                  Visit the{" "}
                  <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                    Social Media Cleaner
                  </Link>{" "}
                  page on MetaClean.
                </li>
                <li>Upload your photos by dragging them onto the page or clicking to browse.</li>
                <li>Review the detected metadata, including GPS coordinates, camera details, and timestamps.</li>
                <li>Select all metadata for removal to ensure maximum privacy.</li>
                <li>Click &quot;Clean Metadata&quot; to process your photos.</li>
                <li>Download the cleaned versions and upload them to Facebook.</li>
              </ol>
              <p>
                The entire process happens in your browser — your photos are never uploaded to MetaClean&apos;s
                servers. This ensures complete privacy while cleaning your images.
              </p>
            </section>

            <section id="privacy-checklist">
              <h2>Facebook Photo Privacy Checklist</h2>
              <p>
                Follow this checklist to maximize your privacy when sharing photos on Facebook:
              </p>
              <ol>
                <li><strong>Remove metadata before uploading:</strong> Use MetaClean to strip all EXIF data from your photos.</li>
                <li><strong>Review location tags:</strong> Only add location tags when the location is not sensitive.</li>
                <li><strong>Disable location services:</strong> Turn off location access for the Facebook app in your phone settings.</li>
                <li><strong>Audience settings:</strong> Set your default posting audience to &quot;Friends&quot; rather than &quot;Public.&quot;</li>
                <li><strong>Review old posts:</strong> Periodically check and clean up old posts that may contain location data.</li>
                <li><strong>Clean Messenger photos:</strong> Remove metadata from photos before sending them via Messenger.</li>
                <li><strong>Check tagged photos:</strong> Review and approve photos others tag you in, as they may contain metadata you cannot control.</li>
                <li><strong>Disable face recognition:</strong> Turn off Facebook&apos;s face recognition feature to prevent biometric profiling.</li>
              </ol>
              <p>
                For more information about cleaning photos for social media, see our guide on{" "}
                <Link href="/remove-photo-metadata/" className="text-primary hover:underline">
                  removing photo metadata
                </Link>
                .
              </p>
            </section>

            <h2>Conclusion</h2>
            <p>
              Facebook strips most EXIF metadata from uploaded photos, but the platform collects its own
              data about your uploads, and Messenger photos may retain more metadata than public posts.
              Location tagging, face recognition, and the ability for others to download and re-share your
              photos add additional layers of privacy risk.
            </p>
            <p>
              The safest approach is to remove all metadata from your photos before uploading them to
              Facebook.{" "}
              <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                MetaClean&apos;s Social Media Cleaner
              </Link>{" "}
              makes this process fast, free, and completely private — your files never leave your browser.
            </p>
          </div>
        </div>

        <section className="mt-16 rounded-xl border border-border bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Clean Your Photos Before Uploading to Facebook</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Strip all metadata from your photos before sharing them on Facebook. No uploads, no server processing — everything happens in your browser.
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
            description="Facebook photo metadata and privacy questions"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
