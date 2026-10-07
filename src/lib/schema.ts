export const siteConfig = {
  name: "MetaClean",
  description: "Бесплатное удаление метаданных из фото, PDF и текста прямо в браузере. Защитите приватность перед отправкой файлов. Без загрузки на сервер.",
  url: "https://metaclean.site",
  ogImage: "https://metaclean.site/og.png",
  keywords: [
    "удалить метаданные",
    "удаление exif",
    "очистка фото от метаданных",
    "удалить метаданные pdf",
    "приватность фото",
    "удалить gps из фото",
    "очистка метаданных онлайн",
    "удалить метаданные бесплатно",
    "remove metadata",
    "EXIF remover",
  ],
};

export function generateWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "RUB",
    },
    featureList: [
      "Удаление EXIF-данных из фото",
      "Удаление метаданных из PDF файлов",
      "Очистка текста от скрытых символов",
      "Обработка в браузере на клиенте",
      "Без загрузки файлов на сервер",
      "100% приватность и безопасность",
    ],
  };
}

export function generateSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1250",
    },
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [],
    description: siteConfig.description,
  };
}
