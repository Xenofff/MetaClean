"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import UploadZone from "@/components/upload-zone";
import MetadataTable from "@/components/metadata-table";
import JsonLd from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  extractPDFMetadata,
  removePDFMetadata,
  verifyPDFMetadataRemoval,
  type PDFMetadata,
  type PDFVerificationResult,
} from "@/lib/metadata/pdf-processor";
import {
  calculatePDFPrivacyScore,
  getScoreColor,
  getScoreBgColor,
  getRiskLevelColor,
  type PrivacyScoreResult,
} from "@/lib/privacy-score";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { useLanguage } from "@/lib/i18n/context";

export default function RemovePDFMetadataPage() {
  const { lang, t } = useLanguage();
  const isRu = lang === "ru";

  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<PDFMetadata | null>(null);
  const [beforeScore, setBeforeScore] = useState<PrivacyScoreResult | null>(null);
  const [cleanedBlob, setCleanedBlob] = useState<Blob | null>(null);
  const [afterScore, setAfterScore] = useState<PrivacyScoreResult | null>(null);
  const [verification, setVerification] = useState<PDFVerificationResult | null>(null);
  const [showAfter, setShowAfter] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState({
    removeAuthor: true,
    removeTitle: true,
    removeSubject: true,
    removeCreator: true,
    removeProducer: true,
    removeKeywords: true,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isRu ? "Главная" : "Home", url: "/" },
    { name: isRu ? "Удалить метаданные PDF" : "Remove PDF Metadata", url: "/remove-pdf-metadata/" },
  ]);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    const selectedFile = files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setCleanedBlob(null);
    setAfterScore(null);
    setVerification(null);
    setShowAfter(false);
    setIsProcessing(true);

    try {
      const extractedMetadata = await extractPDFMetadata(selectedFile);
      setMetadata(extractedMetadata);
      setBeforeScore(calculatePDFPrivacyScore(extractedMetadata as Record<string, unknown>));
    } catch (error) {
      console.error("Failed to extract metadata:", error);
      setMetadata({});
      setBeforeScore(calculatePDFPrivacyScore({}));
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleClean = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const blob = await removePDFMetadata(file, options);
      setCleanedBlob(blob);

      const ver = await verifyPDFMetadataRemoval(file, blob, options);
      setVerification(ver);
      setAfterScore(calculatePDFPrivacyScore(ver.after as Record<string, unknown>));
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

  const hasMetadata =
    metadata &&
    Object.keys(metadata).filter(
      (k) => (metadata as Record<string, unknown>)[k] !== undefined && (metadata as Record<string, unknown>)[k] !== null && (metadata as Record<string, unknown>)[k] !== ""
    ).length > 0;

  const optionsList = [
    {
      key: "removeAuthor",
      label: isRu ? "Удалить автора" : "Remove Author",
      description: isRu ? "Имя создателя документа" : "Author name",
    },
    {
      key: "removeTitle",
      label: isRu ? "Удалить заголовок" : "Remove Title",
      description: isRu ? "Название документа" : "Document title",
    },
    {
      key: "removeSubject",
      label: isRu ? "Удалить тему" : "Remove Subject",
      description: isRu ? "Тема и описание документа" : "Document subject",
    },
    {
      key: "removeCreator",
      label: isRu ? "Удалить программу создания" : "Remove Creator",
      description: isRu ? "ПО, в котором создан документ" : "Creation software",
    },
    {
      key: "removeProducer",
      label: isRu ? "Удалить программу конвертации" : "Remove Producer",
      description: isRu ? "Движок генерации PDF" : "PDF producer",
    },
    {
      key: "removeKeywords",
      label: isRu ? "Удалить ключевые слова" : "Remove Keywords",
      description: isRu ? "Теги поиска документа" : "Search keywords",
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">{t("nav.home")}</Link>
          <span>/</span>
          <span className="text-foreground">{t("tool.pdf_metadata")}</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {isRu ? "Инструмент для PDF" : "PDF Tool"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {isRu ? "Удаление метаданных из PDF" : "Remove PDF Metadata"}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRu
              ? "Удаляйте имя автора, название, программу создания и ключевые слова из документов PDF. Содержимое документа сохраняется неизменным."
              : "Remove author, title, creator, producer, and keywords from your PDF documents. Content is preserved while metadata is cleaned."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Badge variant="outline">PDF</Badge>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <UploadZone
              onFilesSelected={handleFilesSelected}
              accept=".pdf"
              label={t("ui.drop_pdf")}
              description={t("ui.click_browse_formats", { formats: "PDF" })}
            />

            {/* Empty State */}
            {metadata && !hasMetadata && !isProcessing && (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-success mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-semibold text-foreground">
                  {isRu ? "Метаданные в PDF не обнаружены" : "No PDF metadata found"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {isRu ? "Этот документ PDF уже полностью чист." : "This PDF appears to be clean already."}
                </p>
              </div>
            )}

            {/* Metadata Analysis */}
            {hasMetadata && (
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
                        {(metadata as Record<string, unknown>).Author && <Badge variant="warning">{isRu ? "Найден автор" : "Author Found"}</Badge>}
                        {(metadata as Record<string, unknown>).Title && <Badge variant="warning">{isRu ? "Найден заголовок" : "Title Found"}</Badge>}
                        {(metadata as Record<string, unknown>).Creator && <Badge variant="outline">{isRu ? "Найдена программа" : "Creator Found"}</Badge>}
                        {!hasMetadata && <Badge variant="success">{t("ui.clean")}</Badge>}
                      </>
                    )}
                  </div>

                  <MetadataTable
                    metadata={(showAfter ? (verification?.after || {}) : metadata) as Record<string, unknown>}
                    title={showAfter ? t("ui.after_cleaning") : t("ui.before_cleaning")}
                  />
                </div>

                {/* Cleaning Options */}
                {!showAfter && (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">{t("ui.cleaning_options")}</h2>
                    <div className="space-y-3">
                      {optionsList.map((option) => (
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

                {/* Verification Results */}
                {showAfter && verification && (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                      {isRu ? "Результаты очистки" : "Cleaning Results"}
                    </h2>

                    {verification.removedFields.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                          {isRu ? "Удаленные поля" : "Removed Fields"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {verification.removedFields.map((field) => (
                            <span key={field} className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {verification.verifiedClean && (
                      <div className="mt-4 flex items-center gap-2 rounded-lg bg-success/5 border border-success/20 p-3">
                        <svg className="h-5 w-5 text-success fill-none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-success">
                          {isRu ? "PDF успешно очищен — метаданные удалены" : "PDF successfully cleaned — no metadata remains"}
                        </span>
                      </div>
                    )}
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
                      {isRu ? "Скачать очищенный PDF" : "Download Cleaned PDF"}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Privacy Score */}
            {beforeScore && (
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="border-b border-border bg-muted/50 px-6 py-4">
                  <h3 className="text-sm font-semibold text-foreground">{t("risk.score_title")}</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${showAfter && afterScore ? getScoreBgColor(afterScore.score) : getScoreBgColor(beforeScore.score)}`}>
                      <span className={`text-xl font-bold ${showAfter && afterScore ? getScoreColor(afterScore.score) : getScoreColor(beforeScore.score)}`}>
                        {showAfter && afterScore ? afterScore.score : beforeScore.score}
                      </span>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${showAfter && afterScore ? getRiskLevelColor(afterScore.riskLevel) : getRiskLevelColor(beforeScore.riskLevel)}`}>
                        {showAfter && afterScore ? afterScore.riskLevel : beforeScore.riskLevel}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {showAfter && afterScore ? afterScore.summary : beforeScore.summary}
                      </p>
                    </div>
                  </div>

                  <div className="h-2 rounded-full bg-muted overflow-hidden mb-4">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        (showAfter && afterScore ? afterScore.score : beforeScore.score) >= 90
                          ? "bg-success"
                          : (showAfter && afterScore ? afterScore.score : beforeScore.score) >= 70
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                      style={{ width: `${showAfter && afterScore ? afterScore.score : beforeScore.score}%` }}
                    />
                  </div>

                  {(showAfter && afterScore ? afterScore.issues : beforeScore.issues).length > 0 && (
                    <div className="space-y-2">
                      {(showAfter && afterScore ? afterScore.issues : beforeScore.issues).map((issue, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <span className={`mt-0.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                            issue.severity === "high" ? "bg-danger" : issue.severity === "medium" ? "bg-warning" : "bg-muted-foreground"
                          }`} />
                          <span className="text-muted-foreground">{issue.category}: {issue.description}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* What We Remove */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">{t("ui.what_we_remove")}</h3>
              <ul className="space-y-3">
                {[
                  { icon: "👤", text: isRu ? "Имя автора" : "Author name" },
                  { icon: "📝", text: isRu ? "Заголовок документа" : "Document title" },
                  { icon: "📋", text: isRu ? "Тема" : "Subject" },
                  { icon: "🛠️", text: isRu ? "Программа создания" : "Creator information" },
                  { icon: "⚙️", text: isRu ? "Движок генерации PDF" : "Producer details" },
                  { icon: "🏷️", text: isRu ? "Ключевые слова" : "Keywords" },
                  { icon: "📅", text: isRu ? "Даты создания и изменения" : "Creation & modification dates" },
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Safety */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {isRu ? "Содержимое защищено" : "Your Content Is Safe"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isRu
                  ? "Удаляются только метаданные. Текст, изображения, таблицы и форматирование PDF остаются неизменными."
                  : "Only metadata is removed. Your PDF content, images, and formatting remain exactly the same."}
              </p>
            </div>

            {/* Privacy */}
            <div className="rounded-xl border border-border bg-primary/5 p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-sm font-semibold text-foreground">{t("ui.private_guarantee_title")}</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                {isRu
                  ? "Ваши документы никогда не отправляются на сервер. Вся обработка происходит локально в браузере."
                  : "Your PDFs never leave your device. All processing happens locally in your browser."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
