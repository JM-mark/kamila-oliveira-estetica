"use client";

import { useEffect } from "react";

/** Botões magnéticos: o botão acompanha de leve o cursor (até 8 px). Só com mouse e sem "reduzir movimento". */
export default function Magnetic() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cur: HTMLElement | null = null;
    const reset = () => { if (cur) { cur.style.transform = ""; cur = null; } };
    const move = (e: PointerEvent) => {
      const b = (e.target as HTMLElement | null)?.closest?.(".btn:not(.no-mag)") as HTMLElement | null;
      if (b !== cur) reset();
      if (!b) return;
      cur = b;
      const r = b.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      b.style.transform = `translate3d(${(dx * 16).toFixed(1)}px, ${(dy * 12).toFixed(1)}px, 0)`;
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", reset);
    return () => { document.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", reset); reset(); };
  }, []);
  return null;
}
