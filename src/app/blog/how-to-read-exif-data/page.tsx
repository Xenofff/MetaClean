import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How To Read EXIF Data",
  description:
    "Learn how to read and interpret EXIF metadata fields in your photos. Understand camera settings, GPS coordinates, timestamps, and other embedded data.",
  keywords: [
    "how to read EXIF data",
    "EXIF data viewer",
    "interpret photo metadata",
    "understand EXIF fields",
    "EXIF data tutorial",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/how-to-read-exif-data/`,
  },
};

const faqs = [
  {
    question: "What tools can I use to read EXIF data?",
    answer:
      "You can view EXIF data using your operating system's built-in file properties, dedicated EXIF viewer applications, online EXIF viewer tools, or MetaClean's metadata viewer which displays all embedded data in a clear, organized format.",
  },
  {
    question: "What does GPS data in EXIF look like?",
    answer:
      "GPS data in EXIF is stored as latitude and longitude coordinates, typically in degrees, minutes, and seconds format (e.g., 40° 44' 58.32\" N, 73° 59' 8.64\" W). This can be entered into mapping tools to pinpoint the exact location where the photo was taken.",
  },
  {
    question: "Can EXIF data be faked?",
    answer:
      "Yes, EXIF data can be modified or fabricated using photo editing software. However, certain EXIF fields like camera serial numbers and consistent metadata patterns are harder to fake convincingly. Forensic analysts can often detect manipulated metadata.",
  },
  {
    question: "Why do some photos have no EXIF data?",
    answer:
      "Photos may lack EXIF data if they were edited in software that strips metadata, downloaded from social media platforms that remove EXIF during processing, taken with cameras that have EXIF disabled, or created through screenshots.",
  },
  {
    question: "How accurate is GPS data in EXIF?",
    answer:
      "GPS accuracy in EXIF data varies by device. Smartphone GPS is typically accurate to within 3-10 meters, while dedicated GPS cameras can be accurate to within 1-3 meters. Altitude data is generally less accurate than horizontal positioning.",
  },
];

const tableOfContents = [
  { id: "reading-exif-on-computer", label: "Reading EXIF on Computer" },
  { id: "reading-exif-on-phone", label: "Reading EXIF on Phone" },
  { id: "online-exif-viewers", label: "Online EXIF Viewers" },
  { id: "decoding-gps-coordinates", label: "Decoding GPS Coordinates" },
  { id: "understanding-camera-settings", label: "Understanding Camera Settings" },
  { id: "timestamps-explained", label: "Timestamps Explained" },
  { id: "advanced-exif-fields", label: "Advanced EXIF Fields" },
  { id: "faq", label: "FAQ" },
];

export default function HowToReadExifDataPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "How To Read EXIF Data", url: "/blog/how-to-read-exif-data/" },
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
          <span className="text-foreground">How To Read EXIF Data</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Tutorial</span>
            <span className="text-sm text-muted-foreground">9 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">How To Read EXIF Data: Understanding Your Photo Metadata</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your photos contain hidden information. Here is how to access it, read it, and understand what each field means.
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
            <section id="reading-exif-on-computer">
              <h2>Reading EXIF Data on Your Computer</h2>
              <p>
                The most straightforward way to read EXIF data is using your operating system&apos;s
                built-in tools. No additional software is required.
              </p>
              <h3>On Windows</h3>
              <p>
                Right-click any image file and select &quot;Properties.&quot; In the Properties window,
                click the &quot;Details&quot; tab. This displays all EXIF fields embedded in the image,
                organized into categories like Description, Camera, and Image. You will see fields
                like Camera Make, Camera Model, Focal Length, ISO Speed, and — if present — GPS
                coordinates.
              </p>
              <h3>On macOS</h3>
              <p>
                Open the image in Preview, then go to Tools &gt; Show Inspector (or press Cmd+I). Click
                the &quot;i&quot; tab in the Inspector window. This shows metadata including EXIF data,
                GPS information, and TIFF details. You can also right-click the file in Finder, select
                &quot;Get Info,&quot; and look under the &quot;More Info&quot; section.
              </p>
              <h3>On Linux</h3>
              <p>
                Most Linux distributions include the <code>exif</code> command-line tool. Install it
                with your package manager (e.g., <code>sudo apt install exif</code>), then run{" "}
                <code>exif filename.jpg</code> to display all EXIF fields. Alternatively, file managers
                like Nautilus show basic metadata in the Properties dialog.
              </p>
            </section>

            <section id="reading-exif-on-phone">
              <h2>Reading EXIF Data on Your Phone</h2>
              <p>
                Mobile devices also provide ways to view photo metadata:
              </p>
              <h3>On iPhone</h3>
              <p>
                Open the Photos app and select a photo. Swipe up on the photo (or tap the info button
                marked with an &quot;i&quot;) to see location data displayed on a map, along with camera
                details like the device model, focal length, aperture, and ISO. The location section
                shows where the photo was taken, and you can tap &quot;Adjust&quot; to modify or remove
                the location.
              </p>
              <h3>On Android</h3>
              <p>
                Open Google Photos, select a photo, and tap the three-dot menu icon. Select &quot;Details&quot;
                or &quot;Info&quot; to see metadata including camera settings, timestamps, and location
                data. Samsung Gallery and other manufacturer gallery apps have similar functionality
                in their photo info sections.
              </p>
              <p>
                Third-party metadata viewer apps are also available for both platforms and often
                display more detailed information than the built-in gallery apps.
              </p>
            </section>

            <section id="online-exif-viewers">
              <h2>Online EXIF Viewers</h2>
              <p>
                Online EXIF viewer tools let you upload a photo and see all its metadata in a web
                browser. These tools are convenient for quick metadata checks, but be cautious about
                uploading personal photos to third-party websites, as they may store or log your
                images and data.
              </p>
              <p>
                A safer alternative is to use MetaClean&apos;s metadata viewer, which processes
                your photos entirely in your browser. Your files are never uploaded to any server,
                ensuring complete privacy while you view your metadata.
              </p>
              <p>
                Online viewers typically display EXIF data in a structured, easy-to-read format
                with labels explaining what each field means. This is often more readable than
                the raw file properties view on your operating system.
              </p>
            </section>

            <section id="decoding-gps-coordinates">
              <h2>Decoding GPS Coordinates in EXIF Data</h2>
              <p>
                GPS coordinates in EXIF data are the most sensitive fields and the most important
                to understand. Here is how to read them:
              </p>
              <p>
                GPS coordinates are stored as latitude and longitude values. They may appear in
                several formats:
              </p>
              <ul>
                <li><strong>Degrees, Minutes, Seconds (DMS):</strong> 40° 44&apos; 58.32&quot; N, 73° 59&apos; 8.64&quot; W</li>
                <li><strong>Decimal Degrees (DD):</strong> 40.749533, -73.985678</li>
                <li><strong>Degrees and Decimal Minutes:</strong> 40° 44.972&apos; N, 73° 59.144&apos; W</li>
              </ul>
              <p>
                To find the location, enter the coordinates into Google Maps, Apple Maps, or any
                mapping service. The coordinates will pinpoint the exact location where the photo
                was taken — accurate to within a few meters.
              </p>
              <p>
                GPS data also often includes altitude (height above sea level), direction the camera
                was facing, and a timestamp of when the location was recorded. Together, these fields
                can reveal not just where you were, but what direction you were looking and when.
              </p>
            </section>

            <section id="understanding-camera-settings">
              <h2>Understanding Camera Settings in EXIF</h2>
              <p>
                EXIF data includes detailed camera settings that reveal how the photo was captured.
                Understanding these fields helps you interpret the technical aspects of an image:
              </p>
              <ul>
                <li><strong>ISO Speed:</strong> The camera sensor&apos;s sensitivity to light. Lower values (100-400) indicate bright conditions; higher values (1600+) indicate low light.</li>
                <li><strong>Aperture (f-stop):</strong> The size of the lens opening. Lower numbers (f/1.8, f/2.8) create shallow depth of field (blurry background); higher numbers (f/8, f/11) keep more of the scene in focus.</li>
                <li><strong>Shutter Speed:</strong> How long the sensor was exposed. Fast speeds (1/1000s) freeze motion; slow speeds (1/30s or longer) can create motion blur.</li>
                <li><strong>Focal Length:</strong> The zoom level in millimeters. Wide-angle lenses (16-35mm) capture more of the scene; telephoto lenses (70-200mm) zoom in on distant subjects.</li>
                <li><strong>Exposure Compensation:</strong> Manual adjustments to brightness. Positive values brighten the image; negative values darken it.</li>
              </ul>
              <p>
                These settings can reveal the photographer&apos;s skill level, the lighting conditions
                at the time of capture, and the type of equipment used. In some cases, the combination
                of settings can even help identify the specific camera model used.
              </p>
            </section>

            <section id="timestamps-explained">
              <h2>Timestamps Explained</h2>
              <p>
                EXIF data typically includes multiple timestamp fields, each serving a different
                purpose:
              </p>
              <ul>
                <li><strong>Date/Time Original:</strong> The exact date and time the photo was captured. This is the most reliable timestamp for when the photo was actually taken.</li>
                <li><strong>Date/Time Digitized:</strong> When the image file was created or digitized. This may differ from the capture time if the photo was scanned or processed.</li>
                <li><strong>Modify Date:</strong> When the file was last modified, which changes every time the image is edited or saved.</li>
                <li><strong>GPS Date/Time:</strong> The GPS time when the location was recorded, which may differ slightly from the camera time due to GPS clock accuracy.</li>
              </ul>
              <p>
                Timestamps can establish timelines, verify when a photo was taken, and correlate
                with other evidence. However, timestamps can also be modified using photo editing
                software, so they should not be considered infallible without additional verification.
              </p>
            </section>

            <section id="advanced-exif-fields">
              <h2>Advanced EXIF Fields</h2>
              <p>
                Beyond the common fields, EXIF data may contain several advanced pieces of
                information:
              </p>
              <ul>
                <li><strong>Camera Serial Number:</strong> Some cameras embed a unique serial number that can be traced to the specific device. This is common in professional cameras and some smartphone models.</li>
                <li><strong>Lens Model:</strong> The specific lens used, which can help identify equipment combinations.</li>
                <li><strong>Owner Name:</strong> Some cameras allow you to embed your name in the EXIF data, which is visible to anyone who views the metadata.</li>
                <li><strong>Copyright Information:</strong> Photographers can embed copyright notices in EXIF data, which some platforms preserve.</li>
                <li><strong>Thumbnail Image:</strong> Many photos contain a small preview thumbnail in the EXIF data, which may reveal details not visible in the main image.</li>
                <li><strong>Digital Zoom:</strong> Whether digital zoom was applied, which can indicate the actual distance to the subject.</li>
                <li><strong>Scene Type:</strong> Whether the photo was taken in a standard or landscape scene, which can reveal context about the environment.</li>
              </ul>
              <p>
                For a deeper understanding of what metadata is stored in your photos, see our guide
                on{" "}
                <Link href="/blog/what-is-exif-data/" className="text-primary hover:underline">
                  what EXIF data is
                </Link>
                .
              </p>
            </section>

            <h2>Conclusion</h2>
            <p>
              Reading EXIF data is straightforward using built-in operating system tools, mobile
              gallery apps, or online viewers. The most important fields to understand are GPS
              coordinates (which reveal location), timestamps (which establish timelines), and
              camera settings (which reveal technical details about the capture). Understanding
              this data helps you make informed decisions about your photo privacy.
            </p>
            <p>
              Once you understand what EXIF data reveals about your photos, you can use{" "}
              <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                MetaClean&apos;s free tool
              </Link>{" "}
              to remove that data before sharing your images. The process happens entirely in your
              browser, ensuring your files never leave your device.
            </p>
          </div>
        </div>

        <section className="mt-16 rounded-xl border border-border bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">View and Remove EXIF Data</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            See all the metadata hidden in your photos and remove it with one click. No uploads, no server processing.
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
            description="Reading and interpreting EXIF data"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
