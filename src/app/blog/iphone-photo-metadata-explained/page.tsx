import Link from "next/link";
import JsonLd from "@/components/json-ld";
import FAQSection from "@/components/faq-section";
import { generateBreadcrumbSchema, generateFAQSchema, siteConfig } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "iPhone Photo Metadata Explained",
  description:
    "Learn what metadata your iPhone records in every photo, how GPS coordinates are embedded, and how to disable location tracking on iOS.",
  keywords: [
    "iPhone metadata",
    "iOS photo data",
    "iPhone EXIF data",
    "iPhone photo privacy",
    "disable GPS iPhone",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/iphone-photo-metadata-explained/`,
  },
};

const faqs = [
  {
    question: "Does my iPhone save location data in every photo?",
    answer:
      "Yes, if Location Services is enabled for the Camera app, your iPhone embeds GPS coordinates in every photo you take. This includes latitude, longitude, altitude, and a timestamp.",
  },
  {
    question: "How do I stop my iPhone from saving GPS data in photos?",
    answer:
      "Go to Settings > Privacy & Security > Location Services, find the Camera app, and set it to \"Never.\" This prevents the Camera from accessing your location entirely.",
  },
  {
    question: "Can I remove metadata from photos I already took?",
    answer:
      "Yes. You can use MetaClean's Photo Metadata Remover to strip GPS coordinates and other EXIF data from existing photos before sharing them.",
  },
  {
    question: "What other metadata does the iPhone record besides GPS?",
    answer:
      "Your iPhone records camera model, lens information, focal length, aperture, ISO, white balance, date and time, and sometimes your Apple ID name in the author field.",
  },
  {
    question: "Does AirDrop preserve photo metadata?",
    answer:
      "Yes, AirDrop preserves all EXIF metadata in photos. If you AirDrop a photo, the recipient receives the full set of metadata including GPS coordinates.",
  },
  {
    question: "Is iPhone photo metadata visible on social media?",
    answer:
      "Most social media platforms strip EXIF metadata when you upload photos. However, messaging apps like WhatsApp and email attachments typically preserve it.",
  },
];

const tocItems = [
  { id: "what-iphone-records", label: "What Your iPhone Records" },
  { id: "gps-coordinates", label: "GPS Coordinates Explained" },
  { id: "other-metadata", label: "Other Metadata Fields" },
  { id: "disable-location", label: "How to Disable GPS on iPhone" },
  { id: "ios-location-services", label: "iOS Location Services Settings" },
  { id: "remove-existing", label: "Removing Metadata from Existing Photos" },
  { id: "when-metadata-persists", label: "When Metadata Persists" },
];

export default function IphonePhotoMetadataExplainedPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    {
      name: "iPhone Photo Metadata Explained",
      url: "/blog/iphone-photo-metadata-explained/",
    },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={generateFAQSchema(faqs)} />

      <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <nav
          className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog/" className="hover:text-foreground">
            Blog
          </Link>
          <span>/</span>
          <span className="text-foreground">
            iPhone Photo Metadata Explained
          </span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
          <div>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Privacy
                </span>
                <span className="text-sm text-muted-foreground">
                  7 min read
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                iPhone Photo Metadata Explained
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything your iPhone hides inside every photo you take — and
                how to keep it private.
              </p>
            </header>

            <div className="prose prose-gray max-w-none">
              <section id="what-iphone-records">
                <h2>What Your iPhone Records in Every Photo</h2>
                <p>
                  Every time you tap the shutter button on your iPhone, the
                  device captures far more than the image you see on screen.
                  Behind the pixels lies a bundle of hidden information called
                  EXIF (Exchangeable Image File Format) metadata. This data is
                  automatically written into every photo file your iPhone saves,
                  and most users have no idea it exists.
                </p>
                <p>
                  Apple designed EXIF metadata to be useful for photographers and
                  for organizing libraries. The problem is that this same
                  metadata can reveal sensitive personal details when you share
                  photos with others or post them online. Understanding what your
                  iPhone records is the first step toward protecting your
                  privacy.
                </p>
              </section>

              <section id="gps-coordinates">
                <h2>GPS Coordinates Explained</h2>
                <p>
                  The most privacy-sensitive piece of metadata in your iPhone
                  photos is the GPS coordinates. When Location Services is
                  enabled for the Camera app, your iPhone embeds precise
                  geographic data into every image. This includes:
                </p>
                <ul>
                  <li>
                    <strong>Latitude:</strong> Your north-south position,
                    accurate to several decimal places
                  </li>
                  <li>
                    <strong>Longitude:</strong> Your east-west position, equally
                    precise
                  </li>
                  <li>
                    <strong>Altitude:</strong> Your height above sea level, which
                    can indicate which floor of a building you are on
                  </li>
                  <li>
                    <strong>Direction:</strong> The direction the camera was
                    facing when the photo was taken
                  </li>
                  <li>
                    <strong>Timestamp:</strong> The exact date and time the photo
                    was captured
                  </li>
                </ul>
                <p>
                  Modern iPhones use a combination of GPS satellites, cell tower
                  triangulation, and known WiFi networks to determine your
                  location. This multi-source approach means the coordinates
                  embedded in your photos are typically accurate to within three
                  to five meters. Someone with access to this data could
                  determine not just your neighborhood, but the specific building
                  you were in and even which side of the street you stood on.
                </p>
                <p>
                  Tools like the{" "}
                  <Link
                    href="/exif-viewer/"
                    className="text-primary hover:underline"
                  >
                    EXIF Viewer
                  </Link>{" "}
                  make it trivially easy to extract and display these coordinates
                  on a map. All someone needs is your photo file.
                </p>
              </section>

              <section id="other-metadata">
                <h2>Other Metadata Fields Your iPhone Saves</h2>
                <p>
                  GPS coordinates are not the only information embedded in your
                  iPhone photos. The full list of metadata your device typically
                  records includes:
                </p>
                <ul>
                  <li>
                    <strong>Camera Model:</strong> Your exact iPhone model (e.g.,
                    &quot;iPhone 15 Pro Max&quot;)
                  </li>
                  <li>
                    <strong>Serial Number:</strong> The unique serial number of
                    your device, which can be used to track you across platforms
                  </li>
                  <li>
                    <strong>Focal Length:</strong> The lens focal length used for
                    the shot
                  </li>
                  <li>
                    <strong>Aperture:</strong> The f-stop value of the lens
                  </li>
                  <li>
                    <strong>ISO Speed:</strong> The sensor sensitivity setting
                  </li>
                  <li>
                    <strong>Exposure Time:</strong> How long the shutter was open
                  </li>
                  <li>
                    <strong>White Balance:</strong> The color temperature
                    setting used
                  </li>
                  <li>
                    <strong>Software Version:</strong> The iOS version running on
                    your device
                  </li>
                  <li>
                    <strong>Color Space:</strong> The color profile of the image
                  </li>
                  <li>
                    <strong>Pixel Dimensions:</strong> The resolution of the
                    photo
                  </li>
                </ul>
                <p>
                  The combination of your device model and serial number can
                  theoretically be used to fingerprint you across different
                  services. If you post photos from two different accounts but
                  they share the same device serial number, someone could link
                  those accounts together.
                </p>
              </section>

              <section id="disable-location">
                <h2>How to Disable GPS on Your iPhone</h2>
                <p>
                  The most effective way to prevent GPS data from being embedded
                  in your photos is to disable location access for the Camera
                  app. Here is how to do it on modern versions of iOS:
                </p>
                <ol>
                  <li>
                    Open the <strong>Settings</strong> app on your iPhone
                  </li>
                  <li>
                    Scroll down and tap <strong>Privacy &amp; Security</strong>
                  </li>
                  <li>
                    Tap <strong>Location Services</strong> at the top of the
                    list
                  </li>
                  <li>
                    Scroll through the app list until you find{" "}
                    <strong>Camera</strong>
                  </li>
                  <li>
                    Tap Camera and select <strong>&quot;Never&quot;</strong>
                  </li>
                </ol>
                <p>
                  Once you set Camera to &quot;Never,&quot; your iPhone will no
                  longer record GPS coordinates in any new photos you take. The
                  Camera app will not request your location at all, so there is
                  zero risk of location leakage from that point forward.
                </p>
                <p>
                  Note that this setting only affects future photos. Any photos
                  you have already taken with location enabled will still contain
                  GPS data. You will need to{" "}
                  <Link
                    href="/remove-photo-metadata/"
                    className="text-primary hover:underline"
                  >
                    remove metadata from those existing photos
                  </Link>{" "}
                  separately.
                </p>
              </section>

              <section id="ios-location-services">
                <h2>Understanding iOS Location Services Settings</h2>
                <p>
                  Apple gives you granular control over how each app accesses
                  your location. Within the Location Services settings, you will
                  find several options for each app:
                </p>
                <ul>
                  <li>
                    <strong>Never:</strong> The app cannot access your location
                    under any circumstances
                  </li>
                  <li>
                    <strong>Ask Next Time:</strong> The app will ask for
                    permission each time it wants your location
                  </li>
                  <li>
                    <strong>While Using the App:</strong> The app can access your
                    location only when it is open and active
                  </li>
                  <li>
                    <strong>Always:</strong> The app can access your location at
                    any time, even in the background
                  </li>
                </ul>
                <p>
                  For the Camera app, selecting &quot;Never&quot; is the safest
                  choice if your priority is privacy. Even &quot;While Using the
                  App&quot; means the Camera will embed GPS data in every photo,
                  because the app is technically active when you take a picture.
                </p>
                <p>
                  You should also check the settings for the Photos app. If
                  Photos has location access, it may add location information
                  when you share photos through the share sheet, even if the
                  Camera app itself was not involved.
                </p>
                <p>
                  Additionally, iOS has a system-wide option called{" "}
                  <strong>Precise Location</strong> that you can toggle off for
                  individual apps. When Precise Location is off, the app receives
                  only an approximate location. However, for the Camera app, it
                  is better to disable location access entirely rather than
                  relying on this toggle.
                </p>
              </section>

              <section id="remove-existing">
                <h2>Removing Metadata from Existing Photos</h2>
                <p>
                  If you have been taking photos with GPS enabled, your library
                  likely contains hundreds or thousands of images with embedded
                  location data. The good news is that you can remove this
                  metadata without affecting image quality.
                </p>
                <p>
                  MetaClean&apos;s{" "}
                  <Link
                    href="/remove-photo-metadata/"
                    className="text-primary hover:underline"
                  >
                    Photo Metadata Remover
                  </Link>{" "}
                  processes your photos entirely in your browser. Your files are
                  never uploaded to any server. Here is how to use it:
                </p>
                <ol>
                  <li>
                    Visit the Photo Metadata Remover page on any device with a
                    web browser
                  </li>
                  <li>
                    Drag and drop your photos or tap to browse and select them
                  </li>
                  <li>
                    Review all the metadata detected in your files, including GPS
                    coordinates
                  </li>
                  <li>
                    Choose which metadata to remove — you can strip everything or
                    keep certain fields
                  </li>
                  <li>
                    Click &quot;Clean Metadata&quot; and download your cleaned
                    photos
                  </li>
                </ol>
                <p>
                  For batches of photos, MetaClean supports processing multiple
                  files at once, saving you significant time compared to
                  cleaning each image individually.
                </p>
                <p>
                  You can also use the{" "}
                  <Link
                    href="/remove-gps-from-photo/"
                    className="text-primary hover:underline"
                  >
                    GPS Remover
                  </Link>{" "}
                  tool if your only concern is stripping location coordinates
                  while preserving other EXIF data like camera settings.
                </p>
              </section>

              <section id="when-metadata-persists">
                <h2>When Metadata Persists After Sharing</h2>
                <p>
                  An important detail many iPhone users miss is that metadata
                  handling varies depending on how you share a photo. Here is
                  what to expect with common sharing methods:
                </p>
                <ul>
                  <li>
                    <strong>iMessage:</strong> Preserves all EXIF metadata,
                    including GPS coordinates
                  </li>
                  <li>
                    <strong>AirDrop:</strong> Preserves all metadata completely
                  </li>
                  <li>
                    <strong>Email attachments:</strong> Most email clients preserve
                    metadata
                  </li>
                  <li>
                    <strong>Social media platforms:</strong> Most platforms like
                    Instagram, Facebook, and Twitter strip metadata upon upload
                  </li>
                  <li>
                    <strong>Messaging apps (WhatsApp, Telegram):</strong> Some
                    strip metadata, others preserve it — check each app&apos;s
                    behavior
                  </li>
                </ul>
                <p>
                  The safest approach is to always remove metadata before sharing,
                  regardless of the platform. This way you are protected even if
                  a platform changes its behavior or you accidentally share
                  through a channel that preserves metadata.
                </p>
              </section>

              <h2>Protect Your iPhone Photo Privacy Today</h2>
              <p>
                Your iPhone is an incredible camera, but it is also a
                sophisticated tracking device when it comes to photo metadata.
                By understanding what data your device records and taking
                proactive steps to disable location services for the Camera app,
                you can significantly improve your privacy.
              </p>
              <p>
                For photos you have already taken, use MetaClean&apos;s free
                tools to strip GPS coordinates and other sensitive metadata
                before sharing them with anyone.
              </p>
            </div>

            <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground mb-3">
                Ready to clean your iPhone photos?
              </h2>
              <p className="text-muted-foreground mb-5">
                Remove GPS coordinates, camera serial numbers, and every other
                piece of hidden metadata from your photos — instantly and
                privately.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/remove-photo-metadata/"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
                >
                  Remove Photo Metadata
                </Link>
                <Link
                  href="/remove-gps-from-photo/"
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  Remove GPS Only
                </Link>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                On this page
              </p>
              <nav className="space-y-1">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-muted-foreground hover:text-foreground py-1 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>

        <FAQSection
          title="Frequently Asked Questions"
          description="Common questions about iPhone photo metadata and privacy"
          faqs={faqs}
        />
      </article>
    </>
  );
}
