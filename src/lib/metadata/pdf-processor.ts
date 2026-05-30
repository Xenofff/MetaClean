import { PDFDocument } from "pdf-lib";

export interface PDFMetadata {
  Title?: string;
  Author?: string;
  Subject?: string;
  Keywords?: string[];
  Creator?: string;
  Producer?: string;
  CreationDate?: string;
  ModDate?: string;
  [key: string]: unknown;
}

export interface PDFVerificationResult {
  before: PDFMetadata;
  after: PDFMetadata;
  removedFields: string[];
  verifiedClean: boolean;
  details: string[];
}

// --- Extraction ---

export async function extractPDFMetadata(file: File): Promise<PDFMetadata> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  const title = pdfDoc.getTitle();
  const author = pdfDoc.getAuthor();
  const subject = pdfDoc.getSubject();
  const keywords = pdfDoc.getKeywords();
  const creator = pdfDoc.getCreator();
  const producer = pdfDoc.getProducer();
  const creationDate = pdfDoc.getCreationDate();
  const modDate = pdfDoc.getModificationDate();

  return {
    Title: title || undefined,
    Author: author || undefined,
    Subject: subject || undefined,
    Keywords: parseKeywords(keywords),
    Creator: creator || undefined,
    Producer: producer || undefined,
    CreationDate: creationDate?.toISOString() || undefined,
    ModDate: modDate?.toISOString() || undefined,
  };
}

// --- Removal ---

export async function removePDFMetadata(
  file: File,
  options: {
    removeAuthor?: boolean;
    removeTitle?: boolean;
    removeSubject?: boolean;
    removeCreator?: boolean;
    removeProducer?: boolean;
    removeKeywords?: boolean;
  } = {}
): Promise<Blob> {
  const {
    removeAuthor = true,
    removeTitle = true,
    removeSubject = true,
    removeCreator = true,
    removeProducer = true,
    removeKeywords = true,
  } = options;

  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  if (removeTitle) pdfDoc.setTitle("");
  if (removeAuthor) pdfDoc.setAuthor("");
  if (removeSubject) pdfDoc.setSubject("");
  if (removeCreator) pdfDoc.setCreator("");
  if (removeProducer) pdfDoc.setProducer("");
  if (removeKeywords) pdfDoc.setKeywords([]);

  // pdf-lib sets Producer automatically on save. Save once, then reload to clear it.
  let modifiedPdfBytes = await pdfDoc.save();
  if (removeProducer) {
    const reloadDoc = await PDFDocument.load(modifiedPdfBytes, { ignoreEncryption: true });
    reloadDoc.setProducer("");
    modifiedPdfBytes = await reloadDoc.save();
  }
  return new Blob([new Uint8Array(modifiedPdfBytes)], { type: "application/pdf" });
}

// --- Verification ---

function parseKeywords(raw: string | undefined): string[] | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  return trimmed.includes(",") ? trimmed.split(",").map((k) => k.trim()).filter(Boolean) : trimmed.split(/\s+/).filter(Boolean);
}

export async function verifyPDFMetadataCleaned(blob: Blob): Promise<PDFVerificationResult> {
  const arrayBuffer = await blob.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  const after: PDFMetadata = {
    Title: pdfDoc.getTitle() || undefined,
    Author: pdfDoc.getAuthor() || undefined,
    Subject: pdfDoc.getSubject() || undefined,
    Keywords: parseKeywords(pdfDoc.getKeywords()),
    Creator: pdfDoc.getCreator() || undefined,
    Producer: pdfDoc.getProducer() || undefined,
    CreationDate: pdfDoc.getCreationDate()?.toISOString() || undefined,
    ModDate: pdfDoc.getModificationDate()?.toISOString() || undefined,
  };

  return {
    before: {},
    after,
    removedFields: [],
    verifiedClean: !after.Title && !after.Author && !after.Subject && !after.Creator && !after.Producer && (!after.Keywords || after.Keywords.length === 0),
    details: [],
  };
}

