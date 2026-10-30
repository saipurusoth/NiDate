import { motion } from 'framer-motion'
import Button from './Button'
import { times, activities } from '../data/dateOptions'

function OptionRow({ options, value, onChange, label, cols }) {
  return (
    <div className="planner-block">
      <span className="field-label">{label}</span>
      <div
        className={`option-grid cols-${cols}`}
        role="radiogroup"
        aria-label={label}
        style={{ marginTop: 0 }}
      >
        {options.map((o) => {
          const isSel = o.id === value
          return (
            <motion.button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={isSel}
              aria-label={o.label}
              className={`option ${isSel ? 'selected' : ''}`}
              onClick={() => onChange(o.id)}
              whileTap={{ scale: 0.94 }}
            >
              <span className="emoji" aria-hidden="true">
                {o.emoji}
              </span>
              <span>{o.label}</span>
              {isSel && (
                <span className="check" aria-hidden="true">
                  ✓
                </span>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default function DatePlanning({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  selectedActivity,
  setSelectedActivity,
  onNext,
}) {
  const ready = selectedDate && selectedTime && selectedActivity
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="screen card">
      <p className="eyebrow">Let&apos;s plan it 🌸</p>
      <h2 className="title">So… when are you free?</h2>

      <div style={{ marginTop: 22 }}>
        <div className="planner-block">
          <label className="field-label" htmlFor="date-field">
            Pick a day
          </label>
          <input
            id="date-field"
            className="date-input"
            type="date"
            min={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <OptionRow
          label="Time of day"
          options={times}
          value={selectedTime}
          onChange={setSelectedTime}
          cols={2}
        />

        <OptionRow
          label="What should we do?"
          options={activities}
          value={selectedActivity}
          onChange={setSelectedActivity}
          cols={3}
        />
      </div>

      <div className="actions">
        <Button onClick={onNext} disabled={!ready}>
          Continue → ❤️
        </Button>
      </div>
      {!ready && (
        <p className="muted" style={{ marginTop: 12, fontSize: '0.85rem' }}>
          Pick a day, a time and an activity to continue 💕
        </p>
      )}
    </div>
  )
}
