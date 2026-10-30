import { useMemo } from 'react'
import { petalEmojis } from '../data/dateOptions'

/**
 * Subtle falling petals from the top. Deliberately kept sparse so the screen
 * never feels crowded. Same fixed-pool + pure-CSS approach as FloatingHearts,
 * so there is nothing to clean up and no runaway DOM growth.
 */
export default function FallingPetals({ count = 9 }) {
  const items = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = 14 + Math.random() * 16
      const duration = 11 + Math.random() * 10
      const delay = -Math.random() * duration
      return {
        id: i,
        emoji: petalEmojis[Math.floor(Math.random() * petalEmojis.length)],
        left: Math.random() * 100,
        size,
        duration,
        delay,
        drift: `${(Math.random() - 0.5) * 160}px`,
        spin: `${180 + Math.random() * 180}deg`,
        peak: (0.4 + Math.random() * 0.35).toFixed(2),
      }
    })
  }, [count])

  return (
    <div className="particle-layer" aria-hidden="true">
      {items.map((it) => (
        <span
          key={it.id}
          className="petal"
          style={{
            left: `${it.left}%`,
            fontSize: `${it.size}px`,
            animation: `petalFall ${it.duration}s linear infinite`,
            animationDelay: `${it.delay}s`,
            '--drift': it.drift,
            '--spin': it.spin,
            '--peak-opacity': it.peak,
          }}
        >
          {it.emoji}
        </span>
      ))}
    </div>
  )
}
