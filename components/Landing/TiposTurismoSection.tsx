'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TreePine, Wind, Mountain, Landmark, Drum, Waves, type LucideIcon } from 'lucide-react'
import { useApp } from '@/lib/store'

interface TipoItem {
  Icon:       LucideIcon
  titulo:     string
  tituloEn:   string
  desc:       string
  descEn:     string
  cat:        string
  cor:        string
  highlights: string[]
}

const TIPOS: TipoItem[] = [
  {
    Icon: TreePine,
    titulo:   'Ecoturismo & Safaris',
    tituloEn: 'Ecotourism & Safaris',
    desc:   'Parques nacionais, palanca negra gigante, fauna selvagem',
    descEn: 'National parks, Giant Sable Antelope, wild fauna',
    cat: 'natureza', cor: '#2ECC71',
    highlights: ['Quiçama', 'Iona', 'Cangandala', 'Maiombe'],
  },
  {
    Icon: Wind,
    titulo:   'Surf & Desportos Aquáticos',
    tituloEn: 'Surf & Water Sports',
    desc:   'Cabo Ledo eleito pelo NYT 2025, ondas de classe mundial',
    descEn: 'Cabo Ledo chosen by NYT 2025, world-class waves',
    cat: 'surf', cor: '#2980B9',
    highlights: ['Cabo Ledo', 'Sangano', 'Baía Azul', 'Namibe'],
  },
  {
    Icon: Mountain,
    titulo:   'Aventura & Trekking',
    tituloEn: 'Adventure & Trekking',
    desc:   'Morro do Môco, grutas virgens, rapel na Tundavala',
    descEn: 'Morro do Môco, pristine caves, rappel at Tundavala',
    cat: 'aventura', cor: '#D35400',
    highlights: ['Morro do Môco', 'Tundavala', 'Grutas Nzenzo', 'Rio Cubango'],
  },
  {
    Icon: Landmark,
    titulo:   'Turismo Cultural & Histórico',
    tituloEn: 'Cultural & Historic Tourism',
    desc:   'Reino do Kongo, UNESCO, Rainha Nzinga, arquitectura colonial',
    descEn: 'Kingdom of Kongo, UNESCO, Queen Njinga, colonial architecture',
    cat: 'historia', cor: '#1ABC9C',
    highlights: ['Mbanza Kongo', 'Fortaleza São Miguel', 'Pedras Negras', 'Cidade Alta'],
  },
  {
    Icon: Drum,
    titulo:   'Cultura Viva — Música & Dança',
    tituloEn: 'Living Culture — Music & Dance',
    desc:   'Kizomba, Semba, Carnaval de Luanda, festivais internacionais',
    descEn: 'Kizomba, Semba, Luanda Carnival, international festivals',
    cat: 'cultura', cor: '#9B59B6',
    highlights: ['Carnaval', 'Kizomba Festival', 'Festival Luanda Sul', 'Gastronomia'],
  },
  {
    Icon: Waves,
    titulo:   'Praias & Costa Atlântica',
    tituloEn: 'Beaches & Atlantic Coast',
    desc:   '1 247 km de costa, ilha do Mussulo, Benguela e Lobito',
    descEn: '1,247 km of coast, Mussulo island, Benguela and Lobito',
    cat: 'praia', cor: '#E74C3C',
    highlights: ['Ilha do Mussulo', 'Benguela', 'Cabo Ledo', 'Namibe'],
  },
]

export default function TiposTurismoSection() {
  const { language } = useApp()
  const isEn = language === 'en'

  return (
    <section className="py-24 bg-white" id="tipos">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-[#C9A84C]/40" />
            <span className="text-[11px] tracking-[0.3em] text-[#C9A84C] uppercase font-semibold">
              {isEn ? 'EXPERIENCES' : 'EXPERIÊNCIAS'}
            </span>
            <div className="h-px w-10 bg-[#C9A84C]/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            {isEn ? '6 Ways to Discover Angola' : '6 Formas de Descobrir Angola'}
          </h2>
          <p className="text-[#4A4A4A] text-[15px] max-w-2xl mx-auto leading-relaxed">
            {isEn
              ? 'From savanna to ocean, from ancient past to modern festivals — Angola surprises at every turn.'
              : 'Da savana ao oceano, do passado milenar aos festivais modernos — Angola surpreende em cada vertente.'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIPOS.map((tipo, i) => (
            <motion.div
              key={tipo.cat}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/mapa?cat=${tipo.cat}`}
                className="group flex flex-col h-full p-6 rounded-2xl border border-[#E8E4DC] hover:border-transparent hover:shadow-xl transition-all duration-300"
                onMouseEnter={e => (e.currentTarget.style.background = tipo.cor + '08')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${tipo.cor}15`, border: `1px solid ${tipo.cor}30` }}
                >
                  <tipo.Icon size={22} strokeWidth={1.5} style={{ color: tipo.cor }} />
                </div>

                <h3 className="font-display text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#C9A84C] transition-colors">
                  {isEn ? tipo.tituloEn : tipo.titulo}
                </h3>
                <p className="text-[#4A4A4A] text-[13px] leading-relaxed mb-4 flex-1">
                  {isEn ? tipo.descEn : tipo.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tipo.highlights.map(h => (
                    <span
                      key={h}
                      className="text-[11px] px-2.5 py-1 rounded-full"
                      style={{ background: tipo.cor + '12', color: tipo.cor, border: `1px solid ${tipo.cor}25` }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: tipo.cor }}>
                  {isEn ? 'Explore on map' : 'Explorar no mapa'}
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
