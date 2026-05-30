import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metadata And GDPR",
  description:
    "GDPR classifies metadata as personal data in many contexts. Learn how European privacy regulations apply to photo and document metadata and how to stay compliant.",
  keywords: [
    "metadata GDPR",
    "GDPR personal data",
    "European privacy metadata",
    "GDPR photo metadata",
    "metadata compliance",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/metadata-and-gdpr/`,
  },
};

const faqs = [
  {
    question: "Does GDPR apply to photo metadata?",
    answer:
      "Yes, when photo metadata contains personal data — such as GPS coordinates revealing a person's location, timestamps, or device serial numbers — it falls under GDPR. Organizations that collect, process, or store photos with metadata must comply with GDPR requirements for handling personal data.",
  },
  {
    question: "Is metadata considered personal data under GDPR?",
    answer:
      "Metadata can be personal data under GDPR if it can be used to identify an individual directly or indirectly. GPS coordinates that reveal a person's location, timestamps combined with other identifying information, and device serial numbers that can be traced to an owner all qualify as personal data.",
  },
  {
    question: "What are the GDPR requirements for metadata?",
    answer:
      "GDPR requires organizations to have a legal basis for processing metadata, implement appropriate security measures, allow individuals to access and delete their metadata, and notify authorities of metadata breaches. Organizations must also minimize metadata collection and delete data when it is no longer needed.",
  },
  {
    question: "Can I request deletion of my metadata under GDPR?",
    answer:
      "Yes. Under GDPR's right to erasure, you can request that organizations delete metadata that constitutes personal data. This includes metadata in photos you uploaded, metadata collected about your activity, and metadata shared with third parties. Organizations must comply unless they have a legal basis to retain the data.",
  },
  {
    question: "How does GDPR affect metadata in documents?",
    answer:
      "Document metadata containing personal information — such as author names, email addresses, and revision history — falls under GDPR when processed by organizations. Companies must have a legal basis for retaining this metadata and must implement appropriate security measures to protect it.",
  },
];

const tocItems = [
  { id: "gdpr-and-metadata", title: "GDPR and Metadata" },
  { id: "personal-data-definition", title: "Personal Data Definition" },
  { id: "organization-obligations", title: "Organization Obligations" },
  { id: "individual-rights", title: "Individual Rights" },
  { id: "compliance-practices", title: "Compliance Practices" },
  { id: "enforcement", title: "Enforcement and Penalties" },
];

export default function MetadataAndGDPRPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Metadata And GDPR", url: "/blog/metadata-and-gdpr/" },
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
          <span className="text-foreground">Metadata And GDPR</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Guide</span>
                <span className="text-sm text-muted-foreground">10 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Metadata And GDPR</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                The European Union&apos;s General Data Protection Regulation has significant implications for how organizations handle metadata. Here is what you need to know.
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <h2 id="gdpr-and-metadata">GDPR and Metadata: An Overview</h2>

              <p>
                The General Data Protection Regulation (GDPR) is the European Union&apos;s
                comprehensive privacy law that governs how organizations collect, process,
                store, and share personal data. While GDPR was primarily designed to address
                traditional personal data like names, email addresses, and financial information,
                its broad definition of personal data encompasses metadata in many contexts.
              </p>

              <p>
                This has significant implications for organizations that handle digital content
                — including photos with GPS metadata, documents with author information, and
                files with timestamps and device data. Any organization that processes metadata
                containing personal information must comply with GDPR requirements.
              </p>

              <p>
                Understanding how GDPR applies to metadata is essential for organizations that
                operate in or serve customers in the European Union. Non-compliance can result
                in substantial fines and reputational damage.
              </p>

              <h2 id="personal-data-definition">How GDPR Defines Metadata as Personal Data</h2>

              <p>
                GDPR defines personal data as &quot;any information relating to an identified or
                identifiable natural person.&quot; This definition is intentionally broad and
                encompasses metadata when it can be linked to an individual:
              </p>

              <ul>
                <li><strong>GPS coordinates:</strong> When a photo&apos;s GPS data reveals a location associated with an identifiable person, it constitutes personal data.</li>
                <li><strong>Timestamps:</strong> When combined with other identifying information, timestamps reveal when an individual performed specific actions.</li>
                <li><strong>Device serial numbers:</strong> These can be traced to the device owner through purchase records, making them personal data.</li>
                <li><strong>Author information:</strong> Document metadata containing author names, email addresses, and organizational affiliations clearly constitutes personal data.</li>
                <li><strong>File paths:</strong> Internal directory structures that reveal organizational context can constitute personal data when linked to identifiable individuals.</li>
              </ul>

              <p>
                The key test is whether the metadata can be used to identify an individual
                directly or indirectly. Even metadata that does not contain a name can be
                personal data if it can be combined with other information to identify someone.
              </p>

              <h2 id="organization-obligations">Organization Obligations Under GDPR</h2>

              <p>
                Organizations that process metadata containing personal data must comply
                with several GDPR requirements:
              </p>

              <h3>Legal Basis for Processing</h3>

              <p>
                Organizations must have a valid legal basis for processing metadata. This
                may include consent from the data subject, legitimate interest, contractual
                necessity, or legal obligation. For example, a social media platform processing
                photo metadata for its services must have consent or a legitimate interest
                basis.
              </p>

              <h3>Data Minimization</h3>

              <p>
                GDPR requires organizations to collect only the metadata that is necessary
                for the specified purpose. Organizations cannot collect GPS data, device
                information, and timestamps if only the image content is needed for the
                service being provided.
              </p>

              <h3>Security Measures</h3>

              <p>
                Organizations must implement appropriate technical and organizational measures
                to protect metadata from unauthorized access, alteration, or destruction.
                This includes encryption, access controls, and regular security assessments.
              </p>

              <h3>Data Protection Impact Assessments</h3>

              <p>
                When metadata processing is likely to result in a high risk to individuals&apos;
                rights and freedoms, organizations must conduct Data Protection Impact
                Assessments (DPIAs) to evaluate the risks and implement mitigating measures.
              </p>

              <h2 id="individual-rights">Individual Rights Regarding Metadata</h2>

              <p>
                GDPR grants individuals several rights regarding their personal data,
                including metadata:
              </p>

              <ul>
                <li><strong>Right to access:</strong> Individuals can request a copy of all metadata an organization holds about them.</li>
                <li><strong>Right to erasure:</strong> Individuals can request deletion of metadata that is no longer necessary or was processed unlawfully.</li>
                <li><strong>Right to rectification:</strong> Individuals can request correction of inaccurate metadata.</li>
                <li><strong>Right to restrict processing:</strong> Individuals can request that metadata processing be limited in certain circumstances.</li>
                <li><strong>Right to data portability:</strong> Individuals can request their metadata in a structured, machine-readable format.</li>
                <li><strong>Right to object:</strong> Individuals can object to metadata processing based on legitimate interest or public interest.</li>
              </ul>

              <h2 id="compliance-practices">Practical Compliance Practices</h2>

              <p>
                Organizations can implement several practices to ensure GDPR compliance
                when handling metadata:
              </p>

              <ol>
                <li><strong>Audit metadata collection:</strong> Identify all metadata collected, the legal basis for collection, and the purposes for which it is used.</li>
                <li><strong>Implement data minimization:</strong> Collect only the metadata necessary for the specified purpose and delete metadata that is no longer needed.</li>
                <li><strong>Provide user controls:</strong> Give users the ability to control what metadata is collected and to request deletion.</li>
                <li><strong>Strip metadata from shared content:</strong> Remove personal metadata from files before sharing them with third parties or publishing them publicly.</li>
                <li><strong>Train staff:</strong> Ensure employees understand GDPR requirements for metadata handling and follow established protocols.</li>
                <li><strong>Document compliance:</strong> Maintain records of processing activities, consent mechanisms, and security measures.</li>
              </ol>

              <h2 id="enforcement">Enforcement and Penalties</h2>

              <p>
                GDPR enforcement for metadata violations follows the same framework as other
                personal data violations. Organizations can face fines of up to 4% of their
                annual global turnover or 20 million euros, whichever is higher. Data protection
                authorities have the power to investigate organizations, issue warnings, and
                order compliance measures.
              </p>

              <p>
                Several enforcement actions have involved metadata-related violations,
                including organizations that collected more metadata than necessary, failed
                to provide users with access to their metadata, and did not implement
                adequate security measures for metadata storage.
              </p>

              <h2>Conclusion</h2>

              <p>
                GDPR applies to metadata whenever it constitutes personal data, which it
                frequently does. Organizations that handle photos, documents, and other
                digital content must understand their obligations under GDPR and implement
                appropriate practices to protect metadata. For individuals, understanding
                your rights regarding metadata helps you maintain control over your personal
                information.
              </p>

              <p>
                Regardless of organizational obligations, you can protect your own metadata
                by removing it before sharing files. Use the{" "}
                <Link href="/remove-photo-metadata/" className="text-primary hover:underline">
                  Photo Metadata Remover
                </Link>{" "}
                to strip personal data from your photos before uploading or sharing them.
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
          <h2 className="text-2xl font-bold text-foreground mb-3">Protect Your Personal Data</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Remove metadata from your files to maintain control over your personal data under GDPR and other privacy regulations.
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
            description="Questions about GDPR compliance and metadata privacy"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
