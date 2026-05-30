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
  cleanForSocialMedia,
  detectSocialMediaWarnings,
  type ImageMetadata,
  type SocialMediaWarning,
} from "@/lib/metadata/image-processor";
import { generateBreadcrumbSchema } from "@/lib/schema";

export default function SocialMediaCleanerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [warnings, setWarnings] = useState<SocialMediaWarning[]>([]);
  const [cleanedBlob, setCleanedBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Social Media Cleaner", url: "/social-media-cleaner/" },
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
      const detectedWarnings = detectSocialMediaWarnings(extractedMetadata);
      setWarnings(detectedWarnings);
    } catch (error) {
      console.error("Failed to extract metadata:", error);
      setMetadata({});
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleCleanForSocial = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const blob = await cleanForSocialMedia(file);
      setCleanedBlob(blob);
    } catch (error) {
      console.error("Failed to clean for social media:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!cleanedBlob || !file) return;
    const url = URL.createObjectURL(cleanedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `social-safe-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const criticalCount = warnings.filter((w) => w.severity === "critical").length;
  const highCount = warnings.filter((w) => w.severity === "high").length;
  const mediumCount = warnings.filter((w) => w.severity === "medium").length;

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground">Social Media Cleaner</span>
        </nav>

        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2" />
            </svg>
            Social Tool
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Social Media Cleaner
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze your photos before posting. Detect privacy risks and clean them for safe social media sharing.
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
                {/* Privacy Analysis */}
                {!cleanedBlob && warnings.length > 0 && (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-foreground">Privacy Analysis</h2>
                      <div className="flex gap-2">
                        {criticalCount > 0 && (
                          <Badge variant="destructive">{criticalCount} Critical</Badge>
                        )}
                        {highCount > 0 && (
                          <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">{highCount} High</Badge>
                        )}
                        {mediumCount > 0 && (
                          <Badge variant="warning">{mediumCount} Medium</Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {warnings.map((warning, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-3 rounded-lg border p-4 ${
                            warning.severity === "critical"
                              ? "border-danger/30 bg-danger/5"
                              : warning.severity === "high"
                              ? "border-orange-500/30 bg-orange-500/5"
                              : "border-warning/30 bg-warning/5"
                          }`}
                        >
                          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                            warning.severity === "critical"
                              ? "bg-danger/10 text-danger"
                              : warning.severity === "high"
                              ? "bg-orange-500/10 text-orange-600"
                              : "bg-warning/10 text-warning"
                          }`}>
                            {warning.severity === "critical" ? (
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            ) : (
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground capitalize">{warning.type} Information</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{warning.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clean Success */}
                {cleanedBlob && (
                  <div className="rounded-xl border border-success/30 bg-success/5 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm font-semibold text-success">Your photo is now safe for social media!</p>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                      Device info, GPS coordinates, and timestamps have been removed.
                    </p>
                    <Button onClick={handleDownload} className="w-full">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Safe Photo
                    </Button>
                  </div>
                )}

                {/* Metadata */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Detected Metadata</h2>
                  <MetadataTable metadata={metadata} />
                </div>

                {/* Clean Button */}
                {!cleanedBlob && warnings.length > 0 && (
                  <Button onClick={handleCleanForSocial} disabled={isProcessing} className="w-full" size="lg">
                    {isProcessing ? (
                      <>
                        <svg className="h-4 w-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Cleaning...
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2" />
                        </svg>
                        Clean for Social Media
                      </>
                    )}
                  </Button>
                )}

                {!cleanedBlob && warnings.length === 0 && (
                  <div className="rounded-xl border border-success/30 bg-success/5 p-6 flex items-center gap-3">
                    <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-medium text-success">No privacy risks detected. This photo is safe for social media.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {metadata && <RiskReport metadata={metadata} />}

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">What We Check</h3>
              <ul className="space-y-3">
                {[
                  { icon: "📱", text: "Device model & manufacturer", severity: "high" },
                  { icon: "📍", text: "GPS location coordinates", severity: "critical" },
                  { icon: "🕐", text: "Photo creation date", severity: "medium" },
                  { icon: "👤", text: "Author information", severity: "medium" },
                  { icon: "💻", text: "Software tags", severity: "low" },
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
                Cleaning happens entirely in your browser. Your photos never leave your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
