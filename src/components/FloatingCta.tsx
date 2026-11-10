"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CalendarCheck, MessageCircle, MessagesSquare } from "lucide-react";
import { track } from "@/lib/track";
import { waLink, WA_DEFAULT } from "@/lib/wa";
import Assistente from "./Assistente";

/** Barra fixa no celular (aparece depois do hero) e botão redondo no desktop. O botão redondo abre o assistente; o WhatsApp fica dentro dele e na barra. */
export default function FloatingCta() {
  const [showBar, setShowBar] = useState(false);
  const [chat, setChat] = useState(false);
  const fechar = useCallback(() => setChat(false), []);
  useEffect(() => {
    const on = () => setShowBar(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const abrir = (origem: string) => { setChat((v) => !v); track("assistente_abrir", { origem }); };
  return (
    <>
      <Assistente open={chat} onClose={fechar} />
      <div aria-hidden={!showBar} className={`x-bottom-bar ${showBar ? "in" : ""}`}>
        <Link tabIndex={showBar ? 0 : -1} href="/agendar/" className="x-btn dark" onClick={() => track("clique_agenda", { origem: "barra_celular" })}><CalendarCheck size={18} aria-hidden="true" /> Agendar</Link>
        <a tabIndex={showBar ? 0 : -1} href={waLink(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" className="x-btn outline-dark" onClick={() => track("clique_whatsapp", { origem: "barra_celular" })}><MessageCircle size={18} aria-hidden="true" /> WhatsApp</a>
        <button tabIndex={showBar ? 0 : -1} type="button" className="x-btn outline-dark x-sq" aria-label="Abrir assistente" aria-expanded={chat} onClick={() => abrir("barra_celular")}><MessagesSquare size={18} aria-hidden="true" /></button>
      </div>
      <button type="button" className="x-wa-round" aria-label={chat ? "Fechar assistente" : "Abrir assistente"} aria-expanded={chat} onClick={() => abrir("botao_redondo")}>
        <MessagesSquare size={24} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </>
  );
}
