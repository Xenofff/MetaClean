import AdPlaceholder from "./ad-placeholder";

interface InContentAdProps {
  slot?: string;
}

export default function InContentAd({ slot = "in-content-1" }: InContentAdProps) {
  return (
    <div className="my-8">
      <AdPlaceholder slot={slot} className="h-32" />
    </div>
  );
}
