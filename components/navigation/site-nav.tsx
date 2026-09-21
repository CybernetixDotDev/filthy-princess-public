"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";

const links = [
  ["Home", "/home"],
  ["Cally", "/cally"],
  ["Experience", "/experience"],
  ["Retreat", "/retreat"],
  ["Store", "/store"],
  ["Events", "/events"],
  ["Inner Sanctum", "/inner-sanctum"],
];

export function SiteNav({ showEvents, joinHref }: { showEvents: boolean; joinHref: string }) {
  const [open, setOpen] = useState(false);
  const visibleLinks = showEvents ? links : links.filter(([, href]) => href !== "/events");

  return (
    <header className="absolute left-0 right-0 top-0 z-30 px-5 py-5 sm:px-8 sm:py-7">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <Link href="/home" className="display text-lg tracking-wide sm:text-xl" aria-label="Filthy Princess home">
          Filthy <i>Princess</i>
        </Link>
        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <a href={joinHref} className="inline-flex min-h-11 items-center border-b border-[#d9a49b]/50 text-sm text-[#e7c1b5] transition hover:border-[#e7c1b5] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4">Join Free</a>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="border border-white/25 px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] transition hover:border-white/70"
          aria-label="Open navigation"
        >
          Menu
        </button>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-40 h-[100dvh] overflow-y-auto flex-col bg-[#171211] px-6 py-6 text-[#f5eee7] sm:px-12">
          <div className="flex items-center justify-between">
            <span className="display text-xl">Filthy <i>Princess</i></span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close navigation" className="p-2">
              <X size={24} strokeWidth={1} />
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-4 sm:mt-12 sm:gap-5" aria-label="Main navigation">
            {visibleLinks.map(([label, href], index) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="display text-4xl transition hover:text-[#d9a49b] sm:text-6xl">
                <span className="mr-3 align-top font-sans text-xs text-[#d9a49b]">0{index + 1}</span>{label}
              </Link>
            ))}
            <a href={joinHref} className="display mt-3 inline-flex min-h-11 items-center self-start border-b border-[#d9a49b]/50 pb-2 text-3xl text-[#d9a49b] transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-4xl">Join Free <span aria-hidden="true" className="ml-3">&rarr;</span></a>
          </nav>
          <p className="mt-auto max-w-xs pt-8 pb-4 text-sm leading-6 text-[#aa9b91]">A private world for people who notice things.</p>
        </div>
      )}
    </header>
  );
}
