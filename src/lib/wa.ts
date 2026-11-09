import { SITE } from "@/content/site";

export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const WA_DEFAULT = "Olá! Vim pelo site e gostaria de agendar um horário.";
