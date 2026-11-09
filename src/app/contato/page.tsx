import type { Metadata } from "next";
import Link from "next/link";
import WaButton from "@/components/WaButton";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Contato e localização | Kamila Oliveira Estética",
  description: "Fale com a Kamila Oliveira Estética pelo WhatsApp. Atendimento em Santa Amélia, região da Pampulha, Belo Horizonte.",
  alternates: { canonical: "/contato/" },
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
            <p>O jeito mais rápido de agendar e tirar dúvidas.</p>
            <div style={{ marginTop: 10 }}><WaButton origem="contato" /></div>
          </div>
          <div className="card">
            <h3>Onde fica</h3>
            <p>{SITE.neighborhood}, região da {SITE.area}, {SITE.city}-{SITE.region}. O endereço completo vai pelo WhatsApp.</p>
            <div style={{ marginTop: 10 }}><WaButton className="btn ghost" label="Pedir o endereço" message="Olá! Vim pelo site e gostaria de saber o endereço." origem="contato_endereco" /></div>
          </div>
          <div className="card">
            <h3>Instagram</h3>
            <p>Acompanhe o dia a dia em {SITE.instagramHandle}.</p>
            <div style={{ marginTop: 10 }}><a className="btn ghost" href={SITE.instagram} target="_blank" rel="noopener noreferrer">Abrir o Instagram</a></div>
          </div>
        </div>
        <p style={{ marginTop: 32 }}>Prefere montar o pedido passo a passo? <Link href="/agendar/">Use o agendamento guiado</Link>.</p>
      </div>
    </section>
  );
}
