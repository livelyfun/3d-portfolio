import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { jsonLdGraph, serializeLd } from "@/lib/schema";
import { absoluteUrl, SITE_URL } from "@/lib/site-url";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BackgroundScene } from "@/components/three/background-scene";
import "./globals.css";

/**
 * Fonts are self-hosted rather than pulled from next/font/google.
 * That removes a network fetch from every build, keeps the page free of
 * third-party requests, and means the build cannot be stalled or broken by
 * fonts.googleapis.com being slow, rate limited or blocked.
 */
const spaceGrotesk = localFont({
  src: [
    { path: "./fonts/space-grotesk-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-grotesk-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/space-grotesk-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/space-grotesk-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});

const inter = localFont({
  src: [
    { path: "./fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/inter-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/inter-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});

const jetbrainsMono = localFont({
  src: [
    { path: "./fonts/jetbrains-mono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-mono-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/jetbrains-mono-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/jetbrains-mono-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
  adjustFontFallback: false,
});

const keywords = [
  "Mithlesh Kumar Das",
  "Mithlesh Kumar Das portfolio",
  "backend developer Nepal",
  "full stack developer Nepal",
  "Python developer Nepal",
  "React developer Nepal",
  "Next.js developer",
  "Firebase developer",
  "junior backend developer",
  "entry level software developer",
  "Biratnagar developer",
  ...skillGroups.flatMap((g) => g.skills.map((s) => s.name)),
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  keywords,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    locale: site.locale,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name}, ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Structured data. Rendered in <head> so it is present in the very first
            byte of HTML, which is what answer engines parse. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeLd(jsonLdGraph()) }}
        />
        {/* Identity hints for crawlers and AI retrieval pipelines. */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM summary" />
        <link rel="me" href={site.links.github} />
        <link rel="me" href={site.links.linkedin} />
      </head>
      <body className="min-h-dvh antialiased">
        <BackgroundScene />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-cyan-glow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <noscript>
          <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-fog-400">
            This portfolio uses WebGL for its background animation, which needs JavaScript.
            All content, projects and contact details below are fully readable without it.
            Direct links:{" "}
            <a className="text-cyan-glow" href={site.links.github}>
              GitHub
            </a>{" "}
            ·{" "}
            <a className="text-cyan-glow" href={site.links.linkedin}>
              LinkedIn
            </a>{" "}
            ·{" "}
            <a className="text-cyan-glow" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            {" · "}
            <a className="text-cyan-glow" href={absoluteUrl(site.resume.path)}>
              Download CV
            </a>
          </div>
        </noscript>
      </body>
    </html>
  );
}
