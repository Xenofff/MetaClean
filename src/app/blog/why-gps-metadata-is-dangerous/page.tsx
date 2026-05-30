import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why GPS Metadata Is Dangerous",
  description:
    "Learn why GPS metadata in photos poses serious privacy risks — from stalking and burglary to real-world exploitation cases. Protect your location today.",
  keywords: [
    "GPS metadata danger",
    "location privacy risk",
    "GPS tracking",
    "photo GPS privacy",
    "location data exposure",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/why-gps-metadata-is-dangerous/`,
  },
};

const faqs = [
  {
    question: "Can someone really find my home address from a photo?",
    answer:
      "Yes. GPS metadata in photos contains latitude and longitude coordinates that can be converted to a street address using free online tools. If you share a photo taken at home without removing metadata, your exact address is exposed.",
  },
  {
    question: "How accurate is GPS data in photos?",
    answer:
      "Modern smartphones record GPS coordinates accurate to within 3 to 5 meters. This precision can identify not just your neighborhood but the exact building, floor, and side of the street you are on.",
  },
  {
    question: "Which apps add GPS data to photos?",
    answer:
      "Most smartphone camera apps add GPS data by default when location services are enabled. Social media apps, messaging apps, and third-party camera apps may also embed location information.",
  },
  {
    question: "Can GPS metadata be used for stalking?",
    answer:
      "Yes. Stalkers can use GPS metadata to track your daily routine, identify places you frequent, determine when you are home or away, and find your workplace. This is one of the most serious privacy risks associated with photo metadata.",
  },
  {
    question: "Does removing GPS data affect photo quality?",
    answer:
      "No. Removing GPS metadata only strips the location information from the image file. The actual photo — every pixel, color, and detail — remains completely unchanged.",
  },
  {
    question: "How do I remove GPS data before sharing photos?",
    answer:
      "Use a metadata removal tool like MetaClean. Upload your photo, select the GPS data to remove, and download a clean version. MetaClean processes everything in your browser so your files are never uploaded to a server.",
  },
];

const tableOfContents = [
  { id: "how-gps-ends-up-in-photos", label: "How GPS Ends Up in Photos" },
  { id: "real-world-exploitation", label: "Real-World Exploitation" },
  { id: "stalking-risks", label: "Stalking Risks" },
  { id: "burglary-planning", label: "Burglary Planning" },
  { id: "how-accurate", label: "How Accurate Is It?" },
  { id: "social-media-risk", label: "Social Media Risk" },
  { id: "protect-yourself", label: "How to Protect Yourself" },
  { id: "faq", label: "FAQ" },
];

export default function WhyGpsMetadataIsDangerousPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Why GPS Metadata Is Dangerous", url: "/blog/why-gps-metadata-is-dangerous/" },
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
          <span className="text-foreground">Why GPS Metadata Is Dangerous</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-danger/10 px-2.5 py-0.5 text-xs font-medium text-danger">Security</span>
            <span className="text-sm text-muted-foreground">10 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Why GPS Metadata Is Dangerous</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            GPS coordinates hidden in your photos can expose your home, workplace, and daily movements to anyone with basic tools.
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
            <section id="how-gps-ends-up-in-photos">
              <h2>How GPS Data Ends Up in Your Photos</h2>
              <p>
                When you take a photo with your smartphone, the device doesn&apos;t just capture light through the lens.
                It simultaneously records a snapshot of your environment through the phone&apos;s sensors. GPS satellites
                triangulate your position, cell towers provide additional location data, and nearby WiFi networks
                contribute to positioning — all of which get embedded into the image file as metadata.
              </p>
              <p>
                This happens automatically. Unless you&apos;ve specifically disabled location services for your camera app,
                every single photo you take includes precise geographic coordinates. Most people are completely unaware
                this data exists, let alone that it persists when the photo is shared via text message, email, social
                media, or any other channel.
              </p>
              <p>
                The GPS data is stored in the EXIF (Exchangeable Image File Format) section of the image file. It
                includes latitude, longitude, altitude, and a timestamp — creating a precise record of exactly where
                and when the photo was taken. This data survives many common sharing methods and can be extracted
                using free tools available to anyone.
              </p>
            </section>

            <section id="real-world-exploitation">
              <h2>Real-World GPS Exploitation Cases</h2>
              <p>
                The dangers of GPS metadata are not theoretical. There are numerous documented cases of individuals
                being tracked, targeted, or harmed because of location data embedded in their photos.
              </p>

              <h3>Documented Stalking Incidents</h3>
              <p>
                Security researchers have demonstrated that it is possible to track a person&apos;s daily movements
                simply by monitoring their public photo uploads. In one well-known case, a researcher collected
                publicly shared photos from social media and used the GPS metadata to reconstruct a complete
                map of the subject&apos;s daily routine — including their home, workplace, gym, and children&apos;s school.
              </p>

              <h3>Criminal Exploitation</h3>
              <p>
                Law enforcement agencies have warned that criminals use GPS metadata to identify when homes are
                unoccupied. By analyzing the timestamps and locations of photos shared on vacation, burglars can
                determine the exact window when a residence is empty. This technique has been used in multiple
                burglary cases across the United States and Europe.
              </p>

              <h3>Corporate Espionage</h3>
              <p>
                In the corporate world, GPS metadata has been used to identify employees visiting competitor
                offices, attending confidential meetings, or traveling to locations that reveal strategic business
                activities. A single photo shared internally can expose sensitive corporate movements.
              </p>

              <h3>Doxxing and Harassment</h3>
              <p>
                Online harassers and doxxers routinely extract GPS data from photos to find and publish victims&apos;
                home addresses. This information has been used in swatting incidents, harassment campaigns, and
                real-world confrontations.
              </p>
            </section>

            <section id="stalking-risks">
              <h2>How GPS Metadata Enables Stalking</h2>
              <p>
                Stalking is one of the most immediate dangers of exposed GPS metadata. When you share photos
                without removing location data, you provide a stalker with a powerful surveillance tool:
              </p>
              <ul>
                <li><strong>Routine mapping:</strong> A series of photos reveals your regular schedule — when you leave home, where you go, and when you return.</li>
                <li><strong>Location monitoring:</strong> Each new photo update tells a stalker exactly where you are at that moment.</li>
                <li><strong>Association tracking:</strong> Photos with others reveal the locations of your friends, family, and colleagues.</li>
                <li><strong>Event attendance:</strong> Photos from events reveal which gatherings you attend, along with the venue and time.</li>
                <li><strong>Travel intelligence:</strong> Vacation photos reveal when you are away from home and for how long.</li>
              </ul>
              <p>
                What makes GPS-enabled stalking particularly dangerous is that the victim is typically unaware
                it is happening. The stalker does not need to physically follow the target — they simply monitor
                publicly available photos and extract the location data silently.
              </p>
            </section>

            <section id="burglary-planning">
              <h2>GPS Metadata and Burglary Planning</h2>
              <p>
                Criminals have discovered that social media photos are a goldmine of information for planning
                burglaries. Here is how the process works:
              </p>
              <ol>
                <li><strong>Target identification:</strong> A burglar identifies social media accounts of people in affluent neighborhoods.</li>
                <li><strong>Location extraction:</strong> GPS metadata in their photos reveals home addresses.</li>
                <li><strong>Schedule analysis:</strong> Timestamps in photos reveal when residents are typically home or away.</li>
                <li><strong>Vacation detection:</strong> Photos posted from vacation destinations confirm when homes are empty.</li>
                <li><strong>Entry planning:</strong> Photos of home exteriors reveal entry points, security systems, and property layout.</li>
              </ol>
              <p>
                Law enforcement in multiple countries has issued public warnings about this technique. Police
                departments regularly advise residents to remove metadata from photos before sharing them online,
                especially images taken at or near their home.
              </p>
            </section>

            <section id="how-accurate">
              <h2>How Accurate Is GPS Metadata?</h2>
              <p>
                Modern smartphones use a combination of GPS satellites, cell tower triangulation, and WiFi
                positioning to determine your location. This multi-source approach produces coordinates that
                are typically accurate to within 3 to 5 meters under normal conditions.
              </p>
              <p>
                To put this in perspective, 3 meters is close enough to determine:
              </p>
              <ul>
                <li>Which specific building you are in</li>
                <li>Which floor you are on (when altitude data is included)</li>
                <li>Which side of the street you are standing on</li>
                <li>Which room of a house you are in (in smaller homes)</li>
                <li>Which table you are sitting at in a restaurant</li>
              </ul>
              <p>
                This level of precision means that GPS metadata does not just reveal your general area — it
                pinpoints your exact position with startling accuracy. For someone with malicious intent,
                this data is far more useful than a vague neighborhood reference.
              </p>
            </section>

            <section id="social-media-risk">
              <h2>The Social Media Risk Factor</h2>
              <p>
                Social media platforms amplify the danger of GPS metadata because photos are often shared
                publicly or with large audiences. Even if you trust the people in your network, a single
                shared photo can be screenshotted, saved, and analyzed by anyone with access to it.
              </p>
              <p>
                Some platforms strip metadata during upload, but this is not universal. Photos shared via
                direct message, email, AirDrop, or file-sharing services typically retain their full metadata.
                Even platforms that strip metadata from public posts may preserve it in private messages or
                downloads.
              </p>
              <p>
                The safest approach is to remove GPS metadata from every photo before sharing it through any
                channel. This eliminates the risk regardless of how the recipient handles or re-shares the file.
              </p>
            </section>

            <section id="protect-yourself">
              <h2>How to Protect Your Location Privacy</h2>
              <p>
                Protecting yourself from GPS metadata exposure requires a combination of prevention and
                remediation:
              </p>

              <h3>Disable Location Services for Your Camera</h3>
              <p>
                You can prevent GPS data from being recorded in the first place by disabling location access
                for your camera app. On iPhone, go to Settings &gt; Privacy &gt; Location Services and set the Camera
                app to &quot;Never.&quot; On Android, open your Camera app settings and disable &quot;Location tags&quot; or
                &quot;Geo-tagging.&quot;
              </p>
              <p>
                The downside of this approach is that you lose the ability to organize photos by location in
                your gallery. For many people, the privacy benefit outweighs this inconvenience.
              </p>

              <h3>Remove Metadata Before Sharing</h3>
              <p>
                The most effective approach is to remove GPS metadata from photos before sharing them, even if
                you&apos;ve disabled location services. This provides a safety net against any metadata that may have
                been recorded.
              </p>
              <p>
                Use{" "}
                <Link href="/remove-gps-from-photo/" className="text-primary hover:underline">
                  MetaClean&apos;s GPS Remover
                </Link>{" "}
                to strip location data from your photos entirely in your browser. The process takes seconds and
                guarantees that no location information leaves your device.
              </p>

              <h3>Audit Your Existing Photos</h3>
              <p>
                Don&apos;t forget about photos you&apos;ve already taken. Check your camera roll for images with GPS data
                and clean them before any future sharing. This is especially important for older photos that
                you may have forgotten about.
              </p>

              <h3>Be Mindful of Photo Backgrounds</h3>
              <p>
                Even without GPS metadata, visual clues in your photos — street signs, landmarks, house numbers,
                storefronts — can help someone identify your location. Combine this with the timestamp data that
                remains in most images, and you have a recipe for exposure. Learn more about{" "}
                <Link href="/protect-your-location-in-photos/" className="text-primary hover:underline">
                  protecting your location in photos
                </Link>
                .
              </p>
            </section>

            <h2>Conclusion</h2>
            <p>
              GPS metadata is one of the most serious and overlooked privacy risks in digital photography.
              The coordinates embedded in your photos can be used to track your movements, identify your home,
              monitor your routine, and plan criminal activity — all without your knowledge.
            </p>
            <p>
              The good news is that protecting yourself is simple. Remove GPS data from your photos before
              sharing them through any channel.{" "}
              <Link href="/remove-gps-from-photo/" className="text-primary hover:underline">
                MetaClean&apos;s GPS Remover
              </Link>{" "}
              makes the process fast, free, and completely private — your files never leave your browser.
            </p>
          </div>
        </div>

        <section className="mt-16 rounded-xl border border-border bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Remove GPS Data From Your Photos Now</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Strip location metadata from your photos in seconds. No uploads, no server processing — everything happens in your browser.
          </p>
          <Link
            href="/remove-gps-from-photo/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Try the GPS Remover — Free
          </Link>
        </section>

        <div id="faq">
          <FAQSection
            title="Frequently Asked Questions"
            description="Understanding GPS metadata risks and how to stay safe"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
