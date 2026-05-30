import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metadata And Privacy Laws",
  description:
    "Privacy regulations worldwide address metadata differently. Learn how global privacy laws treat photo and document metadata and what compliance means for individuals and businesses.",
  keywords: [
    "privacy laws metadata",
    "metadata regulations",
    "global privacy metadata",
    "CCPA metadata",
    "metadata legal compliance",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/metadata-and-privacy-laws/`,
  },
};

const faqs = [
  {
    question: "Which privacy laws address metadata?",
    answer:
      "Several major privacy laws address metadata, including the EU's GDPR, the California Consumer Privacy Act (CCPA), Brazil's LGPD, Canada's PIPEDA, and various state-level privacy laws in the US. Each law has different definitions and requirements for how metadata containing personal information must be handled.",
  },
  {
    question: "Is metadata covered by US privacy laws?",
    answer:
      "The US does not have a comprehensive federal privacy law, but several state laws address metadata. CCPA and CPRA in California, VCDPA in Virginia, and similar laws in other states define personal data broadly enough to include metadata that can identify individuals.",
  },
  {
    question: "Do privacy laws require metadata removal?",
    answer:
      "Some privacy laws require organizations to minimize data collection and delete data when it is no longer needed. While they may not explicitly require metadata removal, the principles of data minimization and purpose limitation effectively require organizations to limit metadata collection and retention.",
  },
  {
    question: "How do international privacy laws differ on metadata?",
    answer:
      "Different jurisdictions take varying approaches. The EU's GDPR has the broadest definition of personal data, which clearly includes metadata. Other jurisdictions may have narrower definitions or specific exemptions. The key differences lie in what constitutes personal data, the legal basis required for processing, and the penalties for non-compliance.",
  },
  {
    question: "Should individuals worry about privacy laws for metadata?",
    answer:
      "While privacy laws primarily regulate organizations, individuals benefit from the protections they provide. Understanding these laws helps you know your rights regarding metadata and empowers you to exercise those rights. Additionally, removing metadata before sharing files protects you regardless of what laws apply to the recipients.",
  },
];

const tocItems = [
  { id: "global-landscape", title: "Global Privacy Landscape" },
  { id: "eu-gdpr", title: "European Union: GDPR" },
  { id: "us-privacy-laws", title: "United States Privacy Laws" },
  { id: "other-jurisdictions", title: "Other Jurisdictions" },
  { id: "compliance-challenges", title: "Compliance Challenges" },
  { id: "individual-protection", title: "Individual Protection" },
];

export default function MetadataAndPrivacyLawsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: "Metadata And Privacy Laws", url: "/blog/metadata-and-privacy-laws/" },
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
          <span className="text-foreground">Metadata And Privacy Laws</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Guide</span>
                <span className="text-sm text-muted-foreground">11 min read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Metadata And Privacy Laws</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Privacy regulations around the world are increasingly addressing metadata. Here is how different jurisdictions handle this evolving area of law.
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <h2 id="global-landscape">The Global Privacy Landscape for Metadata</h2>

              <p>
                Privacy laws worldwide are evolving to address the growing volume of personal
                data generated in the digital age. Metadata — the hidden information embedded
                in photos, documents, and other digital files — is increasingly recognized
                as a significant privacy concern. However, different jurisdictions address
                metadata in different ways, creating a complex landscape for organizations
                and individuals to navigate.
              </p>

              <p>
                The common thread across all major privacy laws is the recognition that
                information about an individual — including information that is not directly
                identifying but can be used in combination with other data to identify someone —
                deserves legal protection. Metadata frequently falls into this category because
                it contains location data, timestamps, device information, and other details
                that can be linked to identifiable individuals.
              </p>

              <h2 id="eu-gdpr">European Union: GDPR</h2>

              <p>
                The European Union&apos;s General Data Protection Regulation (GDPR) is the most
                comprehensive privacy law in the world and has the broadest implications for
                metadata. GDPR defines personal data as &quot;any information relating to an
                identified or identifiable natural person,&quot; which clearly encompasses
                metadata that can be linked to an individual.
              </p>

              <p>
                Under GDPR, organizations that process metadata must:
              </p>

              <ul>
                <li>Have a valid legal basis for processing metadata (consent, legitimate interest, or other bases)</li>
                <li>Collect only the metadata that is necessary for the specified purpose (data minimization)</li>
                <li>Implement appropriate security measures to protect metadata</li>
                <li>Allow individuals to access, correct, and delete their metadata</li>
                <li>Notify authorities of metadata breaches within 72 hours</li>
                <li>Conduct Data Protection Impact Assessments for high-risk processing</li>
              </ul>

              <p>
                GDPR penalties can reach up to 4% of annual global turnover or 20 million
                euros, making compliance a significant priority for organizations that handle
                metadata containing personal information.
              </p>

              <h2 id="us-privacy-laws">United States Privacy Laws</h2>

              <p>
                The United States lacks a comprehensive federal privacy law, but several
                state-level laws address metadata:
              </p>

              <h3>California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA)</h3>

              <p>
                California&apos;s privacy laws define personal information broadly enough to
                include metadata. The CCPA/CPRA grants California residents the right to
                know what personal information is collected, request deletion, and opt out
                of the sale of personal information. Metadata that can identify individuals
                — including GPS coordinates, device serial numbers, and timestamps — falls
                under these protections.
              </p>

              <h3>Other State Privacy Laws</h3>

              <p>
                Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), Utah (UCPA), and
                other states have enacted privacy laws with similar definitions of personal
                data. While the specific requirements vary by state, most of these laws
                address metadata that can be linked to identifiable individuals.
              </p>

              <h3>Federal Sector-Specific Laws</h3>

              <p>
                In the absence of a comprehensive federal law, sector-specific regulations
                address metadata in particular contexts. HIPAA protects health-related
                metadata, FERPA protects student education records, and GLBA protects
                financial information. Each of these laws has implications for metadata
                in their respective domains.
              </p>

              <h2 id="other-jurisdictions">Other Jurisdictions</h2>

              <p>
                Privacy laws around the world are increasingly addressing metadata:
              </p>

              <ul>
                <li><strong>Brazil (LGPD):</strong> Brazil&apos;s Lei Geral de Proteção de Dados follows a model similar to GDPR, with a broad definition of personal data that includes metadata.</li>
                <li><strong>Canada (PIPEDA):</strong> Canada&apos;s Personal Information Protection and Electronic Documents Act applies to metadata that constitutes personal information in commercial activities.</li>
                <li><strong>Australia:</strong> The Privacy Act 1988 covers personal information, which includes metadata that can identify individuals.</li>
                <li><strong>Japan (APPI):</strong> Japan&apos;s Act on Protection of Personal Information covers information that can identify individuals, including metadata.</li>
                <li><strong>South Korea (PIPA):</strong> South Korea has strict data protection laws that cover metadata as personal information.</li>
                <li><strong>India (DPDP Act):</strong> India&apos;s Digital Personal Data Protection Act defines personal data broadly to include metadata that can identify individuals.</li>
              </ul>

              <h2 id="compliance-challenges">Compliance Challenges</h2>

              <p>
                Organizations face several challenges in complying with metadata-related
                privacy requirements:
              </p>

              <ul>
                <li><strong>Metadata discovery:</strong> Identifying all metadata in digital files across an organization&apos;s content library is technically challenging.</li>
                <li><strong>Cross-border transfers:</strong> Metadata that crosses international borders must comply with the privacy laws of all relevant jurisdictions.</li>
                <li><strong>Third-party sharing:</strong> Metadata shared with vendors, partners, and service providers must be protected under applicable privacy agreements.</li>
                <li><strong>Retention periods:</strong> Determining how long metadata can be retained requires understanding the purpose for collection and applicable legal requirements.</li>
                <li><strong>Consent management:</strong> Obtaining and managing consent for metadata collection across multiple platforms and jurisdictions is complex.</li>
              </ul>

              <h2 id="individual-protection">Protecting Yourself Regardless of Laws</h2>

              <p>
                While privacy laws provide important protections, the most reliable way
                to protect your metadata is to remove it before sharing files. Privacy
                laws regulate what organizations do with your data after they receive it,
                but removing metadata before sharing prevents the data from reaching
                organizations in the first place.
              </p>

              <p>
                This proactive approach is more effective than relying on legal protections
                because it does not depend on the recipient complying with applicable laws.
                By removing metadata before sharing, you maintain control over your personal
                information regardless of where it goes.
              </p>

              <p>
                Use the{" "}
                <Link href="/remove-photo-metadata/" className="text-primary hover:underline">
                  Photo Metadata Remover
                </Link>{" "}
                for images and the{" "}
                <Link href="/remove-pdf-metadata/" className="text-primary hover:underline">
                  PDF Metadata Remover
                </Link>{" "}
                for documents to strip personal data from your files before sharing them.
              </p>

              <h2>Conclusion</h2>

              <p>
                Privacy laws worldwide are increasingly recognizing metadata as personal
                data that requires legal protection. While the specific requirements vary
                by jurisdiction, the trend is toward broader recognition of metadata privacy
                risks and stronger regulations. Organizations must understand and comply
                with applicable laws, while individuals can protect themselves by removing
                metadata before sharing files.
              </p>

              <p>
                Check your files with the{" "}
                <Link href="/metadata-checker/" className="text-primary hover:underline">
                  Metadata Checker
                </Link>{" "}
                to see what personal information they contain, and use our tools to strip
                that information before sharing.
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
            Remove metadata from your files to maintain control over your personal data, regardless of which privacy laws apply.
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
            description="Questions about global privacy laws and metadata"
            faqs={faqs}
          />
        </div>
      </article>
    </>
  );
}
