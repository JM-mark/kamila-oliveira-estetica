"use client";

import { useEffect, useMemo, useState } from "react";
import { AGENDA_SERVICES } from "@/content/services";
import { AGENDA_DIAS_FECHADOS, AGENDA_HORARIOS, ENDERECO, ENDERECO_CONFIRMADO, HORARIO, HORARIO_CONFIRMADO, SITE } from "@/content/site";
import { track } from "@/lib/track";
import { waLink } from "@/lib/wa";

const PERIODOS = ["Manhã", "Tarde", "Sem preferência"] as const;
const ETAPAS = ["Serviço", "Data e horário", "Seus dados", "Resumo"];
const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];
const DIAS_EXT = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const chave = (slug: string, item: string) => `${slug}|${item}`;

function fmtData(isoStr: string): string {
  const [y, m, d] = isoStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return `${DIAS_EXT[dt.getDay()]}, ${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

export default function Stepper() {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<string[]>([]);
  const [aberto, setAberto] = useState<string>("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState<{ y: number; m: number } | null>(null);
  const [periodo, setPeriodo] = useState<string>("Sem preferência");
  const [hora, setHora] = useState("");
  const [nome, setNome] = useState("");
  const [obs, setObs] = useState("");
  const [erro, setErro] = useState("");

  // Pré-seleção vinda dos botões "Agendar este serviço" (?servico=slug).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("servico");
    const t = setTimeout(() => {
      const s = AGENDA_SERVICES.find((x) => x.slug === q);
      if (s) {
        setAberto(s.slug);
        if (s.items.length === 1) setSel([chave(s.slug, s.items[0])]);
      } else setAberto(AGENDA_SERVICES[0].slug);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  // A etapa fica na URL (?etapa=n), como nos outros projetos.
  useEffect(() => {
    try {
      const u = new URL(window.location.href);
      u.searchParams.set("etapa", String(step + 1));
      window.history.replaceState(null, "", u.toString());
    } catch { /* sem histórico: segue sem registrar a etapa */ }
  }, [step]);

  const escolhidos = useMemo(
    () => sel.map((k) => { const [slug, item] = k.split("|"); return { slug, item, titulo: AGENDA_SERVICES.find((s) => s.slug === slug)?.title ?? "" }; }),
    [sel],
  );

  const mensagem = useMemo(() => {
    const lista = escolhidos.map((e) => `- ${e.titulo}: ${e.item}`).join("\n");
    const quando = dia ? fmtData(dia) : "sem dia definido";
    const quandoHora = hora ? `${quando}, às ${hora}` : `${quando}, período: ${periodo.toLowerCase()}`;
    return [
      `Olá! Meu nome é ${nome.trim() || "(nome)"}.`,
      "Quero agendar:",
      lista,
      `Prefiro: ${quandoHora}.`,
      obs.trim() ? `Observação: ${obs.trim()}` : "",
      "Pode me confirmar o horário?",
    ].filter(Boolean).join("\n");
  }, [escolhidos, dia, hora, periodo, nome, obs]);

  function alternar(slug: string, item: string) {
    const k = chave(slug, item);
    setSel((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
    setErro("");
  }

  function irPara(n: number) {
    if (n === 1 && !mes) { const h = new Date(); setMes({ y: h.getFullYear(), m: h.getMonth() }); }
    setStep(n);
    document.getElementById("ag-topo")?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function avancar() {
    setErro("");
    if (step === 0 && sel.length === 0) return setErro("Escolha pelo menos um serviço para continuar.");
    if (step === 2 && nome.trim().length < 2) return setErro("Digite seu nome para continuar.");
    irPara(step + 1);
  }

  const hoje = new Date();
  const hojeIso = iso(hoje);
  const grade = useMemo(() => {
    if (!mes) return [] as (number | null)[];
    const primeiro = new Date(mes.y, mes.m, 1).getDay();
    const total = new Date(mes.y, mes.m + 1, 0).getDate();
    return [...Array<null>(primeiro).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  }, [mes]);
  const limite = new Date(hoje.getFullYear(), hoje.getMonth() + 3, 1);
  const noMesAtual = !!mes && mes.y === hoje.getFullYear() && mes.m === hoje.getMonth();
  const noLimite = !!mes && mes.y === limite.getFullYear() && mes.m === limite.getMonth();
  const navMes = (d: number) => { if (mes) { const n = new Date(mes.y, mes.m + d, 1); setMes({ y: n.getFullYear(), m: n.getMonth() }); } };

  return (
    <div className="ag-layout" id="ag-topo">
      <div className="stepper">
        <ol className="ag-etapas" aria-label="Etapas">
          {ETAPAS.map((e, i) => (
            <li key={e} className={i === step ? "now" : i < step ? "done" : ""} aria-current={i === step ? "step" : undefined}>
              <span>{String(i + 1).padStart(2, "0")}</span> {e}
            </li>
          ))}
        </ol>
        <div className="progress" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (<i key={i} className={i <= step ? "on" : ""} />))}
        </div>
        <p className="hint" aria-live="polite">Etapa {step + 1} de 4: {ETAPAS[step]}</p>

        {step === 0 && (
          <div>
            <h2>Qual serviço você quer?</h2>
            <p className="hint">Você pode escolher mais de um. A Kamila confirma o horário pelo WhatsApp.</p>
            <div className="ag-grupos">
              {AGENDA_SERVICES.map((s, gi) => {
                const marcados = sel.filter((k) => k.startsWith(s.slug + "|")).length;
                const open = aberto === s.slug;
                return (
                  <section key={s.slug} className={`ag-grupo${open ? " open" : ""}`}>
                    <button type="button" className="ag-grupo-h" aria-expanded={open} aria-controls={`g-${s.slug}`} onClick={() => setAberto(open ? "" : s.slug)}>
                      <span className="n">{String(gi + 1).padStart(2, "0")}</span>
                      <span className="t">{s.title}</span>
                      {marcados > 0 ? <span className="c">{marcados}</span> : null}
                      <span className="chev" aria-hidden="true" />
                    </button>
                    <div id={`g-${s.slug}`} className="ag-grupo-b" hidden={!open}>
                      <div className="opts">
                        {s.items.map((i) => (
                          <label key={i} className="opt">
                            <input type="checkbox" checked={sel.includes(chave(s.slug, i))} onChange={() => alternar(s.slug, i)} />
                            {i}
                          </label>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && mes && (
          <div>
            <h2>Quando fica bom?</h2>
            <p className="hint">Escolha o dia e {AGENDA_HORARIOS.length ? "um horário" : "o período"}. Se preferir, só o período.</p>
            <div className="cal">
              <div className="cal-h">
                <button type="button" className="cal-nav" aria-label="Mês anterior" disabled={noMesAtual} onClick={() => navMes(-1)}>←</button>
                <strong>{MESES[mes.m]} {mes.y}</strong>
                <button type="button" className="cal-nav" aria-label="Próximo mês" disabled={noLimite} onClick={() => navMes(1)}>→</button>
              </div>
              <div className="cal-g">
                {SEMANA.map((d, i) => (<span key={i} className="cal-w" aria-hidden="true">{d}</span>))}
                {grade.map((n, i) => {
                  if (n === null) return <span key={`v${i}`} />;
                  const data = new Date(mes.y, mes.m, n);
                  const v = iso(data);
                  const off = v < hojeIso || AGENDA_DIAS_FECHADOS.includes(data.getDay());
                  return (
                    <button key={v} type="button" className={`cal-d${dia === v ? " sel" : ""}${v === hojeIso ? " hoje" : ""}`} disabled={off}
                      aria-pressed={dia === v} aria-label={fmtData(v)} onClick={() => { setDia(v); setErro(""); }}>{n}</button>
                  );
                })}
              </div>
              {AGENDA_DIAS_FECHADOS.length ? <p className="hint">Fechado: {AGENDA_DIAS_FECHADOS.map((d) => DIAS_EXT[d]).join(", ")}.</p> : null}
            </div>

            {AGENDA_HORARIOS.length ? (
              <fieldset className="ag-fs">
                <legend className="lab">Horário</legend>
                <div className="chips">
                  {AGENDA_HORARIOS.map((h) => (
                    <button key={h} type="button" className={`chip${hora === h ? " sel" : ""}`} aria-pressed={hora === h} onClick={() => setHora(hora === h ? "" : h)}>{h}</button>
                  ))}
                </div>
              </fieldset>
            ) : null}
            <fieldset className="ag-fs">
              <legend className="lab">Período</legend>
              <div className="chips">
                {PERIODOS.map((p) => (
                  <button key={p} type="button" className={`chip${periodo === p ? " sel" : ""}`} aria-pressed={periodo === p} onClick={() => setPeriodo(p)}>{p}</button>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>Como podemos te chamar?</h2>
            <div className="field">
              <label htmlFor="nome">Seu nome</label>
              <input id="nome" type="text" autoComplete="given-name" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="obs">Quer avisar algo? (opcional)</label>
              <textarea id="obs" rows={3} maxLength={240} value={obs} onChange={(e) => setObs(e.target.value)} />
              <span className="hint">Não escreva dados de saúde. O que você digitar vai só na mensagem do WhatsApp que você enviar; o site não guarda nada.</span>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2>Seu pedido está pronto</h2>
            <dl className="ag-res">
              <div><dt>Serviços</dt><dd>{escolhidos.map((e) => `${e.titulo}: ${e.item}`).join(" · ")}</dd></div>
              <div><dt>Dia</dt><dd>{dia ? fmtData(dia) : "Sem dia definido"}</dd></div>
              <div><dt>{hora ? "Horário" : "Período"}</dt><dd>{hora || periodo}</dd></div>
              <div><dt>Nome</dt><dd>{nome.trim()}</dd></div>
            </dl>
            <div className="btn-row" style={{ marginTop: 22 }}>
              <a className="btn" href={waLink(mensagem)} target="_blank" rel="noopener noreferrer"
                onClick={() => track("clique_whatsapp", { origem: "agendar_pedido", servicos: String(escolhidos.length) })}>
                Enviar pelo WhatsApp
              </a>
              {SITE.agendaEnabled && (
                <a className="btn ghost" href={SITE.agendaUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("clique_agenda", { origem: "agendar_resumo" })}>
                  Ver agenda online
                </a>
              )}
            </div>
            <p className="hint" style={{ marginTop: 14 }}>Ao enviar, o WhatsApp abre com a mensagem pronta. O horário só vale depois da confirmação da Kamila.</p>
          </div>
        )}

        {erro && <p className="error" role="alert">{erro}</p>}

        <div className="btn-row">
          {step > 0 && (<button type="button" className="btn ghost" onClick={() => { setErro(""); irPara(step - 1); }}>Voltar</button>)}
          {step < 3 && (<button type="button" className="btn" onClick={avancar}>{step === 2 ? "Ver meu pedido" : "Continuar"}</button>)}
        </div>
      </div>

      <aside className="ag-side" aria-label="Seu pedido">
        <h3>Seu pedido</h3>
        <dl>
          <div><dt>Serviço</dt><dd>{escolhidos.length ? escolhidos.map((e) => e.item).join(", ") : "A escolher"}</dd></div>
          <div><dt>Data</dt><dd>{dia ? fmtData(dia) : "A escolher"}</dd></div>
          <div><dt>{hora ? "Horário" : "Período"}</dt><dd>{step >= 1 ? hora || periodo : "A escolher"}</dd></div>
        </dl>
        <p className="hint">A Kamila confirma o horário pelo WhatsApp.</p>
        {ENDERECO_CONFIRMADO && ENDERECO ? (<div className="ag-info"><span>Onde</span><p>{ENDERECO}. {SITE.neighborhood}, {SITE.city}-{SITE.region}.</p></div>) : null}
        {HORARIO_CONFIRMADO && HORARIO ? (<div className="ag-info"><span>Horário</span><p>{HORARIO}</p></div>) : null}
      </aside>
    </div>
  );
}
