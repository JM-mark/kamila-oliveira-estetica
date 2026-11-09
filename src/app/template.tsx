/** Transição suave entre páginas: só opacidade, sem transform (não atrapalha sticky). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
