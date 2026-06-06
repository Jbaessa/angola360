'use client'

import dynamic from 'next/dynamic'
import { useApp } from '@/lib/store'

function MapLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#080d18]">
      <div className="text-center">
        <div className="text-5xl mb-4 spin-slow">🌍</div>
        <div className="text-[#8A9BB0] text-sm tracking-widest uppercase">A carregar Angola360…</div>
      </div>
    </div>
  )
}

const MapLeaflet = dynamic(() => import('./MapClient'),           { ssr: false, loading: () => <MapLoading /> })
const MapLibre3D = dynamic(() => import('../Map3D/Map3DClient'), { ssr: false, loading: () => <MapLoading /> })

export default function MapSelector() {
  const { mapMode } = useApp()
  return mapMode === 'maplibre3d' ? <MapLibre3D /> : <MapLeaflet />
}
