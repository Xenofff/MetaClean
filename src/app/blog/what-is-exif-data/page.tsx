import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Is EXIF Data",
  description:
    "A beginner-friendly guide to EXIF data: what it is, how it gets into your photos, what information it contains, and why it matters for your privacy.",
  keywords: [
    "what is EXIF data",
    "EXIF data explained",
    "photo metadata guide",
    "EXIF beginner guide",
    "understanding EXIF data",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/what-is-exif-data/`,
  },
};

const faqs = [
  {
    question: "What is EXIF data in simple terms?",
    answer:
      "EXIF data is information that gets automatically embedded into photos when you take them with a digital camera or smartphone. It includes details like when the photo was taken, what camera was used, the settings (like shutter speed and aperture), and often the GPS location where the photo was taken.",
  },
  {
    question: "Is EXIF data harmful?",
    answer:
      "EXIF data itself is not harmful — it is technical metadata about your photos. However, when photos are shared publicly, the metadata can reveal personal information like your location, daily routines, and device details, which can be exploited by bad actors.",
  },
  {
    question: "Can I see EXIF data on my photos?",
    answer:
      "Yes. On most computers, you can right-click an image file and view its properties to see EXIF data. On smartphones, you can use a metadata viewer app. Online tools like EXIF viewers also let you upload photos to see their embedded data.",
  },
  {
    question: "Does every photo have EXIF data?",
    answer:
      "Most photos taken with digital cameras and smartphones contain EXIF data. However, photos that have been edited, screenshots, or images downloaded from social media may have reduced or no EXIF data, depending on how they were processed.",
  },
  {
    question: "How do I remove EXIF data from my photos?",
    answer:
      "You can use MetaClean's free online tool to remove all EXIF data from your photos. The process happens entirely in your browser — your files are never uploaded to a server, ensuring complete privacy during the cleaning process.",
  },
];

const tableOfContents = [
  { id: "what-exif-means", label: "What EXIF Means" },
  { id: "how-exif-gets-embedded", label: "How EXIF Gets Into Photos" },
  { id: "what-exif-contains", label: "What EXIF Data Contains" },
  { id: "location-data", label: "Location Data in EXIF" },
  { id: "why-it-matters", label: "Why EXIF Data Matters" },
  { id: "exif-across-devices", label: "EXIF Across Different Devices" },
  { id: "how-to-view", label: "How to View EXIF Data" },
  { id: "how-to-remove", label: "How to Remove EXIF Data" },
  { id: "faq", label: "FAQ" },
];

export default function WhatIsExifDataPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "What Is EXIF Data", url: "/blog/what-is-exif-data/" },
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
          <span className="text-foreground">What Is EXIF Data</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Beginner Guide</span>
            <span className="text-sm text-muted-foreground">10 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">What Is EXIF Data: A Complete Beginner&apos;s Guide</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Every photo you take contains hidden information. Here is what EXIF data is, how it gets there, and why it matters for your privacy.
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
            <section id="what-exif-means">
              <h2>What Does EXIF Mean?</h2>
              <p>
                EXIF stands for Exchangeable Image File Format. It is a standard that defines how
                metadata is stored within image files, particularly JPEG, TIFF, and HEIF formats.
                Think of EXIF data as a digital fingerprint that gets attached to every photo you
                take with a modern camera or smartphone.
              </p>
              <p>
                When you take a photo, your device automatically records a variety of information
                about that photo and stores it inside the image file. This information is not
                visible when you look at the photo, but it is embedded in the file itself and can
                be read by software, websites, and other devices.
              </p>
              <p>
                The EXIF standard was created in 2000 and has been adopted by virtually all digital
                camera and smartphone manufacturers. It was originally designed to help photographers
                organize and catalog their images, but it has significant privacy implications that
                the original creators did not anticipate.
              </p>
            </section>

            <section id="how-exif-gets-embedded">
              <h2>How EXIF Data Gets Into Your Photos</h2>
              <p>
                EXIF data is automatically embedded into your photos the moment you capture them.
                You do not need to do anything special — your camera or phone handles the entire
                process. Here is what happens behind the scenes:
              </p>
              <ol>
                <li><strong>Capture:</strong> When you press the shutter button, your device&apos;s camera sensor captures light and converts it into a digital image.</li>
                <li><strong>Processing:</strong> The device&apos;s image processor applies adjustments like white balance, noise reduction, and color correction.</li>
                <li><strong>Metadata collection:</strong> Simultaneously, the device records technical details about the capture — the camera settings, date, time, GPS coordinates (if location services are enabled), and device information.</li>
                <li><strong>File creation:</strong> The image data and metadata are combined into a single file (usually JPEG or HEIF) and saved to your device&apos;s storage.</li>
              </ol>
              <p>
                This entire process happens in milliseconds. By the time you see the photo on your
                screen, the EXIF data is already embedded in the file. Most users have no idea this
                data exists unless they specifically look for it.
              </p>
            </section>

            <section id="what-exif-contains">
              <h2>What EXIF Data Contains</h2>
              <p>
                The amount and type of EXIF data varies depending on your device and settings, but
                a typical photo contains the following information:
              </p>
              <h3>Camera Information</h3>
              <ul>
                <li><strong>Camera make and model:</strong> The brand and model of the camera or phone used (e.g., &quot;Apple iPhone 15 Pro&quot; or &quot;Canon EOS R5&quot;).</li>
                <li><strong>Lens information:</strong> The lens used, focal length, and maximum aperture.</li>
                <li><strong>Software version:</strong> The firmware or software version of the camera.</li>
                <li><strong>Serial number:</strong> Some cameras embed a unique serial number that can be traced to the specific device.</li>
              </ul>
              <h3>Shooting Settings</h3>
              <ul>
                <li><strong>Shutter speed:</strong> How long the camera sensor was exposed to light.</li>
                <li><strong>Aperture:</strong> The size of the lens opening, which affects depth of field.</li>
                <li><strong>ISO:</strong> The camera sensor&apos;s sensitivity to light.</li>
                <li><strong>Focal length:</strong> The zoom level used when the photo was taken.</li>
                <li><strong>Flash:</strong> Whether the flash was used, and at what power.</li>
                <li><strong>White balance:</strong> How the camera adjusted for the color temperature of the light.</li>
                <li><strong>Metering mode:</strong> How the camera measured the scene&apos;s brightness.</li>
              </ul>
              <h3>Date and Time</h3>
              <ul>
                <li><strong>Date and time of capture:</strong> The exact date and time the photo was taken, including timezone information.</li>
                <li><strong>Date and time original:</strong> The original capture time, which may differ from the file modification time.</li>
                <li><strong>Date and time digitized:</strong> When the image was digitized or processed.</li>
              </ul>
              <h3>Location Data</h3>
              <ul>
                <li><strong>GPS latitude and longitude:</strong> The exact coordinates where the photo was taken.</li>
                <li><strong>GPS altitude:</strong> The height above sea level.</li>
                <li><strong>GPS timestamp:</strong> The GPS time when the location was recorded.</li>
                <li><strong>GPS direction:</strong> The direction the camera was facing.</li>
              </ul>
              <h3>Image Details</h3>
              <ul>
                <li><strong>Image dimensions:</strong> The width and height of the image in pixels.</li>
                <li><strong>Resolution:</strong> The pixel density (DPI) of the image.</li>
                <li><strong>Color space:</strong> The color profile used (e.g., sRGB, Adobe RGB).</li>
                <li><strong>Orientation:</strong> The orientation of the image (landscape or portrait).</li>
              </ul>
            </section>

            <section id="location-data">
              <h2>Location Data: The Most Sensitive EXIF Field</h2>
              <p>
                Of all the information stored in EXIF data, GPS coordinates are by far the most
                sensitive. When your photo contains GPS data, it reveals the exact location where
                the photo was taken — accurate to within a few meters.
              </p>
              <p>
                This means that if you take a photo at your home, the EXIF data contains your home
                address. If you take a photo at your workplace, the data reveals where you work.
                If you take a photo at a school, park, or other location you frequent, the data
                creates a pattern of your daily movements.
              </p>
              <p>
                GPS data is enabled by default on most smartphones. While you can disable location
                services for your camera app, many users do not know this option exists or do not
                think to disable it. This means that every photo taken with a smartphone may contain
                precise location data unless the user has specifically turned it off.
              </p>
              <p>
                The privacy risks of GPS metadata are severe. Stalkers, criminals, and other bad
                actors can extract GPS data from photos to determine where you live, work, and
                spend your time. Even if you share a photo on social media where the platform
                strips metadata, someone may have already downloaded the original file with
                location data intact.
              </p>
            </section>

            <section id="why-it-matters">
              <h2>Why EXIF Data Matters for Your Privacy</h2>
              <p>
                EXIF data is not inherently dangerous — it serves legitimate purposes for
                photographers who want to review their settings or organize their work. However,
                the privacy implications become significant when photos are shared without the
                owner realizing that metadata is attached.
              </p>
              <p>
                Consider these scenarios:
              </p>
              <ul>
                <li><strong>Selling items online:</strong> You photograph an item for sale and upload it to a marketplace. The EXIF data reveals your home address to potential buyers.</li>
                <li><strong>Job applications:</strong> You include a professional headshot in your application. The EXIF data reveals where you live and what camera you use.</li>
                <li><strong>Online dating:</strong> You share photos on a dating app. The EXIF data reveals your home address, workplace, and daily haunts.</li>
                <li><strong>Journalism:</strong> A journalist photographs a sensitive location. The EXIF data could put sources or the journalist at risk.</li>
                <li><strong>Legal proceedings:</strong> Photos submitted as evidence may contain metadata that contradicts claims about when or where an image was taken.</li>
              </ul>
              <p>
                In each of these cases, the EXIF data creates a privacy risk that the photo
                creator may not have been aware of. The solution is simple: remove EXIF data
                before sharing photos.
              </p>
            </section>

            <section id="exif-across-devices">
              <h2>EXIF Data Across Different Devices</h2>
              <p>
                The amount and type of EXIF data varies depending on the device used to capture
                the photo:
              </p>
              <ul>
                <li><strong>Smartphones:</strong> iPhones and Android phones typically include GPS coordinates, device model, timestamps, and camera settings. Some newer phones also include AI-generated tags and depth information.</li>
                <li><strong>DSLR and mirrorless cameras:</strong> Professional cameras include detailed shooting settings, lens information, and sometimes serial numbers. GPS is often available but may be disabled by default.</li>
                <li><strong>GoPro and action cameras:</strong> Action cameras include GPS data, gyroscope information, and detailed telemetry about movement and orientation during capture.</li>
                <li><strong>Drones:</strong> Drone photos include GPS coordinates, altitude, gimbal orientation, flight speed, and other flight-specific data that can reveal flight paths and patterns.</li>
                <li><strong>Webcams:</strong> Webcams generally include less EXIF data than other cameras, but may include device information and timestamps.</li>
              </ul>
              <p>
                Regardless of the device, the best practice is to remove EXIF data before sharing
                photos, especially when the photos reveal personal information or were taken at
                sensitive locations.
              </p>
            </section>

            <section id="how-to-view">
              <h2>How to View EXIF Data</h2>
              <p>
                You can view EXIF data using several methods:
              </p>
              <h3>On Windows</h3>
              <p>
                Right-click the image file, select &quot;Properties,&quot; and go to the &quot;Details&quot; tab.
                This shows all EXIF fields embedded in the file.
              </p>
              <h3>On Mac</h3>
              <p>
                Open the image in Preview, go to Tools &gt; Show Inspector, and click the &quot;i&quot; tab.
                You can also right-click the file and select &quot;Get Info.&quot;
              </p>
              <h3>On iPhone</h3>
              <p>
                Open the Photos app, select a photo, swipe up (or tap the info button) to see
                location data and camera information.
              </p>
              <h3>On Android</h3>
              <p>
                Open the Google Photos app, select a photo, tap the three-dot menu, and select
                &quot;Details&quot; or &quot;Info.&quot;
              </p>
              <h3>Online Tools</h3>
              <p>
                Numerous online EXIF viewers let you upload a photo and see all its metadata.
                However, be cautious about uploading personal photos to third-party websites,
                as they may store or log your data.
              </p>
            </section>

            <section id="how-to-remove">
              <h2>How to Remove EXIF Data</h2>
              <p>
                The safest and most convenient way to remove EXIF data is to use MetaClean. Here is how:
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
                <li>MetaClean will display all EXIF metadata found in your images.</li>
                <li>Select the metadata you want to remove. For maximum privacy, choose to remove all metadata.</li>
                <li>Click &quot;Clean Metadata&quot; to process your photos.</li>
                <li>Download the cleaned versions — they are now free of all EXIF data.</li>
              </ol>
              <p>
                The entire process happens in your browser. Your photos are never uploaded to
                MetaClean&apos;s servers, ensuring complete privacy. MetaClean supports all major
                image formats including JPEG, PNG, HEIC, and WebP.
              </p>
              <p>
                For a deeper dive into viewing metadata, see our guide on{" "}
                <Link href="/blog/how-to-read-exif-data/" className="text-primary hover:underline">
                  how to read EXIF data
                </Link>
                .
              </p>
            </section>

            <h2>Conclusion</h2>
            <p>
              EXIF data is hidden information embedded in every digital photo you take. It contains
              camera settings, timestamps, location data, and device information. While this data
              serves legitimate purposes for photographers, it creates significant privacy risks
              when photos are shared without the owner realizing the metadata is attached.
            </p>
            <p>
              The most sensitive piece of EXIF data is GPS coordinates, which reveal the exact
              location where a photo was taken. The safest practice is to remove all EXIF data
              before sharing photos.{" "}
              <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                MetaClean&apos;s free tool
              </Link>{" "}
              makes this process fast and private — your files never leave your browser.
            </p>
          </div>
        </div>

        <section className="mt-16 rounded-xl border border-border bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Remove EXIF Data From Your Photos</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Strip all hidden metadata from your photos in seconds. No uploads, no server processing — everything happens in your browser.
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
            description="EXIF data basics and privacy questions"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
