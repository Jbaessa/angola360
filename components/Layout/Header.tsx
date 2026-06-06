'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useApp } from '@/lib/store'
import { useT } from '@/lib/translations'
import { Map, Globe2 } from 'lucide-react'

export default function Header() {
  const { mapStyle, setMapStyle, mapMode, setMapMode, chatOpen, setChatOpen, language, setLanguage } = useApp()
  const t = useT()

  const MAP_STYLES = [
    { key: 'topo',      label: t('map_style_light') },
    { key: 'dark',      label: t('map_style_dark')  },
    { key: 'satellite', label: t('map_style_sat')   },
  ] as const

  return (
    <header className="flex items-center justify-between px-5 py-3 bg-[#0d1929] border-b border-white/10 shrink-0 shadow-lg shadow-black/40">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/logoA360.png"
          alt="Angola360 — Portal Turístico Interactivo"
          width={180}
          height={48}
          className="h-12 w-auto object-contain rounded-xl"
          priority
        />
      </Link>

      {/* Search */}
      <div className="flex items-center gap-2 bg-[#0d1929] border border-[#C9A84C]/20 rounded-3xl px-3.5 py-1.5 w-60 transition-all focus-within:border-[#C9A84C]/50">
        <svg width="13" height="13" fill="none" stroke="#8A9BB0" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <SearchInput placeholder={t('map_search')} />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5">
        {MAP_STYLES.map(({ key, label }) => (
          <button key={key} onClick={() => setMapStyle(key as any)}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] border transition-all ${
              mapStyle === key
                ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/08'
                : 'border-white/10 text-[#8A9BB0] hover:border-white/25 hover:text-[#F0EDE6]'
            }`}>{label}</button>
        ))}

        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Map mode toggle */}
        <div className="flex rounded-lg overflow-hidden border border-white/10">
          <button onClick={() => setMapMode('leaflet')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] border-r border-white/10 transition-all ${
              mapMode === 'leaflet' ? 'bg-[#C9A84C]/12 text-[#C9A84C]' : 'bg-transparent text-[#8A9BB0] hover:text-[#F0EDE6]'
            }`}>
            <Map size={12} strokeWidth={1.8} />
            2D
          </button>
          <button onClick={() => setMapMode('maplibre3d')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] transition-all ${
              mapMode === 'maplibre3d' ? 'bg-[#C9A84C]/12 text-[#C9A84C]' : 'bg-transparent text-[#8A9BB0] hover:text-[#F0EDE6]'
            }`}>
            <Globe2 size={12} strokeWidth={1.8} />
            3D
          </button>
        </div>

        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Language toggle */}
        <button
          onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
          className="px-2.5 py-1.5 rounded-lg text-[11px] border border-white/10 text-[#8A9BB0] hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all font-bold"
          title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
        >
          {t('nav_lang_switch')}
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* AI chat */}
        <button onClick={() => setChatOpen(!chatOpen)}
          className={`pl-1 pr-3 py-1 rounded-xl text-[11px] border transition-all flex items-center gap-2 ${
            chatOpen
              ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/12'
              : 'border-[#C9A84C]/35 text-[#C9A84C] bg-[#C9A84C]/07 hover:bg-[#C9A84C]/14'
          }`}>
          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#C9A84C]/40 shrink-0">
            <img src="/njila_meio.png" alt="Njila" className="w-full h-full object-cover object-top" />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#2ECC71] border border-[#0d1929] ai-dot" />
          </div>
          {t('map_ai_btn')}
        </button>
      </div>
    </header>
  )
}

function SearchInput({ placeholder }: { placeholder: string }) {
  const { search, setSearch } = useApp()
  return (
    <input
      type="text"
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder={placeholder}
      className="bg-transparent border-none outline-none text-[#F0EDE6] text-[12px] w-full placeholder:text-[#8A9BB0]"
    />
  )
}
