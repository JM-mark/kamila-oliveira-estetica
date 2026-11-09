"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AuroraCanvas = dynamic(() => import("./AuroraCanvas"), { ssr: false });

/** Carrega o shader Aurora só depois do primeiro paint e da página ficar ociosa, para não competir com o LCP. */
export function AuroraLazy() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const start = () => { t = setTimeout(() => { if (idle) idle(() => setOn(true), { timeout: 2500 }); else setOn(true); }, window.matchMedia("(max-width: 900px)").matches ? 4200 : 1200); };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => { window.removeEventListener("load", start); if (t) clearTimeout(t); };
  }, []);
  return on ? <AuroraCanvas /> : null;
}
