import { useReducedMotion } from 'framer-motion'

/**
 * A big, pulsing CSS heart (two circles + a rotated square) with a soft glow.
 * Renders its children (e.g. "NITHYA") centered on top of the heart shape.
 * Scales responsively via the --heart-size custom property.
 */
export default function Heart({ children, size = 'clamp(150px, 44vw, 210px)' }) {
  const reduce = useReducedMotion()

  return (
    <div
      className="heart-wrap"
      style={{
        position: 'relative',
        width: size,
        height: size,
        margin: '6px auto 4px',
      }}
    >
      {/* the heart shape */}
      <div
        aria-hidden="true"
        className="heart-shape"
        style={{
          position: 'absolute',
          top: '28%',
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #ff8fab 0%, #e91e63 100%)',
          transform: 'rotate(-45deg)',
          borderRadius: '8% 8% 8% 8%',
          transformOrigin: 'center',
          animation: reduce ? 'none' : 'heartPulse 1.9s ease-in-out infinite, glowPulse 3.2s ease-in-out infinite',
          boxShadow:
            '0 0 40px 6px rgba(255,111,145,0.5), 0 0 90px 20px rgba(233,30,99,0.25)',
        }}
      >
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: 0,
            width: '100%',
            height: '100%',
            background: 'inherit',
            borderRadius: '50%',
          }}
        />
        <span
          style={{
            content: '""',
            position: 'absolute',
            top: 0,
            right: '-50%',
            width: '100%',
            height: '100%',
            background: 'inherit',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* label sits above the shape, unrotated */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          zIndex: 2,
          fontFamily: 'var(--font-head)',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: '#fff',
          fontSize: 'clamp(1.1rem, 5vw, 1.7rem)',
          textShadow: '0 2px 12px rgba(120,10,50,0.45)',
          textAlign: 'center',
          padding: '0 8px',
          pointerEvents: 'none',
        }}
      >
        {children}
      </div>
    </div>
  )
}
