import { asset } from "@/lib/asset";

type Props = {
  /** horizontal (topo e rodapé), vertical (capa), mono (selo KO) */
  variant?: "horizontal" | "vertical" | "mono";
  /** negativo = sobre fundo escuro; positivo = sobre fundo claro */
  tone?: "negativo" | "positivo";
  height: number;
  className?: string;
};

// Logo PROVISÓRIO: composição tipográfica da prévia. Decisão do Jeff (09/11/2026): usar o logo atual da Kamila
// (perfil do Instagram) assim que o arquivo original chegar, e depois a marca final do /brand.
// TODO logo-original: trocar os arquivos em /public/brand (mesmos nomes) e este é o único componente a mudar.
const RATIO = { horizontal: 714 / 99, vertical: 311 / 301, mono: 1 } as const;
const FILE = {
  horizontal: "kamila-horizontal",
  vertical: "kamila-vertical",
  mono: "kamila-monograma",
} as const;

export default function Logo({ variant = "horizontal", tone = "negativo", height, className }: Props) {
  const ratio = variant === "horizontal" ? 677 / 139 : RATIO[variant];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={asset(`/brand/${FILE[variant]}-${tone}.svg`)}
      alt="Kamila Oliveira Estética"
      width={Math.round(height * ratio)}
      height={height}
      style={{ height, width: "auto", display: "block" }}
    />
  );
}
