import type { Metadata } from "next";
import { canon } from "@/lib/seo";
import AgendarButton from "@/components/AgendarButton";
import WaButton from "@/components/WaButton";
import { ENDERECO, ENDERECO_CONFIRMADO, HORARIO, HORARIO_CONFIRMADO, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Contato e localização | Kamila Oliveira Estética",
  description: "Fale com a Kamila Oliveira Estética pelo WhatsApp. Atendimento em Santa Amélia, região da Pampulha, Belo Horizonte.",
  alternates: canon("/contato/"),
};

export default function Page() {
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">Contato</p>
        <h1 style={{ fontSize: "clamp(38px,6.5vw,64px)", marginBottom: 18 }}>Fale com a gente</h1>
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
                <div style={{ marginTop: 10 }}><a className="btn ghost" href={SITE.mapsLink} target="_blank" rel="noopener noreferrer">Como chegar</a></div>
              </>
            ) : (
              <>
                <p>{SITE.neighborhood}, região da {SITE.area}, {SITE.city}-{SITE.region}. O endereço completo vai pelo WhatsApp.</p>
                <div style={{ marginTop: 10 }}><WaButton className="btn ghost" label="Pedir o endereço" message="Olá! Vim pelo site e gostaria de saber o endereço." origem="contato_endereco" /></div>
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
            <div style={{ marginTop: 10 }}><a className="btn ghost" href={SITE.instagram} target="_blank" rel="noopener noreferrer">Abrir o Instagram</a></div>
          </div>
        </div>
        {ENDERECO_CONFIRMADO && SITE.mapEmbed ? (
          <iframe title="Mapa" src={SITE.mapEmbed} loading="lazy" style={{ border: 0, width: "100%", minHeight: 380, marginTop: 28 }} />
        ) : null}
        <div className="btn-row" style={{ marginTop: 36 }}>
          <AgendarButton origem="contato" />
        </div>
      </div>
    </section>
  );
}
