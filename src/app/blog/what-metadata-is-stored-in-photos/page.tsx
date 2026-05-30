import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Metadata Is Stored In Photos",
  description:
    "Discover what metadata is embedded in your photos — EXIF, IPTC, XMP data types, GPS coordinates, camera settings, and timestamps explained.",
  keywords: [
    "photo metadata",
    "what metadata is in photos",
    "EXIF data explained",
    "IPTC metadata",
    "XMP data",
    "image metadata types",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/what-metadata-is-stored-in-photos/`,
  },
};

const faqs = [
  {
    question: "What types of metadata are stored in photos?",
    answer:
      "Photos can contain EXIF data (camera settings, GPS, timestamps), IPTC data (captions, keywords, copyright), and XMP data (Adobe-compatible metadata). Each type serves a different purpose and reveals different information about the image and its creator.",
  },
  {
    question: "How do I check what metadata is in my photo?",
    answer:
      "Use MetaClean's EXIF Viewer to inspect all metadata in your photos. Simply upload your image and every piece of embedded data will be displayed in a readable format, including GPS coordinates, camera model, and timestamps.",
  },
  {
    question: "Does every photo contain metadata?",
    answer:
      "Most digital photos contain some metadata, but the amount varies. Photos from smartphones typically include extensive EXIF data including GPS coordinates. Photos shared on social media may have some metadata stripped, but not always all of it.",
  },
  {
    question: "Is photo metadata dangerous?",
    answer:
      "Photo metadata can be dangerous if it reveals sensitive information like your home address (via GPS), daily routine (via timestamps), or personal device information. Removing metadata before sharing photos is a key privacy practice.",
  },
  {
    question: "Can metadata be removed from photos after they are taken?",
    answer:
      "Yes, metadata can be removed from photos at any time using tools like MetaClean. The process strips the embedded data from the image file without affecting the visual quality of the photo.",
  },
];

const tableOfContents = [
  { id: "what-is-photo-metadata", label: "What Is Photo Metadata?" },
  { id: "exif-data", label: "EXIF Data" },
  { id: "iptc-data", label: "IPTC Data" },
  { id: "xmp-data", label: "XMP Data" },
  { id: "what-gps-reveals", label: "What GPS Data Reveals" },
  { id: "what-camera-reveals", label: "What Camera Data Reveals" },
  { id: "what-timestamps-reveal", label: "What Timestamps Reveal" },
  { id: "how-to-check", label: "How to Check Metadata" },
  { id: "how-to-remove", label: "How to Remove Metadata" },
  { id: "faq", label: "FAQ" },
];

export default function WhatMetadataIsStoredInPhotosPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "What Metadata Is Stored In Photos", url: "/blog/what-metadata-is-stored-in-photos/" },
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
          <span className="text-foreground">What Metadata Is Stored In Photos</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Guide</span>
            <span className="text-sm text-muted-foreground">10 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">What Metadata Is Stored In Photos</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete breakdown of every type of metadata hidden inside your image files — and why it matters for your privacy.
          </p>
        </header>

        <div className="flex gap-12">
          {/* Table of Contents — left sidebar */}
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
            <section id="what-is-photo-metadata">
              <h2>What Is Photo Metadata?</h2>
              <p>
                Every time you take a photo with a smartphone, digital camera, or tablet, the resulting image file
                contains far more than just pixels. Embedded within the file is a collection of invisible data called
                metadata — structured information that describes the image, how it was created, and where it was captured.
              </p>
              <p>
                This metadata is organized into three primary formats: EXIF, IPTC, and XMP. Each format stores different
                categories of information, and together they paint a detailed picture of the circumstances surrounding
                every photo you take. Understanding what these formats contain is the first step toward protecting
                your digital privacy.
              </p>
            </section>

            <section id="exif-data">
              <h2>EXIF Data: The Camera&apos;s Memory</h2>
              <p>
                EXIF (Exchangeable Image File Format) is the most common metadata format found in digital photos.
                It is automatically written by your camera or smartphone every time you press the shutter button.
                EXIF data is stored directly in the image file header and includes a wide range of technical and
                contextual information.
              </p>

              <h3>Camera Settings</h3>
              <p>
                EXIF records the precise technical settings used to capture the image. This includes the camera
                make and model, lens type, focal length, aperture (f-stop), shutter speed, ISO sensitivity,
                white balance mode, and flash status. While these details are primarily useful to photographers
                for reviewing and replicating settings, they also create a unique fingerprint for your device.
              </p>

              <h3>Device Serial Numbers</h3>
              <p>
                Many cameras and smartphones embed a unique device serial number in the EXIF data. This serial
                number is consistent across all photos taken with that device, meaning it can be used to link
                images together and potentially identify the owner. If you post photos from the same device
                on multiple platforms, the serial number acts as a persistent identifier.
              </p>

              <h3>Software and Firmware</h3>
              <p>
                EXIF also records the software version used to process the image, including the operating system
                of the device and any editing applications. This information can reveal details about your
                technology stack and whether you&apos;ve edited the photo before sharing it.
              </p>
            </section>

            <section id="iptc-data">
              <h2>IPTC Data: Descriptive Information</h2>
              <p>
                The IPTC (International Press Telecommunications Council) standard was designed for the news
                industry and focuses on descriptive and rights-related metadata. While less commonly embedded
                automatically by consumer cameras, IPTC data is frequently added by professional photographers
                and media organizations.
              </p>
              <p>
                IPTC fields include captions, keywords, categories, copyright notices, creator names, and usage
                terms. Stock photography and editorial images often carry extensive IPTC metadata to help
                publishers identify and license content. If you&apos;ve downloaded images from stock photo sites
                or received images from professional photographers, those files likely contain IPTC data.
              </p>
              <p>
                For everyday users, IPTC data is less of a privacy concern than EXIF, but it can still reveal
                personal information such as your name, contact details, or the context in which a photo was
                taken.
              </p>
            </section>

            <section id="xmp-data">
              <h2>XMP Data: The Extensible Standard</h2>
              <p>
                XMP (Extensible Metadata Platform) is Adobe&apos;s metadata format and has become a widely adopted
                standard for storing both EXIF and IPTC information in a more flexible, XML-based structure. XMP
                is commonly found in files processed by Adobe applications like Lightroom, Photoshop, and Bridge.
              </p>
              <p>
                XMP can store camera settings, editing history, color profiles, copyright information, and custom
                metadata fields. It is more extensible than EXIF or IPTC, meaning applications can add their own
                custom fields. For users who edit photos in professional software, XMP data may reveal your editing
                workflow, software preferences, and organizational habits.
              </p>
            </section>

            <section id="what-gps-reveals">
              <h2>What GPS Data Reveals About You</h2>
              <p>
                GPS metadata is arguably the most sensitive piece of information stored in your photos. When
                location services are enabled on your device, every photo records precise latitude and longitude
                coordinates. This data can reveal:
              </p>
              <ul>
                <li><strong>Your home address:</strong> Photos taken at or near your residence contain coordinates that map directly to your street address.</li>
                <li><strong>Your workplace:</strong> Office photos reveal where you spend your working hours.</li>
                <li><strong>Daily routines:</strong> A series of photos over time can reconstruct your commute, gym schedule, children&apos;s school, and regular hangouts.</li>
                <li><strong>Travel patterns:</strong> Vacation photos expose when your home is unoccupied, making you vulnerable to burglary.</li>
                <li><strong>Medical visits:</strong> Photos taken at hospitals, clinics, or pharmacies reveal health-related activities.</li>
                <li><strong>Places of worship:</strong> Religious affiliations can be inferred from location data.</li>
              </ul>
              <p>
                GPS coordinates are typically accurate to within 3 to 5 meters, which is precise enough to
                identify not just a building but a specific floor or room. Combined with timestamps, this
                data creates a detailed log of your movements that can be exploited by stalkers, burglars,
                or anyone with access to your photos.
              </p>
            </section>

            <section id="what-camera-reveals">
              <h2>What Camera Data Reveals</h2>
              <p>
                Beyond location, the camera and device information in your photos provides additional vectors
                for identification and tracking:
              </p>
              <ul>
                <li><strong>Device model:</strong> Identifies the exact make and model of your phone or camera, which can narrow down your identity.</li>
                <li><strong>Serial number:</strong> A unique identifier that links all photos from your device together across platforms.</li>
                <li><strong>Owner name:</strong> Some devices allow you to set an owner name that gets embedded in every photo.</li>
                <li><strong>Copyright notice:</strong> Auto-generated copyright fields may include your name or organization.</li>
              </ul>
              <p>
                When you post photos from the same device on multiple social media accounts, forums, or
                marketplaces, the device serial number creates a persistent link between those accounts.
                Researchers and data brokers have demonstrated the ability to track individuals across
                platforms using this technique.
              </p>
            </section>

            <section id="what-timestamps-reveal">
              <h2>What Timestamps Reveal</h2>
              <p>
                Every photo records multiple timestamps: the date and time the image was captured, the date
                it was last modified, and sometimes the date it was digitized. These timestamps provide a
                precise chronological record that can reveal:
              </p>
              <ul>
                <li><strong>Daily schedule:</strong> When you wake up, leave for work, eat lunch, and return home.</li>
                <li><strong>Absence periods:</strong> When your home is empty based on when photos stop being taken.</li>
                <li><strong>Event attendance:</strong> Where you were at specific times, which can be cross-referenced with public events.</li>
                <li><strong>Habits and patterns:</strong> Regular activities like gym sessions, grocery shopping, or children&apos;s activities.</li>
              </ul>
              <p>
                When combined with GPS data, timestamps transform a collection of photos into a comprehensive
                surveillance record. Even without GPS, timestamps can be used to correlate your photos with
                other publicly available information.
              </p>
            </section>

            <section id="how-to-check">
              <h2>How to Check Metadata in Your Photos</h2>
              <p>
                Checking the metadata in your photos is straightforward with the right tools. MetaClean&apos;s
                metadata inspector makes it easy to see exactly what information is embedded in your images.
              </p>
              <ol>
                <li>
                  Visit the{" "}
                  <Link href="/exif-viewer/" className="text-primary hover:underline">
                    EXIF Viewer
                  </Link>{" "}
                  page on MetaClean.
                </li>
                <li>Upload your photo by dragging it onto the page or clicking to browse.</li>
                <li>Review the complete metadata breakdown, including GPS coordinates, camera details, and timestamps.</li>
                <li>Check for sensitive information before deciding whether to share the image.</li>
              </ol>
              <p>
                You can also check metadata on most operating systems. On Windows, right-click the file,
                select Properties, and click the Details tab. On macOS, open the image in Preview and
                go to Tools &gt; Show Inspector. However, these built-in tools often don&apos;t display all
                metadata types, which is why a dedicated tool like MetaClean is recommended.
              </p>
            </section>

            <section id="how-to-remove">
              <h2>How to Remove Metadata From Photos</h2>
              <p>
                Once you understand what metadata your photos contain, the next step is removing it before
                sharing. MetaClean processes all metadata removal entirely in your browser, so your original
                files are never uploaded to any server.
              </p>
              <ol>
                <li>
                  Visit the{" "}
                  <Link href="/remove-photo-metadata/" className="text-primary hover:underline">
                    Photo Metadata Remover
                  </Link>{" "}
                  page.
                </li>
                <li>Upload one or more photos. MetaClean supports batch processing for multiple files.</li>
                <li>Review the detected metadata and select which types to remove.</li>
                <li>Click &quot;Clean Metadata&quot; to generate clean versions of your photos.</li>
                <li>Download your cleaned files, now free of sensitive metadata.</li>
              </ol>
              <p>
                For a step-by-step walkthrough, see our guide on{" "}
                <Link href="/how-to-remove-exif-data/" className="text-primary hover:underline">
                  how to remove EXIF data from photos
                </Link>
                .
              </p>
            </section>

            <h2>Conclusion</h2>
            <p>
              Photo metadata is a powerful but often invisible layer of data that can reveal your location,
              habits, device information, and personal details. By understanding the three main metadata
              formats — EXIF, IPTC, and XMP — you can make informed decisions about which photos to clean
              before sharing them online.
            </p>
            <p>
              The simplest way to protect yourself is to{" "}
              <Link href="/remove-photo-metadata/" className="text-primary hover:underline">
                remove metadata from your photos
              </Link>{" "}
              before posting them on social media, selling products online, or sending them to anyone.
              Tools like MetaClean make the process fast, free, and completely private.
            </p>
          </div>
        </div>

        <section className="mt-16 rounded-xl border border-border bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Ready to See What Your Photos Reveal?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Upload any photo to our EXIF Viewer and discover every piece of metadata hidden inside your images.
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
            description="Common questions about photo metadata"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
