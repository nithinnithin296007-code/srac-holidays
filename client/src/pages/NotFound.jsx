import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--dark)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: 'center', padding: '2rem' }}
      >
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>404</div>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}>Page Not Found</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.8' }}>
          The page you are looking for does not exist.<br />
          It may have been moved or the URL is incorrect.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">Go Home</Link>
          <Link to="/tours" className="btn btn-outline">Browse Tours</Link>
        </div>
      </motion.div>
    </main>
  )
}
