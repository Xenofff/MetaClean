"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import UploadZone from "@/components/upload-zone";
import MetadataTable from "@/components/metadata-table";
import RiskReport from "@/components/risk-report";
import JsonLd from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { extractImageMetadata, type ImageMetadata } from "@/lib/metadata/image-processor";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { useLanguage } from "@/lib/i18n/context";

export default function ExifViewerPage() {
  const { lang } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: lang === "ru" ? "Главная" : "Home", url: "/" },
    { name: lang === "ru" ? "EXIF просмотрщик" : "EXIF Viewer", url: "/exif-viewer/" },
  ]);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    const selectedFile = files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsProcessing(true);

    try {
      const extractedMetadata = await extractImageMetadata(selectedFile);
      setMetadata(extractedMetadata);
    } catch (error) {
      console.error("Failed to extract metadata:", error);
      setMetadata({});
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const filteredMetadata = metadata
    ? Object.fromEntries(
        Object.entries(metadata).filter(([key, value]) => {
          if (!searchQuery) return true;
          const query = searchQuery.toLowerCase();
          return (
            key.toLowerCase().includes(query) ||
            String(value).toLowerCase().includes(query)
          );
        })
      )
    : null;

  const metadataCount = metadata ? Object.keys(metadata).length : 0;
  const filteredCount = filteredMetadata ? Object.keys(filteredMetadata).length : 0;

  const categoryIcons: Record<string, string> = {
    camera: "📷",
    lens: "🔭",
    gps: "📍",
    date: "🕐",
    software: "💻",
    author: "👤",
    image: "🖼️",
    exif: "📋",
    gpsinfo: "📍",
    interoperability: "🔗",
  };

  const categoryNames: Record<string, { en: string; ru: string }> = {
    camera: { en: "Camera", ru: "Камера" },
    lens: { en: "Lens", ru: "Объектив" },
    gps: { en: "GPS", ru: "GPS" },
    date: { en: "Date", ru: "Дата" },
    software: { en: "Software", ru: "ПО" },
    author: { en: "Author", ru: "Автор" },
    image: { en: "Image", ru: "Изображение" },
  };

  function getCategoryFromKey(key: string): string {
    const lower = key.toLowerCase();
    if (lower.includes("make") || lower.includes("model") || lower.includes("camera")) return "camera";
    if (lower.includes("lens")) return "lens";
    if (lower.includes("gps") || lower.includes("latitude") || lower.includes("longitude")) return "gps";
    if (lower.includes("date") || lower.includes("time")) return "date";
    if (lower.includes("software") || lower.includes("creator")) return "software";
    if (lower.includes("author") || lower.includes("artist")) return "author";
    return "image";
  }

  const categoryList = [
    { icon: "📷", text: lang === "ru" ? "Марка и модель камеры" : "Camera make & model" },
    { icon: "🔭", text: lang === "ru" ? "Информация об объективе" : "Lens information" },
    { icon: "📍", text: lang === "ru" ? "Координаты GPS" : "GPS coordinates" },
    { icon: "🕐", text: lang === "ru" ? "Дата и время съемки" : "Date & time" },
    { icon: "💻", text: lang === "ru" ? "Использованное ПО" : "Software used" },
    { icon: "👤", text: lang === "ru" ? "Информация об авторе" : "Author information" },
    { icon: "🖼️", text: lang === "ru" ? "Параметры снимка" : "Image settings" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">
            {lang === "ru" ? "Главная" : "Home"}
          </Link>
          <span>/</span>
          <span className="text-foreground">
            {lang === "ru" ? "EXIF просмотрщик" : "EXIF Viewer"}
          </span>
        </nav>

        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {lang === "ru" ? "Инспектор" : "Inspector"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {lang === "ru" ? "Просмотр EXIF метаданных" : "EXIF Metadata Viewer"}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {lang === "ru"
              ? "Просматривайте все метаданные, встроенные в ваши фото. Перетащите любое изображение, чтобы просмотреть полные данные EXIF."
              : "Inspect all metadata embedded in your photos. Drag and drop any image to view its complete EXIF data."}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <UploadZone
              onFilesSelected={handleFilesSelected}
              accept=".jpg,.jpeg,.png,.webp"
              label={lang === "ru" ? "Перетащите изображение сюда" : "Drop your image here"}
              description={lang === "ru" ? "или нажмите для выбора (JPG, PNG, WEBP)" : "or click to browse to inspect metadata"}
            />

            {isProcessing && (
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <svg className="mx-auto h-8 w-8 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lang === "ru" ? "Анализ метаданных..." : "Analyzing metadata..."}
                </p>
              </div>
            )}

            {metadata && !isProcessing && (
              <div className="space-y-4">
                {/* File Info */}
                {file && (
                  <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB &middot; {metadataCount}{" "}
                        {lang === "ru" ? "полей метаданных найдено" : "metadata fields found"}
                      </p>
                    </div>
                    <Badge variant={metadataCount > 0 ? "warning" : "success"}>
                      {metadataCount > 0
                        ? lang === "ru"
                          ? "Есть метаданные"
                          : "Has Metadata"
                        : lang === "ru"
                        ? "Чисто"
                        : "Clean"}
                    </Badge>
                  </div>
                )}

                {/* Search */}
                {metadataCount > 0 && (
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder={lang === "ru" ? "Поиск по полям метаданных..." : "Search metadata fields..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      aria-label={lang === "ru" ? "Поиск метаданных" : "Search metadata"}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={lang === "ru" ? "Очистить поиск" : "Clear search"}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}

                {/* Category Quick Filters */}
                {metadataCount > 0 && !searchQuery && (
                  <div className="flex flex-wrap gap-2">
                    {["camera", "gps", "date", "software", "author"].map((cat) => {
                      const count = Object.keys(metadata).filter((k) => getCategoryFromKey(k) === cat).length;
                      if (count === 0) return null;
                      const label = categoryNames[cat]?.[lang] || (cat.charAt(0).toUpperCase() + cat.slice(1));
                      return (
                        <button
                          key={cat}
                          onClick={() => setSearchQuery(cat)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
                        >
                          <span>{categoryIcons[cat]}</span>
                          {label}
                          <span className="text-muted-foreground/60">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Metadata Table */}
                {filteredMetadata && Object.keys(filteredMetadata).length > 0 ? (
                  <div>
                    {searchQuery && (
                      <p className="text-xs text-muted-foreground mb-3">
                        {lang === "ru"
                          ? `Показано ${filteredCount} из ${metadataCount} полей`
                          : `Showing ${filteredCount} of ${metadataCount} fields`}
                      </p>
                    )}
                    <MetadataTable metadata={filteredMetadata} title={lang === "ru" ? "Поля метаданных" : "Metadata Fields"} />
                  </div>
                ) : searchQuery ? (
                  <div className="rounded-xl border border-border bg-card p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      {lang === "ru" ? "По вашему запросу поля метаданных не найдены." : "No metadata fields match your search."}
                    </p>
                  </div>
                ) : null}

                {metadataCount === 0 && (
                  <div className="rounded-xl border border-border bg-card p-6 text-center">
                    <svg className="mx-auto h-10 w-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {lang === "ru" ? "Метаданные не найдены" : "No metadata found"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {lang === "ru" ? "Это изображение чистое от скрытых метаданных." : "This image appears to be clean."}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {metadata && <RiskReport metadata={metadata} />}

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {lang === "ru" ? "Категории метаданных" : "Metadata Categories"}
              </h3>
              <ul className="space-y-3">
                {categoryList.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-primary/5 p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-sm font-semibold text-foreground">
                  {lang === "ru" ? "100% конфиденциально" : "100% Private"}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                {lang === "ru"
                  ? "Анализ метаданных выполняется полностью в вашем браузере. Ваши фотографии никогда не покидают устройство."
                  : "Metadata inspection happens entirely in your browser. Your photos never leave your device."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
