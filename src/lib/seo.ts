import { SITE } from "@/content/site";

/** Canonical só na produção (domínio oficial). Na prévia, nenhum canonical para não apontar para o domínio errado. */
export const canon = (path: string) => (SITE.indexable ? { canonical: path } : undefined);
