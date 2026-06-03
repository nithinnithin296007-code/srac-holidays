import { motion } from 'framer-motion'
import { fade } from '../utils/animations'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'



const awards = [
  { year: '2017', title: 'Certificate of Excellence', body: 'TripAdvisor' },
  { year: '2018', title: 'Certificate of Excellence', body: 'TripAdvisor' },
  { year: '2019', title: 'Certificate of Excellence', body: 'TripAdvisor' },
  { year: '2020', title: "Travellers\' Choice", body: 'TripAdvisor' },
  { year: '2022', title: "Travellers\' Choice", body: 'TripAdvisor' },
  { year: '2023', title: "Travellers\' Choice", body: 'TripAdvisor' },
  { year: '2024', title: "Travellers\' Choice", body: 'TripAdvisor' },
]

const values = [
  { icon: "\u{1F6B6}", title: 'Local First', desc: 'Every guide lives in the neighbourhood they show you. No outsiders, no scripts.' },
  { icon: "\u{1F91D}", title: 'Honest Tourism', desc: 'No staged experiences. No tourist traps. What you see is what Mumbai actually is.' },
  { icon: "\u{1F331}", title: 'Sustainable Travel', desc: 'Small groups, community-led tours, and a commitment to giving back to the places we visit.' },
  { icon: "\u2764\uFE0F", title: 'Personal Service', desc: 'Every booking is handled personally. You talk to a human, not a booking engine.' },
]

