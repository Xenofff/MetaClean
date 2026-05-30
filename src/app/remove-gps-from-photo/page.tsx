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
  removeGPSOnly,
  extractGPS,
  hasGPSData,
  type ImageMetadata,
  type GPSInfo,
} from "@/lib/metadata/image-processor";
import { generateBreadcrumbSchema } from "@/lib/schema";

export default function RemoveGPSFromPhotoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [gpsInfo, setGpsInfo] = useState<GPSInfo | null>(null);
  const [cleanedBlob, setCleanedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Remove GPS from Photo", url: "/remove-gps-from-photo/" },
  ]);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    const selectedFile = files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setCleanedBlob(null);
    setIsProcessing(true);

    try {
      const extractedMetadata = await extractImageMetadata(selectedFile);
      setMetadata(extractedMetadata);
      const gps = extractGPS(extractedMetadata);
      setGpsInfo(gps);
    } catch (error) {
      console.error("Failed to extract metadata:", error);
      setMetadata({});
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleCleanGPS = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const blob = await removeGPSOnly(file);
      setCleanedBlob(blob);
    } catch (error) {
      console.error("Failed to remove GPS:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!cleanedBlob || !file) return;
    const url = URL.createObjectURL(cleanedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `no-gps-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const hasGPS = metadata ? hasGPSData(metadata) : false;

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground">Remove GPS from Photo</span>
        </nav>

        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            GPS Tool
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Remove GPS from Photo
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Extract and display GPS coordinates from your photos. Remove location data to protect your privacy.
          </p>
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
                {/* GPS Warning */}
                {hasGPS && !cleanedBlob && (
                  <div className="rounded-xl border border-danger/30 bg-danger/5 p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-danger/10">
                        <svg className="h-5 w-5 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-danger">Privacy Warning</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          This image reveals location information. GPS coordinates can be used to determine exactly where this photo was taken.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* GPS Coordinates Display */}
                {gpsInfo && (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">GPS Coordinates Detected</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Latitude</p>
                        <p className="text-lg font-mono font-semibold text-foreground">{gpsInfo.latitude.toFixed(6)}</p>
                        <p className="text-xs text-muted-foreground">{gpsInfo.latitudeRef || (gpsInfo.latitude >= 0 ? "N" : "S")}</p>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Longitude</p>
                        <p className="text-lg font-mono font-semibold text-foreground">{gpsInfo.longitude.toFixed(6)}</p>
                        <p className="text-xs text-muted-foreground">{gpsInfo.longitudeRef || (gpsInfo.longitude >= 0 ? "E" : "W")}</p>
                      </div>
                    </div>
                    {gpsInfo.altitude !== undefined && (
                      <div className="mt-3 rounded-lg bg-muted p-3">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Altitude</p>
                        <p className="text-sm font-mono font-semibold text-foreground">{gpsInfo.altitude.toFixed(1)}m</p>
                      </div>
                    )}
                    <div className="mt-4">
                      <a
                        href={`https://www.google.com/maps?q=${gpsInfo.latitude},${gpsInfo.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View on Google Maps
                      </a>
                    </div>
                  </div>
                )}

                {/* All Metadata */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">All Detected Metadata</h2>
                  <MetadataTable metadata={metadata} />
                </div>

                {/* Action Buttons */}
                {hasGPS && !cleanedBlob && (
                  <div className="flex gap-3">
                    <Button onClick={handleCleanGPS} disabled={isProcessing} className="flex-1">
                      {isProcessing ? (
                        <>
                          <svg className="h-4 w-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Removing GPS...
                        </>
                      ) : (
                        <>
                          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          Remove GPS Only
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {cleanedBlob && (
                  <div className="rounded-xl border border-success/30 bg-success/5 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm font-semibold text-success">GPS data removed successfully!</p>
                    </div>
                    <Button onClick={handleDownload} className="w-full">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Cleaned Photo
                    </Button>
                  </div>
                )}

                {!hasGPS && !cleanedBlob && (
                  <div className="rounded-xl border border-success/30 bg-success/5 p-6 flex items-center gap-3">
                    <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-medium text-success">No GPS data found. This image is safe to share.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {metadata && <RiskReport metadata={metadata} />}

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">What is GPS Metadata?</h3>
              <p className="text-sm text-muted-foreground">
                GPS metadata contains the exact latitude and longitude where a photo was taken. This information can be used to determine your home address, workplace, and travel patterns.
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
                GPS removal happens entirely in your browser. Your photos never leave your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
