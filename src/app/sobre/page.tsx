import type { Metadata } from "next";
import PhotoSlot from "@/components/PhotoSlot";
import WaButton from "@/components/WaButton";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Sobre a Kamila Oliveira | Estética em Santa Amélia, BH",
  description: "Conheça a Kamila Oliveira e o cuidado que ela oferece em Santa Amélia, região da Pampulha, em Belo Horizonte.",
  alternates: { canonical: "/sobre/" },
};

export default function Page() {
  return (
    <section className="hero-dark" style={{ minHeight: "70vh" }}>
      <div className="wrap split">
        <div>
          <p className="eyebrow">Sobre</p>
          <h1>Kamila Oliveira</h1>
          <p className="lead">Estética facial e corporal em {SITE.neighborhood}, na região da {SITE.area}, em {SITE.city}.</p>
          <p style={{ color: "var(--suave)" }}>
            Depilação a laser, limpeza de pele e protocolos corporais fazem parte do atendimento. Um deles é a Lipo com as mãos, protocolo manual criado pela própria Kamila, voltado à redução de medidas.
          </p>
          <p style={{ color: "var(--suave)" }}>
            Para ver o dia a dia do espaço, acompanhe o Instagram <a className="link static" style={{ color: "var(--ouro-c)" }} href={SITE.instagram} target="_blank" rel="noopener noreferrer">{SITE.instagramHandle}</a>.
          </p>
          <div className="btn-row"><WaButton origem="sobre" label="Agendar pelo WhatsApp" /></div>
        </div>
        <div className="frame"><div className="in"><PhotoSlot /></div></div>
      </div>
    </section>
  );
}
