"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarCheck, CreditCard, Hand, MapPin } from "lucide-react";
import { SERVICES } from "@/content/services";
import { FOTO_SOBRE } from "@/content/espaco";
import { HORARIO, HORARIO_CONFIRMADO } from "@/content/site";
import AgendarButton from "./AgendarButton";
import Photo from "./Photo";
import { EASE, MaskLines, Reveal, Roll, SectionHead, useRichMotion } from "./motion/primitives";

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ Trust */
const TRUST = [
  { Icon: Hand, t: "Protocolo autoral", d: "A Lipo com as mãos foi criada pela própria Kamila e é um protocolo manual voltado à redução de medidas." },
  // TODO a Kamila confirmar o parcelamento (visto em post do Instagram dela).
  { Icon: CreditCard, t: "Parcele em até 4x", d: "Você pode dividir o valor dos serviços em até 4x." },
  { Icon: CalendarCheck, t: "Hora marcada", d: "Você escolhe o serviço, o dia e o período, e a confirmação vem pelo WhatsApp." },
  { Icon: MapPin, t: "Fácil de chegar", d: "Esquina com a Avenida Guarapari, em Santa Amélia." },
];

export function Trust() {
  return (
    <section aria-label="Diferenciais" className="x-sec">
      <h2 className="sr-only">Bom saber antes de agendar</h2>
      <div className="x-wrap x-trust">
        {TRUST.map(({ Icon, t, d }, i) => (
          <Reveal key={t} delay={i * 0.08} className="x-trust-item">
            <span className="x-ico"><Icon size={30} strokeWidth={1.25} aria-hidden="true" /></span>
            <h3>{t}</h3>
            <p>{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Statement */
const STATEMENT = "Depilação a laser, limpeza de pele e estética corporal em Santa Amélia, com horário marcado e confirmação direta pelo WhatsApp.";
const ACCENT = new Set(["marcado", "confirmação", "WhatsApp."]);
const WORDS = STATEMENT.split(" ");

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const opacity = useTransform(p, [i / n, (i + 1) / n], [0.16, 1]);
  return <motion.span style={{ opacity }} className={`x-w ${ACCENT.has(w) ? "ac" : ""}`}>{w}&nbsp;</motion.span>;
}

export function Statement() {
  const rich = useRichMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  return (
    <section aria-label="Nossa proposta" className="x-sec x-statement">
      <div className="x-wrap">
        {rich ? (
          <p ref={ref} className="x-statement-p">{WORDS.map((w, i) => <Word key={i} w={w} i={i} n={WORDS.length} p={scrollYProgress} />)}</p>
        ) : (
          <Reveal><p className="x-statement-p small">Depilação a laser, limpeza de pele e estética corporal em Santa Amélia, com horário <em className="ac">marcado</em> e <em className="ac">confirmação</em> direta pelo <em className="ac">WhatsApp</em>.</p></Reveal>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------ Serviços (cartões) */
type Card = { id: string; slug: string; page: string; title: string; text: string; photo: string; alt: string };
const CARDS: Card[] = [
  { id: "laser", slug: "depilacao-a-laser", page: "/depilacao-a-laser/", title: "Depilação a laser", text: SERVICES[0].short, photo: "laser", alt: SERVICES[0].photoAlt },
  { id: "pele", slug: "limpeza-de-pele", page: "/limpeza-de-pele/", title: "Limpeza de pele", text: SERVICES[1].short, photo: "pele", alt: SERVICES[1].photoAlt },
  { id: "corpo", slug: "estetica-corporal", page: "/estetica-corporal/", title: "Estética corporal", text: "Lipo com as mãos, drenagem linfática corporal e esfoliação corporal.", photo: "corpo", alt: SERVICES[2].photoAlt },
  { id: "relax", slug: "relaxamento", page: "/estetica-corporal/", title: "Relaxamento", text: "Massagem relaxante, agendada pelo WhatsApp.", photo: "relaxamento", alt: "Ambiente de relaxamento com luz suave, imagem ilustrativa" },
];

export function ServiceCards() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  const go = (i: number) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    refs.current[i]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <section id="servicos" className="x-sec">
      <div className="x-wrap x-cards-grid">
        <div className="x-cards-side">
          <Reveal><p className="x-eyebrow">Serviços</p></Reveal>
          <MaskLines lines={["O que você", <>procura?</>]} className="x-h2" />
          <ul className="x-cards-list" aria-label="Serviços">
            {CARDS.map((c, i) => (
              <li key={c.id}>
                <button type="button" onClick={() => go(i)} aria-current={active === i} className={active === i ? "on" : ""}>
                  <span aria-hidden="true" className="dot" />{c.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="x-cards">
          {CARDS.map((c, i) => (
            <article key={c.id} ref={(el) => { refs.current[i] = el; }} data-i={i} className="x-card" data-cursor="ver">
              <motion.div className="x-card-img" animate={{ scale: active === i ? 1 : 1.05 }} transition={{ duration: 1, ease: EASE }}>
                <Photo name={c.photo} alt={c.alt} sizes="(min-width: 1024px) 50vw, 100vw" />
              </motion.div>
              <div className="x-card-txt">
                <p className="x-num">{pad(i + 1)} / {pad(CARDS.length)}</p>
                <h3>{c.title}</h3>
                <p className="x-card-p">{c.text}</p>
                <div className="x-btn-row">
                  <AgendarButton servico={c.slug} label="Agendar este serviço" origem={`home_card_${c.id}`} className="x-btn light" />
                  <Link href={c.page} className="x-link"><span className="u-link">Ver detalhes</span> <ArrowUpRight size={16} aria-hidden="true" /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------- Vitrine fixa (desktop) */
type Feature = { id: string; a: string; b: string; text: string; href: string };
const FEATURES: Feature[] = [
  { id: "laser", a: "Depilação", b: "a laser", text: SERVICES[0].short, href: "/depilacao-a-laser/" },
  { id: "pele", a: "Limpeza", b: "de pele", text: "Três níveis de limpeza (Bronze, Prata e Ouro), mais revitalização labial e drenagem facial.", href: "/limpeza-de-pele/" },
  { id: "lipo", a: "Lipo com", b: "as mãos", text: "Protocolo manual criado pela própria Kamila, voltado à redução de medidas.", href: "/estetica-corporal/" },
  { id: "dren", a: "Drenagem", b: "linfática", text: "Drenagem linfática corporal e drenagem facial, para agendar junto com outros serviços.", href: "/estetica-corporal/" },
];

function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setI(Math.min(FEATURES.length - 1, Math.max(0, Math.floor(p * FEATURES.length)))));
  const f = FEATURES[i];
  const mask = (delay: number) => ({ initial: { y: "112%" }, animate: { y: "0%" }, exit: { y: "-112%" }, transition: { duration: 0.55, delay, ease: EASE } });
  return (
    <div ref={ref} style={{ height: `${FEATURES.length * 85}vh` }} className="x-show">
      <div className="x-show-stick">
        <div className="x-wrap x-show-grid">
          <div>
            <p className="x-odo" aria-live="polite" aria-label={`${pad(i + 1)} de ${pad(FEATURES.length)}`}>
              <span aria-hidden="true">0</span>
              <span aria-hidden="true" className="x-odo-col">
                <motion.span className="x-odo-strip" animate={{ y: `-${i * (100 / FEATURES.length)}%` }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
                  {FEATURES.map((_, k) => <span key={k}>{k + 1}</span>)}
                </motion.span>
              </span>
              <span aria-hidden="true" className="of">/ {pad(FEATURES.length)}</span>
            </p>
            <div className="x-bar-track"><motion.div style={{ scaleX: scrollYProgress, transformOrigin: "left" }} className="x-bar-fill" /></div>
          </div>
          <div className="x-show-main">
            <AnimatePresence mode="wait">
              <motion.div key={f.id}>
                <h3 className="x-show-h">
                  <span className="x-mask"><motion.span className="x-mask-in" {...mask(0)}>{f.a}</motion.span></span>
                  <span className="x-mask"><motion.span className="x-mask-in ac" {...mask(0.08)}>{f.b}</motion.span></span>
                </h3>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <p className="x-lead on-dark">{f.text}</p>
                  <Link href={f.href} className="x-link big"><span className="u-link">Saiba mais</span> <ArrowUpRight size={18} aria-hidden="true" /></Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureList() {
  return (
    <ol className="x-wrap x-flist">
      {FEATURES.map((x, k) => (
        <li key={x.id}>
          <Reveal className="x-flist-item">
            <p className="x-odo small">{pad(k + 1)} <span className="of">/ {pad(FEATURES.length)}</span></p>
            <h3>{x.a} <em className="ac">{x.b}</em></h3>
            <p className="x-body on-dark">{x.text}</p>
            <Link href={x.href} className="x-link"><span className="u-link">Saiba mais</span> <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function Treatments() {
  const rich = useRichMotion();
  return (
    <section id="destaques" className="x-sec x-dark x-treat">
      <div className="x-wrap">
        <SectionHead tone="dark" eyebrow="Em destaque" title={["Cuidados para o rosto", <>e para o <em className="ac">corpo</em>.</>]} lead="Cada serviço tem uma página com as opções e o caminho para agendar." />
      </div>
      {rich ? <Showcase /> : <FeatureList />}
    </section>
  );
}

/* ------------------------------------------------------------------- Sobre */
const PILARES = [
  { n: "01", t: "Hora marcada.", d: HORARIO_CONFIRMADO && HORARIO ? HORARIO : "Atendimento com horário marcado pelo WhatsApp." },
  { n: "02", t: "Em Santa Amélia.", d: "Na região da Pampulha, em Belo Horizonte, na esquina com a Avenida Guarapari." },
  { n: "03", t: "Direto com a Kamila.", d: "Agende e tire dúvidas pelo WhatsApp, sem intermediários." },
];

export function About() {
  return (
    <section id="sobre-kamila" className="x-sec x-sand">
      <div className="x-wrap">
        <div className="x-about-grid">
          <Reveal className="x-arch-photo">
            <div className="x-arch-p" data-cursor="ver"><Photo name={FOTO_SOBRE.name} dir="espaco" alt={FOTO_SOBRE.alt} sizes="(min-width: 1024px) 34vw, 80vw" /></div>
          </Reveal>
          <div>
            <Reveal><p className="x-eyebrow">Quem atende</p></Reveal>
            <MaskLines lines={["Kamila Oliveira,", <>em <em className="ac">Santa Amélia.</em></>]} className="x-h2" />
            <Reveal delay={0.15}>
              <p className="x-lead">Depilação a laser, limpeza de pele e estética corporal fazem parte do atendimento. Um dos protocolos, a Lipo com as mãos, é criação da própria Kamila.</p>
              <div className="x-btn-row"><Link href="/sobre/" className="x-btn outline-dark"><Roll>Sobre a Kamila</Roll></Link></div>
            </Reveal>
          </div>
        </div>
        <ol className="x-pilares">
          {PILARES.map((p, i) => (
            <li key={p.n}>
              <Reveal delay={0.1 + i * 0.15}>
                <HairLineInline delay={i * 0.15} />
                <p className="x-num big">{p.n}</p>
                <h3>{p.t}</h3>
                <p className="x-body">{p.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function HairLineInline({ delay = 0 }: { delay?: number }) {
  return <motion.span aria-hidden="true" className="x-hair inline" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1, delay, ease: EASE }} />;
}

/* ----------------------------------------------------------------- Jornada */
const PASSOS = [
  { t: "Escolha o serviço", d: "Laser, pele ou corpo, e a área ou o pacote que você quer." },
  { t: "Diga o dia e o período", d: "Informe o dia e o período em que prefere vir." },
  { t: "Confirme pelo WhatsApp", d: "Seu pedido chega pronto e a Kamila confirma o horário com você." },
];

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setI(Math.min(PASSOS.length - 1, Math.max(0, Math.floor(p * PASSOS.length)))));
  const goTo = (k: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (k / PASSOS.length) * span + 4, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  return (
    <div ref={ref} style={{ height: `${PASSOS.length * 80}vh` }} className="x-show light">
      <div className="x-show-stick">
        <div className="x-wrap x-proc-grid">
          <ol aria-label="Passos">
            {PASSOS.map((s, k) => (
              <li key={s.t}>
                <button type="button" onClick={() => goTo(k)} aria-current={i === k} className={`x-proc-btn ${i === k ? "on" : ""}`}>
                  <ArrowRight size={24} aria-hidden="true" className="arr" />
                  <span className="x-num">{pad(k + 1)}</span>
                  <span className="t">{s.t}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="x-proc-main">
            <AnimatePresence mode="wait">
              <motion.div key={i}>
                <p className="x-eyebrow">Passo {pad(i + 1)}</p>
                <h3 className="x-proc-h"><span className="x-mask"><motion.span className="x-mask-in" initial={{ y: "112%" }} animate={{ y: "0%" }} exit={{ y: "-112%" }} transition={{ duration: 0.5, ease: EASE }}>{PASSOS[i].t}</motion.span></span></h3>
                <span className="x-mask wide"><motion.p className="x-lead" initial={{ y: "120%" }} animate={{ y: "0%" }} exit={{ y: "-120%" }} transition={{ duration: 0.5, delay: 0.08, ease: EASE }}>{PASSOS[i].d}</motion.p></span>
              </motion.div>
            </AnimatePresence>
            <div className="x-proc-count">
              <p className="x-odo small">{pad(i + 1)} <span className="of">/ {pad(PASSOS.length)}</span></p>
              <div className="x-bar-track"><motion.div style={{ scaleX: scrollYProgress, transformOrigin: "left" }} className="x-bar-fill" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepList() {
  return (
    <ol className="x-wrap x-flist light">
      {PASSOS.map((s, k) => (
        <li key={s.t}>
          <Reveal className="x-flist-item">
            <p className="x-odo small">{pad(k + 1)}</p>
            <h3>{s.t}</h3>
            <p className="x-body">{s.d}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function Journey() {
  const rich = useRichMotion();
  return (
    <section id="como-agendar" className="x-sec x-journey">
      <div className="x-wrap">
        <SectionHead eyebrow="Como funciona" title={["Do pedido à", <><em className="ac">confirmação.</em></>]} />
      </div>
      {rich ? <Process /> : <StepList />}
      <div className="x-wrap x-journey-cta">
        <AgendarButton origem="home_como_agendar" className="x-btn dark" />
      </div>
    </section>
  );
}

