// Recortes das fotos REAIS da Kamila (quadros do Instagram dela, para aprovação) + tratamento de cor único.
// Entradas em _originais/instagram (fora do git). Saída em public/espaco (AVIF e WebP). Uso: node scripts/process-espaco.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const IN = "_originais/instagram/";
const OUT = "public/espaco";
mkdirSync(OUT, { recursive: true });
const WIDTHS = [480, 800];

// left, top, width, height em pixels do arquivo original (só a pessoa, sem texto das artes)
const FOTOS = {
  retrato: { src: "ig-kamila-retrato-c.jpg", rect: [0, 70, 716, 770], bright: 0.92, sat: 1.12, lin: [1.55, -78] },
  oculos: { src: "ig-De2D2_8pfWl-a.jpg", rect: [20, 470, 1000, 780], bright: 0.95, sat: 0.9, lin: [1.05, -4] },
  sorriso: { src: "ig-Dfh3HJxJwZi-a.jpg", rect: [10, 170, 400, 640], bright: 1, sat: 0.95, lin: [1, 0] },
  jaleco: { src: "ig-DeuO01HRLIg-arte.jpg", rect: [0, 60, 640, 960], bright: 0.95, sat: 0.92, lin: [1.04, -4] },
  arlivre: { src: "ig-DfH1JMgxp9O-arte.jpg", rect: [20, 100, 590, 1060], bright: 0.95, sat: 0.9, lin: [1.04, -4] },
  hero: { src: "ig-DfH1JMgxp9O-arte.jpg", rect: [20, 70, 590, 790], bright: 0.97, sat: 0.92, lin: [1.04, -4] },
  medidas: { src: "ig-DeuMdb0xdmz-arte.jpg", rect: [940, 60, 500, 840], bright: 1, sat: 0.95, lin: [1, 0] },
};

async function build(nome, f, w) {
  const [left, top, width, height] = f.rect;
  const base = sharp(IN + f.src).extract({ left, top, width, height }).resize({ width: Math.min(w, width), withoutEnlargement: true });
  const { data, info } = await base.modulate({ brightness: f.bright, saturation: f.sat }).linear(f.lin[0], f.lin[1]).gamma(1.08).toBuffer({ resolveWithObject: true });
  const warm = await sharp({ create: { width: info.width, height: info.height, channels: 4, background: { r: 184, g: 149, b: 90, alpha: 0.14 } } }).png().toBuffer();
  const grain = await sharp({ create: { width: info.width, height: info.height, channels: 3, background: 128, noise: { type: "gaussian", mean: 128, sigma: 38 } } }).ensureAlpha(0.06).png().toBuffer();
  return sharp(data).composite([{ input: warm, blend: "soft-light" }, { input: grain, blend: "overlay" }]);
}

for (const [nome, f] of Object.entries(FOTOS)) {
  if (process.argv[2] && process.argv[2] !== nome) continue;
  for (const w of WIDTHS) {
    const img = await build(nome, f, w);
    await img.clone().avif({ quality: 52, effort: 4 }).toFile(`${OUT}/${nome}-${w}.avif`);
    await img.clone().webp({ quality: 78 }).toFile(`${OUT}/${nome}-${w}.webp`);
  }
  console.log("ok", nome);
}
