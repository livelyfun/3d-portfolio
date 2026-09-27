"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { site } from "@/data/site";

const PHOTO = "/profile.jpg";

/**
 * Navbar avatar that opens a full-screen preview of the same photo.
 *
 * Controlled rather than self-contained so the navbar can own both the mobile
 * menu and this dialog, and lock page scrolling for either one from a single
 * effect. The overlay is portalled to <body> to escape the fixed header's
 * stacking context.
 */
export function ProfileLogo({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
        return;
      }

      // the close button is the only focusable element, so hold focus on it
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`View a larger photo of ${site.name}`}
        className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-cyan-glow/30 transition-colors hover:border-cyan-glow/60 focus-visible:border-cyan-glow focus-visible:outline-none"
      >
        <Image
          src={PHOTO}
          alt={site.name}
          fill
          sizes="36px"
          priority
          className="object-cover object-top"
        />
      </button>

      {typeof document === "undefined"
        ? null
        : createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={`Photo of ${site.name}`}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/85 p-4 backdrop-blur-sm sm:p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.18 }}
                  onClick={() => onOpenChange(false)}
                >
                  <motion.div
                    className="relative h-[70vmin] w-[70vmin] overflow-hidden rounded-full border-2 border-cyan-glow/25"
                    initial={reduced ? false : { scale: 0.96 }}
                    animate={{ scale: 1 }}
                    exit={reduced ? undefined : { scale: 0.98 }}
                    transition={{ duration: reduced ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Image
                      src={PHOTO}
                      alt={site.name}
                      fill
                      sizes="70vmin"
                      className="object-cover object-top"
                    />
                  </motion.div>

                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => onOpenChange(false)}
                    aria-label="Close photo preview"
                    className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-lg border border-ink-700 bg-ink-900/80 text-fog-300 backdrop-blur transition-colors hover:border-cyan-glow/40 hover:text-cyan-glow focus-visible:border-cyan-glow focus-visible:outline-none"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )}
    </>
  );
}
