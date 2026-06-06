import type { Metadata } from 'next'
import LandingNav           from '@/components/Landing/LandingNav'
import HeroSection           from '@/components/Landing/HeroSection'
import TiposTurismoSection  from '@/components/Landing/TiposTurismoSection'
import DestinosSection       from '@/components/Landing/DestinosSection'
import EstatisticasSection from '@/components/Landing/EstatisticasSection'
import ParceirosSection  from '@/components/Landing/ParceirosSection'
import CTASection        from '@/components/Landing/CTASection'
import LandingFooter     from '@/components/Landing/LandingFooter'

export const metadata: Metadata = {
  title: 'Angola360 — Portal Turístico Interactivo de Angola',
  description: 'Descubra Angola como nunca viu antes. Mapa interactivo, vistas 360°, guia turístico com IA. O portal turístico mais completo de Angola.',
  keywords: 'Angola turismo, Luanda, Kalandula, Serra da Leba, safari Angola, praias Angola, viagem Angola',
  openGraph: {
    title: 'Angola360 — Descubra Angola',
    description: 'Portal turístico interactivo de Angola com IA, mapas 3D e vistas 360°.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'pt_AO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Angola360',
    description: 'Descubra Angola como nunca viu antes.',
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <LandingNav />
      <HeroSection />
      <TiposTurismoSection />
      <DestinosSection />
      <EstatisticasSection />
      <ParceirosSection />
      <CTASection />
      <LandingFooter />
    </div>
  )
}
