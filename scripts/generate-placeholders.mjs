/**
 * Gera placeholders editoriais para /public/images.
 * Substitua cada arquivo pela fotografia real mantendo o mesmo nome
 * (ou atualize o caminho em data/weddingTimeline.ts / lib/constants.ts).
 *
 * Uso: npm run placeholders  (não sobrescreve arquivos existentes; use --force)
 */
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const force = process.argv.includes("--force");
const root = join(process.cwd(), "public", "images");

const tones = {
  blush: ["#F3E1DF", "#E8CFCB", "#C99B4B"],
  cream: ["#FAF8F5", "#EDE6DC", "#C99B4B"],
  green: ["#1A5A50", "#0B3833", "#C99B4B"],
};

const images = [
  { file: "hero/noiva.jpg", w: 1200, h: 1600, tone: "blush", label: "Noiva", note: "Fotografia de capa" },
  { file: "stages/intro.jpg", w: 1200, h: 1500, tone: "cream", label: "Casamento", note: "Introdução" },
  { file: "stages/etapa-01.jpg", w: 1000, h: 1400, tone: "blush", label: "Etapa 01", note: "Estilo e local" },
  { file: "stages/etapa-02.jpg", w: 1000, h: 1300, tone: "cream", label: "Etapa 02", note: "Coloração pessoal" },
  { file: "stages/etapa-03.jpg", w: 1000, h: 1400, tone: "blush", label: "Etapa 03", note: "O vestido" },
  { file: "stages/etapa-03-detalhe.jpg", w: 800, h: 1000, tone: "cream", label: "Detalhe", note: "Sapato" },
  { file: "stages/etapa-04.jpg", w: 1000, h: 1300, tone: "cream", label: "Etapa 04", note: "Acessórios e véu" },
  { file: "stages/etapa-05.jpg", w: 1000, h: 1400, tone: "blush", label: "Etapa 05", note: "Cuidados" },
  { file: "stages/etapa-06.jpg", w: 900, h: 1200, tone: "cream", label: "Etapa 06", note: "Prova de noiva" },
  { file: "stages/etapa-07.jpg", w: 900, h: 1200, tone: "blush", label: "Etapa 07", note: "Sobrancelhas" },
  { file: "stages/etapa-08.jpg", w: 1200, h: 1700, tone: "cream", label: "Etapa 08", note: "Hidratação" },
  { file: "stages/etapa-09.jpg", w: 1400, h: 1800, tone: "green", label: "O grande dia", note: "A produção" },
  { file: "malu/malu-siqueira.jpg", w: 1200, h: 1500, tone: "blush", label: "Malu Siqueira", note: "Retrato profissional" },
];

function svg({ w, h, tone, label, note }) {
  const [a, b, gold] = tones[tone];
  const ink = tone === "green" ? "#F3E1DF" : "#104840";
  const cx = w / 2;
  const archW = w * 0.52;
  const archTop = h * 0.2;
  const archBottom = h * 0.74;
  const r = archW / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <path d="M ${cx - r} ${archBottom} L ${cx - r} ${archTop + r} A ${r} ${r} 0 0 1 ${cx + r} ${archTop + r} L ${cx + r} ${archBottom}"
    fill="none" stroke="${gold}" stroke-width="${Math.max(1.5, w / 700)}" opacity="0.8"/>
  <text x="${cx}" y="${archTop + r + h * 0.08}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif"
    font-style="italic" font-size="${w * 0.075}" fill="${ink}" opacity="0.85">${label}</text>
  <text x="${cx}" y="${archBottom + h * 0.09}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
    font-size="${w * 0.018}" letter-spacing="${w * 0.006}" fill="${ink}" opacity="0.6">${note.toUpperCase()} · SUBSTITUIR FOTOGRAFIA</text>
</svg>`;
}

for (const img of images) {
  const out = join(root, img.file);
  if (existsSync(out) && !force) continue;
  mkdirSync(dirname(out), { recursive: true });
  await sharp(Buffer.from(svg(img))).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  console.log("✓", img.file);
}
