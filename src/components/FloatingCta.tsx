"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { track } from "@/lib/track";
import { waLink, WA_DEFAULT } from "@/lib/wa";

/** Barra fixa no celular (aparece depois que os botões do hero saem da tela) e botão redondo do WhatsApp no desktop. */
export default function FloatingCta() {
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const on = () => setShowBar(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <div aria-hidden={!showBar} className={`x-bottom-bar ${showBar ? "in" : ""}`}>
        <Link tabIndex={showBar ? 0 : -1} href="/agendar/" className="x-btn dark" onClick={() => track("clique_agenda", { origem: "barra_celular" })}><CalendarCheck size={18} aria-hidden="true" /> Agendar</Link>
        <a tabIndex={showBar ? 0 : -1} href={waLink(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" className="x-btn outline-dark" onClick={() => track("clique_whatsapp", { origem: "barra_celular" })}><MessageCircle size={18} aria-hidden="true" /> WhatsApp</a>
      </div>
      <a className="x-wa-round" href={waLink(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp" onClick={() => track("clique_whatsapp", { origem: "botao_redondo" })}>
        <MessageCircle size={24} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </>
  );
}
