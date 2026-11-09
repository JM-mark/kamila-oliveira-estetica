"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Rolagem suave (Lenis) só no desktop com mouse. Desligada no celular, no iPhone e com movimento reduzido. */
export default function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    let raf = requestAnimationFrame(function loop(t) { lenis.raf(t); raf = requestAnimationFrame(loop); });
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return null;
}
