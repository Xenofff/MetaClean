import type { Metadata } from "next";
import { siteConfig } from "@/lib/schema";
import { PAGE_METADATA } from "@/lib/i18n/dictionary";

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
  const pageMetaRu = PAGE_METADATA[config.canonical]?.ru;

  const title = pageMetaRu?.title || config.title;
  const description = pageMetaRu?.desc || config.description;

  return {
    title,
    description,
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
      locale: "ru_RU",
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
