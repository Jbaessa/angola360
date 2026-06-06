'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Map, ChevronDown, LayoutGrid, Waves, Users, TreePine, Landmark, type LucideIcon } from 'lucide-react'
import { useApp } from '@/lib/store'
import { useT } from '@/lib/translations'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay, ease: EASE },
  }),
}

const QUICK_STATS: { value: string; label_pt: string; label_en: string; Icon: LucideIcon }[] = [
  { value: '18',       label_pt: 'Províncias',        label_en: 'Provinces',      Icon: LayoutGrid },
  { value: '1 247 km', label_pt: 'Costa Atlântica',   label_en: 'Atlantic Coast', Icon: Waves      },
  { value: '34M+',     label_pt: 'Habitantes',         label_en: 'Inhabitants',    Icon: Users      },
  { value: '4',        label_pt: 'Parques Nacionais',  label_en: 'National Parks', Icon: TreePine   },
  { value: '1 UNESCO', label_pt: 'Mbanza Kongo',       label_en: 'Mbanza Kongo',   Icon: Landmark   },
]

export default function HeroSection() {
  const t = useT()
  const { language } = useApp()

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/fundoA360.png')" }}
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />

      <div className="relative z-10 text-center px-5 max-w-5xl mx-auto w-full">

        <motion.div
          custom={0.15} variants={fadeUp} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 mb-6"
        >
          <div className="h-px w-8 bg-[#C9A84C]/60" />
          <span className="text-[11px] tracking-[0.35em] text-[#C9A84C] uppercase font-medium">
            {t('hero_badge')}
          </span>
          <div className="h-px w-8 bg-[#C9A84C]/60" />
        </motion.div>

        <motion.h1
          custom={0.35} variants={fadeUp} initial="hidden" animate="visible"
          className="font-display text-[clamp(3rem,9vw,7rem)] font-bold text-white leading-[0.95] mb-6 tracking-tight"
        >
          {t('hero_title')}
        </motion.h1>

        <motion.p
          custom={0.55} variants={fadeUp} initial="hidden" animate="visible"
          className="text-[clamp(1rem,2vw,1.2rem)] text-white/65 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero_subtitle').split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </motion.p>

        <motion.div
          custom={0.72} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/mapa"
            className="glow-pulse flex items-center gap-2.5 px-8 py-4 bg-[#C9A84C] hover:bg-[#E8C96A] text-[#1a0f00] text-[15px] font-semibold rounded-xl transition-colors active:scale-95"
          >
            <Map size={17} strokeWidth={2} />
            {t('hero_cta_map')}
          </Link>
          <a href="#destinos"
            className="flex items-center gap-2.5 px-8 py-4 border border-white/35 text-white text-[15px] font-medium rounded-xl hover:bg-white/10 transition-all active:scale-95"
          >
            {t('hero_cta_dest')}
          </a>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/55 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-center gap-6 md:gap-12 flex-wrap">
          {QUICK_STATS.map((s, i) => (
            <div key={i} className="text-center">
              <s.Icon size={12} strokeWidth={1.75} className="text-[#C9A84C]/50 mx-auto mb-1" />
              <div className="text-[#C9A84C] font-bold text-sm md:text-base leading-none">{s.value}</div>
              <div className="text-white/45 text-[10px] mt-1 whitespace-nowrap tracking-wide">
                {language === 'en' ? s.label_en : s.label_pt}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-transparent to-white/25"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
        <span className="text-[9px] text-white/30 uppercase tracking-[0.25em] rotate-90 origin-center mt-2">Scroll</span>
      </motion.div>

      <motion.a
        href="#destinos"
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <ChevronDown size={22} className="text-white/30" strokeWidth={1.5} />
      </motion.a>
    </section>
  )
}
