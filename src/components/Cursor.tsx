"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const snapshot = () => window.matchMedia(QUERY).matches;

/** Cursor customizado, só com mouse: ponto dourado que cresce nos links e vira "VER" sobre as imagens ([data-cursor]).
 *  Só é renderizado com ponteiro preciso (nada vai para o HTML, então o leitor de tela e o celular nunca veem o rótulo "Ver"). */
export default function Cursor() {
  const enabled = useSyncExternalStore(subscribe, snapshot, () => false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0;
    const loop = () => {
      x += (tx - x) * 0.22; y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      el.classList.add("on");
      const t = e.target as HTMLElement | null;
      const link = !!t?.closest?.("a, button, label, [role='button'], summary, input");
      const ver = !link && !!t?.closest?.("[data-cursor]");
      el.classList.toggle("ver", ver);
      el.classList.toggle("link", link);
    };
    const out = () => el.classList.remove("on");
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", out);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", out);
      root.classList.remove("has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ref} className="cursor" aria-hidden="true"><span aria-hidden="true">Ver</span></div>;
}
