"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV } from "@/content/site";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => {
    if (!open) return;
    const f = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [open]);
  return (
    <header className="header">
      <div className="wrap bar">
        <Link href="/" aria-label="Kamila Oliveira Estética, página inicial" onClick={() => setOpen(false)}>
          <Logo height={40} />
        </Link>
        <nav className="nav-links" aria-label="Principal">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}>{n.label}</Link>
          ))}
          <Link className="btn" href="/agendar/">Agendar</Link>
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
