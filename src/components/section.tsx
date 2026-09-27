import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id: string;
  kicker: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export function SectionHeading({
  id,
  kicker,
  title,
  sub,
  align = "left",
  children,
}: SectionHeadingProps) {
  return (
    <header className={cn("flex flex-col gap-4", align === "center" && "items-center text-center")}>
      <p className="font-mono text-xs tracking-[0.28em] text-cyan-glow/80 uppercase">
        <span aria-hidden="true">{"// "}</span>
        {kicker}
      </p>
      <h2 id={id} className="text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
        <span className="text-gradient">{title}</span>
      </h2>
      {sub ? (
        <p className={cn("max-w-2xl text-fog-400", align === "center" && "mx-auto")}>{sub}</p>
      ) : null}
      {children}
    </header>
  );
}

export function Section({
  id,
  labelledBy,
  className,
  children,
}: {
  id: string;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:px-8", className)}
    >
      {children}
    </section>
  );
}
