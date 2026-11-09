import Link from "next/link";
import { asset } from "@/lib/asset";
import type { Service } from "@/content/services";
import GoldFrame from "./GoldFrame";
import Photo from "./Photo";
import Reveal from "./Reveal";
import WaButton from "./WaButton";

export default function ServicePage({ s }: { s: Service }) {
  const msg = `Olá! Vim pelo site e gostaria de agendar: ${s.title}.`;
  return (
    <>
      <section className="hero-dark">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Santa Amélia · Pampulha · Belo Horizonte</p>
            <h1>{s.title}</h1>
            <p className="lead">{s.intro}</p>
            <div className="btn-row">
              <WaButton origem={`servico_${s.slug}_hero`} message={msg} label="Agendar pelo WhatsApp" />
              <Link className="btn ghost" href={`/agendar/?servico=${s.slug}`}>Montar meu pedido</Link>
            </div>
          </div>
          <GoldFrame><div className="in photo-box" data-cursor="ver"><Photo name={s.photo} priority sizes="(min-width: 900px) 40vw, 90vw" /></div></GoldFrame>
        </div>
      </section>

      <section className="section dark marble" style={{ paddingTop: 0, ["--bg" as string]: `url(${asset("/photos/marmore2-1280.webp")})` }}>
        <div className="wrap">
          <Reveal>
            <hr className="gold-rule" />
            <p className="eyebrow">O que você encontra aqui</p>
            <h2>{s.title}</h2>
            <ul className="list">
              {s.items.map((i) => (<li key={i}>{i}</li>))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section sand">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Próximo passo</p>
            <h2 style={{ maxWidth: "18ch" }}>Conte o que você procura</h2>
            <p className="lead" style={{ marginTop: 14 }}>Escolha o serviço, diga o dia e o período que prefere e a gente confirma o horário pelo WhatsApp.</p>
            <div className="btn-row">
              <WaButton origem={`servico_${s.slug}_final`} message={msg} label="Agendar pelo WhatsApp" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
