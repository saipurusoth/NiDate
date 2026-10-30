import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Types out `text` one character at a time. Respects reduced-motion by
 * showing the full text instantly. Cleans up its interval on unmount.
 */
export default function Typewriter({ text, speed = 42, startDelay = 250, onDone }) {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? text : '')
  const [done, setDone] = useState(reduce)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    if (reduce) {
      setShown(text)
      setDone(true)
      onDoneRef.current?.()
      return
    }

    setShown('')
    setDone(false)
    let i = 0
    let intervalId

    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1
        setShown(text.slice(0, i))
        if (i >= text.length) {
          window.clearInterval(intervalId)
          setDone(true)
          onDoneRef.current?.()
        }
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(startId)
      window.clearInterval(intervalId)
    }
  }, [text, speed, startDelay, reduce])

  return (
    <span>
      {shown}
      {!done && <span className="typewriter-caret" aria-hidden="true" />}
    </span>
  )
}
