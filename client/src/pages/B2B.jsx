import { useState } from 'react'
import { fade } from '../utils/animations'
import { validateName, validatePhone, validateCompany } from '../utils/validation'
import SEO from '../components/SEO'
import { motion } from 'framer-motion'

const perks = [
  { icon: '💰', title: 'Competitive Commission', desc: 'Attractive commission structure for travel agents and resellers on all tour bookings.' },
  { icon: '🎯', title: 'Dedicated Account Manager', desc: 'One point of contact for all your bookings, queries, and customisation requests.' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'Quotes within a few hours. Confirmations same day. We move at your pace.' },
  { icon: '🛡️', title: 'Reliable Operations', desc: 'Over two decades of running tours without fail. Your clients are in safe hands.' },
  { icon: '🗺️', title: 'Custom Itineraries', desc: 'We build tours around your clients — group size, budget, duration, language.' },
  { icon: '📞', title: '24 / 7 Support', desc: 'Round-the-clock availability for on-ground assistance and emergency support.' },
]

const tours = [
  'Bollywood Studio Tour',
  'Dharavi Slum Tour',
  'Heritage Walk',
  'Street Food Tour',
  'Film City Tour',
  'Dabbawala Tour',
  'Jewish Tour',
  'Parsi Food Tour',
  'Elephanta Island Tour',
  'Mahabaleshwar Tour',
  'Sula Vineyards Tour',
  'Matheran Tour',
  'Ajanta & Ellora Caves',
  'TV Show Tour',
  'Shopping Tour',
]



