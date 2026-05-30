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
    it("should verify complete cleanup", () => {
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

    it("should detect incomplete cleanup", () => {
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

    it("should report before/after state correctly", () => {
      const before: ImageMetadata = {
        GPSLatitude: 40.7128,
        Make: "Canon",
        DateTimeOriginal: "2024:01:15",
        Software: "Lightroom",
        Author: "Jane",
      };
      const after: ImageMetadata = {
        Software: "Lightroom",
      };

      const result = verifyMetadataCleaned(before, after);
      assert.equal(result.before.hasGPS, true);
      assert.equal(result.before.hasDevice, true);
      assert.equal(result.before.hasTimestamp, true);
      assert.equal(result.before.hasSoftware, true);
      assert.equal(result.before.hasAuthor, true);

      assert.equal(result.after.hasGPS, false);
      assert.equal(result.after.hasDevice, false);
      assert.equal(result.after.hasTimestamp, false);
      assert.equal(result.after.hasSoftware, true); // software not removed
      assert.equal(result.after.hasAuthor, false);
    });
  });
});
