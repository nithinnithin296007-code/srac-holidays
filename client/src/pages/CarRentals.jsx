import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'

const WHATSAPP = '917738676316'

const FLEET = [
  // Sedans
  {
    id: 1, name: 'Swift Dzire', category: 'Sedan', seats: 4, luggage: 2, tag: null,
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80',
    services: ['Airport Transfer', 'Local', 'Outstation', 'Corporate']
  },
  {
    id: 2, name: 'Honda Amaze', category: 'Sedan', seats: 4, luggage: 2, tag: null,
    img: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80',
    services: ['Airport Transfer', 'Local', 'Outstation', 'Corporate']
  },
  {
    id: 3, name: 'Honda City', category: 'Sedan', seats: 4, luggage: 2, tag: null,
    img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80',
    services: ['Airport Transfer', 'Local', 'Outstation', 'Corporate']
  },
  {
    id: 4, name: 'Hyundai Verna', category: 'Sedan', seats: 4, luggage: 2, tag: null,
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80',
    services: ['Airport Transfer', 'Local', 'Outstation', 'Corporate']
  },
  {
    id: 5, name: 'Toyota Etios', category: 'Sedan', seats: 4, luggage: 2, tag: null,
    img: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&q=80',
    services: ['Airport Transfer', 'Local', 'Outstation']
  },
  // Luxury
  {
    id: 6, name: 'Mercedes E-Class', category: 'Luxury', seats: 4, luggage: 3, tag: 'Premium',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80',
    services: ['Airport Transfer', 'Corporate', 'Local']
  },
  {
    id: 7, name: 'BMW 5 Series', category: 'Luxury', seats: 4, luggage: 3, tag: 'Premium',
    img: 'https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?w=600&q=80',
    services: ['Airport Transfer', 'Corporate', 'Local']
  },
  {
    id: 8, name: 'Audi A6', category: 'Luxury', seats: 4, luggage: 3, tag: 'Premium',
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80',
    services: ['Airport Transfer', 'Corporate', 'Local']
  },
  {
    id: 9, name: 'Jaguar XF', category: 'Luxury', seats: 4, luggage: 2, tag: 'Elite',
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80',
    services: ['Airport Transfer', 'Corporate']
  },
  {
    id: 10, name: 'Toyota Camry', category: 'Luxury', seats: 4, luggage: 3, tag: null,
    img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80',
    services: ['Airport Transfer', 'Corporate', 'Local', 'Outstation']
  },
  // SUV
  {
    id: 11, name: 'Toyota Innova', category: 'SUV', seats: 7, luggage: 4, tag: 'Popular',
    img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80',
    services: ['Airport Transfer', 'Local', 'Outstation', 'Corporate']
  },
  {
    id: 12, name: 'Innova Crysta', category: 'SUV', seats: 7, luggage: 4, tag: 'Popular',
    img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80',
    services: ['Airport Transfer', 'Local', 'Outstation', 'Corporate']
  },
  {
    id: 13, name: 'Toyota Fortuner', category: 'SUV', seats: 7, luggage: 4, tag: null,
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
    services: ['Airport Transfer', 'Outstation', 'Corporate']
  },
  {
    id: 14, name: 'Mahindra Scorpio', category: 'SUV', seats: 7, luggage: 3, tag: null,
    img: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=600&q=80',
    services: ['Airport Transfer', 'Local', 'Outstation']
  },
  {
    id: 15, name: 'Hyundai Creta', category: 'SUV', seats: 5, luggage: 3, tag: null,
    img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80',
    services: ['Airport Transfer', 'Local', 'Outstation']
  },
  // MPV
  {
    id: 16, name: 'Maruti Ertiga', category: 'MPV', seats: 7, luggage: 3, tag: null,
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
    services: ['Airport Transfer', 'Local', 'Outstation']
  },
  {
    id: 17, name: 'Mahindra Marazzo', category: 'MPV', seats: 8, luggage: 3, tag: null,
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
    services: ['Airport Transfer', 'Local', 'Outstation']
  },
  {
    id: 18, name: 'Force Traveller 9', category: 'MPV', seats: 9, luggage: 5, tag: null,
    img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80',
    services: ['Airport Transfer', 'Outstation', 'Corporate']
  },
  {
    id: 19, name: 'Force Traveller 13', category: 'MPV', seats: 13, luggage: 6, tag: null,
    img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80',
    services: ['Airport Transfer', 'Outstation', 'Corporate']
  },
  // Group
  {
    id: 20, name: '18 Seater Coach', category: 'Group', seats: 18, luggage: 8, tag: null,
    img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80',
    services: ['Corporate', 'Outstation']
  },
  {
    id: 21, name: '24 Seater Coach', category: 'Group', seats: 24, luggage: 10, tag: null,
    img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80',
    services: ['Corporate', 'Outstation']
  },
  {
    id: 22, name: '32 Seater Coach', category: 'Group', seats: 32, luggage: 12, tag: null,
    img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80',
    services: ['Corporate', 'Outstation']
  },
]

