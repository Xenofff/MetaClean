import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How GPS Metadata Reveals Your Location",
  description: "Learn how GPS data embedded in your photos can reveal your exact location and how to remove it.",
  keywords: ["GPS metadata", "location privacy", "photo GPS data", "location tracking"],
  alternates: {
    canonical: `${siteConfig.url}/blog/gps-metadata-danger/`,
  },
};

const faqs = [
  {
    question: "Can someone really find my address from a photo?",
    answer: "Yes, if your photo contains GPS metadata, the latitude and longitude coordinates can be converted to a street address. Many online tools and services can perform this lookup.",
  },
  {
    question: "Which apps record GPS data?",
    answer: "Most smartphone camera apps record GPS data by default. Social media apps like Instagram, Facebook, and Snapchat also collect location information.",
  },
  {
    question: "How accurate is GPS metadata?",
    answer: "GPS metadata is typically accurate to within a few meters. This means someone could determine not just your neighborhood, but your exact building or even the part of the building you were in.",
  },
];

export default function GpsMetadataDangerPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "How GPS Metadata Reveals Your Location", url: "/blog/gps-metadata-danger/" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={generateFAQSchema(faqs)} />

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/blog/" className="hover:text-foreground">Blog</Link>
          <span>/</span>
          <span className="text-foreground">How GPS Metadata Reveals Your Location</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-danger/10 px-2.5 py-0.5 text-xs font-medium text-danger">Security</span>
            <span className="text-sm text-muted-foreground">6 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">How GPS Metadata Reveals Your Location</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover how GPS data in photos can pinpoint your exact location.
          </p>
        </header>

        <div className="prose prose-gray max-w-none">
          <h2>The Silent Tracker in Your Photos</h2>

          <p>
            Every time you take a photo with your smartphone, there&apos;s a high chance it&apos;s recording exactly
            where you are. This GPS metadata is embedded silently in your image files, creating a digital map
            of your movements without your explicit awareness.
          </p>

          <h2>Understanding GPS Metadata</h2>

          <p>
            GPS metadata in photos typically includes:
          </p>

          <ul>
            <li><strong>Latitude:</strong> Your north-south position on Earth</li>
            <li><strong>Longitude:</strong> Your east-west position on Earth</li>
            <li><strong>Altitude:</strong> Your height above sea level</li>
            <li><strong>Timestamp:</strong> The exact time the photo was taken</li>
            <li><strong>Direction:</strong> Which way the camera was facing</li>
          </ul>

          <p>
            This information is stored in the EXIF (Exchangeable Image File Format) data of your image
            file. It&apos;s not visible when you view the photo, but it&apos;s easily extractable with free tools
            and online services.
          </p>

          <h2>How Accurate Is GPS Data?</h2>

          <p>
            Modern smartphones use a combination of GPS satellites, cell tower triangulation, and WiFi
            networks to determine your location. This multi-source approach means GPS metadata is typically
            accurate to within 3-5 meters under good conditions.
          </p>

          <p>
            This level of accuracy means someone could determine:
          </p>

          <ul>
            <li>Which building you&apos;re in</li>
            <li>Which floor of a building you&apos;re on (with altitude data)</li>
            <li>Which side of the street you&apos;re standing on</li>
            <li>Specific rooms in larger buildings</li>
          </ul>

          <h2>Real-World Implications</h2>

          <h3>Home Security Risks</h3>
          <p>
            When you share photos taken at home, GPS metadata reveals your home address. This information
            can be exploited by:
          </p>

          <ul>
            <li>Burglars identifying when you&apos;re away</li>
            <li>Stalkers tracking your location</li>
            <li>Scammers targeting you with location-based fraud</li>
          </ul>

          <h3>Workplace Exposure</h3>
          <p>
            Photos taken at work reveal your workplace location, which can be used for social engineering
            attacks or corporate espionage.
          </p>

          <h3>Travel Patterns</h3>
          <p>
            Over time, a collection of photos with GPS data can reveal your complete travel patterns,
            including:
          </p>

          <ul>
            <li>Daily commute routes</li>
            <li>Frequent destinations</li>
            <li>Vacation locations</li>
            <li>Medical facility visits</li>
          </ul>

          <h2>How to Check for GPS Data</h2>

          <p>
            You can easily check if your photos contain GPS data using MetaClean&apos;s metadata inspector:
          </p>

          <ol>
            <li>Visit the <Link href="/remove-photo-metadata/" className="text-primary hover:underline">Photo Metadata Remover</Link> page</li>
            <li>Upload your photo</li>
            <li>Review the detected metadata for GPS coordinates</li>
          </ol>

          <h2>How to Remove GPS Data</h2>

          <p>
            Removing GPS data from your photos is simple with MetaClean:
          </p>

          <ol>
            <li>Upload your photo to the <Link href="/remove-photo-metadata/" className="text-primary hover:underline">Photo Metadata Remover</Link></li>
            <li>Select &quot;Remove GPS Coordinates&quot; from the cleaning options</li>
            <li>Click &quot;Clean Metadata&quot;</li>
            <li>Download your cleaned photo</li>
          </ol>

          <h2>Preventing GPS Data Collection</h2>

          <p>
            You can also prevent GPS data from being recorded in the first place:
          </p>

          <h3>On iPhone</h3>
          <ul>
            <li>Go to Settings &gt; Privacy &gt; Location Services</li>
            <li>Find your Camera app</li>
            <li>Set it to &quot;Never&quot; or &quot;While Using&quot;</li>
          </ul>

          <h3>On Android</h3>
          <ul>
            <li>Open your Camera app</li>
            <li>Go to Settings</li>
            <li>Disable &quot;Location tags&quot; or &quot;Geo-tag&quot;</li>
          </ul>

          <h2>Conclusion</h2>

          <p>
            GPS metadata is one of the most significant privacy risks in digital photography. By understanding
            how this data works and taking steps to remove it before sharing, you can protect your location
            privacy and personal safety.
          </p>

          <p>
            Start protecting your location privacy today with our{" "}
            <Link href="/remove-photo-metadata/" className="text-primary hover:underline">Photo Metadata Remover</Link>.
          </p>
        </div>

        <FAQSection
          title="Frequently Asked Questions"
          description="Understanding GPS metadata and location privacy"
          faqs={faqs}
        />
      </article>
    </>
  );
}
