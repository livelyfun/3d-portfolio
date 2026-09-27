import { skillGroups } from "@/data/skills";
import { Section, SectionHeading } from "../section";
import { Reveal } from "../reveal";

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-heading">
      <SectionHeading
        id="skills-heading"
        kicker="Skills"
        title="The toolkit."
        sub="Grouped the way I actually reach for them. Where I have only touched something lightly, I say so rather than inflate it."
        align="center"
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.id} delay={i * 0.06} as="article" className="h-full">
            <div className="panel glow-ring flex h-full flex-col rounded-xl p-6">
              <h3 className="font-display text-base font-semibold text-fog-100">{group.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-fog-500">{group.blurb}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-ink-700 bg-ink-900 px-2.5 py-1 font-mono text-xs text-fog-300">
                      {skill.name}
                      {skill.level ? (
                        <span className="text-amber-glow/80">({skill.level})</span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
