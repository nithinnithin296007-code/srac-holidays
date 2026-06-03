import { useParams, Link } from 'react-router-dom'
import { fade } from '../utils/animations'
import SEO from '../components/SEO'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { API_URL } from '../utils/api'

function TourMap({ itinerary }) {
  const [activeStop, setActiveStop] = useState(0)

  if (!itinerary || itinerary.length === 0) return null

  const width = 800
  const height = 150
  const padding = 60
  const stopsCount = itinerary.length

  const points = itinerary.map((item, index) => {
    const x = padding + (index * (width - 2 * padding)) / Math.max(stopsCount - 1, 1)
    const y = height / 2 + Math.sin(index * 1.5) * 32
    return { x, y, ...item }
  })

  let pathD = ''
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const cpX1 = prev.x + (curr.x - prev.x) / 2
      const cpY1 = prev.y
      const cpX2 = prev.x + (curr.x - prev.x) / 2
      const cpY2 = curr.y
      pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`
    }
  }

  return (
    <div className="td__block" style={{ margin: '3rem 0', background: 'var(--dark-2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius)', padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.25rem' }}>Interactive Route Map</h2>
      
      {/* Scrollable container for mobile */}
      <div style={{ overflowX: 'auto', width: '100%', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="cr-model-switcher">
        <div style={{ width: `${width}px`, height: `${height}px`, position: 'relative', margin: '0 auto' }}>
          <svg width={width} height={height} style={{ overflow: 'visible' }}>
            {/* Winding road path background */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Active animated stroke */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.2"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />

            {/* Render Nodes */}
            {points.map((pt, idx) => {
              const isActive = activeStop === idx
              return (
                <g 
                  key={idx} 
                  onClick={() => setActiveStop(idx)} 
                  onMouseEnter={() => setActiveStop(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer glowing ring */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isActive ? 13 : 8}
                    fill={isActive ? 'rgba(200, 65, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)'}
                    stroke={isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.25)'}
                    strokeWidth="2"
                    style={{ transition: 'all 0.25s cubic-bezier(0.25, 1, 0.5, 1)' }}
                  />
                  {/* Inner node */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="4.5"
                    fill={isActive ? 'var(--accent)' : '#fff'}
                    style={{ transition: 'all 0.25s' }}
                  />
                  {/* Stop Time text */}
                  <text
                    x={pt.x}
                    y={pt.y - 18}
                    textAnchor="middle"
                    fill={isActive ? 'var(--accent)' : 'var(--muted)'}
                    fontSize="9.5"
                    fontWeight={isActive ? '700' : '400'}
                    style={{ transition: 'all 0.25s', fontFamily: 'var(--font-body)' }}
                  >
                    {pt.time}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* Stop details preview card */}
      <div style={{ minHeight: '80px' }}>
        <AnimatePresence mode="wait">
          {points[activeStop] && (
            <motion.div
              key={activeStop}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              style={{
                marginTop: '1.25rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(200, 65, 11, 0.12)',
                border: '1px solid var(--primary)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
                flexShrink: 0,
              }}>
                {activeStop + 1}
              </div>
              <div>
                <span style={{ fontSize: '0.68rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Stop {activeStop + 1} · {points[activeStop].time}
                </span>
                <h4 style={{ fontSize: '0.92rem', color: '#fff', margin: '2px 0 0', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  {points[activeStop].activity}
                </h4>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}




export default function TourDetail() {
  const { slug } = useParams()
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    fetch(`${API_URL}/tours/${slug}`)
      .then(r => {
        if (!r.ok) throw new Error('Not found')
        return r.json()
      })
      .then(data => { setTour(data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [slug])


  if (loading) return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'var(--muted)', fontSize: '1rem' }}>Loading tour...</div>
    </main>
  )

  if (error || !tour) return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ color: 'var(--primary)' }}>Tour not found</h2>
      <Link to="/tours" className="btn btn-outline">Back to All Tours</Link>
    </main>
  )

  const waMsg = encodeURIComponent('Hi SRAC Holidays! I am interested in the ' + tour.name + '. Can you share more details?')

  return (
    <main>
      <SEO title={tour.name} description={tour.tagline} slug={slug} image={tour.coverImage} />

      <section className="td__hero" style={{ backgroundImage: 'url(' + tour.coverImage + ')' }}>
        <div className="td__hero-overlay" />
        <div className="container td__hero-inner">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="td__breadcrumb">
              <Link to="/tours">← Back to All Tours</Link>
              <span className="tag" style={{ marginLeft: '1rem' }}>MUMBAI</span>
            </div>
            <h1>{tour.name}</h1>
            <p className="td__subtitle">{tour.tagline}</p>
            <div className="td__meta">
              <span>📅 {tour.duration}</span>
              <span>👥 {tour.groupSize}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section td__body">
        <div className="container td__body-grid">

          <div className="td__left">

            {tour.about && (
              <motion.div className="td__block" {...fade(0)}>
                <h2>About This Tour</h2>
                {tour.about.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </motion.div>
            )}

            {tour.highlights && tour.highlights.length > 0 && (
              <motion.div className="td__block" {...fade(0.1)}>
                <h2>What You Will See</h2>
                <ul className="td__highlights">
                  {tour.highlights.map((h, i) => (
                    <li key={i}>
                      <span className="td__highlight-dot" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            <TourMap itinerary={tour.itinerary} />

            {tour.itinerary && tour.itinerary.length > 0 && (
              <motion.div className="td__block" {...fade(0.15)}>
                <h2>Itinerary</h2>
                <div className="td__itinerary">
                  {tour.itinerary.map((item, i) => (
                    <div key={i} className="td__itinerary-item">
                      <span className="td__itinerary-time">{item.time}</span>
                      <span className="td__itinerary-activity">{item.activity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {tour.whatToExpect && tour.whatToExpect.length > 0 && (
              <motion.div className="td__block" {...fade(0.2)}>
                <h2>Good to Know</h2>
                <div className="td__expect-list">
                  {tour.whatToExpect.map((item, i) => (
                    <div key={i} className="td__expect-item">
                      <span className="td__expect-icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>

          <motion.div className="td__right" {...fade(0.1)}>
            <div className="td__cta-card">
              {tour.tags && (
                <div className="td__cta-tags">
                  {tour.tags.map(t => (
                    <span key={t} className="td__cta-tag">{t}</span>
                  ))}
                </div>
              )}
              <h3>{tour.name}</h3>
              <div className="td__cta-meta">
                <div><span>Duration</span><strong>{tour.duration}</strong></div>
                <div><span>Group Size</span><strong>{tour.groupSize}</strong></div>
              </div>
              <a
                href={"https://wa.me/917738676316?text=" + waMsg}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
                style={{ width: "100%", justifyContent: "center", marginBottom: "0.8rem" }}
              >
                Book via WhatsApp
              </a>
              <a
                href="tel:+917738676316"
                className="btn btn-outline"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Call Us
              </a>
              <p className="td__cta-note">No payment online. We confirm your booking directly and handle all details personally.</p>
            </div>
          </motion.div>

        </div>
      </section>

    </main>
  )
}
