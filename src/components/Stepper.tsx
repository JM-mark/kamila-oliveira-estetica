"use client";

import { useEffect, useMemo, useState } from "react";
import { SERVICES } from "@/content/services";
import { SITE } from "@/content/site";
import { track } from "@/lib/track";
import { waLink } from "@/lib/wa";

const PERIODOS = ["Manhã", "Tarde", "Sem preferência"] as const;

function hojeISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Aplica o dia mínimo quando o input aparece (ele só existe na etapa 3). */
function aplicaMin(el: HTMLInputElement | null) {
  if (el) el.min = hojeISO();
}

function fmtData(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default function Stepper() {
  const [step, setStep] = useState(0);
  const [slug, setSlug] = useState("");
  const [item, setItem] = useState("");
  const [dia, setDia] = useState("");
  const [periodo, setPeriodo] = useState<string>("Sem preferência");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("servico");
    const t = setTimeout(() => {
      if (q && SERVICES.some((x) => x.slug === q)) { setSlug(q); setStep(1); }
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const servico = SERVICES.find((s) => s.slug === slug);

  const mensagem = useMemo(() => {
    if (!servico) return "";
    const quando = dia ? `${fmtData(dia)}` : "sem dia definido";
    return [
      `Olá! Meu nome é ${nome.trim() || "(nome)"}.`,
      `Quero agendar: ${servico.title} - ${item}.`,
      `Prefiro: ${quando}, período: ${periodo.toLowerCase()}.`,
      "Pode me confirmar o horário?",
    ].join("\n");
  }, [servico, item, dia, periodo, nome]);

  function avancar() {
    setErro("");
    if (step === 0 && !slug) return setErro("Escolha um serviço para continuar.");
    if (step === 1 && !item) return setErro("Escolha uma opção para continuar.");
    if (step === 3 && nome.trim().length < 2) return setErro("Digite seu nome para continuar.");
    setStep(step + 1);
  }

  return (
    <div className="stepper">
      <div className="progress" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (<i key={i} className={i <= Math.min(step, 3) ? "on" : ""} />))}
      </div>
      <p className="hint" aria-live="polite">Etapa {Math.min(step + 1, 4)} de 4</p>

      {step === 0 && (
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="display" style={{ fontSize: 30, marginBottom: 6 }}>Qual serviço você procura?</legend>
          <div className="opts">
            {SERVICES.map((s) => (
              <label key={s.slug} className="opt">
                <input type="radio" name="servico" checked={slug === s.slug} onChange={() => { setSlug(s.slug); setItem(""); }} />
                {s.title}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && servico && (
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="display" style={{ fontSize: 30, marginBottom: 6 }}>{servico.title}: qual opção?</legend>
          <div className="opts">
            {servico.items.map((i) => (
              <label key={i} className="opt">
                <input type="radio" name="item" checked={item === i} onChange={() => setItem(i)} />
                {i}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <div>
          <h2 style={{ fontSize: 30, marginBottom: 6 }}>Quando você prefere?</h2>
          <div className="field">
            <label htmlFor="dia">Dia preferido (opcional)</label>
            <input id="dia" ref={aplicaMin} type="date" value={dia} onChange={(e) => setDia(e.target.value)} />
            <span className="hint">O horário final é confirmado pela clínica.</span>
          </div>
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontWeight: 600, fontSize: 15 }}>Período</legend>
            <div className="opts">
              {PERIODOS.map((p) => (
                <label key={p} className="opt">
                  <input type="radio" name="periodo" checked={periodo === p} onChange={() => setPeriodo(p)} />
                  {p}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 style={{ fontSize: 30, marginBottom: 6 }}>Como podemos te chamar?</h2>
          <div className="field">
            <label htmlFor="nome">Seu nome</label>
            <input id="nome" type="text" autoComplete="given-name" value={nome} onChange={(e) => setNome(e.target.value)} />
            <span className="hint">O nome vai apenas na mensagem do WhatsApp que você enviar. O site não guarda nada.</span>
          </div>
        </div>
      )}

      {step === 4 && servico && (
        <div>
          <h2 style={{ fontSize: 30, marginBottom: 12 }}>Seu pedido está pronto</h2>
          <pre style={{ whiteSpace: "pre-wrap", font: "inherit", background: "var(--creme)", border: "1px solid var(--line)", borderRadius: 16, padding: 18, margin: "0 0 18px" }}>{mensagem}</pre>
          <div className="btn-row" style={{ marginTop: 0 }}>
            <a className="btn" href={waLink(mensagem)} target="_blank" rel="noopener noreferrer"
               onClick={() => track("clique_whatsapp", { origem: "agendar_pedido", servico: servico.slug })}>
              Enviar pelo WhatsApp
            </a>
            {SITE.agendaEnabled && (
              <a className="btn ghost" href={SITE.agendaUrl} target="_blank" rel="noopener noreferrer"
                 onClick={() => track("clique_agenda", { servico: servico.slug })}>
                Ver agenda online
              </a>
            )}
          </div>
          <p className="hint" style={{ marginTop: 14 }}>Ao enviar, o WhatsApp abre com a mensagem pronta. O horário só vale depois da confirmação da clínica.</p>
        </div>
      )}

      {erro && <p className="error" role="alert">{erro}</p>}

      <div className="btn-row">
        {step > 0 && step <= 4 && (
          <button type="button" className="btn ghost" onClick={() => { setErro(""); setStep(step - 1); }}>Voltar</button>
        )}
        {step < 4 && (<button type="button" className="btn" onClick={avancar}>{step === 3 ? "Ver meu pedido" : "Continuar"}</button>)}
      </div>
    </div>
  );
}
