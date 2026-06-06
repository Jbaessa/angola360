'use client'

import { useEffect, useRef, useState } from 'react'
import { useApp } from '@/lib/store'

const BG: Record<string, string> = {
  natureza: 'radial-gradient(ellipse at center,#1a4a2a,#050f0a)',
  praia:    'radial-gradient(ellipse at center,#0d3a5c,#040d18)',
  historia: 'radial-gradient(ellipse at center,#2a1a0e,#0a0503)',
  cidade:   'radial-gradient(ellipse at center,#1a2a4a,#060e1e)',
  cultura:  'radial-gradient(ellipse at center,#2a1a3a,#0d0516)',
}

export default function Viewer360() {
  const { view360Open, setView360Open, selectedPOI } = useApp()
  const pannellumRef = useRef<HTMLDivElement>(null)
  const viewerRef    = useRef<any>(null)
  const compassRef   = useRef<HTMLDivElement>(null)
  const xhrRef       = useRef<XMLHttpRequest | null>(null)
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const blobUrlRef   = useRef<string | null>(null)
  const [loaded,    setLoaded]    = useState(false)
  const [pannReady, setPannReady] = useState(false)
  const [progress,  setProgress]  = useState(0)

  // Load Pannellum from CDN (avoids SSR issues)
  useEffect(() => {
    if (pannReady || typeof window === 'undefined') return
    if ((window as any).pannellum) { setPannReady(true); return }
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css'
    document.head.appendChild(link)
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js'
    script.onload = () => setPannReady(true)
    document.head.appendChild(script)
  }, [])

  // Init Pannellum viewer when overlay opens
  useEffect(() => {
    if (!view360Open || !selectedPOI || !pannellumRef.current || !pannReady) return
    const pann = (window as any).pannellum
    if (!pann) return

    setLoaded(false)
    setProgress(0)

    const imageUrl = selectedPOI.foto360
    if (!imageUrl) { setLoaded(true); return }

    // Download with progress tracking, then feed a blob URL to Pannellum
    const xhr = new XMLHttpRequest()
    xhrRef.current = xhr
    xhr.open('GET', imageUrl)
    xhr.responseType = 'blob'

    xhr.onprogress = (e) => {
      if (e.lengthComputable) setProgress(Math.round(e.loaded / e.total * 100))
    }

    xhr.onload = () => {
      if (xhr.status !== 200 || !pannellumRef.current) { setLoaded(true); return }
      const blobUrl = URL.createObjectURL(xhr.response)
      blobUrlRef.current = blobUrl

      viewerRef.current = pann.viewer(pannellumRef.current, {
        type: 'equirectangular',
        panorama: blobUrl,
        autoLoad: true,
        autoRotate: -2,
        compass: false,
        showFullscreenCtrl: true,
        showZoomCtrl: false,
        hfov: 110, pitch: 5, yaw: 0,
        onLoad: () => setLoaded(true),
      })

      intervalRef.current = setInterval(() => {
        if (viewerRef.current && compassRef.current) {
          compassRef.current.style.transform = `rotate(${-viewerRef.current.getYaw()}deg)`
        }
      }, 50)
    }

    xhr.onerror = () => setLoaded(true)
    xhr.send()

    return () => {
      xhrRef.current?.abort()
      xhrRef.current = null
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
      viewerRef.current?.destroy()
      viewerRef.current = null
      if (blobUrlRef.current) { URL.revokeObjectURL(blobUrlRef.current); blobUrlRef.current = null }
    }
  }, [view360Open, selectedPOI, pannReady])

  if (!view360Open || !selectedPOI) return null

  const hasPano = !!selectedPOI.foto360
  const bg = BG[selectedPOI.cat] ?? BG.cidade

  return (
    <div className="fixed inset-0 z-[2000] bg-black">
      {/* Close */}
      <button
        onClick={() => { setView360Open(false); setLoaded(false) }}
        className="fixed top-5 right-5 z-[2010] w-11 h-11 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/10 transition-all"
        style={{ background: 'rgba(8,13,24,.85)' }}
        aria-label="Fechar"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round">
          <path d="M1 1 L13 13 M13 1 L1 13"/>
        </svg>
      </button>

      {/* Top bar */}
      <div
        className="fixed top-0 left-0 right-14 z-[2005] flex items-center gap-3 px-5 py-3"
        style={{ background: 'linear-gradient(to bottom,rgba(8,13,24,.92),transparent)' }}
      >
        <span className="text-2xl">{selectedPOI.emoji}</span>
        <div>
          <div className="font-display text-lg text-white leading-tight">{selectedPOI.name}</div>
          <div className="text-[11px] text-white/40 tracking-wide">
            {selectedPOI.province} · Angola · {hasPano ? 'Panorâmica 360°' : 'Vista Imersiva'}
          </div>
        </div>
        {hasPano && (
          <span className="ml-2 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/30">
            Vista 360°
          </span>
        )}
      </div>

      {/* Pannellum container or simulated scene */}
      {hasPano ? (
        <div ref={pannellumRef} className="w-full h-full" style={{ background: bg }} />
      ) : (
        <SimulatedScene poi={selectedPOI} bg={bg} />
      )}

      {/* Loading overlay with progress */}
      {hasPano && !loaded && (
        <div className="absolute inset-0 z-[2008] flex items-center justify-center" style={{ background: bg }}>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 spin-slow">
              <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="14" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="55 33" strokeLinecap="round"/>
                <path d="M16 6C11.5 11 8.5 14.5 8.5 18C8.5 22.1 11.9 25 16 25C20.1 25 23.5 22.1 23.5 18C23.5 14.5 20.5 11 16 6Z" fill="#C9A84C" fillOpacity=".45"/>
                <circle cx="16" cy="18.5" r="3.2" fill="#080d18"/>
              </svg>
            </div>
            <div className="text-[#C9A84C] text-sm tracking-widest uppercase mb-3">
              {progress >= 100 ? 'A processar…' : 'A carregar panorâmica…'}
            </div>
            <div className="w-52 mx-auto">
              <div className="flex justify-between text-[10px] text-[#C9A84C]/50 mb-1.5">
                <span>Imagem 360°</span>
                <span>{progress > 0 ? `${progress}%` : '—'}</span>
              </div>
              <div className="w-full h-[3px] bg-white/[0.08] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C9A84C] rounded-full transition-all duration-300"
                  style={{ width: progress > 0 ? `${progress}%` : '0%' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compass */}
      <div
        ref={compassRef}
        className="fixed bottom-5 right-5 z-[2005] w-12 h-12 rounded-full flex items-center justify-center border border-white/15 transition-transform duration-100"
        style={{ background: 'rgba(8,13,24,.75)' }}
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <circle cx="13" cy="13" r="11" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
          <path d="M13 3 L15 13 L13 15 L11 13 Z" fill="#C9A84C"/>
          <path d="M13 23 L11 13 L13 15 L15 13 Z" fill="rgba(255,255,255,0.28)"/>
          <circle cx="13" cy="13" r="2" fill="rgba(8,13,24,0.9)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
        </svg>
      </div>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[2005] text-[11px] text-white/25 tracking-wide pointer-events-none">
        {hasPano
          ? '← Arraste para explorar · Scroll para zoom · Duplo clique para fullscreen →'
          : 'Panorâmica real de Angola em breve · Vista imersiva disponível'}
      </div>
    </div>
  )
}

function SimulatedScene({ poi, bg }: { poi: any; bg: string }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden cursor-grab"
      style={{ background: bg }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-[200px] opacity-[0.04] select-none pointer-events-none">
        {poi.emoji}
      </div>
      <div className="relative z-10 text-center px-10 mt-16 fade-up">
        <p className="font-display text-[34px] text-white drop-shadow-2xl mb-2">{poi.name}</p>
        <p className="text-[13px] text-white/35 mb-8">{poi.province} · Vista Imersiva</p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {poi.tags.map((t: string) => (
            <span
              key={t}
              className="px-3 py-1.5 rounded-full text-[11px] text-white/45 border border-white/10"
              style={{ background: 'rgba(255,255,255,.04)' }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="bg-[#C9A84C]/07 border border-[#C9A84C]/18 rounded-xl p-4 max-w-xs mx-auto">
          <p className="text-[11px] text-[#C9A84C]/60 mb-1.5 font-medium uppercase tracking-wide">Activar panorâmica real</p>
          <p className="text-[11px] text-white/25 leading-relaxed">
            Adicionar URL de foto equirectangular (JPEG ≥ 4000×2000px) no campo
            <code className="mx-1 px-1 py-0.5 rounded text-[#C9A84C]/50 bg-black/20">foto360</code>
            do POI.
          </p>
        </div>
      </div>
    </div>
  )
}
