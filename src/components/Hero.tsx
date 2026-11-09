"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SITE } from "@/content/site";
import WaButton from "./WaButton";

/** Hero com fundo aurora em dourado, champanhe e preto. Sem efeito preso à rolagem. No desktop o brilho reage de leve ao cursor.
 *  Fundo provisório em CSS; o shader Aurora (WebGL) entra quando o Jeff colar o prompt do Profitize. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
      el.style.setProperty("--my", String(((e.clientY - r.top) / r.height - 0.5) * 2));
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);

  return (
    <section className="hero-aurora" ref={ref} aria-label="Apresentação">
      <div className="aurora-wrap" aria-hidden="true"><div className="aurora" /></div>
      <div className="content">
        <p className="eyebrow">Estética facial e corporal · {SITE.neighborhood}, {SITE.area}</p>
        <h1>Luxo é se sentir bem todos os dias.</h1>
        <p className="sub">Depilação a laser, limpeza de pele e estética corporal na Pampulha, BH.</p>
        <div className="btn-row">
          <WaButton origem="home_hero" label="Agendar" />
          <Link className="btn ghost" href="/#servicos">Ver serviços</Link>
        </div>
      </div>
    </section>
  );
}
