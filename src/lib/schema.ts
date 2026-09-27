import { site, GITHUB_USERNAME } from "@/data/site";
import { projects } from "@/data/projects";
import { education } from "@/data/education";
import { faqs } from "@/data/faq";
import { skillGroups } from "@/data/skills";
import { absoluteUrl, SITE_URL } from "./site-url";

/**
 * JSON-LD builders. Everything here is derived from the data layer, so the
 * structured data and the visible page can never drift apart.
 */

const PERSON_ID = `${SITE_URL}/#person`;

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    alternateName: site.shortName,
    jobTitle: site.roleLong,
    description: site.description,
    url: SITE_URL,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    image: absoluteUrl("/profile.jpg"),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    knowsLanguage: site.languages,
    knowsAbout: skillGroups.flatMap((group) => group.skills.map((s) => s.name)),
    alumniOf: education.map((entry) => ({
      "@type": "CollegeOrUniversity",
      name: entry.institution,
    })),
    sameAs: [site.links.github, site.links.linkedin],
    subjectOf: { "@id": `${SITE_URL}/#website` },
  };
}

export function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${site.name} — Portfolio`,
    description: site.tagline,
    inLanguage: site.locale,
    publisher: { "@id": PERSON_ID },
  };
}

export function profilePageSchema() {
  return {
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: `${site.name} — ${site.role}`,
    description: site.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": PERSON_ID },
    dateModified: new Date().toISOString().slice(0, 10),
    inLanguage: site.locale,
  };
}

/** The projects list, plus one SoftwareSourceCode node per project. */
export function projectsSchema() {
  const itemListElement = projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: { "@id": `${SITE_URL}/#project-${project.repo}` },
  }));

  const software = projects.map((project) => ({
    "@type": "SoftwareSourceCode",
    "@id": `${SITE_URL}/#project-${project.repo}`,
    name: project.name,
    description: project.summary,
    codeRepository: `https://github.com/${GITHUB_USERNAME}/${project.repo}`,
    programmingLanguage: project.stack,
    author: { "@id": PERSON_ID },
    dateCreated: project.year,
    keywords: project.stack,
    ...(project.liveUrl ? { targetUrl: project.liveUrl } : {}),
  }));

  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#projects`,
    name: `Projects by ${site.name}`,
    description: `Open-source and client projects built by ${site.name}.`,
    numberOfItems: projects.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement,
    mainEntity: software,
  };
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema() {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Portfolio",
        item: SITE_URL,
      },
    ],
  };
}

/** One combined graph, rendered as a single <script type="application/ld+json">. */
export function jsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      webSiteSchema(),
      profilePageSchema(),
      projectsSchema(),
      faqSchema(),
      breadcrumbSchema(),
    ],
  };
}

/** Serialises a schema graph for safe embedding in a script tag. */
export function serializeLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
