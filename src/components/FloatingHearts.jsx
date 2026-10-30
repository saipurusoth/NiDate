import { useMemo } from 'react'
import { floatingEmojis } from '../data/dateOptions'

/**
 * Ambient hearts drifting from the bottom of the screen upward.
 *
 * Performance note: we build a *fixed* pool of elements ONCE and let pure CSS
 * infinite animations loop them (staggered via negative delays). No intervals,
 * no timers, no growing DOM — so nothing to leak or clean up.
 */
export default function FloatingHearts({ count = 14 }) {
  const items = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const size = 12 + Math.random() * 22 // px
      const duration = 9 + Math.random() * 9 // s
      const delay = -Math.random() * duration // negative => already mid-flight
      return {
        id: i,
        emoji: floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)],
        left: Math.random() * 100, // vw %
        size,
        duration,
        delay,
        drift: `${(Math.random() - 0.5) * 120}px`,
        spin: `${(Math.random() - 0.5) * 120}deg`,
        peak: (0.45 + Math.random() * 0.4).toFixed(2),
      }
    })
  }, [count])

  return (
    <div className="particle-layer" aria-hidden="true">
      {items.map((it) => (
        <span
          key={it.id}
          className="particle"
          style={{
            left: `${it.left}%`,
            fontSize: `${it.size}px`,
            animation: `floatUp ${it.duration}s linear infinite`,
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
