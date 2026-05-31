import { useState } from 'react'
import { fade } from '../utils/animations'
import { validateName, validatePhone, validateEmail, validateMessage } from '../utils/validation'
import SEO from '../components/SEO'
import { motion } from 'framer-motion'



export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const errs = {}
    const n = validateName(form.name); if (n) errs.name = n
    const p = validatePhone(form.phone); if (p) errs.phone = p
    const e = validateEmail(form.email); if (e) errs.email = e
    const m = validateMessage(form.message); if (m) errs.message = m
    return errs
  }

  const submit = e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    const msg =
      'Hi SRAC Holidays!%0A%0A' +
      '*Name:* ' + encodeURIComponent(form.name) + '%0A' +
      (form.email ? '*Email:* ' + encodeURIComponent(form.email) + '%0A' : '') +
      '*Phone:* ' + encodeURIComponent(form.phone) + '%0A' +
      '%0A*Message:* ' + encodeURIComponent(form.message)
    window.open('https://wa.me/917738676316?text=' + msg, '_blank')
    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <main>
      <SEO title="Contact Us" description="Get in touch with SRAC Holidays. WhatsApp, email or visit our office in Andheri East, Mumbai." />

      <section className="contact__hero">
        <div className="container contact__hero-content">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="tag">Get In Touch</span>
            <h1>Let's Plan Your<br />Mumbai Experience</h1>
            <p>We respond fast. Usually within a few hours.</p>
          </motion.div>
        </div>
      </section>

      <section className="section contact__body">
        <div className="container contact__grid">

          <motion.div className="contact__info" {...fade(0)}>
            <h2>How to Reach Us</h2>
            <p className="contact__intro">Whether you want to book a tour, ask a question, or just say hello — we are available every day.</p>
            <div className="contact__details">
              <div className="contact__detail-item">
                <div className="contact__detail-icon">📞</div>
                <div>
                  <span className="contact__detail-label">Phone / WhatsApp</span>
                  <a href="https://wa.me/917738676316" target="_blank" rel="noreferrer" className="contact__detail-value">+91 77386 76316</a>
                </div>
              </div>
              <div className="contact__detail-item">
                <div className="contact__detail-icon">✉️</div>
                <div>
                  <span className="contact__detail-label">Email</span>
                  <a href="mailto:info@sracholidays.com" className="contact__detail-value">info@sracholidays.com</a>
                </div>
              </div>
              <div className="contact__detail-item">
                <div className="contact__detail-icon">📍</div>
                <div>
                  <span className="contact__detail-label">Address</span>
                  <span className="contact__detail-value">Flat No. 6, Ground Floor, Varadh Vinayak Co-Op HSC Ltd, Opp. D Mart, Sambhaji Nagar, Andheri East, Mumbai, Maharashtra</span>
                </div>
              </div>
              <div className="contact__detail-item">
                <div className="contact__detail-icon">🕐</div>
                <div>
                  <span className="contact__detail-label">Hours</span>
                  <span className="contact__detail-value">Available 24 / 7 for enquiries and bookings</span>
                </div>
              </div>
            </div>
            <div className="contact__social">
              <a href="https://www.instagram.com/sracholidays" target="_blank" rel="noreferrer" className="contact__social-btn">Instagram</a>
              <a href="https://www.facebook.com/sracholidays" target="_blank" rel="noreferrer" className="contact__social-btn">Facebook</a>
              <a href="https://wa.me/917738676316" target="_blank" rel="noreferrer" className="contact__social-btn contact__social-btn--wa">💬 WhatsApp</a>
            </div>
          </motion.div>

          <motion.div className="contact__form-wrap" {...fade(0.15)}>
            {submitted ? (
              <motion.div
                className="contact__success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="contact__success-icon">✅</div>
                <h2>Message Sent!</h2>
                <p>WhatsApp has opened with your message pre-filled. We will respond within a few hours.</p>
                <button className="btn btn-outline" onClick={() => setSubmitted(false)}>Send Another Message</button>
              </motion.div>
            ) : (
              <form className="contact__form" onSubmit={submit}>
                <h2>Send a Message</h2>
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label>Your Name *</label>
                    <input name="name" value={form.name} onChange={handle} placeholder="John Smith" className={errors.name ? "input-error" : ""} />
                    {errors.name && <span className="cr__error">{errors.name}</span>}
                  </div>
                  <div className="contact__field">
                    <label>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handle} placeholder="john@example.com" className={errors.email ? "input-error" : ""} />
                    {errors.email && <span className="cr__error">{errors.email}</span>}
                  </div>
                </div>
                <div className="contact__field">
                  <label>Phone *</label>
                  <input name="phone" value={form.phone} onChange={handle} placeholder="+91 98765 43210" className={errors.phone ? "input-error" : ""} />
                  {errors.phone && <span className="cr__error">{errors.phone}</span>}
                </div>
                <div className="contact__field">
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us which tour you are interested in, your dates, and group size..." rows={5} className={errors.message ? "input-error" : ""} />
                  {errors.message && <span className="cr__error">{errors.message}</span>}
                </div>
                <div className="contact__form-actions">
                  <button type="submit" className="btn btn-whatsapp">Send via WhatsApp</button>
                  <a href="mailto:info@sracholidays.com" className="btn btn-outline">Email Instead</a>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.8rem" }}>WhatsApp will open with your message pre-filled. We respond within hours.</p>
              </form>
            )}
          </motion.div>

        </div>
      </section>

      <section className="contact__map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7540.091884967185!2d72.85556380917203!3d19.105640346115013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sShop%20No.08%2C%20Vardh%20Vinayak%20Co.%20Hsg.%20SoC%20Ltd%2C%20Smabhaji%20Nagar%20Sahar%20Road%2C%20Andheri%20East%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1619604990507!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0, display: "block" }}
          allowFullScreen=""
          loading="lazy"
          title="SRAC Holidays Location"
        />
      </section>

    </main>
  )
}
