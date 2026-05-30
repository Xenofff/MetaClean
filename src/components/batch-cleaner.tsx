"use client";

import { useState } from "react";
import { formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BatchFile {
  id: string;
  file: File;
  status: "pending" | "processing" | "completed" | "error";
  result?: Blob;
  error?: string;
}

interface BatchCleanerProps {
  files: File[];
  onClean: (file: File) => Promise<Blob>;
  onComplete?: (results: { file: File; result: Blob }[]) => void;
}

export default function BatchCleaner({ files, onClean, onComplete }: BatchCleanerProps) {
  const [batchFiles, setBatchFiles] = useState<BatchFile[]>(
    files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      status: "pending" as const,
    }))
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const processFiles = async () => {
    setIsProcessing(true);
    const results: { file: File; result: Blob }[] = [];

    for (let i = 0; i < batchFiles.length; i++) {
      const batchFile = batchFiles[i];
      if (batchFile.status === "completed") continue;

      setBatchFiles((prev) =>
        prev.map((f) => (f.id === batchFile.id ? { ...f, status: "processing" } : f))
      );

      try {
        const result = await onClean(batchFile.file);
        results.push({ file: batchFile.file, result });
        setBatchFiles((prev) =>
          prev.map((f) => (f.id === batchFile.id ? { ...f, status: "completed", result } : f))
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
    onComplete?.(results);
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cleaned-${filename}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    batchFiles.forEach((batchFile) => {
      if (batchFile.status === "completed" && batchFile.result) {
        downloadFile(batchFile.result, batchFile.file.name);
      }
    });
  };

  const completedCount = batchFiles.filter((f) => f.status === "completed").length;
  const pendingCount = batchFiles.filter((f) => f.status === "pending").length;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="border-b border-border bg-muted/50 px-4 py-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Batch Processing</h3>
          <span className="text-xs text-muted-foreground">
            {completedCount}/{batchFiles.length} completed
          </span>
        </div>

        <div className="divide-y divide-border max-h-64 overflow-y-auto">
          {batchFiles.map((batchFile) => (
            <div key={batchFile.id} className="flex items-center gap-3 px-4 py-3">
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
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        {!isProcessing && pendingCount > 0 && (
          <Button onClick={processFiles} className="flex-1">
            Clean All Files
          </Button>
        )}
        {completedCount > 0 && (
          <Button onClick={downloadAll} variant="outline" className="flex-1">
            Download All ({completedCount})
          </Button>
        )}
      </div>
    </div>
  );
}
