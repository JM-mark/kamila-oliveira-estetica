"use client";

import { useEffect, useRef } from "react";

/** Moldura de ouro. Por padrão, borda estática de 1 px. Com `animated` (máx. 3 usos no site), no desktop com mouse a luz corre pela borda e aponta para o cursor.
 *  Celular e movimento reduzido: sempre a borda estática, sem animação. */
export default function GoldFrame({ children, className = "", style, animated = false }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; animated?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !animated) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const a = (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI + 90;
      el.style.setProperty("--ang", `${a}deg`);
      el.classList.add("track");
    };
    const leave = () => { el.classList.remove("track"); el.style.removeProperty("--ang"); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, [animated]);
  return <div ref={ref} className={`frame ${animated ? "anim" : ""} ${className}`} style={style}>{children}</div>;
}
