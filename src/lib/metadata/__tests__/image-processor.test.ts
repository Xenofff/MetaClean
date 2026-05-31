import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  hasGPSData,
  hasDeviceData,
  extractGPS,
  detectSocialMediaWarnings,
  verifyMetadataCleaned,
  type ImageMetadata,
} from "../image-processor.js";

describe("image-processor — pure functions", () => {
  describe("hasGPSData", () => {
    it("should detect GPSLatitude", () => {
      assert.equal(hasGPSData({ GPSLatitude: 40.7128 }), true);
    });

    it("should detect GPS property", () => {
      assert.equal(hasGPSData({ GPS: [1, 2, 3] }), true);
    });

    it("should detect latitude property", () => {
      assert.equal(hasGPSData({ latitude: 40.7128 }), true);
    });

    it("should detect gps property (lowercase)", () => {
      assert.equal(hasGPSData({ gps: true }), true);
    });

    it("should return false for metadata without GPS", () => {
      assert.equal(hasGPSData({ Make: "Canon", Model: "EOS R5" }), false);
    });

    it("should return false for empty metadata", () => {
      assert.equal(hasGPSData({}), false);
    });
  });

  describe("hasDeviceData", () => {
    it("should detect Make", () => {
      assert.equal(hasDeviceData({ Make: "Canon" }), true);
    });

    it("should detect Model", () => {
      assert.equal(hasDeviceData({ Model: "iPhone 15 Pro" }), true);
    });

    it("should detect deviceInfo", () => {
      assert.equal(hasDeviceData({ deviceInfo: "Samsung Galaxy S24" }), true);
    });

    it("should return false for metadata without device info", () => {
      assert.equal(hasDeviceData({ GPSLatitude: 40.7128 }), false);
    });

    it("should return false for empty metadata", () => {
      assert.equal(hasDeviceData({}), false);
    });
  });

  describe("extractGPS", () => {
    it("should extract GPS coordinates from EXIF fields", () => {
      const metadata: ImageMetadata = {
        GPSLatitude: 40.7128,
        GPSLongitude: -74.006,
        GPSLatitudeRef: "N",
        GPSLongitudeRef: "W",
      };
      const gps = extractGPS(metadata);
      assert.ok(gps);
      assert.equal(gps.latitude, 40.7128);
      assert.equal(gps.longitude, -74.006);
      assert.equal(gps.latitudeRef, "N");
      assert.equal(gps.longitudeRef, "W");
    });

    it("should extract GPS from generic fields", () => {
      const metadata: ImageMetadata = {
        latitude: 34.0522,
        longitude: -118.2437,
      };
      const gps = extractGPS(metadata);
      assert.ok(gps);
      assert.equal(gps.latitude, 34.0522);
      assert.equal(gps.longitude, -118.2437);
    });

    it("should extract altitude when present", () => {
      const metadata: ImageMetadata = {
        GPSLatitude: 40.7128,
        GPSLongitude: -74.006,
        GPSAltitude: 10.5,
      };
      const gps = extractGPS(metadata);
      assert.ok(gps);
      assert.equal(gps.altitude, 10.5);
    });

    it("should return null when no GPS data", () => {
      assert.equal(extractGPS({ Make: "Canon" }), null);
      assert.equal(extractGPS({}), null);
    });

    it("should return null when only latitude exists", () => {
      assert.equal(extractGPS({ GPSLatitude: 40.7128 }), null);
    });

    it("should return null when only longitude exists", () => {
      assert.equal(extractGPS({ GPSLongitude: -74.006 }), null);
    });
  });

  describe("detectSocialMediaWarnings", () => {
    it("should warn about device model", () => {
      const metadata: ImageMetadata = { Model: "iPhone 15 Pro" };
      const warnings = detectSocialMediaWarnings(metadata);
      assert.ok(warnings.some((w) => w.type === "device" && w.severity === "high"));
    });

    it("should warn about GPS data", () => {
      const metadata: ImageMetadata = { GPSLatitude: 40.7128, GPSLongitude: -74.006 };
      const warnings = detectSocialMediaWarnings(metadata);
      assert.ok(warnings.some((w) => w.type === "gps" && w.severity === "critical"));
    });

    it("should warn about creation date", () => {
      const metadata: ImageMetadata = { DateTimeOriginal: "2024:01:15 14:30:00" };
      const warnings = detectSocialMediaWarnings(metadata);
      assert.ok(warnings.some((w) => w.type === "date" && w.severity === "medium"));
    });

    it("should warn about author", () => {
      const metadata: ImageMetadata = { Author: "John Doe" };
      const warnings = detectSocialMediaWarnings(metadata);
      assert.ok(warnings.some((w) => w.type === "author" && w.severity === "medium"));
    });

    it("should warn about software", () => {
      const metadata: ImageMetadata = { Software: "Adobe Photoshop" };
      const warnings = detectSocialMediaWarnings(metadata);
      assert.ok(warnings.some((w) => w.type === "software" && w.severity === "low"));
    });

    it("should return empty for clean metadata", () => {
      const warnings = detectSocialMediaWarnings({});
      assert.equal(warnings.length, 0);
    });

    it("should detect multiple risks simultaneously", () => {
      const metadata: ImageMetadata = {
        Model: "Samsung Galaxy S24",
        GPSLatitude: 40.7128,
        GPSLongitude: -74.006,
        DateTimeOriginal: "2024:01:15",
        Software: "Lightroom",
      };
      const warnings = detectSocialMediaWarnings(metadata);
      assert.ok(warnings.length >= 4);
    });
  });

  describe("verifyMetadataCleaned", () => {
    it("should verify complete cleanup (zero fields remaining)", () => {
      const before: ImageMetadata = {
        GPSLatitude: 40.7128,
        GPSLongitude: -74.006,
        Make: "Canon",
        Model: "EOS R5",
        DateTimeOriginal: "2024:01:15",
        Software: "Lightroom",
      };
      const after: ImageMetadata = {};

      const result = verifyMetadataCleaned(before, after);
      assert.equal(result.verifiedClean, true);
      assert.ok(result.details.some((d) => d.includes("GPS")));
      assert.ok(result.details.some((d) => d.includes("Device")));
      assert.ok(result.details.some((d) => d.includes("Timestamp")));
      assert.ok(result.details.some((d) => d.includes("Software")));
    });

    it("should fail verification if ANY metadata remains", () => {
      const before: ImageMetadata = {
        GPSLatitude: 40.7128,
        Make: "Canon",
      };
      const after: ImageMetadata = {
        Software: "Lightroom", // Even software remaining = not clean
      };

      const result = verifyMetadataCleaned(before, after);
      assert.equal(result.verifiedClean, false);
      assert.ok(result.details.some((d) => d.includes("WARNING")));
    });

    it("should fail verification if GPS remains", () => {
      const before: ImageMetadata = {
        GPSLatitude: 40.7128,
        Make: "Canon",
      };
      const after: ImageMetadata = {
        GPSLatitude: 40.7128, // GPS still present!
      };

      const result = verifyMetadataCleaned(before, after);
      assert.equal(result.verifiedClean, false);
      assert.ok(result.details.some((d) => d.includes("WARNING")));
    });

    it("should handle already-clean files", () => {
      const before: ImageMetadata = {};
      const after: ImageMetadata = {};

      const result = verifyMetadataCleaned(before, after);
      assert.equal(result.verifiedClean, true);
      assert.ok(result.details.some((d) => d.includes("already clean")));
    });

    it("should track removed fields", () => {
      const before: ImageMetadata = {
        GPSLatitude: 40.7128,
        Make: "Canon",
        DateTimeOriginal: "2024:01:15",
      };
      const after: ImageMetadata = {};

      const result = verifyMetadataCleaned(before, after);
      assert.ok(result.removedFields.includes("GPSLatitude"));
      assert.ok(result.removedFields.includes("Make"));
      assert.ok(result.removedFields.includes("DateTimeOriginal"));
    });

    it("should report before state correctly", () => {
      const before: ImageMetadata = {
        GPSLatitude: 40.7128,
        Make: "Canon",
        DateTimeOriginal: "2024:01:15",
        Software: "Lightroom",
        Author: "Jane",
      };
      const after: ImageMetadata = {};

      const result = verifyMetadataCleaned(before, after);
      assert.equal(result.before.hasGPS, true);
      assert.equal(result.before.hasDevice, true);
      assert.equal(result.before.hasTimestamp, true);
      assert.equal(result.before.hasSoftware, true);
      assert.equal(result.before.hasAuthor, true);
    });

    it("should report after state correctly (all false when clean)", () => {
      const before: ImageMetadata = {
        GPSLatitude: 40.7128,
        Make: "Canon",
        DateTimeOriginal: "2024:01:15",
        Software: "Lightroom",
        Author: "Jane",
      };
      const after: ImageMetadata = {};

      const result = verifyMetadataCleaned(before, after);
      assert.equal(result.after.hasGPS, false);
      assert.equal(result.after.hasDevice, false);
      assert.equal(result.after.hasTimestamp, false);
      assert.equal(result.after.hasSoftware, false);
      assert.equal(result.after.hasAuthor, false);
      assert.equal(result.after.metadataCount, 0);
    });

    it("should flag Make as remaining if not removed", () => {
      const before: ImageMetadata = { Make: "Apple", Model: "iPhone 14 Pro" };
      const after: ImageMetadata = { Make: "Apple" }; // Make not removed

      const result = verifyMetadataCleaned(before, after);
      assert.equal(result.verifiedClean, false);
      assert.ok(result.after.hasDevice, "Device data should be detected as remaining");
    });

    it("should flag EXIF fields as remaining if not removed", () => {
      const before: ImageMetadata = {
        ExposureTime: 0.005,
        FNumber: 1.8,
        ISOSpeedRatings: 100,
        FocalLength: 26,
      };
      const after: ImageMetadata = {
        ExposureTime: 0.005,
        FNumber: 1.8,
      };

      const result = verifyMetadataCleaned(before, after);
      assert.equal(result.verifiedClean, false);
      assert.equal(result.after.metadataCount, 2);
    });

    it("should handle iPhone-like metadata (many fields → 0)", () => {
      const before: ImageMetadata = {
        Make: "Apple",
        Model: "iPhone 14 Pro Max",
        Software: "16.1",
        DateTimeOriginal: "2024-01-15T14:30:00Z",
        GPSLatitude: 40.7128,
        GPSLongitude: -74.006,
        ExposureTime: 0.005,
        FNumber: 1.78,
        ISOSpeedRatings: 64,
        FocalLength: 6.86,
        LensModel: "iPhone 14 Pro Max back triple camera 6.86mm f/1.78",
        LensMake: "Apple",
        BodySerialNumber: "abc123",
        HostComputer: "Macintosh",
        ProfileDescription: "Display P3",
        Copyright: "Apple Inc.",
        Artist: "John Doe",
        UserComment: "My photo",
        ImageDescription: "A beautiful sunset",
        ColorSpace: 1,
        PixelXDimension: 4032,
        PixelYDimension: 3024,
      };
      const after: ImageMetadata = {};

      const result = verifyMetadataCleaned(before, after);
      assert.equal(result.verifiedClean, true);
      assert.equal(result.before.metadataCount, 22);
      assert.equal(result.after.metadataCount, 0);
      assert.equal(result.removedFields.length, 22);
    });
  });
});
