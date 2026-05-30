import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  cleanText,
  detectHiddenContent,
  verifyTextCleaning,
  type TextCleaningOptions,
} from "../text-processor.js";

describe("text-processor", () => {
  describe("detectHiddenContent", () => {
    it("should detect BOM character", () => {
      const content = "\uFEFFHello World";
      const result = detectHiddenContent(content);
      assert.equal(result.hasBOM, true);
      assert.equal(result.bomCount, 1);
    });

    it("should detect multiple BOM characters", () => {
      const content = "\uFEFFHello\uFEFF World\uFEFF";
      const result = detectHiddenContent(content);
      assert.equal(result.hasBOM, true);
      assert.equal(result.bomCount, 3);
    });

    it("should detect invisible Unicode characters", () => {
      const content = "Hello\u200BWorld"; // zero-width space
      const result = detectHiddenContent(content);
      assert.equal(result.hasInvisibleChars, true);
      assert.equal(result.invisibleCharCount, 1);
    });

    it("should detect multiple invisible character types", () => {
      const content = "H\u200Be\u200Cl\u200Dl\u200Eo"; // multiple zero-width chars
      const result = detectHiddenContent(content);
      assert.equal(result.hasInvisibleChars, true);
      assert.equal(result.invisibleCharCount, 4);
    });

    it("should detect control characters", () => {
      const content = "Hello\x00World"; // null byte
      const result = detectHiddenContent(content);
      assert.equal(result.hasControlChars, true);
      assert.equal(result.controlCharCount, 1);
    });

    it("should detect CRLF line endings", () => {
      const content = "Line1\r\nLine2\r\nLine3";
      const result = detectHiddenContent(content);
      assert.equal(result.hasWeirdLineEndings, true);
      assert.equal(result.crlfCount, 2);
    });

    it("should detect standalone CR line endings", () => {
      const content = "Line1\rLine2\rLine3";
      const result = detectHiddenContent(content);
      assert.equal(result.hasWeirdLineEndings, true);
      assert.equal(result.crCount, 2);
    });

    it("should not detect LF as weird line ending", () => {
      const content = "Line1\nLine2\nLine3";
      const result = detectHiddenContent(content);
      assert.equal(result.hasWeirdLineEndings, false);
      assert.equal(result.crlfCount, 0);
      assert.equal(result.crCount, 0);
    });

    it("should return false for clean content", () => {
      const content = "Hello World\nThis is clean text.\n";
      const result = detectHiddenContent(content);
      assert.equal(result.hasBOM, false);
      assert.equal(result.hasInvisibleChars, false);
      assert.equal(result.hasControlChars, false);
      assert.equal(result.hasWeirdLineEndings, false);
      assert.equal(result.bomCount, 0);
      assert.equal(result.invisibleCharCount, 0);
      assert.equal(result.controlCharCount, 0);
    });

    it("should handle empty string", () => {
      const result = detectHiddenContent("");
      assert.equal(result.hasBOM, false);
      assert.equal(result.hasInvisibleChars, false);
      assert.equal(result.hasControlChars, false);
      assert.equal(result.hasWeirdLineEndings, false);
    });

    it("should detect soft hyphen (\\u00AD)", () => {
      const content = "Hello\u00ADWorld";
      const result = detectHiddenContent(content);
      assert.equal(result.hasInvisibleChars, true);
    });

    it("should detect word joiner (\\u2060)", () => {
      const content = "Hello\u2060World";
      const result = detectHiddenContent(content);
      assert.equal(result.hasInvisibleChars, true);
    });
  });

  describe("cleanText", () => {
    const fullOptions: TextCleaningOptions = {
      removeBOM: true,
      removeInvisibleChars: true,
      removeUnicode: true,
      normalizeLineEndings: true,
    };

    it("should remove BOM characters", () => {
      const content = "\uFEFFHello World";
      const result = cleanText(content, { ...fullOptions, removeInvisibleChars: false, removeUnicode: false, normalizeLineEndings: false });
      assert.equal(result.cleaned, "Hello World");
      assert.ok(result.changes.some((c) => c.includes("BOM")));
      assert.equal(result.removedChars, 1);
    });

    it("should remove invisible Unicode characters", () => {
      const content = "Hello\u200BWorld";
      const result = cleanText(content, { ...fullOptions, removeBOM: false, removeUnicode: false, normalizeLineEndings: false });
      assert.equal(result.cleaned, "HelloWorld");
      assert.ok(result.changes.some((c) => c.includes("invisible")));
      assert.equal(result.removedChars, 1);
    });

    it("should remove control characters", () => {
      const content = "Hello\x00\x01World";
      const result = cleanText(content, { ...fullOptions, removeBOM: false, removeInvisibleChars: false, normalizeLineEndings: false });
      assert.equal(result.cleaned, "HelloWorld");
      assert.ok(result.changes.some((c) => c.includes("control")));
      assert.equal(result.removedChars, 2);
    });

    it("should normalize CRLF to LF", () => {
      const content = "Line1\r\nLine2\r\nLine3";
      const result = cleanText(content, { ...fullOptions, removeBOM: false, removeInvisibleChars: false, removeUnicode: false });
      assert.equal(result.cleaned, "Line1\nLine2\nLine3");
      assert.ok(result.changes.some((c) => c.includes("line ending") || c.includes("Normalized")));
    });

    it("should normalize standalone CR to LF", () => {
      const content = "Line1\rLine2\rLine3";
      const result = cleanText(content, { ...fullOptions, removeBOM: false, removeInvisibleChars: false, removeUnicode: false });
      assert.equal(result.cleaned, "Line1\nLine2\nLine3");
    });

    it("should collapse multiple blank lines", () => {
      const content = "Line1\n\n\n\nLine2";
      const result = cleanText(content, { ...fullOptions, removeBOM: false, removeInvisibleChars: false, removeUnicode: false });
      assert.equal(result.cleaned, "Line1\n\nLine2");
    });

    it("should not change clean content", () => {
      const content = "Hello World\nThis is clean.\n";
      const result = cleanText(content, fullOptions);
      assert.equal(result.cleaned, content);
      assert.ok(result.changes.some((c) => c.includes("already clean")));
      assert.equal(result.removedChars, 0);
    });

    it("should handle mixed content with all issues", () => {
      const content = "\uFEFFHello\u200BWorld\x00\r\nLine2\rLine3";
      const result = cleanText(content, fullOptions);
      assert.equal(result.cleaned, "HelloWorld\nLine2\nLine3");
      assert.ok(result.removedChars > 0);
    });

    it("should handle empty string", () => {
      const result = cleanText("", fullOptions);
      assert.equal(result.cleaned, "");
      assert.ok(result.changes.some((c) => c.includes("already clean")));
    });

    it("should only clean selected options", () => {
      const content = "\uFEFFHello\u200BWorld";
      const result = cleanText(content, {
        removeBOM: true,
        removeInvisibleChars: false,
        removeUnicode: false,
        normalizeLineEndings: false,
      });
      assert.equal(result.cleaned, "Hello\u200BWorld"); // BOM removed, invisible kept
    });

    it("should count removed characters correctly", () => {
      const content = "\uFEFF\u200B\u200CHello";
      const result = cleanText(content, fullOptions);
      assert.equal(result.removedChars, 3);
      assert.equal(result.cleaned, "Hello");
    });
  });

  describe("verifyTextCleaning", () => {
    it("should verify successful cleaning", () => {
      const original = "\uFEFFHello\u200BWorld\x00";
      const cleaned = "HelloWorld";
      const result = verifyTextCleaning(original, cleaned);
      assert.equal(result.verifiedClean, true);
      assert.ok(result.details.length > 0);
      assert.ok(result.details.some((d) => d.toLowerCase().includes("bom")));
      assert.ok(result.details.some((d) => d.toLowerCase().includes("invisible")));
      assert.ok(result.details.some((d) => d.toLowerCase().includes("control")));
    });

    it("should detect incomplete cleaning", () => {
      const original = "\uFEFFHello\u200BWorld";
      const cleaned = "Hello\u200BWorld"; // BOM removed but invisible char remains
      const result = verifyTextCleaning(original, cleaned);
      assert.equal(result.verifiedClean, false);
      assert.ok(result.details.some((d) => d.includes("WARNING")));
    });

    it("should handle already-clean content", () => {
      const original = "Hello World";
      const cleaned = "Hello World";
      const result = verifyTextCleaning(original, cleaned);
      assert.equal(result.verifiedClean, true);
      assert.ok(result.details.some((d) => d.includes("already clean")));
    });

    it("should report correct before/after stats", () => {
      const original = "\uFEFFHello\u200BWorld\r\nLine2";
      const cleaned = "HelloWorld\nLine2";
      const result = verifyTextCleaning(original, cleaned);
      assert.equal(result.before.hasBOM, true);
      assert.equal(result.before.hasInvisibleChars, true);
      assert.equal(result.before.hasWeirdLineEndings, true);
      assert.equal(result.after.hasBOM, false);
      assert.equal(result.after.hasInvisibleChars, false);
      assert.equal(result.after.hasWeirdLineEndings, false);
    });

    it("should handle completely corrupted content", () => {
      // \uFEFF(1 BOM) + \u200B\u200C\u200D\u200E\u200F(5 invisible) + \x00\x01\x02(3 control) = 9 chars
      const original = "\uFEFF\u200B\u200C\u200D\u200E\u200F\x00\x01\x02Hello";
      const cleaned = "Hello";
      const result = verifyTextCleaning(original, cleaned);
      assert.equal(result.verifiedClean, true);
      // bomCount(1) + invisibleCharCount(5) + controlCharCount(3) = 9
      assert.equal(result.removedCount, 9);
    });
  });
});
