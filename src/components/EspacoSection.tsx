import { ESPACO } from "@/content/espaco";
import { SITE } from "@/content/site";
import { asset } from "@/lib/asset";
import Reveal from "./Reveal";

/** "Por dentro do espaço": 4 a 6 fotos reais em grade editorial. Só aparece quando há fotos aprovadas em src/content/espaco.ts. */
export default function EspacoSection() {
  if (ESPACO.length < 4) return null;
  return (
    <section className="section dark">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Por dentro do espaço</p>
          <h2 style={{ maxWidth: "18ch" }}>Conheça onde o cuidado acontece</h2>
        </Reveal>
        <div className="espaco-grid">
          {ESPACO.slice(0, 6).map((f) => (
            <figure key={f.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(f.src)} alt={f.alt} loading="lazy" decoding="async" />
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
