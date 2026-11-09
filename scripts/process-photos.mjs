// Trata as fotos de atmosfera com UMA direção de cor (quente, preto profundo, realce dourado suave, grão fino)
// e gera AVIF + WebP em vários tamanhos em public/photos. Originais em _originais/ (fora do git).
// Uso: node scripts/process-photos.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const OUT = "public/photos";
mkdirSync(OUT, { recursive: true });
const WIDTHS = [480, 800, 1280, 1920];

// nome de saída -> arquivo original, brilho e (opcional) posição do recorte
const FOTOS = {
  laser: { src: "_originais/photo-37078056.jpg", brightness: 0.8, sat: 0.78, warm: 0.3 },
  pele: { src: "_originais/photo-9253769.jpg", brightness: 0.72, sat: 0.7, warm: 0.34 },
  corpo: { src: "_originais/photo-20469562.jpg", brightness: 0.82, sat: 0.85 },
  relaxamento: { src: "_originais/photo-6417924.jpg", brightness: 0.68, sat: 0.62, warm: 0.42 },
  marmore: { src: "_originais/photo-6788338.jpg", brightness: 0.55, sat: 0.55 },
  marmore2: { src: "_originais/photo-36327398.jpg", brightness: 0.4, sat: 0.2 },
};

async function grade(file, w, { brightness, sat, warm: warmA = 0.2 }) {
  const base = sharp(file).rotate().resize({ width: w, withoutEnlargement: true });
  const { data, info } = await base.modulate({ brightness, saturation: sat }).gamma(1.15).toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  const warm = await sharp({ create: { width: W, height: H, channels: 4, background: { r: 184, g: 149, b: 90, alpha: warmA } } }).png().toBuffer();
  const grain = await sharp({ create: { width: W, height: H, channels: 3, background: 128, noise: { type: "gaussian", mean: 128, sigma: 38 } } }).ensureAlpha(0.07).png().toBuffer();
  return sharp(data).composite([{ input: warm, blend: "soft-light" }, { input: grain, blend: "overlay" }]);
}

for (const [nome, cfg] of Object.entries(FOTOS)) {
  for (const w of WIDTHS) {
    const img = await grade(cfg.src, w, cfg);
    await img.clone().avif({ quality: 48, effort: 4 }).toFile(`${OUT}/${nome}-${w}.avif`);
    await img.clone().webp({ quality: 70 }).toFile(`${OUT}/${nome}-${w}.webp`);
  }
  console.log("ok", nome);
}
