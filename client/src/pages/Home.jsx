import { useEffect, useRef } from 'react'
import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TourCard from '../components/TourCard'
import ScrollFloat from '../components/ScrollFloat'
import TripBuilder from '../components/TripBuilder'
import toursData from '../data/tours'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const featured = toursData.slice(0, 6)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (window.location.hash === '#custom-trip') {
      setTimeout(() => {
        document.getElementById('custom-trip')?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
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
    {
      number: '20+',
      label: 'Years Running',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    },
    {
      number: '15',
      label: 'Unique Tours',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
        </svg>
      )
    },
    {
      number: '2,000+',
      label: 'Guests Hosted',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      number: '7+',
      label: 'TripAdvisor Awards',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
          <path d="M4 22h16"></path>
          <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
          <path d="M12 2a5 5 0 0 0-5 5v3.5a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"></path>
        </svg>
      )
    },
  ]


  return (
    <main ref={heroRef}>
      <SEO />
      <section className="hero">
        <div className="hero__video-bg">
          <video ref={videoRef} autoPlay muted loop playsInline>
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
            <a href="#custom-trip" className="btn btn-outline film__btn-custom">
              Build Custom Trip ✦
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


      <section className="home__stats reveal-section">
        <div className="container">
          <div className="home__stats-bar">
            {stats.map((s, i) => (
              <div className="home__stat-item" key={i}>
                <div className="home__stat-icon">
                  {s.icon}
                </div>
                <div className="home__stat-info">
                  <span className="home__stat-number">{s.number}</span>
                  <span className="home__stat-label">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
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
            {featured.map((tour, i) => (
              <TourCard key={tour.slug} tour={tour} index={i} />
            ))}
          </div>
          <div className="featured__cta reveal-section">
            <Link to="/tours" className="btn btn-outline">See All 15 Tours →</Link>
          </div>
        </div>
      </section>

      <section id="custom-trip" className="section home__builder">
        <div className="container">
          <div className="section-header reveal-section" style={{ textAlign: "center" }}>
            <span className="tag">Highlight Feature</span>
            <ScrollFloat containerClassName="section-title">Build Your Custom Tour</ScrollFloat>
            <p className="section-sub">Select your interests, tell us your duration, and let us design a personalized day in Mumbai.</p>
          </div>
          <TripBuilder />
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
          <div className="home__rentals-banner">
            <div className="home__rentals-banner-content">
              <span className="home__rentals-banner-subtitle">Also Available</span>
              <h2 className="home__rentals-banner-title">
                Luxury Car Rentals
              </h2>
              <p className="home__rentals-banner-desc">
                BMW, Mercedes, Jaguar, Innova and more. Airport transfers, outstation trips, corporate events — driven by professionals.
              </p>
            </div>
            <div className="home__rentals-banner-fleet">
              {['BMW 5 Series', 'Mercedes E-Class', 'Jaguar XF', 'Innova Crysta'].map(car => (
                <span key={car} className="home__rentals-banner-car">{car}</span>
              ))}
              <a href="/car-rentals" className="btn btn-primary home__rentals-banner-btn">
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