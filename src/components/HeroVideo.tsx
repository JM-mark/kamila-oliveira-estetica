"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

/** Vídeo de atmosfera do hero (Pexels 3998272, cottonbro studio): óleo sobre as costas, luz quente, sem rosto. Fica no fundo do hero, sob a Aurora.
 *  275 KB, sem áudio. Só começa depois do carregamento, para durante a ausência na tela e não toca com movimento reduzido (fica o quadro de capa). */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let io: IntersectionObserver | undefined;
    const start = () => {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.2 });
      io.observe(v);
    };
    const t = setTimeout(() => {
      if (document.readyState === "complete") start();
      else window.addEventListener("load", start, { once: true });
    }, window.matchMedia("(max-width: 900px)").matches ? 4200 : 2200);
    return () => { clearTimeout(t); window.removeEventListener("load", start); io?.disconnect(); };
  }, []);
  return (
    <video ref={ref} className="hero-video" muted loop playsInline preload="none" poster={asset("/video/tratamento-poster.webp")} aria-hidden="true" tabIndex={-1}>
      <source src={asset("/video/tratamento.mp4")} type="video/mp4" />
    </video>
  );
}
