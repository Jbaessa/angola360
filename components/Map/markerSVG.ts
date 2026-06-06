// SVG pin markers with Lucide icon paths — teardrop shape, category-colored
// viewBox 0 0 30 38 → circle head r=9 centered at (15,15), tail at (15,38)
// icon: translate(9,9) scale(0.5) maps 24×24 Lucide path to 12×12 centered at (15,15)

const ICON_PATHS: Record<string, string> = {
  natureza: `<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>`,
  praia:    `<path d="M2 12q2.5 2 5 0t5 0 5 0 5 0"/><path d="M2 19q2.5 2 5 0t5 0 5 0 5 0"/><path d="M2 5q2.5 2 5 0t5 0 5 0 5 0"/>`,
  cidade:   `<path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>`,
  historia: `<path d="M10 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>`,
  cultura:  `<path d="m2 2 8 8"/><path d="m22 2-8 8"/><ellipse cx="12" cy="9" rx="10" ry="5"/><path d="M7 13.4v7.9"/><path d="M12 14v8"/><path d="M17 13.4v7.9"/><path d="M2 9v8a10 5 0 0 0 20 0V9"/>`,
}

// Pixel sizes: [width, height] for normal and selected states
export const MARKER_H = { normal: 34, selected: 44 }

export function markerHTML(color: string, cat: string, selected: boolean): string {
  const w    = selected ? 36 : 26
  const h    = MARKER_H[selected ? 'selected' : 'normal']
  const sw   = selected ? 2.2 : 2.5
  const paths = ICON_PATHS[cat] ?? ICON_PATHS.natureza
  const glow  = selected
    ? `filter:drop-shadow(0 0 9px ${color}bb) drop-shadow(0 3px 5px rgba(0,0,0,0.55));`
    : `filter:drop-shadow(0 2px 4px rgba(0,0,0,0.65));`
  const ring = selected
    ? `<div style="position:absolute;top:-4px;left:-4px;width:${w + 8}px;height:${w + 8}px;border-radius:50%;border:2px solid ${color}55;pointer-events:none;"></div>`
    : ''

  return `<div style="position:relative;width:${w}px;height:${h}px;${glow}cursor:pointer">
    ${ring}
    <svg viewBox="0 0 30 38" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.716 0 0 6.716 0 15C0 23.284 15 38 15 38C15 38 30 23.284 30 15C30 6.716 23.284 0 15 0Z" fill="${color}"/>
      <circle cx="15" cy="15" r="9" fill="rgba(0,0,0,0.28)"/>
      <g transform="translate(9,9) scale(0.5)" stroke="white" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">
        ${paths}
      </g>
    </svg>
  </div>`
}
