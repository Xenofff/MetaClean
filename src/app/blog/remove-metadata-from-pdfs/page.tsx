import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remove Metadata From PDFs Online",
  description: "Learn how to remove metadata from PDF files to protect your privacy. Step-by-step guide to cleaning PDF documents.",
  keywords: ["remove PDF metadata", "PDF privacy", "PDF metadata cleaner", "document privacy"],
  alternates: {
    canonical: `${siteConfig.url}/blog/remove-metadata-from-pdfs/`,
  },
};

const faqs = [
  {
    question: "What metadata is stored in PDF files?",
    answer: "PDF files can contain author name, creation date, modification date, software used, keywords, and other document properties that can identify the creator.",
  },
  {
    question: "Can I remove metadata from a locked PDF?",
    answer: "If a PDF is password-protected, you'll need the password to modify it. MetaClean can process unlocked PDFs and remove their metadata.",
  },
  {
    question: "Does removing PDF metadata affect the content?",
    answer: "No, removing metadata only strips the document properties. Your actual content, formatting, images, and layout remain completely unchanged.",
  },
];

export default function RemoveMetadataFromPdfsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Remove Metadata From PDFs Online", url: "/blog/remove-metadata-from-pdfs/" },
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
          <span className="text-foreground">Remove Metadata From PDFs Online</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Guide</span>
            <span className="text-sm text-muted-foreground">4 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Remove Metadata From PDFs Online</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Step-by-step guide to cleaning PDF documents before sharing.
          </p>
        </header>

        <div className="prose prose-gray max-w-none">
          <h2>Why PDF Metadata Matters</h2>

          <p>
            PDF files are one of the most commonly shared document formats, but many people don&apos;t
            realize that PDFs contain hidden metadata that can reveal sensitive information about
            the document and its creator.
          </p>

          <h2>What Metadata Do PDFs Contain?</h2>

          <p>
            PDF files can store various types of metadata including:
          </p>

          <ul>
            <li><strong>Author Name:</strong> The name of the person who created the document</li>
            <li><strong>Creation Date:</strong> When the document was originally created</li>
            <li><strong>Modification Date:</strong> When the document was last edited</li>
            <li><strong>Software:</strong> The application used to create or edit the PDF</li>
            <li><strong>Producer:</strong> The PDF producer software</li>
            <li><strong>Keywords:</strong> Search terms associated with the document</li>
            <li><strong>Title:</strong> The document title</li>
          </ul>

          <h2>Privacy Risks of PDF Metadata</h2>

          <p>
            This metadata can pose several privacy concerns:
          </p>

          <ul>
            <li><strong>Identity Exposure:</strong> Your name in the author field can link you to the document</li>
            <li><strong>Timeline Information:</strong> Creation and modification dates reveal when you worked on the document</li>
            <li><strong>Software Footprint:</strong> The software used can indicate your technical setup and potentially your organization</li>
            <li><strong>Internal Information:</strong> Keywords might reveal the document&apos;s purpose or sensitive topics</li>
          </ul>

          <h2>How to Remove Metadata from PDFs</h2>

          <h3>Using MetaClean</h3>

          <p>
            MetaClean provides a simple, privacy-focused way to remove metadata from PDF files:
          </p>

          <ol>
            <li>Visit the <Link href="/remove-pdf-metadata/" className="text-primary hover:underline">PDF Metadata Remover</Link> page</li>
            <li>Upload your PDF file by dragging and dropping or clicking to browse</li>
            <li>Review the detected metadata to see what information is stored</li>
            <li>Select which metadata fields you want to remove</li>
            <li>Click &quot;Clean Metadata&quot; to process the file</li>
            <li>Download your cleaned PDF</li>
          </ol>

          <h3>Using Adobe Acrobat</h3>

          <p>
            If you have Adobe Acrobat Pro:
          </p>

          <ol>
            <li>Open the PDF in Acrobat</li>
            <li>Go to File &gt; Properties</li>
            <li>Click the &quot;Description&quot; tab</li>
            <li>Delete the metadata fields you want to remove</li>
            <li>Save the document</li>
          </ol>

          <h3>Using Preview (Mac)</h3>

          <p>
            On macOS:
          </p>

          <ol>
            <li>Open the PDF in Preview</li>
            <li>Go to Tools &gt; Show Inspector</li>
            <li>Click the &quot;i&quot; button</li>
            <li>Review the metadata</li>
            <li>Note: Preview doesn&apos;t provide a direct way to remove all metadata</li>
          </ol>

          <h2>Best Practices for PDF Privacy</h2>

          <ul>
            <li><strong>Always remove metadata before sharing:</strong> Make it a habit to clean PDFs before sending them</li>
            <li><strong>Check sensitive documents:</strong> Pay special attention to contracts, proposals, and personal documents</li>
            <li><strong>Use privacy-focused tools:</strong> Choose tools that process files locally without uploading them</li>
            <li><strong>Audit existing documents:</strong> Review and clean metadata from PDFs you&apos;ve already shared</li>
          </ul>

          <h2>Conclusion</h2>

          <p>
            Removing metadata from PDFs is a simple but important step in protecting your privacy.
            With MetaClean, you can quickly and easily clean your PDF documents entirely in your browser.
          </p>

          <p>
            Start protecting your privacy today with our{" "}
            <Link href="/remove-pdf-metadata/" className="text-primary hover:underline">PDF Metadata Remover</Link>.
          </p>
        </div>

        <FAQSection
          title="Frequently Asked Questions"
          description="Common questions about PDF metadata removal"
          faqs={faqs}
        />
      </article>
    </>
  );
}
