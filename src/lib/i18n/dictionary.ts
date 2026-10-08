import { BLOG_TRANSLATIONS } from "./blog-translations";

export interface PageMeta {
  title: string;
  desc: string;
}

export const PAGE_METADATA: Record<string, Record<"en" | "ru", PageMeta>> = {
  "/": {
    en: {
      title: "MetaClean — Remove Metadata Instantly | Private & Client-Side",
      desc: "Free, client-side metadata removal for photos, PDFs, and text files. Protect your privacy before sharing files online. Zero server uploads.",
    },
    ru: {
      title: "MetaClean — Мгновенное удаление метаданных | Приватно и в браузере",
      desc: "Бесплатное удаление метаданных из фото, PDF и текста прямо в браузере. Защитите приватность перед отправкой файлов. Без загрузки на сервер.",
    },
  },
  "/remove-photo-metadata/": {
    en: {
      title: "Remove Photo Metadata Online Free — EXIF, GPS, Camera Info | MetaClean",
      desc: "Remove EXIF data, GPS coordinates, camera information, and timestamps from photos instantly. Free client-side tool. Your files never leave your device.",
    },
    ru: {
      title: "Удалить метаданные фото онлайн бесплатно — EXIF, GPS, камера | MetaClean",
      desc: "Мгновенное удаление данных EXIF, GPS-координат, параметров камеры и времени с фото. Бесплатно и локально в браузере.",
    },
  },
  "/remove-pdf-metadata/": {
    en: {
      title: "Remove PDF Metadata Online Free — Author, Title, Software | MetaClean",
      desc: "Remove author, title, creator, and producer metadata from PDF files instantly. Free client-side tool. Your files never leave your device.",
    },
    ru: {
      title: "Удалить метаданные PDF онлайн бесплатно — Автор, заголовок | MetaClean",
      desc: "Удаление автора, названия, программы создания и скрытых свойств из PDF. Бесплатно в браузере без отправки на сервер.",
    },
  },
  "/remove-text-metadata/": {
    en: {
      title: "Clean Text Files Online Free — Hidden Characters, BOM, Tracking | MetaClean",
      desc: "Remove hidden Unicode characters, BOM markers, and invisible tracking data from text files. Free client-side tool. Your files never leave your device.",
    },
    ru: {
      title: "Очистка текстовых файлов онлайн — Скрытые символы, BOM, трекеры | MetaClean",
      desc: "Удаление невидимых символов Юникода, BOM-меток и скрытого трекинга из текста, TXT, CSV, JSON. Локально и безопасно.",
    },
  },
  "/remove-gps-from-photo/": {
    en: {
      title: "Remove GPS Coordinates From Photos Free — Location Privacy | MetaClean",
      desc: "Extract and remove GPS coordinates from photos. Protect your location privacy. Free client-side tool that never uploads your files.",
    },
    ru: {
      title: "Удалить GPS-координаты из фото бесплатно — Приватность локации | MetaClean",
      desc: "Извлечение и удаление GPS-координат из фотографий. Защитите данные о своем местоположении без загрузки файлов на сервер.",
    },
  },
  "/exif-viewer/": {
    en: {
      title: "EXIF Viewer Online Free — Inspect Photo Metadata & GPS | MetaClean",
      desc: "Inspect all metadata embedded in your photos including EXIF, GPS, camera settings, and timestamps. Free client-side tool. Your files never leave your device.",
    },
    ru: {
      title: "Просмотр EXIF онлайн бесплатно — Анализ метаданных и GPS фото | MetaClean",
      desc: "Просматривайте все скрытые метаданные фото: параметры EXIF, GPS-координаты, модель камеры и дату съемки прямо в браузере.",
    },
  },
  "/social-media-cleaner/": {
    en: {
      title: "Social Media Photo Cleaner — Privacy Risk Detection | MetaClean",
      desc: "Analyze photos for privacy risks before posting to social media. Detect GPS, device info, and timestamps. One-click cleaning.",
    },
    ru: {
      title: "Очистка фото для соцсетей — Защита от утечки данных | MetaClean",
      desc: "Проверьте фото на риски приватности перед публикацией в соцсетях. Удаление GPS, модели телефона и даты в один клик.",
    },
  },
  "/batch-metadata-remover/": {
    en: {
      title: "Batch Metadata Remover — Clean Multiple Files at Once | MetaClean",
      desc: "Remove metadata from multiple photos and PDFs simultaneously. Batch processing in your browser. Download all cleaned files as a ZIP archive.",
    },
    ru: {
      title: "Пакетное удаление метаданных — Очистка нескольких файлов сразу | MetaClean",
      desc: "Массовая очистка метаданных множества фото и PDF одновременно в браузере. Скачивание всех очищенных файлов одним ZIP-архивом.",
    },
  },
  "/privacy-score-tool/": {
    en: {
      title: "Privacy Score Tool — Analyze File Privacy Risks | MetaClean",
      desc: "Calculate a privacy score from 0-100 for your photos and documents. See detailed risk breakdown and recommendations to protect your privacy.",
    },
    ru: {
      title: "Оценка приватности файлов — Анализ рисков утечки данных | MetaClean",
      desc: "Оцените уровень конфиденциальности ваших файлов по шкале от 0 до 100. Подробный отчет об угрозах и рекомендации по защите.",
    },
  },
  "/about/": {
    en: {
      title: "About MetaClean — Privacy-First Metadata Removal",
      desc: "Learn about MetaClean's mission to protect digital privacy through free, client-side metadata removal tools. Your files never leave your device.",
    },
    ru: {
      title: "О MetaClean — Защита приватности через локальную очистку данных",
      desc: "Миссия MetaClean: защита конфиденциальности с помощью бесплатных браузерных инструментов. Файлы никогда не передаются на сервер.",
    },
  },
  "/contact/": {
    en: {
      title: "Contact Us — MetaClean",
      desc: "Get in touch with the MetaClean team. Questions, feedback, or support — we'd love to hear from you.",
    },
    ru: {
      title: "Связаться с нами — MetaClean",
      desc: "Свяжитесь с командой MetaClean. Вопросы, отзывы или предложения — мы всегда рады обратной связи.",
    },
  },
  "/privacy/": {
    en: {
      title: "Privacy Policy — MetaClean",
      desc: "MetaClean collects no data. All processing happens client-side. Your files never leave your browser.",
    },
    ru: {
      title: "Политика конфиденциальности — MetaClean",
      desc: "MetaClean не собирает никаких данных. Вся обработка происходит на клиенте. Ваши файлы никогда не покидают браузер.",
    },
  },
  "/terms/": {
    en: {
      title: "Terms of Service — MetaClean",
      desc: "Terms governing your use of MetaClean's free, client-side metadata removal tools.",
    },
    ru: {
      title: "Условия использования — MetaClean",
      desc: "Условия использования бесплатных клиентских инструментов удаления метаданных MetaClean.",
    },
  },
  "/privacy-guide/": {
    en: {
      title: "Privacy Guide - How to Protect Your Digital Privacy | MetaClean",
      desc: "Learn how metadata in your files can expose sensitive information and how to protect your privacy online. Complete guide to digital privacy protection.",
    },
    ru: {
      title: "Руководство по приватности — Как защитить данные в сети | MetaClean",
      desc: "Узнайте, как метаданные в файлах могут раскрыть конфиденциальную информацию и как защитить себя в интернете.",
    },
  },
  "/blog/": {
    en: {
      title: "Blog — Privacy Tips & Metadata Removal Guides | MetaClean",
      desc: "Learn how to protect your digital privacy. Guides on removing metadata from photos, PDFs, and text files. Expert tips for online safety.",
    },
    ru: {
      title: "Блог — Руководства по приватности и очистке метаданных | MetaClean",
      desc: "Статьи и инструкции по защите личных данных, удалению EXIF из фото, очистке PDF и цифровой безопасности.",
    },
  },
  "/blog/android-photo-metadata-explained/": {
    en: {
      title: "Android Photo Metadata Explained",
      desc: "Discover what metadata Android phones record in photos, how Samsung, Google Pixel, and other manufacturers handle location tags, and how to disable them.",
    },
    ru: {
      title: "Метаданные фото на Android: что записывает телефон",
      desc: "Узнайте, какие метаданные записывают смартфоны Android в фото, как Samsung, Google Pixel и другие бренды обрабатывают геометки и как их отключить.",
    },
  },
  "/blog/batch-metadata-removal/": {
    en: {
      title: "Batch Metadata Removal: Clean Multiple Files at Once",
      desc: "Learn how to remove metadata from multiple photos simultaneously with batch processing. Save time cleaning hundreds of files before sharing or publishing.",
    },
    ru: {
      title: "Пакетное удаление метаданных: чистим все файлы разом",
      desc: "Узнайте, как удалять метаданные сразу с нескольких фото с помощью пакетной обработки. Экономьте время и очищайте сотни файлов перед публикацией.",
    },
  },
  "/blog/best-metadata-cleaner-tools/": {
    en: {
      title: "Best Free Metadata Cleaner Tools",
      desc: "Compare the best free tools for removing metadata from photos, PDFs, and text files. Find the right tool for your privacy needs.",
    },
    ru: {
      title: "Лучшие бесплатные очистители метаданных",
      desc: "Сравните лучшие бесплатные инструменты для удаления метаданных из фото, PDF и текстов. Найдите подходящий инструмент для защиты своей приватности.",
    },
  },
  "/blog/best-metadata-viewer-tools/": {
    en: {
      title: "Best Metadata Viewer Tools",
      desc: "Compare the best metadata viewer tools for photos and documents. Find the right tool to check EXIF data, PDF properties, and hidden file information.",
    },
    ru: {
      title: "Лучшие просмотрщики метаданных: сравнение",
      desc: "Сравните лучшие инструменты для просмотра метаданных фото и документов. Выберите, чем проверить данные EXIF, свойства PDF и скрытую информацию файла.",
    },
  },
  "/blog/can-metadata-reveal-home-address/": {
    en: {
      title: "Can Metadata Reveal Your Home Address",
      desc: "GPS coordinates in photos can pinpoint your exact home address. Learn how metadata exposes your location and how to protect yourself from location tracking.",
    },
    ru: {
      title: "Метаданные раскрывают ваш домашний адрес?",
      desc: "GPS-координаты в фото указывают точный домашний адрес. Узнайте, как метаданные выдают ваше местоположение и как защититься от слежки по геоданным.",
    },
  },
  "/blog/complete-photo-privacy-guide/": {
    en: {
      title: "Complete Photo Privacy Guide",
      desc: "Master photo privacy with our comprehensive guide. Learn to remove metadata, configure platform settings, and develop safe sharing habits to protect your personal information.",
    },
    ru: {
      title: "Полный гайд по приватности фотографий",
      desc: "Освойте приватность фото с нашим подробным гайдом: удаление метаданных, настройка платформ и безопасный шаринг для защиты личной информации в интернете.",
    },
  },
  "/blog/does-apple-strip-metadata/": {
    en: {
      title: "Does Apple Strip Metadata",
      desc: "Find out how Apple handles photo metadata across iPhone, iPad, and Mac. Learn what metadata Apple strips, what it keeps, and what you can do to protect your privacy.",
    },
    ru: {
      title: "Удаляет ли Apple метаданные из фото?",
      desc: "Узнайте, как Apple обрабатывает метаданные на iPhone, iPad и Mac: какие данные EXIF она удаляет, какие оставляет и как защитить свою приватность.",
    },
  },
  "/blog/does-google-strip-metadata/": {
    en: {
      title: "Does Google Strip Metadata",
      desc: "Learn how Google handles photo metadata across Google Photos, Gmail, Drive, and Android. Understand what metadata Google strips and what it retains.",
    },
    ru: {
      title: "Удаляет ли Google метаданные из фото?",
      desc: "Узнайте, как Google работает с метаданными в Google Photos, Gmail, Drive и Android: какие данные EXIF платформа удаляет, а какие сохраняет у себя.",
    },
  },
  "/blog/exif-viewer-guide/": {
    en: {
      title: "EXIF Viewer Guide",
      desc: "How to use the MetaClean EXIF Viewer to inspect photo metadata. Learn to read EXIF categories, search fields, and interpret results for better privacy.",
    },
    ru: {
      title: "Гайд по просмотру EXIF в MetaClean",
      desc: "Как использовать инструмент MetaClean «Просмотр EXIF» для просмотра метаданных: разбираем категории EXIF, поля поиска и трактовку результатов для приватности.",
    },
  },
  "/blog/gps-metadata-danger/": {
    en: {
      title: "How GPS Metadata Reveals Your Location",
      desc: "Learn how GPS data embedded in your photos can reveal your exact location and how to remove it.",
    },
    ru: {
      title: "Как GPS-метаданные выдают ваше местоположение",
      desc: "Узнайте, как GPS-данные, встроенные в ваши фото, раскрывают точное местоположение, и как удалить геоданные из снимков перед публикацией в интернете.",
    },
  },
  "/blog/how-companies-track-metadata/": {
    en: {
      title: "How Companies Track Metadata",
      desc: "Companies collect and analyze metadata from your photos, documents, and devices. Learn how corporate metadata tracking works and how to protect yourself.",
    },
    ru: {
      title: "Как компании отслеживают метаданные",
      desc: "Компании собирают и анализируют метаданные ваших фото, документов и устройств. Узнайте, как работает корпоративный сбор метаданных и как защититься.",
    },
  },
  "/blog/how-investigators-use-metadata/": {
    en: {
      title: "How Investigators Use Metadata",
      desc: "Digital forensics investigators use metadata to track suspects, verify evidence, and reconstruct events. Learn how metadata analysis works in investigations.",
    },
    ru: {
      title: "Как следователи используют метаданные",
      desc: "Следователи цифровой криминалистики используют метаданные для поиска подозреваемых, проверки улик и восстановления событий. Разбираем, как это работает.",
    },
  },
  "/blog/how-journalists-remove-metadata/": {
    en: {
      title: "How Journalists Remove Metadata",
      desc: "Journalists face unique metadata risks when protecting sources. Learn how media professionals strip EXIF data from photos and documents to safeguard confidential information.",
    },
    ru: {
      title: "Как журналисты удаляют метаданные",
      desc: "Журналисты рискуют, защищая источники. Узнайте, как медиапрофессионалы удаляют данные EXIF из фото и документов, чтобы сохранить конфиденциальность.",
    },
  },
  "/blog/how-to-check-metadata-online/": {
    en: {
      title: "How To Check Metadata Online",
      desc: "Learn how to view and analyze metadata in your photos and documents using online tools. Check what hidden data your files reveal before sharing them.",
    },
    ru: {
      title: "Как проверить метаданные онлайн",
      desc: "Узнайте, как просматривать и анализировать метаданные в фото и документах с помощью онлайн-инструментов. Проверьте скрытые данные файлов перед шарингом.",
    },
  },
  "/blog/how-to-hide-photo-location/": {
    en: {
      title: "How To Hide Photo Location",
      desc: "Practical tips for hiding your photo location. Learn multiple methods to protect your location privacy when sharing photos online.",
    },
    ru: {
      title: "Как скрыть местоположение на фото",
      desc: "Практические советы по скрытию геометки фото. Узнайте несколько способов защитить приватность местоположения при публикации фотографий в интернете.",
    },
  },
  "/blog/how-to-read-exif-data/": {
    en: {
      title: "How To Read EXIF Data",
      desc: "Learn how to read and interpret EXIF metadata fields in your photos. Understand camera settings, GPS coordinates, timestamps, and other embedded data.",
    },
    ru: {
      title: "Как читать данные EXIF: подробный гайд",
      desc: "Учитесь читать и понимать поля данных EXIF в фото: настройки камеры, GPS-координаты, метки времени и другие встроенные данные простым языком.",
    },
  },
  "/blog/how-to-remove-exif-data/": {
    en: {
      title: "How to Remove EXIF Data From Photos",
      desc: "Learn how to remove hidden EXIF metadata from your photos before sharing online. Step-by-step guide to protect your privacy.",
    },
    ru: {
      title: "Как удалить данные EXIF из фото",
      desc: "Пошаговый гайд по удалению скрытых данных EXIF из ваших фото перед публикацией в интернете. Несколько простых способов защитить свою приватность.",
    },
  },
  "/blog/how-to-remove-metadata-from-screenshots/": {
    en: {
      title: "How To Remove Metadata From Screenshots",
      desc: "Screenshots often contain hidden metadata including device info, timestamps, and app data. Learn how to clean screenshots before sharing to protect your privacy.",
    },
    ru: {
      title: "Как удалить метаданные со скриншотов",
      desc: "Скриншоты часто содержат скрытые метаданные: данные устройства, время создания и сведения о приложении. Узнайте, как очистить их перед публикацией.",
    },
  },
  "/blog/iphone-photo-metadata-explained/": {
    en: {
      title: "iPhone Photo Metadata Explained",
      desc: "Learn what metadata your iPhone records in every photo, how GPS coordinates are embedded, and how to disable location tracking on iOS.",
    },
    ru: {
      title: "Метаданные фото на iPhone: что записывает iOS",
      desc: "Узнайте, какие метаданные записывает iPhone в каждое фото, как встраиваются GPS-координаты и как отключить отслеживание местоположения на iOS.",
    },
  },
  "/blog/metadata-and-cybersecurity/": {
    en: {
      title: "Metadata And Cybersecurity",
      desc: "Metadata creates cybersecurity risks from reconnaissance to data breaches. Learn how attackers exploit metadata and how to defend against these threats.",
    },
    ru: {
      title: "Метаданные и кибербезопасность",
      desc: "Метаданные создают риски для кибербезопасности — от разведки до утечек данных. Узнайте, как злоумышленники эксплуатируют метаданные и как защититься.",
    },
  },
  "/blog/metadata-and-gdpr/": {
    en: {
      title: "Metadata And GDPR",
      desc: "GDPR classifies metadata as personal data in many contexts. Learn how European privacy regulations apply to photo and document metadata and how to stay compliant.",
    },
    ru: {
      title: "Метаданные и GDPR: что нужно знать",
      desc: "GDPR классифицирует метаданные как персональные данные во многих случаях. Узнайте, как европейские законы о приватности применяются к фото и документам.",
    },
  },
  "/blog/metadata-and-privacy-laws/": {
    en: {
      title: "Metadata And Privacy Laws",
      desc: "Privacy regulations worldwide address metadata differently. Learn how global privacy laws treat photo and document metadata and what compliance means for individuals and businesses.",
    },
    ru: {
      title: "Метаданные и законы о приватности",
      desc: "Законы о приватности в мире по-разному регулируют метаданные. Узнайте, как их трактуют для фото и документов и что это значит для людей и бизнеса.",
    },
  },
  "/blog/metadata-cleaner-guide/": {
    en: {
      title: "Metadata Cleaner Guide",
      desc: "Complete tutorial for all MetaClean tools. Learn how to remove metadata from photos, PDFs, and text files with step-by-step instructions and tips.",
    },
    ru: {
      title: "Полный гайд по очистке метаданных в MetaClean",
      desc: "Полное руководство по всем инструментам MetaClean: как удалить метаданные из фото, PDF и текстовых файлов — подробные пошаговые инструкции и советы.",
    },
  },
  "/blog/metadata-in-drones-photos/": {
    en: {
      title: "Metadata In Drone Photos",
      desc: "Drone photos contain extensive metadata including GPS, altitude, gimbal data, and flight information. Learn what your drone records and how to protect your privacy.",
    },
    ru: {
      title: "Метаданные в фото с дронов",
      desc: "Фото с дронов содержат много метаданных: GPS, высоту, данные гимбала и сведения о полёте. Узнайте, что записывает ваш дрон, и защитите приватность.",
    },
  },
  "/blog/metadata-security-risks/": {
    en: {
      title: "Metadata Security Risks",
      desc: "Discover the real security risks of metadata — from stalking and burglary to social engineering and identity theft. Learn how hidden data in your files can be exploited.",
    },
    ru: {
      title: "Риски безопасности метаданных в файлах",
      desc: "Реальные угрозы метаданных: преследование, кража, социальная инженерия и мошенничество с личностью. Узнайте, как используются скрытые данные файлов.",
    },
  },
  "/blog/photo-metadata-danger/": {
    en: {
      title: "Why Photo Metadata Can Be Dangerous",
      desc: "Learn how metadata in your photos can expose sensitive information and put your privacy at risk.",
    },
    ru: {
      title: "Чем опасны метаданные в фотографиях",
      desc: "Узнайте, как метаданные в ваших фото раскрывают чувствительную информацию и ставят под угрозу вашу приватность в интернете, и как этого избежать.",
    },
  },
  "/blog/photo-metadata-for-ecommerce/": {
    en: {
      title: "Photo Metadata For Ecommerce",
      desc: "Why ecommerce sellers should remove photo metadata from product images. Protect your supply chain, supplier relationships, and pricing strategies.",
    },
    ru: {
      title: "Метаданные фото для интернет-магазинов",
      desc: "Узнайте, почему продавцам в интернет-магазине важно удалять метаданные из товарных фото. Защитите цепочку поставок, партнёров и ценообразование.",
    },
  },
  "/blog/photo-metadata-for-real-estate/": {
    en: {
      title: "Photo Metadata For Real Estate",
      desc: "Why real estate agents and property sellers should remove photo metadata before listing properties online. Protect your clients and listings from privacy risks.",
    },
    ru: {
      title: "Метаданные фото для недвижимости",
      desc: "Почему риелторам и продавцам жилья стоит удалять метаданные из фото перед публикацией объявлений. Защитите клиентов и объекты от рисков утечки.",
    },
  },
  "/blog/protect-your-location-in-photos/": {
    en: {
      title: "Protect Your Location in Photos: A Complete GPS Privacy Guide",
      desc: "Learn how to disable GPS tagging on your phone, remove existing location data from photos, and share images safely without revealing where you live or travel.",
    },
    ru: {
      title: "Защита местоположения в фото: гайд по GPS-приватности",
      desc: "Узнайте, как отключить GPS-метки на телефоне, удалить геоданные из фото и безопасно делиться снимками, не раскрывая, где вы живёте или путешествуете.",
    },
  },
  "/blog/remove-gps-coordinates-from-images/": {
    en: {
      title: "Remove GPS Coordinates From Images",
      desc: "Step-by-step guide to removing GPS coordinates from your photos. Learn how geotags get embedded, how to view them, and how to strip them before sharing.",
    },
    ru: {
      title: "Как удалить GPS-координаты из изображений",
      desc: "Пошаговое руководство по удалению GPS-координат из фото: как встраиваются геометки, как их посмотреть и как безопасно удалить перед публикацией.",
    },
  },
  "/blog/remove-metadata-before-email/": {
    en: {
      title: "Remove Metadata Before Sending Photos By Email",
      desc: "Email attachments often retain full EXIF metadata including GPS coordinates. Learn how to strip metadata from photos before emailing to protect your privacy.",
    },
    ru: {
      title: "Удаление метаданных перед отправкой фото по email",
      desc: "Вложения в письмах часто сохраняют полные данные EXIF, включая GPS-координаты. Узнайте, как очистить метаданные из фото перед отправкой письма.",
    },
  },
  "/blog/remove-metadata-before-facebook-uploads/": {
    en: {
      title: "Remove Metadata Before Facebook Uploads",
      desc: "Understand how Facebook handles photo metadata, what data it collects, and how to protect your privacy by removing EXIF data before uploading.",
    },
    ru: {
      title: "Удаление метаданных перед загрузкой в Facebook*",
      desc: "Узнайте, как Facebook* работает с метаданными фото, какие данные собирает и как защитить приватность, удалив данные EXIF перед загрузкой на платформу.",
    },
  },
  "/blog/remove-metadata-before-instagram/": {
    en: {
      title: "Remove Metadata Before Instagram",
      desc: "Learn how Instagram handles photo metadata, what data survives upload, and how to remove EXIF data before posting to protect your privacy.",
    },
    ru: {
      title: "Удаление метаданных перед публикацией в Instagram*",
      desc: "Узнайте, как Instagram* обрабатывает метаданные фото, какие данные переживают загрузку, и как удалить данные EXIF перед публикацией ради приватности.",
    },
  },
  "/blog/remove-metadata-before-linkedin/": {
    en: {
      title: "Remove Metadata Before Uploading To LinkedIn",
      desc: "Professional photos on LinkedIn carry hidden metadata. Learn how LinkedIn handles photo EXIF data and how to protect your privacy when sharing professional images.",
    },
    ru: {
      title: "Удаление метаданных перед загрузкой в LinkedIn",
      desc: "Профессиональные фото в LinkedIn содержат скрытые метаданные. Узнайте, как платформа обрабатывает данные EXIF и как защитить приватность снимков.",
    },
  },
  "/blog/remove-metadata-before-reddit/": {
    en: {
      title: "Remove Metadata Before Uploading To Reddit",
      desc: "Learn how Reddit handles photo metadata, what data survives upload, and how to remove EXIF data before posting to protect your privacy on Reddit.",
    },
    ru: {
      title: "Удаление метаданных перед загрузкой на Reddit",
      desc: "Узнайте, как Reddit работает с метаданными фото, какие данные переживают загрузку, и как удалить данные EXIF перед публикацией для защиты приватности.",
    },
  },
  "/blog/remove-metadata-before-selling-products/": {
    en: {
      title: "Remove Metadata Before Selling Products Online",
      desc: "Learn why product photos need metadata removed before listing on eBay, Craigslist, and other marketplaces. Protect your home address and personal information.",
    },
    ru: {
      title: "Удаление метаданных перед продажей товаров онлайн",
      desc: "Узнайте, почему с товарных фото нужно удалять метаданные перед публикацией на eBay, Craigslist и других площадках. Защитите домашний адрес и данные.",
    },
  },
  "/blog/remove-metadata-before-snapchat/": {
    en: {
      title: "Remove Metadata Before Snapchat",
      desc: "Learn how Snapchat handles photo metadata, what data is stored even after viewing, and how to strip EXIF data before sharing to protect your privacy.",
    },
    ru: {
      title: "Удаление метаданных перед публикацией в Snapchat",
      desc: "Узнайте, как Snapchat хранит метаданные фото, какие данные остаются даже после просмотра, и как удалить данные EXIF перед отправкой изображений.",
    },
  },
  "/blog/remove-metadata-before-telegram/": {
    en: {
      title: "Remove Metadata Before Telegram",
      desc: "Understand how Telegram handles photo metadata, the risks of Secret Chats vs regular chats, and how to protect your privacy by stripping EXIF data.",
    },
    ru: {
      title: "Удаление метаданных перед отправкой в Telegram",
      desc: "Узнайте, как Telegram работает с метаданными фото, чем секретные чаты отличаются от обычных и как защитить вашу приватность, удалив данные EXIF.",
    },
  },
  "/blog/remove-metadata-before-twitter/": {
    en: {
      title: "Remove Metadata Before Uploading To X",
      desc: "Learn how X (formerly Twitter) handles photo metadata, what data survives upload, and how to strip EXIF data before posting to protect your privacy.",
    },
    ru: {
      title: "Удаление метаданных перед загрузкой в X (Twitter)*",
      desc: "Узнайте, как X (бывший Twitter)* работает с метаданными фото, какие данные переживают загрузку и как удалить данные EXIF перед публикацией ради приватности.",
    },
  },
  "/blog/remove-metadata-before-whatsapp/": {
    en: {
      title: "Remove Metadata Before WhatsApp",
      desc: "Learn how WhatsApp handles photo metadata, what data survives sharing, and how to strip EXIF data before sending images to protect your privacy.",
    },
    ru: {
      title: "Удаление метаданных перед отправкой в WhatsApp",
      desc: "Узнайте, как WhatsApp работает с метаданными фото, какие данные переживают пересылку, и как удалить данные EXIF перед отправкой изображений ради приватности.",
    },
  },
  "/blog/remove-metadata-from-dslr-photos/": {
    en: {
      title: "Remove Metadata From DSLR Photos",
      desc: "A camera-specific guide to removing metadata from DSLR and mirrorless camera photos. Learn how professional cameras embed detailed EXIF data and how to strip it.",
    },
    ru: {
      title: "Как удалить метаданные из фото с DSLR",
      desc: "Гайд по удалению метаданных из фото зеркальных и беззеркальных камер: как профессиональные камеры встраивают данные EXIF и как очистить их перед публикацией.",
    },
  },
  "/blog/remove-metadata-from-gopro-photos/": {
    en: {
      title: "Remove Metadata From GoPro Photos",
      desc: "GoPro cameras record extensive metadata including GPS, gyroscope data, and telemetry. Learn what your action camera captures and how to strip it before sharing.",
    },
    ru: {
      title: "Как удалить метаданные из фото GoPro",
      desc: "Камеры GoPro записывают много метаданных: GPS, данные гироскопа и телеметрию. Узнайте, что фиксирует ваша экшн-камера, и как очистить данные.",
    },
  },
  "/blog/remove-metadata-from-jpg-files/": {
    en: {
      title: "Remove Metadata From JPG Files",
      desc: "Step-by-step guide to removing EXIF metadata from JPG and JPEG files. Learn how piexifjs processes JPG metadata and how to batch clean your photo collection.",
    },
    ru: {
      title: "Как удалить метаданные из JPG-файлов",
      desc: "Пошаговое руководство по удалению данных EXIF из файлов JPG и JPEG: как работает piexifjs и как пакетно очистить всю фотоколлекцию перед публикацией.",
    },
  },
  "/blog/remove-metadata-from-pdfs/": {
    en: {
      title: "Remove Metadata From PDFs Online",
      desc: "Learn how to remove metadata from PDF files to protect your privacy. Step-by-step guide to cleaning PDF documents.",
    },
    ru: {
      title: "Удаление метаданных из PDF онлайн",
      desc: "Узнайте, как удалить метаданные из файлов PDF онлайн и надёжно защитить свою приватность. Пошаговое руководство по очистке PDF-документов перед отправкой.",
    },
  },
  "/blog/remove-metadata-from-png-files/": {
    en: {
      title: "Remove Metadata From PNG Files",
      desc: "Learn how to remove metadata from PNG files. Understand PNG-specific chunks like tEXt, iTXt, and zTXt, and how PNG metadata differs from JPG.",
    },
    ru: {
      title: "Как удалить метаданные из PNG-файлов",
      desc: "Узнайте, как удалять метаданные из PNG-файлов: что представляют собой чанки tEXt, iTXt и zTXt, чем метаданные PNG отличаются от JPG и как их очистить.",
    },
  },
  "/blog/remove-metadata-from-work-documents/": {
    en: {
      title: "Remove Metadata From Work Documents",
      desc: "Corporate documents often contain hidden metadata that reveals author names, revision history, and internal details. Learn how to strip metadata from work documents.",
    },
    ru: {
      title: "Удаление метаданных из рабочих документов",
      desc: "В рабочих документах часто скрыты метаданные с именами авторов, историей правок и внутренними сведениями. Узнайте, как очистить такие файлы.",
    },
  },
  "/blog/social-media-privacy-checklist/": {
    en: {
      title: "Social Media Privacy Checklist: What to Check Before You Post",
      desc: "A complete pre-posting privacy checklist for sharing photos on social media. Learn what metadata, background details, and settings to review before hitting publish.",
    },
    ru: {
      title: "Чек-лист приватности в соцсетях перед публикацией",
      desc: "Полный чек-лист приватности перед публикацией фото в соцсетях: какие метаданные, детали фона и настройки проверить, прежде чем нажать «Опубликовать».",
    },
  },
  "/blog/understanding-exif-metadata/": {
    en: {
      title: "Understanding EXIF Metadata",
      desc: "A comprehensive technical explanation of EXIF metadata — what it is, how it's created, what each field means, and why it matters for your privacy.",
    },
    ru: {
      title: "Что такое метаданные EXIF: полный разбор",
      desc: "Подробный технический разбор метаданных EXIF: что это, как они создаются, что означает каждое поле и почему это важно для вашей приватности.",
    },
  },
  "/blog/what-is-exif-data/": {
    en: {
      title: "What Is EXIF Data",
      desc: "A beginner-friendly guide to EXIF data: what it is, how it gets into your photos, what information it contains, and why it matters for your privacy.",
    },
    ru: {
      title: "Что такое данные EXIF: простое объяснение",
      desc: "Гайд для новичков о данных EXIF: что это, как они попадают в ваши фото, какую информацию содержат и почему это важно для вашей приватности в интернете.",
    },
  },
  "/blog/what-metadata-is-stored-in-photos/": {
    en: {
      title: "What Metadata Is Stored In Photos",
      desc: "Discover what metadata is embedded in your photos — EXIF, IPTC, XMP data types, GPS coordinates, camera settings, and timestamps explained.",
    },
    ru: {
      title: "Какие метаданные хранятся в фотографиях",
      desc: "Узнайте, какие метаданные встроены в ваши фото: типы данных EXIF, IPTC и XMP, GPS-координаты, настройки камеры и метки времени — простым языком.",
    },
  },
  "/blog/why-gps-metadata-is-dangerous/": {
    en: {
      title: "Why GPS Metadata Is Dangerous",
      desc: "Learn why GPS metadata in photos poses serious privacy risks — from stalking and burglary to real-world exploitation cases. Protect your location today.",
    },
    ru: {
      title: "Почему GPS-метаданные опасны для приватности",
      desc: "Узнайте, почему GPS-метаданные в фото создают серьёзные риски — от слежки и кражи до реальных случаев мошенничества. Защитите своё местоположение.",
    },
  },
};

