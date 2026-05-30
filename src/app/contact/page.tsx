import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the MetaClean team. Questions, feedback, or support — we'd love to hear from you.",
  keywords: ["contact metaclean", "support", "feedback", "help"],
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: "Contact Us — MetaClean",
    description: "Get in touch with the MetaClean team. Questions, feedback, or support.",
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
  },
};

export default function ContactPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a question, suggestion, or just want to say hello? We&apos;d love to hear from you.
        </p>

        {/* Contact Form */}
        <div className="mt-10 rounded-xl border border-border bg-white p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-foreground">Send a Message</h2>
          <form className="mt-6 space-y-6" action={`mailto:hello@metaclean.app`} method="post" encType="text/plain">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary-hover transition-all"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Message
            </button>
          </form>
        </div>

        {/* Direct Contact */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-white p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-foreground">Email</h3>
            <a
              href="mailto:hello@metaclean.app"
              className="mt-2 block text-sm text-primary hover:underline"
            >
              hello@metaclean.app
            </a>
            <p className="mt-2 text-xs text-muted-foreground">
              For general inquiries and support
            </p>
          </div>

          <div className="rounded-xl border border-border bg-white p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-foreground">Security Issues</h3>
            <a
              href="mailto:security@metaclean.app"
              className="mt-2 block text-sm text-primary hover:underline"
            >
              security@metaclean.app
            </a>
            <p className="mt-2 text-xs text-muted-foreground">
              Report security vulnerabilities privately
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">Connect With Us</h2>
          <div className="mt-4 flex gap-4">
            <a
              href="https://github.com/metaclean"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://twitter.com/metaclean"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              aria-label="Twitter"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
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
