import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Privacy Checklist: What to Check Before You Post",
  description:
    "A complete pre-posting privacy checklist for sharing photos on social media. Learn what metadata, background details, and settings to review before hitting publish.",
  keywords: [
    "social media privacy checklist",
    "before you post checklist",
    "photo sharing privacy",
    "social media photo safety",
    "privacy checklist photos",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/social-media-privacy-checklist/`,
  },
};

const faqs = [
  {
    question: "Why do I need a privacy checklist for social media photos?",
    answer:
      "A checklist ensures you do not forget critical privacy steps in the excitement of sharing. Most people focus on the photo itself and overlook metadata, background details, and platform settings that can expose personal information. A systematic approach catches these risks before your photo goes public.",
  },
  {
    question: "Do all social media platforms strip metadata from photos?",
    answer:
      "Most major platforms strip some metadata, but the extent varies. Instagram and Facebook remove GPS coordinates and most EXIF data, but some platforms preserve device information or timestamps. Additionally, even when metadata is stripped from the visible image, the platform may retain the original data on their servers. Always clean metadata before uploading for maximum protection.",
  },
  {
    question: "What background details should I look for in photos?",
    answer:
      "Check for visible house numbers, street signs, license plates, personal documents, computer screens with sensitive information, children's school uniforms or logos, medical information, and any identifiable landmarks near your home. Even seemingly innocent details can be combined to identify your location or daily routines.",
  },
  {
    question: "How does MetaClean's privacy score work?",
    answer:
      "MetaClean's Privacy Score analyzes your photo for common privacy risks including embedded metadata, GPS coordinates, identifiable faces, background text, and other potentially sensitive information. It gives you a numerical score and specific recommendations for what to clean or adjust before sharing.",
  },
  {
    question: "Should I use the same checklist for every platform?",
    answer:
      "The core checklist remains the same, but each platform has unique settings and risks. For example, Instagram Stories are temporary while feed posts are permanent. Facebook has face recognition settings. Twitter is public by default. Adjust your checklist based on the platform's privacy controls and your audience.",
  },
  {
    question: "Can I share photos safely without removing all metadata?",
    answer:
      "It depends on the context. Photos shared privately in encrypted messaging apps with trusted contacts carry lower risk. Public posts on any platform should always have metadata removed. The safest habit is to clean every photo before sharing, regardless of the platform or audience.",
  },
];

const tocItems = [
  { id: "why-checklist", title: "Why You Need a Checklist" },
  { id: "metadata-check", title: "Metadata Check" },
  { id: "background-review", title: "Background Details Review" },
  { id: "platform-settings", title: "Platform-Specific Settings" },
  { id: "audience-review", title: "Audience and Visibility" },
  { id: "post-publishing", title: "Post-Publishing Steps" },
];

export default function SocialMediaPrivacyChecklistPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Social Media Privacy Checklist", url: "/blog/social-media-privacy-checklist/" },
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
          <span className="text-foreground">Social Media Privacy Checklist</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Guide</span>
                <span className="text-sm text-muted-foreground">10 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Social Media Privacy Checklist: What to Check Before You Post</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Every photo you post online carries more information than you think. This checklist covers everything you should verify before hitting the share button.
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <h2 id="why-checklist">Why You Need a Pre-Posting Privacy Checklist</h2>

              <p>
                Sharing a photo on social media takes two seconds. Protecting your privacy when doing so takes a little longer — but it is worth every second. Without a systematic approach, it is easy to overlook hidden metadata, background details, and platform settings that can expose your personal information to strangers.
              </p>

              <p>
                A privacy checklist turns photo sharing from a careless habit into a deliberate practice. By running through the same checks every time, you build muscle memory that eventually makes the process automatic. The few seconds you spend reviewing a photo before posting can prevent location tracking, identity exposure, and other privacy violations that are impossible to undo once the photo is public.
              </p>

              <p>
                This checklist is designed to work across all major social media platforms. While each platform has its own settings and quirks, the fundamental privacy principles remain the same. Adapt the details to match the platform you are using, but follow the same core process every time.
              </p>

              <h2 id="metadata-check">Step 1: Remove Metadata Before Sharing</h2>

              <p>
                Metadata is the invisible data embedded in your photo files. It includes GPS coordinates, camera model, timestamps, and sometimes even serial numbers. Most people have no idea this data exists, which is exactly why it is such a significant privacy risk.
              </p>

              <h3>What to Check</h3>
              <ul>
                <li><strong>GPS coordinates:</strong> Does the photo contain your exact location? This is the most dangerous metadata for privacy.</li>
                <li><strong>Timestamps:</strong> Does the photo reveal when it was taken? Timestamps can expose your daily schedule.</li>
                <li><strong>Device information:</strong> Does the photo identify your phone or camera model? This can be used to track you across platforms.</li>
                <li><strong>Camera serial number:</strong> Some devices embed serial numbers that uniquely identify the device.</li>
              </ul>

              <h3>How to Clean It</h3>
              <p>
                Use the{" "}
                <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                  Social Media Cleaner
                </Link>{" "}
                to strip all metadata from your photos before uploading. The tool processes everything in your browser, so your photos never leave your device. For individual photos, the{" "}
                <Link href="/remove-photo-metadata/" className="text-primary hover:underline">
                  Photo Metadata Remover
                </Link>{" "}
                works just as well.
              </p>

              <p>
                For a quick privacy assessment of any photo, try the{" "}
                <Link href="/privacy-score-tool/" className="text-primary hover:underline">
                  Privacy Score Tool
                </Link>{" "}
                to get an instant rating of how safe your photo is to share.
              </p>

              <h2 id="background-review">Step 2: Review Background Details</h2>

              <p>
                Even after metadata is removed, the visual content of your photo can reveal sensitive information. Before posting, zoom in and carefully examine every part of the image — not just the main subject.
              </p>

              <h3>Common Background Risks</h3>

              <ul>
                <li><strong>House numbers and street signs:</strong> These can pinpoint your exact address when combined with other information.</li>
                <li><strong>License plates:</strong> Your vehicle&apos;s plate number can be traced back to you through public records.</li>
                <li><strong>Computer and phone screens:</strong> Screenshots or photos of screens may reveal emails, messages, or personal data visible on the display.</li>
                <li><strong>Personal documents:</strong> Mail, IDs, prescriptions, or other documents visible in the background contain sensitive information.</li>
                <li><strong>Children&apos;s clothing and school logos:</strong> Uniforms or school branding can identify where your children attend school.</li>
                <li><strong>Medical information:</strong> Hospital wristatches, prescription bottles, or medical equipment in the background.</li>
                <li><strong>Workplace details:</strong> Visible badges, desk contents, or office layouts that could identify your employer or position.</li>
              </ul>

              <h3>The Cropping Solution</h3>

              <p>
                If your photo contains sensitive background details, cropping is often the simplest fix. Most social media apps let you crop before posting. Alternatively, you can take photos with a wider aperture to blur the background, or reposition yourself to exclude problematic elements from the frame.
              </p>

              <h2 id="platform-settings">Step 3: Platform-Specific Privacy Settings</h2>

              <p>
                Each social media platform handles photo privacy differently. Understanding these differences helps you make informed decisions about what to share and where.
              </p>

              <h3>Instagram</h3>
              <ul>
                <li>Strip metadata before uploading — Instagram removes most EXIF data, but the original may be retained on their servers.</li>
                <li>Disable location tagging in your camera app to prevent GPS data from being recorded.</li>
                <li>Review your Story and Reel settings — default audiences may be broader than you expect.</li>
                <li>Consider whether your account should be public or private based on your sharing goals.</li>
              </ul>

              <h3>Facebook</h3>
              <ul>
                <li>Remove metadata before uploading, especially for photos shared to public groups or pages.</li>
                <li>Audience settings default to your last-used audience — double-check before posting.</li>
                <li>Disable face recognition in your privacy settings to prevent biometric profiling.</li>
                <li>Review tagged photos regularly — others may tag you in photos with metadata you cannot control.</li>
              </ul>

              <h3>Twitter / X</h3>
              <ul>
                <li>Posts are public by default — assume anyone can see your photos.</li>
                <li>Strip metadata before posting, as Twitter does not guarantee complete metadata removal.</li>
                <li>Be aware that photos in replies and DMs may be handled differently than timeline posts.</li>
              </ul>

              <h3>TikTok</h3>
              <ul>
                <li>Video content can contain metadata in both the video file and embedded thumbnail images.</li>
                <li>Location data can be attached to posts through the app&apos;s location feature.</li>
                <li>Duet and Stitch features allow others to remix your content, extending its reach beyond your original audience.</li>
              </ul>

              <h2 id="audience-review">Step 4: Review Your Audience and Visibility</h2>

              <p>
                Before posting, ask yourself three questions:
              </p>

              <ol>
                <li><strong>Who can see this?</strong> Check the audience selector. Is this going to friends only, a specific group, or the entire internet?</li>
                <li><strong>Who might share it?</strong> Even with restrictive settings, anyone who can see your photo can screenshot it and share it elsewhere.</li>
                <li><strong>What does this reveal about me?</strong> Consider the cumulative effect. A single photo may seem harmless, but combined with your other posts, it could reveal patterns about your life.</li>
              </ol>

              <p>
                A helpful rule of thumb: only post photos you would be comfortable with a stranger seeing. Once a photo is online, you lose control over how it is used, shared, or archived.
              </p>

              <h2 id="post-publishing">Step 5: Post-Publishing Monitoring</h2>

              <p>
                Your privacy responsibilities do not end when you hit publish. Ongoing monitoring helps you catch issues that slipped through your pre-posting checks:
              </p>

              <ul>
                <li><strong>Review comments:</strong> Commenters may quote information from your photo or reveal details you did not intend to share.</li>
                <li><strong>Check for resharing:</strong> Monitor whether your photos are being shared to groups, pages, or platforms you did not intend.</li>
                <li><strong>Periodic audits:</strong> Every few months, review your old posts and remove or archive any that no longer meet your privacy standards.</li>
                <li><strong>Use reverse image search:</strong> Periodically search for your photos online to see where they have been reposted.</li>
              </ul>

              <h2>The Complete Pre-Posting Checklist</h2>

              <p>
                Here is a condensed version of the full checklist you can follow every time you post:
              </p>

              <ol>
                <li><strong>Run the Privacy Score Tool</strong> — Get an instant assessment of your photo&apos;s privacy risks.</li>
                <li><strong>Remove all metadata</strong> — Use the Social Media Cleaner to strip GPS, timestamps, and device data.</li>
                <li><strong>Inspect the background</strong> — Zoom in and check for addresses, screens, documents, and other sensitive details.</li>
                <li><strong>Crop or blur if needed</strong> — Remove or obscure any background risks before posting.</li>
                <li><strong>Check platform settings</strong> — Verify audience, location tagging, and face recognition settings.</li>
                <li><strong>Review the caption</strong> — Ensure your text does not reveal information the photo does not.</li>
                <li><strong>Confirm the audience</strong> — Make sure the visibility setting matches your intent.</li>
              </ol>

              <h2>Conclusion</h2>

              <p>
                Social media privacy is not about being paranoid — it is about being informed. Every photo you post is a piece of information about you, and the more deliberate you are about what you share, the more control you maintain over your digital footprint.
              </p>

              <p>
                Start by making metadata removal a non-negotiable part of your sharing routine. The{" "}
                <Link href="/social-media-cleaner/" className="text-primary hover:underline">
                  Social Media Cleaner
                </Link>{" "}
                makes it fast and effortless, and it runs entirely in your browser so your photos never leave your device.
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
          <h2 className="text-2xl font-bold text-foreground mb-3">Share Photos with Confidence</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Strip metadata, check your privacy score, and share safely — all from one tool. No uploads, no server processing.
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
            description="Questions about social media photo privacy and safe sharing practices"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
