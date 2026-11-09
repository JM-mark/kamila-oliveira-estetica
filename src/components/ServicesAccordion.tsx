"use client";

import Link from "next/link";
import { useState } from "react";
import { SERVICES } from "@/content/services";
import { track } from "@/lib/track";
import Photo from "./Photo";

const PANELS = [
  { n: "01", title: "Depilação a laser", slug: "depilacao-a-laser", photo: "laser", items: SERVICES[0].items },
  { n: "02", title: "Limpeza de pele", slug: "limpeza-de-pele", photo: "pele", items: SERVICES[1].items },
  { n: "03", title: "Estética corporal", slug: "estetica-corporal", photo: "corpo", items: ["Lipo com as mãos", "Drenagem linfática corporal", "Esfoliação corporal"] },
  { n: "04", title: "Relaxamento", slug: "estetica-corporal", photo: "relaxamento", items: ["Massagem relaxante"] },
];

/** Acordeão de serviços com foto: o painel aberto mostra as áreas e o CTA. O laser abre por padrão. No celular vira lista empilhada. */
export default function ServicesAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="acc">
      {PANELS.map((p, i) => (
        <div key={p.n} className="acc-panel" data-open={open === i}>
          <Photo name={p.photo} className="acc-img" sizes="(min-width: 900px) 50vw, 100vw" />
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
            <Link className="btn" href={`/agendar/?servico=${p.slug}`} onClick={() => track("clique_agenda", { servico: p.slug })}>Agendar este serviço</Link>
            <Link className="link more" href={`/${p.slug}/`}>Ver detalhes</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
