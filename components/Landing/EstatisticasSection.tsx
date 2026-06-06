'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useT } from '@/lib/translations'

type StatKeys = 's1_label' | 's2_label' | 's3_label' | 's4_label' | 's5_label' | 's6_label' | 's7_label' | 's8_label'
type SubKeys  = 's1_sub'   | 's2_sub'   | 's3_sub'   | 's4_sub'   | 's5_sub'   | 's6_sub'   | 's7_sub'   | 's8_sub'

interface StatDef {
  value:  number
  suffix: string
  labelKey: StatKeys
  subKey:   SubKeys
}

const STATS: StatDef[] = [
  { value: 1246700, suffix: ' km²', labelKey: 's1_label', subKey: 's1_sub' },
  { value: 34,      suffix: 'M+',   labelKey: 's2_label', subKey: 's2_sub' },
  { value: 18,      suffix: '',     labelKey: 's3_label', subKey: 's3_sub' },
  { value: 1247,    suffix: ' km',  labelKey: 's4_label', subKey: 's4_sub' },
  { value: 4,       suffix: '',     labelKey: 's5_label', subKey: 's5_sub' },
  { value: 1,       suffix: '',     labelKey: 's6_label', subKey: 's6_sub' },
  { value: 20,      suffix: '+',    labelKey: 's7_label', subKey: 's7_sub' },
  { value: 9,       suffix: '',     labelKey: 's8_label', subKey: 's8_sub' },
]

const TIMELINE = [
  { v: '1576', pt: 'Fundação de Luanda', en: 'Founding of Luanda' },
  { v: '1975', pt: 'Independência',       en: 'Independence'       },
  { v: '2002', pt: 'Paz duradoura',       en: 'Lasting peace'      },
]

function formatValue(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace('.', ',') + 'M'
  if (n >= 1_000)     return n.toLocaleString('pt-PT')
  return String(n)
}

function CountUp({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    const duration = 1800
    const start    = Date.now()
    const timer = setInterval(() => {
      const elapsed  = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * target))
      if (progress >= 1) { setCount(target); clearInterval(timer) }
    }, 16)
    return () => clearInterval(timer)
  }, [started, target])

  return <>{formatValue(count)}{suffix}</>
}

function StatCard({ stat, index, started }: { stat: StatDef; index: number; started: boolean }) {
  const t = useT()
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="text-center p-6 border border-white/[0.07] rounded-2xl hover:border-[#C9A84C]/25 transition-all group"
    >
      <div className="font-display text-[clamp(1.8rem,4vw,2.75rem)] font-bold text-[#C9A84C] leading-none mb-2 tabular-nums">
        <CountUp target={stat.value} suffix={stat.suffix} started={started} />
      </div>
      <div className="text-[14px] font-semibold text-white mb-1">{t(stat.labelKey)}</div>
      <div className="text-[11px] text-white/40 tracking-wide">{t(stat.subKey)}</div>
    </motion.div>
  )
}

export default function EstatisticasSection() {
  const t = useT()
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section id="sobre" className="py-24 bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-[#C9A84C]/40" />
            <span className="text-[11px] tracking-[0.3em] text-[#C9A84C] uppercase font-semibold">{t('stats_badge')}</span>
            <div className="h-px w-10 bg-[#C9A84C]/40" />
          </div>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.75rem)] font-bold text-white mb-4">
            {t('stats_title')}
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {STATS.map((s, i) => (
            <StatCard key={i} stat={s} index={i} started={inView} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="space-y-5"
          >
            <h3 className="font-display text-2xl font-bold text-white">{t('about_title')}</h3>
            <p className="text-[14px] text-white/55 leading-[1.85]">{t('about_p1')}</p>
            <p className="text-[14px] text-white/55 leading-[1.85]">{t('about_p2')}</p>
            <div className="flex gap-8 pt-2">
              {TIMELINE.map(item => (
                <div key={item.v}>
                  <div className="font-display text-xl font-bold text-[#C9A84C]">{item.v}</div>
                  <div className="text-[11px] text-white/35 mt-0.5">{t(item.v === '1576' ? 'timeline_1' : item.v === '1975' ? 'timeline_2' : 'timeline_3')}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white/[0.04] border border-white/[0.12] shadow-2xl shadow-black/50">
              <Image
                src="/palancanegra.jpg"
                alt="Palanca Negra Gigante — símbolo nacional de Angola"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-100 contrast-[1.12] saturate-[0.85] brightness-[1.08]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/75 via-[#0A0E1A]/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[11px] text-white/70 tracking-widest uppercase font-medium drop-shadow-md">{t('img_caption')}</div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[#C9A84C]/30 rounded-tr-2xl" />
            <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-[#C9A84C]/30 rounded-bl-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
