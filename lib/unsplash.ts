export async function getDestinationPhoto(query: string): Promise<string> {
  const key = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
  const fallback = `https://source.unsplash.com/600x400/?${encodeURIComponent(query + ',Angola')}`

  if (!key) return fallback

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' Angola')}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${key}` } }
    )
    if (!res.ok) return fallback
    const data = await res.json()
    return data.results?.[0]?.urls?.regular ?? fallback
  } catch {
    return fallback
  }
}
