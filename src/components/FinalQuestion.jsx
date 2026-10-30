import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from './Button'
import Heart from './Heart'

export default function FinalQuestion({ onYes }) {
  const [maybe, setMaybe] = useState(false)

  return (
    <div className="screen card">
      <Heart>NITHYA ❤️</Heart>

      <div className="stack" style={{ marginTop: 10 }}>
        <p className="eyebrow">🌸 Nithya…</p>

        <h2 className="title" style={{ maxWidth: '18ch', margin: '0 auto' }}>
          Would you let me take you on a date?
        </h2>

        <p className="muted">
          No pressure.
          <br />
          Just good food, good conversation,
          <br />
          and hopefully a lot of smiles. ❤️
        </p>

        <AnimatePresence mode="wait">
          {!maybe ? (
            <motion.div
              key="ask"
              className="actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Button onClick={onYes}>YES ❤️</Button>
              <Button variant="ghost" burst={false} onClick={() => setMaybe(true)}>
                Maybe… 👀
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="maybe"
              className="stack"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              style={{ marginTop: 4 }}
            >
              <p className="lead">
                Hmm… I&apos;ll take that as
                <br />
                &ldquo;You need a little more convincing.&rdquo; 😏❤️
              </p>
              <p className="muted">Want to give me another chance?</p>
              <div className="actions" style={{ marginTop: 8 }}>
                <Button onClick={() => setMaybe(false)}>Try Again 💕</Button>
                <Button
                  variant="ghost"
                  burst={false}
                  onClick={() => setMaybe(false)}
                >
                  I&apos;m still thinking… 👀
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
