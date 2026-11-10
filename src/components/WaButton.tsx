"use client";

import { track } from "@/lib/track";
import { Roll } from "./motion/primitives";
import { waLink, WA_DEFAULT } from "@/lib/wa";

type Props = {
  label?: string;
  message?: string;
  origem: string;
  className?: string;
};

export default function WaButton({ label = "Falar no WhatsApp", message = WA_DEFAULT, origem, className = "x-btn dark" }: Props) {
  return (
    <a
      className={className}
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("clique_whatsapp", { origem })}
    >
      <Roll>{label}</Roll>
    </a>
  );
}
