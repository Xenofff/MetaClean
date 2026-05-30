import AdPlaceholder from "./ad-placeholder";

interface SidebarAdProps {
  slot?: string;
}

export default function SidebarAd({ slot = "sidebar-1" }: SidebarAdProps) {
  return (
    <div className="sticky top-24">
      <AdPlaceholder slot={slot} className="h-64" />
    </div>
  );
}
