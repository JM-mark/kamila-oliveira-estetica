import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { bySlug } from "@/content/services";

const s = bySlug("limpeza-de-pele");

export const metadata: Metadata = {
  title: s.seoTitle,
  description: s.seoDescription,
  alternates: { canonical: "/limpeza-de-pele/" },
};

export default function Page() {
  return <ServicePage s={s} />;
}
