"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SITE } from "@/content/site";
import { asset } from "@/lib/asset";
import WaButton from "./WaButton";

type ConnWindow = Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };

/** Hero com vídeo de atmosfera que se expande ao rolar (desktop). No celular já nasce em tela cheia. Os CTAs ficam sempre visíveis.
 *  Sem JS, com movimento reduzido, economia de dados ou conexão lenta, fica só o poster. */
export default function HeroExpand() {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

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
      el.style.setProperty("--p", (total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1).toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", update);

    // vídeo: só toca quando é seguro (movimento normal, sem economia de dados, sem 2G)
    const c = (navigator as ConnWindow).connection;
    const slow = !!c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ""));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const v = video.current;
    if (v && !slow && !reduced) v.play().catch(() => { /* iPhone em economia de energia: fica o poster */ });

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
            <video ref={video} muted loop playsInline preload="none" poster={asset(SITE.heroPoster)} disablePictureInPicture>
              <source src={asset(SITE.heroVideo)} type="video/mp4" />
            </video>
          ) : null}
        </div>
        <div className="hx-content">
          <p className="eyebrow">Estética facial e corporal · {SITE.neighborhood}, {SITE.area}</p>
          <h1>Luxo é se sentir bem todos os dias.</h1>
          <p className="sub">Depilação a laser, limpeza de pele e estética corporal na Pampulha, BH.</p>
          <div className="btn-row">
            <WaButton origem="home_hero" label="Agendar" />
            <Link className="btn ghost" href="/#servicos">Ver serviços</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
