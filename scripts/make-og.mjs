// Gera a imagem de compartilhamento (1200x630) e o ícone Apple (180x180) com a marca. Uso: node scripts/make-og.mjs
import sharp from "sharp";

// fundo: mármore tratado, mais escuro, com o logo negativo centralizado
const bg = await sharp("public/photos/marmore-1920.webp").resize(1200, 630, { fit: "cover" }).modulate({ brightness: 0.75 }).toBuffer();
const logo = await sharp("public/brand/kamila-horizontal-negativo.svg", { density: 300 }).resize({ width: 760 }).png().toBuffer();
await sharp(bg).composite([{ input: logo, gravity: "center" }]).png({ compressionLevel: 9 }).toFile("public/og.png");

await sharp("public/brand/kamila-avatar-redes.svg", { density: 600 }).resize(180, 180).png().toFile("src/app/apple-icon.png");
console.log("ok og.png e apple-icon.png");
