'use client'

import { useApp } from '@/lib/store'
import { useT } from '@/lib/translations'
import { POIS, CAT_CONFIG } from '@/data/pois'
import {
  Globe2, Leaf, Waves, Building2, Landmark, Drum,
  Wind, Mountain,
  Star, MapPin, ChevronRight, ChevronLeft, Search,
} from 'lucide-react'

const CAT_ICONS: Record<string, React.ReactNode> = {
  all:      <Globe2    size={13} strokeWidth={1.8} />,
  natureza: <Leaf      size={13} strokeWidth={1.8} />,
  praia:    <Waves     size={13} strokeWidth={1.8} />,
  cidade:   <Building2 size={13} strokeWidth={1.8} />,
  historia: <Landmark  size={13} strokeWidth={1.8} />,
  cultura:  <Drum      size={13} strokeWidth={1.8} />,
  surf:     <Wind      size={13} strokeWidth={1.8} />,
  aventura: <Mountain  size={13} strokeWidth={1.8} />,
}

const POI_ICONS: Record<string, React.ReactNode> = {
  natureza: <Leaf      size={15} strokeWidth={1.6} />,
  praia:    <Waves     size={15} strokeWidth={1.6} />,
  cidade:   <Building2 size={15} strokeWidth={1.6} />,
  historia: <Landmark  size={15} strokeWidth={1.6} />,
  cultura:  <Drum      size={15} strokeWidth={1.6} />,
  surf:     <Wind      size={15} strokeWidth={1.6} />,
  aventura: <Mountain  size={15} strokeWidth={1.6} />,
}

export default function Sidebar() {
  const { activeCat, setActiveCat, search, selectedPOI, setSelectedPOI, sideCollapsed, setSideCollapsed, language } = useApp()
  const t = useT()

  const CAT_LABEL_KEY: Record<string, 'cat_all' | 'cat_natureza' | 'cat_praia' | 'cat_cidade' | 'cat_historia' | 'cat_cultura' | 'cat_surf' | 'cat_aventura'> = {
    all:      'cat_all',
    natureza: 'cat_natureza',
    praia:    'cat_praia',
    cidade:   'cat_cidade',
    historia: 'cat_historia',
    cultura:  'cat_cultura',
    surf:     'cat_surf',
    aventura: 'cat_aventura',
  }

  const filtered = POIS.filter(p =>
    (activeCat === 'all' || p.cat === activeCat) &&
    (search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.province.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <aside
      className="relative flex flex-col bg-[#0d1929] border-r border-white/[0.07] transition-all duration-300 shrink-0"
      style={{ width: sideCollapsed ? 48 : 260 }}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setSideCollapsed(!sideCollapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-40 w-6 h-10 bg-[#0d1929] border border-white/10 rounded-r-lg flex items-center justify-center text-[#8A9BB0] hover:text-[#C9A84C] transition-all"
      >
        {sideCollapsed
          ? <ChevronRight size={13} strokeWidth={2} />
          : <ChevronLeft  size={13} strokeWidth={2} />
        }
      </button>

      {/* Collapsed state */}
      {sideCollapsed ? (
        <div className="flex flex-col items-center gap-1 pt-4 px-2">
          {Object.entries(CAT_CONFIG).map(([key, cfg]) => {
            const active = activeCat === key
            return (
              <button
                key={key}
                onClick={() => setActiveCat(key)}
                title={language === 'en' ? cfg.labelEn : cfg.label}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{
                  background: active ? cfg.color + '22' : 'transparent',
                  color: active ? cfg.color : '#8A9BB0',
                  border: `1px solid ${active ? cfg.color + '44' : 'transparent'}`,
                }}
              >
                {CAT_ICONS[key]}
              </button>
            )
          })}
        </div>
      ) : (
        <>
          {/* Category filters */}
          <div className="px-3 pt-4 pb-3 shrink-0">
            <p className="text-[9px] text-[#8A9BB0]/60 uppercase tracking-[2.5px] mb-2.5 px-1 font-medium">{t('sidebar_cats')}</p>
            <div className="flex flex-col gap-1">
              {Object.entries(CAT_CONFIG).map(([key, cfg]) => {
                const active = activeCat === key
                const label = t(CAT_LABEL_KEY[key])
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCat(key)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all ${!active ? 'hover:bg-white/[0.03]' : ''}`}
                    style={{
                      background:   active ? cfg.color + '18' : 'transparent',
                      color:        active ? cfg.color : '#8A9BB0',
                      border:       `1px solid ${active ? cfg.color + '35' : 'transparent'}`,
                    }}
                  >
                    <span style={{ color: active ? cfg.color : '#8A9BB0' }}>
                      {CAT_ICONS[key]}
                    </span>
                    <span className="text-[11px] font-medium tracking-wide">{label}</span>
                    <span
                      className="ml-auto text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: active ? cfg.color + '28' : 'rgba(255,255,255,0.06)',
                        color: active ? cfg.color : '#8A9BB0',
                      }}
                    >
                      {key === 'all' ? POIS.length : POIS.filter(p => p.cat === key).length}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mx-3 h-px bg-white/[0.06] shrink-0" />

          {/* POI list */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-3 pt-3 pb-1 flex items-center justify-between">
              <p className="text-[9px] text-[#8A9BB0]/60 uppercase tracking-[2.5px] font-medium">{t('sidebar_dests')}</p>
              <span
                className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: '#C9A84C18', color: '#C9A84C' }}
              >
                {filtered.length}
              </span>
            </div>

            <div className="flex flex-col gap-px px-2 pb-4 mt-1">
              {filtered.map(poi => {
                const cfg = CAT_CONFIG[poi.cat]
                const isActive = selectedPOI?.id === poi.id
                return (
                  <button
                    key={poi.id}
                    onClick={() => setSelectedPOI(isActive ? null : poi)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${!isActive ? 'hover:bg-white/[0.03]' : ''}`}
                    style={{
                      background: isActive ? '#C9A84C0f' : 'transparent',
                      border:     `1px solid ${isActive ? '#C9A84C33' : 'transparent'}`,
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all"
                        style={{
                          background: isActive ? cfg.color + '25' : cfg.color + '12',
                          color: cfg.color,
                          border: `1px solid ${cfg.color}${isActive ? '45' : '20'}`,
                        }}
                      >
                        {POI_ICONS[poi.cat]}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-medium text-[#F0EDE6] truncate leading-tight">{poi.name}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <MapPin size={9} strokeWidth={1.8} className="text-[#8A9BB0]/50 shrink-0" />
                          <span className="text-[10px] text-[#8A9BB0]/70 truncate">{poi.province}</span>
                          <span className="w-0.5 h-0.5 rounded-full bg-[#8A9BB0]/25 shrink-0" />
                          <Star size={9} strokeWidth={1.8} style={{ color: cfg.color, opacity: 0.8 }} className="shrink-0" />
                          <span className="text-[10px] font-semibold" style={{ color: cfg.color }}>{poi.rating}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}

              {filtered.length === 0 && (
                <div className="text-center py-10">
                  <Search size={24} strokeWidth={1.4} className="mx-auto mb-2 text-[#8A9BB0]/30" />
                  <p className="text-[#8A9BB0]/50 text-[11px]">{t('sidebar_empty')}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </aside>
  )
}
