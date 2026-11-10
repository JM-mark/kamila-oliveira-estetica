import type { Service } from "@/content/services";
import { asset } from "@/lib/asset";
import Photo from "./Photo";
import AgendarButton from "./AgendarButton";
import WaButton from "./WaButton";
import { HairLine, MaskLines, Reveal } from "./motion/primitives";

/** Página de serviço no mesmo idioma da Home: título em máscara, arco com foto, lista numerada com linhas que se desenham e fechamento escuro. */
export default function ServicePage({ s }: { s: Service }) {
  const msg = `Olá! Vim pelo site e gostaria de agendar: ${s.title}.`;
  const [a, ...resto] = s.title.split(" ");
  const b = resto.join(" ");
  return (
    <>
      <section className="x-sec x-dark x-svc-hero">
        <div className="x-wrap x-about-grid">
          <div>
            <Reveal><p className="x-eyebrow on-dark">Santa Amélia · Pampulha · Belo Horizonte</p></Reveal>
            <MaskLines as="h1" className="x-h2" lines={b ? [a, <em key="b" className="ac">{b}</em>] : [<em key="a" className="ac">{a}</em>]} />
            <Reveal delay={0.1}>
              <p className="x-lead on-dark">{s.intro}</p>
              <div className="x-btn-row">
                <AgendarButton origem={`servico_${s.slug}_hero`} servico={s.slug} className="x-btn light" />
                <WaButton className="x-btn outline-light" origem={`servico_${s.slug}_hero`} message={msg} label="Falar no WhatsApp" />
              </div>
            </Reveal>
          </div>
          <Reveal className="x-arch-photo">
            <div className="x-arch-p" data-cursor="ver"><Photo name={s.photo} alt={s.photoAlt} priority sizes="(min-width: 900px) 34vw, 80vw" /></div>
          </Reveal>
        </div>
      </section>

      <section className="x-sec x-sand">
        <div className="x-wrap">
          <Reveal><p className="x-eyebrow">O que você encontra aqui</p></Reveal>
          <MaskLines className="x-h2" lines={[s.title]} />
          <ol className="x-opts">
            {s.items.map((i, k) => (
              <li key={i}>
                <HairLine className="x-opt-line" />
                <Reveal delay={0.05} className="x-opt-row"><span className="x-num">{String(k + 1).padStart(2, "0")}</span><span className="x-opt-t">{i}</span></Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="x-sec x-dark x-marble x-final" style={{ ["--bg" as string]: `url(${asset("/photos/marmore2-1280.webp")})` }}>
        <div className="x-wrap">
          <Reveal>
            <p className="x-eyebrow center on-dark">Agende</p>
            <h2 className="x-h2 center" style={{ maxWidth: "20ch", margin: "18px auto 0" }}>{`Marque ${s.title.toLowerCase()}`}</h2>
            <p className="x-lead on-dark center">Escolha a área, o dia e o período. A Kamila confirma o horário pelo WhatsApp.</p>
            <div className="x-btn-row center"><AgendarButton origem={`servico_${s.slug}_final`} servico={s.slug} className="x-btn light" /></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
