'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Landmark } from 'lucide-react'
import { useT } from '@/lib/translations'

const SOCIAL = [
  { label: 'Instagram', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )},
  { label: 'Facebook', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )},
  { label: 'YouTube', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )},
]

export default function LandingFooter() {
  const t = useT()

  const DESTINOS_LINKS = [
    { label: 'Luanda',    href: '/mapa' },
    { label: 'Benguela',  href: '/mapa' },
    { label: 'Quiçama',   href: '/mapa' },
    { label: 'Namibe',    href: '/mapa' },
    { label: 'Kalandula', href: '/mapa' },
    { label: 'Lubango',   href: '/mapa' },
  ]

  const PORTAL_LINKS = [
    { label: t('footer_map'),      href: '/mapa'      },
    { label: t('footer_about'),    href: '#sobre'     },
    { label: t('footer_partners'), href: '#parceiros' },
    { label: t('footer_ai'),       href: '/mapa'      },
    { label: t('footer_api'),      href: '#'          },
  ]

  return (
    <footer id="contacto" className="bg-[#0A0E1A] border-t border-[#C9A84C]/20">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Coluna 1 — Marca */}
          <div>
            <div className="mb-4 inline-block rounded-2xl overflow-hidden border border-white/10">
              <Image src="/logoA360.png" alt="Angola360" width={180} height={50} className="h-12 w-auto object-contain block" />
            </div>
            <p className="text-[13px] text-white/40 leading-relaxed mb-5">
              {t('footer_tagline').split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </p>
            <p className="text-[11px] text-white/25 mb-5">
              Powered by Claude AI · Leaflet · MapLibre GL
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/35 hover:text-[#C9A84C] hover:border-[#C9A84C]/30 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2 — Destinos */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-semibold mb-5">{t('footer_dest')}</h4>
            <div className="grid grid-cols-2 gap-y-2.5">
              {DESTINOS_LINKS.map(l => (
                <Link key={l.label} href={l.href}
                  className="text-[13px] text-white/50 hover:text-[#C9A84C] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Link href="/mapa" className="inline-flex items-center gap-1 mt-4 text-[12px] text-[#C9A84C] hover:text-[#E8C96A] transition-colors">
              {t('footer_view_all')}
            </Link>
          </div>

          {/* Coluna 3 — Portal */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-semibold mb-5">{t('footer_portal')}</h4>
            <div className="flex flex-col gap-2.5">
              {PORTAL_LINKS.map(l => (
                <Link key={l.label} href={l.href}
                  className="text-[13px] text-white/50 hover:text-[#C9A84C] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Coluna 4 — Contacto */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-white/40 font-semibold mb-5">{t('footer_contact')}</h4>
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-2.5 text-[13px] text-white/50">
                <Mail size={14} strokeWidth={1.75} className="text-white/30 shrink-0" />
                <a href="mailto:info@angola360.ao" className="hover:text-[#C9A84C] transition-colors">
                  info@angola360.ao
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-white/50">
                <MapPin size={14} strokeWidth={1.75} className="text-white/30 shrink-0" />
                <span>Luanda, Angola</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-white/50">
                <Landmark size={14} strokeWidth={1.75} className="text-white/30 shrink-0" />
                <span>{t('footer_ministry')}</span>
              </div>
            </div>
            <a href="mailto:parceiros@angola360.ao"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#C9A84C]/30 text-[#C9A84C] text-[12px] font-medium rounded-lg hover:bg-[#C9A84C]/10 transition-all"
            >
              {t('footer_partner_btn')}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8 border-t border-white/[0.07]">
          <p className="text-[11px] text-white/25 text-center md:text-left">
            {t('footer_rights')}{' '}
            <a href="#" className="hover:text-white/40 transition-colors">{t('footer_privacy')}</a>
          </p>
          <p className="text-[11px] text-white/25 text-center md:text-right">
            {t('footer_powered')}
          </p>
        </div>
      </div>
    </footer>
  )
}
