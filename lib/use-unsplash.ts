'use client'
import { useState, useEffect } from 'react'

const KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

async function fetchPhotoUrl(query: string, orientation = 'landscape'): Promise<string | null> {
  if (!KEY) return null
  try {
    const r = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=${orientation}`,
      { headers: { Authorization: `Client-ID ${KEY}` } }
    )
    if (!r.ok) return null
    const d = await r.json()
    return d.results?.[0]?.urls?.regular ?? null
  } catch { return null }
}

export function useUnsplashPhoto(query: string, orientation = 'landscape') {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    fetchPhotoUrl(query, orientation).then(u => { if (u) setUrl(u) })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return url
}

export function useUnsplashPhotos(queries: string[]) {
  const [urls, setUrls] = useState<(string | null)[]>(queries.map(() => null))
  const key = queries.join('||')
  useEffect(() => {
    Promise.all(queries.map(q => fetchPhotoUrl(q))).then(setUrls)
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps
  return urls
}
