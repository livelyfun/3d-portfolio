import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Education } from "@/components/sections/education";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { GithubSection } from "@/components/sections/github";
import { Contact } from "@/components/sections/contact";

/**
 * A server component, so every word below is in the prerendered HTML.
 * The 3D layer is decorative and lives behind this content.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <GithubSection />
      <Contact />
    </>
  );
}
