import type { Metadata } from "next";
import { canon } from "@/lib/seo";
import ServicePage from "@/components/ServicePage";
import { bySlug } from "@/content/services";

const s = bySlug("depilacao-a-laser");

export const metadata: Metadata = {
  title: s.seoTitle,
  description: s.seoDescription,
  alternates: canon("/depilacao-a-laser/"),
};

export default function Page() {
  return <ServicePage s={s} />;
}
