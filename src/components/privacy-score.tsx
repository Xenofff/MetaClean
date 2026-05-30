"use client";

import { useState, useEffect } from "react";
import { type PrivacyScoreResult, getScoreColor, getScoreBgColor } from "@/lib/privacy-score";

interface PrivacyScoreComponentProps {
  metadata: Record<string, unknown>;
}

export default function PrivacyScoreComponent({ metadata }: PrivacyScoreComponentProps) {
  const [scoreResult, setScoreResult] = useState<PrivacyScoreResult | null>(null);

  useEffect(() => {
    async function calculate() {
      const { calculatePrivacyScore } = await import("@/lib/privacy-score");
      setScoreResult(calculatePrivacyScore(metadata));
    }
    calculate();
  }, [metadata]);

  if (!scoreResult) return null;

  const { score, issues, grade } = scoreResult;

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="border-b border-border bg-muted/50 px-6 py-4">
        <h3 className="text-sm font-semibold text-foreground">Privacy Score</h3>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className={`flex h-20 w-20 items-center justify-center rounded-full ${getScoreBgColor(score)}`}>
            <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Grade</p>
            <p className={`text-3xl font-bold ${getScoreColor(score)}`}>{grade}</p>
          </div>
          <div className="flex-1">
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  score >= 90 ? "bg-success" : score >= 70 ? "bg-warning" : "bg-danger"
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>

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
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{issue.category}</p>
                  <p className="text-xs text-muted-foreground">{issue.description}</p>
                </div>
                <span className="text-xs font-medium text-danger">-{issue.penalty} pts</span>
              </div>
            ))}
          </div>
        )}

        {issues.length === 0 && (
          <div className="flex items-center gap-3 rounded-lg border border-success/20 bg-success/5 p-3">
            <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium text-success">No privacy issues detected</p>
          </div>
        )}
      </div>
    </div>
  );
}
