import { asset } from "@/lib/asset";

const WIDTHS = [480, 800, 1280, 1920];

type Props = {
  /** nome base gerado por scripts/process-photos.mjs (ex.: "laser") */
  name: string;
  alt?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
};

/** Foto tratada, em AVIF e WebP com srcset. Sem texto alternativo ela é decorativa. */
export default function Photo({ name, alt = "", sizes = "100vw", className, priority = false, style }: Props) {
  const set = (ext: string) => WIDTHS.map((w) => `${asset(`/photos/${name}-${w}.${ext}`)} ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={asset(`/photos/${name}-1280.webp`)}
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
