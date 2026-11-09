"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SITE } from "@/content/site";
import { asset } from "@/lib/asset";
import TextRotate from "./TextRotate";
import WaButton from "./WaButton";

/** Hero que se expande ao rolar (desktop). No celular e com movimento reduzido já nasce em tela cheia. Os CTAs ficam sempre visíveis. */
export default function HeroExpand() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!mq.matches) { el.style.removeProperty("--p"); return; }
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", update);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", update);
    };
  }, []);

  return (
    <section className="hx" ref={ref} aria-label="Apresentação">
      <div className="hx-sticky">
        <div className="hx-media" aria-hidden="true">
          {SITE.heroVideo ? (
            <video autoPlay muted loop playsInline preload="metadata" poster={SITE.heroPoster ? asset(SITE.heroPoster) : undefined}>
              <source src={asset(SITE.heroVideo)} type="video/mp4" />
            </video>
          ) : null}
        </div>
        <div className="hx-content">
          <p className="eyebrow">Estética facial e corporal · {SITE.neighborhood}, {SITE.area}</p>
          <h1>Luxo é se sentir bem todos os dias.</h1>
          <p className="sub">Depilação a laser, limpeza de pele e estética corporal na Pampulha, BH.<br /><TextRotate words={["laser", "pele", "corpo", "bem-estar"]} /></p>
          <div className="btn-row">
            <WaButton origem="home_hero" label="Agendar" />
            <Link className="btn ghost" href="/#servicos">Ver serviços</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
