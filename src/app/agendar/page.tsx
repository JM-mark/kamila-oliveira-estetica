import type { Metadata } from "next";
import { canon } from "@/lib/seo";
import Stepper from "@/components/Stepper";

export const metadata: Metadata = {
  title: "Agendar horário | Kamila Oliveira Estética",
  description: "Monte seu pedido em 4 etapas e envie pelo WhatsApp. A confirmação do horário é feita pela clínica.",
  alternates: canon("/agendar/"),
};

export default function Page() {
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">Agendar</p>
        <h1 style={{ fontSize: "clamp(36px,6vw,60px)", marginBottom: 14 }}>Monte seu pedido</h1>
        <p className="lead" style={{ marginBottom: 32 }}>Quatro etapas rápidas. No final, o WhatsApp abre com tudo pronto para enviar.</p>
        <Stepper />
      </div>
    </section>
  );
}
