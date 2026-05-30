import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Metadata Before WhatsApp",
  description:
    "Learn how WhatsApp handles photo metadata, what data survives sharing, and how to strip EXIF data before sending images to protect your privacy.",
  keywords: [
    "WhatsApp metadata",
    "WhatsApp photo privacy",
    "remove EXIF WhatsApp",
    "WhatsApp EXIF data",
    "WhatsApp privacy tips",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/remove-metadata-before-whatsapp/`,
  },
};

const faqs = [
  {
    question: "Does WhatsApp strip metadata from photos?",
    answer:
      "WhatsApp strips most EXIF metadata when you send a photo. However, the stripping is not guaranteed to be complete across all device types and WhatsApp versions. Photos sent as documents may retain full metadata.",
  },
  {
    question: "Can someone track my location through WhatsApp photos?",
    answer:
      "If your photo contains GPS metadata and WhatsApp does not fully strip it, yes. Additionally, WhatsApp collects your IP address and device information, and photos sent as documents retain all original metadata including GPS coordinates.",
  },
  {
    question: "Does WhatsApp keep my photo metadata on their servers?",
    answer:
      "WhatsApp uses end-to-end encryption, meaning the content of your messages is not accessible to WhatsApp. However, metadata about when you sent a message and from what device is collected. EXIF data from photos is generally stripped before delivery.",
  },
  {
    question: "Should I remove metadata before sending photos on WhatsApp?",
    answer:
      "Yes. While WhatsApp strips most metadata, the process is not perfect, and photos sent as documents retain all metadata. Removing metadata before sending guarantees your privacy regardless of WhatsApp's handling.",
  },
  {
    question: "How do I remove metadata from photos before WhatsApp?",
    answer:
      "Use MetaClean's Social Media Cleaner to strip all metadata from your photos before sharing. The process happens entirely in your browser, ensuring your files are never uploaded to a server.",
  },
];

const tableOfContents = [
  { id: "how-whatsapp-handles-metadata", label: "How WhatsApp Handles Metadata" },
  { id: "document-sending-risks", label: "Document Sending Risks" },
  { id: "status-updates", label: "Status Updates and Metadata" },
  { id: "group-chat-risks", label: "Group Chat Risks" },
  { id: "whatsapp-backup", label: "WhatsApp Backup Privacy" },
  { id: "how-to-clean", label: "How to Clean Before Sending" },
  { id: "best-practices", label: "Best Practices" },
  { id: "faq", label: "FAQ" },
];

export default function RemoveMetadataBeforeWhatsAppPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Remove Metadata Before WhatsApp", url: "/blog/remove-metadata-before-whatsapp/" },
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
          <span className="text-foreground">Remove Metadata Before WhatsApp</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Guide</span>
            <span className="text-sm text-muted-foreground">8 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Remove Metadata Before WhatsApp</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            WhatsApp is the world&apos;s most popular messaging app — but what happens to your photo metadata when you share images through it?
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
            <section id="how-whatsapp-handles-metadata">
              <h2>How WhatsApp Handles Photo Metadata</h2>
              <p>
                WhatsApp is used by over two billion people worldwide, making it the most widely used
                messaging application on the planet. When you send a photo through WhatsApp, the
                platform processes the image through its servers, which includes resizing, compression,
                and metadata stripping.
              </p>
              <p>
                WhatsApp removes most EXIF metadata from photos sent as regular images. This includes
                GPS coordinates, camera settings, timestamps, device serial numbers, and other technical
                information embedded by your camera or phone. The receiving party generally sees an image
                file without the original EXIF data intact.
              </p>
              <p>
                However, WhatsApp&apos;s metadata handling varies significantly depending on how you send
                the photo — as an image, as a document, or as a status update. Each method has different
                privacy implications that every user should understand.
              </p>
            </section>

            <section id="document-sending-risks">
              <h2>The Document Sending Risk: Full Metadata Retention</h2>
              <p>
                One of the most significant and overlooked privacy risks on WhatsApp is the &quot;send as
                document&quot; feature. Many users choose this option to send photos in their original
                quality without compression. What most users do not realize is that this method sends
                the file with all original EXIF metadata completely intact.
              </p>
              <p>
                When you send a photo as a document, the file is transferred byte-for-byte as it exists
                on your device. This means GPS coordinates, camera information, timestamps, and every
                other piece of EXIF data is fully accessible to the recipient. If you took a photo at
                your home and sent it as a document, the recipient has your exact home address embedded
                in the file.
              </p>
              <p>
                This feature is commonly used for sending high-resolution photos, screenshots of important
                documents, and images that need to maintain their original quality. In each of these
                cases, the full metadata payload is transmitted along with the image. If you regularly
                send photos as documents on WhatsApp, you should strip metadata before sending.
              </p>
            </section>

            <section id="status-updates">
              <h2>WhatsApp Status Updates and Metadata</h2>
              <p>
                WhatsApp Status is a feature that lets you share photos, videos, and text that disappear
                after 24 hours. While this might seem like a low-risk sharing method because of the
                ephemeral nature, Status updates can still expose metadata in several ways:
              </p>
              <ul>
                <li><strong>Status visibility:</strong> Your Status is visible to all your contacts (or selected contacts), meaning anyone on your contact list can view and save your Status photos.</li>
                <li><strong>Screenshot capability:</strong> Recipients can screenshot your Status and save it with any metadata that WhatsApp did not strip.</li>
                <li><strong>Forwarding:</strong> Status photos can be forwarded to other contacts, spreading the image beyond your intended audience.</li>
                <li><strong>Backup storage:</strong> Status updates may be included in chat backups depending on your settings.</li>
              </ul>
              <p>
                Even though WhatsApp strips most metadata from Status photos, the ephemeral nature of
                the feature creates a false sense of security. Once someone saves or screenshots your
                Status photo, you have no control over how they handle it or where it ends up.
              </p>
            </section>

            <section id="group-chat-risks">
              <h2>Group Chat Privacy Risks</h2>
              <p>
                Group chats on WhatsApp present unique metadata risks. When you send a photo in a group
                chat, it is visible to every member of that group. If the group has many members —
                especially members you do not know personally — your photo metadata may be exposed to
                a much wider audience than intended.
              </p>
              <p>
                Consider a family group chat with 30 members, or a community group with hundreds of
                participants. When you share a photo in these groups, every member receives the image.
                If the photo contains identifiable location data or other sensitive metadata, all of
                those people have access to it.
              </p>
              <p>
                Additionally, group members can forward your photos to other chats, save them to their
                devices, or share them outside of WhatsApp entirely. Once a photo is in a group chat,
                you lose all control over its distribution and handling.
              </p>
            </section>

            <section id="whatsapp-backup">
              <h2>WhatsApp Backup Privacy</h2>
              <p>
                WhatsApp offers chat backups to Google Drive (Android) or iCloud (iPhone). These backups
                include photos and media shared in your conversations. Depending on your backup settings,
                photos with metadata may be stored in your cloud backup indefinitely.
              </p>
              <p>
                If your WhatsApp backup is not encrypted, or if someone gains access to your cloud
                storage account, all photos in your chat history — including any metadata — become
                accessible. This creates a long-term privacy risk that extends far beyond the
                moment you shared the photo.
              </p>
              <p>
                On iPhone, WhatsApp backups stored in iCloud are encrypted, but Apple holds the
                encryption keys. On Android, backups to Google Drive were not encrypted by default
                until recently. In both cases, your cloud provider has the technical capability
                to access your backup data.
              </p>
            </section>

            <section id="how-to-clean">
              <h2>How to Clean Metadata Before Sending on WhatsApp</h2>
              <p>
                The safest approach is to remove all metadata from your photos before sharing them on
                WhatsApp or any other messaging platform. Here is how to do it with MetaClean:
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
                <li>MetaClean will display all metadata found in your images, including GPS coordinates, camera details, and timestamps.</li>
                <li>Select the metadata you want to remove. For maximum privacy, choose to remove all metadata.</li>
                <li>Click &quot;Clean Metadata&quot; to process your photos.</li>
                <li>Download the cleaned versions and share them on WhatsApp.</li>
              </ol>
              <p>
                The entire process takes seconds and happens entirely in your browser. Your original photos
                are never uploaded to any server, ensuring complete privacy throughout the cleaning process.
              </p>
            </section>

            <section id="best-practices">
              <h2>WhatsApp Privacy Best Practices</h2>
              <p>
                Beyond removing metadata, follow these additional steps to maximize your privacy on WhatsApp:
              </p>
              <ul>
                <li><strong>Avoid sending as document:</strong> Never send photos as documents if they contain sensitive metadata. Use MetaClean to strip metadata first, then send as a regular image.</li>
                <li><strong>Review group memberships:</strong> Be cautious about which groups you share photos in, especially large groups with people you do not know well.</li>
                <li><strong>Disable cloud backups:</strong> If privacy is critical, disable WhatsApp chat backups or use encrypted backups.</li>
                <li><strong>Use disappearing messages:</strong> Enable disappearing messages in sensitive conversations to limit how long photos are stored.</li>
                <li><strong>Clean before every send:</strong> Make metadata removal a habit, regardless of the messaging platform.</li>
                <li><strong>Check photo content:</strong> Even without metadata, photos may contain visual clues like landmarks, street signs, or house numbers that reveal your location.</li>
              </ul>
              <p>
                For more tips on protecting your photo privacy, see our guide on{" "}
                <Link href="/remove-photo-metadata/" className="text-primary hover:underline">
                  removing photo metadata
                </Link>
                .
              </p>
            </section>

            <h2>Conclusion</h2>
            <p>
              WhatsApp strips most EXIF metadata from regular image sends, but photos sent as documents
              retain full metadata. Group chats, status updates, and chat backups create additional
              privacy risks that many users overlook. The only reliable way to protect your privacy
              is to remove metadata before sharing.
            </p>
            <p>
              Use{" "}
              <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                MetaClean&apos;s Social Media Cleaner
              </Link>{" "}
              to strip all metadata from your photos before sending them on WhatsApp. The process is
              free, fast, and happens entirely in your browser.
            </p>
          </div>
        </div>

        <section className="mt-16 rounded-xl border border-border bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Clean Your Photos Before Sending</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Strip metadata from your photos in seconds before sharing them on WhatsApp or any messaging app.
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
            description="WhatsApp metadata and privacy questions"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
