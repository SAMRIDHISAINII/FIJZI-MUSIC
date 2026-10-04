import React from "react";
import { motion } from "framer-motion";
import { DISCOGRAPHY } from "@/lib/trackConfig";
import DiscographyRow from "./DiscographyRow";

export default function Discography() {
  return (
    <section id="discography" className="relative border-t border-[#141414]">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#808080]"
        >
          Discography
        </motion.p>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="font-heading font-extrabold leading-[1.0] tracking-[-0.03em] text-[#F4F4F1]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Releases
          </motion.h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#555]">
            {DISCOGRAPHY.length} tracks
          </span>
        </div>

        <div className="mt-10 divide-y divide-[#141414] border-t border-[#141414]">
          {DISCOGRAPHY.map((track, i) => (
            <DiscographyRow key={track.id} track={track} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}