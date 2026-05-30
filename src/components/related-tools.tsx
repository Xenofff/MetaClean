import Link from "next/link";

const toolDescriptions: Record<string, { title: string; description: string }> = {
  "remove-photo-metadata": { title: "Photo Metadata Remover", description: "Remove EXIF data, GPS, camera info from photos" },
  "remove-gps-from-photo": { title: "GPS Remover", description: "Extract and remove GPS coordinates from photos" },
  "exif-viewer": { title: "EXIF Viewer", description: "Inspect all metadata in your photos" },
  "social-media-cleaner": { title: "Social Media Cleaner", description: "Clean photos before posting online" },
  "batch-metadata-remover": { title: "Batch Remover", description: "Clean multiple files at once" },
  "privacy-score": { title: "Privacy Score", description: "Calculate privacy score for your photos" },
  "remove-pdf-metadata": { title: "PDF Metadata Remover", description: "Remove author, title, keywords from PDFs" },
  "remove-text-metadata": { title: "Text File Cleaner", description: "Remove BOM, hidden Unicode from text files" },
};

interface RelatedToolsProps {
  tools: string[];
}

export default function RelatedTools({ tools }: RelatedToolsProps) {
  if (!tools || tools.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Related Tools</h2>
          <p className="mt-3 text-lg text-muted-foreground">More privacy tools you might find useful</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((slug) => {
            const info = toolDescriptions[slug];
            if (!info) return null;
            return (
              <Link
                key={slug}
                href={`/${slug}/`}
                className="group rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {info.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{info.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Try it
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
