'use client'

import { useEffect, useRef } from 'react'
import { useApp } from '@/lib/store'
import { POIS, ANGOLA_CENTER } from '@/data/pois'
import POIPopup from '@/components/POI/POIPopup'
import { markerHTML, MARKER_H } from '@/components/Map/markerSVG'
import { Map, Layers3, LocateFixed, ChevronUp, ChevronDown } from 'lucide-react'

const TERRAIN_SOURCE = {
  type: 'raster-dem' as const,
  url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
  tileSize: 256,
}

const STYLES: Record<string, any> = {
  dark:      'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  topo:      'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
  satellite: {
    version: 8,
    sources: {
      satellite: {
        type: 'raster',
        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
        tileSize: 256,
        maxzoom: 19,
      },
      'terrain-dem': TERRAIN_SOURCE,
    },
    layers: [{ id: 'satellite-layer', type: 'raster', source: 'satellite' }],
  },
}

export default function Map3DClient() {
  const mapRef     = useRef<HTMLDivElement>(null)
  const mlRef      = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  const { selectedPOI, setSelectedPOI, activeCat, search, mapStyle, sideCollapsed, setMapMode, setVistaRealOpen } = useApp()

  useEffect(() => {
    if (!mapRef.current || mlRef.current) return

    import('maplibre-gl').then(({ default: maplibregl }) => {
      import('maplibre-gl/dist/maplibre-gl.css' as any)

      const map = new maplibregl.Map({
        container: mapRef.current!,
        style:     STYLES[mapStyle] ?? STYLES.dark,
        center:    [ANGOLA_CENTER[1], ANGOLA_CENTER[0]],
        zoom:      5.5,
        pitch:     45,
        bearing:   -10,
      })
      mlRef.current = map

      map.on('load', () => {
        if (!map.getSource('terrain-dem')) {
          map.addSource('terrain-dem', {
            type: 'raster-dem',
            url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
            tileSize: 256,
          })
        }
        try { map.setTerrain({ source: 'terrain-dem', exaggeration: 1.4 }) } catch (_) {}
        renderMarkers(map, maplibregl)
      })
    })

    return () => { mlRef.current?.remove(); mlRef.current = null }
  }, [])

  useEffect(() => {
    if (!mlRef.current) return
    const map = mlRef.current
    map.setStyle(STYLES[mapStyle] ?? STYLES.dark)
    const restore = () => {
      if (!map.getSource('terrain-dem')) {
        map.addSource('terrain-dem', TERRAIN_SOURCE)
      }
      try { map.setTerrain({ source: 'terrain-dem', exaggeration: 1.4 }) } catch (_) {}
    }
    map.once('styledata', restore)
    return () => { try { (map as any).off('styledata', restore) } catch (_) {} }
  }, [mapStyle])

  useEffect(() => {
    setTimeout(() => mlRef.current?.resize(), 320)
  }, [sideCollapsed])

  function renderMarkers(map: any, maplibregl: any) {
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    const visible = POIS.filter(p =>
      (activeCat === 'all' || p.cat === activeCat) &&
      (search === '' || p.name.toLowerCase().includes(search.toLowerCase()))
    )

    visible.forEach(poi => {
      const isSelected = selectedPOI?.id === poi.id
      const w = isSelected ? 36 : 26
      const h = MARKER_H[isSelected ? 'selected' : 'normal']

      const el = document.createElement('div')
      el.style.cssText = `width:${w}px;height:${h}px;cursor:pointer`
      el.innerHTML = markerHTML(poi.color, poi.cat, isSelected)

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.15) translateY(-2px)'
        el.style.transition = 'transform .18s ease'
      })
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1) translateY(0)'
      })
      el.addEventListener('click', () => {
        setSelectedPOI(poi)
        map.flyTo({
          center: [poi.lng, poi.lat],
          zoom: 12, pitch: 60, bearing: 30,
          duration: 2200, essential: true,
        })
      })
      el.addEventListener('dblclick', (e) => {
        e.stopPropagation()
        setSelectedPOI(poi)
        setVistaRealOpen(true)
      })
      el.title = `${poi.name} · ${poi.province}`

      const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([poi.lng, poi.lat])
        .addTo(map)

      markersRef.current.push(marker)
    })
  }

  useEffect(() => {
    if (!mlRef.current) return
    import('maplibre-gl').then(({ default: maplibregl }) => {
      renderMarkers(mlRef.current, maplibregl)
    })
  }, [activeCat, search, selectedPOI])

  const flyHome = () => mlRef.current?.flyTo({
    center: [ANGOLA_CENTER[1], ANGOLA_CENTER[0]],
    zoom: 5.5, pitch: 45, bearing: -10, duration: 1800,
  })

  const tilt = (delta: number) => mlRef.current?.easeTo({
    pitch: Math.max(0, Math.min(85, (mlRef.current.getPitch() || 0) + delta)),
    duration: 400,
  })

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full isolate" />

      {/* Controls */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">

        {/* 2D / 3D toggle */}
        <div className="flex rounded-xl overflow-hidden border border-white/10 shadow-xl">
          <button
            onClick={() => setMapMode('leaflet')}
            className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium bg-[#0d1929]/90 text-[#8A9BB0] hover:text-[#C9A84C] hover:bg-[#162032] transition-all border-r border-white/10"
          >
            <Map size={11} strokeWidth={2} />
            2D
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold bg-[#C9A84C]/15 text-[#C9A84C] cursor-default">
            <Layers3 size={11} strokeWidth={2} />
            3D Activo
          </button>
        </div>

        {/* Centre */}
        <button
          onClick={flyHome}
          className="flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] bg-[#0d1929]/90 border border-white/10 rounded-xl text-[#8A9BB0] hover:text-[#C9A84C] transition-all"
        >
          <LocateFixed size={11} strokeWidth={2} />
          Centrar
        </button>

        {/* Tilt */}
        <div className="flex flex-col rounded-xl overflow-hidden border border-white/10">
          <button
            onClick={() => tilt(15)}
            className="flex items-center justify-center gap-1 px-3 py-1.5 text-[11px] bg-[#0d1929]/90 text-[#8A9BB0] hover:text-[#C9A84C] border-b border-white/10 transition-all"
          >
            <ChevronUp size={11} strokeWidth={2} /> Tilt
          </button>
          <button
            onClick={() => tilt(-15)}
            className="flex items-center justify-center gap-1 px-3 py-1.5 text-[11px] bg-[#0d1929]/90 text-[#8A9BB0] hover:text-[#C9A84C] transition-all"
          >
            <ChevronDown size={11} strokeWidth={2} /> Tilt
          </button>
        </div>
      </div>

      {/* 3D badge */}
      <div className="absolute bottom-9 left-3 z-20 flex items-center gap-2 bg-[#080d18]/85 border border-[#C9A84C]/20 rounded-lg px-3 py-1.5">
        <span className="text-[10px] text-[#C9A84C] font-semibold tracking-wider uppercase">MapLibre GL · Vista 3D</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] ai-dot" />
      </div>

      {selectedPOI && <POIPopup />}
    </div>
  )
}
