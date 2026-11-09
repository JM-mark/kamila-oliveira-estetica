import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">Erro 404</p>
        <h1 style={{ marginBottom: 16 }}>Página não encontrada</h1>
        <p className="lead">O endereço que você abriu não existe. Volte para o início e escolha o que procura.</p>
        <div className="btn-row"><Link className="btn" href="/">Voltar ao início</Link></div>
      </div>
    </section>
  );
}
