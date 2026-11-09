// Build para o Cloudflare Pages (upload direto de zip): sem basePath, domínio <projeto>.pages.dev, noindex enquanto a revisão do cliente durar.
// Uso: node scripts/build-cloudflare.mjs            (projeto "kamila-oliveira-estetica")
//      CF_PROJECT=outro-nome node scripts/build-cloudflare.mjs
//      NEXT_PUBLIC_INDEXABLE=true node scripts/build-cloudflare.mjs   (só quando o site for ao ar de verdade)
// Faz: escreve public/_headers, roda `npm run build`, confere o out/ (404.html, tamanho dos arquivos, textos proibidos, domínio) e gera o zip na raiz.
import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { join, relative, sep } from "node:path";
import zlib from "node:zlib";

const PROJETO = process.env.CF_PROJECT || "kamila-oliveira-estetica";
const URL_SITE = process.env.NEXT_PUBLIC_SITE_URL || `https://${PROJETO}.pages.dev/`;
const INDEXAVEL = process.env.NEXT_PUBLIC_INDEXABLE === "true";
const ZIP = "kamila-oliveira-estetica-cloudflare.zip";
const LIMITE = 25 * 1024 * 1024; // limite por arquivo do Cloudflare Pages

// ---- _headers (em public/, copiado para out/) ----
const CACHE_LONGO = "Cache-Control: public, max-age=31536000, immutable";
const bloco = (caminho) => `${caminho}\n  ! Cache-Control\n  ${CACHE_LONGO}\n`; // "!" remove o Cache-Control da regra /* antes de aplicar o longo
const headers = `# Gerado por scripts/build-cloudflare.mjs. Não editar à mão.
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Cache-Control: public, max-age=0, must-revalidate
${INDEXAVEL ? "" : "  X-Robots-Tag: noindex, nofollow\n"}
${bloco("/_next/static/*")}
${bloco("/photos/*")}
${bloco("/video/*")}
${bloco("/brand/*")}`;
writeFileSync("public/_headers", headers);

// ---- build ----
const env = { ...process.env, NEXT_PUBLIC_BASE_PATH: "", NEXT_PUBLIC_SITE_URL: URL_SITE, NEXT_PUBLIC_INDEXABLE: String(INDEXAVEL) };
rmSync("out", { recursive: true, force: true });
rmSync(".next/dev", { recursive: true, force: true });
const b = spawnSync("npm", ["run", "build"], { env, stdio: "inherit", shell: true });
if (b.status !== 0) process.exit(b.status ?? 1);

// ---- confere o out/ ----
const arquivos = (dir) => readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? arquivos(p) : [p]; });
const todos = arquivos("out");
const erros = [];
if (!existsSync("out/404.html")) erros.push("falta out/404.html");
if (!existsSync("out/index.html")) erros.push("falta out/index.html");
if (!existsSync("out/_headers")) erros.push("falta out/_headers");
const maiores = todos.map((f) => ({ f: relative("out", f).split(sep).join("/"), s: statSync(f).size })).sort((a, c) => c.s - a.s);
for (const x of maiores) if (x.s > LIMITE) erros.push(`${x.f} passa de 25 MB`);
// textos proibidos e domínio errado em todo texto gerado
const PROIBIDOS = [/kalenza/i, /prévia/i, /previa/i, /preview/i, /lorem/i, /a confirmar/i, /\bTODO\b/, /github\.io/i, /jm-mark/i, /kamila-oliveira-estetica\//];
const TEXTO = /\.(html|txt|xml|json|js|css|svg|webmanifest)$/;
for (const f of todos) {
  if (!TEXTO.test(f) && !f.endsWith("_headers")) continue;
  const t = readFileSync(f, "utf8");
  const biblioteca = f.includes("_next"); // chunks do Next/React: palavras como "preview" aparecem em listas internas (ex.: nomes de bots)
  for (const re of PROIBIDOS) {
    if (biblioteca && re.source === "preview") continue;
    const m = t.match(re);
    if (m) erros.push(`${relative("out", f).split(sep).join("/")}: contém "${m[0]}" (${re})`);
  }
}
console.log("\n10 maiores arquivos do out/:");
for (const x of maiores.slice(0, 10)) console.log(`  ${(x.s / 1048576).toFixed(2).padStart(7)} MB  ${x.f}`);
if (erros.length) {
  console.log("\nPROBLEMAS:\n" + [...new Set(erros)].slice(0, 40).map((e) => "- " + e).join("\n"));
  process.exit(1);
}

// ---- zip (entradas com "/" e sem pasta "out" na frente; mídia já comprimida é só armazenada) ----
const JA_COMPRIMIDO = /\.(webp|jpg|jpeg|png|mp4|webm|woff2|gz)$/i;
const partes = [], central = [];
let off = 0;
const dt = new Date();
const dosTime = (dt.getHours() << 11) | (dt.getMinutes() << 5) | (dt.getSeconds() >> 1);
const dosDate = ((dt.getFullYear() - 1980) << 9) | ((dt.getMonth() + 1) << 5) | dt.getDate();
for (const f of todos.sort()) {
  const nome = Buffer.from(relative("out", f).split(sep).join("/"), "utf8");
  const dados = readFileSync(f);
  const crc = zlib.crc32(dados);
  const metodo = JA_COMPRIMIDO.test(f) ? 0 : 8;
  const comp = metodo === 8 ? zlib.deflateRawSync(dados, { level: 9 }) : dados;
  const lh = Buffer.alloc(30);
  lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6); lh.writeUInt16LE(metodo, 8);
  lh.writeUInt16LE(dosTime, 10); lh.writeUInt16LE(dosDate, 12); lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(comp.length, 18); lh.writeUInt32LE(dados.length, 22); lh.writeUInt16LE(nome.length, 26);
  partes.push(lh, nome, comp);
  const ch = Buffer.alloc(46);
  ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0x0800, 8); ch.writeUInt16LE(metodo, 10);
  ch.writeUInt16LE(dosTime, 12); ch.writeUInt16LE(dosDate, 14); ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(comp.length, 20); ch.writeUInt32LE(dados.length, 24); ch.writeUInt16LE(nome.length, 28); ch.writeUInt32LE(off, 42);
  central.push(ch, nome);
  off += lh.length + nome.length + comp.length;
}
const cd = Buffer.concat(central);
const eocd = Buffer.alloc(22);
eocd.writeUInt32LE(0x06054b50, 0); eocd.writeUInt16LE(todos.length, 8); eocd.writeUInt16LE(todos.length, 10); eocd.writeUInt32LE(cd.length, 12); eocd.writeUInt32LE(off, 16);
writeFileSync(ZIP, Buffer.concat([...partes, cd, eocd]));
console.log(`\n${ZIP}: ${(statSync(ZIP).size / 1048576).toFixed(2)} MB, ${todos.length} arquivos. Site: ${URL_SITE} (indexável: ${INDEXAVEL})`);
