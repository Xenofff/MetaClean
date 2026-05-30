import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Metadata For Real Estate",
  description:
    "Why real estate agents and property sellers should remove photo metadata before listing properties online. Protect your clients and listings from privacy risks.",
  keywords: [
    "real estate photo metadata",
    "property listing privacy",
    "remove metadata real estate",
    "MLS photo privacy",
    "real estate photography privacy",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/photo-metadata-for-real-estate/`,
  },
};

const faqs = [
  {
    question: "Why should real estate agents remove photo metadata?",
    answer:
      "Real estate photos often contain GPS coordinates that reveal the exact address of a property. When these photos are shared online, the metadata can be extracted to identify the property location, the agent's equipment, and even the time the photos were taken, which can reveal when a property is vacant.",
  },
  {
    question: "Does MLS strip metadata from property photos?",
    answer:
      "Most MLS systems strip some metadata during upload, but the process is not guaranteed to be complete. Additionally, photos shared on social media, email, or third-party sites may retain full metadata. Agents should strip metadata before uploading to ensure consistent privacy.",
  },
  {
    question: "Can someone find a property address from a listing photo?",
    answer:
      "Yes. If the photo contains GPS metadata, it reveals the exact property address. Even without metadata, visual clues like street signs, house numbers, and landmarks can help identify a property. Always remove metadata and be mindful of identifiable features in photos.",
  },
  {
    question: "How does metadata affect property marketing?",
    answer:
      "Metadata does not affect marketing directly, but stripping it protects your clients' privacy and your professional reputation. It prevents competitors from easily identifying listing locations and times, and protects sellers from unwanted attention.",
  },
  {
    question: "How do I remove metadata from real estate photos?",
    answer:
      "Use MetaClean's free online tool to strip all metadata from your property photos before uploading to MLS, social media, or marketing materials. The process happens entirely in your browser, ensuring your files never leave your device.",
  },
];

const tableOfContents = [
  { id: "why-metadata-matters", label: "Why Metadata Matters in Real Estate" },
  { id: "gps-in-listings", label: "GPS Data in Property Listings" },
  { id: "competitor-risks", label: "Competitor Intelligence Risks" },
  { id: "client-privacy", label: "Client Privacy Concerns" },
  { id: "marketing-channels", label: "Marketing Channel Risks" },
  { id: "how-to-clean", label: "How to Clean Listing Photos" },
  { id: "best-practices", label: "Best Practices for Agents" },
  { id: "faq", label: "FAQ" },
];

export default function PhotoMetadataForRealEstatePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Photo Metadata For Real Estate", url: "/blog/photo-metadata-for-real-estate/" },
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
          <span className="text-foreground">Photo Metadata For Real Estate</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Industry Guide</span>
            <span className="text-sm text-muted-foreground">8 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Photo Metadata For Real Estate: Protecting Your Listings</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Real estate photos reveal more than just property details. Here is why agents should strip metadata before listing properties online.
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
            <section id="why-metadata-matters">
              <h2>Why Metadata Matters in Real Estate</h2>
              <p>
                Real estate photography is a critical component of property marketing. High-quality
                photos attract buyers, showcase properties, and drive sales. However, every photo
                taken of a property contains EXIF metadata that can reveal sensitive information
                about the listing, the agent, and the seller.
              </p>
              <p>
                When a photographer takes photos of a property, the camera or smartphone embeds GPS
                coordinates, timestamps, camera settings, and device information into each image.
                This data follows the photo wherever it is shared — on MLS listings, social media,
                email campaigns, and third-party real estate platforms.
              </p>
              <p>
                Understanding how metadata affects real estate listings is essential for agents who
                want to protect their clients, maintain their competitive edge, and operate with
                professionalism.
              </p>
            </section>

            <section id="gps-in-listings">
              <h2>GPS Data in Property Listings: The Hidden Risk</h2>
              <p>
                The most significant metadata risk in real estate photos is GPS coordinates. When a
                photo is taken at a property, the GPS data reveals the exact address — down to the
                specific building and floor. This creates several problems:
              </p>
              <ul>
                <li><strong>Vacancy exposure:</strong> If a property is vacant and the listing photos reveal this through metadata timestamps, criminals may target the property.</li>
                <li><strong>Seller privacy:</strong> For-sale-by-owner sellers or sellers in sensitive situations (divorce, foreclosure) may not want their address publicly linked to a listing through metadata.</li>
                <li><strong>Agent identification:</strong> GPS data combined with timestamps can reveal which agent is listing which properties, giving competitors insight into your business.</li>
                <li><strong>Property valuation:</strong> Competitors can use metadata to identify upcoming listings before they are officially published, potentially affecting property valuations.</li>
              </ul>
              <p>
                Even when photos are uploaded to MLS systems that strip some metadata, the photos
                may be shared through other channels — email, social media, print materials — where
                the original metadata persists.
              </p>
            </section>

            <section id="competitor-risks">
              <h2>Competitor Intelligence Risks</h2>
              <p>
                In competitive real estate markets, metadata can be exploited for competitive
                intelligence. Competitors can extract GPS data and timestamps from your listing
                photos to:
              </p>
              <ul>
                <li><strong>Identify listings before publication:</strong> Metadata timestamps reveal when photos were taken, which can indicate when a property is about to be listed.</li>
                <li><strong>Map your territory:</strong> By analyzing GPS data across your listings, competitors can identify the neighborhoods and property types you specialize in.</li>
                <li><strong>Poach clients:</strong> With property addresses from metadata, competitors can contact sellers directly with competing offers.</li>
                <li><strong>Analyze your workflow:</strong> Timestamps and patterns in your listing photos reveal your photography schedule, marketing timeline, and business operations.</li>
              </ul>
              <p>
                While these practices may not be illegal, they undermine your competitive advantage
                and can harm your client relationships. Stripping metadata from listing photos
                eliminates this intelligence channel.
              </p>
            </section>

            <section id="client-privacy">
              <h2>Client Privacy Concerns</h2>
              <p>
                Real estate agents have a professional obligation to protect their clients&apos;
                privacy. Photo metadata can compromise client privacy in several ways:
              </p>
              <ul>
                <li><strong>Seller identification:</strong> Metadata timestamps combined with listing dates can help identify who is selling a property, even if the listing is anonymized.</li>
                <li><strong>Property status:</strong> Photo timestamps reveal when a property was photographed, which can indicate vacancy, renovation status, or urgency to sell.</li>
                <li><strong>Personal information:</strong> Interior photos with metadata may reveal details about the current occupants, their possessions, and their daily routines.</li>
                <li><strong>Security risks:</strong> For high-value properties, metadata can help criminals identify valuable targets and determine when they are unoccupied.</li>
              </ul>
              <p>
                Protecting client privacy is not just good practice — it is a professional
                responsibility. Agents who fail to manage metadata risk exposing their clients
                to privacy violations, security threats, and unwanted attention.
              </p>
            </section>

            <section id="marketing-channels">
              <h2>Marketing Channel Risks</h2>
              <p>
                Real estate photos are shared across multiple marketing channels, each with
                different metadata handling:
              </p>
              <ul>
                <li><strong>MLS listings:</strong> Most MLS systems strip metadata during upload, but the process may not be complete, and the original files may be retained on MLS servers.</li>
                <li><strong>Social media:</strong> Platforms like Instagram, Facebook, and Twitter strip most metadata, but photos sent via direct message or saved by others may retain metadata.</li>
                <li><strong>Email campaigns:</strong> Photos sent via email retain all metadata unless stripped before sending. Email attachments are often saved by recipients with metadata intact.</li>
                <li><strong>Print materials:</strong> Photos used in print marketing (flyers, brochures, signs) may have been processed with metadata intact.</li>
                <li><strong>Third-party sites:</strong> Listing aggregators, property portals, and syndication services may handle metadata differently than your MLS.</li>
              </ul>
              <p>
                The only way to ensure consistent privacy across all channels is to strip metadata
                from listing photos before they are shared anywhere.
              </p>
            </section>

            <section id="how-to-clean">
              <h2>How to Clean Real Estate Listing Photos</h2>
              <p>
                Remove metadata from your property photos before uploading to any platform:
              </p>
              <ol>
                <li>
                  Visit the{" "}
                  <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                    Social Media Cleaner
                  </Link>{" "}
                  page on MetaClean.
                </li>
                <li>Upload your property photos by dragging them onto the page or clicking to browse.</li>
                <li>MetaClean will display all metadata found in your images, including GPS coordinates, camera details, and timestamps.</li>
                <li>Select all metadata for removal to ensure maximum privacy.</li>
                <li>Click &quot;Clean Metadata&quot; to process your photos.</li>
                <li>Download the cleaned versions and use them for your listings.</li>
              </ol>
              <p>
                The entire process happens in your browser — your property photos are never uploaded
                to MetaClean&apos;s servers. This ensures complete privacy for you and your clients.
              </p>
            </section>

            <section id="best-practices">
              <h2>Best Practices for Real Estate Agents</h2>
              <p>
                Follow these guidelines to protect your clients and your business:
              </p>
              <ol>
                <li><strong>Strip metadata from all listing photos:</strong> Make this a standard part of your photography workflow.</li>
                <li><strong>Establish a metadata policy:</strong> Include metadata removal in your listing agreements and photography contracts.</li>
                <li><strong>Educate your team:</strong> Ensure all agents and photographers understand metadata risks and removal procedures.</li>
                <li><strong>Batch process listings:</strong> Use MetaClean to process multiple listing photos at once for efficiency.</li>
                <li><strong>Verify metadata removal:</strong> Check a sample of processed photos to confirm metadata has been removed.</li>
                <li><strong>Store original files securely:</strong> Keep original photos with metadata in secure storage, and only share cleaned versions.</li>
                <li><strong>Update your workflow:</strong> Include metadata removal as a step in your photography-to-listing pipeline.</li>
              </ol>
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
              Real estate photo metadata creates privacy risks for sellers, competitive intelligence
              opportunities for competitors, and professional liability for agents. GPS coordinates,
              timestamps, and device information embedded in listing photos can reveal sensitive
              details about properties, clients, and your business operations.
            </p>
            <p>
              The solution is simple: strip metadata from all listing photos before sharing them.
              {" "}
              <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                MetaClean&apos;s free tool
              </Link>{" "}
              makes this process fast and private, ensuring your clients&apos; information stays
              protected across all marketing channels.
            </p>
          </div>
        </div>

        <section className="mt-16 rounded-xl border border-border bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Protect Your Listing Photos</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Strip metadata from your property photos before uploading to MLS, social media, or marketing materials.
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
            description="Real estate photo metadata and privacy questions"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
