export type Skill = {
  name: string;
  /** Short qualifier shown next to the name, e.g. "basic". */
  level?: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  skills: Skill[];
};

/**
 * Grouped exactly as the CV presents them. `level` preserves the CV's own
 * honesty markers rather than inventing proficiency percentages.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    blurb: "Core syntax and the languages I reach for most.",
    skills: [
      { name: "Python" },
      { name: "JavaScript" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Component-driven interfaces and server-rendered React.",
    skills: [{ name: "React.js" }, { name: "Next.js" }],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    blurb: "REST and GraphQL services, realtime and auth.",
    skills: [
      { name: "REST APIs" },
      { name: "GraphQL" },
      { name: "Firebase" },
      { name: "Firestore" },
      { name: "Firebase Auth" },
      { name: "FCM" },
      { name: "Cloud Storage" },
      { name: "Node.js", level: "basic" },
    ],
  },
  {
    id: "devops",
    title: "CI/CD & DevOps",
    blurb: "Pipelines, containers and release automation.",
    skills: [
      { name: "GitHub Actions" },
      { name: "GitLab CI" },
      { name: "Docker", level: "basic" },
      { name: "Fastlane" },
      { name: "Bitrise" },
    ],
  },
  {
    id: "vcs",
    title: "Version Control",
    blurb: "Branching, reviews and a clean linear history.",
    skills: [{ name: "Git" }, { name: "GitHub" }],
  },
];

/** Tech labels orbiting the 3D core in the hero. */
export const orbitNodes = [
  "Python",
  "React",
  "Next.js",
  "Node.js",
  "Docker",
  "Firebase",
  "GraphQL",
  "Git",
  "REST",
  "TypeScript",
] as const;

export type Competency = { label: string; value: string };

export const competencies: Competency[] = [
  { label: "Work style", value: "Problem solving, Agile/Scrum, time management, attention to detail" },
  { label: "Communication", value: "Technical writing, written & verbal communication, stakeholder reporting" },
  { label: "Leadership", value: "Team collaboration, task allocation, mentorship & peer coaching" },
  { label: "Traits", value: "Fast learner, self-motivated, adaptable, critical thinking" },
];
