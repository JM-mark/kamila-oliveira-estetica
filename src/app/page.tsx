import type { Metadata } from "next";
import Link from "next/link";
import Arch from "@/components/Arch";
import Reveal from "@/components/Reveal";
import WaButton from "@/components/WaButton";
import { SERVICES } from "@/content/services";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Estética na Pampulha, BH: laser e limpeza de pele | Kamila Oliveira",
  description:
    "Depilação a laser, limpeza de pele e protocolos corporais em Santa Amélia, região da Pampulha, em Belo Horizonte. Agende pelo WhatsApp.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Estética facial e corporal · {SITE.neighborhood}, {SITE.area}</p>
            <h1>Cuidado sofisticado, perto de você.</h1>
            <p className="lead">Depilação a laser, limpeza de pele e protocolos corporais em {SITE.city}.</p>
            <div className="btn-row">
              <WaButton origem="home_hero" />
              <Link className="btn ghost" href="/depilacao-a-laser/">Ver serviços</Link>
            </div>
          </div>
          <Arch />
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Serviços</p>
            <h2>Escolha por onde começar</h2>
          </Reveal>
          <Reveal>
            <div className="grid cards-3" style={{ marginTop: 36 }}>
              {SERVICES.map((s, i) => (
                <Link key={s.slug} href={`/${s.slug}/`} className="card">
                  <span className="num">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                  <span className="more">Ver detalhes →</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Como agendar</p>
            <h2>Três passos, sem formulário longo</h2>
            <ol className="steps" style={{ padding: 0 }}>
              <li><strong>Escolha o serviço</strong><span>Laser, pele ou corpo, e a área ou o pacote que você quer.</span></li>
              <li><strong>Diga o dia e o período</strong><span>Informe quando prefere vir. Pode ser manhã, tarde ou noite.</span></li>
              <li><strong>Confirme pelo WhatsApp</strong><span>Seu pedido chega pronto e a gente confirma o horário com você.</span></li>
            </ol>
            <div className="btn-row">
              <Link className="btn" href="/agendar/">Montar meu pedido</Link>
              <WaButton className="btn ghost" label="Falar no WhatsApp" origem="home_como_agendar" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap split">
          <Arch tone="malva" />
          <Reveal>
            <p className="eyebrow">Sobre a Kamila</p>
            <p className="quote">Luxo é se sentir bem todos os dias.</p>
            <p className="lead" style={{ marginTop: 22 }}>
              Kamila Oliveira atende em {SITE.neighborhood}, na região da {SITE.area}. Entre os serviços está a Lipo com as mãos, protocolo manual criado por ela.
            </p>
            <div className="btn-row"><Link className="btn ghost" href="/sobre/">Conhecer a Kamila</Link></div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap split rev">
          <Reveal>
            <p className="eyebrow">Onde estamos</p>
            <h2>{SITE.neighborhood}, região da {SITE.area}</h2>
            <p className="lead">Atendimento em {SITE.city}, perto de casa para quem mora ou trabalha na {SITE.area}. Peça o endereço completo pelo WhatsApp.</p>
            <div className="btn-row">
              <WaButton label="Pedir o endereço" message="Olá! Vim pelo site e gostaria de saber o endereço." origem="home_local" />
            </div>
          </Reveal>
          <Arch />
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Agende</p>
            <h2 style={{ maxWidth: "16ch" }}>Seu horário começa numa mensagem</h2>
            <p className="lead">Diga o que você procura e a gente confirma o dia e o período com você.</p>
            <div className="btn-row">
              <WaButton className="btn light" origem="home_final" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
