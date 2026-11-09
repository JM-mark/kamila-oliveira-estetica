"use client";

import { track } from "@/lib/track";
import { waLink, WA_DEFAULT } from "@/lib/wa";

export default function WaFloat() {
  return (
    <a
      className="wa-float"
      href={waLink(WA_DEFAULT)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar pelo WhatsApp"
      onClick={() => track("clique_whatsapp", { origem: "botao_flutuante" })}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M5 3h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      </svg>
      Agendar
    </a>
  );
}
