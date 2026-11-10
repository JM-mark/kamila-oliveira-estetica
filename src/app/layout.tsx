import type { Metadata, Viewport } from "next";
import { Gilda_Display, Marcellus, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Cursor from "@/components/Cursor";
import Intro from "@/components/Intro";
import Magnetic from "@/components/Magnetic";
import { NavReady } from "@/components/PageCurtain";
import { ENDERECO, ENDERECO_CONFIRMADO, HORARIO, HORARIO_CONFIRMADO, HORARIO_SCHEMA, SITE } from "@/content/site";

const display = Gilda_Display({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const label = Marcellus({ subsets: ["latin"], weight: "400", variable: "--font-label", display: "swap" });
const body = Schibsted_Grotesk({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-body", display: "swap" });

export const viewport: Viewport = { themeColor: "#0f0d0b", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: { default: "Kamila Oliveira Estética | Estética na Pampulha, BH", template: "%s" },
  description:
    "Depilação a laser, limpeza de pele e protocolos corporais em Santa Amélia, região da Pampulha, Belo Horizonte. Agende pelo WhatsApp.",
  robots: SITE.indexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
    title: "Kamila Oliveira Estética | Estética na Pampulha, BH",
    description: "Depilação a laser, limpeza de pele e protocolos corporais em Santa Amélia, Pampulha, Belo Horizonte.",
    images: [{ url: "og.png", width: 1200, height: 630, alt: "Kamila Oliveira Estética" }],
  },
  twitter: { card: "summary_large_image", images: ["og.png"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": `${SITE.siteUrl.replace(/\/$/, "")}/#salao`,
  name: SITE.name,
  url: SITE.siteUrl,
  // Telefone, endereço e horário conferidos no Perfil do Google (10/11/2026); TODO a Kamila confirmar. Sem aggregateRating (só 2 avaliações).
  telephone: `+${SITE.whatsapp}`,
  image: `${SITE.siteUrl.replace(/\/$/, "")}/og.png`,
  geo: { "@type": "GeoCoordinates", latitude: -19.8443881, longitude: -43.9768662 },
  hasMap: SITE.googlePerfil,
  address: { "@type": "PostalAddress", addressLocality: SITE.city, addressRegion: SITE.region, addressCountry: "BR", ...(ENDERECO_CONFIRMADO && ENDERECO ? { streetAddress: ENDERECO } : {}) },
  ...(HORARIO_CONFIRMADO && HORARIO ? { openingHours: HORARIO_SCHEMA } : {}),
  areaServed: `${SITE.neighborhood}, ${SITE.area}, ${SITE.city}`,
  sameAs: [SITE.instagram, SITE.googlePerfil],
};

// Liga a intro só na 1ª visita da sessão, sem movimento reduzido e sem conexão lenta ou economia de dados.
const introScript =
  "try{var c=navigator.connection;var slow=c&&(c.saveData||/(^|-)2g$/.test(c.effectiveType||''));" +
  "if(!sessionStorage.getItem('ko-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!slow){document.documentElement.setAttribute('data-intro','1')}}catch(e){}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${label.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {SITE.gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${SITE.gaId}');` }} />
          </>
        ) : null}
      </head>
      <body>
        <Intro />
        <Cursor />
        <Magnetic />
        <NavReady />
        <a className="skip" href="#conteudo">Ir para o conteúdo</a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WaFloat />
      </body>
    </html>
  );
}
