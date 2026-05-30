"use client";

import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Tools",
    href: "#",
    children: [
      { name: "Photo Metadata", href: "/remove-photo-metadata/" },
      { name: "GPS Remover", href: "/remove-gps-from-photo/" },
      { name: "EXIF Viewer", href: "/exif-viewer/" },
      { name: "Social Media Cleaner", href: "/social-media-cleaner/" },
      { name: "Batch Remover", href: "/batch-metadata-remover/" },
      { name: "Privacy Score", href: "/privacy-score-tool/" },
      { name: "PDF Metadata", href: "/remove-pdf-metadata/" },
      { name: "Text Cleaner", href: "/remove-text-metadata/" },
      { name: "Metadata Checker", href: "/metadata-checker/" },
    ],
  },
  {
    name: "Learn",
    href: "#",
    children: [
      { name: "EXIF Explained", href: "/learn/exif-explained/" },
      { name: "GPS Metadata", href: "/learn/gps-metadata-explained/" },
      { name: "Photo Privacy", href: "/learn/photo-privacy/" },
      { name: "Social Media Privacy", href: "/learn/social-media-privacy/" },
      { name: "Location Privacy", href: "/learn/location-privacy/" },
      { name: "All Guides", href: "/learn/exif-explained/" },
    ],
  },
  { name: "Blog", href: "/blog/" },
  { name: "About", href: "/about/" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-xl font-bold text-foreground">MetaClean</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.name} className="relative">
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  onBlur={() => setTimeout(() => setToolsOpen(false), 200)}
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  aria-expanded={toolsOpen}
                  aria-haspopup="true"
                >
                  {item.name}
                  <svg className={`h-4 w-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {toolsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-border bg-white shadow-lg py-2 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-success">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
            100% Client-Side
          </div>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="space-y-1 px-4 pb-4 pt-2">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <div className="px-3 py-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tools</p>
            </div>
            {navigation[1].children?.map((child) => (
              <Link
                key={child.name}
                href={child.href}
                className="block rounded-lg px-6 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {child.name}
              </Link>
            ))}
            <Link
              href="/blog/"
              className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
