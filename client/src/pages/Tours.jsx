import { useEffect, useState, useRef } from 'react'
import SEO from '../components/SEO'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TourCard from '../components/TourCard'
import FAQAccordion from '../components/FAQAccordion'
import axios from 'axios'
import { API_URL } from '../utils/api'
import { useSearchParams } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All', 'Bollywood', 'Mumbai', 'Heritage', 'Food', 'Getaways']

export default function Tours() {
  const [tours, setTours] = useState([])
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const [active, setActive] = useState(categoryParam || 'All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const pageRef = useRef(null)

  useEffect(() => {
    axios.get(`${API_URL}/tours`)
      .then(res => { setTours(res.data); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tours-hero__title', { opacity: 0, y: 50, duration: 1, delay: 0.3, ease: 'power4.out' })
      gsap.from('.tours-hero__sub', { opacity: 0, y: 20, duration: 1, delay: 0.6 })
      gsap.from('.tours__filters', { opacity: 0, y: 20, duration: 0.8, delay: 0.8 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  const filtered = active === 'All' ? tours : tours.filter(t => t.category === active)

  return (
    <main ref={pageRef}>
      <SEO 
        title="Mumbai Tours & Experiences" 
        description="Explore our list of unique Mumbai tours. Bollywood Film City tours, Dharavi slum tours, heritage walks, street food tastings, and local getaways." 
      />

      {/* ── HERO ── */}
      <section className="tours-hero">
        <div className="tours-hero__bg">
          
          <div className="tours-hero__overlay" />
        </div>
        <div className="container tours-hero__content">
          <span className="tag">15 Unique Experiences</span>
          <h1 className="tours-hero__title">
            Every Tour a<br />
            <span style={{color:'var(--primary)'}}>Different Mumbai</span>
          </h1>
          <p className="tours-hero__sub">
            Bollywood. Heritage. Food. Slums. Vineyards. Hill stations.
            One city — endlessly surprising.
          </p>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <section className="tours__filter-bar">
        <div className="container">
          <div className="tours__filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`tours__filter-btn ${active === cat ? 'active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="tours__count">{filtered.length} tour{filtered.length !== 1 ? 's' : ''}</p>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="section tours__grid-section">
        <div className="container">
          {loading ? (
            <div className="tours-grid tours-grid--full">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="tour-card skeleton-card" key={i}>
                  <div className="skeleton-image skeleton-pulse" />
                  <div className="tour-card__body">
                    <div className="skeleton-title skeleton-pulse" />
                    <div className="skeleton-text skeleton-pulse" />
                    <div className="skeleton-text skeleton-pulse" style={{ width: '60%' }} />
                    <div className="skeleton-meta skeleton-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
              <p>Could not load tours. Please refresh the page.</p>
            </div>
          ) : (
            <div className="tours-grid tours-grid--full">
              {filtered.map((tour, i) => (
                <TourCard key={tour.slug} tour={tour} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="section tours__faq" style={{ background: 'var(--dark-2)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="tag">Common Queries</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* ── B2B BANNER ── */}
      <section className="section tours__b2b">
        <div className="container tours__b2b-inner">
          <div>
            <span className="tag">Trade Enquiry</span>
            <h2 style={{marginTop:'1rem'}}>Looking for Group or<br />Wholesale Rates?</h2>
            <p style={{color:'var(--muted)', marginTop:'1rem', lineHeight:1.7}}>
              SRAC Holidays is open for sole representation and marketing rights
              in specified territories. Get in touch for B2B pricing.
            </p>
          </div>
          <div className="tours__b2b-actions">
            <a href="https://wa.me/917738676316" target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              WhatsApp for Group Rates
            </a>
            <a href="mailto:info@sracholidays.com" className="btn btn-outline">
              info@sracholidays.com
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}

