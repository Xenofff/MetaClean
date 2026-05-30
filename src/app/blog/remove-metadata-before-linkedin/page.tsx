import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Metadata Before Uploading To LinkedIn",
  description:
    "Professional photos on LinkedIn carry hidden metadata. Learn how LinkedIn handles photo EXIF data and how to protect your privacy when sharing professional images.",
  keywords: [
    "LinkedIn metadata privacy",
    "LinkedIn photo EXIF",
    "remove EXIF LinkedIn",
    "LinkedIn professional photo privacy",
    "LinkedIn data protection",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/remove-metadata-before-linkedin/`,
  },
};

const faqs = [
  {
    question: "Does LinkedIn strip metadata from uploaded photos?",
    answer:
      "LinkedIn strips most EXIF metadata from images uploaded to the platform. However, LinkedIn's handling of metadata is not fully transparent, and the platform may retain original files or metadata on its servers. For profile photos and banner images, the stripping behavior may differ from post attachments.",
  },
  {
    question: "Why is LinkedIn photo privacy important?",
    answer:
      "LinkedIn is a professional platform where your real identity is linked to every post. If metadata in your photos reveals your location, device, or other personal information, it is directly connected to your professional identity. This creates a privacy risk that is different from anonymous platforms.",
  },
  {
    question: "Can employers see metadata from my LinkedIn photos?",
    answer:
      "Your employer cannot see metadata from your uploaded photos directly, but LinkedIn collects data about your activity including what you post and when. Additionally, metadata in photos can reveal your physical location, which some employers may use to verify remote work claims or monitor employee activity.",
  },
  {
    question: "Should I remove metadata from my LinkedIn profile photo?",
    answer:
      "Yes. Your profile photo is one of the most viewed images on your LinkedIn presence. Removing metadata ensures that the photo cannot be used to extract device information, location data, or other personal details that could contribute to your digital fingerprint.",
  },
  {
    question: "How do I protect my privacy on LinkedIn?",
    answer:
      "Remove metadata from all photos before uploading them to LinkedIn, including profile photos, banner images, and post attachments. Use a client-side tool like MetaClean to ensure your photos never leave your device during the cleaning process.",
  },
];

const tocItems = [
  { id: "linkedin-privacy-context", title: "LinkedIn Privacy Context" },
  { id: "linkedin-metadata-handling", title: "How LinkedIn Handles Metadata" },
  { id: "professional-identity-risk", title: "Professional Identity Risks" },
  { id: "profile-photo-privacy", title: "Profile Photo Privacy" },
  { id: "how-to-clean", title: "How to Clean LinkedIn Photos" },
  { id: "professional-tips", title: "Professional Privacy Tips" },
];

export default function RemoveMetadataBeforeLinkedInPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Remove Metadata Before Uploading To LinkedIn", url: "/blog/remove-metadata-before-linkedin/" },
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
          <span className="text-foreground">Remove Metadata Before Uploading To LinkedIn</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Guide</span>
                <span className="text-sm text-muted-foreground">8 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Remove Metadata Before Uploading To LinkedIn</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                LinkedIn photos are tied to your real professional identity. Here is why metadata in those photos matters more than you think.
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <h2 id="linkedin-privacy-context">LinkedIn Is Different from Other Platforms</h2>

              <p>
                LinkedIn occupies a unique position in the social media landscape. Unlike Reddit,
                Twitter, or TikTok, where users can maintain anonymity, LinkedIn requires your
                real name, professional history, and verified identity. Every photo you post on
                LinkedIn is permanently linked to your professional identity.
              </p>

              <p>
                This creates a distinct privacy challenge. When metadata in your LinkedIn photos
                reveals your location, device, or other personal information, it is not being
                associated with an anonymous username — it is being linked directly to your
                real-world identity. The stakes for privacy on LinkedIn are inherently higher
                because of this identity coupling.
              </p>

              <p>
                Additionally, LinkedIn is used by recruiters, employers, clients, colleagues,
                and business contacts. The people viewing your photos are not strangers on the
                internet — they are people who know or want to know you professionally. This
                audience makes metadata exposure more consequential because it affects your
                professional reputation and personal security.
              </p>

              <h2 id="linkedin-metadata-handling">How LinkedIn Handles Photo Metadata</h2>

              <p>
                LinkedIn processes images uploaded to the platform, including profile photos,
                banner images, and post attachments. The platform strips most EXIF metadata
                from these images as part of its processing pipeline, which includes resizing,
                compression, and format optimization.
              </p>

              <p>
                However, LinkedIn&apos;s metadata handling is less transparent than other platforms.
                The company does not publish detailed documentation about exactly what metadata
                is stripped and what remains. This lack of transparency means you cannot be
                certain that all sensitive data has been removed from your uploaded images.
              </p>

              <p>
                What is known is that LinkedIn collects its own metadata about your activity:
              </p>

              <ul>
                <li><strong>Upload timestamps:</strong> LinkedIn records when you uploaded each photo, creating a timeline of your activity.</li>
                <li><strong>Device information:</strong> LinkedIn collects the device and browser used for each upload.</li>
                <li><strong>IP address:</strong> Your network location is recorded with each upload.</li>
                <li><strong>Profile data:</strong> Your uploaded photos are linked to your complete professional profile.</li>
                <li><strong>Original files:</strong> LinkedIn may retain the original, unprocessed images on its servers.</li>
              </ul>

              <h2 id="professional-identity-risk">Professional Identity Risks</h2>

              <p>
                Metadata in LinkedIn photos creates risks that are specific to the professional
                context:
              </p>

              <h3>Location Verification</h3>

              <p>
                GPS metadata in photos can reveal your physical location, which some employers
                or clients may use to verify claims about your work arrangements. If you claim
                to work remotely from one city but your LinkedIn photos contain GPS data from
                another location, this discrepancy could raise questions.
              </p>

              <h3>Device Profiling</h3>

              <p>
                The device information in your LinkedIn photos reveals your economic status and
                technology preferences. A photo uploaded from a flagship smartphone sends a
                different signal than one uploaded from a budget device. While this may seem
                trivial, it contributes to the profile that advertisers and data brokers build
                about you.
              </p>

              <h3>Competitive Intelligence</h3>

              <p>
                In competitive industries, photos from offices, events, or facilities can reveal
                information about your company&apos;s operations, technology, and projects. Metadata
                in these photos adds location and timing data that makes the intelligence more
                valuable.
              </p>

              <h3>Corporate Espionage</h3>

              <p>
                Photos taken at work events or in office settings may inadvertently reveal
                sensitive information about your employer. When these photos contain metadata
                with location data and timestamps, they provide additional context for corporate
                espionage efforts.
              </p>

              <h2 id="profile-photo-privacy">Profile Photo Privacy</h2>

              <p>
                Your profile photo is the most important image on your LinkedIn presence. It
                appears on your profile, in search results, in connection requests, and in
                messages. Because it is so widely distributed, any metadata in your profile
                photo is exposed across the entire LinkedIn platform.
              </p>

              <p>
                Profile photos uploaded to LinkedIn are processed and resized for display. While
                this processing strips most metadata, the original file may be retained. Additionally,
                if you update your profile photo frequently, each version creates another data point
                that can be analyzed.
              </p>

              <p>
                The safest practice is to remove all metadata from your profile photo before
                uploading it to LinkedIn. Use the{" "}
                <Link href="/exif-viewer/" className="text-primary hover:underline">
                  EXIF Viewer
                </Link>{" "}
                to check what metadata your current profile photo contains.
              </p>

              <h2 id="how-to-clean">How to Clean LinkedIn Photos</h2>

              <p>
                Removing metadata from LinkedIn photos is straightforward with the right tool:
              </p>

              <ol>
                <li>
                  Open the{" "}
                  <Link href="/remove-photo-metadata/" className="text-primary hover:underline">
                    Photo Metadata Remover
                  </Link>{" "}
                  on MetaClean.
                </li>
                <li>Upload the photo you want to use on LinkedIn — profile photo, banner, or post image.</li>
                <li>Review the metadata detected in the image.</li>
                <li>Remove all metadata to ensure complete privacy.</li>
                <li>Download the cleaned photo and upload it to LinkedIn.</li>
              </ol>

              <p>
                For multiple images, such as when cleaning an entire gallery of professional
                photos, use the{" "}
                <Link href="/batch-metadata-remover/" className="text-primary hover:underline">
                  Batch Metadata Remover
                </Link>{" "}
                to process them all at once. The entire cleaning process happens in your
                browser — your photos never leave your device.
              </p>

              <h2 id="professional-tips">Professional Privacy Tips for LinkedIn</h2>

              <p>
                Beyond metadata removal, follow these practices to protect your privacy
                on LinkedIn:
              </p>

              <ul>
                <li><strong>Clean profile photos:</strong> Always remove metadata from profile photos before uploading, as they are the most widely distributed images on your profile.</li>
                <li><strong>Be mindful of background details:</strong> Professional photos often contain visible information about your workplace, including screens, documents, and office layouts.</li>
                <li><strong>Review post images:</strong> Photos shared in LinkedIn posts may contain metadata that reveals your location at the time of posting.</li>
                <li><strong>Check banner images:</strong> LinkedIn banner images are displayed prominently on your profile and should be cleaned of metadata before uploading.</li>
                <li><strong>Audit your photo history:</strong> Review old posts and profile photos that may contain sensitive metadata and consider replacing them with cleaned versions.</li>
                <li><strong>Use a professional workflow:</strong> Make metadata removal part of your standard process for preparing professional photos, just as you would resize or crop them.</li>
              </ul>

              <h2>Conclusion</h2>

              <p>
                LinkedIn photos carry more risk than photos on anonymous platforms because
                they are permanently linked to your real professional identity. While LinkedIn
                strips most metadata from uploaded images, the platform retains original files
                and collects its own activity data. Remove metadata from all LinkedIn photos
                — profile photos, banners, and post images — before uploading to protect your
                professional privacy.
              </p>

              <p>
                Start by checking your current profile photo with the{" "}
                <Link href="/exif-viewer/" className="text-primary hover:underline">
                  EXIF Viewer
                </Link>{" "}
                to see what metadata it contains. Then use the{" "}
                <Link href="/remove-photo-metadata/" className="text-primary hover:underline">
                  Photo Metadata Remover
                </Link>{" "}
                to clean it before your next upload.
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
          <h2 className="text-2xl font-bold text-foreground mb-3">Protect Your Professional Privacy</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Strip metadata from your LinkedIn photos in seconds. Keep your professional identity private and secure.
          </p>
          <Link
            href="/remove-photo-metadata/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Try the Photo Metadata Remover — Free
          </Link>
        </section>

        <div id="faq">
          <FAQSection
            title="Frequently Asked Questions"
            description="Questions about LinkedIn photo metadata and professional privacy"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
