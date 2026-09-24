"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";

const toolDescriptions: Record<string, { title: string; titleRu: string; description: string; descriptionRu: string }> = {
  "remove-photo-metadata": {
    title: "Photo Metadata Remover",
    titleRu: "Очистка метаданных фото",
    description: "Remove EXIF data, GPS, camera info from photos",
    descriptionRu: "Удаление данных EXIF, GPS и параметров камеры с фото",
  },
  "remove-gps-from-photo": {
    title: "GPS Remover",
    titleRu: "Удаление GPS",
    description: "Extract and remove GPS coordinates from photos",
    descriptionRu: "Извлечение и удаление GPS-координат из фотографий",
  },
  "exif-viewer": {
    title: "EXIF Viewer",
    titleRu: "Просмотр EXIF",
    description: "Inspect all metadata in your photos",
    descriptionRu: "Просмотр и анализ всех скрытых метаданных в фото",
  },
  "social-media-cleaner": {
    title: "Social Media Cleaner",
    titleRu: "Очистка для соцсетей",
    description: "Clean photos before posting online",
    descriptionRu: "Подготовка и очистка фото перед публикацией в сети",
  },
  "batch-metadata-remover": {
    title: "Batch Remover",
    titleRu: "Пакетная очистка",
    description: "Clean multiple files at once",
    descriptionRu: "Одновременная очистка множества файлов",
  },
  "privacy-score": {
    title: "Privacy Score",
    titleRu: "Оценка приватности",
    description: "Calculate privacy score for your photos",
    descriptionRu: "Расчет индекса конфиденциальности ваших фото",
  },
  "remove-pdf-metadata": {
    title: "PDF Metadata Remover",
    titleRu: "Очистка метаданных PDF",
    description: "Remove author, title, keywords from PDFs",
    descriptionRu: "Удаление автора, названия и меток из PDF",
  },
  "remove-text-metadata": {
    title: "Text File Cleaner",
    titleRu: "Очистка текста",
    description: "Remove BOM, hidden Unicode from text files",
    descriptionRu: "Удаление BOM и невидимых символов Юникода",
  },
};

interface RelatedToolsProps {
  tools: string[];
}

export default function RelatedTools({ tools }: RelatedToolsProps) {
  const { lang, t } = useLanguage();
  const isRu = lang === "ru";

  if (!tools || tools.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            {t("ui.related_tools")}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            {isRu ? "Другие полезные инструменты для защиты приватности" : "More privacy tools you might find useful"}
          </p>
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
                  {isRu ? info.titleRu : info.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isRu ? info.descriptionRu : info.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {isRu ? "Открыть" : "Try it"}
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
