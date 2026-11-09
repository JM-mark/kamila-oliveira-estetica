import { asset } from "@/lib/asset";

type Props = {
  /** nome base gerado por scripts/process-photos.mjs ou process-espaco.mjs (ex.: "laser") */
  name: string;
  /** pasta em /public: "photos" (atmosfera) ou "espaco" (fotos reais da Kamila) */
  dir?: "photos" | "espaco" | "instagram";
  widths?: number[];
  alt?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
};

/** Foto tratada, em AVIF e WebP com srcset. Sem texto alternativo ela é decorativa. */
export default function Photo({ name, dir = "photos", widths, alt = "", sizes = "100vw", className, priority = false, style }: Props) {
  const ws = widths ?? (dir === "photos" ? [480, 800, 1280, 1920] : [480, 800]);
  const mid = dir === "photos" ? 1280 : ws[ws.length - 1];
  const set = (ext: string) => ws.map((w) => `${asset(`/${dir}/${name}-${w}.${ext}`)} ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={asset(`/${dir}/${name}-${mid}.webp`)}
        alt={alt}
        aria-hidden={alt ? undefined : true}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        style={style}
      />
    </picture>
  );
}
