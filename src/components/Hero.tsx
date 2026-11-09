import Link from "next/link";
import { SITE } from "@/content/site";
import { AuroraLazy } from "./ShaderLazy";
import GoldFrame from "./GoldFrame";
import Photo from "./Photo";
import { FOTO_HERO } from "@/content/espaco";
import SplitText from "./SplitText";
import AgendarButton from "./AgendarButton";

/** Hero: shader Aurora ao fundo (dourado, champanhe e preto), título em máscara, CTAs sempre visíveis e a foto da Kamila dentro da Moldura.
 *  Sem efeito preso à rolagem. Sem WebGL, fica o fundo em CSS. */
export default function Hero() {
  return (
    <section className="hero-aurora" aria-label="Apresentação">
      <div className="aurora-wrap" aria-hidden="true">
        <div className="aurora" />
        <AuroraLazy />
      </div>
      <div className="wrap hero-grid">
        <div className="content">
          <p className="eyebrow">Estética facial e corporal · {SITE.neighborhood}, {SITE.area}</p>
          <SplitText text="Luxo é se sentir bem todos os dias." as="h1" hero />
          <p className="sub">Depilação a laser, limpeza de pele e estética corporal, com agendamento pelo WhatsApp.</p>
          <div className="btn-row">
            <AgendarButton origem="home_hero" />
            <Link className="btn ghost" href="/#servicos">Ver serviços</Link>
          </div>
        </div>
        <div className="hero-photo">
          <GoldFrame animated>
            <div className="in photo-box" data-cursor="ver"><Photo name={FOTO_HERO.name} dir="espaco" alt={FOTO_HERO.alt} sizes="(min-width: 900px) 30vw, 70vw" priority /></div>
          </GoldFrame>
        </div>
      </div>
    </section>
  );
}
