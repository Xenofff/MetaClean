export interface TextCleaningOptions {
  removeUnicode: boolean;
  removeBOM: boolean;
  normalizeLineEndings: boolean;
  removeInvisibleChars: boolean;
}

export interface TextCleaningResult {
  cleaned: string;
  changes: string[];
  removedChars: number;
}

export interface TextVerificationResult {
  before: {
    length: number;
    hasBOM: boolean;
    hasInvisibleChars: boolean;
    hasControlChars: boolean;
    hasWeirdLineEndings: boolean;
    invisibleCharCount: number;
    controlCharCount: number;
    bomCount: number;
    crlfCount: number;
    crCount: number;
  };
  after: {
    length: number;
    hasBOM: boolean;
    hasInvisibleChars: boolean;
    hasControlChars: boolean;
    hasWeirdLineEndings: boolean;
    invisibleCharCount: number;
    controlCharCount: number;
    bomCount: number;
    crlfCount: number;
    crCount: number;
  };
  removedCount: number;
  verifiedClean: boolean;
  details: string[];
}

// Patterns — use non-global versions for .test() and .match() to avoid lastIndex bugs.
// Global versions are only used with .replace() which doesn't have this issue.
// NOTE: BOM (\uFEFF) is in the INVISIBLE_CHARS pattern too, but we count it separately
// via BOM_PATTERN. The INVISIBLE_CHARS count includes BOM for detection purposes,
// but removedCount only uses bomCount + (invisibleCharCount excluding BOM overlap).
const INVISIBLE_CHARS_PATTERN = /[\u200B-\u200D\u200E\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF\u00AD\u034F\u061C\u17B4\u17B5\u180E\u3164\uFFA0\u115F\u1160\u17B3]/;
const INVISIBLE_CHARS_GLOBAL = /[\u200B-\u200D\u200E\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF\u00AD\u034F\u061C\u17B4\u17B5\u180E\u3164\uFFA0\u115F\u1160\u17B3]/g;
// Non-BOM invisible chars (for accurate counting without double-counting BOM)
const NON_BOM_INVISIBLE_GLOBAL = /[\u200B-\u200D\u200E\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\u00AD\u034F\u061C\u17B4\u17B5\u180E\u3164\uFFA0\u115F\u1160\u17B3]/g;

const BOM_PATTERN = /\uFEFF/;
const BOM_GLOBAL = /\uFEFF/g;

const CONTROL_CHARS_PATTERN = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/;
const CONTROL_CHARS_GLOBAL = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

// --- Detection ---

function countMatches(str: string, pattern: RegExp): number {
  // Reset lastIndex for global regexes
  const globalPattern = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : pattern.flags + "g");
  const matches = str.match(globalPattern);
  return matches ? matches.length : 0;
}

export function detectHiddenContent(content: string): {
  hasBOM: boolean;
  hasInvisibleChars: boolean;
  hasControlChars: boolean;
  hasWeirdLineEndings: boolean;
  foundChars: string[];
  bomCount: number;
  invisibleCharCount: number;
  controlCharCount: number;
  crlfCount: number;
  crCount: number;
} {
  const hasBOM = BOM_PATTERN.test(content);
  const hasInvisibleChars = INVISIBLE_CHARS_PATTERN.test(content);
  const hasControlChars = CONTROL_CHARS_PATTERN.test(content);
  const hasWeirdLineEndings = /\r\n/.test(content) || (/\r/.test(content) && !/\r\n/.test(content));

  const bomCount = countMatches(content, BOM_GLOBAL);
  const invisibleCharCount = countMatches(content, NON_BOM_INVISIBLE_GLOBAL);
  const controlCharCount = countMatches(content, CONTROL_CHARS_GLOBAL);
  const crlfCount = countMatches(content, /\r\n/g);
  // CR count: only standalone \r (not part of \r\n)
  const crCount = countMatches(content.replace(/\r\n/g, ""), /\r/g);

  const foundChars: string[] = [];
  const matches = content.match(INVISIBLE_CHARS_GLOBAL);
  if (matches) {
    const unique = [...new Set(matches)];
    foundChars.push(...unique.map((c) => `U+${c.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")}`));
  }

  return {
    hasBOM, hasInvisibleChars, hasControlChars, hasWeirdLineEndings,
    foundChars, bomCount, invisibleCharCount, controlCharCount, crlfCount, crCount,
  };
}

// --- Cleaning ---

