"use client";

import { useEffect, useRef } from "react";
import Photo from "./Photo";

/** Zoom parallax: o centro é a foto real do espaço (só entra com aval da Kamila); em volta, atmosfera. Desktop; no celular vira colagem estática. */
export default function ZoomParallax({ center, around }: { center: React.ReactNode; around: string[] }) {
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
      el.style.setProperty("--p", (total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1).toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { if (raf) cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  const K = [2.2, 3.2, 4.2, 5.2, 6.2];
  const POS = [
    { left: "6%", top: "10%", w: "20vw", h: "26vh" },
    { left: "70%", top: "8%", w: "22vw", h: "30vh" },
    { left: "4%", top: "62%", w: "24vw", h: "28vh" },
    { left: "74%", top: "60%", w: "18vw", h: "30vh" },
    { left: "40%", top: "4%", w: "16vw", h: "20vh" },
  ];
  return (
    <section className="zp" ref={ref} aria-label="O espaço">
      <div className="zp-sticky">
        {around.slice(0, 5).map((n, i) => (
          <div key={n} className="zp-item" style={{ left: POS[i].left, top: POS[i].top, width: POS[i].w, height: POS[i].h, ["--k" as string]: K[i] }}>
            <Photo name={n} sizes="25vw" />
          </div>
        ))}
        <div className="zp-center">{center}</div>
      </div>
    </section>
  );
}
