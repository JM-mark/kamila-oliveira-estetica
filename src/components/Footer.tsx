import Link from "next/link";
import { NAV, SITE } from "@/content/site";
import Logo from "./Logo";
import WaButton from "./WaButton";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="cols">
          <div>
            <div style={{ marginBottom: 18 }}><Logo variant="horizontal" height={56} /></div>
            <p>Estética facial e corporal em {SITE.neighborhood}, região da {SITE.area}, {SITE.city}.</p>
          </div>
          <div>
            <h2>Páginas</h2>
            <ul>
              {NAV.map((n) => (<li key={n.href}><Link href={n.href}>{n.label}</Link></li>))}
              <li><Link href="/privacidade/">Política de privacidade</Link></li>
            </ul>
          </div>
          <div>
            <h2>Fale com a gente</h2>
            <ul>
              <li><WaButton className="btn light" origem="rodape" label="Agendar pelo WhatsApp" /></li>
              <li><a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram {SITE.instagramHandle}</a></li>
            </ul>
          </div>
        </div>
        <p className="small">© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
