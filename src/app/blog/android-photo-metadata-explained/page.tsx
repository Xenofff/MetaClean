import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Android Photo Metadata Explained",
  description:
    "Discover what metadata Android phones record in photos, how Samsung, Google Pixel, and other manufacturers handle location tags, and how to disable them.",
  keywords: [
    "Android metadata",
    "Android photo data",
    "Samsung photo privacy",
    "Android EXIF data",
    "disable location tags Android",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/android-photo-metadata-explained/`,
  },
};

const faqs = [
  {
    question: "Do all Android phones record GPS data in photos?",
    answer:
      "Most Android phones record GPS data by default when you take a photo. However, the exact behavior depends on your phone manufacturer, Android version, and camera app settings.",
  },
  {
    question: "How do I turn off location tags on Samsung phones?",
    answer:
      "Open the Camera app, tap the gear icon for Settings, and toggle off &quot;Location tags.&quot; On newer Samsung devices, this may be under &quot;Save location info&quot; or &quot;Geo tag&quot; in the camera settings menu.",
  },
  {
    question: "Does Google Pixel save GPS coordinates in photos?",
    answer:
      "Yes, Google Pixel phones record GPS coordinates when location access is enabled for the Camera app. You can disable this in Settings > Location > App permissions > Camera.",
  },
  {
    question: "Can I remove metadata from Android photos after taking them?",
    answer:
      "Yes, use MetaClean's Photo Metadata Remover to strip GPS coordinates and other EXIF data from any photo, regardless of which Android device captured it.",
  },
  {
    question: "Why do different Android phones have different metadata settings?",
    answer:
      "Android is an open platform, so each manufacturer (Samsung, Google, OnePlus, Xiaomi, etc.) builds their own camera app with different settings menus and default configurations.",
  },
  {
    question: "Does the Google Photos app preserve metadata when sharing?",
    answer:
      "When you share directly from Google Photos, metadata may be preserved depending on the sharing method. Using the share sheet typically keeps metadata intact unless the receiving platform strips it.",
  },
];

const tocItems = [
  { id: "android-recording", label: "What Android Records" },
  { id: "manufacturer-differences", label: "Manufacturer Differences" },
  { id: "samsung-settings", label: "Samsung Camera Settings" },
  { id: "google-pixel", label: "Google Pixel Settings" },
  { id: "other-brands", label: "OnePlus, Xiaomi, and Others" },
  { id: "disable-location-tags", label: "How to Disable Location Tags" },
  { id: "removing-metadata", label: "Removing Metadata After the Fact" },
];

export default function AndroidPhotoMetadataExplainedPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    {
      name: "Android Photo Metadata Explained",
      url: "/blog/android-photo-metadata-explained/",
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
          <span className="text-foreground">
            Android Photo Metadata Explained
          </span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Privacy
                </span>
                <span className="text-sm text-muted-foreground">
                  7 min read
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Android Photo Metadata Explained
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                What your Android phone records in every photo and how to take
                control of your location privacy.
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <section id="android-recording">
                <h2>What Android Records in Your Photos</h2>
                <p>
                  Just like iPhones, Android smartphones embed a wealth of
                  metadata into every photo you capture. This hidden data — known
                  as EXIF metadata — includes camera settings, device
                  information, timestamps, and most importantly, your precise
                  geographic location.
                </p>
                <p>
                  The exact metadata recorded varies depending on your phone
                  manufacturer, Android version, and which camera app you use.
                  However, the core set of information is remarkably consistent
                  across the Android ecosystem. Every major Android device
                  records some combination of GPS coordinates, camera model,
                  lens data, and timestamp information.
                </p>
                <p>
                  The privacy implications are significant. When you share a photo
                  taken on your Android phone, you may be inadvertently sharing
                  your exact location, the type of device you own, and the time
                  you were at a specific place. Understanding what your phone
                  records is essential for making informed decisions about what
                  you share.
                </p>
              </section>

              <section id="manufacturer-differences">
                <h2>How Android Manufacturers Differ</h2>
                <p>
                  Unlike the iPhone ecosystem where Apple controls both hardware
                  and software, Android is an open platform. This means Samsung,
                  Google, OnePlus, Xiaomi, and other manufacturers all build
                  their own camera applications with different default settings
                  and menu structures.
                </p>
                <p>
                  This fragmentation matters for privacy because:
                </p>
                <ul>
                  <li>
                    Some manufacturers enable GPS tagging by default while
                    others require you to opt in
                  </li>
                  <li>
                    The setting to disable location tags is located in a
                    different place on each device
                  </li>
                  <li>
                    Some camera apps offer more granular control over which
                    metadata fields are recorded
                  </li>
                  <li>
                    Third-party camera apps from the Play Store may have their
                    own independent metadata settings
                  </li>
                </ul>
                <p>
                  The result is that Android users need to check their specific
                  device settings rather than following a single universal
                  guide.
                </p>
              </section>

              <section id="samsung-settings">
                <h2>Samsung Camera Settings</h2>
                <p>
                  Samsung is the largest Android manufacturer, and their camera
                  app includes a location tag feature that is enabled by default
                  on most Galaxy devices. Here is how to manage it:
                </p>
                <ol>
                  <li>
                    Open the <strong>Camera</strong> app on your Samsung phone
                  </li>
                  <li>
                    Tap the <strong>gear icon</strong> to open Camera Settings
                  </li>
                  <li>
                    Look for <strong>&quot;Location tags&quot;</strong> or{" "}
                    <strong>&quot;Save location info&quot;</strong>
                  </li>
                  <li>Toggle the switch to the off position</li>
                </ol>
                <p>
                  On newer Samsung devices running One UI 5 and later, the
                  setting may be nested under &quot;General&quot; in the Camera
                  settings. Samsung also offers a separate &quot;Shot suggestion&quot;
                  feature that uses location data to optimize scene recognition —
                  you may want to disable that as well if privacy is a concern.
                </p>
                <p>
                  Samsung photos also embed the device model name and a unique
                  device identifier in the metadata. This information persists
                  even after you disable location tags, so consider using a tool
                  like the{" "}
                  <Link
                    href="/remove-photo-metadata/"
                    className="text-primary hover:underline"
                  >
                    Photo Metadata Remover
                  </Link>{" "}
                  to strip all metadata before sharing.
                </p>
              </section>

              <section id="google-pixel">
                <h2>Google Pixel Settings</h2>
                <p>
                  Google Pixel phones run a clean version of Android with
                  Google&apos;s own camera app. The Pixel camera includes
                  location tagging that is controlled through Android&apos;s
                  system-level permission system rather than an in-app toggle.
                </p>
                <p>
                  To disable location data on a Google Pixel:
                </p>
                <ol>
                  <li>
                    Open <strong>Settings</strong> on your Pixel
                  </li>
                  <li>
                    Tap <strong>Location</strong>
                  </li>
                  <li>
                    Tap <strong>App location permissions</strong>
                  </li>
                  <li>
                    Find <strong>Camera</strong> in the list
                  </li>
                  <li>
                    Select <strong>&quot;Don&apos;t allow&quot;</strong>
                  </li>
                </ol>
                <p>
                  Google Pixels also record extensive metadata beyond GPS,
                  including computational photography data. Google&apos;s
                  Night Sight and HDR+ modes embed additional processing
                  information that can reveal details about the scene and the
                  algorithms used to process it.
                </p>
                <p>
                  One advantage of Pixel phones is that Google&apos;s Photos app
                  provides a built-in metadata viewer. You can view EXIF data by
                  opening a photo, tapping the three-dot menu, and selecting
                  &quot;Details.&quot; This makes it easy to see exactly what
                  information is stored in your images.
                </p>
              </section>

              <section id="other-brands">
                <h2>OnePlus, Xiaomi, and Other Brands</h2>
                <p>
                  Other Android manufacturers follow similar patterns but with
                  their own interfaces. Here is a quick overview:
                </p>
                <ul>
                  <li>
                    <strong>OnePlus / Oppo / Realme:</strong> These related
                    brands use similar camera apps. Look for &quot;Store
                    location&quot; or &quot;Geo tag&quot; in Camera Settings.
                  </li>
                  <li>
                    <strong>Xiaomi / Redmi:</strong> The Camera app settings
                    include a &quot;Save location info&quot; toggle. On MIUI,
                    this may be under the &quot;General&quot; section.
                  </li>
                  <li>
                    <strong>Nothing Phone:</strong> Uses a near-stock Android
                    experience with camera location permissions managed through
                    system settings.
                  </li>
                  <li>
                    <strong>Sony Xperia:</strong> Includes advanced photography
                    settings with a dedicated location tagging option in the
                    camera app.
                  </li>
                </ul>
                <p>
                  If you are unsure where the setting is on your specific device,
                  the most reliable approach is to go to Android&apos;s system
                  settings, navigate to Location, and check which apps have
                  location access. Disabling location access for the Camera app
                  at the system level works regardless of which manufacturer
                  built your phone.
                </p>
              </section>

              <section id="disable-location-tags">
                <h2>How to Disable Location Tags on Any Android</h2>
                <p>
                  The universal method that works across all Android devices is
                  to revoke location permission from the Camera app at the
                  system level:
                </p>
                <ol>
                  <li>
                    Open <strong>Settings</strong> on your Android phone
                  </li>
                  <li>
                    Navigate to <strong>Location</strong> (sometimes called
                    &quot;Location services&quot;)
                  </li>
                  <li>
                    Tap <strong>App location permissions</strong> or{" "}
                    <strong>App permissions</strong>
                  </li>
                  <li>
                    Find your <strong>Camera</strong> app in the list
                  </li>
                  <li>
                    Change the permission to <strong>&quot;Don&apos;t
                    allow&quot;</strong> or <strong>&quot;Deny&quot;</strong>
                  </li>
                </ol>
                <p>
                  Some Android versions also offer a &quot;Use precise
                  location&quot; toggle. Even if you leave location access
                  enabled for other reasons, disabling precise location prevents
                  the Camera from recording GPS coordinates with high accuracy.
                  However, for maximum privacy, denying location access entirely
                  is the best option.
                </p>
                <p>
                  After changing this setting, all new photos you take will no
                  longer contain GPS coordinates. Existing photos will still have
                  their original metadata intact.
                </p>
              </section>

              <section id="removing-metadata">
                <h2>Removing Metadata from Existing Android Photos</h2>
                <p>
                  If you have been taking photos with location tags enabled, you
                  likely have a large library of images with embedded GPS data.
                  You can clean these files quickly using MetaClean.
                </p>
                <p>
                  The{" "}
                  <Link
                    href="/remove-photo-metadata/"
                    className="text-primary hover:underline"
                  >
                    Photo Metadata Remover
                  </Link>{" "}
                  works entirely in your browser — your files are never uploaded
                  to any server. Simply drag and drop your Android photos, review
                  the detected metadata, and click to remove it.
                </p>
                <p>
                  If you only want to strip GPS coordinates while keeping camera
                  settings data intact, use the dedicated{" "}
                  <Link
                    href="/remove-gps-from-photo/"
                    className="text-primary hover:underline"
                  >
                    GPS Remover
                  </Link>{" "}
                  tool instead. This is useful for photographers who want to
                  share their camera settings without revealing their location.
                </p>
                <p>
                  For users with large photo libraries, MetaClean supports batch
                  processing. You can upload dozens of photos at once and clean
                  them all in a single operation, saving significant time
                  compared to processing each file individually.
                </p>
              </section>

              <h2>Take Control of Your Android Photo Privacy</h2>
              <p>
                Android phones are powerful cameras, but they are also
                sophisticated data collection devices. By understanding what
                metadata your specific phone records and taking steps to disable
                location tags, you can enjoy photography without compromising
                your privacy.
              </p>
              <p>
                Remember that disabling location tags only prevents new photos
                from collecting GPS data. For existing photos, use MetaClean to
                remove metadata before sharing them with others.
              </p>
            </div>

            <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground mb-3">
                Clean your Android photos now
              </h2>
              <p className="text-muted-foreground mb-5">
                Strip GPS coordinates, device identifiers, and all hidden
                metadata from your Android photos — privately and for free.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/remove-photo-metadata/"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
                >
                  Remove Photo Metadata
                </Link>
                <Link
                  href="/remove-gps-from-photo/"
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  Remove GPS Only
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
          description="Common questions about Android photo metadata and privacy"
          faqs={faqs}
        />
      </article>
    </>
  );
}
