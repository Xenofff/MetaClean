"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";

export default function Footer() {
  const { lang, setLang, t } = useLanguage();

  const footerLinks = {
    tools: [
      { name: t("tool.photo_metadata"), href: "/remove-photo-metadata/" },
      { name: t("tool.gps_remover"), href: "/remove-gps-from-photo/" },
      { name: t("tool.exif_viewer"), href: "/exif-viewer/" },
      { name: t("tool.social_media_cleaner"), href: "/social-media-cleaner/" },
      { name: t("tool.batch_remover"), href: "/batch-metadata-remover/" },
      { name: t("tool.privacy_score"), href: "/privacy-score-tool/" },
      { name: t("tool.pdf_metadata"), href: "/remove-pdf-metadata/" },
      { name: t("tool.text_cleaner"), href: "/remove-text-metadata/" },
    ],
    resources: [
      { name: t("nav.blog"), href: "/blog/" },
      { name: t("footer.privacy_guide"), href: "/privacy-guide/" },
      { name: t("footer.how_to_remove_exif"), href: "/blog/how-to-remove-exif-data/" },
      { name: t("footer.pdf_guide"), href: "/blog/remove-metadata-from-pdfs/" },
      { name: t("footer.gps_risks"), href: "/blog/gps-metadata-danger/" },
    ],
    legal: [
      { name: t("footer.privacy_policy"), href: "/privacy/" },
      { name: t("footer.terms"), href: "/terms/" },
    ],
  };

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
              {t("footer.desc")}
            </p>
            <div className="flex items-center gap-2 text-xs text-success">
              <span className="h-2 w-2 rounded-full bg-success"></span>
              {t("footer.client_side")}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t("footer.tools")}</h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t("footer.resources")}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
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
            {t("footer.rights", { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success"></span>
              {t("footer.no_data")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
              {t("footer.open_source")}
            </span>

            {/* Quick language toggle */}
            <div className="flex items-center rounded-lg border border-border bg-white p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`rounded px-2 py-0.5 transition-colors ${lang === "en" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("ru")}
                className={`rounded px-2 py-0.5 transition-colors ${lang === "ru" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                RU
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
