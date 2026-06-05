import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const INTERESTS = [
  { id: 'bollywood', icon: '🎬', title: 'Bollywood Studio', desc: 'Active soundstages, dance halls, sets' },
  { id: 'dharavi', icon: '🏘️', title: 'Dharavi Local Life', desc: 'Crafts, recycling, community walk' },
  { id: 'heritage', icon: '🏛️', title: 'Heritage Walk', desc: 'Gateway of India, CST, Marine Drive' },
  { id: 'food', icon: '🍛', title: 'Street Food Trail', desc: 'Authentic local delicacies & bites' },
  { id: 'getaway', icon: '🛣️', title: 'Weekend Getaway', desc: 'Hill stations, vineyards, retreats' },
]

const DURATIONS = [
  { id: 'half', label: 'Half Day (3–4 Hours)' },
  { id: 'full', label: 'Full Day (6–8 Hours)' },
  { id: 'multi', label: 'Multi-Day (Custom Trips)' },
]

const GROUPS = [
  { id: 'solo', label: 'Solo Traveler' },
  { id: 'family', label: 'Private Group (2-4 people)' },
  { id: 'small', label: 'Small Group (5-10 people)' },
  { id: 'large', label: 'Corporate / Large Group (10+)' },
]

export default function TripBuilder() {
  const [step, setStep] = useState(1)
  const [selectedInterests, setSelectedInterests] = useState([])
  const [duration, setDuration] = useState('half')
  const [groupSize, setGroupSize] = useState('family')
  const [details, setDetails] = useState({ name: '', phone: '', date: '', notes: '' })
  const [errors, setErrors] = useState({ name: '', phone: '', date: '' })

  const validateStep3 = () => {
    const newErrors = { name: '', phone: '', date: '' }
    let isValid = true

    const nameTrimmed = details.name.trim()
    if (!nameTrimmed) {
      newErrors.name = 'Your name is required'
      isValid = false
    } else if (nameTrimmed.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
      isValid = false
    }

    const phoneTrimmed = details.phone.trim()
    const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/
    if (!phoneTrimmed) {
      newErrors.phone = 'Phone number is required'
      isValid = false
    } else if (!phoneRegex.test(phoneTrimmed)) {
      newErrors.phone = 'Please enter a valid phone number (e.g. +91 98765 43210)'
      isValid = false
    }

    const dateTrimmed = details.date.trim()
    if (!dateTrimmed) {
      newErrors.date = 'Travel date is required'
      isValid = false
    } else if (dateTrimmed.length < 3) {
      newErrors.date = 'Please specify a valid date or date range'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (field, val) => {
    setDetails(prev => ({ ...prev, [field]: val }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const toggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(x => x !== id))
    } else {
      setSelectedInterests([...selectedInterests, id])
    }
  }

  const handleNext = () => {
    if (step === 3) {
      if (!validateStep3()) return
    }
    setStep(step + 1)
  }
  const handlePrev = () => setStep(step - 1)

  const handleSend = () => {
    const interestNames = selectedInterests
      .map(id => INTERESTS.find(x => x.id === id)?.title)
      .filter(Boolean)
      .join(', ')

    const durationLabel = DURATIONS.find(x => x.id === duration)?.label
    const groupLabel = GROUPS.find(x => x.id === groupSize)?.label

    const lines = [
      `Hi SRAC Holidays! 👋 I've built a custom tour itinerary on your website:`,
      ``,
      `*1. Client Name:* ${details.name || 'Not provided'}`,
      `*2. Phone:* ${details.phone || 'Not provided'}`,
      `*3. Preferred Date:* ${details.date || 'Not provided'}`,
      `*4. Selected Experiences:* ${interestNames || 'Custom Itinerary'}`,
      `*5. Duration:* ${durationLabel}`,
      `*6. Group Size:* ${groupLabel}`,
      details.notes ? `*7. Special Requests:* ${details.notes}` : '',
      ``,
      `Please let me know availability and pricing!`,
    ].filter(Boolean)

    window.open(`https://wa.me/917738676316?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
  }

  return (
    <div className="trip-builder-card">
      {/* Step Indicator Header */}
      <div className="tb__header">
        <span className="tb__step-indicator">
          Step {step} of 4
        </span>
        <div className="tb__progress-bars">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`tb__progress-bar ${s <= step ? 'active' : ''}`} />
          ))}
        </div>
      </div>

      {/* Steps Content wrapper */}
      <div className="tb__body">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="tb__title">Select Mumbai Experiences</h2>
              <p className="tb__desc">Choose one or more items to add to your custom itinerary.</p>
              
              <div className="tb__interests-grid">
                {INTERESTS.map(item => {
                  const active = selectedInterests.includes(item.id)
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleInterest(item.id)}
                      className={`tb__interest-item ${active ? 'active' : ''}`}
                    >
                      <span className="tb__interest-icon">{item.icon}</span>
                      <h3 className="tb__interest-title">{item.title}</h3>
                      <p className="tb__interest-desc">{item.desc}</p>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="tb__title">Duration & Group Size</h2>
              <p className="tb__desc">Tell us how much time you have and who is traveling.</p>

              <div className="tb__split-grid">
                {/* Durations */}
                <div>
                  <h3 className="tb__section-subtitle">Duration</h3>
                  <div className="tb__options-list">
                    {DURATIONS.map(d => (
                      <div
                        key={d.id}
                        onClick={() => setDuration(d.id)}
                        className={`tb__option-item ${duration === d.id ? 'active' : ''}`}
                      >
                        {d.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Groups */}
                <div>
                  <h3 className="tb__section-subtitle">Group Size</h3>
                  <div className="tb__options-list">
                    {GROUPS.map(g => (
                      <div
                        key={g.id}
                        onClick={() => setGroupSize(g.id)}
                        className={`tb__option-item ${groupSize === g.id ? 'active' : ''}`}
                      >
                        {g.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="tb__title">Travel Details</h2>
              <p className="tb__desc">Provide contact info and date so we can coordinate your tour details.</p>

              <div className="tb__details-grid">
                <div className="tb__input-group">
                  <label className="tb__input-label">Your Name *</label>
                  <input
                    value={details.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    placeholder="Enter name"
                    className="tb__input"
                    style={errors.name ? { borderColor: '#ff4d4f', boxShadow: '0 0 0 1px rgba(255, 77, 79, 0.2)' } : {}}
                  />
                  {errors.name && (
                    <span className="tb__error-message" style={{ color: '#ff4d4f', fontSize: '0.72rem', marginTop: '2px' }}>{errors.name}</span>
                  )}
                </div>

                <div className="tb__input-group">
                  <label className="tb__input-label">Phone Number *</label>
                  <input
                    value={details.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="tb__input"
                    style={errors.phone ? { borderColor: '#ff4d4f', boxShadow: '0 0 0 1px rgba(255, 77, 79, 0.2)' } : {}}
                  />
                  {errors.phone && (
                    <span className="tb__error-message" style={{ color: '#ff4d4f', fontSize: '0.72rem', marginTop: '2px' }}>{errors.phone}</span>
                  )}
                </div>

                <div className="tb__input-group tb__input-group--full">
                  <label className="tb__input-label">Target Travel Date *</label>
                  <input
                    value={details.date}
                    onChange={e => handleInputChange('date', e.target.value)}
                    placeholder="Preferred Date / Range"
                    className="tb__input"
                    style={errors.date ? { borderColor: '#ff4d4f', boxShadow: '0 0 0 1px rgba(255, 77, 79, 0.2)' } : {}}
                  />
                  {errors.date && (
                    <span className="tb__error-message" style={{ color: '#ff4d4f', fontSize: '0.72rem', marginTop: '2px' }}>{errors.date}</span>
                  )}
                </div>

                <div className="tb__input-group tb__input-group--full">
                  <label className="tb__input-label">Special Requests (optional)</label>
                  <textarea
                    value={details.notes}
                    onChange={e => setDetails({ ...details, notes: e.target.value })}
                    placeholder="Tell us what you are most excited about or any specific landmarks you'd like to include..."
                    rows={3}
                    className="tb__textarea"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="tb__title">Verify Custom Tour</h2>
              <p className="tb__desc">Check your specifications before sending details to our WhatsApp team.</p>

              <div className="tb__summary-box">
                <div className="tb__summary-row">
                  <span className="tb__summary-key">Traveler Name:</span>
                  <strong className="tb__summary-val">{details.name || 'Not filled'}</strong>
                </div>
                <div className="tb__summary-row">
                  <span className="tb__summary-key">Contact Phone:</span>
                  <strong className="tb__summary-val">{details.phone || 'Not filled'}</strong>
                </div>
                <div className="tb__summary-row">
                  <span className="tb__summary-key">Travel Date:</span>
                  <strong className="tb__summary-val">{details.date || 'Not filled'}</strong>
                </div>
                <div className="tb__summary-row">
                  <span className="tb__summary-key">Experiences Selected:</span>
                  <strong className="tb__summary-val tb__summary-val--wide">
                    {selectedInterests.length > 0
                      ? selectedInterests.map(id => INTERESTS.find(x => x.id === id)?.title).join(', ')
                      : 'None selected'
                    }
                  </strong>
                </div>
                <div className="tb__summary-row">
                  <span className="tb__summary-key">Duration:</span>
                  <strong className="tb__summary-val">{DURATIONS.find(x => x.id === duration)?.label}</strong>
                </div>
                <div className="tb__summary-row tb__summary-row--last">
                  <span className="tb__summary-key">Group Size:</span>
                  <strong className="tb__summary-val">{GROUPS.find(x => x.id === groupSize)?.label}</strong>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="tb__footer">
        {step > 1 ? (
          <button onClick={handlePrev} className="btn btn-outline tb__back-btn">
            ← Back
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            onClick={handleNext}
            className="btn btn-primary tb__next-btn"
          >
            Next Step →
          </button>
        ) : (
          <button onClick={handleSend} className="btn btn-whatsapp tb__wa-btn">
            💬 Enquire on WhatsApp
          </button>
        )}
      </div>
    </div>
  )
}
