'use client'

import { stripMarkdown } from './stripMarkdown'

export type TTSEngine = 'webspeech' | 'elevenlabs'

export interface TTSConfig {
  engine: TTSEngine
  elevenLabsKey?: string
  voiceId?: string
  lang?: string
  rate?: number
  pitch?: number
}

const DEFAULT_ELEVENLABS_VOICE = 'EXAVITQu4vr4xnSDxMaL'

let currentUtterance: SpeechSynthesisUtterance | null = null
let currentAudio: HTMLAudioElement | null = null

export async function speakText(
  rawText: string,
  config: TTSConfig = { engine: 'webspeech' }
): Promise<void> {
  const cleanText = stripMarkdown(rawText)
  if (!cleanText.trim()) return

  stopSpeaking()

  if (config.engine === 'elevenlabs' && config.elevenLabsKey) {
    await speakElevenLabs(cleanText, config)
  } else {
    speakWebSpeech(cleanText, config)
  }
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined') {
    window.speechSynthesis?.cancel()
    currentUtterance = null
  }
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.src = ''
    currentAudio = null
  }
}

export function isSpeaking(): boolean {
  const webSpeechActive =
    typeof window !== 'undefined' ? (window.speechSynthesis?.speaking ?? false) : false
  const audioActive = currentAudio ? !currentAudio.paused : false
  return webSpeechActive || audioActive
}

function speakWebSpeech(text: string, config: TTSConfig): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn('Web Speech API não suportada neste browser.')
    return
  }

  const chunks = splitTextIntoChunks(text, 180)
  const lang = config.lang ?? 'pt-PT'
  const langPrefix = lang.split('-')[0]

  const speakChunk = (index: number) => {
    if (index >= chunks.length) return
    const utterance = new SpeechSynthesisUtterance(chunks[index])
    utterance.lang = lang
    utterance.rate = config.rate ?? 0.95
    utterance.pitch = config.pitch ?? 1.0

    const voices = window.speechSynthesis.getVoices()
    const voice =
      voices.find(v => v.lang === lang) ??
      voices.find(v => v.lang.startsWith(lang)) ??
      voices.find(v => v.lang.startsWith(langPrefix)) ??
      null
    if (voice) utterance.voice = voice

    utterance.onend = () => speakChunk(index + 1)
    utterance.onerror = e => console.error('TTS error:', e)

    currentUtterance = utterance
    window.speechSynthesis.speak(utterance)
  }

  window.speechSynthesis.cancel()
  setTimeout(() => speakChunk(0), 50)
}

async function speakElevenLabs(text: string, config: TTSConfig): Promise<void> {
  const voiceId = config.voiceId ?? DEFAULT_ELEVENLABS_VOICE
  const apiKey = config.elevenLabsKey!

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
      {
        method: 'POST',
        headers: {
          Accept: 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.6,
            similarity_boost: 0.85,
            style: 0.2,
            use_speaker_boost: true,
          },
        }),
      }
    )

    if (!response.ok) {
      console.error('ElevenLabs error:', response.status)
      speakWebSpeech(text, config)
      return
    }

    const audioBlob = await response.blob()
    const audioUrl = URL.createObjectURL(audioBlob)
    const audio = new Audio(audioUrl)
    currentAudio = audio

    audio.onended = () => {
      URL.revokeObjectURL(audioUrl)
      currentAudio = null
    }
    await audio.play()
  } catch (err) {
    console.error('ElevenLabs falhou, a usar Web Speech:', err)
    speakWebSpeech(text, config)
  }
}

function splitTextIntoChunks(text: string, maxLength: number): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text]
  const chunks: string[] = []
  let current = ''

  for (const sentence of sentences) {
    if ((current + sentence).length > maxLength && current) {
      chunks.push(current.trim())
      current = sentence
    } else {
      current += sentence
    }
  }
  if (current.trim()) chunks.push(current.trim())
  return chunks.length > 0 ? chunks : [text]
}
