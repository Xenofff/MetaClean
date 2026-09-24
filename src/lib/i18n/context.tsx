"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import type { Language, I18nContextType } from "./types";
import { TRANSLATIONS } from "./translations";
import { TRANSLATION_MAP, PAGE_METADATA } from "./dictionary";

const LanguageContext = createContext<I18nContextType | null>(null);

function detectSystemLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem("metaclean_lang");
    if (stored === "ru" || stored === "en") {
      return stored;
    }
    const navLangs = navigator.languages || [navigator.language];
    for (const lang of navLangs) {
      if (/^ru\b/i.test(lang)) {
        return "ru";
      }
      if (/^en\b/i.test(lang)) {
        return "en";
      }
    }
  } catch (e) {
    console.error("Language detection error:", e);
  }
  return "en";
}

const PLACEHOLDER_MAP: Record<string, string> = {
  "Your name": "Ваше имя",
  "you@example.com": "you@example.com",
  "How can we help?": "Чем мы можем помочь?",
  "Tell us what's on your mind...": "Расскажите подробнее...",
  "Search metadata fields...": "Поиск по полям метаданных...",
  "Search articles...": "Поиск статей...",
  "Drop your image here": "Перетащите изображение сюда",
  "Drop your PDF here": "Перетащите PDF сюда",
  "Drop your text file here": "Перетащите текстовый файл сюда",
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();
  const [lang, setLangState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);
  const originalTexts = useRef<Map<Node, string>>(new Map());

  // Initialize on client mount
  useEffect(() => {
    const detected = detectSystemLanguage();
    setLangState(detected);
    setMounted(true);
    document.documentElement.lang = detected;
    if (detected === "ru") {
      document.documentElement.classList.add("lang-ru");
    } else {
      document.documentElement.classList.remove("lang-ru");
    }
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("metaclean_lang", newLang);
    } catch (e) {}
    document.documentElement.lang = newLang;
    if (newLang === "ru") {
      document.documentElement.classList.add("lang-ru");
    } else {
      document.documentElement.classList.remove("lang-ru");
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "ru" ? "en" : "ru");
  }, [lang, setLang]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const activeDict = TRANSLATIONS[lang] || TRANSLATIONS.en;
      let val = activeDict[key] || TRANSLATIONS.en[key] || key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          val = val.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        });
      }
      return val;
    },
    [lang]
  );

  // Apply DOM translation for static content and update meta
  useEffect(() => {
    if (!mounted) return;

    // Update title & description if page matches
    const pathname = (currentPath || window.location.pathname).replace(/\/index\.html$/, "");
    const normalized = pathname.endsWith("/") ? pathname : pathname + "/";
    const meta = PAGE_METADATA[normalized];
    if (meta && meta[lang]) {
      document.title = meta[lang].title;
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl) descEl.setAttribute("content", meta[lang].desc);
    }

    // Translate input & textarea placeholders
    const inputElements = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      "input[placeholder], textarea[placeholder]"
    );
    inputElements.forEach((el) => {
      const currentPlaceholder = el.getAttribute("placeholder") || "";
      if (lang === "ru") {
        if (!el.getAttribute("data-orig-ph")) {
          el.setAttribute("data-orig-ph", currentPlaceholder);
        }
        const orig = el.getAttribute("data-orig-ph") || currentPlaceholder;
        if (PLACEHOLDER_MAP[orig]) {
          el.setAttribute("placeholder", PLACEHOLDER_MAP[orig]);
        }
      } else {
        const orig = el.getAttribute("data-orig-ph");
        if (orig) {
          el.setAttribute("placeholder", orig);
        }
      }
    });

    const map = TRANSLATION_MAP;
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.parentElement) return NodeFilter.FILTER_REJECT;
          const tag = node.parentElement.tagName.toLowerCase();
          if (["script", "style", "noscript", "code", "pre"].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }
          if (node.parentElement.closest("[data-no-translate]")) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const nodesToTranslate: { node: Node; text: string }[] = [];
    let currentNode = walker.nextNode();
    while (currentNode) {
      const text = currentNode.nodeValue?.trim();
      if (text && text.length > 0) {
        nodesToTranslate.push({ node: currentNode, text });
      }
      currentNode = walker.nextNode();
    }

    if (lang === "ru") {
      nodesToTranslate.forEach(({ node, text }) => {
        if (!originalTexts.current.has(node)) {
          originalTexts.current.set(node, node.nodeValue || "");
        }
        if (map[text]) {
          node.nodeValue = node.nodeValue!.replace(text, map[text]);
        }
      });
    } else {
      // Restore English original
      originalTexts.current.forEach((origText, node) => {
        if (node.nodeValue !== origText) {
          node.nodeValue = origText;
        }
      });
      originalTexts.current.clear();
    }
  }, [lang, mounted, currentPath]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): I18nContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: "en",
      setLang: () => {},
      toggleLang: () => {},
      t: (key: string, params?: Record<string, string | number>) => {
        let val = TRANSLATIONS.en[key] || key;
        if (params) {
          Object.entries(params).forEach(([k, v]) => {
            val = val.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
          });
        }
        return val;
      },
    };
  }
  return context;
}
