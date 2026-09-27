import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { Github } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { GITHUB_REPO_URL } from "@/lib/utils";
import { Section, SectionHeading } from "../section";
import { Reveal } from "../reveal";
import { ProjectArt } from "../project-art";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const repoUrl = GITHUB_REPO_URL(project.repo);
  const featured = index === 0;

  return (
    <Reveal as="article" delay={(index % 2) * 0.08} className="h-full">
      <div
        className="panel glow-ring group flex h-full flex-col overflow-hidden rounded-2xl"
        data-project={project.name}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-ink-700 bg-ink-900">
          {project.image ? (
            <Image
              src={project.image}
              alt={`Screenshot of ${project.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
              <ProjectArt art={project.art} />
            </div>
          )}

          {featured ? (
            <span className="absolute top-3 left-3 rounded-md border border-cyan-glow/40 bg-ink-950/85 px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.14em] text-cyan-glow uppercase backdrop-blur">
              Flagship
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-fog-100">{project.name}</h3>
            <time className="shrink-0 font-mono text-xs text-fog-500">{project.year}</time>
          </div>

          <p className="mt-2.5 text-sm leading-relaxed text-fog-300">{project.summary}</p>
          <p className="mt-3 text-sm leading-relaxed text-fog-500">{project.detail}</p>

          <ul className="mt-4 flex flex-col gap-1.5">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-xs text-fog-400">
                <Star
                  className="mt-0.5 h-3 w-3 shrink-0 fill-cyan-glow/25 text-cyan-glow"
                  aria-hidden="true"
                />
                {highlight}
              </li>
            ))}
          </ul>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-ink-800 bg-ink-900/80 px-2 py-0.5 font-mono text-[0.68rem] text-fog-500"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ink-800 pt-5">
            <a
              href={repoUrl}
              target="_blank"
              rel="me noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-glow transition-colors hover:text-fog-100"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Source code
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-fog-400 transition-colors hover:text-fog-100"
              >
                Live site
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Projects() {
  return (
    <Section id="projects" labelledBy="projects-heading">
      <SectionHeading
        id="projects-heading"
        kicker="Projects"
        title="Things I've built."
        sub="Every description here comes from reading the code, not from the repo blurb. Source for all of it is on GitHub."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.repo} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
