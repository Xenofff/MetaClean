import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Photo Metadata Can Be Dangerous",
  description: "Learn how metadata in your photos can expose sensitive information and put your privacy at risk.",
  keywords: ["photo metadata danger", "EXIF privacy risk", "photo privacy", "metadata security"],
  alternates: {
    canonical: `${siteConfig.url}/blog/photo-metadata-danger/`,
  },
};

const faqs = [
  {
    question: "Can someone find my address from a photo?",
    answer: "Yes, if your photo contains GPS metadata, it can reveal your exact location including your home address. This is why it's important to remove metadata before sharing photos online.",
  },
  {
    question: "Do social media platforms remove metadata?",
    answer: "Most social media platforms strip some metadata, but not all of it. Some platforms preserve device information and other details. It's best to remove metadata yourself before uploading.",
  },
  {
    question: "How can I protect myself from metadata exposure?",
    answer: "Use a metadata removal tool like MetaClean before sharing any photos. You can also disable location tagging in your camera settings to prevent GPS data from being recorded.",
  },
];

export default function PhotoMetadataDangerPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Why Photo Metadata Can Be Dangerous", url: "/blog/photo-metadata-danger/" },
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
          <span className="text-foreground">Why Photo Metadata Can Be Dangerous</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-danger/10 px-2.5 py-0.5 text-xs font-medium text-danger">Privacy</span>
            <span className="text-sm text-muted-foreground">7 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Why Photo Metadata Can Be Dangerous</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Learn how metadata in your photos can expose sensitive information about you.
          </p>
        </header>

        <div className="prose prose-gray max-w-none">
          <h2>The Hidden Danger in Your Photos</h2>

          <p>
            When you share a photo online, you might think you&apos;re only sharing a visual moment. But behind
            every digital photo lies a treasure trove of hidden information called metadata. This data can reveal
            far more about you than you might realize.
          </p>

          <h2>What Information is Exposed?</h2>

          <p>
            Digital photos typically contain several types of metadata that can be extracted by anyone with
            basic technical knowledge:
          </p>

          <h3>GPS Location Data</h3>
          <p>
            The most concerning type of metadata is GPS coordinates. When your smartphone or camera has
            location services enabled, it embeds the exact latitude and longitude where the photo was taken.
            This means anyone viewing your photo can potentially:
          </p>

          <ul>
            <li>Find your home address</li>
            <li>Identify your workplace</li>
            <li>Track your travel patterns</li>
            <li>Know when you&apos;re away from home</li>
          </ul>

          <h3>Device Information</h3>
          <p>
            Your photos reveal the make and model of your camera or phone, and sometimes even the serial
            number. This information can be used to:
          </p>

          <ul>
            <li>Identify you across different platforms</li>
            <li>Determine your economic status</li>
            <li>Track device ownership</li>
          </ul>

          <h3>Timestamps</h3>
          <p>
            Metadata includes precise timestamps showing when photos were taken. This information can reveal:
          </p>

          <ul>
            <li>Your daily routine</li>
            <li>When you&apos;re typically at certain locations</li>
            <li>How long you spend at different places</li>
          </ul>

          <h2>Real-World Privacy Risks</h2>

          <p>
            The exposure of this metadata has led to real privacy violations and even physical safety concerns:
          </p>

          <ul>
            <li><strong>Burglary:</strong> Criminals have used photo metadata to identify when homes are empty</li>
            <li><strong>Stalking:</strong> Abusers have tracked victims through their photo uploads</li>
            <li><strong>Identity Theft:</strong> Device and location data combined with personal information can enable fraud</li>
            <li><strong>Social Engineering:</strong> Attackers use metadata to craft targeted phishing attempts</li>
          </ul>

          <h2>Case Studies</h2>

          <p>
            In 2016, a study by Kaspersky Lab found that 84% of photos shared on social media contained
            GPS coordinates. Even after being uploaded to platforms that claim to strip metadata, some
            information often remains.
          </p>

          <p>
            A researcher demonstrated that by analyzing metadata from photos shared on dating apps,
            it was possible to determine users&apos; home addresses, workplaces, and daily routines with
            alarming accuracy.
          </p>

          <h2>How to Protect Yourself</h2>

          <p>
            The good news is that protecting yourself from metadata exposure is straightforward:
          </p>

          <ol>
            <li><strong>Remove metadata before sharing:</strong> Use a tool like MetaClean to strip all metadata from photos before uploading them anywhere.</li>
            <li><strong>Disable location services:</strong> Turn off location tagging in your camera app settings.</li>
            <li><strong>Be mindful of what you share:</strong> Consider whether the context of a photo might reveal sensitive information even without metadata.</li>
            <li><strong>Use privacy-focused tools:</strong> Choose tools that process files locally without uploading them to external servers.</li>
          </ol>

          <h2>Conclusion</h2>

          <p>
            Photo metadata is a significant privacy concern that many people overlook. By understanding the
            risks and taking simple steps to remove metadata before sharing, you can protect your privacy
            and personal safety online.
          </p>

          <p>
            Start protecting yourself today with our{" "}
            <Link href="/remove-photo-metadata/" className="text-primary hover:underline">Photo Metadata Remover</Link>.
          </p>
        </div>

        <FAQSection
          title="Frequently Asked Questions"
          description="Understanding the privacy risks of photo metadata"
          faqs={faqs}
        />
      </article>
    </>
  );
}
