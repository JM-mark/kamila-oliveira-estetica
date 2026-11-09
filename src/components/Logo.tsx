import { asset } from "@/lib/asset";

type Props = {
  /** lockup = borboleta com K e assinatura (arquivo da cliente); horizontal = borboleta ao lado da assinatura (cabeçalho e rodapé); mark = só a borboleta com K */
  variant?: "lockup" | "horizontal" | "mark";
  /** escuro = para fundo escuro; claro = para fundo claro */
  tone?: "escuro" | "claro";
  height: number;
  className?: string;
};

// LOGO PROVISÓRIO (decisão do Jeff, 09/11/2026): é o logo atual da Kamila, extraído da página de agendamento dela (512 px).
// Só foi limpo o fundo e recortado; nada foi redesenhado. TODO logo-original: trocar o arquivo em _originais/logo e rodar
// scripts/logo-proc.cjs quando ela enviar o original. Todas as páginas usam este componente.
const SIZES: Record<string, number[]> = { "kamila-mark": [160, 320], "kamila-script": [420, 840], "kamila-logo": [480, 960] };
const RATIO: Record<string, number> = { "kamila-mark": 652 / 483, "kamila-script": 5.76, "kamila-logo": 652 / 610 };

function Img({ nome, tone, h, alt }: { nome: string; tone: string; h: number; alt: string }) {
  const w = Math.round(h * RATIO[nome]);
  const list = SIZES[nome];
  const src = list.find((x) => x >= w * 1.6) ?? list[list.length - 1];
  const set = list.map((x) => `${asset(`/brand/${nome}-${tone}-${x}.webp`)} ${x}w`).join(", ");
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={asset(`/brand/${nome}-${tone}-${src}.webp`)} srcSet={set} sizes={`${w}px`} alt={alt} width={w} height={h} style={{ height: h, width: "auto", display: "block" }} />
  );
}

export default function Logo({ variant = "lockup", tone = "escuro", height, className }: Props) {
  if (variant === "mark") return <span className={className}><Img nome="kamila-mark" tone={tone} h={height} alt="Kamila Oliveira Estética" /></span>;
  if (variant === "lockup") return <span className={className}><Img nome="kamila-logo" tone={tone} h={height} alt="Kamila Oliveira Estética" /></span>;
  // horizontal: a borboleta com K e a assinatura lado a lado, com as peças originais
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: Math.round(height * 0.22) }} role="img" aria-label="Kamila Oliveira Estética">
      <Img nome="kamila-mark" tone={tone} h={height} alt="" />
      <Img nome="kamila-script" tone={tone} h={Math.round(height * 0.5)} alt="" />
    </span>
  );
}