const CATEGORIES = ['All', 'Sedan', 'Luxury', 'SUV', 'MPV', 'Group']

const SERVICE_META = {
  'Airport Transfer': { icon: '✈', desc: 'Terminal pickups & drops, flight tracking' },
  'Local': { icon: '🕐', desc: 'Hourly hire within city limits' },
  'Outstation': { icon: '🛣', desc: 'One-way or round trips outside Mumbai' },
  'Corporate': { icon: '💼', desc: 'Executive travel & bulk contracts' },
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
    const text = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, '_blank')
  }

  return (
    <main className="cr">
      <SEO
        title="Car Rentals Mumbai | SRAC Holidays"
        description="Chauffeur-driven sedans, SUVs, luxury cars and coaches for airport transfers, city tours and outstation trips across Mumbai and India."
      />

      {/* ── HERO ── */}
      <section className="cr__hero">
        <div className="cr__hero-bg" />
        <div className="container cr__hero-inner">
          <motion.div {...fade()}>
            <span className="tag">Smart Rent A Car · 20+ Years</span>
            <h1>Premium Car Rentals<br />Across India</h1>
            <p className="cr__hero-sub">
              Chauffeur-driven sedans, SUVs, luxury cars and coaches.
              Airport runs, city tours, outstation — we move you right.
            </p>
          </motion.div>

          <motion.div className="cr__stats" {...fade(0.15)}>
            {[
              { n: '20+', l: 'Vehicles' },
              { n: '24/7', l: 'Available' },
              { n: '20yr', l: 'Experience' },
              { n: '4.9★', l: 'Rated' },
            ].map(s => (
              <div className="cr__stat" key={s.l}>
                <span className="cr__stat-num">{s.n}</span>
                <span className="cr__stat-label">{s.l}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="cr__service-strip" {...fade(0.25)}>
            {Object.entries(SERVICE_META).map(([k, v]) => (
              <div className="cr__service-pill" key={k}>
                <span className="cr__service-pill-icon">{v.icon}</span>
                <div>
                  <strong>{k}</strong>
                  <span>{v.desc}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FLEET + ENQUIRY ── */}
      <section className="section cr__main">
        <div className="container">

          <motion.div className="cr__fleet-header" {...fade()}>
            <div>
              <span className="tag">Our Fleet</span>
              <h2>Choose Your Vehicle</h2>
            </div>
            <p className="cr__fleet-hint">Tap any vehicle to enquire instantly via WhatsApp</p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div className="cr__tabs" {...fade(0.1)}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cr__tab${activeCategory === cat ? ' cr__tab--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid + Sidebar */}
          <div className="cr__layout">

            {/* Car Grid */}
            <div className="cr__grid">
              <AnimatePresence mode="popLayout">
                {filtered.map((car, i) => (
                  <motion.div
                    key={car.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className={`cr__card${selected?.id === car.id ? ' cr__card--active' : ''}`}
                    onClick={() => pickCar(car)}
                  >
                    {car.tag && <span className="cr__card-tag">{car.tag}</span>}
                    <div className="cr__card-img-wrap">
                      <img src={car.img} alt={car.name} className="cr__card-img" loading="lazy" />
                    </div>
                    <div className="cr__card-body">
                      <div className="cr__card-top">
                        <h3 className="cr__card-name">{car.name}</h3>
                        <span className="cr__card-cat">{car.category}</span>
                      </div>
                      <div className="cr__card-meta">
                        <span>👤 {car.seats} seats</span>
                        <span>🧳 {car.luggage} bags</span>
                      </div>
                      <div className="cr__card-services">
                        {car.services.map(s => (
                          <span key={s} className="cr__card-stag">{s}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Enquiry Sidebar */}
            <AnimatePresence>
              {selected ? (
                <motion.div
                  className="cr__sidebar"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="cr__sb-header">
                    <span className="cr__sb-label">Quick Enquiry</span>
                    <button
                      className="cr__sb-close"
                      onClick={() => setSelected(null)}
                      aria-label="Close"
                    >✕</button>
                  </div>

                  <img src={selected.img} alt={selected.name} className="cr__sb-img" />

                  <h3 className="cr__sb-name">{selected.name}</h3>
                  <p className="cr__sb-meta">
                    {selected.seats} seats · {selected.luggage} bags · {selected.category}
                  </p>

                  {/* Name field */}
                  <div className="cr__sb-field">
                    <label className="cr__sb-flabel">Your Name <span style={{ fontWeight: 400, opacity: 0.5 }}>(optional)</span></label>
                    <input
                      className="cr__sb-input"
                      placeholder="So we can address you properly"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>

                  {/* Service Type */}
                  <div className="cr__sb-field">
                    <label className="cr__sb-flabel">Service Type</label>
                    <div className="cr__sb-services">
                      {selected.services.map(s => (
                        <button
                          key={s}
                          className={`cr__sb-sbtn${service === s ? ' cr__sb-sbtn--active' : ''}`}
                          onClick={() => setService(s)}
                        >
                          {SERVICE_META[s]?.icon} {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travel details */}
                  <div className="cr__sb-field">
                    <label className="cr__sb-flabel">
                      Travel Details <span style={{ fontWeight: 400, opacity: 0.5 }}>(optional)</span>
                    </label>
                    <textarea
                      className="cr__sb-textarea"
                      placeholder="Date, pickup location, destination, any requirements..."
                      value={details}
                      onChange={e => setDetails(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* WhatsApp CTA */}
                  <button className="cr__sb-wa" onClick={openWhatsApp}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.524 5.847L.054 23.5l5.819-1.527A11.956 11.956 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.886 9.886 0 01-5.044-1.378l-.361-.214-3.745.982.999-3.648-.235-.374A9.861 9.861 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106c5.421 0 9.894 4.474 9.894 9.894 0 5.421-4.473 9.894-9.894 9.894z" />
                    </svg>
                    Send Enquiry via WhatsApp
                  </button>

                  <div className="cr__sb-divider" />

                  <p className="cr__sb-alt">Or call us directly</p>
                  <div className="cr__sb-phones">
                    <a href="tel:+919920764381" className="cr__sb-phone">📞 +91 99207 64381</a>
                    <a href="tel:+919920796381" className="cr__sb-phone">📞 +91 99207 96381</a>
                    <a href="tel:+917738676316" className="cr__sb-phone">📞 +91 77386 76316</a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="cr__sidebar cr__sidebar--empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="cr__sidebar-empty-icon">🚗</span>
                  <p>Select a vehicle<br />to enquire via WhatsApp</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <style>{`
        .cr { background: var(--bg, #0d0d0d); color: var(--text, #f0ede8); }

        /* HERO */
        .cr__hero { position: relative; padding: 80px 0 60px; border-bottom: 1px solid #1e1e1e; overflow: hidden; }
        .cr__hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, #1f1000 0%, transparent 70%);
          pointer-events: none;
        }
        .cr__hero-inner { position: relative; z-index: 1; }
        .cr__hero-inner h1 {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          line-height: 1.1;
          margin: 12px 0 16px;
        }
        .cr__hero-sub { color: #888; font-size: 17px; max-width: 540px; line-height: 1.6; margin: 0 0 36px; }

        /* Stats */
        .cr__stats { display: flex; gap: 0; margin-bottom: 40px; border: 1px solid #222; border-radius: 10px; overflow: hidden; width: fit-content; }
        .cr__stat { padding: 16px 28px; border-right: 1px solid #222; text-align: center; }
        .cr__stat:last-child { border-right: none; }
        .cr__stat-num { display: block; font-size: 22px; font-weight: 700; color: #e07b2a; font-family: 'Playfair Display', serif; }
        .cr__stat-label { display: block; font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }

        /* Service strip */
        .cr__service-strip { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
        .cr__service-pill {
          display: flex; align-items: flex-start; gap: 12px;
          background: #111; border: 1px solid #222;
          border-radius: 10px; padding: 14px 16px;
        }
        .cr__service-pill-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
        .cr__service-pill strong { display: block; font-size: 13px; color: #f0ede8; margin-bottom: 3px; }
        .cr__service-pill span { font-size: 12px; color: #666; line-height: 1.4; }

        /* FLEET HEADER */
        .cr__fleet-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 8px; }
        .cr__fleet-header h2 { margin: 6px 0 0; font-size: 30px; }
        .cr__fleet-hint { font-size: 13px; color: #555; }

        /* TABS */
        .cr__tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
        .cr__tab {
          background: transparent; border: 1px solid #2a2a2a; color: #666;
          padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 0.18s; font-family: inherit;
        }
        .cr__tab:hover { border-color: #444; color: #aaa; }
        .cr__tab--active { background: #e07b2a; border-color: #e07b2a; color: #fff; }

        /* LAYOUT */
        .cr__layout { display: grid; grid-template-columns: 1fr 320px; gap: 28px; align-items: start; }
        @media (max-width: 900px) {
          .cr__layout { grid-template-columns: 1fr; }
          .cr__sidebar:not(.cr__sidebar--empty) {
            position: fixed; bottom: 0; left: 0; right: 0;
            z-index: 200; max-height: 82vh; overflow-y: auto;
            border-radius: 20px 20px 0 0;
            border-left: none; border-right: none; border-bottom: none;
          }
        }

        /* GRID */
        .cr__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }

        /* CARD */
        .cr__card {
          background: #141414; border: 1px solid #1e1e1e; border-radius: 12px;
          overflow: hidden; cursor: pointer;
          transition: border-color 0.2s, transform 0.2s;
          position: relative;
        }
        .cr__card:hover { border-color: #383838; transform: translateY(-2px); }
        .cr__card--active { border-color: #e07b2a; box-shadow: 0 0 0 1px #e07b2a; }
        .cr__card-tag {
          position: absolute; top: 10px; left: 10px; z-index: 1;
          background: #e07b2a; color: #fff;
          font-size: 10px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 3px 10px; border-radius: 4px;
        }
        .cr__card-img-wrap { height: 140px; overflow: hidden; background: #1a1a1a; }
        .cr__card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
        .cr__card:hover .cr__card-img { transform: scale(1.05); }
        .cr__card-body { padding: 12px; }
        .cr__card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; }
        .cr__card-name { font-size: 14px; font-weight: 600; color: #f0ede8; margin: 0; }
        .cr__card-cat { font-size: 10px; color: #555; text-transform: uppercase; letter-spacing: 1px; flex-shrink: 0; margin-left: 6px; }
        .cr__card-meta { display: flex; gap: 10px; font-size: 11px; color: #777; margin-bottom: 8px; }
        .cr__card-services { display: flex; flex-wrap: wrap; gap: 4px; }
        .cr__card-stag {
          font-size: 10px; background: #1e1e1e; border: 1px solid #2a2a2a;
          color: #666; padding: 2px 7px; border-radius: 3px;
        }

        /* SIDEBAR */
        .cr__sidebar {
          background: #141414; border: 1px solid #222; border-radius: 12px;
          padding: 22px; position: sticky; top: 80px;
        }
        .cr__sidebar--empty {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; min-height: 280px;
          color: #333; text-align: center; font-size: 14px; line-height: 1.6;
        }
        .cr__sidebar-empty-icon { font-size: 40px; margin-bottom: 12px; }
        .cr__sb-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
        .cr__sb-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #e07b2a; font-weight: 600; }
        .cr__sb-close { background: none; border: none; color: #555; cursor: pointer; font-size: 16px; padding: 0; font-family: inherit; }
        .cr__sb-close:hover { color: #aaa; }
        .cr__sb-img { width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 14px; }
        .cr__sb-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #f5f0e8; margin: 0 0 4px; }
        .cr__sb-meta { font-size: 12px; color: #666; margin: 0 0 18px; }
        .cr__sb-field { margin-bottom: 16px; }
        .cr__sb-flabel { display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #777; margin-bottom: 8px; }
        .cr__sb-input {
          width: 100%; background: #1a1a1a; border: 1px solid #2a2a2a;
          border-radius: 7px; color: #f0ede8; font-size: 13px;
          padding: 9px 12px; font-family: inherit; box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .cr__sb-input:focus { outline: none; border-color: #e07b2a; }
        .cr__sb-input::placeholder { color: #444; }
        .cr__sb-services { display: flex; flex-wrap: wrap; gap: 7px; }
        .cr__sb-sbtn {
          background: #1a1a1a; border: 1px solid #2a2a2a; color: #777;
          font-size: 12px; padding: 7px 11px; border-radius: 6px;
          cursor: pointer; transition: all 0.15s; font-family: inherit;
        }
        .cr__sb-sbtn:hover { border-color: #444; color: #ccc; }
        .cr__sb-sbtn--active { background: #1f1200; border-color: #e07b2a; color: #e07b2a; }
        .cr__sb-textarea {
          width: 100%; background: #1a1a1a; border: 1px solid #2a2a2a;
          border-radius: 7px; color: #f0ede8; font-size: 13px;
          padding: 9px 12px; font-family: inherit; resize: none;
          box-sizing: border-box; transition: border-color 0.2s;
        }
        .cr__sb-textarea:focus { outline: none; border-color: #e07b2a; }
        .cr__sb-textarea::placeholder { color: #444; }
        .cr__sb-wa {
          width: 100%; background: #25D366; color: #fff; border: none;
          border-radius: 8px; padding: 13px; font-size: 14px; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          gap: 9px; font-family: inherit; transition: background 0.2s, transform 0.15s;
        }
        .cr__sb-wa:hover { background: #1fb858; transform: translateY(-1px); }
        .cr__sb-wa:active { transform: scale(0.98); }
        .cr__sb-divider { border: none; border-top: 1px solid #1e1e1e; margin: 18px 0 14px; }
        .cr__sb-alt { font-size: 11px; color: #444; text-align: center; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 1px; }
        .cr__sb-phones { display: flex; flex-direction: column; gap: 7px; }
        .cr__sb-phone {
          display: block; text-align: center; color: #777; text-decoration: none;
          font-size: 13px; padding: 8px; border: 1px solid #222; border-radius: 6px;
          transition: all 0.15s;
        }
        .cr__sb-phone:hover { border-color: #444; color: #ccc; }
      `}</style>
    </main>
  )
}