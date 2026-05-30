"use client";

import { useCallback, useState, useRef } from "react";
import { cn, formatFileSize } from "@/lib/utils";

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  description?: string;
}

export default function UploadZone({
  onFilesSelected,
  accept = "*",
  multiple = false,
  label = "Drop your files here",
  description = "or click to browse",
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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
      if (files.length > 0) {
        setSelectedFiles(files);
        onFilesSelected(files);
      }
    },
    [onFilesSelected]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        setSelectedFiles(files);
        onFilesSelected(files);
      }
    },
    [onFilesSelected]
  );

  return (
    <div className="w-full">
      <div
        className={cn(
          "relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-muted/50",
          "focus-within:ring-2 focus-within:ring-primary/50"
        )}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            inputRef.current?.click();
          }
        }}
        aria-label={label}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
          aria-hidden="true"
        />

        <div className="flex flex-col items-center gap-3">
          <div className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full transition-colors",
            isDragging ? "bg-primary/10" : "bg-muted"
          )}>
            <svg
              className={cn("h-7 w-7 transition-colors", isDragging ? "text-primary" : "text-muted-foreground")}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <div>
            <p className="text-base font-medium text-foreground">{label}</p>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>

          {accept !== "*" && (
            <p className="text-xs text-muted-foreground">Supported: {accept}</p>
          )}
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-4 py-2"
            >
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-foreground">{file.name}</span>
                <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
