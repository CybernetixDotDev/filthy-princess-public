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

export function SiteNav({ showEvents }: { showEvents: boolean }) {
  const [open, setOpen] = useState(false);
  const visibleLinks = showEvents ? links : links.filter(([, href]) => href !== "/events");

  return (
    <header className="absolute left-0 right-0 top-0 z-30 px-5 py-5 sm:px-8 sm:py-7">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/home" className="display text-xl tracking-wide" aria-label="Filthy Princess home">
          Filthy <i>Princess</i>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="border border-white/25 px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] transition hover:border-white/70"
          aria-label="Open navigation"
        >
          Menu
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-40 flex min-h-screen flex-col bg-[#171211] px-6 py-6 text-[#f5eee7] sm:px-12">
          <div className="flex items-center justify-between">
            <span className="display text-xl">Filthy <i>Princess</i></span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close navigation" className="p-2">
              <X size={24} strokeWidth={1} />
            </button>
          </div>
          <nav className="mt-20 flex flex-col gap-5" aria-label="Main navigation">
            {visibleLinks.map(([label, href], index) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="display text-4xl transition hover:text-[#d9a49b] sm:text-6xl">
                <span className="mr-3 align-top font-sans text-xs text-[#d9a49b]">0{index + 1}</span>{label}
              </Link>
            ))}
          </nav>
          <p className="mt-auto max-w-xs pb-4 text-sm leading-6 text-[#aa9b91]">A private world for people who notice things.</p>
        </div>
      )}
    </header>
  );
}
