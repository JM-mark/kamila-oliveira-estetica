"use client";

import Link from "next/link";
import { useState } from "react";
import { SERVICES } from "@/content/services";
import { track } from "@/lib/track";
import Photo from "./Photo";

const PANELS = [
  { n: "01", title: "Depilação a laser", slug: "depilacao-a-laser", agendar: "depilacao-a-laser", photo: "laser", alt: SERVICES[0].photoAlt, items: SERVICES[0].items },
  { n: "02", title: "Limpeza de pele", slug: "limpeza-de-pele", agendar: "limpeza-de-pele", photo: "pele", alt: SERVICES[1].photoAlt, items: SERVICES[1].items },
  { n: "03", title: "Estética corporal", slug: "estetica-corporal", agendar: "estetica-corporal", photo: "corpo", alt: SERVICES[2].photoAlt, items: ["Lipo com as mãos", "Drenagem linfática corporal", "Esfoliação corporal"] },
  { n: "04", title: "Relaxamento", slug: "estetica-corporal", agendar: "relaxamento", photo: "relaxamento", alt: "Mãos aplicando creme, imagem ilustrativa", items: ["Massagem relaxante"] },
];

/** Acordeão de serviços com foto: o painel aberto mostra as áreas e o CTA. O laser abre por padrão. No celular vira lista empilhada. */
export default function ServicesAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="acc">
      {PANELS.map((p, i) => (
        <div key={p.n} className="acc-panel" data-open={open === i} data-cursor="ver">
          <Photo name={p.photo} alt={p.alt} className="acc-img" sizes="(min-width: 900px) 34vw, 100vw" />
          <button
            className="acc-head"
            aria-expanded={open === i}
            aria-controls={`acc-${i}`}
            onClick={() => setOpen(i)}
            onMouseEnter={() => { if (window.matchMedia("(hover: hover)").matches) setOpen(i); }}
          >
            <span className="n">{p.n}</span>
            <span className="t">{p.title}</span>
          </button>
          <div className="acc-body" id={`acc-${i}`}>
            <ul>{p.items.map((it) => (<li key={it}>{it}</li>))}</ul>
            <Link className="btn" href={`/agendar/?servico=${p.agendar}`} onClick={() => track("clique_agenda", { servico: p.agendar })}>Agendar este serviço</Link>
            <Link className="link more" href={`/${p.slug}/`}>Ver detalhes</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
