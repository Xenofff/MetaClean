"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  open?: boolean;
  onToggle?: () => void;
  title: string;
  children: React.ReactNode;
}

function AccordionItem({ open, onToggle, title, children }: AccordionItemProps) {
  return (
    <div className="border-b border-border">
      <button
        className="flex w-full items-center justify-between py-4 text-left font-medium text-foreground hover:text-primary transition-colors"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="text-base">{title}</span>
        <svg
          className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200", open && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Accordion({ children }: { children: React.ReactNode }) {
  return <div className="divide-y divide-border">{children}</div>;
}

export { Accordion, AccordionItem };