export const TRANSLATION_MAP: Record<string, string> = {
  // Blog page text nodes (auto-generated). Spread first so existing
  // hand-written entries below take precedence on key conflicts.
  ...BLOG_TRANSLATIONS,
  // Navigation & General
  "Home": "Главная",
  "Tools": "Инструменты",
  "Learn": "База знаний",
  "Blog": "Блог",
  "About": "О сервисе",
  "100% Client-Side": "100% на клиенте",
  "100% Client-Side Processing": "100% обработка на клиенте",
  "100% Private": "100% Приватно",
  "Zero Data Collection": "Без сбора данных",
  "Open Source": "Открытый исходный код",
  "Open & Transparent": "Открыто и прозрачно",
  "No Uploads": "Без загрузки на сервер",
  "Free": "Бесплатно",
  "Completely Free": "Полностью бесплатно",
  "Instant Processing": "Мгновенная обработка",
  "Client-Side": "На клиенте",
  "Private": "Приватно",
  "Get Started": "Начать",
  "Get Started Free": "Начать бесплатно",
  "Try Free": "Попробовать бесплатно",
  "Related Tools": "Похожие инструменты",
  "Learn More": "Узнать больше",
  "Read more": "Читать далее",
  "How It Works": "Как это работает",
  "Three simple steps to protect your privacy": "Три простых шага для защиты вашей приватности",
  "Upload": "Загрузка",
  "Review": "Проверка",
  "Clean": "Очистка",
  "Drag and drop or select your files to get started.": "Перетащите или выберите файлы для начала.",
  "See all detected metadata and choose what to remove.": "Просмотрите обнаруженные метаданные и выберите поля для удаления.",
  "One click to clean. Download your privacy-safe file.": "Один клик для очистки. Скачайте безопасный файл.",
  "Frequently Asked Questions": "Часто задаваемые вопросы",
  "Why Choose MetaClean?": "Почему выбирают MetaClean?",
  "Privacy Tools": "Инструменты приватности",
  "Choose the right tool for your needs": "Выберите подходящий инструмент под вашу задачу",
  "Privacy Resources": "Материалы о приватности",
  "Learn how to protect your digital privacy": "Узнайте, как защитить свою цифровую приватность",
  "Ready to Protect Your Privacy?": "Готовы защитить свою приватность?",
  "Start removing metadata from your files in seconds. No signup required.": "Начните удалять метаданные из файлов за секунды. Без регистрации.",
  // General & Trust
  "Your Files Stay Private": "Ваши файлы остаются конфиденциальными",
  "Before MetaClean": "До MetaClean",
  "After MetaClean": "После MetaClean",
  "Your files contain sensitive metadata": "Ваши файлы содержат конфиденциальные метаданные",
  "Metadata removed, content preserved": "Метаданные удалены, содержимое сохранено",
  "Zero server uploads — ever": "Никаких загрузок на сервер — никогда",
  "No cookies or tracking": "Без cookies и отслеживания",
  "No data collection": "Без сбора данных",
  "Open-source code": "Открытый исходный код",
  "Works offline after first load": "Работает офлайн после первой загрузки",
  "Resources": "Ресурсы",
  "Legal": "Правовая информация",
  "Privacy Policy": "Политика конфиденциальности",
  "Terms of Service": "Условия использования",
  "Contact Us": "Связаться с нами",
  "Send a Message": "Отправить сообщение",
  "Name": "Имя",
  "Email": "Email",
  "Subject": "Тема",
  "Message": "Сообщение",
  "Send Message": "Отправить сообщение",
  "Your name": "Ваше имя",
  "How can we help?": "Чем мы можем помочь?",
  "Tell us what's on your mind...": "Расскажите подробнее...",
  "Table of Contents": "Содержание",
  "Feature Comparison": "Сравнение возможностей",
  "Feature": "Функция",
  "Why Choose MetaClean": "Почему MetaClean",
  "Detailed Breakdown": "Подробный разбор",
  "All": "Все",
  "Guide": "Руководство",
  "Security": "Безопасность",
  "Social Media": "Соцсети",
  "Verdict": "Итог",
  "Pros & Cons": "Плюсы и минусы",
  "Pros": "Преимущества",
  "Cons": "Недостатки",
  "Winner": "Победитель",
  "Competitor": "Аналог",

  // Contact Page
  "Other Ways to Reach Us": "Другие способы связи",
  "Email Support": "Поддержка по Email",
  "Security Inquiries": "Вопросы безопасности",
  "GitHub Repository": "Репозиторий GitHub",
  "Quick Help": "Быстрая помощь",
  "Before reaching out, you might find the answer you need here:": "Прежде чем обращаться, возможно, вы найдете ответ здесь:",
  "General inquiries and support": "Общие вопросы и техническая поддержка",
  "Report security vulnerabilities": "Сообщить об уязвимости безопасности",
  "Contribute or report bugs on GitHub": "Внести свой вклад или сообщить об ошибке на GitHub",
  "Follow updates and privacy tips": "Следить за обновлениями и советами по безопасности",
  "Check our FAQ section on the": "Посетите раздел частых вопросов на",
  "homepage": "главной странице",
  "Browse our comprehensive": "Ознакомьтесь с подробными",
  "guides": "руководствами",
  "Check the": "Посетите",
  "tool page": "страницу инструмента",
  "for format-specific questions": "по вопросам работы с конкретными форматами",
  "Report issues or request features on": "Сообщить об ошибке или предложить функцию на",
  "GitHub": "GitHub",

  // About Page
  "About MetaClean": "О MetaClean",
  "We believe privacy is a fundamental right. MetaClean exists to make metadata removal accessible, free, and trustworthy for everyone.": "Мы убеждены, что конфиденциальность — это базовое право каждого человека. MetaClean создан, чтобы сделать удаление метаданных доступным, бесплатным и надежным для всех.",
  "Our Mission": "Наша миссия",
  "Why Client-Side Matters": "Почему важна обработка на стороне клиента",
  "How MetaClean Works": "Как работает MetaClean",
  "Step 1: You Select a File": "Шаг 1: Вы выбираете файл",
  "Step 2: Browser Parses Metadata": "Шаг 2: Браузер считывает метаданные",
  "Step 3: Clean File Generated": "Шаг 3: Формируется чистый файл",
  "Step 4: You Download the Result": "Шаг 4: Вы скачиваете готовый результат",
  "Our Commitment to You": "Наши обязательства перед вами",
  "Free Forever": "Всегда бесплатно",
  "Independent": "Независимость",
  "Built for Privacy Advocates, Photographers, and Everyday Users": "Создано для защитников приватности, фотографов и обычных пользователей",
  "We never collect, store, or transmit your files or personal data.": "Мы никогда не собираем, не храним и не передаем ваши файлы или персональные данные.",
  "All processing runs in your browser using JavaScript and WebAssembly.": "Вся обработка происходит прямо в вашем браузере с помощью JavaScript и WebAssembly.",
  "Our code is open-source. Verify our privacy claims yourself.": "Наш исходный код открыт. Вы можете лично убедиться в прозрачности алгоритмов.",
  "No hidden fees, no subscriptions, no premium tiers. Everything is free.": "Без скрытых комиссий, подписок и премиум-планов. Все функции абсолютно бесплатны.",

  // Privacy Policy Page
  "Last updated: January 2025": "Последнее обновление: январь 2025 г.",
  "No Data Collection": "Никакого сбора данных",
  "Client-Side Processing": "Обработка на стороне клиента",
  "Cookie Policy": "Использование файлов cookie",
  "Third-Party Services": "Сторонние сервисы",
  "Data Retention": "Хранение данных",
  "Children's Privacy": "Конфиденциальность детей",
  "Changes to This Policy": "Изменения в политике",
  "Contact": "Контакты",

  // Terms of Service Page
  "1. Acceptance of Terms": "1. Принятие условий",
  "2. Description of Service": "2. Описание сервиса",
  "3. Eligibility": "3. Правомочность",
  "4. Acceptable Use": "4. Допустимое использование",
  "5. Intellectual Property": "5. Интеллектуальная собственность",
  "6. Your Files": "6. Ваши файлы",
  "7. Disclaimer of Warranties": "7. Отказ от гарантий",
  "8. Limitation of Liability": "8. Ограничение ответственности",
  "9. Modifications to the Service": "9. Изменение сервиса",
  "10. Termination": "10. Прекращение доступа",
  "11. Governing Law": "11. Применимое право",
  "12. Changes to Terms": "12. Изменения условий",
  "13. Contact Information": "13. Контактная информация",

  // Blog & Learn Index
  "Privacy Blog": "Блог о приватности",
  "Learn how to protect your digital privacy with our comprehensive guides, tutorials, and expert tips.": "Узнайте, как защитить свою цифровую приватность с помощью наших подробных руководств, инструкций и экспертных советов.",
  "articles covering metadata removal, privacy tools, and security best practices.": "статей об удалении метаданных, инструментах приватности и правилах цифровой безопасности.",
  "min read": "мин чтения",

  // Tool Names & Specific Headings
  "Photo Metadata Remover": "Очистка метаданных фото",
  "GPS Remover": "Удаление GPS",
  "EXIF Viewer": "Просмотр данных EXIF",
  "Social Media Cleaner": "Очистка для соцсетей",
  "Batch Metadata Remover": "Пакетное удаление метаданных",
  "Privacy Score": "Оценка приватности",
  "PDF Metadata Remover": "Очистка метаданных PDF",
  "Text Cleaner": "Очистка текста",
  "Metadata Checker": "Проверка метаданных",
  "Remove Photo Metadata": "Удалить метаданные фото",
  "Remove PDF Metadata": "Удалить метаданные PDF",
  "Remove GPS from Photo": "Удалить GPS из фото",
  "Remove Metadata from JPG": "Удалить метаданные из JPG",
  "Remove Metadata from JPG Files": "Удалить метаданные из файлов JPG",
  "Remove Metadata from JPEG": "Удалить метаданные из JPEG",
  "Remove Metadata from JPEG Files": "Удалить метаданные из файлов JPEG",
  "Remove Metadata from PNG": "Удалить метаданные из PNG",
  "Remove Metadata from PNG Files": "Удалить метаданные из файлов PNG",
  "Remove Metadata from WEBP": "Удалить метаданные из WEBP",
  "Remove Metadata from WEBP Files": "Удалить метаданные из файлов WEBP",
  "Remove Metadata from HEIC": "Удалить метаданные из HEIC",
  "Remove Metadata from HEIC Files": "Удалить метаданные из файлов HEIC",
  "Remove Metadata from iPhone Photos": "Удалить метаданные из фото iPhone",
  "Remove Metadata from iPhone Photo": "Удалить метаданные из фото iPhone",
  "Remove Metadata from Android Photos": "Удалить метаданные из фото Android",
  "Remove Metadata from Android Photo": "Удалить метаданные из фото Android",
  "Remove Location from Photo": "Удалить местоположение из фото",
  "Remove Geotag from Photo": "Удалить геометку из фото",
  "Remove Camera Information from Photo": "Удалить данные камеры из фото",
  "Remove EXIF from Photo": "Удалить EXIF из фото",
  "Remove Hidden Data from PDF": "Удалить скрытые данные из PDF",
  "Remove Author from PDF": "Удалить автора из PDF",
  "Remove Title from PDF": "Удалить заголовок из PDF",
  "Remove Hidden Characters from Text": "Удалить невидимые символы из текста",
  "Remove BOM from File": "Удалить BOM из файла",
  "Remove Tracking Data from File": "Удалить трекинг из файла",
  "Image Privacy Checker": "Проверка приватности изображений",
  "Photo Privacy Checker": "Проверка приватности фото",
  "What Is My Photo Revealing": "Что скрывает ваше фото",
  "Metadata Scanner": "Сканер метаданных",
  "Metadata Analyzer": "Анализатор метаданных",
  "Comparisons": "Сравнения",
  "Complete Guide to Digital Privacy": "Полное руководство по цифровой приватности",
  "Quick Summary": "Краткое резюме",

  // Metadata Fields
  "GPS Coordinates": "GPS-координаты",
  "Camera Make": "Производитель камеры",
  "Camera Model": "Модель камеры",
  "Lens Model": "Модель объектива",
  "Software": "Программное обеспечение",
  "Date Time": "Дата и время",
  "Date Time Original": "Исходная дата и время",
  "Create Date": "Дата создания",
  "Modify Date": "Дата изменения",
  "Author": "Автор",
  "Creator": "Создатель",
  "Producer": "Программа записи",
  "Title": "Название",
  "Keywords": "Ключевые слова",
  "Copyright": "Авторские права",
  "Artist": "Автор / Фотограф",
  "Device Information": "Информация об устройстве",
  "Software Tags": "Метки программ",
  "Timestamps": "Временные метки",
  "Author Information": "Данные об авторе",
  "GPS Location": "GPS-локация",
  "No metadata detected": "Метаданные не обнаружены",
  "This file appears to be clean": "Этот файл чист от метаданных",
  "Facebook and Instagram remove most EXIF data when you upload photos, but Twitter, Discord, and many messaging apps preserve metadata. Always assume your metadata is retained unless you verify otherwise.": "Facebook* и Instagram* удаляют большинство данных EXIF при загрузке фото, но Twitter*, Discord и многие мессенджеры сохраняют метаданные. Всегда считайте, что метаданные сохранены, пока не убедились в обратном.",
  "Facebook and Instagram remove most EXIF data when photos are uploaded, though they may use metadata internally for features like location tagging and photo organization.": "Facebook* и Instagram* удаляют большинство данных EXIF при загрузке фото, хотя могут использовать метаданные внутри платформы для таких функций, как геометки и сортировка фотографий.",
  "Twitter and Discord preserve metadata in uploaded images, meaning anyone who downloads your photos can access the original EXIF data including GPS coordinates and device information.": "Twitter* и Discord сохраняют метаданные в загруженных изображениях — любой, кто скачает ваши фото, получит доступ к исходным данным EXIF, включая GPS-координаты и сведения об устройстве.",
  "Does Instagram remove photo metadata?": "Удаляет ли Instagram* метаданные с фото?",
  "Instagram removes most EXIF data when you upload photos, but the platform may retain metadata in its own systems. Always remove metadata before uploading for complete privacy.": "Instagram* удаляет большинство данных EXIF при загрузке фото, но платформа может сохранять метаданные в собственных системах. Для полной приватности удаляйте метаданные перед загрузкой.",
  "Does Twitter preserve photo metadata?": "Сохраняет ли Twitter* метаданные фотографий?",
  "Yes, Twitter preserves metadata in uploaded images. Anyone who downloads your photos from Twitter can access the original EXIF data including GPS coordinates.": "Да, Twitter* сохраняет метаданные в загруженных изображениях. Любой, кто скачает ваши фото с Twitter*, получит доступ к исходным данным EXIF, включая GPS-координаты.",
  "Facebook Pixel or Meta tracking": "Пиксель Facebook* или отслеживание от Meta*",
};
