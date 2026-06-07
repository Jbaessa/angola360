import type { Metadata } from 'next'
import './globals.css'
import { AppProvider } from '@/lib/store'

export const metadata: Metadata = {
  title: 'Angola360 — Portal Turístico Interactivo',
  description: 'Descobre Angola em 2D, 3D e 360°. Mapa interactivo com 20 destinos, Guia IA e panorâmicas imersivas.',
  keywords: 'Angola, turismo, mapa interactivo, destinos, Luanda, natureza, praias, safari',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Angola360 — Portal Turístico Interactivo',
    description: 'O portal de turismo mais completo de Angola',
    locale: 'pt_AO',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
