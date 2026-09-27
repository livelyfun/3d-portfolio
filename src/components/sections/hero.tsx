import { ArrowDown, FileText, Github, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";

const headlineStack = ["Python", "React", "Next.js", "Firebase"];

/**
 * Fast facts: a short, self-contained summary in a definition list. Answer
 * engines quote this style of block far more readily than prose, and it doubles
 * as a scannable summary for a human skimming the page.
 */
function FastFacts() {
  const facts = [
    { term: "Name", value: site.name },
    { term: "Role", value: site.roleLong },
    { term: "Location", value: `${site.location.city}, ${site.location.country}` },
    { term: "Stack", value: `${skillGroups.flatMap((g) => g.skills.map((s) => s.name)).slice(0, 8).join(", ")}, and more` },
    { term: "Projects", value: `${projects.length} featured on this page` },
  ];

  return (
    <dl className="panel mt-14 grid gap-x-8 gap-y-4 rounded-2xl p-6 sm:grid-cols-2 lg:grid-cols-3">
      {facts.map((fact) => (
        <div key={fact.term}>
          <dt className="font-mono text-[0.68rem] tracking-[0.18em] text-cyan-glow/70 uppercase">
            {fact.term}
          </dt>
          <dd className="mt-1 text-sm text-fog-300">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative scroll-mt-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-36 pb-24 text-center sm:px-8 sm:pt-44">
        <h1
          id="hero-heading"
          className="mt-0 text-4xl font-bold sm:text-6xl lg:text-7xl lg:leading-[1.05]"
        >
          <span className="text-gradient">Mithlesh Kumar Das</span>
        </h1>

        <p className="mt-5 font-mono text-sm tracking-[0.14em] text-cyan-glow/90 sm:text-base">
          {site.role}
        </p>

        <p className="mt-6 max-w-2xl text-lg text-fog-400">{site.tagline}</p>

        <p className="mt-3 font-mono text-xs text-fog-500">
          {"Building with "}
          {headlineStack.map((tech, i) => (
            <span key={tech}>
              <span className="text-fog-300">{tech}</span>
              {i < headlineStack.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-glow to-violet-glow px-6 py-3 text-sm font-semibold text-ink-950 transition-transform hover:-translate-y-0.5"
          >
            View my work
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </a>
          <a
            href={site.links.github}
            target="_blank"
            rel="me noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-ink-700 px-5 py-3 text-sm font-medium text-fog-300 transition-colors hover:border-cyan-glow/40 hover:text-cyan-glow"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
          <a
            href={site.resume.path}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-ink-700 px-5 py-3 text-sm font-medium text-fog-300 transition-colors hover:border-cyan-glow/40 hover:text-cyan-glow"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            {site.resume.label}
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-fog-500">
          <li className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {site.location.city}, {site.location.country}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-cyan-glow">
              {site.email}
            </a>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <a href={`tel:${site.phoneRaw}`} className="transition-colors hover:text-cyan-glow">
              {site.phone}
            </a>
          </li>
        </ul>

        <FastFacts />
      </div>
    </section>
  );
}
