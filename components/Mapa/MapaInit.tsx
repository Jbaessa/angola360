'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useApp } from '@/lib/store'
import { POIS } from '@/data/pois'

export default function MapaInit() {
  const params = useSearchParams()
  const { setSelectedPOI, setActiveCat } = useApp()

  useEffect(() => {
    const poiId = params.get('poi')
    const cat   = params.get('cat')
    if (poiId) {
      const poi = POIS.find(p => p.id === Number(poiId))
      if (poi) setSelectedPOI(poi)
    }
    if (cat) setActiveCat(cat)
  }, [params, setSelectedPOI, setActiveCat])

  return null
}
