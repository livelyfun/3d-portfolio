import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Github, Linkedin } from "lucide-react";
import { site } from "@/data/site";
import { faqs } from "@/data/faq";
import { Section, SectionHeading } from "../section";
import { Reveal } from "../reveal";
import { ContactForm } from "./contact-form";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Fastest route. I read everything.",
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phoneRaw}`,
    note: "Nepal time, UTC+5:45",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/livelyfun",
    href: site.links.github,
    note: "Source for every project on this page",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/mithlesh-das-876973343",
    href: site.links.linkedin,
    note: "Professional profile and updates",
  },
];

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-heading">
      <SectionHeading
        id="contact-heading"
        kicker="Contact"
        title="Let's talk."
        sub="Collaborating, reviewing code, or just want to talk about an expression parser? All of it is welcome."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <ul className="flex flex-col gap-4">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "me noopener noreferrer" : undefined}
                    className="panel glow-ring flex items-center gap-4 rounded-xl p-4"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-ink-700 bg-ink-900 text-cyan-glow">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="font-mono text-[0.68rem] tracking-[0.18em] text-fog-500 uppercase">
                        {channel.label}
                      </span>
                      <span className="truncate text-sm text-fog-100">{channel.value}</span>
                      <span className="truncate text-xs text-fog-500">{channel.note}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="panel mt-4 flex flex-col gap-2 rounded-xl p-5 text-sm text-fog-400">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-violet-glow" aria-hidden="true" />
              <address className="not-italic">
                {site.location.city}, {site.location.region}, {site.location.country}
              </address>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-violet-glow" aria-hidden="true" />
              Working hours: 10:00 – 18:00 NPT (UTC+5:45)
            </p>
            <p className="text-xs text-fog-500">Languages: {site.languages.join(", ")}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="panel h-full rounded-2xl p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>

      {/* Visible FAQ. Mirrors the FAQPage JSON-LD emitted in the layout. */}
      <div className="mt-24">
        <h3
          id="faq-heading"
          className="text-2xl font-bold sm:text-3xl"
        >
          <span className="text-gradient">Common questions.</span>
        </h3>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={(i % 2) * 0.06}>
              <div className="panel glow-ring h-full rounded-xl p-5">
                <h4 className="font-display text-base font-semibold text-fog-100">
                  {faq.question}
                </h4>
                <p className="mt-2.5 text-sm leading-relaxed text-fog-400">{faq.answer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
