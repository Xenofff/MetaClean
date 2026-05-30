import Link from "next/link";

const footerLinks = {
  tools: [
    { name: "Remove Photo Metadata", href: "/remove-photo-metadata/" },
    { name: "Remove GPS from Photo", href: "/remove-gps-from-photo/" },
    { name: "EXIF Viewer", href: "/exif-viewer/" },
    { name: "Social Media Cleaner", href: "/social-media-cleaner/" },
    { name: "Batch Metadata Remover", href: "/batch-metadata-remover/" },
    { name: "Privacy Score", href: "/privacy-score-tool/" },
    { name: "Remove PDF Metadata", href: "/remove-pdf-metadata/" },
    { name: "Clean Text Files", href: "/remove-text-metadata/" },
  ],
  resources: [
    { name: "Blog", href: "/blog/" },
    { name: "Privacy Guide", href: "/privacy-guide/" },
    { name: "How to Remove EXIF Data", href: "/blog/how-to-remove-exif-data/" },
    { name: "PDF Metadata Guide", href: "/blog/remove-metadata-from-pdfs/" },
    { name: "GPS Privacy Risks", href: "/blog/gps-metadata-danger/" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy/" },
    { name: "Terms of Service", href: "/terms/" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xl font-bold text-foreground">MetaClean</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Remove metadata from your files instantly. All processing happens in your browser — your files never leave your device.
            </p>
            <div className="flex items-center gap-2 text-xs text-success">
              <span className="h-2 w-2 rounded-full bg-success"></span>
              100% Client-Side Processing
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Tools</h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MetaClean. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success"></span>
              No Data Collection
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              Open Source
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
