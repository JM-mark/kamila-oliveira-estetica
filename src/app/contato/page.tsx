import type { Metadata } from "next";
import { canon } from "@/lib/seo";
import AgendarButton from "@/components/AgendarButton";
import { MaskLines } from "@/components/motion/primitives";
import WaButton from "@/components/WaButton";
import { ENDERECO, ENDERECO_CONFIRMADO, HORARIO, HORARIO_CONFIRMADO, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Contato e localização | Kamila Oliveira Estética",
  description: "Endereço, horário e WhatsApp da Kamila Oliveira Estética, na Rua Monsueto Filizzola, 16, Santa Amélia, região da Pampulha, em Belo Horizonte.",
  alternates: canon("/contato/"),
};

export default function Page() {
  return (
    <section className="section">
      <div className="wrap">
        <p className="x-eyebrow">Contato</p>
        <MaskLines as="h1" lines={["Fale com", <>a <em key="g" className="ac">gente</em></>]} className="x-h2" />
        <div className="grid cards-3" style={{ marginTop: 24 }}>
          <div className="card">
            <h3>WhatsApp</h3>
            <p>O jeito mais rápido de tirar dúvidas e combinar o seu horário.</p>
            <div style={{ marginTop: 10 }}><WaButton origem="contato" label="Falar no WhatsApp" /></div>
          </div>
          <div className="card">
            <h3>Onde fica</h3>
            {ENDERECO_CONFIRMADO && ENDERECO ? (
              <>
                <p>{ENDERECO}. {SITE.neighborhood}, região da {SITE.area}, {SITE.city}-{SITE.region}.</p>
                <div style={{ marginTop: 10 }}><a className="x-btn outline-dark" href={SITE.mapsLink} target="_blank" rel="noopener noreferrer">Como chegar</a></div>
              </>
            ) : (
              <>
                <p>{SITE.neighborhood}, região da {SITE.area}, {SITE.city}-{SITE.region}. O endereço completo vai pelo WhatsApp.</p>
                <div style={{ marginTop: 10 }}><WaButton className="x-btn outline-dark" label="Pedir o endereço" message="Olá! Vim pelo site e gostaria de saber o endereço." origem="contato_endereco" /></div>
              </>
            )}
          </div>
          {HORARIO_CONFIRMADO && HORARIO ? (
            <div className="card">
              <h3>Horário</h3>
              <p>{HORARIO}</p>
            </div>
          ) : null}
          <div className="card">
            <h3>Instagram</h3>
            <p>Acompanhe o dia a dia em {SITE.instagramHandle}.</p>
            <div style={{ marginTop: 10 }}><a className="x-btn outline-dark" href={SITE.instagram} target="_blank" rel="noopener noreferrer">Abrir o Instagram</a></div>
          </div>
        </div>
        {ENDERECO_CONFIRMADO && SITE.mapEmbed ? (
          <iframe title="Mapa" allowFullScreen src={SITE.mapEmbed} loading="lazy" style={{ border: 0, width: "100%", minHeight: 380, marginTop: 28 }} />
        ) : null}
        <div className="btn-row" style={{ marginTop: 36 }}>
          <AgendarButton origem="contato" />
        </div>
      </div>
    </section>
  );
}
