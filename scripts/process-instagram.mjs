// Quadros dos posts do Instagram da Kamila (só os aprovados em src/data/instagram.ts), em 1:1, com o mesmo tratamento de cor do site.
// Entradas em _originais/instagram (fora do git). Saída em public/instagram (AVIF e WebP). Uso: node scripts/process-instagram.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const IN = "_originais/instagram/";
const OUT = "public/instagram";
mkdirSync(OUT, { recursive: true });
const WIDTHS = [480, 800];

// left, top, width, height (quadrado) em pixels do quadro original
const FOTOS = {
  oculos: { src: "ig-De2D2_8pfWl-a.jpg", rect: [140, 470, 780, 780], bright: 0.95, sat: 0.92, lin: [1.04, -4] },
  fala: { src: "ig-DfPRk6hhjqa-b.jpg", rect: [0, 60, 1076, 1076], bright: 0.95, sat: 0.92, lin: [1.05, -6] },
  retrato: { src: "ig-kamila-retrato-c.jpg", rect: [0, 110, 716, 716], bright: 0.92, sat: 1.1, lin: [1.55, -78] },
};

async function build(f, w) {
  const [left, top, width, height] = f.rect;
  const base = sharp(IN + f.src).extract({ left, top, width, height }).resize({ width: Math.min(w, width), height: Math.min(w, height), withoutEnlargement: true });
  const { data, info } = await base.modulate({ brightness: f.bright, saturation: f.sat }).linear(f.lin[0], f.lin[1]).gamma(1.08).toBuffer({ resolveWithObject: true });
  const warm = await sharp({ create: { width: info.width, height: info.height, channels: 4, background: { r: 184, g: 149, b: 90, alpha: 0.14 } } }).png().toBuffer();
  const grain = await sharp({ create: { width: info.width, height: info.height, channels: 3, background: 128, noise: { type: "gaussian", mean: 128, sigma: 38 } } }).ensureAlpha(0.06).png().toBuffer();
  return sharp(data).composite([{ input: warm, blend: "soft-light" }, { input: grain, blend: "overlay" }]);
}

for (const [nome, f] of Object.entries(FOTOS)) {
  for (const w of WIDTHS) {
    const img = await build(f, w);
    await img.clone().avif({ quality: 52, effort: 4 }).toFile(`${OUT}/${nome}-${w}.avif`);
    await img.clone().webp({ quality: 78 }).toFile(`${OUT}/${nome}-${w}.webp`);
  }
  console.log("ok", nome);
}
