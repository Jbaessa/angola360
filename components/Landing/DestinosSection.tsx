'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Clock, Star, X, Users, Navigation,
  TreePine, Waves, Building2, Landmark, Drum, Globe,
  Wind, Mountain,
  type LucideIcon,
} from 'lucide-react'
import { POIS, CAT_CONFIG } from '@/data/pois'
import { useUnsplashPhotos } from '@/lib/use-unsplash'
import { useApp } from '@/lib/store'
import { useT } from '@/lib/translations'

const CAT_ICONS: Record<string, LucideIcon> = {
  natureza: TreePine,
  praia:    Waves,
  cidade:   Building2,
  historia: Landmark,
  cultura:  Drum,
  surf:     Wind,
  aventura: Mountain,
  all:      Globe,
}

const TABS = ['all', 'natureza', 'surf', 'aventura', 'historia', 'cultura', 'praia', 'cidade']

type Poi = typeof POIS[0]

/* ── Modal ─────────────────────────────────────────────────────── */
function DestinoModal({
  poi, photoUrl, onClose,
}: {
  poi: Poi
  photoUrl: string | null
  onClose: () => void
}) {
  const { language } = useApp()
  const t = useT()
  const cat     = CAT_CONFIG[poi.cat]
  const CatIcon = CAT_ICONS[poi.cat] ?? Globe
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)

  const catLabel = language === 'en' ? cat.labelEn : cat.label
  const descricao = language === 'en' ? (poi.descricao_en ?? poi.descricao) : poi.descricao
  const melhorEpoca = language === 'en' ? (poi.melhorEpoca_en ?? poi.melhorEpoca) : poi.melhorEpoca
  const tags = language === 'en' ? (poi.tags_en ?? poi.tags) : poi.tags

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Hero image */}
          <div className="relative h-64 md:h-80 rounded-t-2xl overflow-hidden shrink-0">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${cat.color}22 0%, #0d1629 100%)` }}
            >
              <CatIcon size={72} strokeWidth={1} className="opacity-10" style={{ color: cat.color }} />
            </div>

            {poi.foto && (
              <Image
                src={poi.foto}
                alt={poi.name}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
                priority
              />
            )}
            {!poi.foto && photoUrl && !imgFailed && (
              <img
                src={photoUrl}
                alt={poi.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgFailed(true)}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <span
              className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold backdrop-blur-sm"
              style={{ background: '#00000088', color: cat.color, border: `1px solid ${cat.color}55` }}
            >
              <CatIcon size={11} strokeWidth={2} />
              {catLabel}
            </span>

            <span className="absolute top-4 right-14 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/50 text-white text-[12px] font-semibold backdrop-blur-sm">
              <Star size={11} strokeWidth={0} fill="currentColor" className="text-amber-400" />
              {poi.rating}
            </span>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm transition-all"
              aria-label={t('dest_close')}
            >
              <X size={16} strokeWidth={2} />
            </button>

            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="font-display text-[22px] md:text-[26px] font-bold text-white leading-snug drop-shadow-lg">
                {poi.name}
              </h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-4 mb-5 text-[13px] text-[#6A6A6A]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} strokeWidth={1.75} className="text-[#C9A84C]" />
                {poi.province}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} strokeWidth={1.75} className="text-[#C9A84C]" />
                {t('dest_best_season')} {melhorEpoca}
              </span>
              {poi.visitantes && (
                <span className="inline-flex items-center gap-1.5">
                  <Users size={13} strokeWidth={1.75} className="text-[#C9A84C]" />
                  {poi.visitantes}
                </span>
              )}
              {poi.coordenadas && (
                <span className="inline-flex items-center gap-1.5">
                  <Navigation size={13} strokeWidth={1.75} className="text-[#C9A84C]" />
                  {poi.coordenadas}
                </span>
              )}
            </div>

            <p className="text-[14px] text-[#3A3A3A] leading-relaxed mb-6">{descricao}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-3 py-1 rounded-full"
                  style={{ background: `${cat.color}15`, color: cat.color }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="/mapa"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#C9A84C] hover:bg-[#A07830] text-white font-semibold rounded-xl transition-all shadow-md shadow-[#C9A84C]/20 text-[14px]"
            >
              <MapPin size={15} strokeWidth={2} />
              {t('dest_view_map')}
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Card ───────────────────────────────────────────────────────── */
function DestinoCard({
  poi, index, photoUrl, onOpen,
}: {
  poi: Poi
  index: number
  photoUrl: string | null
  onOpen: () => void
}) {
  const { language } = useApp()
  const t = useT()
  const cat    = CAT_CONFIG[poi.cat]
  const CatIcon: LucideIcon = CAT_ICONS[poi.cat] ?? Globe
  const [imgFailed, setImgFailed] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const catLabel = language === 'en' ? cat.labelEn : cat.label
  const descricao = language === 'en' ? (poi.descricao_en ?? poi.descricao) : poi.descricao
  const melhorEpoca = language === 'en' ? (poi.melhorEpoca_en ?? poi.melhorEpoca) : poi.melhorEpoca
  const tags = language === 'en' ? (poi.tags_en ?? poi.tags) : poi.tags

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative h-56 overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${cat.color}22 0%, #0d1629 100%)` }}
        >
          <CatIcon size={52} strokeWidth={1} className="opacity-10" style={{ color: cat.color }} />
        </div>

        {poi.foto && (
          <Image
            src={poi.foto}
            alt={poi.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={index < 3}
          />
        )}

        {!poi.foto && photoUrl && !imgFailed && (
          <img
            src={photoUrl}
            alt={poi.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgFailed(true)}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <span
          className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-sm"
          style={{ background: '#00000088', color: cat.color, border: `1px solid ${cat.color}55` }}
        >
          <CatIcon size={10} strokeWidth={2} />
          {catLabel}
        </span>

        <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 text-white text-[11px] font-semibold backdrop-blur-sm">
          <Star size={10} strokeWidth={0} fill="currentColor" className="text-amber-400" />
          {poi.rating}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-[18px] font-bold text-[#1A1A1A] mb-1 leading-snug">{poi.name}</h3>
        <p className="flex items-center gap-3 text-[12px] text-[#8A8A8A] mb-3">
          <span className="inline-flex items-center gap-1">
            <MapPin size={11} strokeWidth={1.75} className="text-[#C9A84C]" />
            {poi.province}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={11} strokeWidth={1.75} />
            {melhorEpoca}
          </span>
        </p>
        <p className="text-[13px] text-[#4A4A4A] leading-relaxed line-clamp-2">{descricao}</p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F0EDE6]">
          <div className="flex gap-1.5 flex-wrap">
            {tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] text-[#8A8A8A] bg-[#F8F6F1] px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <Link
            href="/mapa"
            className="text-[12px] font-semibold text-[#C9A84C] hover:text-[#A07830] transition-colors shrink-0"
            onClick={e => e.stopPropagation()}
          >
            {t('dest_view_map_s')}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Section ────────────────────────────────────────────────────── */
export default function DestinosSection() {
  const t = useT()
  const { language } = useApp()
  const [activeTab, setActiveTab] = useState('all')
  const [selected, setSelected] = useState<{ poi: Poi; photoUrl: string | null } | null>(null)

  const displayedPOIs = (
    activeTab === 'all'
      ? [...POIS].sort((a, b) => b.rating - a.rating).slice(0, 6)
      : POIS.filter(p => p.cat === activeTab).sort((a, b) => b.rating - a.rating).slice(0, 6)
  )

  const photoUrls = useUnsplashPhotos(displayedPOIs.map(p => `${p.name} Angola`))

  return (
    <section id="destinos" className="py-24 bg-[#F8F6F1]">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-[#C9A84C]/50" />
            <span className="text-[11px] tracking-[0.3em] text-[#C9A84C] uppercase font-semibold">{t('dest_badge')}</span>
            <div className="h-px w-10 bg-[#C9A84C]/50" />
          </div>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.75rem)] font-bold text-[#1A1A1A] mb-4">
            {t('dest_title')}
          </h2>
          <p className="text-[15px] text-[#6A6A6A] max-w-xl mx-auto leading-relaxed">
            {t('dest_subtitle')}
          </p>
        </motion.div>

        {/* Tab bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {TABS.map(key => {
            const cfg = CAT_CONFIG[key]
            const label = key === 'all'
              ? t('cat_all')
              : language === 'en' ? cfg?.labelEn : cfg?.label
            const TabIcon = CAT_ICONS[key] ?? Globe
            const isActive = activeTab === key
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all flex-shrink-0 border ${
                  isActive
                    ? 'bg-[#C9A84C] text-[#080d18] border-[#C9A84C] font-semibold'
                    : 'border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/10'
                }`}
              >
                <TabIcon size={13} strokeWidth={1.75} />
                <span>{label}</span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPOIs.map((poi, i) => (
            <DestinoCard
              key={poi.id}
              poi={poi}
              index={i}
              photoUrl={photoUrls[i] ?? null}
              onOpen={() => setSelected({ poi, photoUrl: photoUrls[i] ?? null })}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href={activeTab === 'all' ? '/mapa' : `/mapa?cat=${activeTab}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A84C] hover:bg-[#A07830] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#C9A84C]/20"
          >
            {t('dest_cta')}
          </Link>
        </motion.div>
      </div>

      {selected && (
        <DestinoModal
          poi={selected.poi}
          photoUrl={selected.photoUrl}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}
