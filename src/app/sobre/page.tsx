import type { Metadata } from "next";
import { canon } from "@/lib/seo";
import AgendarButton from "@/components/AgendarButton";
import { SITE } from "@/content/site";
import { asset } from "@/lib/asset";
import Photo from "@/components/Photo";
import { FOTO_SOBRE } from "@/content/espaco";
import { MaskLines, Reveal } from "@/components/motion/primitives";

export const metadata: Metadata = {
  title: "Sobre a Kamila Oliveira | Estética em Santa Amélia, BH",
  description: "Conheça a Kamila Oliveira, o espaço dela em Santa Amélia, região da Pampulha, em Belo Horizonte, e veja como agendar seu horário.",
  alternates: canon("/sobre/"),
};

export default function Page() {
  return (
    <section className="x-sec x-dark x-svc-hero" style={{ minHeight: "80vh" }}>
      <div className="x-wrap x-about-grid">
        <div>
          <Reveal><p className="x-eyebrow on-dark">Sobre</p></Reveal>
          <MaskLines as="h1" className="x-h2" lines={["Kamila", <em key="o" className="ac">Oliveira</em>]} />
          <Reveal delay={0.1}>
            <p className="x-lead on-dark">Estética facial e corporal em {SITE.neighborhood}, na região da {SITE.area}, em {SITE.city}.</p>
            <p className="x-body on-dark">
              Depilação a laser, limpeza de pele e protocolos corporais fazem parte do atendimento. Um deles é a Lipo com as mãos, protocolo manual criado pela própria Kamila, voltado à redução de medidas.
            </p>
            <p className="x-body on-dark">
              Para ver o dia a dia do espaço, acompanhe o Instagram <a className="link static" style={{ color: "var(--ouro-c)" }} href={SITE.instagram} target="_blank" rel="noopener noreferrer">{SITE.instagramHandle}</a>.
            </p>
            <div className="x-btn-row"><AgendarButton origem="sobre" className="x-btn light" /></div>
          </Reveal>
        </div>
        <Reveal className="x-arch-photo">
          <div className="x-arch-p" data-cursor="ver">
            {SITE.kamilaPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={asset(SITE.kamilaPhoto)} alt="Kamila Oliveira" loading="lazy" />
            ) : (
              <Photo name={FOTO_SOBRE.name} dir="espaco" alt={FOTO_SOBRE.alt} sizes="(min-width: 900px) 34vw, 80vw" />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
