import Link from "next/link";
import { SITE } from "@/content/site";
import { AuroraLazy } from "./ShaderLazy";
import GoldFrame from "./GoldFrame";
import Logo from "./Logo";
import SplitText from "./SplitText";
import WaButton from "./WaButton";

/** Hero: shader Aurora ao fundo (dourado, champanhe e preto), título em máscara, CTAs sempre visíveis e o logo da Kamila dentro da Moldura.
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
          <p className="sub">Depilação a laser, limpeza de pele e estética corporal na Pampulha, BH.</p>
          <div className="btn-row">
            <WaButton origem="home_hero" label="Agendar" />
            <Link className="btn ghost" href="/#servicos">Ver serviços</Link>
          </div>
        </div>
        <div className="hero-photo">
          <GoldFrame animated>
            <div className="in hero-logo-card"><Logo variant="lockup" height={230} /></div>
          </GoldFrame>
        </div>
      </div>
    </section>
  );
}
