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

// --- Extraction ---

export async function extractImageMetadata(file: File): Promise<ImageMetadata> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const dataUrl = e.target?.result as string;
        const metadata = await extractExifFromDataUrl(dataUrl);
        resolve(metadata);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

async function extractExifFromDataUrl(dataUrl: string): Promise<ImageMetadata> {
  const exifr = await import("exifr");
  const buffer = await fetch(dataUrl).then((r) => r.arrayBuffer());
  const uint8Array = new Uint8Array(buffer);
  const result = await exifr.default.parse(uint8Array, true);
  return result || {};
}

// --- Removal ---

export async function removeImageMetadata(
  file: File,
  options: { removeGPS?: boolean; removeCamera?: boolean; removeDevice?: boolean; removeSoftware?: boolean; removeTimestamp?: boolean } = {}
): Promise<Blob> {
  const { removeGPS = true, removeCamera = true, removeDevice = true, removeSoftware = true, removeTimestamp = true } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const dataUrl = e.target?.result as string;
        const cleanDataUrl = await cleanImageMetadata(dataUrl, {
          removeGPS, removeCamera, removeDevice, removeSoftware, removeTimestamp,
        });
        const response = await fetch(cleanDataUrl);
        const blob = await response.blob();
        resolve(blob);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export async function removeGPSOnly(file: File): Promise<Blob> {
  return removeImageMetadata(file, {
    removeGPS: true, removeCamera: false, removeDevice: false, removeSoftware: false, removeTimestamp: false,
  });
}

export async function cleanForSocialMedia(file: File): Promise<Blob> {
  return removeImageMetadata(file, {
    removeGPS: true, removeCamera: true, removeDevice: true, removeSoftware: false, removeTimestamp: true,
  });
}

async function cleanImageMetadata(
  dataUrl: string,
  options: { removeGPS: boolean; removeCamera: boolean; removeDevice: boolean; removeSoftware: boolean; removeTimestamp: boolean }
): Promise<string> {
  if (dataUrl.includes("image/png")) {
    return cleanPngMetadata(dataUrl);
  }
  return cleanJpegMetadata(dataUrl, options);
}

// --- PNG Cleaning ---
// Strips all text/auxiliary metadata chunks while keeping image data intact.
// PNG chunk types removed: tEXt, iTXt, zTXt (text metadata), pHYs (physical dims),
// sBIT (significant bits), gAMA (gamma), cHRM (chromaticity), iCCP (ICC profile),
// sRGB (color space), tIME (modification time), tRNS (transparency), bKGD (background).

const PNG_METADATA_CHUNKS = new Set([
  "tEXt", "iTXt", "zTXt",  // text metadata
  "pHYs",                    // physical pixel dimensions
  "sBIT",                    // significant bits
  "gAMA",                    // gamma
  "cHRM",                    // chromaticity
  "iCCP",                    // ICC color profile
  "sRGB",                    // color space
  "tIME",                    // last modification time
  "tRNS",                    // transparency
  "bKGD",                    // background
  "sPLT",                    // suggested palette
  "hIST",                    // histogram
  "pCAL",                    // pixel calibration
  "gIFg",                    // GIF extension
  "gIFt",                    // GIF text
  "gIFx",                    // GIF extension
  "oFFs",                    // physical offset
  "pCAL",                    // pixel calibration
  "sCAL",                    // physical scale
  "iTXt",                    // international text
]);

async function cleanPngMetadata(dataUrl: string): Promise<string> {
  const response = await fetch(dataUrl);
  const buffer = await response.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);

  // PNG signature is 8 bytes
  const signature = uint8Array.slice(0, 8);
  const chunks: Uint8Array[] = [signature];

  let i = 8;
  while (i < uint8Array.length - 12) {
    // Read chunk length (big-endian uint32)
    const length = (uint8Array[i] << 24) | (uint8Array[i + 1] << 16) | (uint8Array[i + 2] << 8) | uint8Array[i + 3];
    // Read chunk type (4 ASCII chars)
    const type = String.fromCharCode(uint8Array[i + 4], uint8Array[i + 5], uint8Array[i + 6], uint8Array[i + 7]);

    // Validate chunk: length must be reasonable and type must be 4 printable ASCII chars
    const isValidChunk = length >= 0 && length < 100_000_000 && /^[A-Za-z]{4}$/.test(type);

    if (!isValidChunk) {
      // Corrupted chunk, copy rest of file as-is
      chunks.push(uint8Array.slice(i));
      break;
    }

    // Keep non-metadata chunks (including IHDR, IDAT, IEND, and unknown chunks)
    if (!PNG_METADATA_CHUNKS.has(type)) {
      chunks.push(uint8Array.slice(i, i + 12 + length));
    }

    // Move to next chunk (4 bytes length + 4 bytes type + length bytes + 4 bytes CRC)
    i += 12 + length;
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  const blob = new Blob([result], { type: "image/png" });
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

// --- JPEG Cleaning ---

async function cleanJpegMetadata(
  dataUrl: string,
  options: { removeGPS: boolean; removeCamera: boolean; removeDevice: boolean; removeSoftware: boolean; removeTimestamp: boolean }
): Promise<string> {
  const piexif = await import("piexifjs");

  let exifObj: Record<string, unknown>;
  try {
    exifObj = piexif.default.load(dataUrl);
  } catch {
    // No EXIF data or corrupted — return as-is (nothing to clean)
    return dataUrl;
  }

  // GPS removal: zero out the GPS IFD
  if (options.removeGPS) {
    exifObj.GPS = [];
  }

  // Camera/Device removal: delete Make, Model, BodySerialNumber from both Exif and Image IFDs
  if (options.removeCamera || options.removeDevice) {
    if (exifObj.Exif) {
      const exif = exifObj.Exif as Record<string, unknown>;
      delete exif[piexif.default.ExifIFD.Make];
      delete exif[piexif.default.ExifIFD.Model];
      delete exif[piexif.default.ExifIFD.BodySerialNumber];
      delete exif[piexif.default.ExifIFD.LensMake];
      delete exif[piexif.default.ExifIFD.LensModel];
    }
    if (exifObj.Image) {
      const img = exifObj.Image as Record<string, unknown>;
      delete img[piexif.default.ImageIFD.Make];
      delete img[piexif.default.ImageIFD.Model];
    }
  }

  // Software removal
  if (options.removeSoftware) {
    if (exifObj.Image) {
      delete (exifObj.Image as Record<string, unknown>)[piexif.default.ImageIFD.Software];
    }
  }

  // Timestamp removal
  if (options.removeTimestamp) {
    if (exifObj.Exif) {
      const exif = exifObj.Exif as Record<string, unknown>;
      delete exif[piexif.default.ExifIFD.DateTimeOriginal];
      delete exif[piexif.default.ExifIFD.DateTimeDigitized];
      delete exif[piexif.default.ExifIFD.OffsetTimeOriginal];
      delete exif[piexif.default.ExifIFD.OffsetTimeDigitized];
    }
    if (exifObj.Image) {
      delete (exifObj.Image as Record<string, unknown>)[piexif.default.ImageIFD.DateTime];
    }
  }

  // Remove user comment and image description
  if (exifObj.Exif) {
    const exif = exifObj.Exif as Record<string, unknown>;
    delete exif[piexif.default.ExifIFD.UserComment];
    delete exif[piexif.default.ExifIFD.ImageDescription];
    delete exif[piexif.default.ExifIFD.Copyright];
  }
  if (exifObj.Image) {
    const img = exifObj.Image as Record<string, unknown>;
    delete img[piexif.default.ImageIFD.ImageDescription];
    delete img[piexif.default.ImageIFD.Copyright];
    delete img[piexif.default.ImageIFD.Artist];
  }

  try {
    const exifStr = piexif.default.dump(exifObj);
    return piexif.default.insert(exifStr, dataUrl);
  } catch {
    // piexif failed to serialize — return original
    return dataUrl;
  }
}

// --- Verification ---

export function verifyMetadataCleaned(before: ImageMetadata, after: ImageMetadata): VerificationResult {
  const beforeFields = Object.keys(before);
  const afterFields = Object.keys(after);

  const removedFields = beforeFields.filter((f) => !afterFields.includes(f) || after[f] === undefined || after[f] === null || after[f] === "");

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

  if (beforeState.hasGPS && !afterState.hasGPS) {
    details.push("GPS coordinates removed successfully");
  } else if (beforeState.hasGPS && afterState.hasGPS) {
    details.push("WARNING: GPS data still present after cleaning");
  }

  if (beforeState.hasDevice && !afterState.hasDevice) {
    details.push("Device information removed successfully");
  } else if (beforeState.hasDevice && afterState.hasDevice) {
    details.push("WARNING: Device information still present after cleaning");
  }

  if (beforeState.hasTimestamp && !afterState.hasTimestamp) {
    details.push("Timestamps removed successfully");
  } else if (beforeState.hasTimestamp && afterState.hasTimestamp) {
    details.push("WARNING: Timestamps still present after cleaning");
  }

  if (beforeState.hasSoftware && !afterState.hasSoftware) {
    details.push("Software tags removed successfully");
  } else if (beforeState.hasSoftware && afterState.hasSoftware) {
    details.push("WARNING: Software tags still present after cleaning");
  }

  if (beforeState.hasAuthor && !afterState.hasAuthor) {
    details.push("Author information removed successfully");
  } else if (beforeState.hasAuthor && afterState.hasAuthor) {
    details.push("WARNING: Author information still present after cleaning");
  }

  if (removedFields.length > 0) {
    details.push(`Removed ${removedFields.length} metadata field(s): ${removedFields.slice(0, 10).join(", ")}${removedFields.length > 10 ? "..." : ""}`);
  }

  if (details.length === 0) {
    if (beforeFields.length === 0) {
      details.push("No metadata was present — file was already clean");
    } else {
      details.push("Metadata fields were modified");
    }
  }

  // Verified clean = no sensitive data remains
  const verifiedClean = !afterState.hasGPS && !afterState.hasDevice && !afterState.hasTimestamp && !afterState.hasAuthor;

  return {
    before: { ...beforeState, fields: beforeFields },
    after: { ...afterState, fields: afterFields },
    removedFields,
    verifiedClean,
    details,
  };
}

// --- Detection Helpers ---

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
