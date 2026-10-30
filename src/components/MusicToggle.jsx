import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Optional background music.
 * - Never autoplays: audio only starts when `playing` becomes true, which
 *   only happens after the user has interacted (App gates this).
 * - Degrades gracefully: if /music/romantic.mp3 is missing or the browser
 *   blocks playback, we simply swallow the error — the app keeps working.
 */
export default function MusicToggle({ playing, onToggle, unlocked }) {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      const p = audio.play()
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          /* missing file or autoplay policy — ignore, stay silent */
        })
      }
    } else {
      audio.pause()
    }
  }, [playing])

  // Don't render the control until the experience has been "unlocked" by a tap,
  // so we never hint at audio before any interaction.
  return (
    <>
      <audio ref={audioRef} src="/music/romantic.mp3" loop preload="none" />
      <AnimatePresence>
        {unlocked && (
          <motion.button
            type="button"
            className="music-toggle"
            onClick={onToggle}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            aria-pressed={playing}
            aria-label={playing ? 'Turn music off' : 'Turn music on'}
            title={playing ? 'Music on' : 'Music off'}
          >
            {playing ? '🔊' : '🔇'}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