export default function B2B() {
  const [form, setForm] = useState({ company: '', name: '', mobile: '', email: '', type: '', tours: '', message: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    const c = validateCompany(form.company); if (c) e.company = c
    const n = validateName(form.name); if (n) e.name = n
    const p = validatePhone(form.mobile); if (p) e.mobile = p
    return e
  }
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = e => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setErrors({})
    const msg =
      `Hi SRAC Holidays! I am interested in a Trade / B2B partnership.%0A%0A` +
      `*Company:* ${form.company}%0A` +
      `*Contact Name:* ${form.name}%0A` +
      `*Mobile:* ${form.mobile}%0A` +
      `*Email:* ${form.email || 'Not provided'}%0A` +
      `*Business Type:* ${form.type || 'Not specified'}%0A` +
      `*Tours Interested In:* ${form.tours || 'Not specified'}%0A` +
      `*Message:* ${form.message || 'None'}`
    window.open(`https://wa.me/917738676316?text=${msg}`, '_blank')
  }

  return (
    <main>
      <SEO title="Trade Enquiry | SRAC Holidays" description="Partner with SRAC Holidays for bulk tour bookings, custom itineraries and trade rates. Travel agents, hotels and corporates welcome." />

      {/* HERO */}
      <section className="b2b__hero">
        <div className="b2b__hero-bg" />
        <div className="container b2b__hero-inner">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="tag">Trade Enquiry</span>
            <h1>Partner With<br />Mumbai's Best</h1>
            <p>Travel agents, hotels, DMCs, and corporates — work with SRAC Holidays to offer your clients authentic Mumbai experiences since 2003.</p>
            <div className="b2b__hero-stats">
              <div className="b2b__hero-stat"><strong>2003</strong><span>Est.</span></div>
              <div className="b2b__hero-stat"><strong>2000+</strong><span>Guests served</span></div>
              <div className="b2b__hero-stat"><strong>15+</strong><span>Tours available</span></div>
              <div className="b2b__hero-stat"><strong>7+</strong><span>TripAdvisor awards</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="section b2b__who">
        <div className="container">
          <motion.div style={{ textAlign: 'center', marginBottom: '3rem' }} {...fade()}>
            <span className="tag">Who We Work With</span>
            <h2 className="section-title">Our Trade Partners</h2>
          </motion.div>
          <div className="b2b__who-grid">
            {[
              { icon: '🏢', label: 'Travel Agencies', desc: 'Add our Mumbai tours to your portfolio with competitive trade rates.' },
              { icon: '🏨', label: 'Hotels & Resorts', desc: 'Offer curated day tours to your in-house guests through us.' },
              { icon: '🌍', label: 'DMCs & Operators', desc: 'Reliable ground operator for international inbound groups.' },
              { icon: '💼', label: 'Corporate Groups', desc: 'Team outings, offsite experiences, and MICE events across Mumbai.' },
            ].map((w, i) => (
              <motion.div key={i} className="b2b__who-card" {...fade(i * 0.08)}>
                <span className="b2b__who-icon">{w.icon}</span>
                <h3>{w.label}</h3>
                <p>{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="section b2b__perks" style={{ background: 'var(--dark-2)' }}>
        <div className="container">
          <motion.div style={{ textAlign: 'center', marginBottom: '3rem' }} {...fade()}>
            <span className="tag">Why Partner With Us</span>
            <h2 className="section-title">What You Get</h2>
          </motion.div>
          <div className="b2b__perks-grid">
            {perks.map((p, i) => (
              <motion.div key={i} className="b2b__perk-card" {...fade(i * 0.07)}>
                <span className="b2b__perk-icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TOURS + FORM */}
      <section className="section b2b__main">
        <div className="container b2b__main-grid">

          {/* TOURS LIST */}
          <div className="b2b__tours-col">
            <motion.div {...fade()}>
              <span className="tag">Available Tours</span>
              <h2>What We Offer</h2>
              <p className="b2b__tours-sub">All tours available for private group bookings. Custom itineraries on request.</p>
            </motion.div>
            <div className="b2b__tours-list">
              {tours.map((t, i) => (
                <motion.div key={i} className="b2b__tour-item" {...fade(i * 0.04)}>
                  <span className="b2b__tour-dot" />
                  <span>{t}</span>
                </motion.div>
              ))}
            </div>
            <motion.div className="b2b__direct" {...fade(0.3)}>
              <p>Prefer to talk directly?</p>
              <div className="b2b__direct-btns">
                <a href="tel:+917738676316" className="btn btn-outline">Call Us</a>
                <a href="mailto:info@sracholidays.com" className="btn btn-outline">Email Us</a>
              </div>
            </motion.div>
          </div>

          {/* FORM */}
          <motion.div className="b2b__form-col" {...fade(0.15)}>
            <div className="b2b__form-wrap">
              <div className="b2b__form-header">
                <span className="tag">Get in Touch</span>
                <h3>Trade Enquiry</h3>
                <p>Send us your details via WhatsApp and we will follow up with rates and partnership terms.</p>
              </div>
              <form className="b2b__form" onSubmit={submit}>
                <div className="b2b__field">
                  <label>Company / Agency Name <span>*</span></label>
                  <input name="company" value={form.company} onChange={handle} placeholder="Your company name" className={errors.company ? 'input-error' : ''} />
                  {errors.company && <span className="cr__error">{errors.company}</span>}
                </div>
                <div className="b2b__form-row">
                  <div className="b2b__field">
                    <label>Contact Name <span>*</span></label>
                    <input name="name" value={form.name} onChange={handle} placeholder="Your name" className={errors.name ? 'input-error' : ''} />
                  {errors.name && <span className="cr__error">{errors.name}</span>}
                  </div>
                  <div className="b2b__field">
                    <label>Mobile <span>*</span></label>
                    <input name="mobile" value={form.mobile} onChange={handle} placeholder="+91 98765 43210" className={errors.mobile ? 'input-error' : ''} />
                  {errors.mobile && <span className="cr__error">{errors.mobile}</span>}
                  </div>
                </div>
                <div className="b2b__field">
                  <label>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handle} placeholder="your@company.com" />
                </div>
                <div className="b2b__field">
                  <label>Business Type</label>
                  <select name="type" value={form.type} onChange={handle}>
                    <option value="">— Please Select —</option>
                    <option>Travel Agency</option>
                    <option>Hotel / Resort</option>
                    <option>DMC / Tour Operator</option>
                    <option>Corporate</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="b2b__field">
                  <label>Tours Interested In</label>
                  <input name="tours" value={form.tours} onChange={handle} placeholder="e.g. Bollywood Tour, Dharavi Tour..." />
                </div>
                <div className="b2b__field">
                  <label>Message</label>
                  <textarea name="message" value={form.message} onChange={handle} rows={3} placeholder="Group size, travel dates, any special requirements..." />
                </div>
                <button type="submit" className="btn btn-whatsapp" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                  Send via WhatsApp →
                </button>
                <p className="b2b__form-note">WhatsApp will open with your details pre-filled. We respond within hours.</p>
              </form>
            </div>
          </motion.div>

        </div>
      </section>

    </main>
  )
}
