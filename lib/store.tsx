'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { POI } from '@/data/pois'
import type { Lang } from '@/lib/translations'

export type MapMode  = 'leaflet' | 'maplibre3d'
export type MapStyle = 'dark' | 'satellite' | 'topo'

interface AppState {
  selectedPOI:       POI | null
  activeCat:         string
  mapStyle:          MapStyle
  mapMode:           MapMode
  search:            string
  sideCollapsed:     boolean
  chatOpen:          boolean
  view360Open:       boolean
  vistaRealOpen:     boolean
  language:          Lang
  setSelectedPOI:    (p: POI | null) => void
  setActiveCat:      (c: string) => void
  setMapStyle:       (s: MapStyle) => void
  setMapMode:        (m: MapMode) => void
  setSearch:         (s: string) => void
  setSideCollapsed:  (v: boolean) => void
  setChatOpen:       (v: boolean) => void
  setView360Open:    (v: boolean) => void
  setVistaRealOpen:  (v: boolean) => void
  setLanguage:       (l: Lang) => void
}

const Ctx = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedPOI,   setSelectedPOI]   = useState<POI | null>(null)
  const [activeCat,     setActiveCat]     = useState('all')
  const [mapStyle,      setMapStyle]      = useState<MapStyle>('topo')
  const [mapMode,       setMapMode]       = useState<MapMode>('leaflet')
  const [search,        setSearch]        = useState('')
  const [sideCollapsed, setSideCollapsed] = useState(false)
  const [chatOpen,      setChatOpen]      = useState(false)
  const [view360Open,   setView360Open]   = useState(false)
  const [vistaRealOpen, setVistaRealOpen] = useState(false)
  const [language,      setLanguageState] = useState<Lang>('pt')

  useEffect(() => {
    const saved = localStorage.getItem('angola360_lang') as Lang | null
    if (saved === 'pt' || saved === 'en') setLanguageState(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('angola360_lang', language)
    document.documentElement.lang = language === 'en' ? 'en' : 'pt'
  }, [language])

  function setLanguage(l: Lang) {
    setLanguageState(l)
  }

  return (
    <Ctx.Provider value={{
      selectedPOI, setSelectedPOI,
      activeCat,   setActiveCat,
      mapStyle,    setMapStyle,
      mapMode,     setMapMode,
      search,      setSearch,
      sideCollapsed, setSideCollapsed,
      chatOpen,    setChatOpen,
      view360Open, setView360Open,
      vistaRealOpen, setVistaRealOpen,
      language,    setLanguage,
    }}>
      {children}
    </Ctx.Provider>
  )
}

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}
