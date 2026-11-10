"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

/** Vídeo de atmosfera do hero (Pexels 6629717, KoolShooters): mãos em massagem com óleo, luz quente de velas, sem rosto. Fica no fundo, sob a Aurora.
 *  Toca assim que a página abre (autoplay mudo); se o aparelho bloquear, tenta de novo no primeiro toque ou rolagem. Pausa fora da tela.
 *  Com "reduzir movimento" fica só o quadro de capa. */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { v.removeAttribute("autoplay"); return; }
    v.muted = true;
    const tentar = () => { v.play().catch(() => {}); };
    tentar();
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) tentar(); else v.pause(); }, { threshold: 0.2 });
    io.observe(v);
    const eventos = ["pointerdown", "touchstart", "scroll", "keydown"] as const;
    const uma = () => { tentar(); eventos.forEach((n) => window.removeEventListener(n, uma)); };
    eventos.forEach((n) => window.addEventListener(n, uma, { passive: true }));
    return () => { io.disconnect(); eventos.forEach((n) => window.removeEventListener(n, uma)); };
  }, []);
  return (
    <video ref={ref} className="hero-video" autoPlay muted loop playsInline preload="auto" poster={asset("/video/tratamento-poster.webp")} aria-hidden="true" tabIndex={-1}>
      <source src={asset("/video/tratamento.mp4")} type="video/mp4" />
    </video>
  );
}
