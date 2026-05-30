export interface PrivacyIssue {
  category: string;
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  penalty: number;
}

export interface PrivacyScoreResult {
  score: number;
  issues: PrivacyIssue[];
  grade: "A+" | "A" | "B" | "C" | "D" | "F";
  riskLevel: "Safe" | "Low Risk" | "Medium Risk" | "High Risk" | "Critical";
  summary: string;
}

export function calculatePrivacyScore(metadata: Record<string, unknown>): PrivacyScoreResult {
  let score = 100;
  const issues: PrivacyIssue[] = [];

  const gpsData = metadata.gps || metadata.GPSLatitude || metadata.latitude;
  if (gpsData) {
    score -= 40;
    issues.push({
      category: "GPS Location",
      severity: "critical",
      description: "GPS coordinates can reveal your exact location",
      penalty: 40,
    });
  }

  const deviceInfo = metadata.Make || metadata.Model || metadata.deviceInfo || metadata.camera;
  if (deviceInfo) {
    score -= 20;
    issues.push({
      category: "Device Information",
      severity: "high",
      description: "Device model and manufacturer can identify you",
      penalty: 20,
    });
  }

  const timestamp = metadata.DateTimeOriginal || metadata.CreateDate || metadata.ModifyDate;
  if (timestamp) {
    score -= 10;
    issues.push({
      category: "Timestamp",
      severity: "medium",
      description: "Date/time information reveals when content was created",
      penalty: 10,
    });
  }

  const author = metadata.Author || metadata.author || metadata.Creator || metadata.creator;
  if (author) {
    score -= 10;
    issues.push({
      category: "Author Information",
      severity: "medium",
      description: "Author name can be linked to your identity",
      penalty: 10,
    });
  }

  const software = metadata.Software || metadata.software || metadata.CreatorTool;
  if (software) {
    score -= 10;
    issues.push({
      category: "Software Tags",
      severity: "low",
      description: "Software information reveals your tools",
      penalty: 10,
    });
  }

  score = Math.max(0, Math.min(100, score));

  let grade: PrivacyScoreResult["grade"] = "A+";
  if (score < 50) grade = "F";
  else if (score < 60) grade = "D";
  else if (score < 70) grade = "C";
  else if (score < 80) grade = "B";
  else if (score < 90) grade = "A";

  let riskLevel: PrivacyScoreResult["riskLevel"] = "Safe";
  if (score < 30) riskLevel = "Critical";
  else if (score < 50) riskLevel = "High Risk";
  else if (score < 70) riskLevel = "Medium Risk";
  else if (score < 90) riskLevel = "Low Risk";

  const summary = generateSummary(score, issues);

  return { score, issues, grade, riskLevel, summary };
}

function generateSummary(score: number, issues: PrivacyIssue[]): string {
  if (issues.length === 0) {
    return "No metadata detected. Your file is safe to share.";
  }

  const criticalCount = issues.filter((i) => i.severity === "critical").length;
  const highCount = issues.filter((i) => i.severity === "high").length;

  if (criticalCount > 0) {
    return `Critical privacy risk detected. ${criticalCount} critical issue(s) found that can directly expose your identity or location.`;
  }

  if (highCount > 0) {
    return `Significant privacy risk. ${highCount} high-risk issue(s) found that can help identify you.`;
  }

  if (score >= 90) {
    return "Low privacy risk. Minor metadata found that is unlikely to cause issues.";
  }

  return `Moderate privacy risk. ${issues.length} issue(s) found that could reveal information about you.`;
}

export function getScoreColor(score: number): string {
  if (score >= 90) return "text-success";
  if (score >= 70) return "text-warning";
  return "text-danger";
}

export function getScoreBgColor(score: number): string {
  if (score >= 90) return "bg-success/10";
  if (score >= 70) return "bg-warning/10";
  return "bg-danger/10";
}

export function getRiskLevelColor(level: string): string {
  switch (level) {
    case "Safe": return "text-success";
    case "Low Risk": return "text-green-600";
    case "Medium Risk": return "text-warning";
    case "High Risk": return "text-orange-500";
    case "Critical": return "text-danger";
    default: return "text-muted-foreground";
  }
}

export function getRiskLevelBgColor(level: string): string {
  switch (level) {
    case "Safe": return "bg-success/10";
    case "Low Risk": return "bg-success/10";
    case "Medium Risk": return "bg-warning/10";
    case "High Risk": return "bg-orange-500/10";
    case "Critical": return "bg-danger/10";
    default: return "bg-muted";
  }
}
