"use client";

import { useEffect } from "react";

/** Marca que a primeira carga terminou. A partir daí, cada troca de página mostra a cortina. */
export function NavReady() {
  useEffect(() => {
    const t = setTimeout(() => document.documentElement.setAttribute("data-nav", "1"), 50);
    return () => clearTimeout(t);
  }, []);
  return null;
}

/** Transição entre páginas: a cortina preta cobre a tela e sobe, revelando a página nova.
 *  Não existe na primeira carga (o preloader cuida dela): só aparece depois que `data-nav` foi marcado. */
export default function PageCurtain() {
  if (typeof document === "undefined" || !document.documentElement.hasAttribute("data-nav")) return null;
  return <div className="curtain" aria-hidden="true" />;
}
