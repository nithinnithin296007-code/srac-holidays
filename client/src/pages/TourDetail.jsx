import { useParams, Link } from 'react-router-dom'
import { fade } from '../utils/animations'
import SEO from '../components/SEO'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'



export default function TourDetail() {
  const { slug } = useParams()
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    fetch('/api/tours/' + slug)
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
