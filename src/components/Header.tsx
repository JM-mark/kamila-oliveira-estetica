"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { NAV } from "@/content/site";
import { asset } from "@/lib/asset";

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="header">
      <div className="wrap bar">
        <Link href="/" aria-label="Kamila Oliveira Estética, página inicial" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo" src={asset("/brand/kamila-horizontal-positivo.svg")} alt="Kamila Oliveira Estética" width={190} height={38} />
        </Link>
        <nav className="nav-links" aria-label="Principal">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}>{n.label}</Link>
          ))}
          <Link className="btn" href="/agendar/" style={{ minHeight: 44, padding: "0 20px", color: "var(--creme)" }}>Agendar</Link>
        </nav>
        <button className="menu-btn" aria-expanded={open} aria-controls="menu-movel" onClick={() => setOpen(!open)}>
          {open ? "Fechar" : "Menu"}
        </button>
      </div>
      <nav id="menu-movel" className={`mobile-nav ${open ? "open" : ""}`} aria-label="Menu">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>
        ))}
        <Link className="btn" href="/agendar/" onClick={() => setOpen(false)}>Agendar horário</Link>
      </nav>
    </header>
  );
}
