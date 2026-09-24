"use client";

import { useMemo } from "react";
import {
  calculatePrivacyScore,
  getScoreColor,
  getRiskLevelColor,
  getRiskLevelBgColor,
  type PrivacyScoreResult,
} from "@/lib/privacy-score";
import { useLanguage } from "@/lib/i18n/context";

interface RiskReportProps {
  metadata: Record<string, unknown>;
}

const RU_RISK: Record<string, string> = {
  Safe: "Безопасно",
  "Low Risk": "Низкий риск",
  "Medium Risk": "Средний риск",
  "High Risk": "Высокий риск",
  Critical: "Критический",
};

const RU_CATEGORIES: Record<string, { title: string; desc: string }> = {
  "GPS Location": {
    title: "GPS-локация",
    desc: "GPS-координаты раскрывают точное место съемки",
  },
  "Device Information": {
    title: "Данные устройства",
    desc: "Модель и производитель устройства позволяют идентифицировать вас",
  },
  Timestamp: {
    title: "Временные метки",
    desc: "Дата и время показывают, когда был создан файл",
  },
  "Author Information": {
    title: "Информация об авторе",
    desc: "Имя автора связывает файл с вашей личностью",
  },
  "Software Tags": {
    title: "Метки софта",
    desc: "Информация об используемых программах и инструментах",
  },
};

export default function RiskReport({ metadata }: RiskReportProps) {
  const { lang, t } = useLanguage();
  const isRu = lang === "ru";

  const result: PrivacyScoreResult | null = useMemo(() => {
    return calculatePrivacyScore(metadata);
  }, [metadata]);

  if (!result) return null;

  const { score, issues, grade, riskLevel, summary } = result;
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (score / 100) * circumference;

  const displayRisk = isRu ? (RU_RISK[riskLevel] || riskLevel) : riskLevel;

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="border-b border-border bg-muted/50 px-6 py-4">
        <h3 className="text-sm font-semibold text-foreground">{t("risk.report_title")}</h3>
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
                {displayRisk}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {isRu
                ? (issues.length === 0
                    ? "Метаданные не обнаружены. Файл безопасен для публикации."
                    : `Обнаружено угроз: ${issues.length}. Рекомендуется очистить перед отправкой.`)
                : summary}
            </p>
          </div>
        </div>

        {/* Issues List */}
        {issues.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {t("risk.issues_found")}
            </p>
            {issues.map((issue, index) => {
              const ruInfo = RU_CATEGORIES[issue.category];
              const displayCategory = isRu && ruInfo ? ruInfo.title : issue.category;
              const displayDesc = isRu && ruInfo ? ruInfo.desc : issue.description;

              return (
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
                    <p className="text-sm font-medium text-foreground">{displayCategory}</p>
                    <p className="text-xs text-muted-foreground">{displayDesc}</p>
                  </div>
                  <span className="text-xs font-medium text-danger shrink-0">-{issue.penalty} pts</span>
                </div>
              );
            })}
          </div>
        )}

        {issues.length === 0 && (
          <div className="flex items-center gap-3 rounded-lg border border-success/20 bg-success/5 p-3">
            <svg className="h-5 w-5 text-success shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium text-success">{t("risk.no_issues")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
