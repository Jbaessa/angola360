# DESIGN.md — Angola360

## Colors
- Background `#080d18` — deep navy
- Surface `#0d1929` — header, sidebar, cards
- Surface2 `#162032` — hover, nested surfaces
- Gold `#C9A84C` — brand accent, AI elements, active states
- Muted `#8A9BB0` — secondary text, placeholders, idle icons
- Text `#F0EDE6` — primary text (warm, not pure white)
- Online `#2ECC71` — AI status indicator

## Category colors
- natureza `#2ECC71`
- praia `#E74C3C`
- cidade `#E67E22`
- historia `#1ABC9C`
- cultura `#9B59B6`

## Typography
- Display: Playfair Display — POI names, 360° hero, section titles
- Body: DM Sans — all UI chrome
- Scale: 9px labels → 11-12px body → 13px primary → 16-18px display titles

## Bans (project-specific)
- No emoji in UI chrome (headers, buttons, avatars, status indicators)
- No gradient text
- No inline JS hover handlers — use Tailwind or CSS

## Motion
- POIPopup: spring stiffness 320 damping 30, slides in from right
- AIChat: spring stiffness 300 damping 28, rises from bottom
- Sidebar collapse: 300ms transition-all duration
