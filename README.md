# Guia da Noiva — Malu Siqueira

Experiência web editorial com o cronograma da noiva, do primeiro passo ao grande dia.

**Stack:** Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, `next/image`.
Sem backend, banco de dados ou autenticação.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```

Defina `NEXT_PUBLIC_SITE_URL` no deploy (ex.: `https://seudominio.com.br`) para canonical e Open Graph corretos.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Conteúdo das 9 etapas, layout de cada uma, tempos de produção | `data/weddingTimeline.ts` |
| Hero, introdução, CTA final, contatos, SEO | `lib/constants.ts` |
| Cores, tipografia, grid, máscaras de imagem | `app/globals.css` |

Cada etapa tem um `variant` (composição) e um `tone` (fundo). As composições ficam em `components/Stage.tsx`;
a etapa 09 é renderizada por `components/GrandDay.tsx` + `components/ProductionTimeline.tsx`.

## Fotografias

As imagens em `public/images/` são **placeholders** gerados por `npm run placeholders`.
Para usar as fotos reais, substitua o arquivo mantendo o mesmo nome (ou altere o caminho em
`data/weddingTimeline.ts` / `lib/constants.ts`). O `next/image` gera AVIF/WebP automaticamente.

```
public/images/
├── hero/noiva.jpg                 capa (vertical)
├── stages/intro.jpg               introdução
├── stages/etapa-01.jpg … etapa-09.jpg
├── stages/etapa-03-detalhe.jpg    foto menor sobreposta na etapa 03
└── malu/malu-siqueira.jpg         retrato para o CTA final
```

Atualize também o `alt` de cada imagem ao trocar a fotografia.

## Pendências de conteúdo

- `INTRO.paragraphs` em `lib/constants.ts` está vazio: preencher com o texto introdutório exato da referência.
