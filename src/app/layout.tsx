import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import JsonLd from "@/components/json-ld";
import { siteConfig, generateOrganizationSchema } from "@/lib/schema";

// basePath must match next.config.ts — Next.js metadata API does not auto-prepend it
const BASE_PATH = "/MetaClean";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Remove Metadata Instantly | Private & Client-Side`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "MetaClean" }],
  creator: "MetaClean",
  publisher: "MetaClean",
  icons: {
    icon: [
      { url: `${BASE_PATH}/favicon.svg`, type: "image/svg+xml" },
      { url: `${BASE_PATH}/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
      { url: `${BASE_PATH}/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: `${BASE_PATH}/apple-touch-icon.png`, sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: `${BASE_PATH}/android-chrome-192x192.png`, sizes: "192x192", type: "image/png" },
      { url: `${BASE_PATH}/android-chrome-512x512.png`, sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: `${BASE_PATH}/site.webmanifest`,
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
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <meta name="theme-color" content="#635BFF" />
        <meta name="msapplication-TileColor" content="#635BFF" />
        <meta name="msapplication-TileImage" content={`${BASE_PATH}/android-chrome-192x192.png`} />
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            defer
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            src={process.env.NEXT_PUBLIC_UMAMI_URL || "https://analytics.example.com/script.js"}
          />
        )}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={generateOrganizationSchema()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
