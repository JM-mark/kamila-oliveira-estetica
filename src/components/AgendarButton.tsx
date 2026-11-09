"use client";

import Link from "next/link";
import { track } from "@/lib/track";

type Props = {
  label?: string;
  /** serviço já preenchido no agendamento (slug) */
  servico?: string;
  origem: string;
  className?: string;
};

/** Todo botão "Agendar" do site leva a /agendar/ (o fluxo em 4 etapas). "Falar no WhatsApp" é outro botão e vai direto ao WhatsApp. */
export default function AgendarButton({ label = "Agendar", servico, origem, className = "btn" }: Props) {
  return (
    <Link
      className={className}
      href={servico ? `/agendar/?servico=${servico}` : "/agendar/"}
      onClick={() => track("clique_agenda", { origem, ...(servico ? { servico } : {}) })}
    >
      {label}
    </Link>
  );
}
