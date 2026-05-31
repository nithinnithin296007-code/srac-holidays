import { useState } from 'react'
import { fade } from '../utils/animations'
import { validateName, validatePhone, validateEmail } from '../utils/validation'
import SEO from '../components/SEO'
import { motion } from 'framer-motion'

const fleet = [
  { name: 'Dzire', capacity: 4, type: 'Sedan', icon: '🚗' },
  { name: 'Etios', capacity: 4, type: 'Sedan', icon: '🚗' },
  { name: 'Altis', capacity: 4, type: 'Sedan', icon: '🚗' },
  { name: 'Xcent', capacity: 4, type: 'Hatchback', icon: '🚗' },
  { name: 'Innova', capacity: 6, type: 'MUV', icon: '🚙' },
  { name: 'Innova Crysta', capacity: 6, type: 'Premium MUV', icon: '🚙' },
  { name: 'Ertiga', capacity: 6, type: 'MPV', icon: '🚙' },
  { name: 'Marazzo', capacity: 6, type: 'MPV', icon: '🚙' },
  { name: 'Tempo Traveller', capacity: 15, type: 'Group Van', icon: '🚐' },
  { name: 'Bus', capacity: 18, type: 'Mini Bus', icon: '🚌' },
]

const cities = ['Mumbai', 'Navi Mumbai', 'Pune', 'Nashik', 'New Delhi', 'Kolkata', 'Bangalore', 'Hyderabad']
const dutyTypes = ['Local', 'Outstation', 'Transfer']
const carTypes = fleet.map(f => `${f.name} (${f.capacity} passenger capacity.)`)



export default function CarRentals() {
  const [form, setForm] = useState({ name: '', mobile: '', carType: '', email: '', city: '', dutyType: '', remarks: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    const n = validateName(form.name); if (n) e.name = n
    const p = validatePhone(form.mobile); if (p) e.mobile = p
    const em = validateEmail(form.email); if (em) e.email = em
    return e
  }

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = e => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setErrors({})
    const msg =
      `Hi SRAC Holidays! I'd like to enquire about a car rental.%0A%0A` +
      `*Name:* ${form.name}%0A` +
      `*Mobile:* ${form.mobile}%0A` +
      `*Email:* ${form.email || 'Not provided'}%0A` +
      `*Car Type:* ${form.carType || 'Not specified'}%0A` +
      `*City:* ${form.city || 'Not specified'}%0A` +
      `*Duty Type:* ${form.dutyType || 'Not specified'}%0A` +
      `*Remarks:* ${form.remarks || 'None'}`
    window.open(`https://wa.me/917738676316?text=${msg}`, '_blank')
  }

  return (
    <main>
      <SEO title="Car Rentals Mumbai | SRAC Holidays" description="Chauffeur-driven cars, SUVs and tempo travellers for airport transfers, city tours and outstation trips across Mumbai and India." />

      <section className="cr__hero">
        <div className="cr__hero-grid-bg" />
        <div className="container cr__hero-inner">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="tag">Car Rentals</span>
            <h1>Get Around India<br />in Comfort</h1>
            <p>Chauffeur-driven cars, SUVs, and group vehicles for local runs, outstation trips, and airport transfers — across Mumbai, Pune, Delhi, and more.</p>
            <div className="cr__hero-cities">
              {cities.map(c => <span key={c} className="cr__city-pill">{c}</span>)}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section cr__main">
        <div className="container cr__main-grid">

          <div className="cr__fleet-col">
            <motion.div {...fade()}>
              <span className="tag">Our Fleet</span>
              <h2>Choose Your Vehicle</h2>
              <p className="cr__fleet-sub">All vehicles are well-maintained, AC equipped, and come with experienced drivers.</p>
            </motion.div>
            <div className="cr__fleet-list">
              {fleet.map((car, i) => (
                <motion.div key={i} className="cr__fleet-card" {...fade(i * 0.05)}>
                  <span className="cr__fleet-icon">{car.icon}</span>
                  <div className="cr__fleet-info">
                    <strong>{car.name}</strong>
                    <span>{car.type}</span>
                  </div>
                  <div className="cr__fleet-pax">
                    <span>{car.capacity}</span>
                    <small>pax</small>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div className="cr__contact-strip" {...fade(0.2)}>
              <h4>Call Us Directly</h4>
              <div className="cr__phones">
                <a href="tel:+919920764381">+91 99207 64381</a>
                <a href="tel:+919920796381">+91 99207 96381</a>
                <a href="tel:+917738676316">+91 77386 76316</a>
              </div>
              <a href="https://wa.me/917738676316?text=Hi%2C%20I%20need%20a%20car%20rental%20quote" target="_blank" rel="noreferrer" className="btn btn-whatsapp" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                WhatsApp for Quick Quote
              </a>
            </motion.div>
          </div>

          <motion.div className="cr__form-col" {...fade(0.15)}>
            <div className="cr__form-wrap">
              <div className="cr__form-header">
                <span className="tag">Powered by</span>
                <h3>Smart Rent A Car</h3>
                <p>Fill in your details and hit Send — WhatsApp will open with everything pre-filled so we can respond instantly.</p>
              </div>

              <form className="cr__form" onSubmit={submit}>
                <div className="cr__field">
                  <label>Guest Name <span>*</span></label>
                  <input name="name" value={form.name} onChange={handle} placeholder="Your full name" className={errors.name ? 'input-error' : ''} />
                  {errors.name && <span className="cr__error">{errors.name}</span>}
                </div>
                <div className="cr__field">
                  <label>Mobile Number <span>*</span></label>
                  <input name="mobile" value={form.mobile} onChange={handle} placeholder="+91 98765 43210" className={errors.mobile ? 'input-error' : ''} />
                  {errors.mobile && <span className="cr__error">{errors.mobile}</span>}
                </div>
                <div className="cr__field">
                  <label>Car Type</label>
                  <select name="carType" value={form.carType} onChange={handle}>
                    <option value="">— Please Select —</option>
                    {carTypes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="cr__form-row">
                  <div className="cr__field">
                    <label>City</label>
                    <select name="city" value={form.city} onChange={handle}>
                      <option value="">— Select City —</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="cr__field">
                    <label>Duty Type</label>
                    <select name="dutyType" value={form.dutyType} onChange={handle}>
                      <option value="">— Select —</option>
                      {dutyTypes.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <div className="cr__field">
                  <label>Remarks</label>
                  <textarea name="remarks" value={form.remarks} onChange={handle} rows={3} placeholder="Travel dates, pickup location, any special requirements..." />
                </div>
                <button type="submit" className="btn btn-whatsapp" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                  Send via WhatsApp →
                </button>
                <p className="cr__form-note">
                  Tapping Send will open WhatsApp with your details pre-filled. We respond within minutes.
                </p>
              </form>

              <p className="cr__form-note" style={{ marginTop: '0.5rem' }}>
                Service available in Mumbai, Navi Mumbai, Pune, Nashik, New Delhi, Kolkata, Bangalore, Hyderabad & more.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

    </main>
  )
}
