import React, { useEffect, useRef, useState } from "react";

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']";

// Custom cursor: an acid-green dot that tracks the pointer exactly with a
// slower ring trailing behind it. The ring swells over anything interactive.
// Only active on fine-pointer devices, and never for reduced-motion users.
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("fijzi-cursor");
    return () => document.documentElement.classList.remove("fijzi-cursor");
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      setVisible(true);
      const el = e.target;
      setHovering(Boolean(el && el.closest && el.closest(INTERACTIVE)));
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      <div ref={ringRef} className="fixed left-0 top-0 will-change-transform">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,opacity,border-color,background-color,transform] duration-300 ease-out ${
            visible ? "opacity-100" : "opacity-0"
          } ${
            hovering
              ? "h-12 w-12 border-[#BEFF00] bg-[#BEFF00]/10"
              : "h-8 w-8 border-[#4a4a4a] bg-transparent"
          } ${clicking ? "scale-90" : "scale-100"}`}
        />
      </div>
      <div ref={dotRef} className="fixed left-0 top-0 will-change-transform">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-[#BEFF00] transition-[width,height,opacity] duration-200 ease-out ${
            visible ? "opacity-100" : "opacity-0"
          } ${hovering ? "h-1.5 w-1.5" : "h-2 w-2"}`}
        />
      </div>
    </div>
  );
}