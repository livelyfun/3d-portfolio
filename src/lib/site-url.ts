/**
 * Resolves the canonical site origin.
 *
 * Order of preference:
 *   1. NEXT_PUBLIC_SITE_URL          - explicit override
 *   2. VERCEL_PROJECT_PRODUCTION_URL - production domain, always set on Vercel
 *   3. VERCEL_URL                    - the specific deployment's domain
 *   4. http://localhost:3000         - local development
 *
 * Values may be given with or without a protocol; both are normalised here.
 */
function normalise(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return withProtocol.replace(/\/+$/, "");
}

function resolveSiteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    "";

  const normalised = normalise(fromEnv);
  if (normalised) return normalised;

  return process.env.NODE_ENV === "production"
    ? "https://example.vercel.app"
    : "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

/** Builds an absolute URL for canonical tags, OG images, sitemap entries, JSON-LD. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * True when we could not determine a real origin, which means canonical and
 * OG URLs would be wrong. Surfaced nowhere in the UI on purpose, but it keeps
 * the fallback honest instead of silently shipping localhost to production.
 */
export const SITE_URL_IS_PLACEHOLDER = SITE_URL.endsWith("example.vercel.app");
