"use client";

import { useState } from "react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { useLanguage } from "@/lib/i18n/context";
import { TRANSLATION_MAP } from "@/lib/i18n/dictionary";

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
  title,
  description,
  faqs,
}: FAQSectionProps) {
  const { lang, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isRu = lang === "ru";

  const displayTitle =
    title && title !== "Frequently Asked Questions"
      ? (isRu && TRANSLATION_MAP[title] ? TRANSLATION_MAP[title] : title)
      : t("faq.title");

  const displayDescription =
    description && description !== "Everything you need to know about MetaClean"
      ? (isRu && TRANSLATION_MAP[description] ? TRANSLATION_MAP[description] : description)
      : t("faq.desc");

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground">{displayTitle}</h2>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">{displayDescription}</p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion>
          {faqs.map((faq, index) => {
            const q = isRu && TRANSLATION_MAP[faq.question] ? TRANSLATION_MAP[faq.question] : faq.question;
            const a = isRu && TRANSLATION_MAP[faq.answer] ? TRANSLATION_MAP[faq.answer] : faq.answer;

            return (
              <AccordionItem
                key={index}
                title={q}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
