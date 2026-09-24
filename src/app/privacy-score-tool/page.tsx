"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import UploadZone from "@/components/upload-zone";
import MetadataTable from "@/components/metadata-table";
import RiskReport from "@/components/risk-report";
import JsonLd from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import {
  extractImageMetadata,
  type ImageMetadata,
} from "@/lib/metadata/image-processor";
import {
  calculatePrivacyScore,
  getScoreColor,
  getRiskLevelColor,
  getRiskLevelBgColor,
  type PrivacyScoreResult,
} from "@/lib/privacy-score";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { useLanguage } from "@/lib/i18n/context";

export default function PrivacyScorePage() {
  const { lang } = useLanguage();
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [scoreResult, setScoreResult] = useState<PrivacyScoreResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: lang === "ru" ? "Главная" : "Home", url: "/" },
    { name: lang === "ru" ? "Оценка приватности" : "Privacy Score", url: "/privacy-score-tool/" },
  ]);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    const selectedFile = files[0];
    if (!selectedFile) return;

    setIsProcessing(true);

    try {
      const extractedMetadata = await extractImageMetadata(selectedFile);
      setMetadata(extractedMetadata);
      const score = calculatePrivacyScore(extractedMetadata as Record<string, unknown>);
      setScoreResult(score);
    } catch (error) {
      console.error("Failed to extract metadata:", error);
      setMetadata({});
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const riskLevelLabels: Record<string, { en: string; ru: string }> = {
    "Safe": { en: "Safe", ru: "Безопасно" },
    "Low Risk": { en: "Low Risk", ru: "Низкий риск" },
    "Medium Risk": { en: "Medium Risk", ru: "Умеренный риск" },
    "High Risk": { en: "High Risk", ru: "Высокий риск" },
    "Critical": { en: "Critical", ru: "Критический риск" },
  };

  const circumference = 2 * Math.PI * 55;

  const breakdownItems = metadata
    ? [
        {
          label: lang === "ru" ? "Координаты GPS" : "GPS Location",
          penalty: -40,
          detected: !!metadata.GPSLatitude,
          description: lang === "ru" ? "Раскрывает точное географическое положение" : "Reveals your exact location",
        },
        {
          label: lang === "ru" ? "Информация об устройстве" : "Device Information",
          penalty: -20,
          detected: !!(metadata.Make || metadata.Model),
          description: lang === "ru" ? "Идентифицирует модель телефона или камеры" : "Identifies your phone or camera",
        },
        {
          label: lang === "ru" ? "Метки времени" : "Timestamps",
          penalty: -10,
          detected: !!metadata.DateTimeOriginal,
          description: lang === "ru" ? "Указывает точное время съемки" : "Reveals when photo was taken",
        },
        {
          label: lang === "ru" ? "Информация об авторе" : "Author Information",
          penalty: -10,
          detected: !!(metadata.Author || metadata.artist),
          description: lang === "ru" ? "Связывает файл с вашей личностью" : "Links to your identity",
        },
        {
          label: lang === "ru" ? "Теги программного обеспечения" : "Software Tags",
          penalty: -10,
          detected: !!metadata.Software,
          description: lang === "ru" ? "Показывает использованные редакторы" : "Reveals your editing tools",
        },
      ]
    : [];

  const howScoringWorksItems = [
    { label: lang === "ru" ? "GPS координаты" : "GPS Location", points: "-40", color: "text-danger" },
    { label: lang === "ru" ? "Данные устройства" : "Device Info", points: "-20", color: "text-orange-500" },
    { label: lang === "ru" ? "Метки времени" : "Timestamps", points: "-10", color: "text-warning" },
    { label: lang === "ru" ? "Автор" : "Author", points: "-10", color: "text-warning" },
    { label: lang === "ru" ? "ПО" : "Software", points: "-10", color: "text-muted-foreground" },
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
            {lang === "ru" ? "Оценка приватности" : "Privacy Score"}
          </span>
        </nav>

        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {lang === "ru" ? "Инструмент оценки" : "Score Tool"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {lang === "ru" ? "Калькулятор индекса приватности" : "Privacy Score Calculator"}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {lang === "ru"
              ? "Проанализируйте ваши фотографии и получите индекс приватности от 0 до 100. Узнайте точные риски метаданных в ваших файлах."
              : "Analyze your photos and get a privacy score from 0-100. See exactly what metadata risks your files contain."}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <UploadZone
              onFilesSelected={handleFilesSelected}
              accept=".jpg,.jpeg,.png,.webp"
              label={lang === "ru" ? "Перетащите изображение сюда" : "Drop your image here"}
              description={lang === "ru" ? "или нажмите для выбора (JPG, PNG, WEBP)" : "or click to browse to calculate privacy score"}
            />

            {isProcessing && (
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <svg className="mx-auto h-8 w-8 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lang === "ru" ? "Расчет индекса приватности..." : "Calculating privacy score..."}
                </p>
              </div>
            )}

            {metadata && scoreResult && !isProcessing && (
              <div className="space-y-6">
                {/* Score Hero */}
                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    {/* Score Circle */}
                    <div className="relative shrink-0">
                      <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
                        <circle
                          cx="60"
                          cy="60"
                          r="55"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="10"
                          className="text-muted"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="55"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="10"
                          strokeDasharray={circumference}
                          strokeDashoffset={circumference - (scoreResult.score / 100) * circumference}
                          strokeLinecap="round"
                          className={getScoreColor(scoreResult.score)}
                          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-4xl font-bold ${getScoreColor(scoreResult.score)}`}>
                          {scoreResult.score}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {lang === "ru" ? "из 100" : "out of 100"}
                        </span>
                      </div>
                    </div>

                    {/* Score Details */}
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center gap-3 justify-center sm:justify-start mb-2">
                        <span className="text-3xl font-bold text-foreground">{scoreResult.grade}</span>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getRiskLevelBgColor(scoreResult.riskLevel)} ${getRiskLevelColor(scoreResult.riskLevel)}`}>
                          {riskLevelLabels[scoreResult.riskLevel]?.[lang] || scoreResult.riskLevel}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {lang === "ru" && scoreResult.riskLevel === "Safe"
                          ? "Отлично! В этом файле нет скрытых уязвимостей приватности."
                          : lang === "ru" && scoreResult.riskLevel === "Low Risk"
                          ? "Низкий риск: обнаружены незначительные технические метаданные."
                          : lang === "ru" && scoreResult.riskLevel === "Medium Risk"
                          ? "Умеренный риск: присутствуют метаданные времени, автора или устройства."
                          : lang === "ru" && (scoreResult.riskLevel === "High Risk" || scoreResult.riskLevel === "Critical")
                          ? "Высокий риск: обнаружены GPS координаты или критические данные устройства."
                          : scoreResult.summary}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scoring Breakdown */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    {lang === "ru" ? "Детализация оценки" : "Scoring Breakdown"}
                  </h2>
                  <div className="space-y-4">
                    {breakdownItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.detected ? "bg-danger/10 text-danger" : "bg-success/10 text-success"}`}>
                          {item.detected ? (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          ) : (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground">{item.label}</p>
                            <span className={`text-xs font-medium ${item.detected ? "text-danger" : "text-success"}`}>
                              {item.detected
                                ? `${item.penalty} ${lang === "ru" ? "балл." : "pts"}`
                                : lang === "ru"
                                ? "Чисто"
                                : "Clean"}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metadata */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    {lang === "ru" ? "Обнаруженные метаданные" : "Detected Metadata"}
                  </h2>
                  <MetadataTable metadata={metadata} />
                </div>
              </div>
            )}

            {!metadata && !isProcessing && (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {lang === "ru"
                    ? "Загрузите изображение для расчета индекса приватности"
                    : "Upload an image to calculate its privacy score"}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {metadata && <RiskReport metadata={metadata} />}

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {lang === "ru" ? "Как рассчитывается оценка" : "How Scoring Works"}
              </h3>
              <div className="space-y-3">
                {howScoringWorksItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className={`font-mono font-medium ${item.color}`}>{item.points}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">
                    {lang === "ru" ? "Без метаданных" : "No Metadata"}
                  </span>
                  <span className="font-mono font-medium text-success">100</span>
                </div>
              </div>
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
                  ? "Расчет оценки выполняется полностью в вашем браузере. Ваши фотографии никогда не покидают устройство."
                  : "Score calculation happens entirely in your browser. Your photos never leave your device."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
