import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Does Apple Strip Metadata",
  description:
    "Find out how Apple handles photo metadata across iPhone, iPad, and Mac. Learn what metadata Apple strips, what it keeps, and what you can do to protect your privacy.",
  keywords: [
    "Apple photo metadata",
    "iPhone metadata stripping",
    "Apple privacy",
    "iOS EXIF data",
    "Apple iCloud metadata",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/does-apple-strip-metadata/`,
  },
};

const faqs = [
  {
    question: "Does Apple strip metadata when I share photos?",
    answer:
      "Apple does not automatically strip EXIF metadata when you share photos through AirDrop, Messages, Mail, or other apps. The metadata stripping depends on the sharing method and the receiving platform. Photos shared via AirDrop retain all metadata.",
  },
  {
    question: "Does iCloud strip metadata from photos?",
    answer:
      "iCloud does not strip EXIF metadata from your photos. Your photos are stored in iCloud with all metadata intact. Anyone with access to your iCloud account can view the full metadata of your photos.",
  },
  {
    question: "Can I remove metadata on iPhone before sharing?",
    answer:
      "Yes. You can use third-party apps or MetaClean's web-based tool to strip metadata from your iPhone photos before sharing. iOS does not have a built-in option to remove metadata before sharing.",
  },
  {
    question: "Does Apple Photos show metadata?",
    answer:
      "Yes. Apple Photos shows location data on a map and provides camera information when you swipe up on a photo. This metadata is visible to anyone with access to your device or iCloud account.",
  },
  {
    question: "Is Apple better for photo privacy than Android?",
    answer:
      "Apple and Android handle photo metadata similarly — neither automatically strips metadata when sharing. Apple's privacy-focused marketing may give the impression of more protection, but EXIF metadata handling is comparable between platforms.",
  },
];

const tableOfContents = [
  { id: "apple-metadata-handling", label: "Apple's Metadata Handling" },
  { id: "sharing-methods", label: "Sharing Methods and Metadata" },
  { id: "icloud-privacy", label: "iCloud Privacy" },
  { id: "apple-photos-app", label: "Apple Photos App" },
  { id: "airdrop-metadata", label: "AirDrop Metadata" },
  { id: "how-to-protect", label: "How to Protect Your Privacy" },
  { id: "faq", label: "FAQ" },
];

export default function DoesAppleStripMetadataPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Does Apple Strip Metadata", url: "/blog/does-apple-strip-metadata/" },
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
          <span className="text-foreground">Does Apple Strip Metadata</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Platform Guide</span>
            <span className="text-sm text-muted-foreground">8 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Does Apple Strip Metadata? Apple Ecosystem Privacy</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Apple positions itself as a privacy-first company — but what actually happens to your photo metadata in the Apple ecosystem?
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
            <section id="apple-metadata-handling">
              <h2>How Apple Handles Photo Metadata</h2>
              <p>
                Apple has built its brand on privacy, and many users assume that Apple automatically
                protects their photo metadata. The reality is more nuanced. Apple does strip some
                metadata in certain contexts, but the behavior is not consistent across all sharing
                methods.
              </p>
              <p>
                When you take a photo with your iPhone, the image contains extensive EXIF metadata
                including GPS coordinates, camera settings, timestamps, device information, and
                unique device identifiers. This metadata is embedded in the image file and is
                stored in your photo library with all fields intact.
              </p>
              <p>
                Apple&apos;s approach to metadata is primarily about organization and features rather
                than privacy. The Photos app uses metadata for features like Memories, location-based
                organization, and visual search. This means Apple has a vested interest in
                maintaining metadata, even as it markets privacy as a core value.
              </p>
            </section>

            <section id="sharing-methods">
              <h2>Sharing Methods and Metadata Retention</h2>
              <p>
                How your metadata is handled depends entirely on how you share your photos:
              </p>
              <ul>
                <li><strong>AirDrop:</strong> Photos shared via AirDrop retain all EXIF metadata. The recipient receives the complete file with GPS coordinates, camera details, and timestamps.</li>
                <li><strong>Messages:</strong> Photos sent via iMessage are processed through Apple&apos;s servers and may have some metadata stripped during compression, but the behavior is not documented or guaranteed.</li>
                <li><strong>Mail:</strong> Photos sent via Apple Mail retain all metadata unless you manually strip it before attaching.</li>
                <li><strong>Social sharing:</strong> When you share to Instagram, Facebook, or other platforms through the share sheet, the platform processes the photo and may strip metadata — but this depends on the platform, not Apple.</li>
                <li><strong>AirDrop to non-Apple devices:</strong> When sharing to Android or Windows devices, the file transfer method determines metadata retention.</li>
              </ul>
              <p>
                The key takeaway is that Apple does not proactively strip metadata when you share
                photos. The metadata handling depends on the receiving platform or service, not
                on Apple.
              </p>
            </section>

            <section id="icloud-privacy">
              <h2>iCloud Privacy: What Apple Stores</h2>
              <p>
                iCloud Photos stores your entire photo library in the cloud, including all EXIF
                metadata. This means Apple has access to — and stores — the GPS coordinates,
                timestamps, and device information for every photo in your library.
              </p>
              <p>
                While Apple uses end-to-end encryption for some iCloud data, iCloud Photos is
                not end-to-end encrypted by default. This means Apple can technically access your
                photo metadata, and the data may be accessible to law enforcement through legal
                requests.
              </p>
              <p>
                Apple introduced Advanced Data Protection for iCloud, which provides end-to-end
                encryption for most iCloud data, including Photos. However, this feature must be
                manually enabled, and it is not enabled by default for most users.
              </p>
              <p>
                Even with Advanced Data Protection enabled, your photo metadata is still stored in
                iCloud — it is just encrypted. Apple cannot read it, but the data persists on
                Apple&apos;s servers and is tied to your Apple ID.
              </p>
            </section>

            <section id="apple-photos-app">
              <h2>Apple Photos App: Metadata for Features</h2>
              <p>
                Apple Photos uses your photo metadata extensively for its features:
              </p>
              <ul>
                <li><strong>Location-based organization:</strong> Photos are automatically organized by location using GPS metadata, creating a map of everywhere you have taken photos.</li>
                <li><strong>Memories:</strong> Apple Photos creates automated slideshows and collections based on your photos, using metadata to group images by time, place, and people.</li>
                <li><strong>Visual search:</strong> Apple uses on-device AI to analyze your photos, identifying objects, scenes, and text — all informed by metadata context.</li>
                <li><strong>Siri suggestions:</strong> Apple may use photo metadata to provide Siri suggestions, such as reminding you of locations you have visited.</li>
                <li><strong>Shared albums:</strong> Photos in shared albums retain their metadata, which is visible to anyone with access to the album.</li>
              </ul>
              <p>
                While these features are useful, they rely on Apple having access to your photo
                metadata. If you are concerned about Apple&apos;s access to your location data,
                you can disable location services for the Camera app and review your iCloud
                settings.
              </p>
            </section>

            <section id="airdrop-metadata">
              <h2>AirDrop Metadata: What You Need to Know</h2>
              <p>
                AirDrop is one of the most common ways Apple users share photos, and it is also
                one of the least understood in terms of metadata handling. When you AirDrop a
                photo:
              </p>
              <ul>
                <li><strong>All metadata is preserved:</strong> The complete EXIF data — including GPS coordinates, camera details, and timestamps — is transmitted to the recipient.</li>
                <li><strong>No processing:</strong> Unlike social media platforms, AirDrop does not process or compress the image, so no metadata is lost during transfer.</li>
                <li><strong>Device-to-device:</strong> AirDrop is a direct device-to-device transfer, meaning there is no server-side processing that might strip metadata.</li>
                <li><strong>Unknown recipients:</strong> If you accidentally AirDrop to the wrong person, they receive your full photo with all metadata.</li>
              </ul>
              <p>
                For maximum privacy, strip metadata from your photos before AirDropping them,
                especially to people you do not know well or in public settings where your
                AirDrop may be visible to nearby devices.
              </p>
            </section>

            <section id="how-to-protect">
              <h2>How to Protect Your Photo Privacy on Apple Devices</h2>
              <p>
                Follow these steps to protect your privacy in the Apple ecosystem:
              </p>
              <ol>
                <li><strong>Disable location for Camera:</strong> Go to Settings &gt; Privacy &amp; Security &gt; Location Services &gt; Camera and set to &quot;Never.&quot;</li>
                <li><strong>Strip metadata before sharing:</strong> Use MetaClean to remove all metadata before sharing photos via AirDrop, email, or any other method.</li>
                <li><strong>Review iCloud settings:</strong> Enable Advanced Data Protection if you want end-to-end encryption for your iCloud Photos.</li>
                <li><strong>Be selective with shared albums:</strong> Only share albums with people you trust, as shared album photos retain metadata.</li>
                <li><strong>Review location data:</strong> Periodically check your Photos app for location data on sensitive images.</li>
                <li><strong>AirDrop carefully:</strong> Be aware that AirDrop preserves all metadata. Strip before sending.</li>
                <li><strong>Use MetaClean regularly:</strong> Make metadata removal a standard part of your photo sharing workflow.</li>
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
              Apple does not automatically strip metadata from your photos when you share them.
              AirDrop, Mail, and Messages all preserve metadata. iCloud stores your photos with
              all metadata intact. While Apple&apos;s privacy practices are strong in many areas,
              photo metadata handling is not one of them. The only reliable way to protect your
              privacy is to strip metadata before sharing.
            </p>
            <p>
              Use{" "}
              <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                MetaClean&apos;s free tool
              </Link>{" "}
              to strip all metadata from your iPhone, iPad, or Mac photos before sharing them.
              The process happens entirely in your browser, ensuring your files never leave your device.
            </p>
          </div>
        </div>

        <section className="mt-16 rounded-xl border border-border bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Protect Your Apple Photos</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Strip metadata from your iPhone, iPad, or Mac photos before sharing them via AirDrop, email, or social media.
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
            description="Apple photo metadata and privacy questions"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
