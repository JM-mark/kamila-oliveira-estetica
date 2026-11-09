"use client";

import { useEffect, useRef } from "react";

/** Grade cujos cards sobem em sequência (60 ms entre eles) UMA vez, ao entrar na tela. Não acompanha a rolagem. Sem JS ou com movimento reduzido já vem pronta. */
export default function StaggerGrid({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("armed");
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}
