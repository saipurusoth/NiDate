import { motion } from 'framer-motion'
import Button from './Button'

const line = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export default function WelcomeScreen({ onNext }) {
  return (
    <div className="screen card">
      <motion.div
        className="stack"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.5, delayChildren: 0.15 }}
      >
        <motion.p
          className="eyebrow"
          variants={line}
          transition={{ duration: 0.6 }}
        >
          🌸 A little something
        </motion.p>

        <motion.h1 className="title" variants={line} transition={{ duration: 0.6 }}>
          Hey Nithya…
        </motion.h1>

        <motion.p
          className="lead"
          variants={line}
          transition={{ duration: 0.6 }}
        >
          I have a tiny question for you 👀
        </motion.p>

        <motion.p
          className="muted"
          variants={line}
          transition={{ duration: 0.6 }}
        >
          But first… you have to play along with me. ❤️
        </motion.p>

        <motion.div variants={line} transition={{ duration: 0.6 }}>
          <Button onClick={onNext} aria-label="Start — okay, I'm curious">
            Okay, I&apos;m curious 💕
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
