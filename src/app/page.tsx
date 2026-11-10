import type { Metadata } from "next";
import Link from "next/link";
import { canon } from "@/lib/seo";
import GoldFrame from "@/components/GoldFrame";
import Hero from "@/components/Hero";
import InstagramSection from "@/components/InstagramSection";
import Marquee from "@/components/Marquee";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import ServicesAccordion from "@/components/ServicesAccordion";
import SplitText from "@/components/SplitText";
import AgendarButton from "@/components/AgendarButton";
import WaButton from "@/components/WaButton";
import { FOTO_SOBRE } from "@/content/espaco";
import { ENDERECO, HORARIO, HORARIO_CONFIRMADO, SITE } from "@/content/site";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Estética na Pampulha, BH: laser e limpeza de pele | Kamila Oliveira",
  description:
    "Depilação a laser, limpeza de pele e protocolos corporais em Santa Amélia, região da Pampulha, em Belo Horizonte. Agende pelo WhatsApp.",
  alternates: canon("/"),
};

// Só fatos do briefing e do Instagram da cliente, com // TODO para ela confirmar. Sem anos de experiência, número de clientes ou prêmios.
const DIFERENCIAIS = [
  { n: "01", t: "Protocolo autoral", d: "A Lipo com as mãos é um protocolo manual criado pela própria Kamila, voltado à redução de medidas." },
  // TODO a Kamila confirmar o parcelamento (visto em post do Instagram dela).
  { n: "02", t: "Parcelamento em até 4x", d: "Os serviços podem ser parcelados em até 4x." },
  { n: "03", t: "Fácil de chegar", d: "Esquina com a Avenida Guarapari, em Santa Amélia." },
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
            <SplitText text="Conheça quem cuida de você" as="h2" />
            <Reveal>
              <p className="lead">
                Conheça a Kamila Oliveira, o jeito como ela trabalha e o que cada serviço oferece.
              </p>
              <div className="btn-row"><Link className="btn ghost" href="/sobre/">Conhecer a Kamila</Link></div>
            </Reveal>
          </div>
        </div>
      </section>

      <InstagramSection />

      {/* Avaliação real do Google (Perfil da Kamila, 10/11/2026). Sem nota média nem contagem. TODO aval da Kamila para exibir. */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <figure className="review">
              <p className="eyebrow">No Google</p>
              <blockquote>“Trabalho impecável, atendimento maravilhoso. Kamila é extremamente atenciosa, e muito boa em tudo que faz.”</blockquote>
              <figcaption>Avaliação de uma cliente no Google. <a className="link" href={SITE.googlePerfil} target="_blank" rel="noopener noreferrer">Ver no Google Maps</a></figcaption>
            </figure>
          </Reveal>
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
              <AgendarButton origem="home_como_agendar" />
              <WaButton className="btn ghost" label="Falar no WhatsApp" origem="home_como_agendar" />
            </div>
          </div>
          <Reveal>
            <div className="photo-box tall" data-cursor="ver"><Photo name="relaxamento" alt="Ambiente de relaxamento com luz suave, imagem ilustrativa" sizes="(min-width: 900px) 40vw, 90vw" /></div>
          </Reveal>
        </div>
      </section>

      <section className="section dark marble" style={marble}>
        <div className="wrap split rev">
          <div>
            <Reveal><p className="eyebrow">Onde estamos</p></Reveal>
            <SplitText text={`${SITE.neighborhood}, região da ${SITE.area}`} as="h2" />
            <Reveal>
              <p className="lead" style={{ marginTop: 14 }}>{ENDERECO}. {SITE.neighborhood}, {SITE.city}-{SITE.region}.</p>
              {HORARIO_CONFIRMADO && HORARIO ? <p className="lead" style={{ marginTop: 8 }}>{HORARIO}</p> : null}
              <div className="btn-row">
                <a className="btn ghost" href={SITE.mapsLink} target="_blank" rel="noopener noreferrer">Como chegar</a>
              </div>
            </Reveal>
          </div>
          <Reveal>
              <figure className="place-photo" data-cursor="ver">
                <Photo name="pampulha" alt="Igreja de São Francisco de Assis, na Pampulha, ao pôr do sol, imagem ilustrativa" sizes="(min-width: 900px) 50vw, 92vw" />
                <figcaption>Pampulha · Belo Horizonte</figcaption>
              </figure>
            </Reveal>
        </div>
      </section>

      <section className="section dark marble" style={{ ...marble2, textAlign: "center" }}>
        <div className="wrap">
          <Reveal>
            <GoldFrame animated style={{ maxWidth: 860, margin: "0 auto" }}>
              <div className="in cta-card">
                <p className="eyebrow" style={{ marginInline: "auto" }}>Agende</p>
                <h2 style={{ maxWidth: "22ch", margin: "0 auto 14px" }}>Seu horário começa numa mensagem</h2>
                <p className="lead" style={{ margin: "0 auto" }}>Conte o que você procura e receba a resposta pelo WhatsApp.</p>
                <div className="btn-row" style={{ justifyContent: "center" }}>
                  <AgendarButton className="btn light" origem="home_final" />
                </div>
              </div>
            </GoldFrame>
          </Reveal>
        </div>
      </section>
    </>
  );
}
