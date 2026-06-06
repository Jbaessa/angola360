'use client'

import { useState, useCallback, useEffect } from 'react'
import { speakText, stopSpeaking, isSpeaking, TTSEngine } from '@/lib/tts'

export interface UseTTSOptions {
  engine?: TTSEngine
}

export function useTTS(options: UseTTSOptions = {}) {
  const [speaking, setSpeaking] = useState(false)
  const [muted, setMuted] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const engine: TTSEngine = options.engine ?? 'webspeech'
  const elevenLabsKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeaking(isSpeaking())
    }, 200)
    return () => clearInterval(interval)
  }, [])

  const speak = useCallback(
    async (text: string, index?: number) => {
      if (muted) return
      setActiveIndex(index ?? null)
      setSpeaking(true)
      await speakText(text, {
        engine: elevenLabsKey ? 'elevenlabs' : engine,
        elevenLabsKey,
        voiceId: process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID ?? 'EXAVITQu4vr4xnSDxMaL',
        lang: 'pt-PT',
        rate: 0.92,
        pitch: 1.0,
      })
      setSpeaking(false)
      setActiveIndex(null)
    },
    [muted, engine, elevenLabsKey]
  )

  const stop = useCallback(() => {
    stopSpeaking()
    setSpeaking(false)
    setActiveIndex(null)
  }, [])

  const toggleMute = useCallback(() => {
    if (!muted) stop()
    setMuted(m => !m)
  }, [muted, stop])

  return { speak, stop, speaking, muted, toggleMute, activeIndex }
}
