import React from "react";
import { motion } from "framer-motion";
import { Play, Pause, ArrowUpRight } from "lucide-react";
import { useAudio } from "@/lib/AudioContext";
import { TRACK, LINKS } from "@/lib/trackConfig";

export default function LatestSingle() {
  const { isPlaying, toggle } = useAudio();

  return (
    <section className="relative border-t border-[#141414]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-24 md:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.4em] uppercase text-[#808080]">
          <span className="inline-block h-1.5 w-1.5 bg-[#BEFF00]" />
          {TRACK.label}
          <span className="text-[#3a3a3a]">/</span>
          <span>{TRACK.artist}</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-heading font-extrabold leading-[0.95] tracking-[-0.03em] text-[#F4F4F1]"
          style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
        >
          {TRACK.title}
        </motion.h2>

        <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[#6a6a6a]">
          <span># {TRACK.tag}</span>
          <span className="text-[#3a3a3a]">•</span>
          <span>{TRACK.duration}</span>
          <span className="text-[#3a3a3a]">•</span>
          <span>{TRACK.plays} plays</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "Pause latest single" : "Play latest single"}
            className="group inline-flex items-center gap-3 font-mono text-[12px] tracking-[0.3em] uppercase text-[#F4F4F1] transition-colors duration-300"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-[#2a2a2a] transition-all duration-300 group-hover:ring-[#BEFF00] group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-[#BEFF00]">
              {isPlaying ? (
                <Pause size={16} color="#BEFF00" fill="#BEFF00" />
              ) : (
                <Play size={16} color="#F4F4F1" fill="#F4F4F1" className="translate-x-[1px]" />
              )}
            </span>
            {isPlaying ? "Pause" : "Play"}
          </button>

          {[
            { href: LINKS.spotify, label: "Spotify" },
            { href: LINKS.soundcloud, label: "SoundCloud" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open FIJZI on ${label}`}
              className="group inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.3em] uppercase text-[#808080] transition-colors duration-300 hover:text-[#F4F4F1]"
            >
              <span>{label}</span>
              <ArrowUpRight size={13} className="text-[#3a3a3a] transition-colors duration-300 group-hover:text-[#BEFF00]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}