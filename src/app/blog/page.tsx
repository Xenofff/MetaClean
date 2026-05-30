import Link from "next/link";
import JsonLd from "@/components/json-ld";
import { generateBreadcrumbSchema, siteConfig } from "@/lib/schema";
import { blogArticles } from "@/lib/blog-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Privacy Tips & Metadata Removal Guides | MetaClean",
  description: "Learn how to protect your digital privacy. Guides on removing metadata from photos, PDFs, and text files. Expert tips for online safety.",
  keywords: ["privacy blog", "metadata removal guide", "EXIF data", "digital privacy tips", "photo privacy", "metadata security"],
  alternates: {
    canonical: `${siteConfig.url}/blog/`,
  },
};

export default function BlogPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
  ]);

  const allPosts = blogArticles.map((article) => ({
    title: article.title,
    description: article.description,
    href: `/blog/${article.slug}/`,
    readTime: article.readTime,
    date: article.date,
    category: article.category,
  }));

  const categories = ["All", ...Array.from(new Set(blogArticles.map((a) => a.category)))];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground">Blog</span>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Privacy Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn how to protect your digital privacy with our comprehensive guides, tutorials, and expert tips.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {blogArticles.length} articles covering metadata removal, privacy tools, and security best practices.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground"
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 text-muted-foreground/60">
                  ({blogArticles.filter((a) => a.category === cat).length})
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Article Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allPosts.map((post, index) => (
            <Link
              key={index}
              href={post.href}
              className="group rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground">{post.readTime}</span>
              </div>

              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h2>

              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{post.date}</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read more
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* SEO Content Section */}
        <section className="mt-16 py-12 border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">About MetaClean Blog</h2>
            <p className="text-muted-foreground">
              Our blog covers everything you need to know about digital privacy and metadata security.
              From understanding what metadata is stored in your photos to learning how to remove it,
              we provide comprehensive guides for every privacy concern.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/remove-photo-metadata/"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
              >
                Try Photo Remover
              </Link>
              <Link
                href="/exif-viewer/"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                View EXIF Data
              </Link>
              <Link
                href="/privacy-score-tool/"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Check Privacy Score
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
