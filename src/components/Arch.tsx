import { asset } from "@/lib/asset";

/** Moldura em arco (forma do logo). Com `src` mostra a foto real aprovada; sem foto, mostra o monograma. */
export default function Arch({ src, alt = "", tone = "nevoa" }: { src?: string; alt?: string; tone?: "nevoa" | "malva" }) {
  return (
    <div className={`arch ${tone === "malva" ? "malva" : ""}`} role={src ? undefined : "presentation"}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="photo" src={asset(src)} alt={alt} loading="lazy" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="ko" src={asset(tone === "malva" ? "/brand/kamila-monograma-negativo.svg" : "/brand/kamila-monograma-positivo.svg")} alt="" aria-hidden="true" />
      )}
    </div>
  );
}
