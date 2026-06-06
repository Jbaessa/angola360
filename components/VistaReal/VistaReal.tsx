'use client'

import { useEffect, useState } from 'react'
import { useApp } from '@/lib/store'
import { X, ExternalLink } from 'lucide-react'

type Tab = 'fotos' | 'sobre' | 'video'

interface WikiSummary {
  title: string
  extract: string
  thumbnail?: { source: string }
  content_urls?: { desktop: { page: string } }
}

interface UnsplashPhoto {
  id: string
  urls: { small: string; regular: string }
  alt_description: string | null
  user: { name: string; links: { html: string } }
}

export default function VistaReal() {
  const { vistaRealOpen, setVistaRealOpen, selectedPOI, setView360Open } = useApp()
  const [tab, setTab]           = useState<Tab>('fotos')
  const [wiki, setWiki]         = useState<WikiSummary | null>(null)
  const [wikiLoading, setWikiLoading] = useState(false)
  const [photos, setPhotos]     = useState<UnsplashPhoto[]>([])
  const [photosLoading, setPhotosLoading] = useState(false)
  const [lightbox, setLightbox] = useState<UnsplashPhoto | null>(null)

  useEffect(() => {
    if (!vistaRealOpen || !selectedPOI) return
    setTab('fotos')
    setWiki(null)
    setPhotos([])
    setLightbox(null)

    // Wikipedia: PT → EN fallback
    setWikiLoading(true)
    ;(async () => {
      try {
        const search = async (lang: string, q: string) => {
          const r = await fetch(
            `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&origin=*&srlimit=1`
          )
          const d = await r.json()
          return d?.query?.search?.[0]?.title as string | undefined
        }
        const summary = async (lang: string, title: string) => {
          const r = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
          return r.ok ? r.json() : null
        }
        let title = await search('pt', selectedPOI.name)
        let data  = title ? await summary('pt', title) : null
        if (!data) {
          title = await search('en', `${selectedPOI.name} Angola`)
          data  = title ? await summary('en', title) : null
        }
        setWiki(data)
      } catch (_) {}
      setWikiLoading(false)
    })()

    // Unsplash
    const key = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
    if (!key) return
    setPhotosLoading(true)
    fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(selectedPOI.name + ' Angola')}&per_page=9&orientation=landscape&client_id=${key}`
    )
      .then(r => r.json())
      .then(d => { setPhotos(d.results ?? []); setPhotosLoading(false) })
      .catch(() => setPhotosLoading(false))
  }, [vistaRealOpen, selectedPOI?.id])

  if (!vistaRealOpen || !selectedPOI) return null

  const hasPano  = !!selectedPOI.foto360
  const ytQuery  = encodeURIComponent(`${selectedPOI.name} Angola`)
  const gmUrl    = `https://www.google.com/maps/@${selectedPOI.lat},${selectedPOI.lng},14z/data=!3m1!1e3`
  const unsplashKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

  const TABS: { key: Tab; label: string }[] = [
    { key: 'fotos', label: 'Fotos' },
    { key: 'sobre', label: 'Sobre' },
    { key: 'video', label: 'Vídeo' },
  ]

  return (
    <div className="fixed inset-0 z-[2000] bg-[#080d18] flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.08] bg-[#0d1929] shrink-0">
        <span className="text-2xl">{selectedPOI.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="font-display text-[18px] text-[#F0EDE6] leading-tight truncate">{selectedPOI.name}</div>
          <div className="text-[11px] text-[#8A9BB0]">{selectedPOI.province} · Angola</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {hasPano && (
            <button
              onClick={() => { setVistaRealOpen(false); setView360Open(true) }}
              className="px-3 py-1.5 rounded-lg text-[11px] font-medium border border-[#C9A84C]/30 text-[#C9A84C] bg-[#C9A84C]/08 hover:bg-[#C9A84C]/15 transition-all"
            >
              Vista 360°
            </button>
          )}
          <a href={gmUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] border border-white/10 text-[#8A9BB0] hover:text-[#F0EDE6] transition-all"
          >
            <ExternalLink size={11} strokeWidth={2} />
            Satélite
          </a>
          <button
            onClick={() => setVistaRealOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 text-[#8A9BB0] hover:text-[#F0EDE6] transition-all"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-5 border-b border-white/[0.07] bg-[#0d1929] shrink-0">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-[12px] font-medium border-b-2 transition-all ${
              tab === t.key
                ? 'border-[#C9A84C] text-[#C9A84C]'
                : 'border-transparent text-[#8A9BB0] hover:text-[#F0EDE6]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">

        {/* ── FOTOS ── */}
        {tab === 'fotos' && (
          <div className="p-4">
            {!unsplashKey ? (
              <PlaceholderCard
                title="Unsplash não configurado"
                body={`Adiciona NEXT_PUBLIC_UNSPLASH_ACCESS_KEY ao .env.local para ver fotos de ${selectedPOI.name}.`}
                href="https://unsplash.com/oauth/applications"
                cta="Criar key gratuita no Unsplash"
              />
            ) : photosLoading ? (
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="aspect-[4/3] rounded-xl bg-white/[0.06] animate-pulse" />
                ))}
              </div>
            ) : photos.length === 0 ? (
              <EmptyState text={`Sem fotos encontradas para "${selectedPOI.name}".`} />
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {photos.map(p => (
                  <button key={p.id} onClick={() => setLightbox(p)}
                    className="aspect-[4/3] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#C9A84C]/50 transition-all"
                  >
                    <img
                      src={p.urls.small}
                      alt={p.alt_description ?? selectedPOI.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SOBRE ── */}
        {tab === 'sobre' && (
          <div className="p-6 max-w-2xl mx-auto">
            {wikiLoading ? (
              <WikiSkeleton />
            ) : wiki ? (
              <div className="space-y-5">
                {wiki.thumbnail && (
                  <img src={wiki.thumbnail.source} alt={wiki.title}
                    className="w-full max-h-64 object-cover rounded-2xl"
                  />
                )}
                <h2 className="font-display text-[22px] text-[#F0EDE6]">{wiki.title}</h2>
                <p className="text-[13px] text-[#8A9BB0] leading-relaxed">{wiki.extract}</p>
                {wiki.content_urls && (
                  <a href={wiki.content_urls.desktop.page} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-[#C9A84C] hover:text-[#E8C96A] transition-all"
                  >
                    <ExternalLink size={11} strokeWidth={2} />
                    Ver artigo completo na Wikipedia
                  </a>
                )}
              </div>
            ) : (
              <EmptyState text={`Sem artigo Wikipedia encontrado para "${selectedPOI.name}".`} />
            )}
          </div>
        )}

        {/* ── VÍDEO ── */}
        {tab === 'video' && (
          <div className="flex flex-col items-center justify-center h-full gap-5 p-8">
            <div className="w-full max-w-md rounded-2xl bg-[#0d1929] border border-white/[0.08] p-8 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-600/15 border border-red-500/20 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#ef4444">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </div>
              <p className="text-[15px] text-[#F0EDE6] font-medium mb-1">Vídeos de {selectedPOI.name}</p>
              <p className="text-[12px] text-[#8A9BB0] mb-5">Explora vídeos deste destino no YouTube</p>
              <a
                href={`https://www.youtube.com/results?search_query=${ytQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-[13px] font-semibold rounded-xl hover:bg-red-500 transition-all"
              >
                <ExternalLink size={13} strokeWidth={2} />
                Abrir no YouTube
              </a>
            </div>
            <p className="text-[10px] text-[#8A9BB0]/40 text-center max-w-xs">
              Para embeber vídeos directamente, integra a YouTube Data API v3 (gratuita, 10 000 units/dia).
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[2100] bg-black/92 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.urls.regular}
              alt={lightbox.alt_description ?? selectedPOI.name}
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="mt-2 text-[10px] text-white/35 text-right">
              Foto por{' '}
              <a
                href={`${lightbox.user.links.html}?utm_source=angola360&utm_medium=referral`}
                target="_blank" rel="noopener noreferrer"
                className="underline"
              >
                {lightbox.user.name}
              </a>
              {' '}via{' '}
              <a
                href="https://unsplash.com/?utm_source=angola360&utm_medium=referral"
                target="_blank" rel="noopener noreferrer"
                className="underline"
              >
                Unsplash
              </a>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white/70 hover:text-white transition-all"
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function PlaceholderCard({ title, body, href, cta }: {
  title: string; body: string; href: string; cta: string
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center max-w-sm mx-auto">
      <div className="w-12 h-12 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <p className="text-[13px] text-[#F0EDE6] font-medium mb-1">{title}</p>
      <p className="text-[11px] text-[#8A9BB0] leading-relaxed mb-4">{body}</p>
      <a href={href} target="_blank" rel="noopener noreferrer"
        className="text-[11px] text-[#C9A84C] border border-[#C9A84C]/30 px-3 py-1.5 rounded-lg hover:bg-[#C9A84C]/10 transition-all"
      >
        {cta}
      </a>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center py-20">
      <p className="text-[12px] text-[#8A9BB0]/50">{text}</p>
    </div>
  )
}

function WikiSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="w-full h-48 bg-white/[0.06] rounded-2xl" />
      <div className="h-6 w-48 bg-white/[0.06] rounded-lg" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-3 bg-white/[0.04] rounded" style={{ width: i === 3 ? '70%' : '100%' }} />
      ))}
    </div>
  )
}
