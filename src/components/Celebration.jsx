import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * One-shot celebration burst: confetti ribbons + a radial screen glow.
 * Mounts, plays once, then reports done via onDone so the parent can unmount it.
 * A single timer drives cleanup; the confetti pieces are pure-CSS animated.
 */
const COLORS = ['#E91E63', '#FF6F91', '#FFC1D6', '#FFD36E', '#FF9EB8', '#C86DD7']

export default function Celebration({ pieces = 90, duration = 2600, onDone }) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(true)

  const confetti = useMemo(() => {
    if (reduce) return []
    return Array.from({ length: pieces }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[i % COLORS.length],
      delay: Math.random() * 0.5,
      dur: 1.8 + Math.random() * 1.6,
      w: 6 + Math.random() * 8,
      h: 8 + Math.random() * 12,
      round: Math.random() > 0.6,
    }))
  }, [pieces, reduce])

  useEffect(() => {
    const t = window.setTimeout(() => {
      setVisible(false)
      onDone?.()
    }, reduce ? 400 : duration)
    return () => window.clearTimeout(t)
  }, [duration, reduce, onDone])

  if (!visible) return null

  return (
    <>
      <div
        className="screen-glow"
        style={{ animation: 'glowPulse 1.4s ease-in-out' }}
      />
      {!reduce && (
        <div className="fx-layer" aria-hidden="true">
          {confetti.map((c) => (
            <span
              key={c.id}
              className="confetti"
              style={{
                left: `${c.left}%`,
                width: c.w,
                height: c.h,
                borderRadius: c.round ? '50%' : '2px',
                background: c.color,
                animation: `confettiFall ${c.dur}s ease-in ${c.delay}s forwards`,
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}
