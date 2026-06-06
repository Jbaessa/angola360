import type { Metadata } from 'next'
import Header    from '@/components/Layout/Header'
import Sidebar   from '@/components/Layout/Sidebar'
import StatsBar  from '@/components/Layout/StatsBar'
import MapWrapper from '@/components/Map/MapWrapper'
import AIChat    from '@/components/AI/AIChat'
import Viewer360 from '@/components/View360/Viewer360'
import VistaReal from '@/components/VistaReal/VistaReal'

export const metadata: Metadata = {
  title: 'Angola360 — Mapa Interactivo',
  description: 'Explore Angola num mapa interactivo com IA, vistas 360° e MapLibre 3D.',
}

export default function MapaPage() {
  return (
    <main className="flex flex-col h-screen overflow-hidden bg-[#080d18]">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <MapWrapper />
      </div>
      <StatsBar />
      <AIChat />
      <Viewer360 />
      <VistaReal />
    </main>
  )
}
