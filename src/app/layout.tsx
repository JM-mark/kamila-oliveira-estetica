import type { Metadata, Viewport } from "next";
import { Gilda_Display, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaFloat from "@/components/WaFloat";
import Intro from "@/components/Intro";
import { SITE } from "@/content/site";

const display = Gilda_Display({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const body = Schibsted_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });

export const viewport: Viewport = { themeColor: "#0f0d0b", width: "device-width", initialScale: 1 };

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

// Liga a intro só na 1ª visita da sessão, sem movimento reduzido e sem conexão lenta ou economia de dados.
const introScript =
  "try{var c=navigator.connection;var slow=c&&(c.saveData||/(^|-)2g$/.test(c.effectiveType||''));" +
  "if(!sessionStorage.getItem('ko-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!slow){document.documentElement.setAttribute('data-intro','1')}}catch(e){}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
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
        <a className="skip" href="#conteudo">Ir para o conteúdo</a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WaFloat />
      </body>
    </html>
  );
}
