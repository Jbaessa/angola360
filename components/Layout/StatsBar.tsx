'use client'

import { useApp } from '@/lib/store'
import { useT } from '@/lib/translations'
import { POIS } from '@/data/pois'

export default function StatsBar() {
  const { activeCat, mapMode, mapStyle } = useApp()
  const t = useT()

  const total   = POIS.length
  const showing = activeCat === 'all' ? total : POIS.filter(p => p.cat === activeCat).length
  const provinces = new Set(POIS.map(p => p.province)).size

  return (
    <footer className="flex items-center justify-between px-5 py-1.5 bg-[#0d1929] border-t border-white/10 shrink-0">
      <div className="flex items-center gap-5">
        <Stat label={t('bar_dests')}     value={`${showing}/${total}`} />
        <Stat label={t('bar_provinces')} value={provinces.toString()} />
        <Stat label={t('bar_mode')}      value={mapMode === 'maplibre3d' ? '3D · MapLibre GL' : '2D · Leaflet'} />
        <Stat label={t('bar_style')}     value={mapStyle.charAt(0).toUpperCase() + mapStyle.slice(1)} />
      </div>

      <div className="flex items-center gap-3 text-[10px] text-[#8A9BB0]">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] ai-dot" />
          {t('bar_ai_active')}
        </div>
        <span>·</span>
        <span>Angola360 v1.0</span>
        <span>·</span>
        <span className="text-[#C9A84C]/60">Powered by Claude</span>
      </div>
    </footer>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] text-[#8A9BB0] uppercase tracking-[1.5px]">{label}</span>
      <span className="text-[11px] font-semibold text-[#C9A84C]">{value}</span>
    </div>
  )
}
