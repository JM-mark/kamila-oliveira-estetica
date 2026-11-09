"use client";

import { useEffect, useRef } from "react";

/** Moldura de ouro com luz que corre pela borda. No desktop, a luz aponta para o cursor; no celular e com movimento reduzido, borda estática. */
export default function GoldFrame({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
  }, []);
  return <div ref={ref} className={`frame ${className}`} style={style}>{children}</div>;
}
