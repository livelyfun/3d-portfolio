import { Mail, MapPin } from "lucide-react";
import { Github, Linkedin } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 bg-ink-950/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-lg font-semibold text-fog-100">{site.name}</p>
          <p className="mt-2 text-sm text-fog-400">{site.tagline}</p>
          <address className="mt-4 flex items-center gap-2 text-sm text-fog-500 not-italic">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {site.location.city}, {site.location.country}
          </address>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
          <p className="font-mono text-xs tracking-[0.2em] text-fog-500 uppercase">Elsewhere</p>
          <a
            href={site.links.github}
            target="_blank"
            rel="me noopener noreferrer"
            className="inline-flex items-center gap-2 text-fog-400 transition-colors hover:text-cyan-glow"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            github.com/{site.links.github.split("/").pop()}
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="me noopener noreferrer"
            className="inline-flex items-center gap-2 text-fog-400 transition-colors hover:text-cyan-glow"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            LinkedIn profile
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 text-fog-400 transition-colors hover:text-cyan-glow"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {site.email}
          </a>
        </nav>
      </div>

      <div className="border-t border-ink-800">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-fog-500 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {site.name}. Built with Next.js, React Three Fiber and Tailwind CSS.
          </p>
          <p className="font-mono">Designed and developed in Biratnagar, Nepal</p>
        </div>
      </div>
    </footer>
  );
}
