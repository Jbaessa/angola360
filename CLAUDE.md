# CLAUDE.md — Angola360 v1.0

Portal turístico interactivo de Angola. Next.js 14 + Leaflet + MapLibre GL 3D + Pannellum 360° + Claude AI.

## Arrancar

```bash
cd "C:/Users/Administrador/angola360"
npm run dev   # → http://localhost:3000
```

## Stack de Mapas (3 camadas — não alterar sem instrução)

| Camada | Tecnologia | Para quê |
|---|---|---|
| Mapa 2D | Leaflet 1.9 | Navegação, markers, filtros |
| Vista 3D | MapLibre GL 4 | Terreno 3D, pitch, fly-through |
| 360° | Pannellum 2.5 (CDN) | Tours virtuais por POI |

**Regra crítica:** `mapMode: 'leaflet' | 'maplibre3d'` em `lib/store.tsx` controla qual mapa está activo.

## Ficheiros chave

```
app/
  layout.tsx          ← RootLayout + AppProvider + metadata
  page.tsx            ← composição principal (Header+Sidebar+Map+AI+360)
  globals.css         ← Tailwind + CSS dos 3 mapas + animações
  api/chat/route.ts   ← Claude streaming SSE

components/
  Layout/Header.tsx   ← logo, search, estilos, toggle 2D/3D, Guia IA
  Layout/Sidebar.tsx  ← filtros + lista POIs
  Layout/StatsBar.tsx ← barra inferior stats
  Map/MapClient.tsx   ← Leaflet 2D
  Map/MapSelector.tsx ← switch Leaflet vs MapLibre
  Map/MapWrapper.tsx  ← dynamic import (ssr:false)
  Map3D/Map3DClient.tsx ← MapLibre GL 3D com terreno
  POI/POIPopup.tsx    ← popup lateral com AI insight + 360° btn
  AI/AIChat.tsx       ← chat flutuante Claude streaming
  View360/Viewer360.tsx ← Pannellum fullscreen + fallback

data/pois.ts          ← 20 POIs reais de Angola + types + config
lib/store.tsx         ← AppContext (estado global)
```

## Design System

```ts
bg:       '#080d18'   // fundo principal
surface:  '#0d1929'   // cards, popups
surface2: '#162032'   // hover states
gold:     '#C9A84C'   // cor de marca
muted:    '#8A9BB0'   // texto secundário
text:     '#F0EDE6'   // texto principal
```

Fontes: `font-display` = Playfair Display · `font-sans` = DM Sans

## Variáveis de Ambiente

```env
ANTHROPIC_API_KEY=sk-ant-xxx    # obrigatório
NEXT_PUBLIC_SUPABASE_URL=...    # futuro
NEXT_PUBLIC_SUPABASE_ANON_KEY=. # futuro
```

## SSR Rules (não quebrar)

Nunca importar Leaflet, MapLibre ou Pannellum em Server Components.
Usar sempre `dynamic(() => import(...), { ssr: false })`.

## Backlog

### Prioridade 1 — Dados reais
- [ ] Criar `lib/supabase.ts` + tabela `destinos`
- [ ] Hook `usePOIs.ts` com fetch + realtime
- [ ] Substituir array estático

### Prioridade 2 — 360° reais
- [ ] Upload fotos equirectangulares no Supabase Storage
- [ ] Popular campo `foto360` nos POIs

### Prioridade 3 — MapLibre avançado
- [ ] GeoJSON fronteiras das províncias
- [ ] Intro cinematic (fly-through ao abrir em 3D)

### Prioridade 4 — IA avançada
- [ ] Planeador de itinerário ("7 dias, natureza + praias" → rota)
- [ ] Narração áudio por destino

### Prioridade 5 — Produção
- [ ] Vercel deploy
- [ ] Deep links TAAG por destino
- [ ] PWA + offline
