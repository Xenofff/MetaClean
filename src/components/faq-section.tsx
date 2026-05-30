"use client";

import { useState } from "react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  faqs: FAQItem[];
}

export default function FAQSection({
  title = "Frequently Asked Questions",
  description = "Everything you need to know about MetaClean",
  faqs,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              title={faq.question}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
