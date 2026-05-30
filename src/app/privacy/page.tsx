import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "MetaClean Privacy Policy. We collect no data. All processing happens client-side. Your files never leave your browser.",
  keywords: ["privacy policy", "data protection", "no data collection", "client-side processing"],
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy — MetaClean",
    description:
      "MetaClean collects no data. All processing happens client-side. Your files never leave your browser.",
    url: `${siteConfig.url}/privacy`,
    siteName: siteConfig.name,
  },
};

export default function PrivacyPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: January 2025</p>

        <div className="mt-10 space-y-10 text-muted-foreground">
          {/* No Data Collection */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">No Data Collection</h2>
            <p className="mt-3">
              MetaClean does not collect, store, process, or transmit any personal data. We have no
              servers that receive your files. We have no databases storing your information. We have
              no analytics tracking your behavior beyond basic, anonymized page view counts.
            </p>
            <p className="mt-3">
              When you use MetaClean, your files are processed entirely within your web browser.
              At no point does any data leave your device.
            </p>
          </section>

          {/* Client-Side Processing */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">Client-Side Processing</h2>
            <p className="mt-3">
              All file processing happens locally in your browser using JavaScript and WebAssembly.
              Your files are loaded into your browser&apos;s memory using the FileReader API, processed
              entirely on your device, and the cleaned output is generated locally. No file data is
              ever sent to any server, CDN, or third-party service.
            </p>
            <p className="mt-3">
              This means that even if MetaClean&apos;s servers were compromised, your files would not be
              at risk — because they never reach our servers in the first place.
            </p>
          </section>

          {/* Cookie Policy */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">Cookie Policy</h2>
            <p className="mt-3">
              MetaClean does not use cookies. We do not set any first-party or third-party cookies.
              We do not use tracking cookies, advertising cookies, or session cookies.
            </p>
            <p className="mt-3">
              If you choose to use optional analytics (Plausible or Umami), those services may use
              minimal, privacy-respecting cookies as described in their respective privacy policies.
              These analytics are entirely optional and not enabled by default.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">Third-Party Services</h2>
            <p className="mt-3">
              MetaClean does not integrate with any third-party services that receive your data.
              We do not use:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1">
              <li>Google Analytics or any Google tracking services</li>
              <li>Facebook Pixel or Meta tracking</li>
              <li>Advertising networks</li>
              <li>Data brokers or resellers</li>
              <li>Cloud storage providers for file processing</li>
            </ul>
            <p className="mt-3">
              The only external requests your browser makes are to load the MetaClean website itself.
              No data is transmitted to third parties.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">Data Retention</h2>
            <p className="mt-3">
              MetaClean retains no data. Since all processing happens in your browser, there is
              nothing for us to retain. Your files exist only in your browser&apos;s memory during
              processing and are discarded when you close the tab or navigate away.
            </p>
            <p className="mt-3">
              We do not store any information about which files you processed, what metadata was
              found, or any other usage data. Each session is completely independent and leaves no
              trace on our end.
            </p>
          </section>

          {/* Log Files */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">Server Logs</h2>
            <p className="mt-3">
              Our web hosting provider may collect standard server access logs (IP address, browser
              type, requested URL, timestamp). These logs are standard across all web servers and
              are used solely for security and operational purposes. They do not contain any file
              data or metadata from your processed files.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">Changes to This Policy</h2>
            <p className="mt-3">
              If we make changes to this privacy policy, we will update the &quot;Last updated&quot; date at the
              top of this page. Any changes will be clearly documented. We will never add data
              collection practices without making it explicitly clear in this policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p className="mt-3">
              If you have questions about this privacy policy, contact us at{" "}
              <a href="mailto:privacy@metaclean.app" className="text-primary hover:underline">
                privacy@metaclean.app
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="text-sm font-medium text-primary hover:underline"
          >
            &larr; Back to MetaClean
          </Link>
        </div>
      </div>
    </section>
  );
}
