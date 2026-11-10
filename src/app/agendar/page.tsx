import type { Metadata } from "next";
import { canon } from "@/lib/seo";
import { MaskLines } from "@/components/motion/primitives";
import Stepper from "@/components/Stepper";

export const metadata: Metadata = {
  title: "Agendar horário | Kamila Oliveira Estética",
  description: "Escolha o serviço, o dia e o período em poucos passos e envie o pedido pelo WhatsApp. A Kamila confirma o horário com você.",
  alternates: canon("/agendar/"),
};

export default function Page() {
  return (
    <section className="section">
      <div className="wrap">
        <p className="x-eyebrow">Agendar</p>
        <MaskLines as="h1" lines={["Agende seu", <><em key="h" className="ac">horário</em></>]} className="x-h2" />
        <p className="x-lead" style={{ marginBottom: 32 }}>Escolha o serviço, o dia e o período. A Kamila confirma pelo WhatsApp.</p>
        <Stepper />
      </div>
    </section>
  );
}
