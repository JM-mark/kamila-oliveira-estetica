import { ESPACO } from "@/content/espaco";
import { SITE } from "@/content/site";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

/** "Quem cuida de você": grade editorial com fotos reais da Kamila (quadros do Instagram dela, em aprovação). Só aparece com 4 ou mais fotos. */
export default function EspacoSection() {
  if (ESPACO.length < 4) return null;
  return (
    <section className="section dark" id="kamila">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Por dentro do dia a dia</p>
        </Reveal>
        <SplitText text="Quem cuida de você" as="h2" />
        <div className="espaco-grid">
          {ESPACO.slice(0, 6).map((f) => (
            <figure key={f.name} data-cursor="ver">
              <Photo name={f.name} dir="espaco" alt={f.alt} sizes="(min-width: 900px) 40vw, 90vw" />
              <figcaption>{f.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="btn-row">
          <a className="btn ghost" href={SITE.instagram} target="_blank" rel="noopener noreferrer">Ver mais no Instagram</a>
        </div>
      </div>
    </section>
  );
}
