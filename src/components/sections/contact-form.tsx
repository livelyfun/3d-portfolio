"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { site } from "@/data/site";
import { mailtoLink } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Fields = { name: string; email: string; subject: string; message: string };

const EMPTY: Fields = { name: "", email: "", subject: "", message: "" };

const fieldClass =
  "w-full rounded-lg border border-ink-700 bg-ink-900/70 px-4 py-3 text-sm text-fog-100 placeholder:text-fog-500 transition-colors focus:border-cyan-glow/50 focus:outline-none";

/**
 * No backend by design: the form composes a prefilled mailto: link so it works
 * with zero configuration, no API keys and nothing to break. Visitors who
 * prefer their own client can still see every field.
 */
export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);

  const update = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = fields.subject.trim() || `Portfolio enquiry from ${fields.name || "a visitor"}`;
    const body = [
      fields.message.trim(),
      "",
      "---",
      `Name: ${fields.name || "not provided"}`,
      `Email: ${fields.email || "not provided"}`,
      `Sent from: ${site.links.github.replace("https://github.com/", "github.com/")}`,
    ].join("\n");

    window.location.href = mailtoLink(site.email, { subject, body });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[0.68rem] tracking-[0.18em] text-fog-500 uppercase">
            Your name
          </span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={fields.name}
            onChange={update("name")}
            placeholder="Jane Doe"
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-mono text-[0.68rem] tracking-[0.18em] text-fog-500 uppercase">
            Your email
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={update("email")}
            placeholder="jane@company.com"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[0.68rem] tracking-[0.18em] text-fog-500 uppercase">
          Subject
        </span>
        <input
          type="text"
          name="subject"
          value={fields.subject}
          onChange={update("subject")}
          placeholder="Project collaboration, code review, question…"
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[0.68rem] tracking-[0.18em] text-fog-500 uppercase">
          Message
        </span>
        <textarea
          name="message"
          rows={5}
          required
          value={fields.message}
          onChange={update("message")}
          placeholder="Tell me about the role or the project."
          className={cn(fieldClass, "resize-y")}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-glow to-violet-glow px-6 py-3 text-sm font-semibold text-ink-950 transition-transform hover:-translate-y-0.5"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send message
        </button>
        <p className="text-xs text-fog-500">
          Opens your email client with everything pre-filled. No server, no tracking.
        </p>
      </div>
    </form>
  );
}
