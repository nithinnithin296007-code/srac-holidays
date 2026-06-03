import { useState } from 'react'
import ModelViewer from './ModelViewer'

const MODELS = [
  { file: '/models/toyota_fortuner_2021.glb', name: 'Toyota Fortuner' },
  { file: '/models/mercedes_s65.glb', name: 'Mercedes S65' },
  { file: '/models/bmw_m4.glb', name: 'BMW 5 Series' },
  { file: '/models/audi_a5.glb', name: 'Audi A5' },
  { file: '/models/innova_zenix.glb', name: 'Innova Hycross' },
]

export default function FortunerModel() {
  const [active, setActive] = useState(0)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ModelViewer
        key={active}
        url={MODELS[active].file}
        width="100%"
        height="100%"
        autoRotate
        autoRotateSpeed={0.4}
        enableMouseParallax={false}
        enableHoverRotation={false}
        enableManualRotation
        enableManualZoom={false}
        autoFrame
        fadeIn
        showScreenshotButton={false}
        environmentPreset="city"
        ambientIntensity={0.5}
        keyLightIntensity={1.8}
        fillLightIntensity={0.4}
        rimLightIntensity={0.6}
        defaultRotationX={-50}
        defaultRotationY={20}
        defaultZoom={2.8}
      />

      {/* Switcher */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 10,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {MODELS.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              background: active === i ? 'var(--primary)' : 'rgba(255,255,255,0.08)',
              border: active === i ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.15)',
              color: active === i ? '#fff' : 'rgba(255,255,255,0.5)',
              fontSize: '0.65rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '5px 12px',
              borderRadius: '100px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-body)',
              whiteSpace: 'nowrap',
            }}
          >
            {m.name}
          </button>
        ))}
      </div>
    </div>
  )
}