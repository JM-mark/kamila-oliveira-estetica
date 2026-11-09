const ITEMS = ["Depilação a laser", "Limpeza de pele", "Lipo com as mãos", "Drenagem", "Pampulha", "BH"];

/** Faixa lenta em Marcellus. Decorativa (o mesmo conteúdo está nos serviços); com movimento reduzido fica parada. */
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {[0, 1].map((k) => (
          <ul key={k}>
            {ITEMS.map((i) => (<li key={i}>{i}</li>))}
          </ul>
        ))}
      </div>
    </div>
  );
}
