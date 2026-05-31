export interface ImageMetadata {
  [key: string]: unknown;
}

export interface GPSInfo {
  latitude: number;
  longitude: number;
  latitudeRef?: string;
  longitudeRef?: string;
  altitude?: number;
}

export interface SocialMediaWarning {
  type: "device" | "gps" | "date" | "author" | "software";
  severity: "critical" | "high" | "medium" | "low";
  message: string;
}

export interface VerificationResult {
  before: {
    metadataCount: number;
    hasGPS: boolean;
    hasDevice: boolean;
    hasTimestamp: boolean;
    hasSoftware: boolean;
    hasAuthor: boolean;
    fields: string[];
  };
  after: {
    metadataCount: number;
    hasGPS: boolean;
    hasDevice: boolean;
    hasTimestamp: boolean;
    hasSoftware: boolean;
    hasAuthor: boolean;
    fields: string[];
  };
  removedFields: string[];
  verifiedClean: boolean;
  details: string[];
}

// ============================================================
// EXTRACTION — read metadata from original file (for display)
// ============================================================

export async function extractImageMetadata(file: File): Promise<ImageMetadata> {
  const buffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);
  try {
    const exifr = await import("exifr");
    const result = await exifr.default.parse(uint8Array, true);
    return result || {};
  } catch {
    return {};
  }
}

// ============================================================
// REMOVAL — canvas decode/re-encode (pixel rebuild)
//
// This is the ONLY reliable way to strip ALL metadata.
// Previous approach (piexifjs tag deletion) left behind:
//   APP2 (ICC Profile), APP13 (IPTC), XMP, Photoshop data,
//   MakerNotes, thumbnails, comments, and dozens of other
//   metadata containers that piexifjs does not touch.
//
// Canvas approach: decode image → draw pixels → export fresh file.
// The browser generates a brand-new file containing ONLY pixels.
// ============================================================

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

/**
 * Detect the output format from the input file type.
 * Falls back to image/png for unknown types.
 */
function detectOutputFormat(file: File): OutputFormat {
  const type = file.type.toLowerCase();
  if (type === "image/jpeg" || type === "image/jpg") return "image/jpeg";
  if (type === "image/webp") return "image/webp";
  return "image/png";
}

/**
 * Load an image from a File into an HTMLImageElement.
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to load image: ${file.name}`));
    };
    img.src = url;
  });
}

/**
 * Core cleaning function: decode image → draw to canvas → export.
 * Produces a completely fresh file with ZERO metadata.
 */
async function rebuildImageFromPixels(
  file: File,
  outputFormat: OutputFormat,
  quality: number = 0.92
): Promise<Blob> {
  const img = await loadImage(file);

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas 2D context");

  // Draw the image — this copies ONLY pixels, no metadata
  ctx.drawImage(img, 0, 0);

  // Export as a fresh file — browser generates brand-new binary
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to export canvas to blob"));
      },
      outputFormat,
      quality
    );
  });
}

/**
 * Remove ALL metadata from an image by rebuilding from pixels.
 *
 * Works for JPEG, PNG, WEBP — any format the browser can decode.
 * The output is a completely fresh file containing ONLY pixel data.
 *
 * Before: 86+ metadata fields (EXIF, ICC, IPTC, XMP, MakerNotes, etc.)
 * After:  0 metadata fields
 */
export async function removeImageMetadata(
  file: File,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options?: { removeGPS?: boolean; removeCamera?: boolean; removeDevice?: boolean; removeSoftware?: boolean; removeTimestamp?: boolean }
): Promise<Blob> {
  // Options are ignored — we remove EVERYTHING via pixel rebuild.
  // This is intentional: partial removal is unreliable and gives
  // users a false sense of security.
  const outputFormat = detectOutputFormat(file);
  return rebuildImageFromPixels(file, outputFormat);
}

/**
 * Remove GPS only — but since we rebuild from pixels, all metadata
 * is removed. This maintains API compatibility with callers that
 * expect selective removal, while actually providing full cleaning.
 */
export async function removeGPSOnly(file: File): Promise<Blob> {
  return removeImageMetadata(file);
}

/**
 * Clean for social media — rebuild from pixels (full metadata removal).
 */
export async function cleanForSocialMedia(file: File): Promise<Blob> {
  return removeImageMetadata(file);
}

// ============================================================
// VERIFICATION — confirm metadata was actually removed
// ============================================================

/**
 * Verify by comparing before/after metadata objects.
 * Used by tests and when metadata was already extracted.
 */
