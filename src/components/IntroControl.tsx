"use client";

import { useEffect } from "react";

/** Marca a intro como vista na sessão e deixa pular com clique ou tecla. */
export default function IntroControl() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-intro") !== "1") return;
    try { sessionStorage.setItem("ko-intro", "1"); } catch { /* sem armazenamento: a intro só repete */ }
    const done = () => root.setAttribute("data-intro", "done");
    const t = setTimeout(done, Math.max(0, 1300 - performance.now()));
    window.addEventListener("pointerdown", done, { once: true });
    window.addEventListener("keydown", done, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("pointerdown", done);
      window.removeEventListener("keydown", done);
    };
  }, []);
  return null;
}
