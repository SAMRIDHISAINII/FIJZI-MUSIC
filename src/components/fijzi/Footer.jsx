import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-[#141414]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-14 md:px-10">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[12px] tracking-[0.3em] uppercase text-[#F4F4F1]">
            FIJZI <span className="text-[#3a3a3a]">/</span> MUSIC
          </span>
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#555]">
            Sound × Soul × Frequency
          </span>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#555]">
            © 2026 FIJZI
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#3a3a3a]">
            made between silence and sound.
          </span>
        </div>
      </div>
    </footer>
  );
}