"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import UploadZone from "@/components/upload-zone";
import JsonLd from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cleanText, detectHiddenContent, type TextCleaningResult } from "@/lib/metadata/text-processor";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { useLanguage } from "@/lib/i18n/context";

export default function RemoveTextMetadataPage() {
  const { lang, t } = useLanguage();
  const isRu = lang === "ru";

  const [file, setFile] = useState<File | null>(null);
  const [originalContent, setOriginalContent] = useState("");
  const [detection, setDetection] = useState<ReturnType<typeof detectHiddenContent> | null>(null);
  const [result, setResult] = useState<TextCleaningResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState({
    removeUnicode: true,
    removeBOM: true,
    normalizeLineEndings: true,
    removeInvisibleChars: true,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isRu ? "Главная" : "Home", url: "/" },
    { name: isRu ? "Очистка текстовых файлов" : "Clean Text Files", url: "/remove-text-metadata/" },
  ]);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    const selectedFile = files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setResult(null);
    setIsProcessing(true);

    try {
      const content = await selectedFile.text();
      setOriginalContent(content);
      const detected = detectHiddenContent(content);
      setDetection(detected);
    } catch (error) {
      console.error("Failed to read file:", error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleClean = () => {
    if (!originalContent) return;

    setIsProcessing(true);
    try {
      const cleaningResult = cleanText(originalContent, options);
      setResult(cleaningResult);
    } catch (error) {
      console.error("Failed to clean text:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result || !file) return;

    const blob = new Blob([result.cleaned], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cleaned-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const hasIssues = detection && (
    detection.hasBOM || detection.hasInvisibleChars || detection.hasControlChars || detection.hasWeirdLineEndings
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">{t("nav.home")}</Link>
          <span>/</span>
          <span className="text-foreground">{t("tool.text_cleaner")}</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {isRu ? "Инструмент для текста" : "Text Tool"}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {isRu ? "Очистка текстовых файлов" : "Clean Text Files"}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRu
              ? "Удаляйте скрытые символы Юникода, метки BOM, невидимые трекеры и нормализуйте переносы строк."
              : "Remove hidden Unicode characters, BOM markers, and invisible tracking data from your text files."}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["TXT", "CSV", "JSON", "XML"].map((format) => (
              <Badge key={format} variant="outline">{format}</Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Zone */}
            <UploadZone
              onFilesSelected={handleFilesSelected}
              accept=".txt,.csv,.json,.xml"
              label={t("ui.drop_text")}
              description={t("ui.click_browse_formats", { formats: "TXT, CSV, JSON, XML" })}
            />

            {/* Detection Results */}
            {detection && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  {isRu ? "Результаты анализа" : "Scan Results"}
                </h2>

                <div className="space-y-3">
                  {[
                    { label: isRu ? "Метка BOM" : "BOM Characters", found: detection.hasBOM, icon: "🔢" },
                    { label: isRu ? "Невидимый Юникод" : "Invisible Unicode", found: detection.hasInvisibleChars, icon: "👻" },
                    { label: isRu ? "Управляющие символы" : "Control Characters", found: detection.hasControlChars, icon: "⌨️" },
                    { label: isRu ? "Нестандартные переносы строк" : "Inconsistent Line Endings", found: detection.hasWeirdLineEndings, icon: "↩️" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <span>{item.icon}</span>
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                      </div>
                      <Badge variant={item.found ? "destructive" : "success"}>
                        {item.found ? (isRu ? "Найдено" : "Found") : (isRu ? "Чисто" : "Clean")}
                      </Badge>
                    </div>
                  ))}
                </div>

                {detection.foundChars.length > 0 && (
                  <div className="mt-4 rounded-lg bg-muted p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      {isRu ? "Обнаруженные символы:" : "Found Characters:"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {detection.foundChars.slice(0, 10).map((char, index) => (
                        <code key={index} className="rounded bg-background px-2 py-1 text-xs font-mono">
                          {char}
                        </code>
                      ))}
                      {detection.foundChars.length > 10 && (
                        <span className="text-xs text-muted-foreground">
                          +{detection.foundChars.length - 10} {isRu ? "еще" : "more"}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cleaning Options */}
            {hasIssues && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">{t("ui.cleaning_options")}</h2>
                <div className="space-y-3">
                  {[
                    { key: "removeBOM", label: t("ui.remove_bom"), description: t("ui.remove_bom_desc") },
                    { key: "removeInvisibleChars", label: t("ui.remove_tracking"), description: t("ui.remove_tracking_desc") },
                    { key: "removeUnicode", label: isRu ? "Удалить управляющие символы" : "Remove Control Characters", description: isRu ? "Непечатные служебные байты" : "Non-printable characters" },
                    { key: "normalizeLineEndings", label: t("ui.normalize_lines"), description: t("ui.normalize_lines_desc") },
                  ].map((option) => (
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
            {hasIssues && (
              <div className="flex gap-3">
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
                      {isRu ? "Очистить текстовый файл" : "Clean Text File"}
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Results */}
            {result && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  {isRu ? "Результаты очистки" : "Cleaning Results"}
                </h2>

                <div className="grid gap-4 sm:grid-cols-3 mb-4">
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-2xl font-bold text-primary">{result.removedChars}</p>
                    <p className="text-xs text-muted-foreground">
                      {isRu ? "Символов удалено" : "Characters Removed"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-2xl font-bold text-primary">{result.changes.length}</p>
                    <p className="text-xs text-muted-foreground">
                      {isRu ? "Изменений внесено" : "Changes Made"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-2xl font-bold text-success">{result.cleaned.length}</p>
                    <p className="text-xs text-muted-foreground">
                      {isRu ? "Итоговая длина" : "Final Length"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {result.changes.map((change, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg className="h-4 w-4 text-success shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {change}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-3">
                  <Button onClick={handleDownload} className="flex-1">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {t("ui.download_cleaned")}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">{t("ui.what_we_remove")}</h3>
              <ul className="space-y-3">
                {[
                  { icon: "🔢", text: isRu ? "Метка BOM (Byte Order Mark)" : "BOM (Byte Order Mark)" },
                  { icon: "👻", text: isRu ? "Невидимые символы Юникода" : "Invisible Unicode characters" },
                  { icon: "⌨️", text: isRu ? "Служебные управляющие символы" : "Control characters" },
                  { icon: "↩️", text: isRu ? "Разнородные переносы строк" : "Inconsistent line endings" },
                  { icon: "🔍", text: isRu ? "Скрытые символы отслеживания" : "Tracking characters" },
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {isRu ? "Поддерживаемые форматы" : "Supported Formats"}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {["TXT", "CSV", "JSON", "XML"].map((format) => (
                  <div key={format} className="rounded-lg bg-muted px-3 py-2 text-center text-sm font-medium">
                    {format}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-primary/5 p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-sm font-semibold text-foreground">{t("ui.private_guarantee_title")}</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                {isRu
                  ? "Ваши текстовые файлы никогда не покидают ваше устройство. Обработка выполняется локально в браузере."
                  : "Your text files never leave your device. All processing happens locally in your browser."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