export default function About() {
  return (
    <main>
      <SEO title="About Us" description="SRAC Holidays has been running authentic Mumbai tours since 2003. Meet the team behind Mumbai\'s most trusted local tour operator." />

      {/* HERO */}
      <section className="ab__hero">
        <div className="ab__hero-bg" />
        <div className="container ab__hero-inner">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="tag">Est. 2003 · Mumbai</span>
            <h1>We Have Been Showing<br />Mumbai Since Before<br />It Was Cool</h1>
            <p>Two decades of authentic tours. Seven TripAdvisor awards. Zero tourist traps.</p>
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section className="section ab__story">
        <div className="container ab__story-grid">
          <motion.div className="ab__story-left" {...fade(0)}>
            <span className="tag">Our Story</span>
            <h2>Mumbai, 2003</h2>
            <p>SRAC Holidays was founded in Mumbai in 2003 with one simple idea: show visitors the city that locals actually live in, not the sanitised version in the guidebooks.</p>
            <p>The first tour was Bollywood — getting visitors inside Film City at a time when nobody else was doing it. Word spread. More tours followed. Dharavi. The heritage walks. The dabbawala routes. The food trails. Each one built around access, honesty, and a guide who actually knew the place.</p>
            <p>Twenty years later, the philosophy has not changed. Small groups. Local guides. Real Mumbai. No tourist traps.</p>
            <div className="ab__story-stats">
              <div><strong>2003</strong><span>Founded</span></div>
              <div><strong>20+</strong><span>Years running</span></div>
              <div><strong>15</strong><span>Unique tours</span></div>
              <div><strong>7+</strong><span>TripAdvisor awards</span></div>
            </div>
          </motion.div>
          <motion.div className="ab__story-right" {...fade(0.15)}>
            <div className="ab__quote-card">
              <p className="ab__quote">"We started when Bollywood tourism meant standing outside Film City gate. We got inside. We have been inside ever since."</p>
              <span className="ab__quote-author">— SRAC Holidays, est. 2003</span>
            </div>
            <div className="ab__address-card">
              <h4>Our Office</h4>
              <p>Flat No. 6, Ground Floor<br />Varadh Vinayak Co-Op HSC Ltd<br />Sambhaji Nagar, Andheri East<br />Mumbai, Maharashtra</p>
              <div className="ab__contact-links">
                <a href="tel:+917738676316">+91 77386 76316</a>
                <a href="mailto:info@sracholidays.com">info@sracholidays.com</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="section ab__team">
        <div className="container">
          <motion.div style={{ textAlign: 'center', marginBottom: '4rem' }} {...fade()}>
            <span className="tag">Leadership</span>
            <h2 className="section-title">Meet Our Leadership</h2>
            <p className="ab__team-sub">The visionaries steering SRAC Holidays toward delivering authentic travel experiences.</p>
          </motion.div>

          <div className="ab__team-grid">
            <motion.div className="ab__team-card" {...fade(0.1)}>
              <div className="ab__team-info">
                <h3 className="ab__team-name">Shreekant Mandal</h3>
                <span className="ab__team-role">Founder</span>
                <p className="ab__team-bio">
                  Shreekant founded SRAC Holidays in 2003 with a vision to offer genuine, local-led travel experiences. Over the past two decades, his passion for hospitality and local insights has grown the company from a single unique tour into an award-winning agency trusted by thousands of global travelers.
                </p>
              </div>
            </motion.div>

            <motion.div className="ab__team-card" {...fade(0.2)}>
              <div className="ab__team-info">
                <h3 className="ab__team-name">Abhishek Mandal</h3>
                <span className="ab__team-role">Chief Executive Officer</span>
                <p className="ab__team-bio">
                  Abhishek leads the strategic growth, operational excellence, and digital scaling of SRAC Holidays. He ensures that while the company embraces modern platforms and custom luxury experiences, it preserves its foundational promise of transparent, community-centric tourism.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GUIDES SPOTLIGHT */}
      <section className="section ab__guides" style={{ paddingTop: 0 }}>
        <div className="container">
          <motion.div style={{ textAlign: 'center', marginBottom: '4rem' }} {...fade()}>
            <span className="tag">Local Experts</span>
            <h2 className="section-title">Meet Our Local Guides</h2>
            <p className="ab__team-sub">Real Mumbai locals who live in the neighborhoods they show you.</p>
          </motion.div>

          <div className="ab__team-grid">
            <motion.div className="ab__team-card" {...fade(0.1)}>
              <div className="ab__team-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.2rem' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid var(--accent)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', background: 'rgba(245,166,35,0.05)' }}>
                    SK
                  </div>
                  <div>
                    <h3 className="ab__team-name" style={{ marginBottom: '2px' }}>Sunil Kamble</h3>
                    <span style={{ fontSize: '0.68rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600 }}>Dharavi Specialist</span>
                  </div>
                </div>
                <p className="ab__team-bio" style={{ marginBottom: '1.2rem' }}>
                  Sunil was born and raised in Dharavi. For over 12 years, he has guided travelers through his home neighborhood, explaining the recycling ecosystems, small leather workshops, and community structures with local insight.
                </p>
                <p style={{ fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.82rem', borderLeft: '2px solid var(--primary)', paddingLeft: '10px', lineHeight: 1.5, margin: 0 }}>
                  "Dharavi is not a place of poverty; it is an inspiring hub of hard work, recycling innovation, and family values."
                </p>
              </div>
            </motion.div>

            <motion.div className="ab__team-card" {...fade(0.2)}>
              <div className="ab__team-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.2rem' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid var(--accent)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', background: 'rgba(245,166,35,0.05)' }}>
                    PS
                  </div>
                  <div>
                    <h3 className="ab__team-name" style={{ marginBottom: '2px' }}>Priya Sharma</h3>
                    <span style={{ fontSize: '0.68rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600 }}>Bollywood & Heritage Guide</span>
                  </div>
                </div>
                <p className="ab__team-bio" style={{ marginBottom: '1.2rem' }}>
                  A cinema graduate from Mumbai University, Priya has spent 8+ years guiding travelers behind the scenes of Bollywood active sets and explaining South Mumbai's rich Victorian Gothic architecture.
                </p>
                <p style={{ fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.82rem', borderLeft: '2px solid var(--primary)', paddingLeft: '10px', lineHeight: 1.5, margin: 0 }}>
                  "Every stone in Mumbai tells a story, and every studio floor shows how dreams are turned into silver screen reality."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section ab__values" style={{ background: 'var(--dark-2)' }}>
        <div className="container">
          <motion.div style={{ textAlign: 'center', marginBottom: '3rem' }} {...fade()}>
            <span className="tag">What We Stand For</span>
            <h2 className="section-title">How We Work</h2>
          </motion.div>
          <div className="ab__values-grid">
            {values.map((v, i) => (
              <motion.div key={i} className="ab__value-card" {...fade(i * 0.08)}>
                <span className="ab__value-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section className="section ab__awards">
        <div className="container">
          <motion.div style={{ textAlign: 'center', marginBottom: '3rem' }} {...fade()}>
            <span className="tag">Recognition</span>
            <h2 className="section-title">TripAdvisor Awards</h2>
            <p className="ab__awards-sub">Seven years of consecutive recognition from the world\'s largest travel platform.</p>
          </motion.div>
          <div className="ab__awards-grid">
            {awards.map((a, i) => (
              <motion.div key={i} className="ab__award-card" {...fade(i * 0.07)}>
                <div className="ab__award-year">{a.year}</div>
                <div className="ab__award-owl">🦉</div>
                <div className="ab__award-title">{a.title}</div>
                <div className="ab__award-body">{a.body}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section ab__cta" style={{ background: 'var(--dark-2)' }}>
        <div className="container ab__cta-inner">
          <motion.div {...fade()}>
            <span className="tag">Ready?</span>
            <h2>Come See the Real Mumbai</h2>
            <p>Browse our tours or get in touch directly — we will build something around your dates and group.</p>
            <div className="ab__cta-btns">
              <Link to="/tours" className="btn btn-primary">Browse All Tours</Link>
              <a href="https://wa.me/917738676316" target="_blank" rel="noreferrer" className="btn btn-whatsapp">WhatsApp Us</a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