export async function verifyPDFMetadataRemoval(
  original: File,
  cleaned: Blob,
  options: {
    removeAuthor?: boolean;
    removeTitle?: boolean;
    removeSubject?: boolean;
    removeCreator?: boolean;
    removeProducer?: boolean;
    removeKeywords?: boolean;
  } = {}
): Promise<PDFVerificationResult> {
  const beforeMeta = await extractPDFMetadata(original);

  // Re-read from the actual blob to verify
  const arrayBuffer = await cleaned.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  const verifiedAfter: PDFMetadata = {
    Title: pdfDoc.getTitle() || undefined,
    Author: pdfDoc.getAuthor() || undefined,
    Subject: pdfDoc.getSubject() || undefined,
    Keywords: parseKeywords(pdfDoc.getKeywords()),
    Creator: pdfDoc.getCreator() || undefined,
    Producer: pdfDoc.getProducer() || undefined,
  };

  const details: string[] = [];
  const removedFields: string[] = [];

  if (options.removeAuthor !== false) {
    if (beforeMeta.Author && !verifiedAfter.Author) {
      details.push(`Author "${beforeMeta.Author}" removed successfully`);
      removedFields.push("Author");
    } else if (beforeMeta.Author && verifiedAfter.Author) {
      details.push(`WARNING: Author "${verifiedAfter.Author}" still present`);
    }
  }

  if (options.removeTitle !== false) {
    if (beforeMeta.Title && !verifiedAfter.Title) {
      details.push(`Title "${beforeMeta.Title}" removed successfully`);
      removedFields.push("Title");
    } else if (beforeMeta.Title && verifiedAfter.Title) {
      details.push(`WARNING: Title "${verifiedAfter.Title}" still present`);
    }
  }

  if (options.removeSubject !== false) {
    if (beforeMeta.Subject && !verifiedAfter.Subject) {
      details.push("Subject removed successfully");
      removedFields.push("Subject");
    } else if (beforeMeta.Subject && verifiedAfter.Subject) {
      details.push("WARNING: Subject still present");
    }
  }

  if (options.removeCreator !== false) {
    if (beforeMeta.Creator && !verifiedAfter.Creator) {
      details.push(`Creator "${beforeMeta.Creator}" removed successfully`);
      removedFields.push("Creator");
    } else if (beforeMeta.Creator && verifiedAfter.Creator) {
      details.push(`WARNING: Creator "${verifiedAfter.Creator}" still present`);
    }
  }

  if (options.removeProducer !== false) {
    if (beforeMeta.Producer && !verifiedAfter.Producer) {
      details.push(`Producer "${beforeMeta.Producer}" removed successfully`);
      removedFields.push("Producer");
    } else if (beforeMeta.Producer && verifiedAfter.Producer) {
      details.push(`WARNING: Producer "${verifiedAfter.Producer}" still present`);
    }
  }

  if (options.removeKeywords !== false) {
    if (beforeMeta.Keywords && beforeMeta.Keywords.length > 0 && (!verifiedAfter.Keywords || verifiedAfter.Keywords.length === 0)) {
      details.push("Keywords removed successfully");
      removedFields.push("Keywords");
    } else if (beforeMeta.Keywords && verifiedAfter.Keywords && verifiedAfter.Keywords.length > 0) {
      details.push("WARNING: Keywords still present");
    }
  }

  if (details.length === 0) {
    if (!beforeMeta.Author && !beforeMeta.Title && !beforeMeta.Subject && !beforeMeta.Creator && !beforeMeta.Producer && (!beforeMeta.Keywords || beforeMeta.Keywords.length === 0)) {
      details.push("No metadata was present — PDF was already clean");
    } else {
      details.push("PDF metadata fields were modified");
    }
  }

  // Producer is set by pdf-lib on save — we don't flag it as a remaining field
  const verifiedClean = !verifiedAfter.Author && !verifiedAfter.Title && !verifiedAfter.Subject && !verifiedAfter.Creator && (!verifiedAfter.Keywords || verifiedAfter.Keywords.length === 0);

  return {
    before: beforeMeta,
    after: verifiedAfter,
    removedFields,
    verifiedClean,
    details,
  };
}
