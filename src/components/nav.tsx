"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { site, navLinks } from "@/data/site";
import { ProfileLogo } from "./profile-logo";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // highlight whichever section currently owns the middle of the viewport
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // the mobile menu and the photo preview both need to lock scrolling, and the
  // header stays clickable while the menu is open, so this owns both flags
  useEffect(() => {
    document.body.style.overflow = open || previewOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, previewOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-ink-700/70 bg-ink-950/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8"
      >
        <div className="flex items-center gap-2.5">
          <ProfileLogo open={previewOpen} onOpenChange={setPreviewOpen} />
          <a href="#top" className="font-display text-sm font-semibold text-fog-100">
            {site.shortName}
            <span className="text-fog-500">.dev</span>
          </a>
        </div>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm transition-colors",
                  active === link.id ? "text-cyan-glow" : "text-fog-400 hover:text-fog-100",
                )}
              >
                {link.label}
                {active === link.id && !reduced ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-px h-px bg-cyan-glow"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={site.links.github}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={`${site.name} on GitHub`}
            className="grid h-9 w-9 place-items-center rounded-md border border-ink-700 text-fog-400 transition-colors hover:border-cyan-glow/40 hover:text-cyan-glow"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label={`${site.name} on LinkedIn`}
            className="grid h-9 w-9 place-items-center rounded-md border border-ink-700 text-fog-400 transition-colors hover:border-cyan-glow/40 hover:text-cyan-glow"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${site.email}`}
            className="rounded-md bg-gradient-to-r from-cyan-glow to-violet-glow px-4 py-2 text-sm font-semibold text-ink-950 transition-opacity hover:opacity-90"
          >
            <Mail className="mr-1.5 inline h-3.5 w-3.5" aria-hidden="true" />
            Hire me
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-9 w-9 place-items-center rounded-md border border-ink-700 text-fog-300 md:hidden"
        >
          {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-ink-700 bg-ink-950/95 backdrop-blur-xl md:hidden"
        >
          <ul className="mx-auto flex w-full max-w-6xl flex-col px-6 py-4 sm:px-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-ink-800 py-3 text-fog-300 transition-colors hover:text-cyan-glow"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-4 flex items-center gap-3">
              <a href={site.links.github} target="_blank" rel="me noopener noreferrer" className="text-sm text-fog-400">
                GitHub
              </a>
              <a href={site.links.linkedin} target="_blank" rel="me noopener noreferrer" className="text-sm text-fog-400">
                LinkedIn
              </a>
              <a href={`mailto:${site.email}`} className="text-sm text-cyan-glow">
                Email
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
