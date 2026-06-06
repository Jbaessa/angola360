'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Map } from 'lucide-react'
import { useUnsplashPhoto } from '@/lib/use-unsplash'
import { useT } from '@/lib/translations'

export default function CTASection() {
  const t = useT()
  const bgPhoto = useUnsplashPhoto('Angola sunset Africa savanna golden hour')

  return (
    <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0 bg-[#0A0E1A]" />
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: bgPhoto ? `url('${bgPhoto}')` : undefined,
          opacity: bgPhoto ? 0.35 : 0,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A]/60 via-[#0A0E1A]/40 to-[#0A0E1A]/80" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto w-full py-20">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <div className="h-px w-10 bg-[#C9A84C]/40" />
          <span className="text-[11px] tracking-[0.35em] text-[#C9A84C] uppercase font-semibold">{t('cta_badge')}</span>
          <div className="h-px w-10 bg-[#C9A84C]/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-display text-[clamp(2.2rem,5.5vw,4rem)] font-bold text-white leading-tight mb-6"
        >
          {t('cta_title_1')}<br />{t('cta_title_2')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[15px] text-white/55 max-w-xl mx-auto leading-relaxed mb-10"
        >
          {t('cta_subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/mapa"
            className="flex items-center gap-2.5 px-10 py-4 bg-[#C9A84C] hover:bg-[#A07830] text-white text-[15px] font-semibold rounded-2xl transition-all shadow-2xl shadow-[#C9A84C]/30 active:scale-95"
          >
            <Map size={18} strokeWidth={2} />
            {t('cta_map')}
          </Link>
          <Link href="/mapa?chat=open"
            className="flex items-center gap-2.5 px-8 py-4 border-2 border-white/25 text-white text-[15px] font-medium rounded-2xl hover:bg-white/10 transition-all active:scale-95"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/40 shrink-0">
              <img src="/njila_meio.png" alt="Njila" className="w-full h-full object-cover object-top" />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#2ECC71] border border-[#0A0E1A]" />
            </div>
            {t('cta_ai')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
