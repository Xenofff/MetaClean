import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metadata In Drone Photos",
  description:
    "Drone photos contain extensive metadata including GPS, altitude, gimbal data, and flight information. Learn what your drone records and how to protect your privacy.",
  keywords: [
    "drone photo metadata",
    "drone privacy",
    "drone EXIF data",
    "drone GPS metadata",
    "aerial photography privacy",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/metadata-in-drones-photos/`,
  },
};

const faqs = [
  {
    question: "What metadata do drone photos contain?",
    answer:
      "Drone photos contain GPS coordinates (latitude, longitude, altitude), gimbal orientation, flight speed, compass heading, camera settings, timestamps, drone model and serial number, battery status, and detailed flight telemetry. This data is more extensive than any other consumer camera.",
  },
  {
    question: "Can drone metadata reveal my flight path?",
    answer:
      "Yes. Drone photo metadata includes altitude, speed, compass heading, and gimbal orientation, which can be used to reconstruct your flight path. Combined with GPS coordinates, this data provides a detailed record of where you flew and what you photographed.",
  },
  {
    question: "Is drone metadata regulated?",
    answer:
      "Drone regulations in many countries require remote identification and flight logging. While metadata in photos is not directly regulated, the flight data embedded in drone photos may be relevant to regulatory compliance. Always check your local drone regulations.",
  },
  {
    question: "How do I remove metadata from drone photos?",
    answer:
      "Use MetaClean's free online tool to strip all metadata from your drone photos before sharing them online. The process happens entirely in your browser, ensuring your flight data never leaves your device.",
  },
  {
    question: "Does DJI strip metadata from drone photos?",
    answer:
      "DJI does not strip metadata from drone photos. All GPS, flight telemetry, and camera data is preserved in the image file. Use MetaClean to remove this data before sharing your aerial photos.",
  },
];

const tableOfContents = [
  { id: "drone-metadata-extensive", label: "Drone Metadata Is Extensive" },
  { id: "flight-telemetry", label: "Flight Telemetry Data" },
  { id: "gimbal-and-camera", label: "Gimbal and Camera Data" },
  { id: "regulatory-concerns", label: "Regulatory Concerns" },
  { id: "privacy-risks", label: "Privacy Risks" },
  { id: "how-to-clean", label: "How to Clean Drone Photos" },
  { id: "best-practices", label: "Best Practices" },
  { id: "faq", label: "FAQ" },
];

export default function MetadataInDronesPhotosPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Metadata In Drone Photos", url: "/blog/metadata-in-drones-photos/" },
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
          <span className="text-foreground">Metadata In Drone Photos</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Drone Guide</span>
            <span className="text-sm text-muted-foreground">9 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Metadata In Drone Photos: Aerial Photography Privacy</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Drone photos contain some of the most detailed metadata of any camera. Here is what your drone records and how to protect your flight data.
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
            <section id="drone-metadata-extensive">
              <h2>Drone Photo Metadata: More Detailed Than You Expect</h2>
              <p>
                Consumer drones from DJI, Autel, Skydio, and other manufacturers capture photos
                with metadata that goes far beyond standard EXIF data. A single drone photo can
                contain dozens of metadata fields covering the drone&apos;s position, orientation,
                camera settings, flight conditions, and equipment details.
              </p>
              <p>
                This extensive metadata is designed to help drone pilots review their flights,
                optimize their photography, and maintain flight logs. However, when drone photos
                are shared publicly, this data can reveal sensitive information about your
                locations, activities, and flight patterns.
              </p>
              <p>
                For commercial drone operators, hobbyists, and content creators, understanding
                drone metadata is essential for protecting client privacy, complying with
                regulations, and maintaining operational security.
              </p>
            </section>

            <section id="flight-telemetry">
              <h2>Flight Telemetry Data in Photos</h2>
              <p>
                Every drone photo contains detailed flight telemetry that reveals exactly where
                and how the drone was flying:
              </p>
              <ul>
                <li><strong>GPS coordinates:</strong> Precise latitude and longitude of the drone when the photo was captured, accurate to within a few meters.</li>
                <li><strong>Altitude:</strong> The height above ground level (AGL) and above sea level (MSL), revealing how high the drone was flying.</li>
                <li><strong>Flight speed:</strong> The drone&apos;s horizontal and vertical speed at the moment of capture.</li>
                <li><strong>Compass heading:</strong> The direction the drone was facing, which provides context about what was being photographed.</li>
                <li><strong>GPS timestamp:</strong> The exact time the GPS data was recorded, which can be correlated with flight logs.</li>
                <li><strong>Number of GPS satellites:</strong> The number of satellites used for positioning, indicating GPS accuracy.</li>
              </ul>
              <p>
                This telemetry data can be used to reconstruct your entire flight path. By analyzing
                GPS coordinates across multiple photos, someone can determine your takeoff location,
                flight route, hover points, and landing location. This information can reveal
                sensitive locations you have surveyed or photographed.
              </p>
            </section>

            <section id="gimbal-and-camera">
              <h2>Gimbal and Camera Orientation Data</h2>
              <p>
                Drone photos include detailed gimbal and camera orientation data that reveals
                exactly what the camera was looking at:
              </p>
              <ul>
                <li><strong>Gimbal pitch:</strong> The downward or upward angle of the camera, revealing whether you were photographing the ground, horizon, or sky.</li>
                <li><strong>Gimbal yaw:</strong> The horizontal rotation of the gimbal, which may differ from the drone&apos;s heading.</li>
                <li><strong>Gimbal roll:</strong> The tilt of the camera, which affects the composition of the image.</li>
                <li><strong>Camera focal length:</strong> The zoom level used, which reveals how close the camera was to the subject.</li>
                <li><strong>Camera settings:</strong> Aperture, shutter speed, ISO, and white balance, which reveal the shooting conditions.</li>
              </ul>
              <p>
                Gimbal data is particularly revealing because it tells someone exactly what you
                were photographing. A gimbal pitched straight down with a narrow focal length
                indicates you were focused on a specific ground target. Combined with GPS data,
                this reveals both the location and the subject of your photography.
              </p>
            </section>

            <section id="regulatory-concerns">
              <h2>Regulatory Concerns With Drone Metadata</h2>
              <p>
                Drone regulations in many countries are evolving to require more transparency
                about drone operations. While photo metadata is not directly regulated, it may
                be relevant to compliance:
              </p>
              <ul>
                <li><strong>Remote identification:</strong> Many countries require drones to broadcast identification data, and photo metadata may complement this requirement.</li>
                <li><strong>Flight logging:</strong> Some regulations require pilots to maintain flight logs, and photo metadata can serve as supplementary evidence.</li>
                <li><strong>No-fly zones:</strong> GPS data in photos can be used to verify whether a drone was flown in restricted airspace.</li>
                <li><strong>Privacy regulations:</strong> GDPR and other privacy laws may require you to remove identifiable data from shared drone photos.</li>
                <li><strong>Commercial operations:</strong> Commercial drone pilots may need to manage metadata to protect client confidentiality.</li>
              </ul>
              <p>
                Consult your local aviation authority for specific regulations about drone operations
                and data management in your jurisdiction.
              </p>
            </section>

            <section id="privacy-risks">
              <h2>Privacy Risks of Drone Photo Metadata</h2>
              <p>
                Drone photos present unique privacy risks due to the combination of aerial
                perspective and detailed metadata:
              </p>
              <ul>
                <li><strong>Survey operations:</strong> Drone photos of construction sites, properties, or land surveys contain metadata that reveals the scope and timing of your operations.</li>
                <li><strong>Real estate photography:</strong> Property photos taken by drone reveal the exact address and can be used to identify properties before they are listed.</li>
                <li><strong>Journalism:</strong> Drone photos of sensitive locations can put sources, subjects, or the journalist at risk if metadata is exposed.</li>
                <li><strong>Personal privacy:</strong> Drone photos of your home, neighborhood, or activities can reveal your daily routines and locations.</li>
                <li><strong>Competitor intelligence:</strong> Commercial operators can use metadata from your photos to identify your clients, locations, and operations.</li>
              </ul>
              <p>
                The aerial perspective of drone photos makes them particularly valuable for
                surveillance and intelligence gathering, and the metadata makes that intelligence
                actionable.
              </p>
            </section>

            <section id="how-to-clean">
              <h2>How to Clean Drone Photos</h2>
              <p>
                Remove metadata from your drone photos before sharing them:
              </p>
              <ol>
                <li>
                  Visit the{" "}
                  <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                    Social Media Cleaner
                  </Link>{" "}
                  page on MetaClean.
                </li>
                <li>Upload your drone photos by dragging them onto the page or clicking to browse.</li>
                <li>MetaClean will display all metadata found in your images, including GPS coordinates, flight telemetry, gimbal data, camera details, and timestamps.</li>
                <li>Select all metadata for removal to ensure maximum privacy.</li>
                <li>Click &quot;Clean Metadata&quot; to process your photos.</li>
                <li>Download the cleaned versions and share them safely.</li>
              </ol>
              <p>
                MetaClean handles all drone image formats and strips the extensive flight telemetry
                that drone cameras record. The entire process happens in your browser — your photos
                are never uploaded to any server.
              </p>
            </section>

            <section id="best-practices">
              <h2>Drone Photography Best Practices</h2>
              <p>
                Follow these guidelines to protect your privacy and comply with regulations:
              </p>
              <ul>
                <li><strong>Strip metadata before sharing:</strong> Always remove metadata from drone photos before sharing them on social media, with clients, or publicly.</li>
                <li><strong>Check local regulations:</strong> Understand your local drone regulations regarding privacy, data management, and flight logging.</li>
                <li><strong>Protect client data:</strong> For commercial operations, strip metadata before delivering photos to clients to protect their privacy.</li>
                <li><strong>Be mindful of flight patterns:</strong> Even without metadata, your flight patterns may be observable by others in the area.</li>
                <li><strong>Use no-fly zone awareness:</strong> Always check for restricted airspace before flying, as GPS data in photos can verify your flight location.</li>
                <li><strong>Store flight data securely:</strong> Keep your original drone photos with metadata in secure storage for your own records.</li>
                <li><strong>Review before posting:</strong> Check your drone photos for identifiable content before sharing them publicly.</li>
              </ul>
              <p>
                For more information about cleaning photos, see our guide on{" "}
                <Link href="/remove-photo-metadata/" className="text-primary hover:underline">
                  removing photo metadata
                </Link>
                .
              </p>
            </section>

            <h2>Conclusion</h2>
            <p>
              Drone photos contain some of the most extensive metadata of any consumer camera,
              including GPS coordinates, altitude, flight speed, compass heading, gimbal orientation,
              and detailed telemetry. This data can reconstruct your entire flight path and reveal
              exactly what you were photographing.
            </p>
            <p>
              The safest practice is to remove all metadata from drone photos before sharing them.
              {" "}
              <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                MetaClean&apos;s free tool
              </Link>{" "}
              strips all drone metadata including flight telemetry, ensuring your aerial photos
              do not reveal more than you intend.
            </p>
          </div>
        </div>

        <section className="mt-16 rounded-xl border border-border bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Clean Your Drone Photos</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Strip GPS, flight telemetry, and all metadata from your drone photos before sharing them.
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
            description="Drone photo metadata and privacy questions"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
