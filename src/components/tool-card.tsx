import Link from "next/link";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  features?: string[];
  className?: string;
}

export default function ToolCard({ title, description, href, icon, features, className }: ToolCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      {features && features.length > 0 && (
        <ul className="mt-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
              <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
        Get Started
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
