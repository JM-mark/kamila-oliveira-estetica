"use client";

import { useEffect } from "react";

/** Rolagem suave (Lenis), como no OS Clínica. Carrega depois do primeiro paint para não pesar no LCP e fica desligada com "reduzir movimento". */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let cancelled = false;
    const start = () => {
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        const l = new Lenis({ duration: 1.1, smoothWheel: true });
        lenis = l;
        (window as Window & { __lenis?: unknown }).__lenis = l;
        const loop = (t: number) => { l.raf(t); raf = requestAnimationFrame(loop); };
        raf = requestAnimationFrame(loop);
      });
    };
    const t = setTimeout(start, 1200);
    return () => { cancelled = true; clearTimeout(t); cancelAnimationFrame(raf); lenis?.destroy(); delete (window as Window & { __lenis?: unknown }).__lenis; };
  }, []);
  return null;
}
