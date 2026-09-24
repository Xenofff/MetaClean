"use client";

import Link from "next/link";
import ToolCard from "@/components/tool-card";
import FAQSection from "@/components/faq-section";
import JsonLd from "@/components/json-ld";
import { siteConfig, generateWebApplicationSchema, generateFAQSchema } from "@/lib/schema";
import { useLanguage } from "@/lib/i18n/context";

const faqsEn = [
  {
    question: "What is MetaClean?",
    answer: "MetaClean is a free, client-side tool that removes metadata from photos, PDFs, and text files. All processing happens in your browser — your files are never uploaded to any server.",
  },
  {
    question: "Is MetaClean really free?",
    answer: "Yes, MetaClean is completely free to use. There are no hidden fees, subscriptions, or usage limits. We believe privacy tools should be accessible to everyone.",
  },
  {
    question: "How does client-side processing work?",
    answer: "When you upload a file, it stays entirely in your browser. JavaScript processes the file locally, removing metadata before you download the cleaned version. No data is ever sent to our servers.",
  },
  {
    question: "What metadata can be removed from photos?",
    answer: "MetaClean can remove GPS coordinates, camera information, device model, software tags, timestamps, and other EXIF data from JPG, JPEG, PNG, and WEBP images.",
  },
  {
    question: "Can I remove metadata from PDF files?",
    answer: "Yes, MetaClean can remove author information, title, creator, producer, keywords, and other metadata from PDF files while preserving the document content.",
  },
  {
    question: "What text file formats are supported?",
    answer: "MetaClean supports TXT, CSV, JSON, and XML files. It can remove hidden Unicode characters, BOM markers, normalize line endings, and remove invisible tracking characters.",
  },
  {
    question: "Is my data safe when using MetaClean?",
    answer: "Absolutely. Since all processing happens locally in your browser, your files never leave your device. We have no access to your data, and no information is stored or transmitted.",
  },
  {
    question: "Do I need to install any software?",
    answer: "No, MetaClean is a web-based tool that works directly in your browser. There's nothing to download or install. Simply visit the website and start cleaning your files.",
  },
  {
    question: "Can I use MetaClean on mobile?",
    answer: "Yes, MetaClean is fully responsive and works on all devices including smartphones, tablets, and desktops. The interface adapts to your screen size for the best experience.",
  },
  {
    question: "What is EXIF data?",
    answer: "EXIF (Exchangeable Image File Format) is metadata embedded in photos by cameras and smartphones. It can include GPS location, camera model, date/time, and other technical information.",
  },
  {
    question: "Why should I remove metadata from photos?",
    answer: "Metadata can reveal sensitive information like your location, the device you use, and when photos were taken. Removing metadata protects your privacy before sharing photos online.",
  },
  {
    question: "Can I batch process multiple files?",
    answer: "Yes, MetaClean supports batch processing. You can upload and clean multiple files at once, saving time when you need to remove metadata from many files.",
  },
  {
    question: "What is a privacy score?",
    answer: "MetaClean calculates a privacy score from 0-100 based on the metadata found in your files. Higher scores mean better privacy. GPS data, device info, and author tags all lower your score.",
  },
  {
    question: "Does MetaClean work offline?",
    answer: "Yes, once the page is loaded, MetaClean can work offline since all processing happens locally in your browser. You can even bookmark the page for offline use.",
  },
  {
    question: "How do I know if my file has been cleaned properly?",
    answer: "After cleaning, MetaClean shows you a before/after comparison of the metadata. You can verify that sensitive information has been removed before downloading the cleaned file.",
  },
];

