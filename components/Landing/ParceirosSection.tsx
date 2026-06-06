'use client'

import { motion } from 'framer-motion'
import {
  PlaneTakeoff, Plane, Landmark, Binoculars,
  Building2, Leaf, Waves, Compass, Handshake,
  type LucideIcon,
} from 'lucide-react'
import { useT } from '@/lib/translations'

interface ParceiroBase {
  nome:     string
  tipoKey:  'tipo_air' | 'tipo_gov' | 'tipo_tour' | 'tipo_hotel' | 'tipo_eco' | 'tipo_coast' | 'tipo_agency'
  Icon:     LucideIcon
  destaque: boolean
  url:      string
}

const PARCEIROS: ParceiroBase[] = [
  { nome: 'TAAG — Linhas Aéreas de Angola', tipoKey: 'tipo_air',    Icon: PlaneTakeoff, destaque: true,  url: 'https://www.taag.com' },
  { nome: 'Ministério do Turismo',          tipoKey: 'tipo_gov',    Icon: Landmark,     destaque: false, url: '#' },
  { nome: 'Angola Safari Tours',            tipoKey: 'tipo_tour',   Icon: Binoculars,   destaque: false, url: '#' },
  { nome: 'Hotel Presidente Luanda',        tipoKey: 'tipo_hotel',  Icon: Building2,    destaque: false, url: '#' },
  { nome: 'Air Angola',                     tipoKey: 'tipo_air',    Icon: Plane,        destaque: false, url: '#' },
  { nome: 'Quiçama Park Lodge',             tipoKey: 'tipo_eco',    Icon: Leaf,         destaque: false, url: '#' },
  { nome: 'Benguela By The Sea',            tipoKey: 'tipo_coast',  Icon: Waves,        destaque: false, url: '#' },
  { nome: 'Angola Descoberta',              tipoKey: 'tipo_agency', Icon: Compass,      destaque: false, url: '#' },
]

export default function ParceirosSection() {
  const t = useT()

  return (
    <section id="parceiros" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-[#C9A84C]/50" />
            <span className="text-[11px] tracking-[0.3em] text-[#C9A84C] uppercase font-semibold">{t('partners_badge')}</span>
            <div className="h-px w-10 bg-[#C9A84C]/50" />
          </div>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.75rem)] font-bold text-[#1A1A1A] mb-4">
            {t('partners_title')}
          </h2>
          <p className="text-[15px] text-[#6A6A6A] max-w-xl mx-auto leading-relaxed">
            {t('partners_subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-14">
          {PARCEIROS.map((p, i) => (
            <motion.a
              key={i}
              href={p.url}
              target={p.url !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className={`group relative flex flex-col p-5 rounded-2xl border transition-all cursor-pointer ${
                p.destaque
                  ? 'border-[#C9A84C]/40 bg-[#C9A84C]/[0.04] hover:border-[#C9A84C]/70 hover:shadow-lg hover:shadow-[#C9A84C]/10'
                  : 'border-[#E8E4DC] bg-white hover:border-[#C9A84C]/40 hover:shadow-md'
              }`}
            >
              {p.destaque && (
                <span className="absolute -top-2.5 left-4 text-[9px] tracking-wider uppercase font-bold text-[#C9A84C] bg-white border border-[#C9A84C]/30 px-2 py-0.5 rounded-full">
                  {t('partners_strategic')}
                </span>
              )}

              <div className="flex items-center gap-1.5 mb-3">
                <p.Icon size={13} strokeWidth={2} className="text-[#C9A84C] shrink-0" />
                <span className="text-[10px] text-[#C9A84C] uppercase tracking-widest font-semibold leading-none">
                  {t(p.tipoKey)}
                </span>
              </div>

              <div className="text-[13px] font-semibold text-[#1A1A1A] leading-snug group-hover:text-[#C9A84C] transition-colors">
                {p.nome}
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center bg-[#F8F6F1] border border-[#E8E4DC] rounded-2xl p-10"
        >
          <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mx-auto mb-4">
            <Handshake size={18} strokeWidth={1.5} className="text-[#C9A84C]" />
          </div>
          <h3 className="font-display text-[20px] font-bold text-[#1A1A1A] mb-2">
            {t('partners_cta_title')}
          </h3>
          <p className="text-[13px] text-[#6A6A6A] mb-6 max-w-md mx-auto">
            {t('partners_cta_sub')}
          </p>
          <a href="mailto:parceiros@angola360.ao"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#C9A84C] hover:bg-[#A07830] text-white font-semibold rounded-xl transition-all text-[14px]"
          >
            {t('partners_cta_btn')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
