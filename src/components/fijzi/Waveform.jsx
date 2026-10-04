import React, { useMemo } from "react";

// Deterministic pseudo-random bar heights so each track keeps its own shape
// without storing any data.
function seededBars(seed, count) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const bars = [];
  let x = h >>> 0;
  for (let i = 0; i < count; i++) {
    x = (Math.imul(x, 1103515245) + 12345) >>> 0;
    const base = (x % 1000) / 1000;
    const env = Math.sin((i / count) * Math.PI);
    bars.push(0.18 + Math.abs(base) * 0.82 * (0.5 + 0.5 * env));
  }
  return bars;
}

// Static waveform that lights up to the playback position of the active track.
export default function Waveform({ seed, count = 48, progress = 0, active = false }) {
  const bars = useMemo(() => seededBars(seed, count), [seed, count]);
  const played = Math.floor(Math.min(Math.max(progress, 0), 1) * count);

  return (
    <div className="flex h-full w-full items-center gap-[2px]" aria-hidden="true">
      {bars.map((v, i) => {
        const isPlayed = active && i < played;
        return (
          <span
            key={i}
            className="flex-1 rounded-full transition-colors duration-200"
            style={{
              height: `${Math.round(v * 100)}%`,
              minHeight: 2,
              background: isPlayed ? "#BEFF00" : active ? "#5a5a5a" : "#3a3a3a",
            }}
          />
        );
      })}
    </div>
  );
}