const faqsRu = [
  {
    question: "Что такое MetaClean?",
    answer: "MetaClean — это бесплатный браузерный инструмент для удаления метаданных из фотографий, документов PDF и текстовых файлов. Вся обработка происходит прямо в вашем браузере — файлы никогда не передаются на сервер.",
  },
  {
    question: "MetaClean действительно бесплатен?",
    answer: "Да, MetaClean полностью бесплатен. Здесь нет скрытых платежей, подписок или лимитов на количество файлов. Мы убеждены, что средства защиты приватности должны быть доступны каждому.",
  },
  {
    question: "Как работает обработка на стороне клиента?",
    answer: "Когда вы выбираете файл, он остается исключительно в вашем браузере. Скрипты JavaScript и WebAssembly обрабатывают его локально, стирая метаданные перед скачиванием очищенной копии.",
  },
  {
    question: "Какие метаданные можно удалить из фотографий?",
    answer: "MetaClean удаляет GPS-координаты места съемки, модель камеры и телефона, серийные номера, метки графических редакторов, дату и время, а также все прочие EXIF-данные из файлов JPG, JPEG, PNG и WEBP.",
  },
  {
    question: "Можно ли удалить метаданные из файлов PDF?",
    answer: "Да, MetaClean удаляет имя автора, заголовок документа, название программы создания, ключевые слова и прочие свойства, сохраняя текст и оформление документа без изменений.",
  },
  {
    question: "Какие текстовые форматы поддерживаются?",
    answer: "MetaClean поддерживает форматы TXT, CSV, JSON и XML. Инструмент удаляет скрытые символы Юникода, метки BOM, невидимые трекеры и нормализует окончания строк.",
  },
  {
    question: "Безопасны ли мои данные при использовании MetaClean?",
    answer: "Абсолютно. Поскольку обработка происходит локально в браузере, ваши файлы не покидают компьютер или смартфон. Ни у нас, ни у третьих лиц нет доступа к вашим файлам.",
  },
  {
    question: "Нужно ли устанавливать программы или расширения?",
    answer: "Нет, MetaClean работает полностью в браузере онлайн. Ничего скачивать и устанавливать не требуется. Просто откройте сайт и очистите файлы.",
  },
  {
    question: "Работает ли сервис на смартфонах?",
    answer: "Да, интерфейс MetaClean полностью адаптивен и работает на смартфонах iOS и Android, планшетах и компьютерах.",
  },
  {
    question: "Что такое EXIF-данные?",
    answer: "EXIF (Exchangeable Image File Format) — это технические метаданные, встраиваемые камерами и телефонами в каждый снимок. Они включают координаты геолокации, модель устройства, дату и параметры экспозиции.",
  },
  {
    question: "Зачем удалять метаданные перед отправкой фото?",
    answer: "Метаданные могут выдать ваш домашний адрес, марку телефона и точное время съемки. Очистка метаданных защищает вас от сталкеров, мошенников и нежелательной слежки.",
  },
  {
    question: "Поддерживается ли пакетная очистка нескольких файлов?",
    answer: "Да, в MetaClean есть инструмент пакетной очистки. Вы можете загрузить десятки файлов сразу и скачать очищенные версии одним архивом ZIP.",
  },
  {
    question: "Что означает оценка приватности (Privacy Score)?",
    answer: "MetaClean оценивает файл по шкале от 0 до 100 на основе найденных метаданных. 100 — файл полностью чист и безопасен. GPS, данные об авторе и камере снижают оценку.",
  },
  {
    question: "Работает ли MetaClean без интернета (офлайн)?",
    answer: "Да, после того как страница загрузилась, инструмент может работать без подключения к сети, так как все вычисления производятся исключительно вашим браузером.",
  },
  {
    question: "Как убедиться, что файл действительно очищен?",
    answer: "После обработки MetaClean наглядно показывает сравнение «До» и «После». Вы можете лично убедиться, что все конфиденциальные поля удалены.",
  },
];

