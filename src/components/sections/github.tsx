import { ArrowUpRight, GitFork, Heart, Users } from "lucide-react";
import { Github } from "lucide-react";
import { site, GITHUB_USERNAME } from "@/data/site";
import { getGithubStats } from "@/lib/github";
import { toKb } from "@/lib/utils";
import { Section, SectionHeading } from "../section";
import { Reveal } from "../reveal";

function formatBytes(bytes: number): string {
  const kb = toKb(bytes);
  return kb >= 1000 ? `${Math.round(kb / 1000).toFixed(1)} MB` : `${kb} KB`;
}

function StatTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="panel glow-ring rounded-xl p-5 text-center">
      <span className="mx-auto mb-3 grid h-9 w-9 place-items-center rounded-lg border border-ink-700 bg-ink-900 text-cyan-glow">
        {icon}
      </span>
      <p className="font-display text-2xl font-bold text-fog-100">{value}</p>
      <p className="mt-1 font-mono text-[0.68rem] tracking-[0.14em] text-fog-500 uppercase">
        {label}
      </p>
    </div>
  );
}

export async function GithubSection() {
  const stats = await getGithubStats();
  const totalBytes = stats.languages.reduce((sum, l) => sum + l.bytes, 0) || 1;

  return (
    <Section id="github" labelledBy="github-heading">
      <SectionHeading
        id="github-heading"
        kicker="GitHub"
        title="Open source footprint."
        sub="Statistics read from the GitHub API at build time, so they reflect the account rather than a number I typed by hand."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        <Reveal delay={0}>
          <StatTile icon={<Github className="h-4 w-4" aria-hidden="true" />} label="Public repos" value={String(stats.publicRepos)} />
        </Reveal>
        <Reveal delay={0.06}>
          <StatTile icon={<Users className="h-4 w-4" aria-hidden="true" />} label="Followers" value={String(stats.followers)} />
        </Reveal>
        <Reveal delay={0.12}>
          <StatTile
            icon={<GitFork className="h-4 w-4" aria-hidden="true" />}
            label="Languages"
            value={String(stats.languages.length)}
          />
        </Reveal>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Reveal delay={0.05}>
          <div className="panel h-full rounded-2xl p-6">
            <h3 className="font-display text-base font-semibold text-fog-100">
              Bytes by language
            </h3>
            <p className="mt-1.5 text-xs text-fog-500">
              Aggregated across every public repository on the account.
            </p>

            <ul className="mt-6 flex flex-col gap-4">
              {stats.languages.map((lang) => {
                const pct = Math.round((lang.bytes / totalBytes) * 100);
                return (
                  <li key={lang.name}>
                    <div className="flex items-baseline justify-between font-mono text-xs">
                      <span className="text-fog-300">{lang.name}</span>
                      <span className="text-fog-500">
                        {formatBytes(lang.bytes)} · {pct}%
                      </span>
                    </div>
                    <div
                      className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-800"
                      role="img"
                      aria-label={`${lang.name}: ${pct} percent`}
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-glow to-violet-glow"
                        style={{ width: `${Math.max(pct, 2)}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel flex h-full flex-col justify-between rounded-2xl p-6">
            <div>
              <h3 className="font-display text-base font-semibold text-fog-100">
                How I work with Git
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fog-400">
                Branch per change, descriptive commits, pull requests even when working solo.
                Most of my repos carry GitHub Actions workflows so tests and builds run on
                every push instead of on my memory.
              </p>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-fog-400">
                {[
                  "Feature branches and reviewed pull requests",
                  "Automated tests and builds via GitHub Actions",
                  "Containerised builds with Docker Compose",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Heart className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-glow" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={site.links.github}
              target="_blank"
              rel="me noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 self-start rounded-lg border border-ink-700 px-5 py-2.5 text-sm font-medium text-cyan-glow transition-colors hover:border-cyan-glow/40 hover:bg-cyan-glow/5"
            >
              Browse github.com/{GITHUB_USERNAME}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
