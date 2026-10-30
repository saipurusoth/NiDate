import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import WelcomeScreen from './components/WelcomeScreen'
import VibeSelection from './components/VibeSelection'
import RomanticMessage from './components/RomanticMessage'
import SmallQuestion from './components/SmallQuestion'
import DatePlanning from './components/DatePlanning'
import FinalQuestion from './components/FinalQuestion'
import DateAccepted from './components/DateAccepted'

import FloatingHearts from './components/FloatingHearts'
import FallingPetals from './components/FallingPetals'
import ProgressIndicator from './components/ProgressIndicator'
import MusicToggle from './components/MusicToggle'
import Celebration from './components/Celebration'

// Named steps keep the flow readable.
const STEP = {
  WELCOME: 0,
  VIBE: 1,
  ROMANTIC: 2,
  SMALL_Q: 3,
  PLANNING: 4,
  BIG_Q: 5,
  ACCEPTED: 6,
}

export default function App() {
  const reduce = useReducedMotion()

  const [currentStep, setCurrentStep] = useState(STEP.WELCOME)
  const [selectedVibe, setSelectedVibe] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [response, setResponse] = useState(null)

  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [musicUnlocked, setMusicUnlocked] = useState(false)
  const [celebrating, setCelebrating] = useState(false)
  const startedRef = useRef(false)

  const go = useCallback((step) => {
    // The first forward tap "unlocks" music (we never autoplay) and gently
    // starts it. Kept as plain top-level setState calls — never nest a setState
    // inside another updater, which would fire during render.
    if (!startedRef.current) {
      startedRef.current = true
      setMusicUnlocked(true)
      setIsMusicPlaying(true)
    }
    setCurrentStep(step)
  }, [])

  const handleYes = useCallback(() => {
    setResponse('yes')
    setCelebrating(true)
    setCurrentStep(STEP.ACCEPTED)
  }, [])

  const restart = useCallback(() => {
    setCurrentStep(STEP.WELCOME)
    setSelectedVibe(null)
    setSelectedDate('')
    setSelectedTime('')
    setSelectedActivity(null)
    setResponse(null)
    setCelebrating(false)
  }, [])

  // Page transition per the brief. We use explicit objects (not named variant
  // labels) so Framer Motion does NOT propagate a "exit"/"animate" label down to
  // child motion components (e.g. the staggered welcome lines), which would
  // otherwise deadlock <AnimatePresence mode="wait">.
  const initial = { opacity: 0, scale: reduce ? 1 : 0.96 }
  const animate = { opacity: 1, scale: 1 }
  const exit = { opacity: 0, scale: reduce ? 1 : 1.04 }
  const transition = { duration: reduce ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }

  const showProgress =
    currentStep >= STEP.VIBE && currentStep <= STEP.BIG_Q

  const renderStep = () => {
    switch (currentStep) {
      case STEP.WELCOME:
        return <WelcomeScreen onNext={() => go(STEP.VIBE)} />
      case STEP.VIBE:
        return (
          <VibeSelection
            selectedVibe={selectedVibe}
            setSelectedVibe={setSelectedVibe}
            onNext={() => go(STEP.ROMANTIC)}
          />
        )
      case STEP.ROMANTIC:
        return <RomanticMessage onNext={() => go(STEP.SMALL_Q)} />
      case STEP.SMALL_Q:
        return <SmallQuestion onNext={() => go(STEP.PLANNING)} />
      case STEP.PLANNING:
        return (
          <DatePlanning
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            selectedActivity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
            onNext={() => go(STEP.BIG_Q)}
          />
        )
      case STEP.BIG_Q:
        return <FinalQuestion onYes={handleYes} />
      case STEP.ACCEPTED:
        return (
          <DateAccepted
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedActivity={selectedActivity}
            onRestart={restart}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="app">
      <FloatingHearts />
      <FallingPetals />

      <MusicToggle
        playing={isMusicPlaying}
        unlocked={musicUnlocked}
        onToggle={() => setIsMusicPlaying((p) => !p)}
      />

      {celebrating && (
        <Celebration onDone={() => setCelebrating(false)} />
      )}

      <main className="stage-wrap" style={{ width: '100%' }}>
        {showProgress && (
          <ProgressIndicator current={currentStep - STEP.VIBE} total={5} />
        )}

        <div className="stage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              className="screen"
              initial={initial}
              animate={animate}
              exit={exit}
              transition={transition}
              style={{ width: '100%', position: 'relative' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