export default function HomePage() {
  const { lang, t } = useLanguage();
  const isRu = lang === "ru";

  const faqs = isRu ? faqsRu : faqsEn;

  const features = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: t("home.feat_private_title"),
      description: t("home.feat_private_desc"),
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: t("home.feat_instant_title"),
      description: t("home.feat_instant_desc"),
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: t("home.feat_no_uploads_title"),
      description: t("home.feat_no_uploads_desc"),
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t("home.feat_free_title"),
      description: t("home.feat_free_desc"),
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: t("home.step1_title"),
      description: t("home.step1_desc"),
    },
    {
      step: "02",
      title: t("home.step2_title"),
      description: t("home.step2_desc"),
    },
    {
      step: "03",
      title: t("home.step3_title"),
      description: t("home.step3_desc"),
    },
  ];

  const toolCards = [
    {
      title: isRu ? "Очистка метаданных фото" : "Photo Metadata Remover",
      description: isRu
        ? "Удаление данных EXIF, GPS-координат, параметров камеры и времени с изображений."
        : "Remove EXIF data, GPS coordinates, camera info, and timestamps from images.",
      href: "/remove-photo-metadata/",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      features: isRu
        ? ["Поддержка JPG, PNG, WEBP", "Удаление координат GPS", "Стирание данных камеры", "Предпросмотр до и после"]
        : ["JPG, PNG, WEBP support", "Remove GPS data", "Remove camera info", "Before/after preview"],
    },
    {
      title: isRu ? "Удаление GPS-локации" : "GPS Remover",
      description: isRu
        ? "Извлечение и удаление точных координат места съемки для защиты конфиденциальности."
        : "Extract and display GPS coordinates. Remove location data to protect your privacy.",
      href: "/remove-gps-from-photo/",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      features: isRu
        ? ["Извлечение координат", "Ссылка на Google Maps", "Удаление только GPS", "Предупреждения об угрозах"]
        : ["Extract GPS coords", "Google Maps link", "Remove GPS only", "Privacy warnings"],
    },
    {
      title: isRu ? "Просмотр данных EXIF" : "EXIF Viewer",
      description: isRu
        ? "Детальный анализ всех скрытых метаданных в ваших фото с удобным поиском и категориями."
        : "Inspect all metadata embedded in your photos. Searchable table with categories.",
      href: "/exif-viewer/",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      features: isRu
        ? ["Перетаскивание файлов", "Поиск по полям", "Фильтры категорий", "Оценка приватности"]
        : ["Drag & drop", "Searchable fields", "Category filters", "Privacy score"],
    },
    {
      title: isRu ? "Очистка для соцсетей" : "Social Media Cleaner",
      description: isRu
        ? "Проверка фото на риски приватности перед публикацией. Очистка в один клик."
        : "Analyze photos for privacy risks before posting. One-click clean for social media.",
      href: "/social-media-cleaner/",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2" />
        </svg>
      ),
      features: isRu
        ? ["Определение устройства", "Предупреждения о GPS", "Скрытие даты", "Очистка в 1 клик"]
        : ["Device detection", "GPS warnings", "Date exposure", "One-click clean"],
    },
    {
      title: isRu ? "Пакетная очистка" : "Batch Metadata Remover",
      description: isRu
        ? "Загружайте десятки файлов и очищайте метаданные сразу со всех. Скачивание в ZIP."
        : "Upload multiple files and clean metadata from all of them. Download as ZIP.",
      href: "/batch-metadata-remover/",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      features: isRu
        ? ["Множество файлов", "Индикатор прогресса", "Скачивание в ZIP", "Поддержка фото и PDF"]
        : ["Multiple files", "Progress tracking", "ZIP download", "Photo & PDF support"],
    },
    {
      title: isRu ? "Оценка приватности" : "Privacy Score",
      description: isRu
        ? "Расчет индекса приватности от 0 до 100. Подробная расшифровка угроз в ваших файлах."
        : "Calculate privacy score from 0-100. See detailed risk breakdown for your files.",
      href: "/privacy-score-tool/",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: isRu
        ? ["График оценки", "Уровень риска", "Детальный отчет", "Обнаружение уязвимостей"]
        : ["Score circle", "Risk level", "Detailed breakdown", "Issue detection"],
    },
  ];

  const blogPosts = [
    {
      title: isRu ? "Как удалить данные EXIF из фотографий" : "How to Remove EXIF Data From Photos",
      description: isRu
        ? "Пошаговое руководство по удалению скрытых метаданных из фото перед публикацией в сети."
        : "A complete guide to removing hidden metadata from your photos before sharing online.",
      href: "/blog/how-to-remove-exif-data/",
      readTime: isRu ? "5 мин чтения" : "5 min read",
    },
    {
      title: isRu ? "Чем опасны метаданные в фотографиях" : "Why Photo Metadata Can Be Dangerous",
      description: isRu
        ? "Узнайте, какую конфиденциальную информацию о вас и вашей семье могут раскрыть фотографии."
        : "Learn how metadata in your photos can expose sensitive information about you.",
      href: "/blog/photo-metadata-danger/",
      readTime: isRu ? "7 мин чтения" : "7 min read",
    },
    {
      title: isRu ? "GPS в фото: как координаты выдают ваше местоположение" : "GPS Metadata: How It Reveals Your Location",
      description: isRu
        ? "Как встроенные координаты в фото позволяют злоумышленникам точно определить ваш домашний адрес."
        : "Discover how GPS data in photos can pinpoint your exact location.",
      href: "/blog/gps-metadata-danger/",
      readTime: isRu ? "6 мин чтения" : "6 min read",
    },
  ];

  const privacyGuarantees = isRu
    ? [
        t("home.guarantee_1"),
        t("home.guarantee_2"),
        t("home.guarantee_3"),
        t("home.guarantee_4"),
        t("home.guarantee_5"),
      ]
    : [
        "Zero server uploads — ever",
        "No cookies or tracking",
        "No data collection",
        "Open-source code",
        "Works offline after first load",
      ];

  return (
    <>
      <JsonLd data={generateWebApplicationSchema()} />
      <JsonLd data={generateFAQSchema(faqs)} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
              {t("home.badge")}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              {t("home.hero_h1_prefix")}{" "}
              <span className="text-primary">{t("home.hero_h1_highlight")}</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("home.hero_desc")}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/remove-photo-metadata/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-primary-hover transition-all hover:shadow-md active:scale-[0.98]"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {t("home.btn_photo")}
              </Link>
              <Link
                href="/remove-pdf-metadata/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-8 py-3.5 text-base font-semibold text-foreground hover:bg-muted transition-all"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t("home.btn_pdf")}
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {[
                t("home.badge_client"),
                t("home.badge_no_uploads"),
                t("home.badge_private"),
                t("home.badge_free"),
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  <svg className="h-3.5 w-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tool Cards Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">{t("home.tools_title")}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{t("home.tools_desc")}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {toolCards.map((card, idx) => (
              <ToolCard
                key={idx}
                title={card.title}
                description={card.description}
                href={card.href}
                icon={card.icon}
                features={card.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">{t("home.why_title")}</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              {t("home.why_desc")}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Explanation */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-white p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground">{t("home.stay_private_title")}</h2>
                <p className="mt-4 text-muted-foreground">
                  {t("home.stay_private_desc")}
                </p>
                <ul className="mt-6 space-y-4">
                  {privacyGuarantees.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-success shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-muted/50 p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 text-success">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t("home.before_metaclean")}</p>
                      <p className="text-xs text-muted-foreground">{t("home.before_desc")}</p>
                    </div>
                  </div>

                  <div className="ml-5 border-l-2 border-border pl-5 space-y-2 text-xs text-muted-foreground font-mono">
                    <p>GPS: 40.7128° N, 74.0060° W</p>
                    <p>Device: iPhone 15 Pro</p>
                    <p>Author: John Doe</p>
                    <p>Software: Adobe Photoshop</p>
                    <p>Date: 2024-01-15T14:30:00Z</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t("home.after_metaclean")}</p>
                      <p className="text-xs text-muted-foreground">{t("home.after_desc")}</p>
                    </div>
                  </div>

                  <div className="ml-5 border-l-2 border-border pl-5 space-y-2 text-xs text-muted-foreground font-mono">
                    <p className="text-success">GPS: [REMOVED]</p>
                    <p className="text-success">Device: [REMOVED]</p>
                    <p className="text-success">Author: [REMOVED]</p>
                    <p className="text-success">Software: [REMOVED]</p>
                    <p className="text-success">Date: [REMOVED]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">{t("home.how_title")}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{t("home.how_desc")}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-1/2 w-full h-0.5 bg-border" />
                )}
                <div className="relative text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Previews */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">{t("home.resources_title")}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{t("home.resources_desc")}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Link
                key={index}
                href={post.href}
                className="group rounded-xl border border-border bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <span className="text-xs font-medium text-primary">{post.readTime}</span>
                <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {t("ui.read_more")}
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FAQSection
            title={t("faq.title")}
            description={t("faq.desc")}
            faqs={faqs}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">{t("home.cta_title")}</h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            {t("home.cta_desc")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/remove-photo-metadata/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary hover:bg-white/90 transition-all"
            >
              {t("home.cta_btn")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
