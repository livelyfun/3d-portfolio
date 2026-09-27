export type Project = {
  /** Product name as it should appear in the UI. */
  name: string;
  /** GitHub repo slug, used to build the source URL. */
  repo: string;
  /** Live deployment, when one exists. */
  liveUrl?: string;
  /** One-line summary for cards, meta tags and JSON-LD. */
  summary: string;
  /** Two or three sentences for the expanded card. */
  detail: string;
  /** Concrete, checkable capabilities. */
  highlights: string[];
  stack: string[];
  year: string;
  /** Key into the generated SVG artwork set. */
  art: ProjectArtKey;
  /**
   * Optional path to a real screenshot in /public. When set, the screenshot
   * renders instead of the generated artwork.
   */
  image?: string;
};

export type ProjectArtKey =
  | "stockmatrix"
  | "kira"
  | "reelstudio"
  | "yt-downloader"
  | "organizer"
  | "mpmservices";

export const projects: Project[] = [
  {
    name: "StockMatrix",
    repo: "Track-the-stock-market",
    summary:
      "Real-time multi-market stock terminal with WebSocket price streaming, candlestick charts and custom price alerts.",
    detail:
      "A full-stack trading dashboard covering NASDAQ, NYSE, NSE, BSE, LSE, Euronext, Tokyo and HKEX. A FastAPI backend issues JWT auth over OAuth2, caches Yahoo Finance data in memory with TTL, and broadcasts price updates over per-user WebSocket connections. The React + TypeScript frontend renders SVG candlestick charts with OHLC crosshairs, evaluates price alerts in the background and fires browser toasts.",
    highlights: [
      "Per-user WebSocket broadcast loops with animated price flashes",
      "OAuth2 / JWT auth with bcrypt hashing and protected routes",
      "SQLAlchemy 2.0 on SQLite or PostgreSQL, managed with Alembic",
      "Multi-currency conversion across 8 currencies with cached forex rates",
      "Nginx production container, dark/light themes and English/Hindi i18n",
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "WebSockets", "Redis", "Docker", "React", "TypeScript", "Tailwind CSS"],
    year: "2025",
    art: "stockmatrix",
  },
  {
    name: "Kira Calculator",
    repo: "kira-calculator",
    summary:
      "Scientific desktop calculator with a hand-written expression engine, built on PySide6 and covered by pytest.",
    detail:
      "A cross-platform calculator where the interesting work is the math, not the chrome. I wrote the expression parser and evaluator to handle operator precedence, nested parentheses, powers, square roots, trigonometric functions, logarithms and standard constants (π, e), then covered it with an automated pytest suite to keep results accurate as the grammar grew. The PySide6 interface is split into calculator, converter and programmer pages with a custom QSS stylesheet.",
    highlights: [
      "Custom parser handling precedence, nesting and unary operators",
      "Trigonometric, logarithmic and power functions plus π / e constants",
      "Three UI pages: calculator, unit converter and programmer mode",
      "Custom Qt stylesheet for a consistent cross-platform look",
      "Automated pytest suite guarding calculation accuracy",
    ],
    stack: ["Python", "PySide6", "pytest", "Qt Style Sheets"],
    year: "2025",
    art: "kira",
  },
  {
    name: "AI Reel Studio",
    repo: "AI-Reel-Studio",
    liveUrl: "https://ai-reel-studio-eta.vercel.app",
    summary:
      "Turns one prompt into a finished short-form video: visuals, AI voiceover, captions and platform metadata.",
    detail:
      "An end-to-end automated video generator. A single prompt description drives a Gemini service that produces a storyboard, orchestrates visual asset generation, synthesises audio, aligns captions and assembles the pieces into a structured reel. Includes a storyboard viewer, generation progress view, reel player and a metadata viewer for the title, description and hashtags each platform needs.",
    highlights: [
      "Single-prompt pipeline from description to exported video",
      "Server-side Gemini service for storyboard and asset generation",
      "Web Audio API synthesised voiceover with caption alignment",
      "Browser-side video export via canvas rendering",
      "Per-platform metadata output for Reels, Shorts and TikTok",
    ],
    stack: ["TypeScript", "React", "Vite", "Express", "Gemini AI", "Web Audio API"],
    year: "2025",
    art: "reelstudio",
  },
  {
    name: "YT Downloader",
    repo: "youtube-video-downloader",
    summary:
      "Local-only Electron desktop app for downloading YouTube video and audio, packaged as a .deb for Debian.",
    detail:
      "A desktop downloader that keeps everything on the machine. A React renderer drives an Electron main process that shells out to yt-dlp and ffmpeg, parsing their output for live progress, speed and ETA. It detects missing dependencies on launch, stores its own config and download history under ~/.config, and ships as a standard .deb package with a .desktop entry and declared dependencies.",
    highlights: [
      "Electron main/preload/renderer split with typed IPC channels",
      "Live progress, download speed and ETA parsed from yt-dlp output",
      "Video+audio, video-only or MP3-only format selection",
      "Local config and download history under ~/.config",
      "Packaged as a .deb with .desktop entry and dependency checks",
    ],
    stack: ["JavaScript", "Electron", "React", "Vite", "Tailwind CSS", "yt-dlp", "ffmpeg"],
    year: "2025",
    art: "yt-downloader",
  },
  {
    name: "Smart File Organizer",
    repo: "Smart-File-Organizer-CLI",
    summary:
      "Cross-platform CLI that watches your Downloads folder and sorts finished files into category folders.",
    detail:
      "A small, dependable utility: install once, and everything that lands in Downloads gets filed away into Images, Videos, PDFs, Documents, Archives, Code and more. Distributed as self-contained executables for Linux, macOS and Windows, where the install scripts verify the download against a published SHA-256 before running anything. The Python package is pytest-covered and built through pyproject.toml.",
    highlights: [
      "Watches Downloads and files completed downloads automatically",
      "Installers for Linux, macOS and Windows PowerShell",
      "SHA-256 verification of the downloaded binary before install",
      "pytest suite and pyproject.toml packaging",
      "Version pinning and --system / --from-source install flags",
    ],
    stack: ["Python", "pytest", "pyproject.toml", "Shell", "PowerShell", "Inno Setup"],
    year: "2025",
    art: "organizer",
  },
  {
    name: "MPM Services",
    repo: "Melbourne-Property-Management-and-Services",
    liveUrl: "https://mpmservices.com.au",
    summary:
      "Website rebuild for a Melbourne cleaning and property-maintenance business.",
    detail:
      "A marketing site for a family-owned steam cleaning, strip & polish and property maintenance business. Built as a dependency-light site on Vite with vanilla ES modules, a hash-based router and a custom CSS design-token system, so the client gets something fast and maintainable without a framework runtime to carry.",
    highlights: [
      "Responsive service-site layout for residential and commercial clients",
      "Custom CSS design tokens, no CSS framework",
      "Lightweight hash-based SPA router in vanilla ES modules",
      "Outfit + Inter typography via self-hosted font loading",
    ],
    stack: ["JavaScript", "Vite", "CSS Design Tokens", "ES Modules"],
    year: "2025",
    art: "mpmservices",
  },
];

/** Compact numbers for the GitHub strip, refreshed at build time when possible. */
export const githubSnapshot = {
  totalRepos: 15,
  followers: 2,
  languages: [
    { name: "TypeScript", bytes: 410_000 },
    { name: "Python", bytes: 286_000 },
    { name: "JavaScript", bytes: 71_000 },
    { name: "HTML", bytes: 3_500 },
    { name: "CSS", bytes: 12_000 },
  ],
} as const;
