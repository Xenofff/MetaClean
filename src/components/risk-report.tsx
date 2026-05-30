"use client";

import { useMemo } from "react";
import {
  calculatePrivacyScore,
  getScoreColor,
  getRiskLevelColor,
  getRiskLevelBgColor,
  type PrivacyScoreResult,
} from "@/lib/privacy-score";

interface RiskReportProps {
  metadata: Record<string, unknown>;
}

export default function RiskReport({ metadata }: RiskReportProps) {
  const result: PrivacyScoreResult | null = useMemo(() => {
    return calculatePrivacyScore(metadata);
  }, [metadata]);

  if (!result) return null;

  const { score, issues, grade, riskLevel, summary } = result;
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="border-b border-border bg-muted/50 px-6 py-4">
        <h3 className="text-sm font-semibold text-foreground">Privacy Risk Report</h3>
      </div>
      <div className="p-6 space-y-6">
        {/* Score Circle */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className={getScoreColor(score)}
                style={{ transition: "stroke-dashoffset 1s ease-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold text-foreground">{grade}</span>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRiskLevelBgColor(riskLevel)} ${getRiskLevelColor(riskLevel)}`}>
                {riskLevel}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </div>
        </div>

        {/* Issues List */}
        {issues.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Issues Found</p>
            {issues.map((issue, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-border p-3"
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    issue.severity === "critical"
                      ? "bg-danger/10 text-danger"
                      : issue.severity === "high"
                      ? "bg-orange-100 text-orange-600"
                      : issue.severity === "medium"
                      ? "bg-warning/10 text-warning"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{issue.category}</p>
                  <p className="text-xs text-muted-foreground">{issue.description}</p>
                </div>
                <span className="text-xs font-medium text-danger shrink-0">-{issue.penalty} pts</span>
              </div>
            ))}
          </div>
        )}

        {issues.length === 0 && (
          <div className="flex items-center gap-3 rounded-lg border border-success/20 bg-success/5 p-3">
            <svg className="h-5 w-5 text-success shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium text-success">No privacy issues detected. File is safe to share.</p>
          </div>
        )}
      </div>
    </div>
  );
}
