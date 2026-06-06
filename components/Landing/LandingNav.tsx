'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Map } from 'lucide-react'
import { useApp } from '@/lib/store'
import { useT } from '@/lib/translations'

export default function LandingNav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const { language, setLanguage } = useApp()
  const t = useT()

  const NAV_LINKS = [
    { label: t('nav_destinations'), href: '#destinos'  },
    { label: t('nav_about'),        href: '#sobre'      },
    { label: t('nav_partners'),     href: '#parceiros'  },
    { label: t('nav_contact'),      href: '#contacto'   },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const textColor = scrolled ? 'text-[#4A4A4A]' : 'text-white/80'

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logoA360.png"
              alt="Angola360"
              width={200}
              height={56}
              className="h-14 w-auto rounded-xl object-contain"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                className={`text-sm font-medium transition-colors hover:text-[#C9A84C] ${textColor}`}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA + lang toggle + hamburger */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${
                scrolled
                  ? 'border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/08'
                  : 'border-white/30 text-white/70 hover:text-white hover:border-white/55'
              }`}
            >
              {t('nav_lang_switch')}
            </button>

            <Link href="/mapa"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[#C9A84C] hover:bg-[#A07830] text-white text-sm font-semibold rounded-lg transition-all shadow-sm shadow-[#C9A84C]/30"
            >
              <Map size={13} strokeWidth={2} />
              {t('nav_explore_map')}
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className={`md:hidden p-2 rounded-lg transition-all ${
                scrolled ? 'text-[#1A1A1A] hover:bg-[#F8F6F1]' : 'text-white hover:bg-white/10'
              }`}
              aria-label={t('nav_open_menu')}
            >
              <Menu size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 h-16 border-b border-[#E8E4DC]">
              <Image src="/logoA360.png" alt="Angola360" width={120} height={33} className="h-8 w-auto rounded-lg object-contain" />
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-[#4A4A4A] hover:text-[#1A1A1A] rounded-lg hover:bg-[#F8F6F1] transition-all"
                aria-label={t('nav_close_menu')}
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>
            <div className="flex flex-col p-4 gap-1 flex-1">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-[#4A4A4A] hover:text-[#C9A84C] hover:bg-[#F8F6F1] rounded-xl text-sm font-medium transition-all"
                >
                  {l.label}
                </a>
              ))}
              {/* Language toggle mobile */}
              <button
                onClick={() => { setLanguage(language === 'pt' ? 'en' : 'pt'); setMenuOpen(false) }}
                className="px-4 py-3 text-[#C9A84C] hover:bg-[#F8F6F1] rounded-xl text-sm font-bold transition-all text-left flex items-center gap-2"
              >
                <span className="w-5 h-5 rounded border border-[#C9A84C]/40 flex items-center justify-center text-[10px] font-black">{t('nav_lang_switch')}</span>
                {language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
              </button>
            </div>
            <div className="p-5 border-t border-[#E8E4DC]">
              <Link href="/mapa" onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#C9A84C] hover:bg-[#A07830] text-white font-semibold rounded-xl transition-all"
              >
                <Map size={16} strokeWidth={2} />
                {t('nav_explore_map_full')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
