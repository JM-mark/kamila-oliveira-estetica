"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SITE } from "@/content/site";
import { AuroraLazy } from "./ShaderLazy";
import HeroVideo from "./HeroVideo";
import Logo from "./Logo";
import AgendarButton from "./AgendarButton";
import { Roll, useRichMotion } from "./motion/primitives";

type W = { t: string; ac?: boolean };
const lines: W[][] = [
  [{ t: "Luxo" }, { t: "é" }, { t: "se" }],
  [{ t: "sentir", ac: true }, { t: "bem", ac: true }],
  [{ t: "todos" }, { t: "os" }, { t: "dias." }],
];

/** Anel de texto que gira devagar em volta da logo. */
function TextRing() {
  return (
    <svg viewBox="0 0 300 300" className="x-ring" aria-hidden="true">
      <defs><path id="x-ring-path" d="M150 150 m-122 0 a122 122 0 1 1 244 0 a122 122 0 1 1 -244 0" /></defs>
      <text fontSize="12.5" letterSpacing="4.4" fill="currentColor" style={{ fontFamily: "var(--font-label), serif" }}>
        <textPath href="#x-ring-path" textLength="755" lengthAdjust="spacing">ESTÉTICA FACIAL E CORPORAL · SANTA AMÉLIA · PAMPULHA ·</textPath>
      </text>
    </svg>
  );
}

/** Hero do OS Clínica com a identidade da Kamila: vídeo e Aurora ao fundo, título por palavra em máscara e, embaixo, o arco claro
 *  com a logo e o anel de texto, que cresce e gira com a rolagem (só desktop). */
export default function Hero() {
  const reduce = useReducedMotion();
  const rich = useRichMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, rich ? 1.35 : 1]);
  const spin = useTransform(scrollYProgress, [0, 1], [0, rich ? 180 : 0]);

  let n = 0;
  return (
    <section id="topo" ref={ref} className="x-hero" aria-label="Apresentação">
      <div className="x-hero-bg" aria-hidden="true">
        <HeroVideo />
        <div className="aurora-fx"><div className="aurora" /><AuroraLazy /></div>
      </div>
      <div className="x-hero-shade" aria-hidden="true" />

      <div className="x-wrap x-hero-in">
        <p className="x-eyebrow center on-dark x-in" style={{ ["--d" as string]: "0s" }}>
          Estética facial e corporal · {SITE.neighborhood}, {SITE.area}
        </p>

        <h1 className="x-h1">
          {lines.map((line, li) => (
            <span key={li} className="x-line" aria-hidden="true">
              {line.map((w) => {
                const i = n++;
                return (
                  <span key={i} className="x-mask">
                    <span className={`x-mask-in x-rise ${w.ac ? "ac" : ""}`} style={{ ["--d" as string]: `${0.1 + i * 0.07}s` }}>
                      {w.t}&nbsp;
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
          <span className="sr-only">Luxo é se sentir bem todos os dias.</span>
        </h1>

        <p className="x-lead on-dark center x-in" style={{ ["--d" as string]: "0.45s" }}>
          Depilação a laser, limpeza de pele e estética corporal, com agendamento pelo WhatsApp.
        </p>

        <div className="x-btn-row center x-in" style={{ ["--d" as string]: "0.6s" }}>
          <AgendarButton origem="home_hero" className="x-btn light" />
          <Link className="x-btn outline-light" href="/#servicos"><Roll>Ver serviços</Roll></Link>
        </div>
      </div>

      {/* arco claro com a logo e o anel de texto; cresce e gira ao rolar */}
      <motion.div style={{ y, scale, transformOrigin: "bottom center" }} className="x-arch-wrap">
        <div className="x-arch-box">
          <div className="x-arch">
            <div className="x-arch-in">
              <motion.div style={{ rotate: spin }} className="x-arch-ring"><TextRing /></motion.div>
              <div className="x-arch-logo"><Logo variant="lockup" tone="claro" height={150} /></div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
