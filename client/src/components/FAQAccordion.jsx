import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q: 'Is the Dharavi Slum Tour ethical and safe?',
    a: 'Absolutely. Our Dharavi tours are designed as community walks to highlight the neighborhood\'s incredible recycling industries, leather crafts, pottery workshops, and resilient spirit. Every guide is a local resident who was born and raised in Dharavi. Furthermore, 50% of all tour profits are reinvested directly into local educational programs and youth development initiatives.',
  },
  {
    q: 'Can we see active filming during the Bollywood Tour?',
    a: 'Yes! We have official partnerships that allow us inside active studio soundstages and Film City sets. While shooting schedules are subject to change, we always coordinate to get you onto live television serial or movie sets, where you can watch actors, directors, and crew at work. You will also visit make-up rooms and the post-production dubbing studio.',
  },
  {
    q: 'Are vegetarian / vegan options available on the Food Trails?',
    a: 'Yes, street food in Mumbai is highly accommodating to vegetarian and vegan lifestyles. Our food trails are 100% customizable to suit your dietary restrictions or spice preferences. We only take our guests to long-standing, hygiene-verified local stalls to ensure a safe and delicious culinary experience.',
  },
  {
    q: 'How does the booking and payment process work?',
    a: 'We prioritize personal service over automated checkouts. Once you submit a trip query or chat with us on WhatsApp, we will customize the itinerary to fit your schedule. Your booking is confirmed directly with a human, and payment is handled securely upon your arrival in Mumbai or via bank transfer. No upfront online credit card transactions are required.',
  },
]

function FAQItem({ q, a, isOpen, onClick }) {
  return (
    <div style={{
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '1.25rem 0',
    }}>
      <button
        onClick={onClick}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: '1.05rem',
          fontWeight: 600,
          fontFamily: 'var(--font-heading)',
          textAlign: 'left',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <span>{q}</span>
        <span style={{
          fontSize: '1.2rem',
          color: 'var(--primary)',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.28s var(--transition)',
        }}>
          ＋
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              color: 'var(--muted)',
              fontSize: '0.88rem',
              lineHeight: 1.7,
              marginTop: '0.75rem',
              paddingRight: '1.5rem',
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto' }}>
      {FAQS.map((faq, i) => (
        <FAQItem
          key={i}
          q={faq.q}
          a={faq.a}
          isOpen={openIndex === i}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  )
}
