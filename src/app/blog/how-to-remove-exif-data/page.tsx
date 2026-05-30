import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import InContentAd from "@/components/ads/in-content-ad";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Remove EXIF Data From Photos",
  description: "Learn how to remove hidden EXIF metadata from your photos before sharing online. Step-by-step guide to protect your privacy.",
  keywords: ["remove EXIF data", "EXIF remover", "photo metadata", "privacy protection", "image metadata"],
  alternates: {
    canonical: `${siteConfig.url}/blog/how-to-remove-exif-data/`,
  },
};

const faqs = [
  {
    question: "What is EXIF data?",
    answer: "EXIF (Exchangeable Image File Format) is metadata embedded in image files by cameras and smartphones. It includes information like GPS location, camera model, date/time, and technical settings.",
  },
  {
    question: "How do I check EXIF data on my photos?",
    answer: "You can use MetaClean's metadata inspector to view all EXIF data in your photos. Simply upload your image and all metadata will be displayed in a readable format.",
  },
  {
    question: "Does removing EXIF data affect image quality?",
    answer: "No, removing EXIF data does not affect the visual quality of your image. Only the metadata is removed while the actual image content remains unchanged.",
  },
];

export default function HowToRemoveExifDataPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "How to Remove EXIF Data From Photos", url: "/blog/how-to-remove-exif-data/" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={generateFAQSchema(faqs)} />

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/blog/" className="hover:text-foreground">Blog</Link>
          <span>/</span>
          <span className="text-foreground">How to Remove EXIF Data</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Guide</span>
            <span className="text-sm text-muted-foreground">5 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">How to Remove EXIF Data From Photos</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete guide to removing hidden metadata from your photos before sharing online.
          </p>
        </header>

        <div className="prose prose-gray max-w-none">
          <h2>What is EXIF Data?</h2>

          <p>
            Every time you take a photo with your smartphone or digital camera, the image file is saved with additional information
            called EXIF data. This metadata includes details about how and where the photo was taken, the camera settings used,
            and even the device that captured the image.
          </p>

          <p>
            While EXIF data can be useful for photographers who want to review their settings, it poses significant privacy
            risks when shared online. Many people don&apos;t realize that their photos contain this hidden information.
          </p>

          <h2>Why Should You Remove EXIF Data?</h2>

          <p>There are several important reasons to remove EXIF data from your photos:</p>

          <ul>
            <li><strong>Location Privacy:</strong> GPS coordinates in EXIF data can reveal your exact location, including your home address, workplace, and places you visit.</li>
            <li><strong>Device Identification:</strong> Camera model and serial numbers can be used to identify you across different platforms.</li>
            <li><strong>Date and Time Tracking:</strong> Timestamps reveal when you were at specific locations, allowing others to track your movements.</li>
            <li><strong>Personal Information:</strong> Some devices embed the owner&apos;s name in EXIF data.</li>
          </ul>

          <InContentAd />

          <h2>How to Remove EXIF Data Using MetaClean</h2>

          <p>
            MetaClean makes it easy to remove EXIF data from your photos entirely in your browser.
            Here&apos;s how to do it:
          </p>

          <h3>Step 1: Upload Your Photo</h3>
          <p>
            Visit the <Link href="/remove-photo-metadata/" className="text-primary hover:underline">Photo Metadata Remover</Link> page.
            Drag and drop your image or click to browse and select your file. MetaClean supports JPG, JPEG, PNG, and WEBP formats.
          </p>

          <h3>Step 2: Review Detected Metadata</h3>
          <p>
            Once uploaded, MetaClean will display all the metadata found in your photo. You&apos;ll see GPS coordinates,
            camera information, timestamps, and any other data embedded in the file. This helps you understand what
            information is being shared.
          </p>

          <h3>Step 3: Select What to Remove</h3>
          <p>
            Choose which types of metadata you want to remove. You can selectively remove GPS data, camera information,
            timestamps, or remove everything at once for maximum privacy.
          </p>

          <h3>Step 4: Clean and Download</h3>
          <p>
            Click the &quot;Clean Metadata&quot; button. MetaClean will process your file entirely in your browser and provide
            a clean version for download. Your original file is never uploaded to any server.
          </p>

          <h2>Manual Methods to Remove EXIF Data</h2>

          <p>If you prefer to remove EXIF data manually, here are some options:</p>

          <h3>On Windows</h3>
          <ul>
            <li>Right-click the image file and select &quot;Properties&quot;</li>
            <li>Click the &quot;Details&quot; tab</li>
            <li>Click &quot;Remove Properties and Personal Information&quot;</li>
            <li>Choose which properties to remove</li>
          </ul>

          <h3>On Mac</h3>
          <ul>
            <li>Open the image in Preview</li>
            <li>Go to Tools &gt; Show Inspector</li>
            <li>Click the &quot;i&quot; tab</li>
            <li>Review and note the metadata (macOS doesn&apos;t have a built-in remover)</li>
          </ul>

          <h3>On Mobile</h3>
          <p>
            The easiest way to remove EXIF data on mobile is to use MetaClean&apos;s mobile-friendly interface.
            Simply visit the website in your browser and upload your photos directly.
          </p>

          <h2>Best Practices for Photo Privacy</h2>

          <ol>
            <li><strong>Remove metadata before sharing:</strong> Always clean EXIF data before posting photos on social media or sending them to others.</li>
            <li><strong>Check your camera settings:</strong> Many smartphones allow you to disable location tagging in camera settings.</li>
            <li><strong>Use privacy-focused tools:</strong> Choose tools like MetaClean that process files locally without uploading them.</li>
            <li><strong>Audit your existing photos:</strong> Review and clean metadata from photos you&apos;ve already shared.</li>
          </ol>

          <h2>Conclusion</h2>

          <p>
            Removing EXIF data from your photos is a simple but important step in protecting your privacy online.
            With tools like MetaClean, you can quickly and easily remove all metadata from your images without
            worrying about your files being uploaded to external servers.
          </p>

          <p>
            Start protecting your privacy today by using our{" "}
            <Link href="/remove-photo-metadata/" className="text-primary hover:underline">Photo Metadata Remover</Link>.
          </p>
        </div>

        <FAQSection
          title="Frequently Asked Questions"
          description="Common questions about removing EXIF data"
          faqs={faqs}
        />
      </article>
    </>
  );
}
