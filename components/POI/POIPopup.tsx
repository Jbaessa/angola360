'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/lib/store'
import { useT } from '@/lib/translations'
import { CAT_CONFIG } from '@/data/pois'
import {
  X, Star, MapPin, Calendar, Crosshair, Hash,
  Sparkles, Eye, Navigation, Users,
  Leaf, Waves, Building2, Landmark, Drum,
} from 'lucide-react'

const CAT_ICON: Record<string, { lg: React.ReactNode; xs: React.ReactNode }> = {
  natureza: { lg: <Leaf size={21} strokeWidth={1.6}/>, xs: <Leaf size={9} strokeWidth={2}/> },
  praia:    { lg: <Waves size={21} strokeWidth={1.6}/>, xs: <Waves size={9} strokeWidth={2}/> },
  cidade:   { lg: <Building2 size={21} strokeWidth={1.6}/>, xs: <Building2 size={9} strokeWidth={2}/> },
  historia: { lg: <Landmark size={21} strokeWidth={1.6}/>, xs: <Landmark size={9} strokeWidth={2}/> },
  cultura:  { lg: <Drum size={21} strokeWidth={1.6}/>, xs: <Drum size={9} strokeWidth={2}/> },
}

export default function POIPopup() {
  const { selectedPOI, setSelectedPOI, setView360Open, language } = useApp()
  const t = useT()
  const [aiInsight, setAiInsight] = useState('')
  const [loadingAI, setLoadingAI] = useState(false)

  const descricao   = selectedPOI ? (language === 'en' ? (selectedPOI.descricao_en   ?? selectedPOI.descricao)   : selectedPOI.descricao)   : ''
  const melhorEpoca = selectedPOI ? (language === 'en' ? (selectedPOI.melhorEpoca_en ?? selectedPOI.melhorEpoca) : selectedPOI.melhorEpoca) : ''
  const tags        = selectedPOI ? (language === 'en' ? (selectedPOI.tags_en        ?? selectedPOI.tags)        : selectedPOI.tags)        : []

  useEffect(() => {
    if (!selectedPOI) return
    setAiInsight('')
    setLoadingAI(true)
    let text = ''

    const userMsg = language === 'en'
      ? `Give me 2 short evocative sentences about ${selectedPOI.name} in ${selectedPOI.province}, Angola. Mention something unique and special. Reply only in English, no emojis.`
      : `Dá-me 2 frases curtas e evocativas sobre ${selectedPOI.name} em ${selectedPOI.province}, Angola. Menciona algo único e especial. Responde só em português, sem emojis.`

    const sysMsg = language === 'en'
      ? 'You are the AI Guide of Angola360. Give short, poetic and informative insights about Angolan tourist destinations. Maximum 2 sentences. English.'
      : 'És o Guia IA de Angola360. Dás insights curtos, poéticos e informativos sobre destinos turísticos angolanos. Máximo 2 frases. Português europeu.'

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: userMsg }],
        system: sysMsg,
      }),
    })
      .then(res => {
        const reader = res.body?.getReader()
        const decoder = new TextDecoder()
        function read() {
          reader?.read().then(({ done, value }) => {
            if (done) { setLoadingAI(false); return }
            const chunk = decoder.decode(value)
            for (const line of chunk.split('\n')) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6))
                  if (data.delta) { text += data.delta; setAiInsight(text) }
                } catch (_) {}
              }
            }
            read()
          })
        }
        read()
      })
      .catch(() => setLoadingAI(false))
  }, [selectedPOI?.id, language])

  if (!selectedPOI) return null

  const cfg    = CAT_CONFIG[selectedPOI.cat]
  const icons  = CAT_ICON[selectedPOI.cat] ?? CAT_ICON.natureza
  const catLabel = language === 'en' ? cfg.labelEn : cfg.label
  const hasPano = !!selectedPOI.foto360
  const filledStars = Math.floor(selectedPOI.rating)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 32, scale: 0.97 }}
        animate={{ opacity: 1, x: 0,  scale: 1 }}
        exit={{ opacity: 0, x: 32, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        className="absolute top-4 right-4 z-30 w-[308px] rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: '#0a101c',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        {/* Category colour accent top bar */}
        <div
          className="h-[3px] w-full"
          style={{ background: `linear-gradient(to right, ${selectedPOI.color}, ${selectedPOI.color}44, transparent)` }}
        />

        {/* ── HEADER ── */}
        <div
          className="relative px-5 pt-4 pb-4"
          style={{ background: `linear-gradient(135deg, ${selectedPOI.color}12 0%, transparent 65%)` }}
        >
          <button
            onClick={() => setSelectedPOI(null)}
            className="absolute top-3.5 right-3.5 w-7 h-7 rounded-lg flex items-center justify-center text-[#8A9BB0] hover:text-[#F0EDE6] transition-all"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <X size={14} strokeWidth={2.5} />
          </button>

          <div className="flex items-start gap-3 mb-3 pr-9">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: `${selectedPOI.color}1e`,
                border: `1.5px solid ${selectedPOI.color}40`,
                color: selectedPOI.color,
              }}
            >
              {icons.lg}
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-[18px] font-semibold text-[#F0EDE6] leading-snug">
                {selectedPOI.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <MapPin size={9} strokeWidth={2} style={{ color: '#8A9BB0', opacity: 0.55 }} />
                <span className="text-[10px] text-[#8A9BB0]">{selectedPOI.province}</span>
                <span className="w-px h-2.5 bg-white/10" />
                <span
                  className="flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={{
                    background: cfg.color + '18',
                    color: cfg.color,
                    border: `1px solid ${cfg.color}30`,
                  }}
                >
                  {icons.xs}
                  {catLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-[2px]">
              {[1,2,3,4,5].map(i => (
                <Star
                  key={i} size={11} strokeWidth={1.5}
                  fill={i <= filledStars ? '#C9A84C' : 'none'}
                  color={i <= filledStars ? '#C9A84C' : 'rgba(138,155,176,0.35)'}
                />
              ))}
            </div>
            <span className="text-[12px] text-[#C9A84C] font-bold">{selectedPOI.rating}</span>
            <span className="w-px h-3 bg-white/[0.1]" />
            <Users size={9} strokeWidth={2} style={{ color: '#8A9BB0', opacity: 0.55 }} />
            <span className="text-[10px] text-[#8A9BB0]">{selectedPOI.visitantes}</span>
          </div>
        </div>

        <div className="h-px mx-5 bg-white/[0.06]" />

        {/* ── BODY ── */}
        <div className="px-5 py-4 space-y-3.5">

          <p className="text-[12px] text-[#8A9BB0] leading-[1.65]">{descricao}</p>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl p-2.5 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.025)' }}>
              <div className="flex items-center gap-1 mb-1.5">
                <Calendar size={9} strokeWidth={2} style={{ color: '#8A9BB0', opacity: 0.5 }} />
                <span className="text-[8px] text-[#8A9BB0]/50 uppercase tracking-[1.5px]">{t('poi_best_season')}</span>
              </div>
              <div className="text-[11px] text-[#F0EDE6] font-semibold leading-tight">{melhorEpoca}</div>
            </div>
            <div className="rounded-xl p-2.5 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.025)' }}>
              <div className="flex items-center gap-1 mb-1.5">
                <Crosshair size={9} strokeWidth={2} style={{ color: '#8A9BB0', opacity: 0.5 }} />
                <span className="text-[8px] text-[#8A9BB0]/50 uppercase tracking-[1.5px]">{t('poi_coords')}</span>
              </div>
              <div className="text-[10px] text-[#F0EDE6] font-mono leading-tight">{selectedPOI.coordenadas}</div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1 mb-1.5">
              <Hash size={8} strokeWidth={2} style={{ color: '#8A9BB0', opacity: 0.35 }} />
              <span className="text-[8px] text-[#8A9BB0]/35 uppercase tracking-[1.5px]">{t('poi_highlights')}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="text-[9.5px] px-2 py-0.5 rounded-full text-[#8A9BB0]"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* AI Insight */}
          <div
            className="rounded-xl p-3.5 border border-[#C9A84C]/18"
            style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.07), rgba(201,168,76,0.02))' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={11} strokeWidth={2} className="text-[#C9A84C]" />
              <span className="text-[8.5px] text-[#C9A84C]/75 uppercase tracking-[2px] font-bold">{t('poi_ai_guide')}</span>
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2ECC71] ai-dot shrink-0" />
            </div>
            {loadingAI && !aiInsight ? (
              <div className="flex gap-1.5 py-0.5">
                {[0,1,2].map(i => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/35 ai-dot"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-[#C9A84C]/75 leading-relaxed italic">{aiInsight || '…'}</p>
            )}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <button
              onClick={() => setView360Open(true)}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-semibold transition-all"
              style={{
                background: 'rgba(201,168,76,0.09)',
                border: '1px solid rgba(201,168,76,0.30)',
                color: '#C9A84C',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.16)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.09)')}
            >
              <Eye size={13} strokeWidth={2} />
              {t('poi_view_360')}
              {hasPano && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] ml-0.5 shrink-0" />
              )}
            </button>
            <button
              onClick={() => window.open(`https://www.google.com/maps?q=${selectedPOI.lat},${selectedPOI.lng}`, '_blank')}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-medium text-[#8A9BB0] hover:text-[#F0EDE6] transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)')}
            >
              <Navigation size={13} strokeWidth={2} />
              {t('poi_maps')}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
