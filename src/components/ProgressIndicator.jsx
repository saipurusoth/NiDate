/**
 * A subtle romantic progress trail: ♡ ── ♡ ── ♡ ── ♡ ── ❤️
 * Completed steps show a filled heart, the active one pulses.
 * Purely decorative, so it's hidden from screen readers.
 */
export default function ProgressIndicator({ current = 0, total = 5 }) {
  const steps = Array.from({ length: total }, (_, i) => i)

  return (
    <div className="progress" aria-hidden="true">
      {steps.map((i) => {
        const isLast = i === total - 1
        const done = i < current
        const active = i === current
        const glyph = active || done || isLast ? '❤️' : '♡'
        return (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span
              className={`dot ${active ? 'active' : done ? 'done' : ''}`}
              style={{ color: done || active ? 'var(--pink-600)' : 'var(--pink-300)' }}
            >
              {glyph}
            </span>
            {!isLast && <span className={`bar ${done ? 'filled' : ''}`} />}
          </span>
        )
      })}
    </div>
  )
}
