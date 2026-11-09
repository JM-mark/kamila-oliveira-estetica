// Pós-build: o export estático com trailingSlash grava os arquivos de pré-carregamento do Next em pasta aninhada
// (out/pagina/__next.pagina/__PAGE__.txt), mas o navegador pede o nome plano (out/pagina/__next.pagina.__PAGE__.txt).
// Sem este passo, cada link dá 404 no console e a navegação cai em recarga completa. Copiamos cada arquivo para o nome plano.
import { readdirSync, statSync, copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

let copiados = 0;
function walk(dir) {
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome);
    if (!statSync(p).isDirectory()) continue;
    if (nome.startsWith("__next.")) {
      for (const f of readdirSync(p)) {
        const origem = join(p, f);
        if (!statSync(origem).isFile()) continue;
        const destino = join(dir, `${nome}.${f}`);
        if (!existsSync(destino)) { copyFileSync(origem, destino); copiados++; }
      }
    }
    walk(p);
  }
}
if (existsSync("out")) walk("out");
console.log(`fix-rsc: ${copiados} arquivo(s) copiado(s) para o nome plano`);
