"use client";

import { useEffect, useRef } from "react";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  style?: React.CSSProperties;
  /** atraso extra em ms */
  delay?: number;
  /** o hero espera o preloader terminar */
  hero?: boolean;
};

/** Título em que as linhas sobem por máscara UMA vez, ao entrar na tela. Não acompanha a rolagem: dispara uma vez e pronto.
 *  Se o título já ficou para trás (rolagem rápida, link de âncora), aparece direto. Sem JS ou com movimento reduzido, já vem pronto. */
export default function SplitText({ text, as = "h2", className = "", style, delay = 0, hero = false }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("armed");
    const wait = hero && document.documentElement.getAttribute("data-intro") === "1" ? 850 : 0;
    let done = false;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const fire = (instant: boolean) => {
      if (done) return;
      done = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (instant) el.classList.add("instant");
      timer = setTimeout(() => el.classList.add("in"), instant ? 0 : wait + delay);
    };
    const check = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0) fire(true); // já passou: mostra sem animar
      else if (r.top < window.innerHeight * 0.88) fire(false);
    };
    function onScroll() { if (!raf) raf = requestAnimationFrame(check); }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
    };
  }, [delay, hero]);

  const Tag = as;
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={`stx ${className}`} style={style} aria-label={text}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="sw" aria-hidden="true">
            <span className="swi" style={{ ["--i" as string]: i } as React.CSSProperties}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
