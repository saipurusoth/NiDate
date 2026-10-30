import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from './Button'
import Typewriter from './Typewriter'

export default function SmallQuestion({ onNext }) {
  const [typed, setTyped] = useState(false)

  return (
    <div className="screen card">
      <div className="stack">
        <motion.h2
          className="title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Nithya…
        </motion.h2>

        <motion.p
          className="muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          I&apos;ve been thinking…
        </motion.p>

        <motion.p
          className="lead"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          style={{ minHeight: '3.2em' }}
        >
          <Typewriter
            text="Maybe we should make one ordinary day a little special."
            startDelay={1300}
            speed={40}
            onDone={() => setTyped(true)}
          />
        </motion.p>

        <AnimatePresence>
          {typed && (
            <motion.p
              className="muted"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Just you, me, good food, good conversation…
              <br />
              and hopefully a lot of smiles. 😊
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {typed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button onClick={onNext}>I&apos;m listening 💕</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
