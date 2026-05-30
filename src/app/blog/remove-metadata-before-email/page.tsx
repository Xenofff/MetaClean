import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Metadata Before Sending Photos By Email",
  description:
    "Email attachments often retain full EXIF metadata including GPS coordinates. Learn how to strip metadata from photos before emailing to protect your privacy.",
  keywords: [
    "email photo metadata",
    "remove EXIF email",
    "email attachment privacy",
    "strip metadata email photos",
    "email photo safety",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/remove-metadata-before-email/`,
  },
};

const faqs = [
  {
    question: "Do email attachments keep metadata?",
    answer:
      "Yes, most email providers do not strip EXIF metadata from image attachments. When you attach a photo to an email, the full file — including GPS coordinates, device information, timestamps, and camera settings — is sent to the recipient. The recipient can extract all this metadata by downloading the attachment.",
  },
  {
    question: "Can someone find my location from an email photo?",
    answer:
      "Yes. If the photo you attach to an email contains GPS coordinates, the recipient can extract those coordinates and determine your exact location when the photo was taken. This is especially risky when emailing photos to people you do not know well or to business contacts.",
  },
  {
    question: "Which email providers strip metadata from attachments?",
    answer:
      "Most email providers, including Gmail, Outlook, and Yahoo Mail, do not strip EXIF metadata from attachments. The metadata is preserved exactly as it exists in the original file. Some email clients may display limited metadata, but the full data is transmitted regardless of what is displayed.",
  },
  {
    question: "How do I remove metadata before emailing photos?",
    answer:
      "Use a client-side metadata removal tool like MetaClean to strip all metadata from your photos before attaching them to emails. Upload the photo to the tool, remove all metadata, and download the cleaned version before attaching it to your email.",
  },
  {
    question: "Does forwarding an email strip metadata from photos?",
    answer:
      "No. Forwarding an email preserves all attachments exactly as they were received, including the original metadata. If someone forwards an email containing your photos, those photos still carry the full metadata to every subsequent recipient.",
  },
];

const tocItems = [
  { id: "email-metadata-reality", title: "The Email Metadata Reality" },
  { id: "what-is-exposed", title: "What Data Is Exposed" },
  { id: "business-risks", title: "Business and Professional Risks" },
  { id: "personal-risks", title: "Personal Privacy Risks" },
  { id: "how-to-clean", title: "How to Clean Before Sending" },
  { id: "email-safety-tips", title: "Email Safety Tips" },
];

export default function RemoveMetadataBeforeEmailPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Remove Metadata Before Sending Photos By Email", url: "/blog/remove-metadata-before-email/" },
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
          <span className="text-foreground">Remove Metadata Before Sending Photos By Email</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Guide</span>
                <span className="text-sm text-muted-foreground">9 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Remove Metadata Before Sending Photos By Email</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Email attachments are one of the least scrutinized ways to share photos — and one of the most metadata-rich. Here is what your email photos reveal.
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <h2 id="email-metadata-reality">The Email Metadata Reality</h2>

              <p>
                Email is the oldest and most widely used form of digital communication, yet it
                remains one of the least understood when it comes to privacy. Most people are
                careful about what they write in emails, but when it comes to photo attachments,
                they treat email like a private conversation where the content is protected. The
                reality is that email attachments carry all the metadata embedded in the original
                file, and virtually no email provider strips this data.
              </p>

              <p>
                When you attach a photo to an email and hit send, the entire file — including
                GPS coordinates, camera model, timestamp, device serial number, and every other
                piece of EXIF metadata — is transmitted to the recipient. The recipient does not
                need any special tools to access this information; they can simply download the
                attachment and open it in any image viewer that supports EXIF data.
              </p>

              <p>
                This is particularly concerning because email is often used to share photos with
                people you know personally — family members, friends, colleagues, and service
                providers. These are people who may already know your address, but the GPS
                coordinates in your photos reveal more than just your home. They reveal everywhere
                you have been.
              </p>

              <h2 id="what-is-exposed">What Data Is Exposed in Email Attachments</h2>

              <p>
                Every photo you attach to an email potentially contains the following metadata:
              </p>

              <ul>
                <li><strong>GPS coordinates:</strong> The exact latitude and longitude where the photo was taken, precise enough to identify a specific building.</li>
                <li><strong>Timestamp:</strong> The exact date and time the photo was taken, which reveals your schedule and activity patterns.</li>
                <li><strong>Device model:</strong> The specific phone or camera used to take the photo, which contributes to your digital fingerprint.</li>
                <li><strong>Camera settings:</strong> Technical details about aperture, shutter speed, ISO, and focal length.</li>
                <li><strong>Software information:</strong> The app or firmware used to process the image.</li>
                <li><strong>Serial number:</strong> Some devices embed a unique serial number that can be traced back to the specific device.</li>
              </ul>

              <p>
                You can check exactly what metadata your email-bound photos contain by uploading
                them to the{" "}
                <Link href="/exif-viewer/" className="text-primary hover:underline">
                  EXIF Viewer
                </Link>{" "}
                before attaching them to an email.
              </p>

              <h2 id="business-risks">Business and Professional Risks</h2>

              <p>
                Email is the primary communication tool in most businesses, and photos are
                frequently shared via email for work purposes. This creates several privacy
                and security risks:
              </p>

              <h3>Client and Customer Photos</h3>

              <p>
                Real estate agents, insurance adjusters, contractors, and many other professionals
                share photos with clients via email. These photos often contain GPS data that
                reveals the exact location of client properties, which could be valuable information
                for criminals or competitors.
              </p>

              <h3>Internal Communications</h3>

              <p>
                Photos shared between colleagues via email may reveal office locations, equipment,
                security systems, and other sensitive details. When these photos contain metadata,
                the information is available to anyone who can access the email — including
                compromised accounts or unauthorized access.
              </p>

              <h3>Email Forwarding</h3>

              <p>
                One of the biggest risks of email metadata is forwarding. When you email a photo
                to a colleague and they forward it to someone else, the original metadata travels
                with the attachment. You have no control over who eventually receives your photo
                and its metadata once it enters the email chain.
              </p>

              <h3>Legal and Compliance</h3>

              <p>
                In industries with strict privacy regulations — healthcare, finance, legal —
                email attachments containing metadata may constitute a privacy violation. Photos
                of client sites, medical records, or financial documents that contain metadata
                could expose regulated information.
              </p>

              <h2 id="personal-risks">Personal Privacy Risks</h2>

              <p>
                In personal contexts, email metadata exposure creates risks that many people
                overlook:
              </p>

              <ul>
                <li><strong>Location tracking:</strong> Photos shared with distant relatives or online acquaintances reveal your exact location when taken.</li>
                <li><strong>Schedule exposure:</strong> Timestamps reveal when you are home, when you travel, and your daily routines.</li>
                <li><strong>Home address:</strong> GPS coordinates from photos taken at home provide your exact address to anyone who receives the email.</li>
                <li><strong>Children&apos;s safety:</strong> Photos of children shared via email may reveal their school, playground, or other locations they frequent.</li>
                <li><strong>Vacation exposure:</strong> Photos shared while traveling reveal that your home is unoccupied.</li>
              </ul>

              <h2 id="how-to-clean">How to Clean Photos Before Emailing</h2>

              <p>
                Removing metadata from photos before emailing is quick and essential for privacy:
              </p>

              <ol>
                <li>
                  Open the{" "}
                  <Link href="/remove-photo-metadata/" className="text-primary hover:underline">
                    Photo Metadata Remover
                  </Link>{" "}
                  on MetaClean.
                </li>
                <li>Upload the photo you want to email.</li>
                <li>Review the metadata detected — check for GPS coordinates, timestamps, and device information.</li>
                <li>Remove all metadata to ensure complete privacy.</li>
                <li>Download the cleaned photo and attach it to your email.</li>
              </ol>

              <p>
                The entire process happens in your browser. Your photo never leaves your device,
                which is especially important for sensitive or personal images. For multiple
                photos, use the{" "}
                <Link href="/batch-metadata-remover/" className="text-primary hover:underline">
                  Batch Metadata Remover
                </Link>{" "}
                to clean an entire set of images at once.
              </p>

              <h2 id="email-safety-tips">Email Safety Tips for Photos</h2>

              <ul>
                <li><strong>Clean before every email:</strong> Make metadata removal a habit before attaching any photo to an email.</li>
                <li><strong>Consider the recipient:</strong> Think about who might forward the email and who could eventually see your photos and their metadata.</li>
                <li><strong>Use cloud sharing instead:</strong> For large numbers of photos, consider using a cloud sharing service that strips metadata rather than email attachments.</li>
                <li><strong>Compress before sending:</strong> Photo compression sometimes reduces metadata, but it does not guarantee complete removal. Always use a dedicated metadata removal tool.</li>
                <li><strong>Check shared albums:</strong> Photos shared through cloud services via email links may retain metadata depending on the service settings.</li>
              </ul>

              <h2>Conclusion</h2>

              <p>
                Email is one of the most common ways people share photos, yet it is also one
                of the least privacy-friendly. Email providers do not strip metadata from
                attachments, and once a photo is emailed, you lose all control over who receives
                it and its metadata. Clean every photo before attaching it to an email to
                protect your privacy and the privacy of the people in your photos.
              </p>

              <p>
                Start by running one of your email-bound photos through the{" "}
                <Link href="/privacy-score-tool/" className="text-primary hover:underline">
                  Privacy Score Tool
                </Link>{" "}
                to see what information it reveals. Then use the{" "}
                <Link href="/remove-photo-metadata/" className="text-primary hover:underline">
                  Photo Metadata Remover
                </Link>{" "}
                to strip all metadata before your next email.
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
          <h2 className="text-2xl font-bold text-foreground mb-3">Clean Photos Before You Email</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Strip metadata from photos in seconds before attaching them to emails. No uploads, no server processing.
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
            description="Questions about email photo metadata and attachment privacy"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