export function verifyMetadataCleaned(before: ImageMetadata, after: ImageMetadata): VerificationResult {
  const beforeFields = Object.keys(before);
  const afterFields = Object.keys(after);

  const removedFields = beforeFields.filter(
    (f) => !afterFields.includes(f) || after[f] === undefined || after[f] === null || after[f] === ""
  );

  const check = (meta: ImageMetadata) => ({
    metadataCount: Object.keys(meta).length,
    hasGPS: hasGPSData(meta),
    hasDevice: hasDeviceData(meta),
    hasTimestamp: !!(meta.DateTimeOriginal || meta.CreateDate || meta.ModifyDate),
    hasSoftware: !!(meta.Software || meta.software),
    hasAuthor: !!(meta.Author || meta.author || meta.Creator || meta.creator || meta.Artist || meta.artist),
  });

  const beforeState = check(before);
  const afterState = check(after);

  const details: string[] = [];

  const categories = [
    { name: "GPS", before: beforeState.hasGPS, after: afterState.hasGPS },
    { name: "Device information", before: beforeState.hasDevice, after: afterState.hasDevice },
    { name: "Timestamps", before: beforeState.hasTimestamp, after: afterState.hasTimestamp },
    { name: "Software tags", before: beforeState.hasSoftware, after: afterState.hasSoftware },
    { name: "Author information", before: beforeState.hasAuthor, after: afterState.hasAuthor },
  ];

  for (const cat of categories) {
    if (cat.before && !cat.after) {
      details.push(`${cat.name} removed successfully`);
    } else if (cat.before && cat.after) {
      details.push(`WARNING: ${cat.name} still present after cleaning`);
    }
  }

  if (removedFields.length > 0) {
    details.push(`Removed ${removedFields.length} metadata field(s)`);
  }

  if (afterFields.length > 0) {
    details.push(`WARNING: ${afterFields.length} metadata field(s) still present: ${afterFields.slice(0, 5).join(", ")}${afterFields.length > 5 ? "..." : ""}`);
  }

  if (details.length === 0) {
    if (beforeFields.length === 0) {
      details.push("No metadata was present — file was already clean");
    } else {
      details.push("All metadata removed — file contains only pixels");
    }
  }

  const verifiedClean = afterFields.length === 0;

  return {
    before: { ...beforeState, fields: beforeFields },
    after: { ...afterState, fields: afterFields },
    removedFields,
    verifiedClean,
    details,
  };
}

/**
 * Verify by re-reading the cleaned blob.
 * Used in production to confirm actual output.
 */
export async function verifyMetadataRemoval(
  original: File,
  cleaned: Blob
): Promise<VerificationResult> {
  const beforeMeta = await extractImageMetadata(original);
  const cleanedFile = new File([cleaned], "cleaned", { type: cleaned.type });
  const afterMeta = await extractImageMetadata(cleanedFile);
  return verifyMetadataCleaned(beforeMeta, afterMeta);
}

// ============================================================
// DETECTION HELPERS
// ============================================================

export function hasGPSData(metadata: ImageMetadata): boolean {
  return !!(metadata.gps || metadata.GPSLatitude || metadata.latitude || metadata.GPS);
}

export function hasDeviceData(metadata: ImageMetadata): boolean {
  return !!(metadata.Make || metadata.Model || metadata.deviceInfo);
}

export function extractGPS(metadata: ImageMetadata): GPSInfo | null {
  const lat = metadata.GPSLatitude || metadata.latitude;
  const lon = metadata.GPSLongitude || metadata.longitude;

  if (lat && lon) {
    return {
      latitude: Number(lat),
      longitude: Number(lon),
      latitudeRef: (metadata.GPSLatitudeRef as string) || undefined,
      longitudeRef: (metadata.GPSLongitudeRef as string) || undefined,
      altitude: metadata.GPSAltitude ? Number(metadata.GPSAltitude) : undefined,
    };
  }
  return null;
}

export function detectSocialMediaWarnings(metadata: ImageMetadata): SocialMediaWarning[] {
  const warnings: SocialMediaWarning[] = [];

  const model = metadata.Model || metadata.Make;
  if (model) {
    warnings.push({
      type: "device", severity: "high",
      message: `Device model "${model}" can identify your specific phone or camera`,
    });
  }

  if (hasGPSData(metadata)) {
    warnings.push({
      type: "gps", severity: "critical",
      message: "GPS coordinates reveal your exact location when this photo was taken",
    });
  }

  const date = metadata.DateTimeOriginal || metadata.CreateDate;
  if (date) {
    warnings.push({
      type: "date", severity: "medium",
      message: "Creation date reveals when this photo was taken",
    });
  }

  const author = metadata.Author || metadata.artist;
  if (author) {
    warnings.push({
      type: "author", severity: "medium",
      message: `Author name "${author}" can be linked to your identity`,
    });
  }

  const software = metadata.Software;
  if (software) {
    warnings.push({
      type: "software", severity: "low",
      message: `Software tag "${software}" reveals your editing tools`,
    });
  }

  return warnings;
}
