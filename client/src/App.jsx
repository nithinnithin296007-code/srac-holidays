import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'

// Lazy-load all pages for code splitting — each page becomes its own JS chunk.
// Heavy pages like CarRentals (Three.js 3D model ~800KB) only load when visited.
const Home = lazy(() => import('./pages/Home'))
const Tours = lazy(() => import('./pages/Tours'))
const TourDetail = lazy(() => import('./pages/TourDetail'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const CarRentals = lazy(() => import('./pages/CarRentals'))
const B2B = lazy(() => import('./pages/B2B'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 36,
        height: 36,
        border: '3px solid rgba(255, 255, 255, 0.08)',
        borderTopColor: 'var(--primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:slug" element={<TourDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/car-rentals" element={<CarRentals />} />
            <Route path="/b2b" element={<B2B />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
      <WhatsAppWidget />
    </MotionConfig>
  )
}
