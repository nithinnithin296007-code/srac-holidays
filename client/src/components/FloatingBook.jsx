import { useLocation, useNavigate } from 'react-router-dom'

export default function FloatingBook() {
    const location = useLocation()
    const navigate = useNavigate()

    const handleTours = () => {
        if (location.pathname === '/tours') {
            document.querySelector('.tours__filters')?.scrollIntoView({ behavior: 'smooth' })
        } else {
            navigate('/tours')
        }
    }

    const handleCars = () => {
        if (location.pathname === '/car-rentals') {
            document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth' })
        } else {
            navigate('/car-rentals#enquire')
        }
    }

    const btnBase = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: 'none',
        borderRadius: '100px',
        padding: '0.7rem 1.4rem',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-body)',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        whiteSpace: 'nowrap',
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            alignItems: 'flex-end',
        }}>
            <button
                onClick={handleTours}
                style={{
                    ...btnBase,
                    background: 'var(--dark-2)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.12)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
                🗺 Book a Tour
            </button>

            <button
                onClick={handleCars}
                style={{
                    ...btnBase,
                    background: 'var(--primary)',
                    color: '#fff',
                    boxShadow: '0 4px 24px rgba(200,65,11,0.4)',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
                🚗 Book a Ride
            </button>
        </div>
    )
}