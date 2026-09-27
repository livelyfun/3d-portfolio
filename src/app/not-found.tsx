import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-sm tracking-[0.3em] text-cyan-glow uppercase">error 404</p>
      <h1 className="mt-6 text-5xl font-bold">
        <span className="text-gradient">Page not found.</span>
      </h1>
      <p className="mt-4 max-w-md text-fog-400">
        That route does not exist on this site. Everything worth reading lives on the home page.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-glow to-violet-glow px-6 py-3 text-sm font-semibold text-ink-950"
      >
        Back to the portfolio
      </Link>
    </div>
  );
}
