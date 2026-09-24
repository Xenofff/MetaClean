"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import UploadZone from "@/components/upload-zone";
import MetadataTable from "@/components/metadata-table";
import RiskReport from "@/components/risk-report";
import JsonLd from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  extractImageMetadata,
  removeImageMetadata,
  hasGPSData,
  hasDeviceData,
  type ImageMetadata,
} from "@/lib/metadata/image-processor";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { useLanguage } from "@/lib/i18n/context";

export default function RemovePhotoMetadataPage() {
  const { lang, t } = useLanguage();
  const isRu = lang === "ru";

  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [cleanedMetadata, setCleanedMetadata] = useState<ImageMetadata | null>(null);
  const [cleanedBlob, setCleanedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAfter, setShowAfter] = useState(false);
  const [options, setOptions] = useState({
    removeGPS: true,
    removeCamera: true,
    removeDevice: true,
    removeSoftware: true,
    removeTimestamp: true,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isRu ? "Главная" : "Home", url: "/" },
    { name: isRu ? "Удалить метаданные фото" : "Remove Photo Metadata", url: "/remove-photo-metadata/" },
  ]);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    const selectedFile = files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setCleanedBlob(null);
    setCleanedMetadata(null);
    setShowAfter(false);
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

  const handleClean = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const blob = await removeImageMetadata(file, options);
      setCleanedBlob(blob);

      const cleanedFile = new File([blob], file.name, { type: file.type });
      const cleanedMeta = await extractImageMetadata(cleanedFile);
      setCleanedMetadata(cleanedMeta);
      setShowAfter(true);
    } catch (error) {
      console.error("Failed to clean metadata:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!cleanedBlob || !file) return;

    const url = URL.createObjectURL(cleanedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cleaned-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const cleaningOptionsList = [
    { key: "removeGPS", label: t("ui.remove_gps"), description: t("ui.remove_gps_desc") },
    { key: "removeCamera", label: t("ui.remove_camera"), description: t("ui.remove_camera_desc") },
    { key: "removeDevice", label: t("ui.remove_device"), description: t("ui.remove_device_desc") },
    { key: "removeSoftware", label: t("ui.remove_software"), description: t("ui.remove_software_desc") },
    { key: "removeTimestamp", label: t("ui.remove_timestamp"), description: t("ui.remove_timestamp_desc") },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">{t("nav.home")}</Link>
          <span>/</span>
          <span className="text-foreground">{t("tool.photo_metadata")}</span>
        </nav>

        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {isRu ? "Инструмент для фото" : "Image Tool"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {isRu ? "Удаление метаданных из фотографий" : "Remove Photo Metadata"}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRu
              ? "Удаляйте данные EXIF, GPS-координаты, параметры камеры и временные метки. Вся обработка происходит прямо в вашем браузере."
              : "Remove EXIF data, GPS coordinates, camera information, and timestamps from your photos. All processing happens in your browser."}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["JPG", "JPEG", "PNG", "WEBP"].map((format) => (
              <Badge key={format} variant="outline">{format}</Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <UploadZone
              onFilesSelected={handleFilesSelected}
              accept=".jpg,.jpeg,.png,.webp"
              label={t("ui.drop_image")}
              description={t("ui.click_browse_formats", { formats: "JPG, PNG, WEBP" })}
            />

            {metadata && (
              <div className="space-y-4">
                {/* Before/After Toggle */}
                {cleanedBlob && (
                  <div className="flex items-center justify-center gap-2 p-1 bg-muted rounded-xl w-fit mx-auto">
                    <button
                      onClick={() => setShowAfter(false)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        !showAfter ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-pressed={!showAfter}
                    >
                      {t("ui.before")}
                    </button>
                    <button
                      onClick={() => setShowAfter(true)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        showAfter ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-pressed={showAfter}
                    >
                      {t("ui.after")}
                    </button>
                  </div>
                )}

                {/* Metadata Preview */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">
                      {showAfter ? t("ui.cleaned_metadata") : t("ui.detected_metadata")}
                    </h2>
                    {showAfter && (
                      <Badge variant="success">
                        <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {t("ui.cleaned")}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {showAfter ? (
                      <Badge variant="success">{t("ui.metadata_removed")}</Badge>
                    ) : (
                      <>
                        {hasGPSData(metadata) && <Badge variant="destructive">{t("ui.gps_found")}</Badge>}
                        {hasDeviceData(metadata) && <Badge variant="warning">{t("ui.device_found")}</Badge>}
                        {!hasGPSData(metadata) && !hasDeviceData(metadata) && <Badge variant="success">{t("ui.clean")}</Badge>}
                      </>
                    )}
                  </div>

                  <MetadataTable
                    metadata={showAfter ? (cleanedMetadata || {}) : metadata}
                    title={showAfter ? t("ui.after_cleaning") : t("ui.before_cleaning")}
                  />
                </div>

                {/* Cleaning Options */}
                {!showAfter && (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">{t("ui.cleaning_options")}</h2>
                    <div className="space-y-3">
                      {cleaningOptionsList.map((option) => (
                        <label
                          key={option.key}
                          className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={options[option.key as keyof typeof options]}
                              onChange={(e) =>
                                setOptions({ ...options, [option.key]: e.target.checked })
                              }
                              className="h-4 w-4 rounded border-border text-primary focus:ring-primary/50"
                            />
                            <div>
                              <p className="text-sm font-medium text-foreground">{option.label}</p>
                              <p className="text-xs text-muted-foreground">{option.description}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {!showAfter && (
                    <Button onClick={handleClean} disabled={isProcessing} className="flex-1">
                      {isProcessing ? (
                        <>
                          <svg className="h-4 w-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          {t("ui.processing")}
                        </>
                      ) : (
                        <>
                          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {t("ui.clean_metadata")}
                        </>
                      )}
                    </Button>
                  )}
                  {cleanedBlob && (
                    <Button onClick={handleDownload} variant="outline" className="flex-1">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {t("ui.download_cleaned")}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {metadata && <RiskReport metadata={metadata} />}

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">{t("ui.what_we_remove")}</h3>
              <ul className="space-y-3">
                {[
                  { icon: "📍", text: isRu ? "GPS-координаты" : "GPS coordinates" },
                  { icon: "📷", text: isRu ? "Марка и модель камеры" : "Camera make & model" },
                  { icon: "📱", text: isRu ? "Информация об устройстве" : "Device information" },
                  { icon: "💻", text: isRu ? "Метки софта и редакторов" : "Software tags" },
                  { icon: "🕐", text: isRu ? "Временные метки" : "Timestamps" },
                  { icon: "👤", text: isRu ? "Информация об авторе" : "Author information" },
                ].map((item, index) => (
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
                <h3 className="text-sm font-semibold text-foreground">{t("ui.private_guarantee_title")}</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("ui.private_guarantee_desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
