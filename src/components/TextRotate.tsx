"use client";

import { useEffect, useState } from "react";

/** Palavras girando no subtítulo. Leitor de tela e movimento reduzido veem a lista fixa. */
export default function TextRotate({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span className="rot" aria-hidden="true" key={i} style={{ display: "inline-block", animation: "fadeUp .5s var(--ease)" }}>{words[i]}</span>
    </>
  );
}