export function cleanText(
  content: string,
  options: TextCleaningOptions
): TextCleaningResult {
  let cleaned = content;
  const changes: string[] = [];
  let removedChars = 0;

  if (options.removeBOM) {
    const before = cleaned.length;
    cleaned = cleaned.replace(BOM_GLOBAL, "");
    const removed = before - cleaned.length;
    if (removed > 0) {
      changes.push(`Removed ${removed} BOM character(s)`);
      removedChars += removed;
    }
  }

  if (options.removeInvisibleChars) {
    const before = cleaned.length;
    cleaned = cleaned.replace(INVISIBLE_CHARS_GLOBAL, "");
    const removed = before - cleaned.length;
    if (removed > 0) {
      changes.push(`Removed ${removed} invisible Unicode character(s)`);
      removedChars += removed;
    }
  }

  if (options.removeUnicode) {
    const before = cleaned.length;
    cleaned = cleaned.replace(CONTROL_CHARS_GLOBAL, "");
    const removed = before - cleaned.length;
    if (removed > 0) {
      changes.push(`Removed ${removed} control character(s)`);
      removedChars += removed;
    }
  }

  if (options.normalizeLineEndings) {
    const before = cleaned;
    // Normalize: \r\n -> \n, standalone \r -> \n, collapse 3+ newlines to 2
    cleaned = cleaned.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n{3,}/g, "\n\n");
    if (before !== cleaned) {
      const crlfCount = countMatches(before, /\r\n/g);
      const crCount = countMatches(before.replace(/\r\n/g, ""), /\r/g);
      const totalNorm = crlfCount + crCount;
      if (totalNorm > 0) {
        changes.push(`Normalized ${totalNorm} line ending(s) to Unix format`);
      } else {
        changes.push("Normalized line endings");
      }
    }
  }

  if (changes.length === 0) {
    changes.push("No changes needed — file is already clean");
  }

  return { cleaned, changes, removedChars };
}

// --- Verification ---

export function verifyTextCleaning(original: string, cleaned: string): TextVerificationResult {
  const beforeState = detectHiddenContent(original);
  const afterState = detectHiddenContent(cleaned);

  const details: string[] = [];
  let removedCount = 0;

  if (beforeState.hasBOM && !afterState.hasBOM) {
    details.push(`BOM removed: ${beforeState.bomCount} character(s) eliminated`);
    removedCount += beforeState.bomCount;
  } else if (beforeState.hasBOM && afterState.hasBOM) {
    details.push(`WARNING: BOM still present (${afterState.bomCount} character(s))`);
  }

  if (beforeState.hasInvisibleChars && !afterState.hasInvisibleChars) {
    details.push(`Invisible characters removed: ${beforeState.invisibleCharCount} character(s) eliminated`);
    removedCount += beforeState.invisibleCharCount;
  } else if (beforeState.hasInvisibleChars && afterState.hasInvisibleChars) {
    details.push(`WARNING: Invisible characters still present (${afterState.invisibleCharCount} remaining)`);
  }

  if (beforeState.hasControlChars && !afterState.hasControlChars) {
    details.push(`Control characters removed: ${beforeState.controlCharCount} character(s) eliminated`);
    removedCount += beforeState.controlCharCount;
  } else if (beforeState.hasControlChars && afterState.hasControlChars) {
    details.push(`WARNING: Control characters still present (${afterState.controlCharCount} remaining)`);
  }

  if (beforeState.hasWeirdLineEndings && !afterState.hasWeirdLineEndings) {
    details.push("Line endings normalized to Unix format");
    removedCount += beforeState.crlfCount + beforeState.crCount;
  } else if (beforeState.hasWeirdLineEndings && afterState.hasWeirdLineEndings) {
    details.push(`WARNING: Non-standard line endings still present`);
  }

  if (beforeState.foundChars.length > 0 && afterState.foundChars.length === 0) {
    details.push(`All hidden Unicode characters removed: ${beforeState.foundChars.join(", ")}`);
  }

  if (details.length === 0) {
    if (!beforeState.hasBOM && !beforeState.hasInvisibleChars && !beforeState.hasControlChars && !beforeState.hasWeirdLineEndings) {
      details.push("No hidden content was found — file was already clean");
    } else {
      details.push("Text content was processed");
    }
  }

  const verifiedClean = !afterState.hasBOM && !afterState.hasInvisibleChars && !afterState.hasControlChars && !afterState.hasWeirdLineEndings;

  return {
    before: {
      length: original.length,
      hasBOM: beforeState.hasBOM,
      hasInvisibleChars: beforeState.hasInvisibleChars,
      hasControlChars: beforeState.hasControlChars,
      hasWeirdLineEndings: beforeState.hasWeirdLineEndings,
      invisibleCharCount: beforeState.invisibleCharCount,
      controlCharCount: beforeState.controlCharCount,
      bomCount: beforeState.bomCount,
      crlfCount: beforeState.crlfCount,
      crCount: beforeState.crCount,
    },
    after: {
      length: cleaned.length,
      hasBOM: afterState.hasBOM,
      hasInvisibleChars: afterState.hasInvisibleChars,
      hasControlChars: afterState.hasControlChars,
      hasWeirdLineEndings: afterState.hasWeirdLineEndings,
      invisibleCharCount: afterState.invisibleCharCount,
      controlCharCount: afterState.controlCharCount,
      bomCount: afterState.bomCount,
      crlfCount: afterState.crlfCount,
      crCount: afterState.crCount,
    },
    removedCount,
    verifiedClean,
    details,
  };
}
