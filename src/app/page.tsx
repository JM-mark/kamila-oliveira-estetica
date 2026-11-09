import type { Metadata } from "next";
import Link from "next/link";
import { canon } from "@/lib/seo";
import EspacoSection from "@/components/EspacoSection";
import GoldFrame from "@/components/GoldFrame";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import ServicesAccordion from "@/components/ServicesAccordion";
import SplitText from "@/components/SplitText";
import WaButton from "@/components/WaButton";
import { FOTO_SOBRE } from "@/content/espaco";
import { SITE } from "@/content/site";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Estética na Pampulha, BH: laser e limpeza de pele | Kamila Oliveira",
  description:
    "Depilação a laser, limpeza de pele e protocolos corporais em Santa Amélia, região da Pampulha, em Belo Horizonte. Agende pelo WhatsApp.",
  alternates: canon("/"),
};

// Só fatos confirmados (briefing e agenda da cliente). Sem anos de experiência, número de clientes ou prêmios.
const DIFERENCIAIS = [
  { n: "01", t: "Protocolo autoral", d: "A Lipo com as mãos é um protocolo manual criado pela própria Kamila, voltado à redução de medidas." },
  { n: "02", t: "Agendamento direto", d: "Você monta o pedido em poucos passos e ele chega pronto no WhatsApp. A confirmação do horário é feita pela clínica." },
  { n: "03", t: "Perto de casa", d: "Atendimento em Santa Amélia, na região da Pampulha, em Belo Horizonte." },
];

const PASSOS = [
  { t: "Escolha o serviço", d: "Laser, pele ou corpo, e a área ou o pacote que você quer." },
  { t: "Diga o dia e o período", d: "Informe o dia e o período em que prefere vir." },
  { t: "Confirme pelo WhatsApp", d: "Seu pedido chega pronto e a gente confirma o horário com você." },
];

export default function Home() {
  const marble = { ["--bg" as string]: `url(${asset("/photos/marmore-1280.webp")})` };
  const marble2 = { ["--bg" as string]: `url(${asset("/photos/marmore2-1280.webp")})` };
  return (
    <>
      <Hero />
      <Marquee />

      <section className="section" id="servicos">
        <div className="wrap">
          <Reveal><p className="eyebrow">Serviços</p></Reveal>
          <SplitText text="Escolha por onde começar" as="h2" />
          <Reveal><p className="lead" style={{ marginTop: 14 }}>Passe o mouse ou toque em um serviço para ver as áreas e agendar.</p></Reveal>
          <ServicesAccordion />
        </div>
      </section>

      <section className="section dark marble" style={marble2}>
        <div className="wrap">
          <Reveal><p className="eyebrow">Diferenciais</p></Reveal>
          <SplitText text="O cuidado que você encontra aqui" as="h2" />
          <div className="difs">
            {DIFERENCIAIS.map((d) => (
              <Reveal key={d.n}>
                <article className="dif">
                  <span className="num">{d.n}</span>
                  <hr className="gold-rule" />
                  <h3>{d.t}</h3>
                  <p>{d.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EspacoSection />

      <section className="section dark" id="sobre-kamila">
        <div className="wrap split">
          <Reveal>
            <GoldFrame animated>
              <div className="in photo-box" data-cursor="ver">
                <Photo name={FOTO_SOBRE.name} dir="espaco" alt={FOTO_SOBRE.alt} sizes="(min-width: 900px) 40vw, 90vw" />
              </div>
            </GoldFrame>
          </Reveal>
          <div>
            <Reveal><p className="eyebrow">Sobre a Kamila</p></Reveal>
            <SplitText text="Luxo é se sentir bem todos os dias." as="h2" className="quote" />
            <Reveal>
              <p className="lead">
                Kamila Oliveira atende em {SITE.neighborhood}, na região da {SITE.area}. Entre os serviços está a Lipo com as mãos, protocolo manual criado por ela.
              </p>
              <div className="btn-row"><Link className="btn ghost" href="/sobre/">Conhecer a Kamila</Link></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section sand">
        <div className="wrap split">
          <div>
            <Reveal><p className="eyebrow">Como agendar</p></Reveal>
            <SplitText text="Três passos para agendar" as="h2" />
            <div className="steps-3 steps-col">
              {PASSOS.map((p, i) => (
                <Reveal key={p.t}>
                  <div className="step-card">
                    <span className="num">0{i + 1}</span>
                    <div><h3>{p.t}</h3><p>{p.d}</p></div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="btn-row">
              <Link className="btn" href="/agendar/">Montar meu pedido</Link>
              <WaButton className="btn ghost" label="Falar no WhatsApp" origem="home_como_agendar" />
            </div>
          </div>
          <Reveal>
            <div className="photo-box tall" data-cursor="ver"><Photo name="relaxamento" alt="" sizes="(min-width: 900px) 40vw, 90vw" /></div>
          </Reveal>
        </div>
      </section>

      <section className="section dark marble" style={marble}>
        <div className="wrap split rev">
          <div>
            <Reveal><p className="eyebrow">Onde estamos</p></Reveal>
            <SplitText text={`${SITE.neighborhood}, região da ${SITE.area}`} as="h2" />
            <Reveal>
              <p className="lead" style={{ marginTop: 14 }}>Atendimento em {SITE.city}. Peça o endereço completo pelo WhatsApp.</p>
              <div className="btn-row">
                <WaButton label="Pedir o endereço" message="Olá! Vim pelo site e gostaria de saber o endereço." origem="home_local" />
              </div>
            </Reveal>
          </div>
          {SITE.mapEmbed ? (
            <iframe title="Mapa" src={SITE.mapEmbed} loading="lazy" style={{ border: 0, width: "100%", minHeight: 380 }} />
          ) : (
            <div className="place" aria-hidden="true">
              <span className="display">Pampulha</span>
              <span className="rule" />
              <span className="small">Santa Amélia · Belo Horizonte</span>
            </div>
          )}
        </div>
      </section>

      <section className="section dark marble" style={{ ...marble2, textAlign: "center" }}>
        <div className="wrap">
          <Reveal>
            <GoldFrame animated style={{ maxWidth: 860, margin: "0 auto" }}>
              <div className="in cta-card">
                <p className="eyebrow" style={{ marginInline: "auto" }}>Agende</p>
                <h2 style={{ maxWidth: "22ch", margin: "0 auto 14px" }}>Seu horário começa numa mensagem</h2>
                <p className="lead" style={{ margin: "0 auto" }}>Diga o que você procura e a gente confirma o dia e o período com você.</p>
                <div className="btn-row" style={{ justifyContent: "center" }}>
                  <WaButton className="btn light" origem="home_final" label="Agendar pelo WhatsApp" />
                </div>
              </div>
            </GoldFrame>
          </Reveal>
        </div>
      </section>
    </>
  );
}
