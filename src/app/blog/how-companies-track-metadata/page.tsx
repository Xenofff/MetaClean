import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Companies Track Metadata",
  description:
    "Companies collect and analyze metadata from your photos, documents, and devices. Learn how corporate metadata tracking works and how to protect yourself.",
  keywords: [
    "company metadata tracking",
    "corporate metadata collection",
    "metadata surveillance",
    "corporate data collection",
    "metadata privacy companies",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/how-companies-track-metadata/`,
  },
};

const faqs = [
  {
    question: "What metadata do companies collect from my photos?",
    answer:
      "Companies may collect GPS coordinates, timestamps, device information, image content analysis, face recognition data, and usage patterns. Social media platforms, cloud storage providers, and messaging apps all collect varying amounts of metadata from uploaded content.",
  },
  {
    question: "How do companies use metadata for advertising?",
    answer:
      "Companies use metadata to build detailed profiles for targeted advertising. Location data reveals where you shop, eat, and travel. Timestamps reveal your daily routines. Device information reveals your economic status. This data is combined with other sources to create comprehensive advertising profiles.",
  },
  {
    question: "Do cloud storage providers read my photo metadata?",
    answer:
      "Many cloud storage providers process metadata from uploaded photos for organizing, searching, and analyzing content. While some providers may not read metadata manually, their automated systems analyze it for features like location-based search, timeline organization, and content recommendations.",
  },
  {
    question: "Can companies sell my metadata?",
    answer:
      "Yes. Many companies include provisions in their privacy policies that allow them to share or sell metadata with third parties. This data is valuable for market research, advertising, and analytics. Once metadata is shared, you have no control over how it is used by third parties.",
  },
  {
    question: "How do I prevent companies from collecting my metadata?",
    answer:
      "The most effective approach is to remove metadata from all files before uploading them to any service. Use a client-side tool like MetaClean to strip metadata locally, preventing the data from ever reaching company servers. Additionally, review privacy settings on all platforms and disable unnecessary data collection.",
  },
];

const tocItems = [
  { id: "how-tracking-works", title: "How Corporate Tracking Works" },
  { id: "social-media-tracking", title: "Social Media Metadata Collection" },
  { id: "cloud-storage", title: "Cloud Storage Analysis" },
  { id: "advertising-profiles", title: "Building Advertising Profiles" },
  { id: "third-party-sharing", title: "Third-Party Data Sharing" },
  { id: "protection-strategies", title: "Protection Strategies" },
];

export default function HowCompaniesTrackMetadataPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "How Companies Track Metadata", url: "/blog/how-companies-track-metadata/" },
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
          <span className="text-foreground">How Companies Track Metadata</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-danger/10 px-2.5 py-0.5 text-xs font-medium text-danger">Privacy Risk</span>
                <span className="text-sm text-muted-foreground">10 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">How Companies Track Metadata</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Every photo you upload, document you share, and file you store generates metadata that companies collect and analyze. Here is how this tracking works.
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <h2 id="how-tracking-works">How Corporate Metadata Tracking Works</h2>

              <p>
                When you interact with digital services — uploading photos to social media,
                storing files in the cloud, sending messages, or using apps — the companies
                behind those services collect metadata from your activity. This collection
                happens automatically and is often transparent to the user. The metadata
                collected goes far beyond what is visible in the files themselves.
              </p>

              <p>
                Corporate metadata tracking operates on multiple levels. At the file level,
                companies extract EXIF data from photos, properties from documents, and
                technical information from all uploaded content. At the platform level,
                companies track when you upload, what you upload, how you interact with
                content, and what devices and networks you use. At the user level, companies
                combine metadata from all your activities to build comprehensive profiles.
              </p>

              <p>
                This metadata is valuable because it reveals behavior patterns, preferences,
                locations, and relationships that are not obvious from the content alone.
                A photo of a restaurant is just an image, but the metadata reveals where you
                eat, when you go there, what device you use, and whether you visit regularly.
              </p>

              <h2 id="social-media-tracking">Social Media Metadata Collection</h2>

              <p>
                Social media platforms are the most aggressive collectors of metadata because
                user-generated content is their core product. Every piece of content you share
                generates metadata that platforms analyze:
              </p>

              <ul>
                <li><strong>Photo metadata:</strong> GPS coordinates, timestamps, device information, and image analysis data extracted from uploaded photos.</li>
                <li><strong>Post metadata:</strong> Time of posting, edit history, engagement metrics, and audience data for every post.</li>
                <li><strong>Interaction metadata:</strong> What you like, comment on, share, and how long you spend viewing different types of content.</li>
                <li><strong>Device metadata:</strong> The device model, operating system, browser, and network information used for each interaction.</li>
                <li><strong>Location metadata:</strong> IP-based location, GPS data from mobile devices, and location tags you add to posts.</li>
                <li><strong>Social graph metadata:</strong> Who you follow, who follows you, who you interact with most, and the strength of your connections.</li>
              </ul>

              <p>
                This metadata is stored indefinitely and is used for targeted advertising,
                content recommendation, platform optimization, and may be shared with third
                parties or disclosed in response to legal requests.
              </p>

              <h2 id="cloud-storage">Cloud Storage Metadata Analysis</h2>

              <p>
                Cloud storage providers like Google Drive, iCloud, Dropbox, and OneDrive
                process metadata from stored files to provide features like search, organization,
                and recommendations:
              </p>

              <ul>
                <li><strong>Photo organization:</strong> Cloud photo services use metadata to organize photos by date, location, and people, creating detailed records of your activities.</li>
                <li><strong>Content analysis:</strong> Automated systems analyze file content and metadata to provide search functionality and content suggestions.</li>
                <li><strong>Usage patterns:</strong> Providers track what you upload, when you access files, and how you organize your content.</li>
                <li><strong>Sharing metadata:</strong> When you share files, the provider records who you shared with and when.</li>
              </ul>

              <p>
                While cloud providers may not manually review your files, their automated
                systems process metadata extensively. This metadata is valuable for
                improving services, developing new features, and generating advertising
                revenue.
              </p>

              <h2 id="advertising-profiles">Building Advertising Profiles</h2>

              <p>
                The primary purpose of metadata collection is to build detailed advertising
                profiles. Metadata reveals patterns about your life that are highly valuable
                to advertisers:
              </p>

              <ul>
                <li><strong>Location patterns:</strong> Where you go reveals your lifestyle, income level, and interests. Regular visits to upscale restaurants, gyms, or luxury stores indicate different ad targeting than visits to budget stores or discount outlets.</li>
                <li><strong>Temporal patterns:</strong> When you are active online, when you take photos, and when you share content reveals your daily routine and availability.</li>
                <li><strong>Device information:</strong> The device you use indicates your economic status and technology preferences, which are key advertising segments.</li>
                <li><strong>Social connections:</strong> Who you interact with reveals your social circle, professional network, and influence level.</li>
                <li><strong>Interest signals:</strong> The content you create, share, and engage with reveals your interests, hobbies, and purchasing intentions.</li>
              </ul>

              <p>
                This metadata is combined with data from other sources — purchase history,
                browsing behavior, public records — to create comprehensive profiles that
                are used for targeted advertising across multiple platforms.
              </p>

              <h2 id="third-party-sharing">Third-Party Data Sharing</h2>

              <p>
                Metadata collected by companies is often shared with third parties through
                various mechanisms:
              </p>

              <ul>
                <li><strong>Advertising networks:</strong> Metadata is shared with advertising partners to enable cross-platform targeting.</li>
                <li><strong>Data brokers:</strong> Companies sell metadata to data brokers who aggregate it with other sources and sell comprehensive profiles.</li>
                <li><strong>Analytics providers:</strong> Metadata is shared with analytics services that help companies understand user behavior.</li>
                <li><strong>Legal requests:</strong> Law enforcement agencies can request metadata through legal processes, including subpoenas and court orders.</li>
                <li><strong>Acquisitions:</strong> When companies are acquired, their metadata collections are transferred to the acquiring company.</li>
              </ul>

              <p>
                Once metadata leaves the original company, you have no control over how it
                is used, who accesses it, or how long it is retained. This is why preventing
                metadata from reaching company servers in the first place is the most
                effective protection.
              </p>

              <h2 id="protection-strategies">Protection Strategies</h2>

              <p>
                Protecting yourself from corporate metadata tracking requires proactive measures:
              </p>

              <ol>
                <li>
                  <strong>Remove metadata before uploading:</strong> Use a client-side tool like the{" "}
                  <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                    Social Media Cleaner
                  </Link>{" "}
                  to strip metadata from all files before uploading them to any service.
                </li>
                <li>
                  <strong>Review privacy settings:</strong> Disable location services, face recognition, and other data collection features on all platforms.
                </li>
                <li>
                  <strong>Minimize uploads:</strong> Be selective about what you upload to cloud services and social media platforms.
                </li>
                <li>
                  <strong>Use privacy-focused alternatives:</strong> Choose services that prioritize user privacy and minimize metadata collection.
                </li>
                <li>
                  <strong>Audit your digital footprint:</strong> Periodically review and delete content that reveals sensitive information about you.
                </li>
              </ol>

              <h2>Conclusion</h2>

              <p>
                Companies collect and analyze metadata from your digital activity to build
                advertising profiles, improve services, and share data with third parties.
                This tracking happens automatically and is often invisible to users. The most
                effective protection is to remove metadata from all files before they reach
                company servers, using client-side tools that process files locally.
              </p>

              <p>
                Start by checking what metadata your photos contain with the{" "}
                <Link href="/exif-viewer/" className="text-primary hover:underline">
                  EXIF Viewer
                </Link>
                , then use the{" "}
                <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                  Social Media Cleaner
                </Link>{" "}
                to strip all metadata before your next upload.
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
          <h2 className="text-2xl font-bold text-foreground mb-3">Stop Companies from Tracking Your Metadata</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Strip metadata from your files before uploading them to any service. Keep your data on your device where it belongs.
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
            description="Questions about corporate metadata tracking and privacy"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
