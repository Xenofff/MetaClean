import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Metadata Before Selling Products Online",
  description:
    "Learn why product photos need metadata removed before listing on eBay, Craigslist, and other marketplaces. Protect your home address and personal information.",
  keywords: [
    "product photo privacy",
    "remove metadata eBay",
    "online selling privacy",
    "marketplace photo safety",
    "Craigslist photo privacy",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/remove-metadata-before-selling-products/`,
  },
};

const faqs = [
  {
    question: "Why do product photos need metadata removed?",
    answer:
      "Product photos taken at home often contain GPS coordinates that reveal your home address. This information can be extracted by buyers or scammers and used for stalking, burglary, or fraud.",
  },
  {
    question: "Which online marketplaces strip photo metadata?",
    answer:
      "Some platforms like eBay strip most metadata during upload, but this is not guaranteed to be complete. Platforms like Craigslist, Facebook Marketplace, and others may preserve more metadata. Never assume a platform has stripped your data.",
  },
  {
    question: "Can a buyer find my address from a product photo?",
    answer:
      "Yes. If your product photo contains GPS metadata and the platform does not fully strip it, a buyer can extract your home address. This is particularly dangerous for in-person pickup transactions.",
  },
  {
    question: "Should I take product photos in a neutral location?",
    answer:
      "Taking product photos in a neutral location is one safety measure, but it does not protect you if metadata is embedded from a previous location. Always remove metadata regardless of where the photo was taken.",
  },
  {
    question: "How do I remove metadata from product photos?",
    answer:
      "Use MetaClean's Batch Metadata Remover to strip all metadata from your product photos. The tool processes everything in your browser, so your files are never uploaded to a server.",
  },
  {
    question: "Does removing metadata affect product listing quality?",
    answer:
      "No. Removing metadata only strips embedded information from the image file. The visual quality, resolution, and appearance of your product photos remain completely unchanged.",
  },
];

const tableOfContents = [
  { id: "why-product-photos-need-cleaning", label: "Why Product Photos Need Cleaning" },
  { id: "which-platforms", label: "Which Platforms to Clean For" },
  { id: "home-address-exposure", label: "Home Address Exposure" },
  { id: "scammer-tactics", label: "Scammer Tactics" },
  { id: "in-person-pickup-risks", label: "In-Person Pickup Risks" },
  { id: "batch-cleaning", label: "Batch Cleaning for Sellers" },
  { id: "best-practices", label: "Best Practices for Product Photos" },
  { id: "faq", label: "FAQ" },
];

export default function RemoveMetadataBeforeSellingProductsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Remove Metadata Before Selling Products Online", url: "/blog/remove-metadata-before-selling-products/" },
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
          <span className="text-foreground">Remove Metadata Before Selling Products Online</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">Privacy</span>
            <span className="text-sm text-muted-foreground">9 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Remove Metadata Before Selling Products Online</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Product photos taken at home can reveal your address to buyers and scammers. Here is how to protect yourself when selling online.
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
            <section id="why-product-photos-need-cleaning">
              <h2>Why Product Photos Need Metadata Cleaning</h2>
              <p>
                Selling items online has become a routine part of modern life. Whether you are decluttering
                your home on eBay, listing furniture on Facebook Marketplace, or selling electronics on
                Craigslist, the process almost always involves taking and sharing product photos.
              </p>
              <p>
                What most sellers do not realize is that the photos they take of products — often in their
                own living room, bedroom, or garage — contain metadata that can reveal exactly where those
                photos were taken. If you photograph a product at home, the GPS coordinates embedded in the
                image file point directly to your address.
              </p>
              <p>
                This creates a significant privacy risk. Strangers on the internet — potential buyers,
                scammers, and bad actors — can extract this data and learn where you live. For sellers
                who handle in-person pickups, this risk is even more acute because the buyer already
                knows the general area and can use the metadata to pinpoint your exact location.
              </p>
            </section>

            <section id="which-platforms">
              <h2>Which Platforms to Clean Photos For</h2>
              <p>
                Different online marketplaces handle photo metadata differently. Here is what you need to
                know about the most popular selling platforms:
              </p>

              <h3>eBay</h3>
              <p>
                eBay processes uploaded images and strips most EXIF metadata. However, eBay&apos;s metadata
                handling is not documented as a guaranteed feature, and the platform may retain some data
                internally. For maximum safety, remove metadata before uploading to eBay.
              </p>

              <h3>Facebook Marketplace</h3>
              <p>
                Facebook Marketplace photos go through Facebook&apos;s standard image processing pipeline,
                which strips most EXIF data. However, Messenger communications with buyers may retain
                more metadata, and Facebook collects its own data about your listings. Always clean
                photos before uploading.
              </p>

              <h3>Craigslist</h3>
              <p>
                Craigslist is one of the riskiest platforms because it applies minimal processing to
                uploaded images. Photos on Craigslist are more likely to retain their original metadata,
                including GPS coordinates. This is especially dangerous because Craigslist facilitates
                in-person transactions with strangers.
              </p>

              <h3>Offerup and Letgo</h3>
              <p>
                These platforms process images through their servers, but their metadata handling varies.
                Some users have reported that metadata survives upload on certain mobile apps. Remove
                metadata before listing on any of these platforms.
              </p>

              <h3>Nextdoor</h3>
              <p>
                Nextdoor is hyperlocal by design, connecting you with people in your immediate neighborhood.
                While this is intentional, it also means that any GPS metadata in your photos confirms
                your exact location within the neighborhood. Clean your photos before posting.
              </p>
            </section>

            <section id="home-address-exposure">
              <h2>How Product Photos Expose Your Home Address</h2>
              <p>
                The exposure mechanism is straightforward. When you take a photo with your smartphone,
                the device embeds GPS coordinates in the image file. When you upload that photo to a
                selling platform, the metadata may survive the upload process. A buyer or scammer can
                then extract the coordinates and convert them to a street address using free online tools.
              </p>
              <p>
                This risk is amplified by the nature of product listings. Unlike social media posts that
                may show a general area, product photos often show the interior of your home — your
                furniture, decor, and living space. Combined with GPS metadata, this creates a complete
                picture of where you live and what your home looks like.
              </p>
              <p>
                The consequences of this exposure include:
              </p>
              <ul>
                <li><strong>Burglary targeting:</strong> Criminals can identify when you have valuable items and when your home is accessible.</li>
                <li><strong>Stalking:</strong> Bad actors can use your address to monitor your comings and goings.</li>
                <li><strong>Scams:</strong> Scammers can use your personal information to craft targeted phishing attacks.</li>
                <li><strong>Fraud:</strong> Your address can be used to commit identity theft or other fraudulent activities.</li>
                <li><strong>In-person harassment:</strong> Disgruntled buyers or scammers may show up at your home.</li>
              </ul>
            </section>

            <section id="scammer-tactics">
              <h2>How Scammers Exploit Product Photo Metadata</h2>
              <p>
                Scammers have developed sophisticated techniques for exploiting metadata in product photos:
              </p>
              <ol>
                <li><strong>Address extraction:</strong> Downloading your listing photo and extracting GPS coordinates to find your home address.</li>
                <li><strong>Timing analysis:</strong> Using timestamps to determine when you are home and when you are likely to be away.</li>
                <li><strong>Valuation targeting:</strong> Identifying high-value items in your home through product photos and planning theft.</li>
                <li><strong>Social engineering:</strong> Using personal information from metadata to impersonate you or gain your trust.</li>
                <li><strong>Phishing:</strong> Crafting targeted phishing messages that reference your location or specific items in your home.</li>
              </ol>
              <p>
                These tactics are not theoretical. There are documented cases of criminals using product
                listing photos to plan burglaries and scams. The combination of visual information about
                your home and precise location data creates a powerful tool for exploitation.
              </p>
            </section>

            <section id="in-person-pickup-risks">
              <h2>In-Person Pickup: The Highest Risk Scenario</h2>
              <p>
                In-person pickup transactions combine the metadata risk with additional safety concerns.
                When a buyer comes to your home to pick up an item, they already know the general area.
                If your product photo contains GPS metadata, they can determine your exact address before
                the transaction even takes place.
              </p>
              <p>
                This creates several risks:
              </p>
              <ul>
                <li><strong>Casing your home:</strong> A buyer who knows your exact address can observe your home before or after the transaction.</li>
                <li><strong>Return visits:</strong> Someone who picks up an item at your home knows exactly where to return for malicious purposes.</li>
                <li><strong>Targeted theft:</strong> If you list multiple items, a buyer can identify other valuable possessions in your home.</li>
                <li><strong>Safety during transactions:</strong> Meeting strangers at your home is inherently riskier than meeting in a public place.</li>
              </ul>
              <p>
                For in-person pickups, always meet in a public location such as a police station parking lot,
                a busy coffee shop, or a designated safe exchange zone. Never share your home address, and
                always remove metadata from product photos before listing them online.
              </p>
            </section>

            <section id="batch-cleaning">
              <h2>Batch Cleaning for High-Volume Sellers</h2>
              <p>
                If you sell multiple items online, cleaning photos one by one is impractical. MetaClean&apos;s
                batch processing feature allows you to clean metadata from multiple product photos at once:
              </p>
              <ol>
                <li>
                  Visit the{" "}
                  <Link href="/batch-metadata-remover/" className="text-primary hover:underline">
                    Batch Metadata Remover
                  </Link>{" "}
                  page on MetaClean.
                </li>
                <li>Upload all your product photos at once by dragging them onto the page or clicking to browse.</li>
                <li>MetaClean will analyze all uploaded files and display the metadata found in each one.</li>
                <li>Select the metadata types to remove from all files.</li>
                <li>Click &quot;Clean All&quot; to process every photo simultaneously.</li>
                <li>Download all cleaned photos in a single batch.</li>
              </ol>
              <p>
                Batch processing saves time and ensures consistency. Every photo gets the same treatment,
                and the entire process happens in your browser without uploading files to any server.
              </p>
            </section>

            <section id="best-practices">
              <h2>Best Practices for Product Photo Privacy</h2>
              <p>
                Follow these guidelines to protect your privacy when selling products online:
              </p>
              <ol>
                <li><strong>Remove metadata from every photo:</strong> Make metadata cleaning a standard step before listing any product.</li>
                <li><strong>Photograph in a neutral location:</strong> If possible, take product photos in a location that does not reveal your home. A garage, driveway, or public space is safer than your living room.</li>
                <li><strong>Remove background details:</strong> Be mindful of what is visible in the background of your photos — family photos, mail, documents, and personal items can reveal information about you.</li>
                <li><strong>Use a clean background:</strong> Photograph products against a plain background to avoid accidentally revealing your home environment.</li>
                <li><strong>Meet in public places:</strong> For in-person pickups, always meet in a safe, public location rather than your home.</li>
                <li><strong>Use a P.O. box for shipping:</strong> If you ship items, use a P.O. box or package forwarding service rather than your home address.</li>
                <li><strong>Review your listings:</strong> Regularly check your active listings for any photos that may contain sensitive information.</li>
                <li><strong>Clean before cross-posting:</strong> If you list the same item on multiple platforms, clean the metadata once and use the cleaned version everywhere.</li>
              </ol>
              <p>
                For more information about cleaning photos for social media and marketplaces, see our
                guides on{" "}
                <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                  social media photo cleaning
                </Link>{" "}
                and{" "}
                <Link href="/remove-photo-metadata/" className="text-primary hover:underline">
                  removing photo metadata
                </Link>
                .
              </p>
            </section>

            <h2>Conclusion</h2>
            <p>
              Selling products online is convenient and profitable, but it comes with privacy risks that
              most sellers never consider. Product photos taken at home can reveal your exact address through
              GPS metadata, and this information can be exploited by scammers, burglars, and stalkers.
            </p>
            <p>
              Protect yourself by removing metadata from every product photo before listing it on any
              marketplace.{" "}
              <Link href="/batch-metadata-remover/" className="text-primary hover:underline">
                MetaClean&apos;s Batch Metadata Remover
              </Link>{" "}
              makes this process fast and free — upload all your product photos at once, clean them in
              seconds, and download clean versions ready for safe listing.
            </p>
          </div>
        </div>

        <section className="mt-16 rounded-xl border border-border bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Protect Your Address When Selling Online</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Batch-remove metadata from all your product photos in seconds. No uploads, no server processing — everything happens in your browser.
          </p>
          <Link
            href="/batch-metadata-remover/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Try the Batch Metadata Remover — Free
          </Link>
        </section>

        <div id="faq">
          <FAQSection
            title="Frequently Asked Questions"
            description="Product photo privacy and online selling safety"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
