import type { Metadata } from "next";
import { siteConfig } from "@/lib/schema";

interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage?: string;
}

export function generatePageSEO(config: PageSEO): Metadata {
  const url = `${siteConfig.url}${config.canonical}`;
  const ogImage = config.ogImage || siteConfig.ogImage;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: "MetaClean" }],
    creator: "MetaClean",
    publisher: "MetaClean",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: siteConfig.name,
      title: config.title,
      description: config.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

export function generateToolFAQ(toolName: string, faqs: FAQItem[]): FAQItem[] {
  return faqs;
}
