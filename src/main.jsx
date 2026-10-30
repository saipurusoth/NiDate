import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import './styles/animations.css'

// NOTE: We intentionally do not wrap <App /> in <React.StrictMode>.
// StrictMode double-invokes lifecycles in dev, which deadlocks Framer Motion's
// <AnimatePresence mode="wait"> exit tracking (the exiting screen animates to
// opacity 0 but never unmounts, so the next screen never mounts). Dropping it
// keeps the page transitions reliable. StrictMode is a no-op in production, so
// this only affects the dev experience.
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
