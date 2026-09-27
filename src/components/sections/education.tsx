import { GraduationCap, MapPin } from "lucide-react";
import { education } from "@/data/education";
import { Section, SectionHeading } from "../section";
import { Reveal } from "../reveal";

export function Education() {
  return (
    <Section id="education" labelledBy="education-heading">
      <SectionHeading
        id="education-heading"
        kicker="Education"
        title="Qualifications."
        sub="Currently studying Information Technology, with the grades to back it up."
      />

      <ol className="relative mt-12 flex flex-col gap-8 border-l border-ink-700 pl-6 sm:pl-8">
        {education.map((entry, i) => (
          <Reveal as="li" key={entry.id} delay={i * 0.08} className="relative">
            {/* node marker on the timeline rail */}
            <span
              aria-hidden="true"
              className={`absolute top-1.5 -left-[1.9rem] grid h-3.5 w-3.5 place-items-center rounded-full border-2 sm:-left-[2.4rem] ${
                entry.status === "current"
                  ? "border-cyan-glow bg-cyan-glow/25 shadow-[0_0_14px_rgba(34,211,238,0.55)]"
                  : "border-ink-500 bg-ink-900"
              }`}
            />

            <div className="panel glow-ring rounded-xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-fog-100">
                    <GraduationCap
                      className="mr-2 inline h-4 w-4 -translate-y-0.5 text-cyan-glow"
                      aria-hidden="true"
                    />
                    {entry.qualification}
                  </h3>
                  <p className="mt-1.5 text-sm text-fog-300">{entry.institution}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-fog-500">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {entry.location}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <time className="font-mono text-xs text-fog-500">{entry.period}</time>
                  {entry.score ? (
                    <span className="rounded-md border border-ink-700 bg-ink-900 px-2.5 py-1 font-mono text-xs text-cyan-glow">
                      {entry.score.label} {entry.score.value}
                    </span>
                  ) : entry.status === "current" ? (
                    <span className="rounded-md border border-cyan-glow/30 bg-cyan-glow/10 px-2.5 py-1 font-mono text-xs text-cyan-glow">
                      In progress
                    </span>
                  ) : null}
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-fog-400">{entry.detail}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
