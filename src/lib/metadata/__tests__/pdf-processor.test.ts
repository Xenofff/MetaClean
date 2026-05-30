import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { PDFDocument } from "pdf-lib";
import {
  extractPDFMetadata,
  removePDFMetadata,
  verifyPDFMetadataRemoval,
} from "../pdf-processor.js";

// Helper: create a test PDF with metadata
async function createTestPDF(metadata: {
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
  keywords?: string[];
}): Promise<File> {
  const pdfDoc = await PDFDocument.create();

  if (metadata.title) pdfDoc.setTitle(metadata.title);
  if (metadata.author) pdfDoc.setAuthor(metadata.author);
  if (metadata.subject) pdfDoc.setSubject(metadata.subject);
  if (metadata.creator) pdfDoc.setCreator(metadata.creator);
  if (metadata.keywords) pdfDoc.setKeywords(metadata.keywords);

  pdfDoc.addPage();
  const pdfBytes = await pdfDoc.save();
  return new File([new Uint8Array(pdfBytes)], "test.pdf", { type: "application/pdf" });
}

describe("pdf-processor", () => {
  describe("extractPDFMetadata", () => {
    it("should extract user-settable metadata fields", async () => {
      const file = await createTestPDF({
        title: "Test Document",
        author: "John Doe",
        subject: "Testing",
        creator: "Test Creator",
        keywords: ["test", "metadata"],
      });

      const metadata = await extractPDFMetadata(file);

      assert.equal(metadata.Title, "Test Document");
      assert.equal(metadata.Author, "John Doe");
      assert.equal(metadata.Subject, "Testing");
      assert.equal(metadata.Creator, "Test Creator");
      // Keywords come back as a comma-separated string, split by our code
      assert.ok(metadata.Keywords && metadata.Keywords.length > 0);
      assert.ok(metadata.Keywords!.includes("test"));
      assert.ok(metadata.Keywords!.includes("metadata"));
    });

    it("should return undefined for empty fields", async () => {
      const file = await createTestPDF({});
      const metadata = await extractPDFMetadata(file);

      assert.equal(metadata.Title, undefined);
      assert.equal(metadata.Author, undefined);
      assert.equal(metadata.Subject, undefined);
    });

    it("should handle PDF with no metadata", async () => {
      const pdfDoc = await PDFDocument.create();
      pdfDoc.addPage();
      const pdfBytes = await pdfDoc.save();
      const file = new File([new Uint8Array(pdfBytes)], "empty.pdf", { type: "application/pdf" });

      const metadata = await extractPDFMetadata(file);
      assert.equal(metadata.Title, undefined);
      assert.equal(metadata.Author, undefined);
    });

    it("Producer is always set by pdf-lib (library behavior)", async () => {
      const file = await createTestPDF({});
      const metadata = await extractPDFMetadata(file);
      assert.ok(metadata.Producer, "Producer should be set by pdf-lib");
    });
  });

  describe("removePDFMetadata", () => {
    it("should remove user-settable metadata fields", async () => {
      const file = await createTestPDF({
        title: "Secret Document",
        author: "Jane Smith",
        subject: "Confidential",
        creator: "Word Processor",
        keywords: ["secret", "confidential"],
      });

      const cleanedBlob = await removePDFMetadata(file);
      const cleanedFile = new File([cleanedBlob], "cleaned.pdf", { type: "application/pdf" });
      const metadata = await extractPDFMetadata(cleanedFile);

      assert.equal(metadata.Title, undefined);
      assert.equal(metadata.Author, undefined);
      assert.equal(metadata.Subject, undefined);
      assert.equal(metadata.Creator, undefined);
      assert.equal(metadata.Keywords, undefined);
    });

    it("should selectively remove metadata", async () => {
      const file = await createTestPDF({
        title: "Keep Title",
        author: "Remove Author",
        subject: "Keep Subject",
      });

      const cleanedBlob = await removePDFMetadata(file, {
        removeAuthor: true,
        removeTitle: false,
        removeSubject: false,
        removeCreator: true,
        removeProducer: true,
        removeKeywords: true,
      });

      const cleanedFile = new File([cleanedBlob], "cleaned.pdf", { type: "application/pdf" });
      const metadata = await extractPDFMetadata(cleanedFile);

      assert.equal(metadata.Title, "Keep Title");
      assert.equal(metadata.Author, undefined);
      assert.equal(metadata.Subject, "Keep Subject");
    });

    it("should preserve PDF content after cleaning", async () => {
      const pdfDoc = await PDFDocument.create();
      pdfDoc.setTitle("Test Title");
      pdfDoc.setAuthor("Test Author");
      const page = pdfDoc.addPage();
      page.drawText("Hello World", { x: 50, y: 700 });

      const pdfBytes = await pdfDoc.save();
      const file = new File([new Uint8Array(pdfBytes)], "test.pdf", { type: "application/pdf" });

      const cleanedBlob = await removePDFMetadata(file);
      const cleanedDoc = await PDFDocument.load(await cleanedBlob.arrayBuffer());

      assert.equal(cleanedDoc.getPageCount(), 1);
      assert.equal(cleanedDoc.getTitle(), "");
      assert.equal(cleanedDoc.getAuthor(), "");
    });

    it("should produce a valid PDF", async () => {
      const file = await createTestPDF({ title: "Test", author: "Author" });
      const cleanedBlob = await removePDFMetadata(file);

      const cleanedDoc = await PDFDocument.load(await cleanedBlob.arrayBuffer());
      assert.ok(cleanedDoc);
      assert.equal(cleanedDoc.getPageCount(), 1);
    });

    it("should remove Title from cleaned PDF", async () => {
      const file = await createTestPDF({ title: "My Secret Title" });
      const cleanedBlob = await removePDFMetadata(file);
      const cleanedDoc = await PDFDocument.load(await cleanedBlob.arrayBuffer());
      assert.equal(cleanedDoc.getTitle(), "");
    });

    it("should remove Author from cleaned PDF", async () => {
      const file = await createTestPDF({ author: "Secret Author" });
      const cleanedBlob = await removePDFMetadata(file);
      const cleanedDoc = await PDFDocument.load(await cleanedBlob.arrayBuffer());
      assert.equal(cleanedDoc.getAuthor(), "");
    });

    it("should remove Subject from cleaned PDF", async () => {
      const file = await createTestPDF({ subject: "Secret Subject" });
      const cleanedBlob = await removePDFMetadata(file);
      const cleanedDoc = await PDFDocument.load(await cleanedBlob.arrayBuffer());
      assert.equal(cleanedDoc.getSubject(), "");
    });

    it("should remove Creator from cleaned PDF", async () => {
      const file = await createTestPDF({ creator: "Secret Creator" });
      const cleanedBlob = await removePDFMetadata(file);
      const cleanedDoc = await PDFDocument.load(await cleanedBlob.arrayBuffer());
      assert.equal(cleanedDoc.getCreator(), "");
    });

    it("should remove Keywords from cleaned PDF", async () => {
      const file = await createTestPDF({ keywords: ["secret", "confidential"] });
      const cleanedBlob = await removePDFMetadata(file);
      const cleanedDoc = await PDFDocument.load(await cleanedBlob.arrayBuffer());
      const keywords = cleanedDoc.getKeywords();
      assert.ok(!keywords || keywords === "", "Keywords should be empty");
    });
  });

  describe("verifyPDFMetadataRemoval", () => {
    it("should verify successful cleaning", async () => {
      const file = await createTestPDF({
        title: "Test Title",
        author: "Test Author",
        subject: "Test Subject",
        creator: "Test Creator",
        keywords: ["test"],
      });

      const cleanedBlob = await removePDFMetadata(file);
      const verification = await verifyPDFMetadataRemoval(file, cleanedBlob);

      assert.equal(verification.verifiedClean, true);
      assert.ok(verification.details.some((d) => d.includes("Author")));
      assert.ok(verification.details.some((d) => d.includes("Title")));
      assert.ok(verification.details.some((d) => d.includes("Subject")));
      assert.ok(verification.details.some((d) => d.includes("Creator")));
      assert.ok(verification.details.some((d) => d.includes("Keywords")));
    });

    it("should report when PDF has no user metadata to remove", async () => {
      // Create a minimal PDF with no user-set metadata
      const file = await createTestPDF({});
      const cleanedBlob = await removePDFMetadata(file);
      const verification = await verifyPDFMetadataRemoval(file, cleanedBlob);

      // pdf-lib auto-sets Creator, so it will be "removed" — but the important
      // thing is that no user metadata remains
      assert.equal(verification.verifiedClean, true);
    });

    it("should track removed fields", async () => {
      const file = await createTestPDF({
        title: "My Title",
        author: "My Author",
      });

      const cleanedBlob = await removePDFMetadata(file);
      const verification = await verifyPDFMetadataRemoval(file, cleanedBlob);

      assert.ok(verification.removedFields.includes("Author"));
      assert.ok(verification.removedFields.includes("Title"));
    });

    it("should capture before metadata state", async () => {
      const file = await createTestPDF({
        title: "Before Title",
        author: "Before Author",
      });

      const cleanedBlob = await removePDFMetadata(file);
      const verification = await verifyPDFMetadataRemoval(file, cleanedBlob);

      assert.equal(verification.before.Title, "Before Title");
      assert.equal(verification.before.Author, "Before Author");
    });

    it("should capture after metadata state", async () => {
      const file = await createTestPDF({
        title: "Will Be Removed",
        author: "Will Be Removed",
      });

      const cleanedBlob = await removePDFMetadata(file);
      const verification = await verifyPDFMetadataRemoval(file, cleanedBlob);

      assert.equal(verification.after.Title, undefined);
      assert.equal(verification.after.Author, undefined);
    });
  });
});
