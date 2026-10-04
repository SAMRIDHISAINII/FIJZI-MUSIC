import React from "react";
import { LINKS } from "@/lib/trackConfig";

const ext = (href, label) => (
  <a
    key={label}
    href={href}
    target="_blank"
    rel="noreferrer noopener"
    aria-label={`Listen to FIJZI on ${label}`}
    className="group relative font-mono text-[11px] tracking-[0.25em] uppercase text-[#808080] transition-colors duration-300 hover:text-[#F4F4F1]"
  >
    <span>{label}</span>
    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#BEFF00] transition-all duration-300 group-hover:w-full" />
  </a>
);

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-[#070707]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="font-mono text-[12px] tracking-[0.3em] uppercase text-[#F4F4F1]">
          FIJZI <span className="text-[#3a3a3a]">/</span> MUSIC
        </a>
        <div className="flex items-center gap-7">
          {ext(LINKS.spotify, "Spotify")}
          {ext(LINKS.soundcloud, "SoundCloud")}
        </div>
      </div>
    </nav>
  );
}