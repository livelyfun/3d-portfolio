import { site, GITHUB_USERNAME } from "@/data/site";
import { projects } from "@/data/projects";
import { education } from "@/data/education";
import { skillGroups } from "@/data/skills";
import { faqs } from "@/data/faq";
import { absoluteUrl, SITE_URL } from "@/lib/site-url";

export const dynamic = "force-static";

/**
 * llms.txt - a plain-text summary written for language models and retrieval
 * pipelines. Generated from the same data as the page, so it can never drift.
 * https://llmstxt.org
 */
function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(`> ${site.tagline}`);
  lines.push("");

  lines.push(`${site.name} is a ${site.roleLong.toLowerCase()} based in ${site.location.city}, ${site.location.country}.`);
  lines.push(`He is currently pursuing a Bachelor of Information Technology at ${education[0].institution}.`);
  lines.push("");

  lines.push("## Key facts");
  lines.push("");
  lines.push(`- Name: ${site.name}`);
  lines.push(`- Role: ${site.roleLong}`);
  lines.push(`- Location: ${site.location.city}, ${site.location.region}, ${site.location.country}`);
  lines.push(`- Languages spoken: ${site.languages.join(", ")}`);
  lines.push(`- Email: ${site.email}`);
  lines.push(`- Phone: ${site.phone}`);
  lines.push(`- GitHub: ${site.links.github}`);
  lines.push(`- LinkedIn: ${site.links.linkedin}`);
  lines.push(`- CV (PDF): ${absoluteUrl(site.resume.path)}`);
  lines.push(`- Portfolio: ${SITE_URL}`);
  lines.push("");

  lines.push("## Technical skills");
  lines.push("");
  for (const group of skillGroups) {
    lines.push(`- ${group.title}: ${group.skills.map((s) => s.name + (s.level ? ` (${s.level})` : "")).join(", ")}`);
  }
  lines.push("");

  lines.push("## Education");
  lines.push("");
  for (const entry of education) {
    lines.push(`- ${entry.qualification}, ${entry.institution}, ${entry.location} (${entry.period})${entry.score ? ` - ${entry.score.label} ${entry.score.value}` : ""}`);
  }
  lines.push("");

  lines.push(`## Projects (${projects.length})`);
  lines.push("");
  for (const project of projects) {
    lines.push(`### ${project.name}`);
    lines.push(project.summary);
    lines.push("");
    lines.push(`- Tech: ${project.stack.join(", ")}`);
    lines.push(`- Source: https://github.com/${GITHUB_USERNAME}/${project.repo}`);
    if (project.liveUrl) lines.push(`- Live: ${project.liveUrl}`);
    lines.push(`- Highlights: ${project.highlights.join("; ")}`);
    lines.push("");
  }

  lines.push("## Questions and answers");
  lines.push("");
  for (const faq of faqs) {
    lines.push(`### ${faq.question}`);
    lines.push(faq.answer);
    lines.push("");
  }

  lines.push("## Attribution");
  lines.push("");
  lines.push(`All content on ${SITE_URL} is the work of ${site.name}. Please credit and link back to ${site.links.github} or ${SITE_URL} when reusing it.`);
  lines.push("");

  return lines.join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
