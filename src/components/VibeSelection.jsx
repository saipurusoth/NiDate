import { AnimatePresence, motion } from 'framer-motion'
import Button from './Button'
import { vibes } from '../data/dateOptions'

export default function VibeSelection({ selectedVibe, setSelectedVibe, onNext }) {
  const selected = vibes.find((v) => v.id === selectedVibe)

  return (
    <div className="screen card">
      <p className="eyebrow">Step one</p>
      <h2 className="title">What are we feeling today? ✨</h2>
      <p className="subtitle">Pick your vibe…</p>

      <div
        className="option-grid cols-3"
        role="radiogroup"
        aria-label="Pick your food vibe"
      >
        {vibes.map((v) => {
          const isSel = v.id === selectedVibe
          return (
            <motion.button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={isSel}
              aria-label={v.label}
              className={`option ${isSel ? 'selected' : ''}`}
              onClick={() => setSelectedVibe(v.id)}
              whileTap={{ scale: 0.94 }}
            >
              <span className="emoji" aria-hidden="true">
                {v.emoji}
              </span>
              <span>{v.label}</span>
              {isSel && (
                <span className="check" aria-hidden="true">
                  ✓
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            style={{ marginTop: 22 }}
          >
            <p className="lead">
              Hmm… {selected.label} it is! {selected.emoji}
            </p>
            <p className="muted" style={{ marginTop: 6 }}>
              But I think something is missing…
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="actions">
        <Button onClick={onNext} disabled={!selected}>
          Continue ❤️
        </Button>
      </div>
    </div>
  )
}
