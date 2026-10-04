import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LINKS } from "@/lib/trackConfig";

const SOCIALS = [
  { label: "Spotify", href: LINKS.spotify },
  { label: "SoundCloud", href: LINKS.soundcloud },
];

export default function SocialLinks() {
  return (
    <section className="relative border-t border-[#141414]">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-mono text-[11px] tracking-[0.4em] uppercase text-[#808080]"
        >
          Follow The Sound
        </motion.p>

        <ul className="mt-10 divide-y divide-[#141414] border-y border-[#141414]">
          {SOCIALS.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Follow FIJZI on ${s.label}`}
                className="group flex items-center justify-between py-6 transition-colors duration-300"
              >
                <span className="font-heading font-bold tracking-[-0.02em] text-[#F4F4F1] transition-all duration-300 group-hover:tracking-[0.02em]" style={{ fontSize: "clamp(1.75rem, 5vw, 3.25rem)" }}>
                  {s.label}
                </span>
                <ArrowUpRight
                  size={26}
                  className="text-[#3a3a3a] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#BEFF00]"
                />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}