import { motion } from 'framer-motion'
import Button from './Button'

export default function RomanticMessage({ onNext }) {
  return (
    <div className="screen card">
      <div className="stack">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          💌 A little surprise
        </motion.p>

        <motion.p
          className="lead"
          initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Some people make ordinary days
          <br />
          feel a little more special.
        </motion.p>

        <motion.p
          className="lead"
          style={{ fontWeight: 600, color: 'var(--pink-600)' }}
          initial={{ opacity: 0, y: 14, scale: 0.96, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          You&apos;re one of those people. ❤️
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.5 }}
        >
          <Button onClick={onNext}>Tell me more 👀</Button>
        </motion.div>
      </div>
    </div>
  )
}
