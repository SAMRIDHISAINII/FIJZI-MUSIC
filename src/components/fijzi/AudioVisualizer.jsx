import React, { useEffect, useRef } from "react";
import { useAudio } from "@/lib/AudioContext";

const BAR_COUNT = 48;

// Circular visualizer drawn on a canvas around the CD. Nearly invisible at
// rest, it blooms into a reactive ring while the track plays. Because the audio
// comes from a cross-origin SoundCloud player it is animated rather than
// sampled — the motion is tuned to feel like a living waveform.
export default function AudioVisualizer({ size = 520 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const { isPlaying } = useAudio();
  const playingRef = useRef(isPlaying);
  const energyRef = useRef(0);

  useEffect(() => {
    playingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cx = size / 2;
    const cy = size / 2;
    const baseRadius = size / 2 - 8;
    const maxBar = size * 0.09;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      const playing = playingRef.current;
      t += reduced ? 0 : 0.02;

      energyRef.current += ((playing ? 1 : 0) - energyRef.current) * 0.07;
      const energy = energyRef.current;

      for (let i = 0; i < BAR_COUNT; i++) {
        const angle = (i / BAR_COUNT) * Math.PI * 2 - Math.PI / 2;
        const wave =
          0.5 + 0.5 * Math.sin(t * 2.4 + i * 0.6) * Math.sin(t * 1.1 + i * 0.22);
        const breathe = 0.5 + 0.5 * Math.sin(t * 0.8 + i * 0.35);
        const len = Math.max(1.5, maxBar * (wave * energy + breathe * (1 - energy) * 0.12));

        const r1 = baseRadius;
        const r2 = baseRadius + len;
        const x1 = cx + Math.cos(angle) * r1;
        const y1 = cy + Math.sin(angle) * r1;
        const x2 = cx + Math.cos(angle) * r2;
        const y2 = cy + Math.sin(angle) * r2;

        const intensity = Math.min(len / maxBar, 1);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.strokeStyle = `rgba(190, 255, 0, ${0.12 + energy * intensity * 0.85})`;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ width: size, height: size }}
    />
  );
}