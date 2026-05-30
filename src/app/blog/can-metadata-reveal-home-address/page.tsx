import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Can Metadata Reveal Your Home Address",
  description:
    "GPS coordinates in photos can pinpoint your exact home address. Learn how metadata exposes your location and how to protect yourself from location tracking.",
  keywords: [
    "metadata home address",
    "GPS photo location",
    "photo reveals home address",
    "EXIF location data",
    "metadata location privacy",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/can-metadata-reveal-home-address/`,
  },
};

const faqs = [
  {
    question: "Can someone really find my home address from a photo?",
    answer:
      "Yes. If your photo contains GPS metadata, the coordinates are precise enough to identify a specific building. By entering these coordinates into any map application, anyone can see the exact location where the photo was taken — including your home, workplace, or other sensitive locations.",
  },
  {
    question: "How precise is GPS data in photos?",
    answer:
      "GPS data in smartphone photos is typically accurate to within 3-5 meters. This means the coordinates can identify not just your neighborhood, but the specific building where you were standing. Some devices also record altitude, which can indicate which floor of a building you were on.",
  },
  {
    question: "Do all photos contain my home address?",
    answer:
      "Only photos taken with GPS enabled contain location data. If you have disabled location services for your camera app, your photos will not contain GPS coordinates. However, many people have location services enabled by default and do not realize their photos are recording their location.",
  },
  {
    question: "How can I check if my photos reveal my address?",
    answer:
      "Upload your photos to MetaClean's EXIF Viewer to check for GPS coordinates. If GPS data is present, the tool will display the coordinates. You can then enter these coordinates into a map application to see exactly what location they reveal.",
  },
  {
    question: "Does removing GPS data remove my home address from photos?",
    answer:
      "Yes. Removing GPS coordinates from your photos eliminates the primary way metadata reveals your home address. However, visual clues in the photo itself — such as house numbers, street signs, or recognizable landmarks — may still reveal your location even without metadata.",
  },
];

const tocItems = [
  { id: "how-gps-reveals-address", title: "How GPS Reveals Your Address" },
  { id: "precision-levels", title: "Precision of Location Data" },
  { id: "attack-scenarios", title: "Real-World Attack Scenarios" },
  { id: "social-media-exposure", title: "Social Media Exposure" },
  { id: "how-to-protect", title: "How to Protect Yourself" },
  { id: "beyond-gps", title: "Beyond GPS: Visual Clues" },
];

export default function CanMetadataRevealHomeAddressPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Can Metadata Reveal Your Home Address", url: "/blog/can-metadata-reveal-home-address/" },
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
          <span className="text-foreground">Can Metadata Reveal Your Home Address</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-danger/10 px-2.5 py-0.5 text-xs font-medium text-danger">Privacy Risk</span>
                <span className="text-sm text-muted-foreground">10 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Can Metadata Reveal Your Home Address</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                The answer is yes. Photos taken at or near your home can contain GPS coordinates that pinpoint your exact address. Here is how this works and how to stop it.
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <h2 id="how-gps-reveals-address">How GPS Metadata Reveals Your Home Address</h2>

              <p>
                Every modern smartphone records GPS coordinates when you take a photo. This
                happens automatically in the background — you do not need to enable any special
                feature or press any additional buttons. When you press the shutter, your phone&apos;s
                GPS receiver logs your precise latitude and longitude and embeds it directly
                into the image file.
              </p>

              <p>
                The GPS coordinates embedded in your photos are stored in the EXIF metadata,
                which is a standard format for storing information about digital images. These
                coordinates use the WGS 84 coordinate system, which is the same system used by
                GPS devices worldwide. The coordinates are stored as latitude and longitude
                values, typically with six or more decimal places.
              </p>

              <p>
                To understand the significance of this, consider what happens when you take a
                photo at your front door. The GPS coordinates recorded are the exact position
                of your phone at that moment — which is your home address. Anyone who downloads
                that photo can extract the coordinates and enter them into Google Maps, Apple
                Maps, or any other mapping service to see the precise location.
              </p>

              <p>
                The process of extracting GPS data from a photo is trivial. Free tools like
                MetaClean&apos;s EXIF Viewer display all metadata in an image, including GPS
                coordinates if they are present. No technical expertise is required — anyone
                can do it in seconds.
              </p>

              <h2 id="precision-levels">How Precise Is the Location Data?</h2>

              <p>
                The precision of GPS data in photos varies by device, but it is consistently
                accurate enough to identify a specific building:
              </p>

              <ul>
                <li><strong>Smartphone GPS:</strong> Typically accurate to within 3-5 meters, which is precise enough to identify a specific house on a street.</li>
                <li><strong>iPhone GPS:</strong> Apple devices use a combination of GPS, Wi-Fi, and cellular data to achieve accuracy within 3-5 meters in urban areas.</li>
                <li><strong>Android GPS:</strong> Android devices vary by manufacturer, but most modern smartphones achieve similar accuracy to iPhones.</li>
                <li><strong>Dedicated cameras with GPS:</strong> Some digital cameras include GPS modules that provide accuracy within 10 meters.</li>
                <li><strong>Altitude data:</strong> Many devices also record altitude, which can indicate which floor of a building you were on — useful for identifying apartments or offices.</li>
              </ul>

              <p>
                The decimal precision of GPS coordinates in photos is typically 6-8 decimal
                places. At 6 decimal places, the precision is approximately 0.11 meters —
                about 11 centimeters. This means the coordinates can distinguish between two
                points that are less than a foot apart.
              </p>

              <h2 id="attack-scenarios">Real-World Attack Scenarios</h2>

              <p>
                The exposure of your home address through metadata is not a theoretical risk.
                There are documented cases and demonstrated techniques:
              </p>

              <h3>Social Media Mapping</h3>

              <p>
                Researchers have demonstrated the ability to extract home addresses from
                photos shared on social media platforms. By analyzing GPS metadata from
                profile pictures and posts, they could identify users&apos; home addresses with
                alarming accuracy. This technique works across all major social media platforms
                that do not strip metadata before display.
              </p>

              <h3>Dating App Risks</h3>

              <p>
                Photos shared on dating apps are shared with strangers. Security researchers
                have shown that by analyzing metadata from dating app profile photos, it is
                possible to determine users&apos; home addresses and workplaces. This creates a
                direct path for stalkers to locate their targets.
              </p>

              <h3>Vacation Burglary</h3>

              <p>
                Criminals have used social media photos to identify when homes are empty.
                By analyzing timestamps and location data from vacation photos, burglars
                can determine when homeowners are away and plan break-ins during optimal
                times. Law enforcement agencies have issued warnings about this specific
                threat.
              </p>

              <h3>Stalking and Harassment</h3>

              <p>
                Abusers and stalkers have used photo metadata to monitor their victims&apos;
                locations. In domestic violence situations, GPS data from photos can reveal
                the location of a victim who has fled to a new address. This is particularly
                dangerous for people trying to escape abusive relationships.
              </p>

              <h2 id="social-media-exposure">How Social Media Amplifies the Risk</h2>

              <p>
                Social media platforms create a unique risk because they combine wide
                distribution with metadata exposure:
              </p>

              <ul>
                <li><strong>Public posts:</strong> Photos posted publicly on social media can be downloaded by anyone, who can then extract the metadata.</li>
                <li><strong>Platform behavior:</strong> Some platforms strip metadata from displayed images, but they may retain the original on their servers.</li>
                <li><strong>Cross-platform sharing:</strong> Photos shared on one platform are often reposted elsewhere, where metadata may be preserved.</li>
                <li><strong>Profile pictures:</strong> Your profile picture is the most widely distributed image and may contain metadata from when it was taken.</li>
                <li><strong>Direct messages:</strong> Photos sent via DMs may retain metadata depending on the platform.</li>
              </ul>

              <p>
                The combination of wide distribution and metadata exposure means that a single
                photo posted to social media can reveal your home address to thousands of
                people you do not know.
              </p>

              <h2 id="how-to-protect">How to Protect Your Home Address</h2>

              <p>
                Protecting your home address from metadata exposure requires a combination
                of preventive and corrective measures:
              </p>

              <h3>Disable GPS Tagging</h3>

              <p>
                The most effective long-term solution is to disable GPS tagging in your
                camera settings. On iPhone, go to Settings &gt; Privacy &amp; Security &gt;
                Location Services &gt; Camera and set it to Never. On Android, open the
                Camera app, go to Settings, and toggle off Location tags or Store location.
              </p>

              <h3>Remove Metadata from Existing Photos</h3>

              <p>
                For photos you have already taken, use a metadata removal tool to strip
                GPS coordinates before sharing. The{" "}
                <Link href="/remove-gps-from-photo/" className="text-primary hover:underline">
                  GPS Removal Tool
                </Link>{" "}
                lets you remove location data from individual photos, while the{" "}
                <Link href="/batch-metadata-remover/" className="text-primary hover:underline">
                  Batch Metadata Remover
                </Link>{" "}
                handles entire folders at once.
              </p>

              <h3>Check Before Sharing</h3>

              <p>
                Before sharing any photo, upload it to the{" "}
                <Link href="/exif-viewer/" className="text-primary hover:underline">
                  EXIF Viewer
                </Link>{" "}
                to check for GPS coordinates. If coordinates are present, remove them before
                sharing. Make this a habit for every photo you share.
              </p>

              <h3>Use the Privacy Score Tool</h3>

              <p>
                For a comprehensive assessment of your photo&apos;s privacy risks, use the{" "}
                <Link href="/privacy-score-tool/" className="text-primary hover:underline">
                  Privacy Score Tool
                </Link>
                . It analyzes your photo for GPS data, background details, and other privacy
                risks, giving you a clear picture of how safe the photo is to share.
              </p>

              <h2 id="beyond-gps">Beyond GPS: Visual Clues That Reveal Your Address</h2>

              <p>
                Even with GPS metadata removed, the visual content of your photo can still
                reveal your location. Be aware of these visual clues:
              </p>

              <ul>
                <li><strong>House numbers:</strong> Visible house numbers can be combined with online directories to find your address.</li>
                <li><strong>Street signs:</strong> Street names and intersection signs pinpoint your location.</li>
                <li><strong>Recognizable landmarks:</strong> Unique buildings, monuments, or natural features can identify your neighborhood.</li>
                <li><strong>Business signs:</strong> Store names, restaurants, and other businesses near your home can narrow down your location.</li>
                <li><strong>Architectural features:</strong> Unique home features — a distinctive porch, fence, or garden — can be matched to street view imagery.</li>
                <li><strong>Vehicle license plates:</strong> Visible plates can be traced back to you through public records.</li>
              </ul>

              <p>
                Combining metadata removal with visual awareness creates a comprehensive
                approach to protecting your home address from exposure through photos.
              </p>

              <h2>Conclusion</h2>

              <p>
                Metadata absolutely can reveal your home address. GPS coordinates embedded
                in photos are precise enough to identify a specific building, and anyone who
                downloads your photo can extract this data in seconds. Protect yourself by
                disabling GPS tagging, removing metadata before sharing, and being aware of
                visual clues that can reveal your location even without metadata.
              </p>

              <p>
                Start by checking your most recent photos with the{" "}
                <Link href="/exif-viewer/" className="text-primary hover:underline">
                  EXIF Viewer
                </Link>{" "}
                to see if they contain GPS coordinates. If they do, use the{" "}
                <Link href="/remove-gps-from-photo/" className="text-primary hover:underline">
                  GPS Removal Tool
                </Link>{" "}
                to strip the location data before sharing.
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
          <h2 className="text-2xl font-bold text-foreground mb-3">Check If Your Photos Reveal Your Address</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Upload your photos to see what metadata they contain. Remove GPS coordinates and other sensitive data before sharing.
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
            description="Questions about metadata location exposure and home address privacy"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
