'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/lib/store'
import { useT } from '@/lib/translations'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AIChat() {
  const { chatOpen, setChatOpen, selectedPOI, language } = useApp()
  const t = useT()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  const SUGGESTIONS = [t('ai_s1'), t('ai_s2'), t('ai_s3'), t('ai_s4')]

  useEffect(() => {
    if (chatOpen) setTimeout(() => inputRef.current?.focus(), 200)
  }, [chatOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Clear messages on language change so the new language starts fresh
  useEffect(() => {
    setMessages([])
  }, [language])

  async function send(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg || streaming) return
    setInput('')
    const userMsg: Message = { role: 'user', content: msg }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setStreaming(true)

    const assistantMsg: Message = { role: 'assistant', content: '' }
    setMessages([...newMessages, assistantMsg])

    const systemPrompt = language === 'en'
      ? `You are the AI Guide of Angola360 — Angola's most complete tourism portal.\nYou help travellers discover Angola: destinations, culture, nature, gastronomy, logistics and safety.\n${selectedPOI ? `The user is viewing: ${selectedPOI.name} in ${selectedPOI.province}.` : ''}\nReply in English. Be helpful, enthusiastic but concise. Maximum 3 paragraphs.`
      : `És o Guia IA do Angola360 — o portal turístico mais completo de Angola.\nAjudas viajantes a descobrir Angola: destinos, cultura, natureza, gastronomia, logística e segurança.\n${selectedPOI ? `O utilizador está a ver: ${selectedPOI.name} em ${selectedPOI.province}.` : ''}\nResponde em português europeu. Sê útil, entusiástico mas conciso. Máximo 3 parágrafos.`

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, system: systemPrompt }),
      })

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let text = ''

      const readChunk = () => {
        reader?.read().then(({ done, value }) => {
          if (done) { setStreaming(false); return }
          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6))
                if (data.delta) {
                  text += data.delta
                  setMessages(prev => {
                    const updated = [...prev]
                    updated[updated.length - 1] = { role: 'assistant', content: text }
                    return updated
                  })
                }
              } catch (_) {}
            }
          }
          readChunk()
        })
      }
      readChunk()
    } catch {
      setStreaming(false)
    }
  }

  return (
    <AnimatePresence>
      {chatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed bottom-14 right-4 z-[100] w-96 bg-[#0d1929] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: 'calc(100vh - 100px)', height: 520 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07] bg-[#080d18]/50 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C9A84C]/40 shrink-0 ring-1 ring-[#C9A84C]/15">
                <img src="/njila_meio.png" alt="Njila" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#F0EDE6]">{t('ai_title')}</div>
                <div className="flex items-center gap-1 text-[10px] text-[#8A9BB0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71] ai-dot" />
                  Powered by Claude
                </div>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="w-7 h-7 rounded-full bg-white/[0.05] hover:bg-white/10 flex items-center justify-center text-[#8A9BB0] hover:text-[#F0EDE6] transition-all"
              aria-label="Close"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 1 L9 9 M9 1 L1 9"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="text-center py-4">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2 border-[#C9A84C]/30 ring-2 ring-[#C9A84C]/10 shadow-lg shadow-[#C9A84C]/10">
                    <img src="/njila_meio.png" alt="Njila" className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="text-[13px] text-[#F0EDE6] font-medium">{t('ai_greeting')}</p>
                  <p className="text-[11px] text-[#8A9BB0] mt-1">{t('ai_subtext')}</p>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-left px-3 py-2 rounded-xl text-[11px] text-[#8A9BB0] border border-white/08 hover:border-[#C9A84C]/30 hover:text-[#C9A84C] hover:bg-[#C9A84C]/05 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[12px] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#C9A84C]/15 border border-[#C9A84C]/25 text-[#F0EDE6] rounded-br-sm'
                      : 'bg-white/[0.04] border border-white/08 text-[#C8C4BC] rounded-bl-sm'
                  }`}
                >
                  {m.content}
                  {m.role === 'assistant' && streaming && i === messages.length - 1 && (
                    <span className="inline-block w-0.5 h-3.5 bg-[#C9A84C] ml-0.5 animate-pulse" />
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-white/[0.07] bg-[#080d18]/30 shrink-0">
            <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 focus-within:border-[#C9A84C]/40 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder={t('ai_placeholder')}
                disabled={streaming}
                className="flex-1 bg-transparent border-none outline-none text-[12px] text-[#F0EDE6] placeholder:text-[#8A9BB0]/60"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || streaming}
                className="w-7 h-7 rounded-lg bg-[#C9A84C] flex items-center justify-center text-[#080d18] hover:bg-[#E8C96A] transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="mt-1.5 text-[10px] text-[#8A9BB0]/50 hover:text-[#8A9BB0] transition-all"
              >
                {t('ai_clear')}
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
