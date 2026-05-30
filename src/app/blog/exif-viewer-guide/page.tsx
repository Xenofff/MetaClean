import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EXIF Viewer Guide",
  description:
    "How to use the MetaClean EXIF Viewer to inspect photo metadata. Learn to read EXIF categories, search fields, and interpret results for better privacy.",
  keywords: [
    "EXIF viewer guide",
    "how to view EXIF data",
    "metadata inspector",
    "EXIF data reader",
    "photo metadata viewer",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/exif-viewer-guide/`,
  },
};

const faqs = [
  {
    question: "What file formats can the EXIF Viewer read?",
    answer:
      "The EXIF Viewer supports JPG, JPEG, PNG, WEBP, and HEIC image formats. It reads all standard EXIF metadata fields as well as manufacturer-specific data embedded by various camera brands.",
  },
  {
    question: "Is my photo uploaded when I use the EXIF Viewer?",
    answer:
      "No. The EXIF Viewer processes your photo entirely in your browser. The file is never uploaded to any server. All metadata extraction happens locally on your device.",
  },
  {
    question: "What does the EXIF Viewer show for photos without metadata?",
    answer:
      "If a photo has no EXIF metadata, the viewer will show basic file information like format, dimensions, and file size, and indicate that no EXIF data was found.",
  },
  {
    question: "Can I search for specific metadata fields?",
    answer:
      "Yes. The EXIF Viewer includes a search bar that filters metadata fields in real time. You can type keywords like \"GPS,\" \"camera,\" or \"ISO\" to quickly find relevant fields.",
  },
  {
    question: "How do I know if my photo contains GPS coordinates?",
    answer:
      "Upload your photo to the EXIF Viewer and look for the GPS section. If present, it will display latitude, longitude, altitude, and related fields with their values.",
  },
  {
    question: "Can I use the EXIF Viewer on mobile?",
    answer:
      "Yes. The EXIF Viewer is fully responsive and works on smartphones and tablets. You can upload photos directly from your phone's camera roll or file system.",
  },
];

const tocItems = [
  { id: "opening-viewer", label: "Opening the EXIF Viewer" },
  { id: "uploading", label: "Uploading a Photo" },
  { id: "metadata-categories", label: "Understanding Metadata Categories" },
  { id: "gps-section", label: "Reading the GPS Section" },
  { id: "camera-info", label: "Camera Information" },
  { id: "searching", label: "Searching for Fields" },
  { id: "interpreting", label: "Interpreting Results" },
  { id: "next-steps", label: "What to Do Next" },
];

export default function ExifViewerGuidePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    {
      name: "EXIF Viewer Guide",
      url: "/blog/exif-viewer-guide/",
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
          <span className="text-foreground">EXIF Viewer Guide</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Guide
                </span>
                <span className="text-sm text-muted-foreground">
                  6 min read
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                EXIF Viewer Guide
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                How to inspect, understand, and act on the metadata hidden
                inside your photos.
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <p>
                The MetaClean{" "}
                <Link
                  href="/exif-viewer/"
                  className="text-primary hover:underline"
                >
                  EXIF Viewer
                </Link>{" "}
                is a free tool that extracts and displays all metadata embedded
                in your image files. It processes everything in your browser, so
                your photos never leave your device. This guide explains how to
                use every feature of the viewer and how to interpret the results.
              </p>

              <section id="opening-viewer">
                <h2>Opening the EXIF Viewer</h2>
                <p>
                  Navigate to the EXIF Viewer page using any modern web browser.
                  The tool works on desktop computers, laptops, tablets, and
                  smartphones. No account creation or installation is required.
                </p>
                <p>
                  The viewer opens to a clean interface with a large upload area
                  at the center. You will see a prompt to drag and drop an image
                  or click to browse your files. The interface is designed to be
                  intuitive, but understanding the full workflow will help you
                  get the most out of it.
                </p>
              </section>

              <section id="uploading">
                <h2>Uploading a Photo</h2>
                <p>
                  You can upload photos in two ways:
                </p>
                <ul>
                  <li>
                    <strong>Drag and drop:</strong> Drag an image file from your
                    file manager or desktop directly onto the upload area
                  </li>
                  <li>
                    <strong>Click to browse:</strong> Click the upload area to
                    open a file picker dialog and select your image
                  </li>
                </ul>
                <p>
                  The viewer accepts JPG, JPEG, PNG, WEBP, and HEIC formats.
                  HEIC is the default format used by modern iPhones, so you can
                  upload iPhone photos directly without converting them first.
                </p>
                <p>
                  Once uploaded, the viewer immediately extracts and displays all
                  metadata from the file. There is no loading screen or
                  processing delay — the extraction happens locally in your
                  browser in milliseconds.
                </p>
              </section>

              <section id="metadata-categories">
                <h2>Understanding Metadata Categories</h2>
                <p>
                  The EXIF Viewer organizes metadata into logical categories to
                  make it easier to navigate. While the exact categories depend
                  on what your camera recorded, the standard sections include:
                </p>
                <ul>
                  <li>
                    <strong>Basic Information:</strong> File format, dimensions,
                    file size, and color space
                  </li>
                  <li>
                    <strong>Camera Information:</strong> Device manufacturer,
                    model, lens, and software version
                  </li>
                  <li>
                    <strong>Shooting Parameters:</strong> Aperture, shutter
                    speed, ISO, focal length, and white balance
                  </li>
                  <li>
                    <strong>Date and Time:</strong> When the photo was taken and
                    when the file was last modified
                  </li>
                  <li>
                    <strong>GPS Data:</strong> Location coordinates, altitude,
                    and related fields
                  </li>
                  <li>
                    <strong>Thumbnail:</strong> A preview thumbnail embedded in
                    the file
                  </li>
                </ul>
                <p>
                  Each category can be expanded or collapsed. Collapsing
                  categories you are not interested in helps focus your attention
                  on the fields that matter.
                </p>
              </section>

              <section id="gps-section">
                <h2>Reading the GPS Section</h2>
                <p>
                  The GPS section is the most privacy-critical part of the EXIF
                  data. Here is how to read the key fields:
                </p>
                <ul>
                  <li>
                    <strong>GPS Latitude:</strong> The north-south coordinate
                    expressed in degrees, minutes, and seconds. A companion
                    field indicates whether the coordinate is North or South.
                  </li>
                  <li>
                    <strong>GPS Longitude:</strong> The east-west coordinate with
                    a similar format. A companion field indicates East or West.
                  </li>
                  <li>
                    <strong>GPS Altitude:</strong> The height above sea level,
                    which can reveal which floor of a building you were on.
                  </li>
                  <li>
                    <strong>GPS Timestamp:</strong> The exact UTC time the
                    location was recorded.
                  </li>
                  <li>
                    <strong>GPS Direction:</strong> The compass bearing the camera
                    was facing.
                  </li>
                </ul>
                <p>
                  To convert the degrees-minutes-seconds format to decimal
                  degrees (which you can paste into Google Maps), use the
                  formula: decimal = degrees + minutes/60 + seconds/3600. Many
                  online converters can do this for you.
                </p>
                <p>
                  If the GPS section is absent or empty, the photo does not
                  contain location data. This is the case for photos taken with
                  location services disabled or photos that have been cleaned
                  with a metadata remover.
                </p>
              </section>

              <section id="camera-info">
                <h2>Camera Information Fields</h2>
                <p>
                  The camera information section reveals details about the device
                  that captured the photo:
                </p>
                <ul>
                  <li>
                    <strong>Make:</strong> The manufacturer (e.g., &quot;Apple&quot;,
                    &quot;Samsung&quot;, &quot;Google&quot;)
                  </li>
                  <li>
                    <strong>Model:</strong> The specific device model (e.g.,
                    &quot;iPhone 15 Pro&quot;, &quot;Galaxy S24 Ultra&quot;)
                  </li>
                  <li>
                    <strong>Lens Model:</strong> The specific lens used, which may
                    differ on phones with multiple cameras
                  </li>
                  <li>
                    <strong>Focal Length:</strong> The optical focal length,
                    usually expressed in millimeters
                  </li>
                  <li>
                    <strong>Aperture:</strong> The f-stop value of the lens
                  </li>
                  <li>
                    <strong>ISO:</strong> The sensor sensitivity setting
                  </li>
                  <li>
                    <strong>Exposure Time:</strong> How long the shutter was open
                  </li>
                </ul>
                <p>
                  This information is useful for photographers analyzing their
                  work, but it can also be a privacy concern. The combination of
                  device make, model, and serial number (if present) can
                  potentially fingerprint you across different photos and
                  platforms.
                </p>
              </section>

              <section id="searching">
                <h2>Searching for Specific Fields</h2>
                <p>
                  The EXIF Viewer includes a search bar that filters metadata
                  fields in real time. This is especially useful for large
                  metadata sets where scrolling through every field would be
                  tedious.
                </p>
                <p>
                  Try searching for these common terms:
                </p>
                <ul>
                  <li>
                    <strong>&quot;GPS&quot;</strong> — to quickly find all
                    location-related fields
                  </li>
                  <li>
                    <strong>&quot;Model&quot;</strong> — to see the device that
                    took the photo
                  </li>
                  <li>
                    <strong>&quot;ISO&quot;</strong> — to check the sensor
                    sensitivity
                  </li>
                  <li>
                    <strong>&quot;Date&quot;</strong> — to find all timestamp
                    fields
                  </li>
                  <li>
                    <strong>&quot;Serial&quot;</strong> — to check if a device
                    serial number is present
                  </li>
                </ul>
                <p>
                  The search filters results as you type, so you can narrow down
                  to exactly the fields you need. Click on a result to highlight
                  and scroll to that field in the metadata display.
                </p>
              </section>

              <section id="interpreting">
                <h2>Interpreting the Results</h2>
                <p>
                  Understanding what the metadata means is just as important as
                  seeing it. Here are the key things to look for when
                  interpreting EXIF results:
                </p>
                <h3>Privacy Risk Assessment</h3>
                <ul>
                  <li>
                    <strong>GPS present:</strong> High privacy risk. Your exact
                    location is embedded in the file.
                  </li>
                  <li>
                    <strong>Serial number present:</strong> Medium privacy risk.
                    Your device can be identified and potentially tracked.
                  </li>
                  <li>
                    <strong>Camera model only:</strong> Low privacy risk. Many
                    people own the same device model.
                  </li>
                  <li>
                    <strong>No metadata:</strong> Minimal privacy risk. The file
                    contains only the image data.
                  </li>
                </ul>
                <h3>Data Accuracy</h3>
                <p>
                  EXIF data is generally accurate because it is recorded by the
                  device at the time of capture. GPS coordinates are accurate to
                  within a few meters. Timestamps reflect the device&apos;s clock,
                  which is usually synchronized automatically. Camera settings
                  are recorded directly from the hardware configuration.
                </p>
                <h3>Missing Fields</h3>
                <p>
                  Not every field will be present in every photo. The fields
                  recorded depend on your device, camera app, and settings. A
                  photo taken with location services disabled will have no GPS
                  fields. A photo from a basic camera phone may lack lens
                  information. Missing fields are normal and do not indicate a
                  problem.
                </p>
              </section>

              <section id="next-steps">
                <h2>What to Do After Viewing Metadata</h2>
                <p>
                  Once you have inspected your photo&apos;s metadata, you can
                  take action based on what you found:
                </p>
                <ul>
                  <li>
                    If your photo contains GPS coordinates and you plan to share
                    it, use the{" "}
                    <Link
                      href="/remove-gps-from-photo/"
                      className="text-primary hover:underline"
                    >
                      GPS Remover
                    </Link>{" "}
                    to strip location data
                  </li>
                  <li>
                    If you want to remove all metadata at once, use the{" "}
                    <Link
                      href="/remove-photo-metadata/"
                      className="text-primary hover:underline"
                    >
                      Photo Metadata Remover
                    </Link>{" "}
                    for a complete clean
                  </li>
                  <li>
                    If you want a quick privacy assessment, run the file through
                    the{" "}
                    <Link
                      href="/privacy-score-tool/"
                      className="text-primary hover:underline"
                    >
                      Privacy Score Tool
                    </Link>{" "}
                    for an overall risk rating
                  </li>
                  <li>
                    If the file looks clean, you can share it with confidence
                    knowing it does not contain sensitive metadata
                  </li>
                </ul>
              </section>

              <h2>Start Inspecting Your Photos</h2>
              <p>
                The EXIF Viewer is the first step in understanding and protecting
                your photo privacy. By seeing exactly what metadata your photos
                contain, you can make informed decisions about what to share and
                what to clean.
              </p>
              <p>
                Use the viewer regularly to audit your photos, especially before
                sharing them on social media, sending them via email, or
                publishing them online.
              </p>
            </div>

            <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground mb-3">
                Inspect your photos now
              </h2>
              <p className="text-muted-foreground mb-5">
                Upload any photo to see every piece of hidden metadata — GPS,
                camera info, timestamps, and more.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/exif-viewer/"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
                >
                  Open EXIF Viewer
                </Link>
                <Link
                  href="/privacy-score-tool/"
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  Check Privacy Score
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
          description="Using the MetaClean EXIF Viewer to inspect photo metadata"
          faqs={faqs}
        />
      </article>
    </>
  );
}
