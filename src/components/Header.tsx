"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Plus, X } from "lucide-react";
import { ENDERECO, ENDERECO_CONFIRMADO, HORARIO, HORARIO_CONFIRMADO, NAV, SITE } from "@/content/site";
import { waLink, WA_DEFAULT } from "@/lib/wa";
import Logo from "./Logo";
import { Roll } from "./motion/primitives";

/** Cabeçalho do OS Clínica adaptado à Kamila: pílulas de vidro sobre o hero, barra clara depois dele e menu em tela cheia que desce em cortina. */
export default function Header() {
  const [past, setPast] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const path = usePathname();
  const home = path === "/";

  useEffect(() => {
    const on = () => setPast(window.scrollY > window.innerHeight * 0.7);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [open]);

  // Só a Home tem hero escuro: ali a barra é de vidro; nas outras páginas e depois do hero, é clara.
  const onField = home && !past && !open;

  return (
    <>
      <header className={`x-header ${onField ? "on-field" : "solid"}`}>
        <div className="x-wrap x-bar">
          <Link href="/" aria-label="Kamila Oliveira Estética, página inicial" onClick={() => setOpen(false)}>
            <Logo variant="horizontal" tone={onField ? "escuro" : "claro"} height={44} />
          </Link>
          <div className="x-bar-actions">
            <button type="button" className={`x-pill ${onField ? "glass" : "ink"}`} aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen(true)}>
              <Plus size={16} strokeWidth={1.75} aria-hidden="true" /> <Roll>Menu</Roll>
            </button>
            <Link href="/agendar/" className={`x-pill ${onField ? "solid" : "gold"} x-hide-sm`}><Roll>Agendar</Roll></Link>
            <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp" className={`x-pill ${onField ? "solid" : "ink"} x-round x-show-sm`}>
              <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="Menu" className="x-menu"
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? undefined : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="x-wrap x-bar">
              <Logo variant="horizontal" tone="escuro" height={44} />
              <button type="button" className="x-pill glass" aria-label="Fechar menu" onClick={() => setOpen(false)}>
                <X size={16} strokeWidth={1.75} aria-hidden="true" /> <Roll>Fechar</Roll>
              </button>
            </div>
            <div className="x-wrap x-menu-grid">
              <nav aria-label="Principal">
                <ol>
                  {NAV.map((n, i) => (
                    <li key={n.href}>
                      <Link href={n.href} onClick={() => setOpen(false)} className="x-menu-link">
                        <span className="num">0{i + 1}</span>
                        <span className="t">{n.label}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="x-menu-side">
                <Link href="/agendar/" onClick={() => setOpen(false)} className="x-btn light wide"><Roll>Agendar horário</Roll></Link>
                <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" className="x-btn outline-light wide"><Roll>Falar no WhatsApp</Roll></a>
                {ENDERECO_CONFIRMADO && ENDERECO ? (<><p className="x-eyebrow gold">Endereço</p><p>{ENDERECO}<br />{SITE.neighborhood}, {SITE.city}-{SITE.region}</p></>) : null}
                {HORARIO_CONFIRMADO && HORARIO ? (<><p className="x-eyebrow gold">Horário</p><p>{HORARIO}</p></>) : null}
                <p className="x-eyebrow gold">Instagram</p>
                <p><a href={SITE.instagram} target="_blank" rel="noopener noreferrer">{SITE.instagramHandle}</a></p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
