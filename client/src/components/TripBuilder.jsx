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

  const toggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(x => x !== id))
    } else {
      setSelectedInterests([...selectedInterests, id])
    }
  }

  const handleNext = () => setStep(step + 1)
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
    <div className="trip-builder-card" style={{
      background: 'var(--dark-2)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderRadius: 'var(--radius)',
      padding: '2.5rem',
      maxWidth: '800px',
      margin: '4rem auto 0',
      boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    }}>
      {/* Step Indicator Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1rem' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)' }}>
          Step {step} of 4
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[1, 2, 3, 4].map(s => (
            <div key={s} style={{
              width: '24px',
              height: '4px',
              borderRadius: '2px',
              background: s <= step ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      </div>

      {/* Steps Content wrapper */}
      <div style={{ minHeight: '320px' }}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Select Mumbai Experiences</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>Choose one or more items to add to your custom itinerary.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {INTERESTS.map(item => {
                  const active = selectedInterests.includes(item.id)
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleInterest(item.id)}
                      style={{
                        background: active ? 'rgba(200,65,11,0.08)' : 'rgba(255,255,255,0.02)',
                        border: active ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '10px',
                        padding: '1.2rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '0.6rem' }}>{item.icon}</span>
                      <h3 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '4px' }}>{item.title}</h3>
                      <p style={{ color: 'var(--muted)', fontSize: '0.72rem', lineHeight: 1.4 }}>{item.desc}</p>
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
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Duration & Group Size</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.8rem' }}>Tell us how much time you have and who is traveling.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                {/* Durations */}
                <div>
                  <h3 style={{ fontSize: '0.8rem', color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>Duration</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {DURATIONS.map(d => (
                      <div
                        key={d.id}
                        onClick={() => setDuration(d.id)}
                        style={{
                          background: duration === d.id ? 'rgba(200,65,11,0.08)' : 'rgba(255,255,255,0.02)',
                          border: duration === d.id ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '8px',
                          padding: '0.9rem 1.2rem',
                          fontSize: '0.85rem',
                          color: '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {d.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Groups */}
                <div>
                  <h3 style={{ fontSize: '0.8rem', color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>Group Size</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {GROUPS.map(g => (
                      <div
                        key={g.id}
                        onClick={() => setGroupSize(g.id)}
                        style={{
                          background: groupSize === g.id ? 'rgba(200,65,11,0.08)' : 'rgba(255,255,255,0.02)',
                          border: groupSize === g.id ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '8px',
                          padding: '0.9rem 1.2rem',
                          fontSize: '0.85rem',
                          color: '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
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
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Travel Details</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.8rem' }}>Provide contact info and date so we can coordinate your tour details.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Your Name *</label>
                  <input
                    value={details.name}
                    onChange={e => setDetails({ ...details, name: e.target.value })}
                    placeholder="Enter name"
                    style={{
                      backgroundColor: 'var(--dark)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      color: '#fff',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Phone Number *</label>
                  <input
                    value={details.phone}
                    onChange={e => setDetails({ ...details, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    style={{
                      backgroundColor: 'var(--dark)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      color: '#fff',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Target Travel Date *</label>
                  <input
                    value={details.date}
                    onChange={e => setDetails({ ...details, date: e.target.value })}
                    placeholder="Preferred Date / Range"
                    style={{
                      backgroundColor: 'var(--dark)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      color: '#fff',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Special Requests (optional)</label>
                  <textarea
                    value={details.notes}
                    onChange={e => setDetails({ ...details, notes: e.target.value })}
                    placeholder="Tell us what you are most excited about or any specific landmarks you'd like to include..."
                    rows={3}
                    style={{
                      backgroundColor: 'var(--dark)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      color: '#fff',
                      fontSize: '0.88rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      resize: 'none',
                    }}
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
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Verify Custom Tour</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.8rem' }}>Check your specifications before sending details to our WhatsApp team.</p>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem', color: 'var(--light-2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)' }}>Traveler Name:</span>
                  <strong style={{ color: '#fff' }}>{details.name || 'Not filled'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)' }}>Contact Phone:</span>
                  <strong style={{ color: '#fff' }}>{details.phone || 'Not filled'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)' }}>Travel Date:</span>
                  <strong style={{ color: '#fff' }}>{details.date || 'Not filled'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)' }}>Experiences Selected:</span>
                  <strong style={{ color: '#fff', textAlign: 'right', maxWidth: '60%' }}>
                    {selectedInterests.length > 0
                      ? selectedInterests.map(id => INTERESTS.find(x => x.id === id)?.title).join(', ')
                      : 'None selected'
                    }
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)' }}>Duration:</span>
                  <strong style={{ color: '#fff' }}>{DURATIONS.find(x => x.id === duration)?.label}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px' }}>
                  <span style={{ color: 'var(--muted)' }}>Group Size:</span>
                  <strong style={{ color: '#fff' }}>{GROUPS.find(x => x.id === groupSize)?.label}</strong>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {step > 1 ? (
          <button onClick={handlePrev} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.6rem 1.4rem' }}>
            ← Back
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            onClick={handleNext}
            className="btn btn-primary"
            disabled={step === 3 && (!details.name.trim() || !details.phone.trim() || !details.date.trim())}
            style={{
              fontSize: '0.8rem',
              padding: '0.6rem 1.5rem',
              opacity: step === 3 && (!details.name.trim() || !details.phone.trim() || !details.date.trim()) ? 0.5 : 1,
              cursor: step === 3 && (!details.name.trim() || !details.phone.trim() || !details.date.trim()) ? 'not-allowed' : 'pointer',
            }}
          >
            Next Step →
          </button>
        ) : (
          <button onClick={handleSend} className="btn btn-whatsapp" style={{ fontSize: '0.8rem', padding: '0.6rem 1.6rem' }}>
            💬 Enquire on WhatsApp
          </button>
        )}
      </div>
    </div>
  )
}
