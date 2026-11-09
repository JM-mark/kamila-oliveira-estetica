import { asset } from "@/lib/asset";

/** Espaço de foto. Com `src` mostra a foto real aprovada; sem foto, mostra luz e o monograma (nunca foto de banco como cliente). */
export default function PhotoSlot({ src, alt = "" }: { src?: string; alt?: string }) {
  return (
    <div className="photo-slot" role={src ? undefined : "presentation"}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="photo" src={asset(src)} alt={alt} loading="lazy" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset("/brand/kamila-monograma-negativo.svg")} alt="" aria-hidden="true" />
      )}
    </div>
  );
}
