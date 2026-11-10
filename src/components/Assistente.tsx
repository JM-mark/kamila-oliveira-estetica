"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { BOAS_VINDAS, CHIPS, porId, responder, SEM_RESPOSTA, type Link as L, type Resposta } from "@/content/assistente";
import { track } from "@/lib/track";
import { waLink } from "@/lib/wa";

type Msg = { de: "bot" | "eu"; texto: string; links?: L[]; pergunta?: string };

/** Assistente automático do site: responde só com o que está confirmado no site (ver src/content/assistente.ts) e passa o resto para o WhatsApp da Kamila.
 *  Roda no navegador; o que a pessoa digita não é enviado nem guardado. */
export default function Assistente({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const [msgs, setMsgs] = useState<Msg[]>([{ de: "bot", texto: BOAS_VINDAS.texto }]);
  const [txt, setTxt] = useState("");
  const fim = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => campo.current?.focus(), 250);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => { clearTimeout(t); window.removeEventListener("keydown", esc); };
  }, [open, onClose]);

  useEffect(() => { fim.current?.scrollIntoView({ block: "end" }); }, [msgs, open]);

  const resposta = (r: Resposta, pergunta?: string): Msg => ({ de: "bot", texto: r.texto, links: r.links as L[] | undefined, pergunta });
  const perguntar = (pergunta: string, intentId?: string) => {
    const q = pergunta.trim();
    if (!q) return;
    const r = (intentId ? porId(intentId) : responder(q)) ?? null;
    track("assistente_pergunta", { intent: r ? r.id : "sem-resposta" });
    setMsgs((m) => [...m, { de: "eu", texto: q }, r ? resposta(r, q) : { ...resposta(SEM_RESPOSTA, q), links: [{ label: "Enviar minha pergunta no WhatsApp", href: "WHATSAPP", externo: true }] }]);
    setTxt("");
  };

  const href = (l: L, pergunta?: string) => (l.href === "WHATSAPP" ? waLink(pergunta ? `Olá! Vim pelo site e tenho uma pergunta: ${pergunta}` : "Olá! Vim pelo site e gostaria de falar com a Kamila.") : l.href);

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          role="dialog" aria-label="Assistente da Kamila Oliveira" className="x-chat"
          initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className="x-chat-h">
            <div>
              <p className="x-chat-t">Assistente da Kamila</p>
              <p className="x-chat-s">Resposta automática, com base nas informações do site</p>
            </div>
            <button type="button" onClick={onClose} aria-label="Fechar assistente" className="x-chat-x"><X size={18} aria-hidden="true" /></button>
          </header>

          <div className="x-chat-log" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`x-msg ${m.de}`}>
                <p>{m.texto}</p>
                {m.links?.length ? (
                  <div className="x-msg-links">
                    {m.links.map((l) => {
                      const h = href(l, m.pergunta);
                      return l.externo || l.href === "WHATSAPP"
                        ? <a key={l.label} href={h} target="_blank" rel="noopener noreferrer">{l.label}</a>
                        : <Link key={l.label} href={h} onClick={onClose}>{l.label}</Link>;
                    })}
                  </div>
                ) : null}
              </div>
            ))}
            <div ref={fim} />
          </div>

          <div className="x-chat-chips">
            {CHIPS.map((c) => (<button key={c.id} type="button" onClick={() => perguntar(c.label, c.id)}>{c.label}</button>))}
          </div>

          <form className="x-chat-form" onSubmit={(e) => { e.preventDefault(); perguntar(txt); }}>
            <label htmlFor="x-chat-in" className="sr-only">Escreva sua pergunta</label>
            <input id="x-chat-in" ref={campo} value={txt} onChange={(e) => setTxt(e.target.value)} maxLength={200} placeholder="Escreva sua pergunta" autoComplete="off" />
            <button type="submit" aria-label="Enviar pergunta"><Send size={18} aria-hidden="true" /></button>
          </form>
          <p className="x-chat-f">Prefere falar com a Kamila? <a href={waLink("Olá! Vim pelo site e gostaria de falar com a Kamila.")} target="_blank" rel="noopener noreferrer" onClick={() => track("clique_whatsapp", { origem: "assistente" })}><MessageCircle size={14} aria-hidden="true" /> WhatsApp</a></p>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
