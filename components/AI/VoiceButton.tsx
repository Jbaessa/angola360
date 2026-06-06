'use client'

interface VoiceButtonProps {
  text: string
  index: number
  onSpeak: (text: string, index: number) => void
  onStop: () => void
  isActive: boolean
  isSpeaking: boolean
  muted: boolean
}

export default function VoiceButton({
  text,
  index,
  onSpeak,
  onStop,
  isActive,
  isSpeaking,
  muted,
}: VoiceButtonProps) {
  if (muted) return null

  const handleClick = () => {
    if (isActive && isSpeaking) {
      onStop()
    } else {
      onSpeak(text, index)
    }
  }

  return (
    <button
      onClick={handleClick}
      title={isActive && isSpeaking ? 'Parar' : 'Ouvir resposta'}
      className="ml-1 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-all"
      style={{
        color: isActive && isSpeaking ? '#C9A84C' : '#8A9BB0',
        background:
          isActive && isSpeaking ? 'rgba(201,168,76,0.12)' : 'transparent',
      }}
    >
      {isActive && isSpeaking ? (
        <span className="flex items-end gap-px h-3.5">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-0.5 rounded-full bg-[#C9A84C]"
              style={{
                height: `${[8, 14, 10][i]}px`,
                animation: `soundwave 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
              }}
            />
          ))}
        </span>
      ) : (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  )
}
