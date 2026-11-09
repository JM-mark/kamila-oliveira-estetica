import type { Metadata } from "next";
import Arch from "@/components/Arch";
import WaButton from "@/components/WaButton";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Sobre a Kamila Oliveira | Estética em Santa Amélia, BH",
  description: "Conheça a Kamila Oliveira e o cuidado que ela oferece em Santa Amélia, região da Pampulha, em Belo Horizonte.",
  alternates: { canonical: "/sobre/" },
};

export default function Page() {
  return (
    <section className="section">
      <div className="wrap split">
        <div>
          <p className="eyebrow">Sobre</p>
          <h1 style={{ fontSize: "clamp(38px,6.5vw,64px)" }}>Kamila Oliveira</h1>
          <p className="lead" style={{ marginTop: 20 }}>
            Estética facial e corporal em {SITE.neighborhood}, na região da {SITE.area}, em {SITE.city}.
          </p>
          <p>
            Depilação a laser, limpeza de pele e protocolos corporais fazem parte do atendimento. Um deles é a Lipo com as mãos, protocolo manual criado pela própria Kamila, voltado à redução de medidas.
          </p>
          <p>
            Para ver o dia a dia do espaço, acompanhe o Instagram <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">{SITE.instagramHandle}</a>.
          </p>
          <div className="btn-row"><WaButton origem="sobre" /></div>
        </div>
        <Arch tone="malva" />
      </div>
    </section>
  );
}
