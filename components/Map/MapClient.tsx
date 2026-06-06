'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useApp } from '@/lib/store'
import { POIS, TILE_URLS, ANGOLA_CENTER, ANGOLA_ZOOM } from '@/data/pois'
import POIPopup from '@/components/POI/POIPopup'
import { markerHTML, MARKER_H } from './markerSVG'
import { Map, Layers3 } from 'lucide-react'

export default function MapClient() {
  const mapRef     = useRef<HTMLDivElement>(null)
  const leafletRef = useRef<L.Map | null>(null)
  const tileRef    = useRef<L.TileLayer | null>(null)
  const markersRef = useRef<Record<number, L.Marker>>({})

  const { selectedPOI, setSelectedPOI, activeCat, search, mapStyle, sideCollapsed, setMapMode, setVistaRealOpen } = useApp()

  useEffect(() => {
    if (!mapRef.current || leafletRef.current) return
    const map = L.map(mapRef.current, {
      center: ANGOLA_CENTER, zoom: ANGOLA_ZOOM,
      zoomControl: false, attributionControl: true,
    })
    leafletRef.current = map
    tileRef.current = L.tileLayer(TILE_URLS.dark, { maxZoom: 19 }).addTo(map)
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    return () => { map.remove(); leafletRef.current = null }
  }, [])

  useEffect(() => {
    const map = leafletRef.current
    if (!map) return
    tileRef.current?.remove()
    tileRef.current = L.tileLayer(TILE_URLS[mapStyle] ?? TILE_URLS.dark, { maxZoom: 19 }).addTo(map)
  }, [mapStyle])

  useEffect(() => {
    setTimeout(() => leafletRef.current?.invalidateSize(), 320)
  }, [sideCollapsed])

  useEffect(() => {
    const map = leafletRef.current
    if (!map) return
    Object.values(markersRef.current).forEach(m => m.remove())
    markersRef.current = {}

    const visible = POIS.filter(p =>
      (activeCat === 'all' || p.cat === activeCat) &&
      (search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.province.toLowerCase().includes(search.toLowerCase()))
    )

    visible.forEach(poi => {
      const isSelected = selectedPOI?.id === poi.id
      const w = isSelected ? 36 : 26
      const h = MARKER_H[isSelected ? 'selected' : 'normal']

      const icon = L.divIcon({
        className: '',
        html: markerHTML(poi.color, poi.cat, isSelected),
        iconSize:   [w, h],
        iconAnchor: [w / 2, h],
      })

      const marker = L.marker([poi.lat, poi.lng], { icon })
        .addTo(map)
        .on('click', () => {
          setSelectedPOI(poi)
          map.flyTo([poi.lat, poi.lng], 12, { duration: 1.4 })
        })
        .on('dblclick', (e) => {
          L.DomEvent.stopPropagation(e)
          setSelectedPOI(poi)
          setVistaRealOpen(true)
        })

      marker.bindTooltip(
        `<div style="background:#0d1929;border:1px solid ${poi.color}44;color:#f0ede6;
        padding:5px 12px;border-radius:9px;font-family:DM Sans,sans-serif;
        font-size:12px;white-space:nowrap;pointer-events:none;line-height:1.5">
          <strong>${poi.name}</strong><br/>
          <span style="color:#8a9bb0;font-size:10px">${poi.province} · ★ ${poi.rating}</span>
        </div>`,
        { permanent: false, direction: 'top', offset: [0, -(h + 4)], className: 'angola-tooltip', opacity: 1 }
      )
      markersRef.current[poi.id] = marker
    })
  }, [activeCat, search, selectedPOI, setSelectedPOI])

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full isolate" />

      {/* 2D / 3D toggle */}
      <div className="absolute top-3 right-3 z-20 flex rounded-xl overflow-hidden border border-white/10 shadow-xl">
        <button
          className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold bg-[#C9A84C]/15 text-[#C9A84C] border-r border-white/10 cursor-default"
          title="Mapa 2D activo"
        >
          <Map size={11} strokeWidth={2} />
          2D Activo
        </button>
        <button
          onClick={() => setMapMode('maplibre3d')}
          className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium bg-[#0d1929]/90 text-[#8A9BB0] hover:text-[#C9A84C] hover:bg-[#162032] transition-all"
        >
          <Layers3 size={11} strokeWidth={2} />
          Vista 3D
        </button>
      </div>

      {/* Attribution badge */}
      <div className="absolute bottom-9 left-3 z-20 bg-[#080d18]/85 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] text-[#8A9BB0]">
        Leaflet 2D · OpenStreetMap
      </div>

      {selectedPOI && <POIPopup />}
    </div>
  )
}
