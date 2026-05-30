import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "MetaClean Terms of Service. Read the terms governing your use of MetaClean's free, client-side metadata removal tools.",
  keywords: ["terms of service", "terms and conditions", "legal", "metaclean"],
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
  openGraph: {
    title: "Terms of Service — MetaClean",
    description: "Terms governing your use of MetaClean's free, client-side metadata removal tools.",
    url: `${siteConfig.url}/terms`,
    siteName: siteConfig.name,
  },
};

export default function TermsPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: January 2025</p>

        <div className="mt-10 space-y-10 text-muted-foreground">
          {/* Acceptance */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-3">
              By accessing or using MetaClean (the &quot;Service&quot;), you agree to be bound by these Terms
              of Service. If you do not agree to these terms, do not use the Service.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
            <p className="mt-3">
              MetaClean provides free, client-side tools for removing metadata from photos, PDFs,
              and text files. All processing occurs locally in your web browser. The Service does
              not require account creation, login, or any form of registration.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Eligibility</h2>
            <p className="mt-3">
              The Service is available to anyone. There are no age restrictions beyond what is
              required by applicable law in your jurisdiction.
            </p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Acceptable Use</h2>
            <p className="mt-3">
              You agree to use the Service only for lawful purposes. You may not:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1">
              <li>Attempt to reverse-engineer, decompile, or disassemble any part of the Service</li>
              <li>Use the Service in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Use automated systems to access or interact with the Service without our permission</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Intellectual Property</h2>
            <p className="mt-3">
              MetaClean and its original content, features, and functionality are owned by MetaClean
              and are protected by international copyright, trademark, patent, trade secret, and
              other intellectual property laws.
            </p>
          </section>

          {/* User Content */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Your Files</h2>
            <p className="mt-3">
              You retain full ownership of all files you process using MetaClean. We claim no
              rights, title, or interest in your files. Since all processing happens in your
              browser, we never have access to your files and cannot view, copy, or distribute them.
            </p>
          </section>

          {/* Disclaimer of Warranties */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Disclaimer of Warranties</h2>
            <p className="mt-3">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p className="mt-3">
              We do not warrant that the Service will be uninterrupted, error-free, or completely
              secure. While we strive to remove metadata effectively, we cannot guarantee that all
              metadata will be removed from all file types in all circumstances.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Limitation of Liability</h2>
            <p className="mt-3">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL METACLEAN BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
              INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF
              OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
            </p>
            <p className="mt-3">
              Our total liability for any claims arising from or related to the Service shall not
              exceed the amount you paid us (if anything) in the twelve (12) months preceding the
              claim. Since MetaClean is free, this amount is zero.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">9. Indemnification</h2>
            <p className="mt-3">
              You agree to indemnify and hold harmless MetaClean from any claims, losses, or damages
              arising from your use of the Service or violation of these Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">10. Governing Law</h2>
            <p className="mt-3">
              These Terms shall be governed by and construed in accordance with the laws of the
              United States, without regard to its conflict of law provisions. Any legal proceedings
              must be brought in the federal or state courts located in the United States, and you
              consent to the personal jurisdiction of such courts.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">11. Changes to Terms</h2>
            <p className="mt-3">
              We reserve the right to modify these Terms at any time. Changes will be effective
              immediately upon posting. Your continued use of the Service after changes are posted
              constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">12. Severability</h2>
            <p className="mt-3">
              If any provision of these Terms is found to be unenforceable or invalid, that provision
              will be limited or eliminated to the minimum extent necessary, and the remaining
              provisions will remain in full force and effect.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p className="mt-3">
              If you have questions about these Terms, contact us at{" "}
              <a href="mailto:hello@metaclean.app" className="text-primary hover:underline">
                hello@metaclean.app
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
