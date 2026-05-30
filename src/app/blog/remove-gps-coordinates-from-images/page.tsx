import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove GPS Coordinates From Images",
  description:
    "Step-by-step guide to removing GPS coordinates from your photos. Learn how geotags get embedded, how to view them, and how to strip them before sharing.",
  keywords: [
    "remove GPS coordinates",
    "strip location from photo",
    "geotag remover",
    "remove geotag",
    "GPS photo privacy",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/remove-gps-coordinates-from-images/`,
  },
};

const faqs = [
  {
    question: "How do GPS coordinates get into my photos?",
    answer:
      "Your smartphone's camera app requests your location from the operating system when you take a photo. If location access is granted, the GPS coordinates are written directly into the image file's EXIF metadata.",
  },
  {
    question: "How can I see the GPS coordinates in my photos?",
    answer:
      "Use MetaClean's EXIF Viewer to upload any photo and see all embedded metadata, including GPS latitude and longitude. The coordinates are displayed in an easy-to-read format.",
  },
  {
    question: "Does removing GPS coordinates affect photo quality?",
    answer:
      "No. GPS coordinates are stored as metadata alongside the image data, not within it. Removing them has zero effect on image quality, resolution, or visual appearance.",
  },
  {
    question: "Can someone trace a photo back to my exact address?",
    answer:
      "Yes. GPS coordinates in photos are accurate to within a few meters. When plotted on a map, they can reveal your exact location including your home address, workplace, and other places you visit.",
  },
  {
    question: "Is it possible to remove GPS from only some photos in a batch?",
    answer:
      "Yes. When using MetaClean's batch processing, you can selectively choose which photos to clean and which metadata fields to remove from each one.",
  },
  {
    question: "Do screenshots contain GPS coordinates?",
    answer:
      "Screenshots typically do not contain GPS coordinates because they are captured by the system rather than the camera. However, some apps may embed location data in screenshots through other means.",
  },
];

const tocItems = [
  { id: "how-gps-gets-in", label: "How GPS Gets Into Photos" },
  { id: "what-geotag-contains", label: "What a Geotag Contains" },
  { id: "view-gps-data", label: "How to View GPS Data" },
  { id: "remove-gps", label: "How to Remove GPS Coordinates" },
  { id: "batch-removal", label: "Batch GPS Removal" },
  { id: "prevent-future", label: "Preventing Future GPS Embedding" },
];

export default function RemoveGpsCoordinatesFromImagesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    {
      name: "Remove GPS Coordinates From Images",
      url: "/blog/remove-gps-coordinates-from-images/",
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
            Remove GPS Coordinates From Images
          </span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-danger/10 px-2.5 py-0.5 text-xs font-medium text-danger">
                  Security
                </span>
                <span className="text-sm text-muted-foreground">
                  6 min read
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Remove GPS Coordinates From Images
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                A complete guide to understanding, viewing, and removing
                geotags from your photos.
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <section id="how-gps-gets-in">
                <h2>How GPS Coordinates Get Into Your Photos</h2>
                <p>
                  When you take a photo with your smartphone, the camera app
                  communicates with your device&apos;s location services to
                  determine your current position. This position data is then
                  written directly into the image file&apos;s EXIF metadata
                  header at the moment the photo is saved.
                </p>
                <p>
                  The process happens automatically and invisibly. Your phone
                  uses multiple sources to determine your location:
                </p>
                <ul>
                  <li>
                    <strong>GPS satellites:</strong> The primary source of
                    location data, providing coordinates accurate to within a
                    few meters
                  </li>
                  <li>
                    <strong>Cell tower triangulation:</strong> Used when GPS
                    signals are weak, such as indoors, providing less precise
                    but still useful location data
                  </li>
                  <li>
                    <strong>WiFi networks:</strong> Your phone can estimate your
                    location based on nearby WiFi access points and their known
                    positions
                  </li>
                </ul>
                <p>
                  The combination of these three sources means your phone can
                  determine your location almost anywhere, even in urban canyons
                  or indoor environments where GPS alone might struggle. Once the
                  location is determined, it is embedded into the photo file as
                  part of the standard EXIF metadata format.
                </p>
                <p>
                  This is not limited to smartphones. Digital cameras with GPS
                  capabilities, drones, and even some action cameras embed
                  location data in their photos and videos.
                </p>
              </section>

              <section id="what-geotag-contains">
                <h2>What a Geotag Actually Contains</h2>
                <p>
                  The GPS metadata embedded in your photos is surprisingly
                  detailed. A typical geotag includes the following fields:
                </p>
                <ul>
                  <li>
                    <strong>GPS Latitude:</strong> Your north-south position
                    expressed in degrees, minutes, and seconds (e.g.,
                    40°44&apos;58.36&quot;N)
                  </li>
                  <li>
                    <strong>GPS Longitude:</strong> Your east-west position
                    (e.g., 73°59&apos;9.09&quot;W)
                  </li>
                  <li>
                    <strong>GPS Altitude:</strong> Your height above sea level,
                    which can indicate which floor of a building you are on
                  </li>
                  <li>
                    <strong>GPS Timestamp:</strong> The exact UTC time the
                    location was recorded
                  </li>
                  <li>
                    <strong>GPS Direction:</strong> The compass bearing the
                    camera was facing
                  </li>
                  <li>
                    <strong>GPS Speed:</strong> If you were moving when the
                    photo was taken, your speed may also be recorded
                  </li>
                </ul>
                <p>
                  When converted to decimal degrees, these coordinates can be
                  plugged directly into Google Maps or any other mapping service
                  to pinpoint your exact location. The accuracy is typically
                  within three to five meters under good conditions, which is
                  enough to identify specific buildings, park benches, or even
                  which side of a street you were on.
                </p>
              </section>

              <section id="view-gps-data">
                <h2>How to View GPS Data in Your Photos</h2>
                <p>
                  Before you can remove GPS data, it helps to understand what is
                  actually stored in your files. MetaClean provides a free{" "}
                  <Link
                    href="/exif-viewer/"
                    className="text-primary hover:underline"
                  >
                    EXIF Viewer
                  </Link>{" "}
                  that makes it easy to inspect the metadata in any photo.
                </p>
                <p>
                  To view GPS data in your photos:
                </p>
                <ol>
                  <li>
                    Open the{" "}
                    <Link
                      href="/exif-viewer/"
                      className="text-primary hover:underline"
                    >
                      EXIF Viewer
                    </Link>{" "}
                    page in your browser
                  </li>
                  <li>
                    Upload your photo by dragging and dropping it or clicking to
                    browse
                  </li>
                  <li>
                    Look for the GPS section in the displayed metadata
                  </li>
                  <li>
                    The latitude and longitude coordinates will be shown in a
                    readable format
                  </li>
                </ol>
                <p>
                  The EXIF Viewer displays all metadata fields in organized
                  categories, making it easy to see exactly what information your
                  photo contains. You can search for specific fields and expand
                  different sections to explore the full metadata structure.
                </p>
                <p>
                  MetaClean also provides a{" "}
                  <Link
                    href="/privacy-score-tool/"
                    className="text-primary hover:underline"
                  >
                    Privacy Score Tool
                  </Link>{" "}
                  that evaluates your photo and assigns a privacy rating based on
                  the metadata it contains. Photos with GPS coordinates typically
                  receive a lower privacy score.
                </p>
              </section>

              <section id="remove-gps">
                <h2>How to Remove GPS Coordinates From Photos</h2>
                <p>
                  Removing GPS coordinates from your photos is straightforward
                  with MetaClean. The entire process happens in your browser,
                  so your files never leave your device.
                </p>
                <h3>Using the Photo Metadata Remover</h3>
                <ol>
                  <li>
                    Visit the{" "}
                    <Link
                      href="/remove-photo-metadata/"
                      className="text-primary hover:underline"
                    >
                      Photo Metadata Remover
                    </Link>{" "}
                    page
                  </li>
                  <li>
                    Upload your photo by dragging it onto the page or clicking
                    to browse
                  </li>
                  <li>
                    Review the detected metadata — the GPS coordinates will be
                    clearly displayed
                  </li>
                  <li>
                    Select &quot;Remove GPS Coordinates&quot; from the cleaning
                    options, or choose to remove all metadata
                  </li>
                  <li>
                    Click &quot;Clean Metadata&quot; to process the file
                  </li>
                  <li>
                    Download your cleaned photo — it will no longer contain any
                    GPS data
                  </li>
                </ol>
                <h3>Using the Dedicated GPS Remover</h3>
                <p>
                  If your only goal is to remove GPS coordinates while preserving
                  other metadata like camera settings and timestamps, use the{" "}
                  <Link
                    href="/remove-gps-from-photo/"
                    className="text-primary hover:underline"
                  >
                    GPS Remover
                  </Link>{" "}
                  tool. This is ideal for photographers who want to share their
                  camera settings without revealing where the photo was taken.
                </p>
              </section>

              <section id="batch-removal">
                <h2>Batch GPS Removal for Large Libraries</h2>
                <p>
                  If you have hundreds or thousands of photos with GPS data,
                  cleaning them one at a time would be impractical. MetaClean
                  supports batch processing that lets you clean multiple files
                  simultaneously.
                </p>
                <p>
                  The batch workflow is the same as single-file processing:
                </p>
                <ol>
                  <li>
                    Open the{" "}
                    <Link
                      href="/remove-photo-metadata/"
                      className="text-primary hover:underline"
                    >
                      Photo Metadata Remover
                    </Link>
                  </li>
                  <li>
                    Select multiple files — you can drag an entire folder or
                    hold Ctrl/Cmd while clicking to select individual files
                  </li>
                  <li>
                    Choose your cleaning options (remove GPS, remove all
                    metadata, etc.)
                  </li>
                  <li>
                    Click &quot;Clean Metadata&quot; and download all cleaned
                    files at once
                  </li>
                </ol>
                <p>
                  Because all processing happens locally in your browser, batch
                  cleaning is fast and does not consume any server resources.
                  Your files are processed using your device&apos;s CPU and
                  memory, and they never leave your machine.
                </p>
              </section>

              <section id="prevent-future">
                <h2>Preventing Future GPS Embedding</h2>
                <p>
                  The best long-term solution is to prevent GPS coordinates from
                  being embedded in new photos in the first place. The approach
                  varies by device:
                </p>
                <h3>On iPhone</h3>
                <ul>
                  <li>
                    Go to Settings &gt; Privacy &amp; Security &gt; Location
                    Services
                  </li>
                  <li>Find the Camera app and set it to &quot;Never&quot;</li>
                </ul>
                <h3>On Android</h3>
                <ul>
                  <li>
                    Go to Settings &gt; Location &gt; App location permissions
                  </li>
                  <li>
                    Find the Camera app and select &quot;Don&apos;t allow&quot;
                  </li>
                </ul>
                <p>
                  Disabling location access for the Camera app prevents new
                  photos from containing GPS data. For detailed instructions
                  specific to your device, see our guides on{" "}
                  <Link
                    href="/blog/iphone-photo-metadata-explained/"
                    className="text-primary hover:underline"
                  >
                    iPhone photo metadata
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/blog/android-photo-metadata-explained/"
                    className="text-primary hover:underline"
                  >
                    Android photo metadata
                  </Link>
                  .
                </p>
              </section>

              <h2>Protect Your Location Privacy Today</h2>
              <p>
                GPS coordinates in your photos are one of the most significant
                privacy risks in digital photography. Every photo you share
                without removing this data is a potential roadmap to your home,
                workplace, and daily routines.
              </p>
              <p>
                Start by checking your existing photos with the EXIF Viewer, then
                use the GPS Remover to strip location data before sharing. It
                takes seconds and provides meaningful protection for your
                location privacy.
              </p>
            </div>

            <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground mb-3">
                Strip GPS coordinates from your photos
              </h2>
              <p className="text-muted-foreground mb-5">
                Remove location data from any photo in seconds — completely
                private, nothing uploaded.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/remove-gps-from-photo/"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
                >
                  Remove GPS Coordinates
                </Link>
                <Link
                  href="/exif-viewer/"
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  View EXIF Data First
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
          description="Understanding and removing GPS coordinates from photos"
          faqs={faqs}
        />
      </article>
    </>
  );
}
