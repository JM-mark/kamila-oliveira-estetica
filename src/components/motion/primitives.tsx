"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useSyncExternalStore } from "react";

export const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** Sobe e aparece uma vez ao entrar na tela. */
export function Reveal({ children, delay = 0, className = "", y = 20 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

/** Uma linha de título: a caixa cortada é observada (e não o texto que está escondido dentro dela), senão ele nunca "entra na tela". */
function MaskLine({ children, delay, reduce }: { children: React.ReactNode; delay: number; reduce: boolean | null }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <span ref={ref} className="x-mask">
      <motion.span className="x-mask-in" initial={reduce ? false : { y: "112%" }} animate={{ y: inView || reduce ? "0%" : "112%" }} transition={{ duration: 0.9, delay, ease: EASE }}>
        {children}
      </motion.span>
    </span>
  );
}

/** Título em linhas com máscara: cada linha sobe de dentro de uma caixa cortada. */
export function MaskLines({ lines, className = "", as: Tag = "h2", delay = 0 }: { lines: React.ReactNode[]; className?: string; as?: "h1" | "h2" | "h3"; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <MaskLine key={i} delay={delay + i * 0.12} reduce={reduce}>{l}</MaskLine>
      ))}
    </Tag>
  );
}

export function SectionHead({ eyebrow, title, lead, center = false, tone = "light" }: { eyebrow: string; title: React.ReactNode[]; lead?: string; center?: boolean; tone?: "light" | "dark" }) {
  return (
    <div className={`x-head ${center ? "center" : ""} ${tone}`}>
      <Reveal><p className="x-eyebrow">{eyebrow}</p></Reveal>
      <MaskLines lines={title} className="x-h2" />
      {lead ? <Reveal delay={0.1}><p className="x-lead">{lead}</p></Reveal> : null}
    </div>
  );
}

/** Linha dourada que se desenha da esquerda para a direita. */
export function HairLine({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`x-wrap ${className}`} aria-hidden="true">
      <motion.div className="x-hair" initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.4, ease: EASE }} />
    </div>
  );
}

/** Rótulo com efeito "roll": o texto sobe e é trocado por uma cópia que vem de baixo. */
export function Roll({ children }: { children: string }) {
  return (
    <span className="x-roll" data-t={children}>
      <span>{children}</span>
    </span>
  );
}

const subscribe = (q: string) => (cb: () => void) => {
  const m = window.matchMedia(q);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const rm = "(prefers-reduced-motion: reduce)";
const wide = "(min-width: 1024px)";

/** true só em telas >= 1024 px e sem "reduzir movimento": liga as animações presas à rolagem (vitrine fixa, frase por palavra). */
export function useRichMotion(): boolean {
  return useSyncExternalStore(
    (cb) => { const a = subscribe(wide)(cb), b = subscribe(rm)(cb); return () => { a(); b(); }; },
    () => window.matchMedia(wide).matches && !window.matchMedia(rm).matches,
    () => false,
  );
}

/** "reduzir movimento" sem divergência de hidratação. */
export function useReduce(): boolean {
  return useSyncExternalStore(subscribe(rm), () => window.matchMedia(rm).matches, () => false);
}

/** true em aparelhos com mouse. */
export function useFinePointer(): boolean {
  return useSyncExternalStore(subscribe("(pointer: fine)"), () => window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia(rm).matches, () => false);
}
