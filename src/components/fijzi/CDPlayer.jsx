import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useAudio } from "@/lib/AudioContext";
import { TRACK } from "@/lib/trackConfig";
import AudioVisualizer from "./AudioVisualizer";

// The hero object: a physical-looking CD with radial grooves, a moving light
// reflection, a center label and hole. Clicking toggles shared playback.
export default function CDPlayer() {
  const { isPlaying, toggle, progress } = useAudio();
  const [reduced, setReduced] = useState(false);
  const [size, setSize] = useState(460);
  const wrapRef = useRef(null);

  // responsive CD sizing — keeps the disc + visualizer inside the viewport
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      setSize(vw < 480 ? 280 : vw < 768 ? 320 : vw < 1280 ? 400 : 460);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // subtle parallax tilt following the cursor
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reduced) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left - r.width / 2) / r.width;
      const py = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  const status = isPlaying ? "NOW PLAYING" : "READY TO PLAY";
  const vizSize = size + 60;
  const ringSize = size + 36;
  const ringR = size / 2 + 10;
  const circumference = 2 * Math.PI * ringR;

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative" style={{ width: vizSize, height: vizSize }}>
        <AudioVisualizer size={vizSize} />

        {/* progress ring — fills as the latest single plays */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            width: ringSize,
            height: ringSize,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%) rotate(-90deg)",
          }}
          viewBox={`0 0 ${ringSize} ${ringSize}`}
        >
          <circle cx={ringSize / 2} cy={ringSize / 2} r={ringR} fill="none" stroke="#1e1e1e" strokeWidth="2" />
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={ringR}
            fill="none"
            stroke="#BEFF00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - Math.min(Math.max(progress, 0), 1))}
            style={{ transition: "stroke-dashoffset 200ms linear" }}
          />
        </svg>

        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: size, height: size, transformStyle: "preserve-3d" }}
        >
          <div
            ref={wrapRef}
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: isPlaying && !reduced ? 360 : 0 }}
              transition={{ duration: 6, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, #1c1c1c 0%, #121212 38%, #0a0a0a 70%, #050505 100%)",
                boxShadow:
                  "0 30px 80px -20px rgba(0,0,0,0.9), inset 0 0 60px rgba(0,0,0,0.8), inset 0 2px 2px rgba(255,255,255,0.06)",
              }}
            >
              {/* radial grooves */}
              <div
                className="absolute inset-0 rounded-full opacity-60"
                style={{
                  background:
                    "repeating-radial-gradient(circle at 50% 50%, rgba(0,0,0,0.0) 0px, rgba(0,0,0,0.0) 1.5px, rgba(255,255,255,0.04) 1.6px, rgba(255,255,255,0.04) 3px)",
                  mixBlendMode: "screen",
                }}
              />
              {/* fine inner grooves */}
              <div
                className="absolute inset-[14%] rounded-full opacity-40"
                style={{
                  background:
                    "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 0.6px, rgba(0,0,0,0) 0.6px, rgba(0,0,0,0) 2px)",
                }}
              />
              {/* moving light reflection */}
              {!reduced && (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.10) 40deg, transparent 90deg, transparent 200deg, rgba(255,255,255,0.06) 240deg, transparent 300deg)",
                    mixBlendMode: "screen",
                  }}
                />
              )}
              {/* iridescent sheen */}
              <div
                className="absolute inset-0 rounded-full opacity-25"
                style={{
                  background:
                    "conic-gradient(from 90deg, rgba(190,255,0,0.0), rgba(0,200,255,0.18), rgba(190,255,0,0.0), rgba(255,0,200,0.14), rgba(190,255,0,0.0))",
                  mixBlendMode: "screen",
                }}
              />

              {/* center label */}
              <div
                className="absolute rounded-full flex flex-col items-center justify-center"
                style={{
                  inset: "34%",
                  background:
                    "radial-gradient(circle at 40% 35%, #1f1f1f, #0c0c0c)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 30px rgba(0,0,0,0.6)",
                }}
              >
                <span className="font-mono text-[10px] tracking-[0.35em] text-[#808080]">FIJZI</span>
                <span className="font-mono text-[7px] tracking-[0.3em] text-[#555] mt-1">SIDE A</span>
              </div>

              {/* center hole */}
              <div
                className="absolute rounded-full bg-[#050505]"
                style={{
                  inset: "47%",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 6px rgba(0,0,0,0.9)",
                }}
              />
            </motion.div>

            {/* play / pause control — sits above the spinning disc */}
            <button
              type="button"
              onClick={toggle}
              aria-label={isPlaying ? "Pause latest single" : "Play latest single"}
              aria-pressed={isPlaying}
              className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#070707]/70 backdrop-blur-sm ring-1 ring-[#2a2a2a] transition-all duration-300 hover:ring-[#BEFF00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BEFF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707]"
            >
              <span
                className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ boxShadow: "0 0 40px 4px rgba(190,255,0,0.25)" }}
              />
              {isPlaying ? (
                <Pause size={22} color="#BEFF00" fill="#BEFF00" className="relative z-10" />
              ) : (
                <Play size={22} color="#F4F4F1" fill="#F4F4F1" className="relative z-10 translate-x-[1px]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* status + track metadata */}
      <div className="mt-8 flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full transition-colors duration-300"
            style={{ background: isPlaying ? "#BEFF00" : "#3a3a3a" }}
          />
          <span className={isPlaying ? "text-[#BEFF00]" : "text-[#808080]"}>{status}</span>
        </div>
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#555]">{TRACK.label}</div>
        <div className="font-mono text-[13px] tracking-[0.15em] text-[#F4F4F1]">{TRACK.title}</div>
      </div>
    </div>
  );
}