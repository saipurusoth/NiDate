import { motion } from 'framer-motion'
import Button from './Button'
import Heart from './Heart'
import { times, activities } from '../data/dateOptions'

function formatDate(value) {
  if (!value) return 'A day soon 🌸'
  // value is YYYY-MM-DD; parse as local date to avoid timezone drift
  const [y, m, d] = value.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function DateAccepted({
  selectedDate,
  selectedTime,
  selectedActivity,
  onRestart,
}) {
  const time = times.find((t) => t.id === selectedTime)
  const activity = activities.find((a) => a.id === selectedActivity)

  const rows = [
    { emoji: '📅', label: 'Date', value: formatDate(selectedDate) },
    {
      emoji: '⏰',
      label: 'Time',
      value: time ? `${time.emoji} ${time.label}` : 'You decide 💕',
    },
    {
      emoji: '🍴',
      label: 'Activity',
      value: activity ? `${activity.emoji} ${activity.label}` : 'A sweet surprise 🎁',
    },
  ]

  return (
    <div className="screen card">
      <motion.p
        className="title"
        style={{ fontSize: 'clamp(1.6rem, 7vw, 2.3rem)' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      >
        🎉 Yesssss! ❤️
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 220, damping: 15 }}
        style={{ margin: '10px 0 4px' }}
      >
        <span className="badge">DATE ACCEPTED 🔓💕</span>
      </motion.div>

      <Heart>NITHYA</Heart>

      <motion.p
        className="lead"
        style={{ fontWeight: 600, marginTop: 6 }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        One little YES just made my day.
      </motion.p>
      <p className="muted" style={{ marginTop: 6 }}>
        Now… let&apos;s make this date a memory. 🌸
      </p>

      <div className="summary">
        {rows.map((r, i) => (
          <motion.div
            key={r.label}
            className="summary-row"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.12 }}
          >
            <span className="s-emoji" aria-hidden="true">
              {r.emoji}
            </span>
            <span className="s-text">
              <span className="s-label">{r.label}</span>
              <span className="s-value">{r.value}</span>
            </span>
          </motion.div>
        ))}
      </div>

      <p className="lead" style={{ marginTop: 18, color: 'var(--pink-600)' }}>
        I can&apos;t wait. ❤️
      </p>

      <div className="actions">
        <Button variant="ghost" burst={false} onClick={onRestart}>
          Start Again ↻
        </Button>
      </div>
    </div>
  )
}
