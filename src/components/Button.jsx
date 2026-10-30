import { useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * A romantic, tactile button.
 * - hover scale + glow, press animation
 * - optional heart burst on click (default on for primary)
 *
 * Props:
 *   variant: 'primary' | 'ghost'
 *   burst:   show the little heart explosion on click (defaults true for primary)
 */
const BURST_HEARTS = ['❤️', '💕', '💗', '💖']

export default function Button({
  children,
  onClick,
  variant = 'primary',
  burst,
  disabled = false,
  type = 'button',
  ...rest
}) {
  const reduce = useReducedMotion()
  const [bursts, setBursts] = useState([])
  const idRef = useRef(0)
  const doBurst = burst ?? variant === 'primary'

  const handleClick = useCallback(
    (e) => {
      if (disabled) return
      if (doBurst && !reduce) {
        // spawn a short-lived ring of hearts
        const pieces = Array.from({ length: 8 }, (_, i) => {
          const angle = (Math.PI * 2 * i) / 8
          const dist = 46 + (i % 3) * 10
          return {
            id: idRef.current++,
            emoji: BURST_HEARTS[i % BURST_HEARTS.length],
            bx: `${Math.cos(angle) * dist}px`,
            by: `${Math.sin(angle) * dist}px`,
          }
        })
        setBursts((b) => [...b, ...pieces])
        const ids = new Set(pieces.map((p) => p.id))
        window.setTimeout(() => {
          setBursts((b) => b.filter((p) => !ids.has(p.id)))
        }, 750)
      }
      onClick?.(e)
    },
    [disabled, doBurst, reduce, onClick],
  )

  const styles = {
    primary: {
      background: 'linear-gradient(120deg, var(--pink-500), var(--pink-600))',
      color: '#fff',
      boxShadow: 'var(--shadow-btn)',
      border: 'none',
    },
    ghost: {
      background: 'rgba(255,255,255,0.6)',
      color: 'var(--pink-700)',
      boxShadow: '0 8px 20px -14px rgba(180,40,90,0.5)',
      border: '2px solid rgba(255,255,255,0.8)',
    },
  }

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      whileHover={disabled || reduce ? undefined : { scale: 1.045, y: -2 }}
      whileTap={disabled || reduce ? undefined : { scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 420, damping: 22 }}
      style={{
        position: 'relative',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: 'clamp(0.95rem, 3.4vw, 1.05rem)',
        letterSpacing: '0.01em',
        padding: '14px 26px',
        minHeight: 48,
        minWidth: 44,
        borderRadius: 999,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        WebkitTapHighlightColor: 'transparent',
        ...styles[variant],
      }}
      {...rest}
    >
      {children}

      {/* heart burst overlay */}
      {bursts.map((p) => (
        <span
          key={p.id}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            fontSize: '1.1rem',
            pointerEvents: 'none',
            '--bx': p.bx,
            '--by': p.by,
            animation: 'burstFly 0.72s ease-out forwards',
          }}
        >
          {p.emoji}
        </span>
      ))}
    </motion.button>
  )
}
