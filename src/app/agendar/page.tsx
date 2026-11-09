import type { Metadata } from "next";
import { canon } from "@/lib/seo";
import Stepper from "@/components/Stepper";

export const metadata: Metadata = {
  title: "Agendar horário | Kamila Oliveira Estética",
  description: "Escolha o serviço, o dia e o período e envie pelo WhatsApp. A confirmação do horário é feita pela Kamila.",
  alternates: canon("/agendar/"),
};

export default function Page() {
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">Agendar</p>
        <h1 style={{ fontSize: "clamp(36px,6vw,60px)", marginBottom: 14 }}>Agende seu horário</h1>
        <p className="lead" style={{ marginBottom: 32 }}>Escolha o serviço, o dia e o período. A Kamila confirma pelo WhatsApp.</p>
        <Stepper />
      </div>
    </section>
  );
}
