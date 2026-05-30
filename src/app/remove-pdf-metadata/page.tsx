"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import UploadZone from "@/components/upload-zone";
import MetadataTable from "@/components/metadata-table";
import JsonLd from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { extractPDFMetadata, removePDFMetadata, type PDFMetadata } from "@/lib/metadata/pdf-processor";
import { generateBreadcrumbSchema } from "@/lib/schema";

export default function RemovePDFMetadataPage() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<PDFMetadata | null>(null);
  const [cleanedBlob, setCleanedBlob] = useState<Blob | null>(null);
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
    { name: "Home", url: "/" },
    { name: "Remove PDF Metadata", url: "/remove-pdf-metadata/" },
  ]);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    const selectedFile = files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setCleanedBlob(null);
    setIsProcessing(true);

    try {
      const extractedMetadata = await extractPDFMetadata(selectedFile);
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
      const blob = await removePDFMetadata(file, options);
      setCleanedBlob(blob);
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

  const hasMetadata = metadata && Object.keys(metadata).length > 0;

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground">Remove PDF Metadata</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            PDF Tool
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Remove PDF Metadata
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Remove author, title, creator, producer, and keywords from your PDF documents.
            Content is preserved while metadata is cleaned.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Badge variant="outline">PDF</Badge>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Zone */}
            <UploadZone
              onFilesSelected={handleFilesSelected}
              accept=".pdf"
              label="Drop your PDF here"
              description="or click to browse"
            />

            {/* Metadata Preview */}
            {hasMetadata && (
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Detected Metadata</h2>
                  <MetadataTable metadata={metadata as Record<string, unknown>} />
                </div>

                {/* Cleaning Options */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Cleaning Options</h2>
                  <div className="space-y-3">
                    {[
                      { key: "removeAuthor", label: "Remove Author", description: "Author name" },
                      { key: "removeTitle", label: "Remove Title", description: "Document title" },
                      { key: "removeSubject", label: "Remove Subject", description: "Document subject" },
                      { key: "removeCreator", label: "Remove Creator", description: "Creation software" },
                      { key: "removeProducer", label: "Remove Producer", description: "PDF producer" },
                      { key: "removeKeywords", label: "Remove Keywords", description: "Search keywords" },
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

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button onClick={handleClean} disabled={isProcessing} className="flex-1">
                    {isProcessing ? (
                      <>
                        <svg className="h-4 w-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Clean Metadata
                      </>
                    )}
                  </Button>
                  {cleanedBlob && (
                    <Button onClick={handleDownload} variant="outline" className="flex-1">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Cleaned PDF
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">What We Remove</h3>
              <ul className="space-y-3">
                {[
                  { icon: "👤", text: "Author name" },
                  { icon: "📝", text: "Document title" },
                  { icon: "🛠️", text: "Creator information" },
                  { icon: "⚙️", text: "Producer details" },
                  { icon: "🏷️", text: "Keywords" },
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Your Content Is Safe</h3>
              <p className="text-sm text-muted-foreground">
                Only metadata is removed. Your PDF content, images, and formatting remain exactly the same.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-primary/5 p-6">
              <div className="flex items-center gap-2 mb-3">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h3 className="text-sm font-semibold text-foreground">100% Private</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Your PDFs never leave your device. All processing happens locally in your browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
