interface AdPlaceholderProps {
  className?: string;
  slot?: string;
}

export default function AdPlaceholder({ className, slot }: AdPlaceholderProps) {
  const isAdEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

  if (!isAdEnabled) {
    return (
      <div
        className={`rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center ${className || ""}`}
      >
        <svg className="mx-auto h-8 w-8 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <p className="mt-2 text-xs text-muted-foreground/50">Advertisement</p>
        {slot && <p className="text-[10px] text-muted-foreground/30">Slot: {slot}</p>}
      </div>
    );
  }

  return (
    <div className={`ad-placeholder rounded-xl bg-muted/30 ${className || ""}`} data-slot={slot}>
      {/* AdSense code will go here when enabled */}
    </div>
  );
}
