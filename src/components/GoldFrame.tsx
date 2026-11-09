"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

const MolduraCanvas = dynamic(() => import("./MolduraCanvas"), { ssr: false });

/** Moldura de ouro. Por padrão, borda dourada estática de 1 px (celular, reduced motion, sem WebGL).
 *  Com `animated` (máx. 3 usos no site), no desktop com mouse entra o shader Moldura: luz com grão que corre pela borda e estica para o cursor. */
export default function GoldFrame({ children, className = "", style, animated = false }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; animated?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className={`frame ${animated ? "anim" : ""} ${className}`} style={style}>
      {children}
      {animated ? <MolduraCanvas target={ref} /> : null}
    </div>
  );
}
