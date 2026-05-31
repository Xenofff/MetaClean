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

export default function RemovePhotoMetadataPage() {
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
    { name: "Home", url: "/" },
    { name: "Remove Photo Metadata", url: "/remove-photo-metadata/" },
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

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground">Remove Photo Metadata</span>
        </nav>

        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Image Tool
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Remove Photo Metadata
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Remove EXIF data, GPS coordinates, camera information, and timestamps from your photos.
            All processing happens in your browser.
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
              label="Drop your image here"
              description="or click to browse (JPG, PNG, WEBP)"
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
                      Before
                    </button>
                    <button
                      onClick={() => setShowAfter(true)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        showAfter ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-pressed={showAfter}
                    >
                      After
                    </button>
                  </div>
                )}

                {/* Metadata Preview */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">
                      {showAfter ? "Cleaned Metadata" : "Detected Metadata"}
                    </h2>
                    {showAfter && (
                      <Badge variant="success">
                        <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Cleaned
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {showAfter ? (
                      <Badge variant="success">Metadata Removed</Badge>
                    ) : (
                      <>
                        {hasGPSData(metadata) && <Badge variant="destructive">GPS Data Found</Badge>}
                        {hasDeviceData(metadata) && <Badge variant="warning">Device Info Found</Badge>}
                        {!hasGPSData(metadata) && !hasDeviceData(metadata) && <Badge variant="success">Clean</Badge>}
                      </>
                    )}
                  </div>

                  <MetadataTable
                    metadata={showAfter ? (cleanedMetadata || {}) : metadata}
                    title={showAfter ? "After Cleaning" : "Before Cleaning"}
                  />
                </div>

                {/* Cleaning Options */}
                {!showAfter && (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Cleaning Options</h2>
                    <div className="space-y-3">
                      {[
                        { key: "removeGPS", label: "Remove GPS Coordinates", description: "Location data" },
                        { key: "removeCamera", label: "Remove Camera Info", description: "Camera make & model" },
                        { key: "removeDevice", label: "Remove Device Info", description: "Device serial numbers" },
                        { key: "removeSoftware", label: "Remove Software Tags", description: "Software used" },
                        { key: "removeTimestamp", label: "Remove Timestamps", description: "Date & time" },
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
                <div className="flex gap-3">
                  {!showAfter && (
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
                  )}
                  {cleanedBlob && (
                    <Button onClick={handleDownload} variant="outline" className="flex-1">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Cleaned File
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {metadata && <RiskReport metadata={metadata} />}

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">What We Remove</h3>
              <ul className="space-y-3">
                {[
                  { icon: "📍", text: "GPS coordinates" },
                  { icon: "📷", text: "Camera make & model" },
                  { icon: "📱", text: "Device information" },
                  { icon: "💻", text: "Software tags" },
                  { icon: "🕐", text: "Timestamps" },
                  { icon: "👤", text: "Author information" },
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
                <h3 className="text-sm font-semibold text-foreground">100% Private</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Your photos never leave your device. All processing happens locally in your browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
