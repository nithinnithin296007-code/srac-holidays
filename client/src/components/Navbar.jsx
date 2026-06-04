import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo.svg'

const links = [
    { label: 'Home', to: '/' },
    { label: 'Tours', to: '/tours' },
    { label: 'About', to: '/about' },
    { label: 'Car Rentals', to: '/car-rentals' },
    { label: 'Trade Enquiry', to: '/b2b' },
    { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => setOpen(false), [location])

    return (
        <>
            <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
                <div className="container navbar__inner">
                    <Link to="/" className="navbar__logo">
                        <img src={logo} alt="SRAC Holidays" className="navbar__logo-icon" />
                        <span className="navbar__logo-text">
                            <span className="navbar__logo-srac">SRAC</span>
                            <span className="navbar__logo-holidays">HOLIDAYS</span>
                            <span className="navbar__logo-est">MUMBAI · EST. 2003</span>
                        </span>
                    </Link>

                    <ul className="navbar__links">
                        {links.map(l => (
                            <li key={l.to}>
                                <Link
                                    to={l.to}
                                    className={`navbar__link ${location.pathname === l.to ? 'active' : ''}`}
                                >
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <a href="https://wa.me/917738676316" target="_blank" rel="noreferrer" className="btn btn-whatsapp navbar__cta">
                        WhatsApp
                    </a>
                    <a href="https://www.instagram.com/sracholidays?igsh=dGwycnU3MjIyYjg5" target="_blank" rel="noreferrer" className="navbar__ig">
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                    </a>

                    <button
                        className={`navbar__burger ${open ? 'open' : ''}`}
                        onClick={() => setOpen(!open)}
                        aria-label="Menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="mobile-menu-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(0, 0, 0, 0.6)',
                                backdropFilter: 'blur(6px)',
                                zIndex: 998,
                            }}
                        />

                        {/* Slide-over Menu Panel */}
                        <motion.div
                            className="mobile-menu-panel"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                width: 'min(320px, 85vw)',
                                height: '100vh',
                                background: 'rgba(13, 13, 13, 0.96)',
                                backdropFilter: 'blur(20px)',
                                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                                zIndex: 999,
                                padding: '2.5rem 2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '-10px 0 35px rgba(0,0,0,0.6)',
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                                    <span style={{ fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600 }}>Navigation</span>
                                    <button 
                                        onClick={() => setOpen(false)}
                                        style={{ background: 'none', border: 'none', color: 'var(--light)', fontSize: '1.25rem', cursor: 'pointer', opacity: 0.7 }}
                                    >
                                        ✕
                                    </button>
                                </div>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                                    {links.map((l, i) => (
                                        <motion.li
                                            key={l.to}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <Link 
                                                to={l.to}
                                                style={{ 
                                                    fontSize: '1.5rem', 
                                                    fontFamily: 'var(--font-heading)', 
                                                    color: location.pathname === l.to ? 'var(--primary)' : 'var(--light)',
                                                    fontWeight: location.pathname === l.to ? '700' : '400',
                                                    transition: 'color 0.2s',
                                                    display: 'block'
                                                }}
                                            >
                                                {l.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
                                <a href="https://wa.me/917738676316" target="_blank" rel="noreferrer" className="btn btn-whatsapp" style={{ justifyContent: 'center', fontSize: '0.85rem' }}>
                                    WhatsApp Us
                                </a>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--muted)', fontSize: '0.72rem' }}>
                                    <span>© 2026 SRAC HOLIDAYS</span>
                                    <a 
                                        href="https://www.instagram.com/sracholidays?igsh=dGwycnU3MjIyYjg5" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        style={{ color: 'var(--muted)', transition: 'color 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#E1306C'} 
                                        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                                    >
                                        Instagram
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}