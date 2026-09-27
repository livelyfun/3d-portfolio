import { CheckCircle2, Compass } from "lucide-react";
import { competencies } from "@/data/skills";
import { Section, SectionHeading } from "../section";
import { Reveal } from "../reveal";

const aboutParagraphs = [
  "I'm an entry-level backend and full-stack developer studying Information Technology at Mahendra Morang Adarsh Multiple Campus in Biratnagar, Nepal. My focus is the part of the stack where correctness matters: APIs, data models, authentication, realtime delivery and the pipelines that ship them.",
  "Most of what I know, I learned by building and shipping. A scientific calculator with a hand-written expression engine, a real-time stock terminal with WebSocket streaming and JWT auth, an Electron downloader, a CLI that tidies your Downloads folder. Each one taught me something the tutorials did not, especially how much breaks when a real user touches your code.",
  "I work in Git and GitHub as a first habit, write tests where the logic is worth protecting, and treat CI/CD and Docker as part of the work rather than an afterthought.",
];

function Currently() {
  const points = [
    "Studying Information Technology at Mahendra Morang Adarsh Multiple Campus",
    "Focused on backend, realtime delivery and authentication",
    "Maintaining open-source projects on GitHub",
  ];

  return (
    <div className="panel glow-ring rounded-2xl p-6">
      <p className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-amber-glow uppercase">
        <Compass className="h-3.5 w-3.5" aria-hidden="true" />
        Currently
      </p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm text-fog-300">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-glow" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function About() {
  return (
    <Section id="about" labelledBy="about-heading">
      <SectionHeading
        id="about-heading"
        kicker="About"
        title="A developer who ships."
        sub="Short version, in my own words."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-5">
          {aboutParagraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className="text-base leading-relaxed text-fog-300">{paragraph}</p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <dl className="mt-4 grid gap-5 sm:grid-cols-2">
              {competencies.map((item) => (
                <div key={item.label} className="border-l-2 border-ink-700 pl-4">
                  <dt className="font-mono text-[0.68rem] tracking-[0.18em] text-violet-glow/80 uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-sm text-fog-400">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:pt-1">
          <Currently />
        </Reveal>
      </div>
    </Section>
  );
}
