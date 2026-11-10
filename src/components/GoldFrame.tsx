"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const MolduraCanvas = dynamic(() => import("./MolduraCanvas"), { ssr: false });

/** Moldura de ouro. Por padrão, borda dourada estática de 1 px (reduced motion, sem WebGL).
 *  Com `animated` (máx. 3 usos no site) entra o shader Moldura: luz com grão que corre pela borda; no desktop estica para o cursor, no celular percorre sozinha. */
export default function GoldFrame({ children, className = "", style, animated = false }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; animated?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [perto, setPerto] = useState(false);
  // O shader só é carregado quando a moldura está perto da tela (não pesa o carregamento inicial).
  useEffect(() => {
    const el = ref.current;
    if (!animated || !el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setPerto(true); io.disconnect(); } }, { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, [animated]);
  return (
    <div ref={ref} className={`frame ${animated ? "anim" : ""} ${className}`} style={style}>
      {children}
      {animated && perto ? <MolduraCanvas target={ref} /> : null}
    </div>
  );
}
