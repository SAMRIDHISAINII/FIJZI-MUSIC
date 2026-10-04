import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LINKS } from "@/lib/trackConfig";
import CDPlayer from "./CDPlayer";

const linkBtn = (href, label) => (
  <a
    key={label}
    href={href}
    target="_blank"
    rel="noreferrer noopener"
    aria-label={`Open FIJZI on ${label}`}
    className="group inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.25em] uppercase text-[#808080] transition-colors duration-300 hover:text-[#F4F4F1]"
  >
    <span>{label}</span>
    <ArrowUpRight size={13} className="text-[#3a3a3a] transition-colors duration-300 group-hover:text-[#BEFF00]" />
  </a>
);

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto grid min-h-screen max-w-[1400px] grid-cols-1 items-center gap-12 px-6 pb-24 pt-32 md:px-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8 lg:pt-28">
      {/* LEFT — identity stack */}
      <div className="order-1 flex flex-col gap-7">
        <motion.p custom={0} variants={fade} initial="hidden" animate="show" className="font-mono text-[11px] tracking-[0.4em] uppercase text-[#808080]">
          Sound <span className="text-[#3a3a3a]">×</span> Soul <span className="text-[#3a3a3a]">×</span> Frequency
        </motion.p>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="font-heading font-extrabold leading-[0.85] tracking-[-0.04em] text-[#F4F4F1]"
          style={{ fontSize: "clamp(4rem, 11vw, 8.5rem)" }}
        >
          FIJZI
        </motion.h1>

        <motion.div custom={2} variants={fade} initial="hidden" animate="show" className="font-mono text-[12px] tracking-[0.3em] uppercase text-[#808080]">
          Music Producer
          <span className="mx-2 text-[#3a3a3a]">/</span>
          Composer
        </motion.div>

        <motion.p custom={3} variants={fade} initial="hidden" animate="show" className="max-w-md font-body text-[15px] leading-[1.7] text-[#a8a8a8]">
          I write, produce and experiment — chasing the feeling that lives
          between sound and silence.
          <br />
          <br />
          For me, music is the divine way to tell beautiful, poetic things to
          the heart. Press play and listen to my latest single, “Yu Hi”.
        </motion.p>

        <motion.div custom={4} variants={fade} initial="hidden" animate="show" className="flex flex-wrap items-center gap-6 pt-1">
          {linkBtn(LINKS.spotify, "Spotify")}
          {linkBtn(LINKS.soundcloud, "SoundCloud")}
        </motion.div>
      </div>

      {/* RIGHT — the object */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="order-2 flex justify-center lg:justify-end"
      >
        <CDPlayer />
      </motion.div>
    </section>
  );
}