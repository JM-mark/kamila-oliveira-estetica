import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { bySlug } from "@/content/services";

const s = bySlug("depilacao-a-laser");

export const metadata: Metadata = {
  title: s.seoTitle,
  description: s.seoDescription,
  alternates: { canonical: "/depilacao-a-laser/" },
};

export default function Page() {
  return <ServicePage s={s} />;
}
