import type { Metadata } from "next";
import Link from "next/link";
import { canon } from "@/lib/seo";
import GoldFrame from "@/components/GoldFrame";
import HeroExpand from "@/components/HeroExpand";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import ServicesAccordion from "@/components/ServicesAccordion";
import WaButton from "@/components/WaButton";
import ZoomParallax from "@/components/ZoomParallax";
import { SITE } from "@/content/site";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Estética na Pampulha, BH: laser e limpeza de pele | Kamila Oliveira",
  description:
    "Depilação a laser, limpeza de pele e protocolos corporais em Santa Amélia, região da Pampulha, em Belo Horizonte. Agende pelo WhatsApp.",
  alternates: canon("/"),
};

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
      <HeroExpand />

      <section className="section" id="servicos">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Serviços</p>
            <h2>Escolha por onde começar</h2>
            <p className="lead" style={{ marginTop: 14 }}>Passe o mouse ou toque em um serviço para ver as áreas e agendar.</p>
          </Reveal>
          <ServicesAccordion />
        </div>
      </section>

      {SITE.spacePhoto ? (
        <ZoomParallax
          around={["laser", "pele", "corpo", "relaxamento", "marmore"]}
          center={
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(SITE.spacePhoto)} alt="O espaço da Kamila Oliveira Estética" loading="lazy" />
              <p className="zp-text display">Um espaço feito para você desacelerar.</p>
            </>
          }
        />
      ) : null}

      <section className="section sand">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Como agendar</p>
            <h2>Três passos para agendar</h2>
          </Reveal>
          <div className="stack">
            {PASSOS.map((p, i) => (
              <div key={p.t} className="stack-card" style={{ ["--i" as string]: i }}>
                <span className="num">0{i + 1}</span>
                <div><h3>{p.t}</h3><p>{p.d}</p></div>
              </div>
            ))}
          </div>
          <div className="btn-row">
            <Link className="btn" href="/agendar/">Montar meu pedido</Link>
            <WaButton className="btn ghost" label="Falar no WhatsApp" origem="home_como_agendar" />
          </div>
        </div>
      </section>

      <section className="section dark marble" style={marble2}>
        <div className="wrap split">
          <Reveal>
            <GoldFrame>
              <div className="in photo-box">
                {SITE.kamilaPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={asset(SITE.kamilaPhoto)} alt="Kamila Oliveira" loading="lazy" />
                ) : (
                  <Photo name="corpo" sizes="(min-width: 900px) 40vw, 90vw" />
                )}
              </div>
            </GoldFrame>
          </Reveal>
          <Reveal>
            <p className="eyebrow">Sobre a Kamila</p>
            <p className="quote">Luxo é se sentir bem todos os dias.</p>
            <p className="lead">
              Kamila Oliveira atende em {SITE.neighborhood}, na região da {SITE.area}. Entre os serviços está a Lipo com as mãos, protocolo manual criado por ela.
            </p>
            <div className="btn-row"><Link className="btn ghost" href="/sobre/">Conhecer a Kamila</Link></div>
          </Reveal>
        </div>
      </section>

      <section className="section dark marble" style={marble}>
        <div className="wrap split rev">
          <Reveal>
            <p className="eyebrow">Onde estamos</p>
            <h2>{SITE.neighborhood}, região da {SITE.area}</h2>
            <p className="lead" style={{ marginTop: 14 }}>Atendimento em {SITE.city}. Peça o endereço completo pelo WhatsApp.</p>
            <div className="btn-row">
              <WaButton label="Pedir o endereço" message="Olá! Vim pelo site e gostaria de saber o endereço." origem="home_local" />
            </div>
          </Reveal>
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

      <section className="section dark" style={{ textAlign: "center" }}>
        <div className="wrap">
          <Reveal>
            <GoldFrame style={{ maxWidth: 820, margin: "0 auto" }}>
              <div className="in" style={{ padding: "clamp(40px,7vw,88px) 24px" }}>
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
