/**
 * Single source of truth for identity, contact and social links.
 * Feeds both the rendered UI and the JSON-LD structured data.
 */

export const site = {
  name: "Mithlesh Kumar Das",
  shortName: "Mithlesh",
  role: "Backend & Full-Stack Developer",
  roleLong:
    "Entry-Level Backend & Full-Stack Developer",
  tagline:
    "I build reliable backends and modern web apps with Python, React, Next.js and Firebase.",
  description:
    "Mithlesh Kumar Das is an entry-level backend and full-stack developer based in Biratnagar, Nepal. He builds with Python, JavaScript, React, Next.js, REST and GraphQL APIs, Firebase, Docker and CI/CD, and is currently pursuing a Bachelor of Information Technology at Mahendra Morang Adarsh Multiple Campus.",
  locale: "en_US",
  email: "mithleshkumardas527@gmail.com",
  phone: "+977-9703817024",
  phoneRaw: "+9779703817024",
  location: {
    city: "Biratnagar",
    region: "Province 1",
    country: "Nepal",
    countryCode: "NP",
  },
  links: {
    github: "https://github.com/livelyfun",
    linkedin: "https://www.linkedin.com/in/mithlesh-das-876973343/",
    cv: "/Mithlesh_Kumar_Das_CV.pdf",
  },
  resume: {
    path: "/Mithlesh_Kumar_Das_CV.pdf",
    label: "Download CV",
  },
  languages: ["Nepali", "English", "Hindi", "Madhesi"],
} as const;

export const GITHUB_USERNAME = "livelyfun";

/** Route anchors, shared by the nav and the section components. */
export const navLinks = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
] as const;
