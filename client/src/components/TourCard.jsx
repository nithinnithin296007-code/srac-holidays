import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function TourCard({ tour, index = 0 }) {
    return (
        <motion.div
            className="tour-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
        >
            <Link to={`/tours/${tour.slug}`} className="tour-card__inner">
                <div className="tour-card__image">
                    <img
                        src={tour.coverImage}
                        alt={tour.name}
                        loading="lazy"
                        onError={e => {
                            e.target.src = `https://picsum.photos/seed/${tour.slug}/600/400`
                        }}
                    />
                    <span className="tour-card__category">{tour.category}</span>
                    <div className="tour-card__overlay" />
                </div>
                <div className="tour-card__body">
                    <h3 className="tour-card__name">{tour.name}</h3>
                    <p className="tour-card__tagline">{tour.tagline}</p>
                    <div className="tour-card__meta">
                        <span>{tour.duration}</span>
                        <span>{tour.groupSize}</span>
                    </div>
                    <div className="tour-card__footer">
                        <span className="tour-card__arrow">Book Now →</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
