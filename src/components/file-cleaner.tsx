"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FileCleanerProps {
  file: File;
  onClean: () => Promise<Blob>;
  onCleaned?: (blob: Blob) => void;
}

export default function FileCleaner({ file, onClean, onCleaned }: FileCleanerProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cleanedBlob, setCleanedBlob] = useState<Blob | null>(null);

  const handleClean = async () => {
    setIsProcessing(true);
    try {
      const blob = await onClean();
      setCleanedBlob(blob);
      onCleaned?.(blob);
    } catch (error) {
      console.error("Failed to clean file:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!cleanedBlob) return;
    const url = URL.createObjectURL(cleanedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cleaned-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
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
            Clean File
          </>
        )}
      </Button>
      {cleanedBlob && (
        <Button onClick={handleDownload} variant="outline" className="flex-1">
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </Button>
      )}
    </div>
  );
}
