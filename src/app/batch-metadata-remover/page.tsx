"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import JsonLd from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatFileSize } from "@/lib/utils";
import {
  removeImageMetadata,
} from "@/lib/metadata/image-processor";
import { removePDFMetadata } from "@/lib/metadata/pdf-processor";
import { generateBreadcrumbSchema } from "@/lib/schema";

interface BatchFile {
  id: string;
  file: File;
  status: "pending" | "processing" | "completed" | "error";
  result?: Blob;
  error?: string;
}

export default function BatchMetadataRemoverPage() {
  const [batchFiles, setBatchFiles] = useState<BatchFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Batch Metadata Remover", url: "/batch-metadata-remover/" },
  ]);

  const addFiles = useCallback((files: File[]) => {
    const newBatchFiles: BatchFile[] = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      status: "pending" as const,
    }));
    setBatchFiles((prev) => [...prev, ...newBatchFiles]);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) addFiles(files);
    },
    [addFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) addFiles(files);
    },
    [addFiles]
  );

  const processAllFiles = async () => {
    setIsProcessing(true);

    for (let i = 0; i < batchFiles.length; i++) {
      const batchFile = batchFiles[i];
      if (batchFile.status === "completed") continue;

      setBatchFiles((prev) =>
        prev.map((f) => (f.id === batchFile.id ? { ...f, status: "processing" } : f))
      );

      try {
        const ext = batchFile.file.name.split(".").pop()?.toLowerCase();
        let result: Blob;

        if (ext === "pdf") {
          result = await removePDFMetadata(batchFile.file, {
            removeAuthor: true,
            removeTitle: true,
            removeCreator: true,
            removeProducer: true,
            removeKeywords: true,
          });
        } else {
          result = await removeImageMetadata(batchFile.file, {
            removeGPS: true,
            removeCamera: true,
            removeDevice: true,
            removeSoftware: true,
            removeTimestamp: true,
          });
        }

        setBatchFiles((prev) =>
          prev.map((f) =>
            f.id === batchFile.id ? { ...f, status: "completed", result } : f
          )
        );
      } catch (error) {
        setBatchFiles((prev) =>
          prev.map((f) =>
            f.id === batchFile.id
              ? { ...f, status: "error", error: error instanceof Error ? error.message : "Failed" }
              : f
          )
        );
      }
    }

    setIsProcessing(false);
  };

  const downloadAsZip = async () => {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();

    batchFiles.forEach((batchFile) => {
      if (batchFile.status === "completed" && batchFile.result) {
        zip.file(`cleaned-${batchFile.file.name}`, batchFile.result);
      }
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "metaclean-batch.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const removeFile = (id: string) => {
    setBatchFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => {
    setBatchFiles([]);
  };

  const completedCount = batchFiles.filter((f) => f.status === "completed").length;
  const processingCount = batchFiles.filter((f) => f.status === "processing").length;
  const pendingCount = batchFiles.filter((f) => f.status === "pending").length;
  const errorCount = batchFiles.filter((f) => f.status === "error").length;
  const totalCount = batchFiles.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground">Batch Metadata Remover</span>
        </nav>

        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Batch Tool
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Batch Metadata Remover
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload multiple files and clean metadata from all of them at once. Download individually or as a ZIP.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Upload Zone */}
          <div
            className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer ${
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
            }}
            aria-label="Upload files"
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              onChange={handleFileInput}
              className="hidden"
              aria-hidden="true"
            />
            <div className="flex flex-col items-center gap-3">
              <div className={`flex h-14 w-14 items-center justify-center rounded-full transition-colors ${isDragging ? "bg-primary/10" : "bg-muted"}`}>
                <svg className={`h-7 w-7 transition-colors ${isDragging ? "text-primary" : "text-muted-foreground"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <p className="text-base font-medium text-foreground">Drop files here or click to browse</p>
                <p className="text-sm text-muted-foreground mt-1">Supports JPG, PNG, WEBP, PDF</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {totalCount > 0 && (
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground">Progress</h3>
                <span className="text-xs text-muted-foreground">{completedCount}/{totalCount} files</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex gap-4 mt-3">
                {processingCount > 0 && (
                  <span className="text-xs text-primary flex items-center gap-1">
                    <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {processingCount} processing
                  </span>
                )}
                {completedCount > 0 && (
                  <span className="text-xs text-success">{completedCount} completed</span>
                )}
                {pendingCount > 0 && (
                  <span className="text-xs text-muted-foreground">{pendingCount} pending</span>
                )}
                {errorCount > 0 && (
                  <span className="text-xs text-danger">{errorCount} errors</span>
                )}
              </div>
            </div>
          )}

          {/* File List */}
          {batchFiles.length > 0 && (
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="border-b border-border bg-muted/50 px-4 py-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Files ({totalCount})</h3>
                <button
                  onClick={clearAll}
                  className="text-xs text-muted-foreground hover:text-foreground"
                  aria-label="Clear all files"
                >
                  Clear All
                </button>
              </div>
              <div className="divide-y divide-border max-h-96 overflow-y-auto">
                {batchFiles.map((batchFile) => (
                  <div key={batchFile.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted shrink-0">
                      {batchFile.file.name.endsWith(".pdf") ? (
                        <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{batchFile.file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(batchFile.file.size)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {batchFile.status === "pending" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                          Pending
                        </span>
                      )}
                      {batchFile.status === "processing" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Processing
                        </span>
                      )}
                      {batchFile.status === "completed" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Done
                        </span>
                      )}
                      {batchFile.status === "error" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-danger/10 px-2 py-1 text-xs font-medium text-danger">
                          Error
                        </span>
                      )}
                      <button
                        onClick={() => removeFile(batchFile.id)}
                        className="p-1 text-muted-foreground hover:text-foreground rounded"
                        aria-label={`Remove ${batchFile.file.name}`}
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {totalCount > 0 && (
            <div className="flex gap-3">
              {!isProcessing && pendingCount > 0 && (
                <Button onClick={processAllFiles} className="flex-1" size="lg">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Clean All Files
                </Button>
              )}
              {completedCount > 0 && (
                <>
                  <Button onClick={downloadAsZip} className="flex-1" size="lg">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download ZIP ({completedCount})
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
