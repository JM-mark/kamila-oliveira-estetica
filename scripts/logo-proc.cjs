// Limpa o fundo do logo da Kamila (arquivo da página de agendamento) sem redesenhar: só alfa por luminância, recorte e versões de cor.
const sharp = require("E:/Kamila Oliveira Estetica - Site/node_modules/sharp");
const potrace = require("E:/Kamila Oliveira Estetica - Site/node_modules/potrace");
const fs = require("fs");
const R = "E:/Kamila Oliveira Estetica - Site/";
const SRC = R + "_originais/instagram/logo-agenda.jpeg";
const OUT = R + "_originais/logo/"; // PNGs mestres (fora do site)
const WEB = R + "public/brand/";
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(WEB, { recursive: true });

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

async function transparent(scale, tone) {
  const base = sharp(SRC).resize(Math.round(512 * scale), Math.round(512 * scale), { kernel: "lanczos3" }).removeAlpha();
  const { data, info } = await base.raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const mx = Math.max(r, g, b);
    const a = smooth(14, 80, mx);
    let rr = a > 0 ? Math.min(255, (r / (mx || 1)) * Math.min(255, mx / Math.max(a, 0.001) )) : 0;
    let gg = a > 0 ? Math.min(255, (g / (mx || 1)) * Math.min(255, mx / Math.max(a, 0.001))) : 0;
    let bb = a > 0 ? Math.min(255, (b / (mx || 1)) * Math.min(255, mx / Math.max(a, 0.001))) : 0;
    if (tone === "claro") { // ouro profundo para fundo claro: mesma forma, cor plana entre dois tons de ouro (sem manchas dos brilhos)
      const l = Math.min(1, (0.3 * rr + 0.59 * gg + 0.11 * bb) / 230);
      rr = 104 + (156 - 104) * l; gg = 78 + (123 - 78) * l; bb = 30 + (53 - 30) * l;
    }
    out[j] = rr; out[j + 1] = gg; out[j + 2] = bb; out[j + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } });
}

(async () => {
  for (const tone of ["escuro", "claro"]) {
    const full = await transparent(2, tone); // 1024 px
    const buf = await full.png().toBuffer();
    const trimmed = await sharp(buf).trim({ threshold: 4 }).png().toBuffer();
    const m = await sharp(trimmed).metadata();
    fs.writeFileSync(OUT + `kamila-logo-${tone}.png`, trimmed);
    // recortes: borboleta+K (parte de cima) e assinatura em cursiva (parte de baixo), em coordenadas do logo trimado
    const markH = Math.round(m.height * 0.792);
    const mark = await sharp(trimmed).extract({ left: 0, top: 0, width: m.width, height: markH }).trim({ threshold: 4 }).png().toBuffer();
    fs.writeFileSync(OUT + `kamila-mark-${tone}.png`, mark);
    const script = await sharp(trimmed).extract({ left: 0, top: Math.round(m.height * 0.815), width: m.width, height: m.height - Math.round(m.height * 0.815) }).trim({ threshold: 4 }).png().toBuffer();
    fs.writeFileSync(OUT + `kamila-script-${tone}.png`, script);
    const mm = await sharp(mark).metadata();
    console.log(tone, "logo", m.width + "x" + m.height, "mark", mm.width + "x" + mm.height);
  }
  // WebP nos tamanhos usados no site (2x do tamanho exibido)
  const SIZES = { "kamila-mark": [160, 320], "kamila-script": [420, 840], "kamila-logo": [480, 960] };
  for (const tone of ["escuro", "claro"]) {
    for (const [nome, ws] of Object.entries(SIZES)) {
      for (const w of ws) {
        await sharp(OUT + `${nome}-${tone}.png`).resize({ width: w }).webp({ quality: 90, alphaQuality: 100 }).toFile(WEB + `${nome}-${tone}-${w}.webp`);
      }
    }
  }

  // vetor do monograma (borboleta + K) para o preloader: potrace sobre o recorte, preto sobre branco
  const markBuf = await sharp(OUT + "kamila-mark-escuro.png").resize({ width: 700 }).flatten({ background: "#000" }).negate().greyscale().png().toBuffer();
  const svgPath = await new Promise((res, rej) => potrace.trace(markBuf, { threshold: 150, turdSize: 4, optTolerance: 0.3, blackOnWhite: true }, (e, s) => (e ? rej(e) : res(s))));
  const d = svgPath.match(/ d="([^"]+)"/)[1];
  const vb = svgPath.match(/viewBox="([^"]+)"/)[1];
  fs.writeFileSync(R + "src/content/logo-path.ts", `// Traço vetorial da borboleta com K (logo da Kamila), gerado por scripts/logo-proc.cjs para a animação do preloader. Não editar à mão.\nexport const LOGO_VIEWBOX = "${vb}";\nexport const LOGO_PATH = "${d}";\n`);
  console.log("potrace ok", vb, d.length);

  // ícones e imagem de compartilhamento
  const markBig = await sharp(OUT + "kamila-mark-escuro.png").resize({ width: 380, height: 380, fit: "inside" }).png().toBuffer();
  const icon = (size, pad, radius) => sharp({ create: { width: size, height: size, channels: 4, background: "#0F0D0B" } }).composite([{ input: null }].slice(1));
  async function squareIcon(size, file) {
    const inner = Math.round(size * 0.72);
    const m = await sharp(OUT + "kamila-mark-escuro.png").resize({ width: inner, height: inner, fit: "inside" }).png().toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background: "#0F0D0B" } }).composite([{ input: m, gravity: "center" }]).png().toFile(file);
  }
  await squareIcon(180, R + "src/app/apple-icon.png");
  await squareIcon(192, R + "src/app/icon.png");
  const bg = await sharp(R + "public/photos/marmore-1920.webp").resize(1200, 630, { fit: "cover" }).modulate({ brightness: 0.7 }).toBuffer();
  const logo = await sharp(OUT + "kamila-logo-escuro.png").resize({ height: 440, fit: "inside" }).png().toBuffer();
  await sharp(bg).composite([{ input: logo, gravity: "center" }]).png({ compressionLevel: 9 }).toFile(R + "public/og.png");
  console.log("icones e og ok");
})().catch((e) => { console.error(e); process.exit(1); });
