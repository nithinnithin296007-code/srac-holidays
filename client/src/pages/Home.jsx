import { useEffect, useRef, useState } from 'react'
import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TourCard from '../components/TourCard'
import axios from 'axios'
import { API_URL } from '../utils/api'
import ScrollFloat from '../components/ScrollFloat'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const heroRef = useRef(null)
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(`${API_URL}/tours`)
      .then(res => {
        setFeatured(res.data.slice(0, 6))
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.film__tag', { opacity: 0, x: -30, duration: 0.8, delay: 0.6 })
      gsap.from('.film__title', { opacity: 0, y: 40, duration: 1.2, delay: 0.9, ease: 'power4.out' })
      gsap.from('.film__sub', { opacity: 0, y: 20, duration: 1, delay: 1.3 })
      gsap.from('.film__actions', { opacity: 0, y: 20, duration: 1, delay: 1.5 })
      gsap.from('.hero__scroll', { opacity: 0, duration: 1, delay: 2 })
      gsap.utils.toArray('.reveal-section').forEach(el => {
        gsap.from(el, { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: el, start: 'top 85%' } })
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const stats = [
    { number: '20+', label: 'Years Running' },
    { number: '15', label: 'Unique Tours' },
    { number: '2,000+', label: 'Guests Hosted' },
    { number: '7+', label: 'TripAdvisor Awards' },
  ]

  const whyItems = [
    { title: 'Bollywood Access', desc: 'Real sets, real shoots — not a themed attraction.' },
    { title: 'Local Guides Only', desc: 'Every guide lives in the neighbourhood they show you.' },
    { title: 'Small Groups', desc: 'Max 15-20 people. Often much less.' },
    { title: 'No Hidden Costs', desc: 'Price listed is the full price. Always.' },
  ]

  return (
    <main ref={heroRef}>
      <SEO />
      <section className="hero">
        <div className="hero__video-bg">
          <video autoPlay muted loop playsInline>
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero__video-overlay" />
        </div>

        <div className="film__card">
          <span className="film__tag tag">Mumbai · Est. 2003</span>
          <h1 className="film__title">
            Mumbai.<br />
            <span className="film__title--accent">Beyond The</span><br />
            Ordinary.
          </h1>
          <p className="film__sub">
            15 tours. One city. Zero tourist traps.
          </p>
          <div className="film__actions">
            <Link to="/tours" className="btn btn-primary">Explore Tours</Link>
            <a href="https://wa.me/917738676316" target="_blank" rel="noreferrer" className="btn btn-outline">
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className="hero__trust">
          <div className="hero__trust-item">4.9 Rated</div>
          <div className="hero__trust-item">Since 2003</div>
          <div className="hero__trust-item">2,000+ Guests</div>
        </div>

        <div className="hero__scroll">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>


      <section className="home__stats">
        <div className="container home__stats-grid">
          {stats.map((s, i) => (
            <div className="home__stat" key={i}>
              <div className="home__stat-number">{s.number}</div>
              <p className="home__stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section featured">
        <div className="container">
          <div className="section-header reveal-section">
            <span className="tag">What We Do</span>
            <ScrollFloat containerClassName="section-title">Tours Worth Taking</ScrollFloat>
            <p className="section-sub">Every tour is guided by a local who knows the city — not a script.</p>
          </div>
          <div className="tours-grid">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div className="tour-card skeleton-card" key={i}>
                  <div className="skeleton-image skeleton-pulse" />
                  <div className="tour-card__body">
                    <div className="skeleton-title skeleton-pulse" />
                    <div className="skeleton-text skeleton-pulse" />
                    <div className="skeleton-text skeleton-pulse" style={{ width: '60%' }} />
                    <div className="skeleton-meta skeleton-pulse" />
                  </div>
                </div>
              ))
            ) : (
              featured.map((tour, i) => (
                <TourCard key={tour.slug} tour={tour} index={i} />
              ))
            )}
          </div>
          <div className="featured__cta reveal-section">
            <Link to="/tours" className="btn btn-outline">See All 15 Tours →</Link>
          </div>
        </div>
      </section>

      <section className="section home__why">
        <div className="container">
          <div className="home__why-top reveal-section">
            <div className="home__why-left">
              <span className="tag">Why SRAC</span>
              <h2>Pioneer of Studio Tours<br />Since 2003</h2>
              <p>SRAC was the first operator in India to run Bollywood Studio Tours and Dharavi Slum Tours — back in 2003, when nobody else was doing it. Two decades later, the philosophy hasn't changed.</p>
              <p>Every guide is a Mumbai local. Every group is small. Every tour is real.</p>
              <Link to="/about" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>Our Story →</Link>
            </div>
            <div className="home__why-awards">
              <div className="home__award-badge">
                <span className="home__award-owl">🦉</span>
                <span className="home__award-text">TripAdvisor</span>
                <span className="home__award-sub">7+ Consecutive Awards</span>
              </div>
              <div className="home__award-badge">
                <span className="home__award-owl">⭐</span>
                <span className="home__award-text">4.9 Rated</span>
                <span className="home__award-sub">Google Reviews</span>
              </div>
              <div className="home__award-badge">
                <span className="home__award-owl">👥</span>
                <span className="home__award-text">2,000+</span>
                <span className="home__award-sub">Guests Hosted</span>
              </div>
            </div>
          </div>

          <div className="home__usp-grid reveal-section">
            {[
              { icon: "🎬", tag: "BOLLYWOOD", title: "Real Set Access", desc: "We get you inside Film City — not the gate, the actual studio floor. Active shoots, costume departments, live sets." },
              { icon: "🏘️", tag: "DHARAVI", title: "Pioneers of Slum Tourism", desc: "We started Dharavi tours in 2003. No one knows the lanes, the factories, and the people better than our guides." },
              { icon: "👤", tag: "LOCAL", title: "Guides Who Live There", desc: "Every guide is born and raised in the neighbourhood they show you. No outsiders, no scripts, no staged moments." },
              { icon: "🎯", tag: "SMALL", title: "Never a Crowd", desc: "Max 15-20 people per tour. Often far less. You get a real experience, not a cattle drive through the city." },
              { icon: "💰", tag: "HONEST", title: "No Hidden Costs", desc: "The price you see is the full price. No surprise fees, no tipping culture, no upsells on the day." },
              { icon: "📞", tag: "DIRECT", title: "Book Direct, Talk to Humans", desc: "No booking engines, no chatbots. You WhatsApp us, a human responds, and we build your tour personally." },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="home__usp-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
              >
                <span className="home__usp-icon">{item.icon}</span>
                <span className="home__usp-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home__testimonials" style={{ background: "var(--dark-2)" }}>
        <div className="container">
          <div className="section-header reveal-section" style={{ textAlign: "center" }}>
            <span className="tag">Google Reviews · 4.9 ★</span>
            <h2 className="section-title">What Our Guests Say</h2>
          </div>
          <div className="home__reviews-grid reveal-section">
            {[
              { text: "Very reliable, very professional, neat and clean service across the designated location. Behaviour of founder, staffs — top notch.", author: "Sandip Pal", country: "Mumbai" },
              { text: "Tried Smart Rent A Car recently and it was honestly a smooth experience. No drama, no hidden costs — just simple and reliable service. Would definitely use them again.", author: "Gowri Devi", country: "Mumbai" },
              { text: "I know this company from last 5 years. They are excellent in terms of quality service and commitment.", author: "Shankar Subramaniam", country: "Mumbai" },
              { text: "Booking was super easy, car was spotless, and the whole process felt premium without the premium price. Highly recommended.", author: "Poonam Jain", country: "Mumbai" },
            ].map((r, i) => (
              <motion.div
                key={i}
                className="home__review-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <div className="home__review-stars">★★★★★</div>
                <p className="home__review-text">"{r.text}"</p>
                <div className="home__review-author">
                  <strong>{r.author}</strong>
                  <span>{r.country}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home__rentals">
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            background: 'var(--dark-2)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            padding: '2.5rem 3rem',
            flexWrap: 'wrap',
          }}>
            <div>
              <span style={{
                fontSize: '0.7rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                fontWeight: 600,
              }}>Also Available</span>
              <h2 style={{ fontSize: '1.8rem', margin: '0.5rem 0', fontFamily: 'var(--font-display)' }}>
                Luxury Car Rentals
              </h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '420px', lineHeight: 1.6 }}>
                BMW, Mercedes, Jaguar, Innova and more. Airport transfers, outstation trips, corporate events — driven by professionals.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {['BMW 5 Series', 'Mercedes E-Class', 'Jaguar XF', 'Innova Crysta'].map(car => (
                <span key={car} style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '100px',
                  padding: '6px 14px',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                }}>{car}</span>
              ))}
              <a href="/car-rentals" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                View Fleet →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="home__cta reveal-section">
        <div className="container home__cta-inner">
          <div className="home__cta-left">
            <h2>Ready to See the Real Mumbai?</h2>
            <p>WhatsApp us with your dates and group size. We will respond within hours and build something around you.</p>
          </div>
          <div className="home__cta-right">
            <a href="https://wa.me/917738676316" target="_blank" rel="noreferrer" className="btn btn-whatsapp">Start on WhatsApp</a>
            <Link to="/tours" className="btn btn-outline">Browse Tours</Link>
          </div>
        </div>
      </section>

    </main>
  )
}