import type { Metadata } from "next";
import { canon } from "@/lib/seo";
import Hero from "@/components/Hero";
import InstagramSection from "@/components/InstagramSection";
import Photo from "@/components/Photo";
import GoldFrame from "@/components/GoldFrame";
import AgendarButton from "@/components/AgendarButton";
import { About, Journey, ServiceCards, Statement, Treatments, Trust } from "@/components/HomeSections";
import { HairLine, MaskLines, Reveal, Roll } from "@/components/motion/primitives";
import { ENDERECO, HORARIO, HORARIO_CONFIRMADO, SITE } from "@/content/site";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Estética na Pampulha, BH: laser e pele | Kamila Oliveira",
  description:
    "Depilação a laser, limpeza de pele e estética corporal em Santa Amélia, Pampulha (BH). Atendimento de terça a sábado, com agendamento pelo WhatsApp.",
  alternates: canon("/"),
};

export default function Home() {
  const marble = { ["--bg" as string]: `url(${asset("/photos/marmore-1280.webp")})` };
  const marble2 = { ["--bg" as string]: `url(${asset("/photos/marmore2-1280.webp")})` };
  return (
    <>
      <Hero />
      <Trust />
      <Statement />
      <HairLine />
      <ServiceCards />
      <Treatments />
      <About />
      <InstagramSection />
      <Journey />

      {/* Avaliação real do Google (Perfil da Kamila, 10/11/2026). Sem nota média nem contagem. TODO aval da Kamila para exibir. */}
      <section className="x-sec">
        <div className="x-wrap">
          <Reveal>
            <figure className="review">
              <p className="x-eyebrow">No Google</p>
              <blockquote>“Trabalho impecável, atendimento maravilhoso. Kamila é extremamente atenciosa, e muito boa em tudo que faz.”</blockquote>
              <figcaption>Avaliação de uma cliente no Google. <a className="link" href={SITE.googlePerfil} target="_blank" rel="noopener noreferrer">Ver no Google Maps</a></figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="x-sec x-dark x-marble" style={marble}>
        <div className="x-wrap x-where">
          <div>
            <Reveal><p className="x-eyebrow">Onde estamos</p></Reveal>
            <MaskLines lines={[`${SITE.neighborhood},`, `região da ${SITE.area}`]} className="x-h2" />
            <Reveal delay={0.1}>
              <p className="x-lead on-dark">{ENDERECO}. {SITE.neighborhood}, {SITE.city}-{SITE.region}.</p>
              {HORARIO_CONFIRMADO && HORARIO ? <p className="x-lead on-dark">{HORARIO}</p> : null}
              <div className="x-btn-row">
                <a className="x-btn outline-light" href={SITE.mapsLink} target="_blank" rel="noopener noreferrer"><Roll>Como chegar</Roll></a>
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

      <section className="x-sec x-dark x-marble x-final" style={marble2}>
        <div className="x-wrap">
          <Reveal>
            <GoldFrame animated style={{ maxWidth: 860, margin: "0 auto" }}>
              <div className="in cta-card">
                <p className="x-eyebrow center on-dark">Agende</p>
                <h2 className="x-h2 center" style={{ maxWidth: "20ch", margin: "0 auto 14px" }}>Seu horário começa numa mensagem</h2>
                <p className="x-lead on-dark center">Diga o que você procura e a resposta chega pelo WhatsApp.</p>
                <div className="x-btn-row center"><AgendarButton className="x-btn light" origem="home_final" /></div>
              </div>
            </GoldFrame>
          </Reveal>
        </div>
      </section>
    </>
  );
}
