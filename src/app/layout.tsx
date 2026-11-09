import type { Metadata, Viewport } from "next";
import { Newsreader, Albert_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import { SITE } from "@/content/site";

const display = Newsreader({ subsets: ["latin"], style: ["italic"], weight: ["400", "500"], variable: "--font-display", display: "swap" });
const body = Albert_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });

export const viewport: Viewport = { themeColor: "#faf5ef", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: { default: "Kamila Oliveira Estética | Estética na Pampulha, BH", template: "%s" },
  description:
    "Depilação a laser, limpeza de pele e protocolos corporais em Santa Amélia, região da Pampulha, Belo Horizonte. Agende pelo WhatsApp.",
  robots: SITE.indexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: "website", locale: "pt_BR", siteName: SITE.name },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: SITE.name,
  address: { "@type": "PostalAddress", addressLocality: SITE.city, addressRegion: SITE.region, addressCountry: "BR" },
  areaServed: `${SITE.neighborhood}, ${SITE.area}, ${SITE.city}`,
  sameAs: [SITE.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {SITE.gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${SITE.gaId}');` }} />
          </>
        ) : null}
      </head>
      <body>
        <a className="skip" href="#conteudo">Ir para o conteúdo</a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WaFloat />
      </body>
    </html>
  );
}
