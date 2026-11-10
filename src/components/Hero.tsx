import Link from "next/link";
import { SITE } from "@/content/site";
import { AuroraLazy } from "./ShaderLazy";
import HeroVideo from "./HeroVideo";
import SplitText from "./SplitText";
import AgendarButton from "./AgendarButton";

/** Hero: shader Aurora ao fundo (dourado, champanhe e preto), título em máscara, CTAs sempre visíveis e o vídeo de atmosfera ao fundo, sob a Aurora.
 *  Sem efeito preso à rolagem. Sem WebGL, fica o fundo em CSS. */
export default function Hero() {
  return (
    <section className="hero-aurora" aria-label="Apresentação">
      <div className="aurora-wrap" aria-hidden="true">
        <HeroVideo />
        <div className="aurora-fx">
          <div className="aurora" />
          <AuroraLazy />
        </div>
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
      </div>
    </section>
  );
}
