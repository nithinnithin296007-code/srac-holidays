import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/917738676316?text=${encoded}`, '_blank')
    setMessage('')
    setOpen(false)
  }

  return (
    <div className="wa__widget-container">
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="wa__widget-chat"
          >
            {/* Header */}
            <div className="wa__widget-header">
              {/* Avatar circle */}
              <div className="wa__widget-avatar">
                AM
              </div>
              <div className="wa__widget-name-wrap">
                <span className="wa__widget-name">Abhishek Mandal</span>
                <span className="wa__widget-status">
                  <span className="wa__widget-status-dot" />
                  Online · Responds in minutes
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="wa__widget-close"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="wa__widget-body">
              <div className="wa__widget-bubble">
                Hi there! 👋 I'm Abhishek, CEO of SRAC Holidays. How can we help you plan your Mumbai tour or car rental today?
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="wa__widget-form">
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="wa__widget-input"
              />
              <button
                type="submit"
                className="wa__widget-submit"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="wa__widget-trigger"
      >
        {/* Animated pulse ring */}
        {!open && (
          <span className="wa__widget-pulse" />
        )}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.59 2.016 14.133 1 11.5 1c-5.438 0-9.863 4.373-9.867 9.801 0 1.696.475 3.328 1.378 4.793L1.97 21.09l5.808-1.517c-.394-.216-.767-.442-1.13-.42zM17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        </svg>
      </motion.button>
    </div>
  )
}
