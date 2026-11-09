"use client";

import Link from "next/link";
import { track } from "@/lib/track";

/** Botão flutuante do celular: leva ao agendamento (o fluxo termina no WhatsApp). */
export default function WaFloat() {
  return (
    <Link className="wa-float" href="/agendar/" aria-label="Agendar" onClick={() => track("clique_agenda", { origem: "botao_flutuante" })}>
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M5 3h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      </svg>
      Agendar
    </Link>
  );
}
