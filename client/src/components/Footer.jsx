import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <img src={logo} alt="SRAC Holidays" style={{ height: '34px', width: 'auto', marginBottom: '1rem' }} />
            <p className="footer__desc">
              Mumbai's original local tour operator since 2003.
              Bollywood, heritage, food, and beyond.
            </p>
            <a href="https://wa.me/917738676316" target="_blank" rel="noreferrer" className="btn btn-whatsapp" style={{ marginTop: '1.5rem' }}>
              +91 77386 76316
            </a>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="https://www.instagram.com/sracholidays?igsh=dGwycnU3MjIyYjg5" target="_blank" rel="noreferrer" style={{ color: 'var(--light-2)', transition: 'color 0.3s' }}
                aria-label="Follow us on Instagram"
                onMouseEnter={e => e.currentTarget.style.color='#E1306C'}
                onMouseLeave={e => e.currentTarget.style.color='var(--light-2)'}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h4>Tours</h4>
            <ul>
              <li><Link to="/tours?category=Bollywood">Bollywood Tours</Link></li>
              <li><Link to="/tours?category=Mumbai">Mumbai Tours</Link></li>
              <li><Link to="/tours?category=Heritage">Heritage Tours</Link></li>
              <li><Link to="/tours?category=Food">Food Tours</Link></li>
              <li><Link to="/tours?category=Gateway">Gateway</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/b2b">Trade Enquiry</Link></li>
              <li><Link to="/car-rentals">Car Rentals</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Contact</h4>
            <ul className="footer__contact">
              <li><a href="mailto:info@sracholidays.com">info@sracholidays.com</a></li>
              <li>Flat No. 6, Varadh Vinayak,<br />Sambhaji Nagar, Andheri East,<br />Mumbai, Maharashtra</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} SRAC Holidays. All rights reserved.</p>
          <p>Registered Trademark · Est. 2003 · Mumbai</p>
        </div>
      </div>
    </footer>
  )
}
