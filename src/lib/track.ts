type GtagWindow = Window & { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] };

/** Evento GA4. Sem GA4 configurado (NEXT_PUBLIC_GA_ID vazio), não faz nada. */
export function track(event: "clique_whatsapp" | "clique_agenda", params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  if (typeof w.gtag === "function") w.gtag("event", event, params);
}
