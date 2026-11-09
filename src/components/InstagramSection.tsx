import { POSTS_APROVADOS } from "@/data/instagram";
import { SITE } from "@/content/site";
import Photo from "./Photo";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import StaggerGrid from "./StaggerGrid";

/** "No Instagram": grade estática com posts reais da Kamila (só os aprovados em src/data/instagram.ts). Sem embed e sem widget de terceiros. */
export default function InstagramSection() {
  if (POSTS_APROVADOS.length < 2) return null;
  const cols = Math.min(POSTS_APROVADOS.length, 3);
  return (
    <section className="section dark" id="instagram">
      <div className="wrap">
        <Reveal><p className="eyebrow">No Instagram</p></Reveal>
        <SplitText text="Acompanhe o dia a dia do espaço" as="h2" />
        <Reveal><p className="lead ig-handle">{SITE.instagramHandle}</p></Reveal>
        <StaggerGrid className="ig-grid" style={{ ["--cols" as string]: cols } as React.CSSProperties}>
          {POSTS_APROVADOS.map((p, i) => (
            <a key={p.id} className="ig-card" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver no Instagram: ${p.caption}`} style={{ ["--i" as string]: i } as React.CSSProperties}>
              <div className="ig-img">
                <Photo name={p.image} dir="instagram" alt={p.alt} sizes="(min-width: 900px) 30vw, 46vw" />
                {p.tipo === "reel" ? (
                  <svg className="ig-play" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="rgba(15,13,11,0.55)" stroke="currentColor" strokeWidth="1" /><path d="M10 8.2v7.6l6-3.8-6-3.8Z" fill="currentColor" /></svg>
                ) : null}
                <span className="ig-hover" aria-hidden="true">Ver no Instagram</span>
              </div>
              <p className="ig-cap">{p.caption}</p>
            </a>
          ))}
        </StaggerGrid>
        <div className="btn-row">
          <a className="btn ghost" href={SITE.instagram} target="_blank" rel="noopener noreferrer">Seguir {SITE.instagramHandle}</a>
        </div>
      </div>
    </section>
  );
}
