import { GITHUB_USERNAME } from "@/data/site";
import { githubSnapshot } from "@/data/projects";

export type LanguageStat = { name: string; bytes: number };

export type GithubStats = {
  publicRepos: number;
  followers: number;
  languages: LanguageStat[];
  /** True when the numbers came from the live API rather than the snapshot. */
  live: boolean;
};

/**
 * Snapshot of the values read from the GitHub API, used whenever the fetch
 * fails. Keeps a rate limit or network blip from ever failing a build.
 */
const FALLBACK: GithubStats = {
  publicRepos: githubSnapshot.totalRepos,
  followers: githubSnapshot.followers,
  languages: githubSnapshot.languages.map((l) => ({ ...l })),
  live: false,
};

const API = "https://api.github.com";

function headers(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: headers(),
      // Stats change slowly; revalidate hourly and fall back silently.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

type RepoLanguages = Record<string, number>;

/**
 * Aggregates bytes-per-language across every public repo, so the language
 * bars reflect the whole account rather than one repository.
 */
function mergeLanguages(perRepo: RepoLanguages[]): LanguageStat[] {
  const totals = new Map<string, number>();
  for (const repo of perRepo) {
    for (const [name, bytes] of Object.entries(repo)) {
      totals.set(name, (totals.get(name) ?? 0) + bytes);
    }
  }
  return [...totals.entries()]
    .map(([name, bytes]) => ({ name, bytes }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 6);
}

/**
 * Best-effort GitHub profile stats, prerendered at build time.
 * Always resolves - falls back to the snapshot rather than throwing.
 */
export async function getGithubStats(): Promise<GithubStats> {
  const profile = await fetchJson<{ public_repos: number; followers: number }>(
    `/users/${GITHUB_USERNAME}`,
  );
  if (!profile) return FALLBACK;

  const repos = await fetchJson<{ name: string; language: string | null }[]>(
    `/users/${GITHUB_USERNAME}/repos?per_page=100`,
  );
  if (!repos?.length) {
    return {
      publicRepos: profile.public_repos,
      followers: profile.followers,
      languages: FALLBACK.languages,
      live: true,
    };
  }

  // Language endpoints are one request per repo. Cap the number of requests so
  // a large account cannot exhaust the rate limit mid-build.
  const withLanguage = repos.filter((r) => r.language).slice(0, 20);
  const languageResults = await Promise.all(
    withLanguage.map((r) => fetchJson<RepoLanguages>(`/repos/${GITHUB_USERNAME}/${r.name}/languages`)),
  );

  const languages = mergeLanguages(languageResults.filter(Boolean) as RepoLanguages[]);

  return {
    publicRepos: profile.public_repos,
    followers: profile.followers,
    languages: languages.length ? languages : FALLBACK.languages,
    live: true,
  };
}
