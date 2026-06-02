import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'

const WHATSAPP = '917738676316'

const FLEET = [
  { id: 1, name: 'Swift Dzire', category: 'Sedan', seats: 4, luggage: 2, tag: null, img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80', services: ['Airport Transfer', 'Local', 'Outstation', 'Corporate'] },
  { id: 2, name: 'Honda Amaze', category: 'Sedan', seats: 4, luggage: 2, tag: null, img: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80', services: ['Airport Transfer', 'Local', 'Outstation', 'Corporate'] },
  { id: 3, name: 'Honda City', category: 'Sedan', seats: 4, luggage: 2, tag: null, img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80', services: ['Airport Transfer', 'Local', 'Outstation', 'Corporate'] },
  { id: 4, name: 'Hyundai Verna', category: 'Sedan', seats: 4, luggage: 2, tag: null, img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80', services: ['Airport Transfer', 'Local', 'Outstation', 'Corporate'] },
  { id: 5, name: 'Toyota Etios', category: 'Sedan', seats: 4, luggage: 2, tag: null, img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&q=80', services: ['Airport Transfer', 'Local', 'Outstation'] },
  { id: 6, name: 'Mercedes E-Class', category: 'Luxury', seats: 4, luggage: 3, tag: 'Premium', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80', services: ['Airport Transfer', 'Corporate', 'Local'] },
  { id: 7, name: 'BMW 5 Series', category: 'Luxury', seats: 4, luggage: 3, tag: 'Premium', img: 'https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?w=600&q=80', services: ['Airport Transfer', 'Corporate', 'Local'] },
  { id: 8, name: 'Audi A6', category: 'Luxury', seats: 4, luggage: 3, tag: 'Premium', img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80', services: ['Airport Transfer', 'Corporate', 'Local'] },
  { id: 9, name: 'Jaguar XF', category: 'Luxury', seats: 4, luggage: 2, tag: 'Elite', img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80', services: ['Airport Transfer', 'Corporate'] },
  { id: 10, name: 'Toyota Camry', category: 'Luxury', seats: 4, luggage: 3, tag: null, img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80', services: ['Airport Transfer', 'Corporate', 'Local', 'Outstation'] },
  { id: 11, name: 'Toyota Innova', category: 'SUV', seats: 7, luggage: 4, tag: 'Popular', img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80', services: ['Airport Transfer', 'Local', 'Outstation', 'Corporate'] },
  { id: 12, name: 'Innova Crysta', category: 'SUV', seats: 7, luggage: 4, tag: 'Popular', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80', services: ['Airport Transfer', 'Local', 'Outstation', 'Corporate'] },
  { id: 13, name: 'Toyota Fortuner', category: 'SUV', seats: 7, luggage: 4, tag: null, img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80', services: ['Airport Transfer', 'Outstation', 'Corporate'] },
  { id: 14, name: 'Mahindra Scorpio', category: 'SUV', seats: 7, luggage: 3, tag: null, img: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=600&q=80', services: ['Airport Transfer', 'Local', 'Outstation'] },
  { id: 15, name: 'Hyundai Creta', category: 'SUV', seats: 5, luggage: 3, tag: null, img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80', services: ['Airport Transfer', 'Local', 'Outstation'] },
  { id: 16, name: 'Maruti Ertiga', category: 'MPV', seats: 7, luggage: 3, tag: null, img: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/115777/ertiga-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80', services: ['Airport Transfer', 'Local', 'Outstation'] },
  { id: 17, name: 'Mahindra Marazzo', category: 'MPV', seats: 8, luggage: 3, tag: null, img: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/32597/marazzo-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80', services: ['Airport Transfer', 'Local', 'Outstation'] },
  { id: 18, name: 'Tempo Traveller 9', category: 'MPV', seats: 9, luggage: 5, tag: null, img: 'https://www.tempotravellers.com/images/9-seater-tempo-traveller.jpg', services: ['Airport Transfer', 'Outstation', 'Corporate'] },
  { id: 19, name: 'Tempo Traveller 13', category: 'MPV', seats: 13, luggage: 6, tag: null, img: 'https://www.tempotravellers.com/images/13-seater-tempo-traveller.jpg', services: ['Airport Transfer', 'Outstation', 'Corporate'] },
  { id: 20, name: '18 Seater Coach', category: 'Group', seats: 18, luggage: 8, tag: null, img: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/45105/urbania-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80', services: ['Corporate', 'Outstation'] },
  { id: 21, name: '24 Seater Coach', category: 'Group', seats: 24, luggage: 10, tag: null, img: 'https://5.imimg.com/data5/SELLER/Default/2021/6/PY/RW/HK/6aborJunction/27-seater-bus-500x500.jpg', services: ['Corporate', 'Outstation'] },
  { id: 22, name: '32 Seater Coach', category: 'Group', seats: 32, luggage: 12, tag: null, img: 'https://5.imimg.com/data5/SELLER/Default/2022/9/NU/EE/FZ/2aborJunction/35-seater-tourist-bus.jpg', services: ['Corporate', 'Outstation'] },
]

const CATEGORIES = ['All', 'Sedan', 'Luxury', 'SUV', 'MPV', 'Group']

const SERVICE_ICONS = {
  'Airport Transfer': '✈',
  'Local': '🕐',
  'Outstation': '🛣',
  'Corporate': '💼',
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

export default function CarRentals() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState(null)
  const [service, setService] = useState('')
  const [details, setDetails] = useState('')
  const [name, setName] = useState('')

  const filtered = activeCategory === 'All'
    ? FLEET
    : FLEET.filter(c => c.category === activeCategory)

  const pickCar = (car) => {
    setSelected(car)
    setService(car.services[0])
    setDetails('')
  }

  const openWhatsApp = () => {
    if (!selected) return
    const lines = [
      `Hello SRAC Holidays 👋`,
      name ? `My name is *${name}*.` : '',
      ``,
      `I'd like to enquire about the *${selected.name}* for *${service}*.`,
      details ? `Travel details: ${details}` : '',
      ``,
      `Please share availability and pricing. Thank you!`,
    ].filter(Boolean)
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
  }

  return (
    <main className="cr-page">
      <SEO
        title="Car Rentals Mumbai | SRAC Holidays"
        description="Chauffeur-driven sedans, SUVs, luxury cars and coaches for airport transfers, city tours and outstation trips across Mumbai and India."
      />

      {/* ── HERO ── */}
      <section className="cr-hero">
        <div className="cr-hero__overlay" />
        <div className="container cr-hero__inner">
          <motion.div {...fade()}>
            <span className="tag">Smart Rent A Car · 20+ Years</span>
            <h1 className="cr-hero__title">
              Premium Car Rentals<br />
              <span style={{ color: 'var(--primary)' }}>Across India</span>
            </h1>
            <p className="cr-hero__sub">
              Chauffeur-driven sedans, SUVs, luxury cars and coaches.
              Airport runs, city tours, outstation — we move you right.
            </p>
          </motion.div>

          <motion.div className="cr-stats" {...fade(0.15)}>
            {[
              { n: '20+', l: 'Vehicles' },
              { n: '24/7', l: 'Available' },
              { n: '20yr', l: 'Experience' },
              { n: '4.9★', l: 'Rated' },
            ].map(s => (
              <div className="cr-stat" key={s.l}>
                <span className="cr-stat__num">{s.n}</span>
                <span className="cr-stat__label">{s.l}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="cr-services-strip" {...fade(0.25)}>
            {Object.entries(SERVICE_ICONS).map(([k, icon]) => (
              <div className="cr-service-pill" key={k}>
                <span>{icon}</span>
                <span>{k}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FLEET ── */}
      <section className="section">
        <div className="container">
          <motion.div className="cr-fleet-header" {...fade()}>
            <div>
              <span className="tag">Our Fleet</span>
              <h2 className="cr-fleet-title">Choose Your Vehicle</h2>
            </div>
            <p className="cr-fleet-hint">Tap a vehicle to enquire via WhatsApp</p>
          </motion.div>

          {/* Tabs */}
          <motion.div className="cr-tabs" {...fade(0.1)}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cr-tab${activeCategory === cat ? ' cr-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid + Sidebar */}
          <div className="cr-layout">

            {/* Grid */}
            <div className="cr-grid">
              <AnimatePresence mode="popLayout">
                {filtered.map((car, i) => (
                  <motion.div
                    key={car.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.22, delay: i * 0.025 }}
                    className={`cr-card${selected?.id === car.id ? ' cr-card--active' : ''}`}
                    onClick={() => pickCar(car)}
                  >
                    {car.tag && <span className="cr-card__tag">{car.tag}</span>}
                    <div className="cr-card__img-wrap">
                      <img src={car.img} alt={car.name} className="cr-card__img" loading="lazy" />
                    </div>
                    <div className="cr-card__body">
                      <div className="cr-card__top">
                        <h3 className="cr-card__name">{car.name}</h3>
                        <span className="cr-card__cat">{car.category}</span>
                      </div>
                      <div className="cr-card__meta">
                        <span>👤 {car.seats} seats</span>
                        <span>🧳 {car.luggage} bags</span>
                      </div>
                      <div className="cr-card__stags">
                        {car.services.map(s => (
                          <span key={s} className="cr-card__stag">{s}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <AnimatePresence>
              {selected ? (
                <motion.div
                  className="cr-sidebar"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="cr-sb__header">
                    <span className="tag">Quick Enquiry</span>
                    <button className="cr-sb__close" onClick={() => setSelected(null)}>✕</button>
                  </div>

                  <img src={selected.img} alt={selected.name} className="cr-sb__img" />
                  <h3 className="cr-sb__name">{selected.name}</h3>
                  <p className="cr-sb__meta">{selected.seats} seats · {selected.luggage} bags · {selected.category}</p>

                  <div className="cr-sb__field">
                    <label className="cr-sb__label">Your Name <span className="cr-sb__opt">(optional)</span></label>
                    <input
                      className="cr-sb__input"
                      placeholder="So we can address you properly"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>

                  <div className="cr-sb__field">
                    <label className="cr-sb__label">Service Type</label>
                    <div className="cr-sb__services">
                      {selected.services.map(s => (
                        <button
                          key={s}
                          className={`cr-sb__svc${service === s ? ' cr-sb__svc--active' : ''}`}
                          onClick={() => setService(s)}
                        >
                          {SERVICE_ICONS[s]} {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="cr-sb__field">
                    <label className="cr-sb__label">Travel Details <span className="cr-sb__opt">(optional)</span></label>
                    <textarea
                      className="cr-sb__textarea"
                      placeholder="Date, pickup location, destination..."
                      value={details}
                      onChange={e => setDetails(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <button className="btn btn-whatsapp cr-sb__wa" onClick={openWhatsApp}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.524 5.847L.054 23.5l5.819-1.527A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.886 9.886 0 01-5.044-1.378l-.361-.214-3.745.982.999-3.648-.235-.374A9.861 9.861 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106c5.421 0 9.894 4.474 9.894 9.894 0 5.421-4.473 9.894-9.894 9.894z" />
                    </svg>
                    Send Enquiry via WhatsApp
                  </button>

                  <div className="cr-sb__divider" />
                  <p className="cr-sb__alt">Or call directly</p>
                  <div className="cr-sb__phones">
                    <a href="tel:+919920764381" className="cr-sb__phone">📞 +91 99207 64381</a>
                    <a href="tel:+919920796381" className="cr-sb__phone">📞 +91 99207 96381</a>
                    <a href="tel:+917738676316" className="cr-sb__phone">📞 +91 77386 76316</a>
                  </div>
                </motion.div>
              ) : (
                <motion.div className="cr-sidebar cr-sidebar--empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <span style={{ fontSize: '2.5rem' }}>🚗</span>
                  <p style={{ color: 'var(--muted)', marginTop: '1rem', fontSize: '0.9rem', textAlign: 'center', lineHeight: 1.6 }}>
                    Select a vehicle<br />to enquire via WhatsApp
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <style>{`
        /* HERO */
        .cr-hero {
          position: relative;
          padding: 8rem 0 5rem;
          border-bottom: 1px solid var(--dark-3);
          overflow: hidden;
        }
        .cr-hero__overlay {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,65,11,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .cr-hero__inner { position: relative; z-index: 1; }
        .cr-hero__title {
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          margin: 1rem 0;
          line-height: 1.1;
        }
        .cr-hero__sub {
          color: var(--muted);
          font-size: 1.05rem;
          max-width: 520px;
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }

        /* Stats */
        .cr-stats {
          display: flex;
          gap: 0;
          margin-bottom: 2.5rem;
          border: 1px solid var(--dark-3);
          border-radius: var(--radius-sm);
          overflow: hidden;
          width: fit-content;
        }
        .cr-stat {
          padding: 1rem 1.8rem;
          border-right: 1px solid var(--dark-3);
          text-align: center;
        }
        .cr-stat:last-child { border-right: none; }
        .cr-stat__num {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--primary);
        }
        .cr-stat__label {
          display: block;
          font-size: 0.65rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-top: 2px;
        }

        /* Services strip */
        .cr-services-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .cr-service-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--dark-2);
          border: 1px solid var(--dark-3);
          border-radius: 100px;
          padding: 0.45rem 1rem;
          font-size: 0.8rem;
          color: var(--muted);
        }

        /* Fleet header */
        .cr-fleet-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .cr-fleet-title {
          font-size: 2rem;
          margin-top: 0.5rem;
        }
        .cr-fleet-hint { color: var(--muted); font-size: 0.85rem; }

        /* Tabs — match .tours__filter-btn pattern */
        .cr-tabs {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .cr-tab {
          background: transparent;
          border: 1px solid var(--dark-3);
          color: var(--muted);
          padding: 0.5rem 1.2rem;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
          font-family: var(--font-body);
          letter-spacing: 0.5px;
        }
        .cr-tab:hover { border-color: var(--primary); color: var(--primary); }
        .cr-tab--active { background: var(--primary); border-color: var(--primary); color: var(--white); }

        /* Layout */
        .cr-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .cr-layout { grid-template-columns: 1fr; }
          .cr-sidebar:not(.cr-sidebar--empty) {
            position: fixed; bottom: 0; left: 0; right: 0;
            z-index: 200;
            max-height: 80vh;
            overflow-y: auto;
            border-radius: var(--radius) var(--radius) 0 0;
            border-left: none; border-right: none; border-bottom: none;
          }
        }

        /* Grid */
        .cr-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
          gap: 1rem;
        }

        /* Card */
        .cr-card {
          background: var(--dark-2);
          border: 1px solid var(--dark-3);
          border-radius: var(--radius);
          overflow: hidden;
          cursor: pointer;
          transition: var(--transition);
          position: relative;
        }
        .cr-card:hover { border-color: rgba(200,65,11,0.4); transform: translateY(-3px); }
        .cr-card--active { border-color: var(--primary); box-shadow: 0 0 0 1px var(--primary); }
        .cr-card__tag {
          position: absolute; top: 10px; left: 10px; z-index: 1;
          background: var(--primary);
          color: var(--white);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 100px;
        }
        .cr-card__img-wrap { height: 140px; overflow: hidden; background: var(--dark-3); }
        .cr-card__img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .cr-card:hover .cr-card__img { transform: scale(1.06); }
        .cr-card__body { padding: 0.9rem; }
        .cr-card__top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem; }
        .cr-card__name { font-size: 0.9rem; font-weight: 600; color: var(--light); margin: 0; font-family: var(--font-body); }
        .cr-card__cat { font-size: 0.6rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; flex-shrink: 0; margin-left: 4px; }
        .cr-card__meta { display: flex; gap: 0.75rem; font-size: 0.7rem; color: var(--muted); margin-bottom: 0.6rem; }
        .cr-card__stags { display: flex; flex-wrap: wrap; gap: 3px; }
        .cr-card__stag {
          font-size: 0.6rem;
          background: var(--dark-3);
          border: 1px solid rgba(255,255,255,0.06);
          color: var(--muted);
          padding: 2px 7px;
          border-radius: 3px;
        }

        /* Sidebar */
        .cr-sidebar {
          background: var(--dark-2);
          border: 1px solid var(--dark-3);
          border-radius: var(--radius);
          padding: 1.5rem;
          position: sticky;
          top: 90px;
        }
        .cr-sidebar--empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 260px;
        }
        .cr-sb__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .cr-sb__close {
          background: none; border: none; color: var(--muted);
          cursor: pointer; font-size: 1rem; font-family: var(--font-body);
          transition: color 0.2s;
        }
        .cr-sb__close:hover { color: var(--light); }
        .cr-sb__img { width: 100%; height: 150px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 1rem; }
        .cr-sb__name { font-size: 1.3rem; color: var(--light); margin: 0 0 0.25rem; }
        .cr-sb__meta { font-size: 0.78rem; color: var(--muted); margin: 0 0 1.25rem; }
        .cr-sb__field { margin-bottom: 1rem; }
        .cr-sb__label { display: block; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-bottom: 0.5rem; }
        .cr-sb__opt { font-weight: 400; opacity: 0.5; text-transform: none; letter-spacing: 0; }
        .cr-sb__input {
          width: 100%;
          background: var(--dark-3);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-sm);
          color: var(--light);
          font-size: 0.82rem;
          padding: 0.6rem 0.8rem;
          font-family: var(--font-body);
          box-sizing: border-box;
          transition: border-color 0.2s;
          outline: none;
        }
        .cr-sb__input:focus { border-color: var(--primary); }
        .cr-sb__input::placeholder { color: var(--muted); opacity: 0.6; }
        .cr-sb__services { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .cr-sb__svc {
          background: var(--dark-3);
          border: 1px solid rgba(255,255,255,0.08);
          color: var(--muted);
          font-size: 0.75rem;
          padding: 0.4rem 0.7rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition);
          font-family: var(--font-body);
        }
        .cr-sb__svc:hover { border-color: var(--primary); color: var(--primary); }
        .cr-sb__svc--active { background: rgba(200,65,11,0.15); border-color: var(--primary); color: var(--primary); }
        .cr-sb__textarea {
          width: 100%;
          background: var(--dark-3);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-sm);
          color: var(--light);
          font-size: 0.82rem;
          padding: 0.6rem 0.8rem;
          font-family: var(--font-body);
          resize: none;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.2s;
        }
        .cr-sb__textarea:focus { border-color: var(--primary); }
        .cr-sb__textarea::placeholder { color: var(--muted); opacity: 0.6; }
        .cr-sb__wa { width: 100%; justify-content: center; margin-top: 0.25rem; border-radius: var(--radius-sm); }
        .cr-sb__divider { border: none; border-top: 1px solid var(--dark-3); margin: 1.25rem 0 1rem; }
        .cr-sb__alt { font-size: 0.65rem; color: var(--muted); text-align: center; margin: 0 0 0.75rem; text-transform: uppercase; letter-spacing: 1px; }
        .cr-sb__phones { display: flex; flex-direction: column; gap: 0.5rem; }
        .cr-sb__phone {
          display: block;
          text-align: center;
          color: var(--muted);
          font-size: 0.8rem;
          padding: 0.55rem;
          border: 1px solid var(--dark-3);
          border-radius: var(--radius-sm);
          transition: var(--transition);
        }
        .cr-sb__phone:hover { border-color: var(--primary); color: var(--primary); }
      `}</style>
    </main>
  )
}