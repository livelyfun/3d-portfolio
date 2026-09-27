import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Absolute or site-relative path to the CV file. */
export const CV_PATH = "/Mithlesh_Kumar_Das_CV.pdf";

/** Builds the mailto: link with a prefilled subject and body. */
export function mailtoLink(
  to: string,
  opts: { subject?: string; body?: string } = {},
): string {
  const params = new URLSearchParams();
  if (opts.subject) params.set("subject", opts.subject);
  if (opts.body) params.set("body", opts.body);
  const query = params.toString();
  return `mailto:${to}${query ? `?${query}` : ""}`;
}

export const GITHUB_REPO_URL = (slug: string) =>
  `https://github.com/livelyfun/${slug}`;

/** Byte totals to kilobytes, rounded to one decimal. */
export function toKb(bytes: number): number {
  return Math.round((bytes / 1024) * 10) / 10;
}
