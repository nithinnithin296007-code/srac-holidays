import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ITEMS = [
  {
    id: 1,
    title: 'Behind the Scenes',
    subtitle: 'Step onto active soundstages and witness the camera work and direction of Bollywood productions.',
    category: 'Bollywood Studio',
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1000&q=80',
    gridClass: 'gallery__item--large',
  },
  {
    id: 2,
    title: 'Kumbharwada Pottery',
    subtitle: 'Watch artisans shape clay in the 100-year-old potter community sector of Dharavi.',
    category: 'Dharavi Local Life',
    image: 'https://images.unsplash.com/photo-1565192647048-f997ded879ab?w=800&q=80',
    gridClass: 'gallery__item--medium',
  },
  {
    id: 3,
    title: 'The Monumental Gateway',
    subtitle: 'Stand before the historical Gateway of India overlooking the Arabian Sea at sunrise.',
    category: 'Heritage Walk',
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80',
    gridClass: 'gallery__item--medium',
  },
  {
    id: 4,
    title: 'Mumbai Street Flavors',
    subtitle: 'Taste the fiery flavors of fresh Vada Pav and samosas straight from local frying woks.',
    category: 'Street Food Trail',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=800&q=80',
    gridClass: 'gallery__item--small',
  },
  {
    id: 5,
    title: 'The Logistics Miracle',
    subtitle: 'Watch 5,000 dabbawalas deliver 200,000 lunchboxes with Six Sigma precision and no digital tools.',
    category: 'Dabbawala Tour',
    image: 'https://images.unsplash.com/photo-1627904199733-20e4c5ef50de?w=800&q=80',
    gridClass: 'gallery__item--medium',
  },
  {
    id: 6,
    title: 'Aromatic Spice Stalls',
    subtitle: 'Breathe in the rich aromas of red chili, turmeric, and cardamom at historic local bazaar markets.',
    category: 'Crawford Market',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80',
    gridClass: 'gallery__item--wide',
  },
]

export default function MediaGallery() {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <div className="gallery-section">
      <div className="gallery__grid">
        {ITEMS.map((item, index) => (
          <motion.div
            key={item.id}
            className={`gallery__item ${item.gridClass}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.6 }}
            onClick={() => setSelectedItem(item)}
            style={{ cursor: 'pointer' }}
          >
            <div className="gallery__image-wrap">
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="gallery__overlay-gradient" />
              <div className="gallery__meta-wrap">
                <span className="gallery__category-tag">{item.category}</span>
                <h3 className="gallery__item-title">{item.title}</h3>
                <p className="gallery__item-desc">{item.subtitle}</p>
                <span className="gallery__view-action">View Image ↗</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="gallery__lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="gallery__lightbox-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="gallery__lightbox-close" onClick={() => setSelectedItem(null)}>✕</button>
              <div className="gallery__lightbox-body">
                <div className="gallery__lightbox-img-wrap">
                  <img src={selectedItem.image} alt={selectedItem.title} />
                </div>
                <div className="gallery__lightbox-info">
                  <span className="tag">{selectedItem.category}</span>
                  <h2>{selectedItem.title}</h2>
                  <p>{selectedItem.subtitle}</p>
                  <a
                    href={`https://wa.me/917738676316?text=${encodeURIComponent(`Hi! I'm interested in the custom activities shown in the "Moments from Mumbai" gallery: ${selectedItem.title} (${selectedItem.category}).`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-whatsapp"
                    style={{ marginTop: '1.5rem', width: 'fit-content' }}
                  >
                    Inquire About This Experience
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
