"use client";

import { track } from "@/lib/track";
import { waLink, WA_DEFAULT } from "@/lib/wa";

type Props = {
  label?: string;
  message?: string;
  origem: string;
  className?: string;
};

export default function WaButton({ label = "Agendar pelo WhatsApp", message = WA_DEFAULT, origem, className = "btn" }: Props) {
  return (
    <a
      className={className}
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("clique_whatsapp", { origem })}
    >
      {label}
    </a>
  );
}
