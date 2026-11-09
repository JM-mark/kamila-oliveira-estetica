import type { Service } from "@/content/services";
import Arch from "./Arch";
import Reveal from "./Reveal";
import WaButton from "./WaButton";
import Link from "next/link";

export default function ServicePage({ s }: { s: Service }) {
  const msg = `Olá! Vim pelo site e gostaria de agendar: ${s.title}.`;
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Santa Amélia · Pampulha · Belo Horizonte</p>
            <h1 style={{ maxWidth: "13ch" }}>{s.title}</h1>
            <p className="lead">{s.intro}</p>
            <div className="btn-row">
              <WaButton origem={`servico_${s.slug}_hero`} message={msg} />
              <Link className="btn ghost" href={`/agendar/?servico=${s.slug}`}>Montar meu pedido</Link>
            </div>
          </div>
          <Arch />
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">O que você encontra aqui</p>
            <h2>{s.title}</h2>
            <ul className="list">
              {s.items.map((i) => (<li key={i}><span>{i}</span></li>))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap split">
          <div>
            <p className="eyebrow">Próximo passo</p>
            <h2>Conte o que você procura</h2>
            <p className="lead">Escolha o serviço, diga o dia e o período que prefere e a gente confirma o horário pelo WhatsApp.</p>
            <div className="btn-row">
              <WaButton className="btn light" origem={`servico_${s.slug}_final`} message={msg} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
