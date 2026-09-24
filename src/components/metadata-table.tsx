"use client";

import { useLanguage } from "@/lib/i18n/context";

interface MetadataTableProps {
  metadata: Record<string, unknown>;
  title?: string;
}

const RU_KEYS: Record<string, string> = {
  Make: "Производитель",
  Model: "Модель",
  LensModel: "Модель объектива",
  Software: "Программное обеспечение",
  DateTime: "Дата и время",
  DateTimeOriginal: "Дата съемки",
  CreateDate: "Дата создания",
  ModifyDate: "Дата изменения",
  GPSLatitude: "GPS Широта",
  GPSLongitude: "GPS Долгота",
  GPSAltitude: "GPS Высота",
  latitude: "Широта",
  longitude: "Долгота",
  altitude: "Высота",
  Author: "Автор",
  author: "Автор",
  Creator: "Создатель",
  creator: "Создатель",
  Producer: "Программа создания (Producer)",
  producer: "Программа создания",
  Title: "Название",
  title: "Название",
  Subject: "Тема",
  subject: "Тема",
  Keywords: "Ключевые слова",
  keywords: "Ключевые слова",
  Copyright: "Авторские права",
  copyright: "Авторские права",
  Artist: "Автор / Фотограф",
  artist: "Автор / Фотограф",
  FNumber: "Диафрагма (F-число)",
  ExposureTime: "Выдержка",
  ISO: "ISO",
  FocalLength: "Фокусное расстояние",
  Flash: "Вспышка",
  Orientation: "Ориентация",
  ColorSpace: "Цветовое пространство",
  ExifVersion: "Версия EXIF",
  SerialNumber: "Серийный номер",
  LensSerialNumber: "Серийный номер объектива",
};

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "N/A";
  if (typeof value === "object") {
    if (Array.isArray(value)) {
      return value.map(formatValue).join(", ");
    }
    return JSON.stringify(value);
  }
  return String(value);
}

function formatKey(key: string, isRu: boolean): string {
  if (isRu && RU_KEYS[key]) {
    return RU_KEYS[key];
  }
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/_/g, " ");
}

export default function MetadataTable({ metadata, title }: MetadataTableProps) {
  const { lang, t } = useLanguage();
  const isRu = lang === "ru";

  const entries = Object.entries(metadata).filter(
    ([, value]) => value !== null && value !== undefined && value !== ""
  );

  const displayTitle = title || t("ui.detected_metadata");

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-muted/50 p-6 text-center">
        <svg className="mx-auto h-10 w-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="mt-2 text-sm font-medium text-foreground">{t("ui.no_metadata")}</p>
        <p className="mt-1 text-xs text-muted-foreground">{t("ui.file_is_clean")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {displayTitle && (
        <div className="border-b border-border bg-muted/50 px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">{displayTitle}</h3>
          <p className="text-xs text-muted-foreground">{t("ui.fields_detected", { count: entries.length })}</p>
        </div>
      )}
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {entries.map(([key, value]) => (
          <div key={key} className="flex items-start gap-4 px-4 py-3 hover:bg-muted/30 transition-colors">
            <span className="min-w-[140px] text-xs font-medium text-muted-foreground">{formatKey(key, isRu)}</span>
            <span className="flex-1 text-sm text-foreground break-all">{formatValue(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
