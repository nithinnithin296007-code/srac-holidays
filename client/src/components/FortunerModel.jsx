import { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, Html, Center, ContactShadows } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'

import imgFortuner from '../assets/cars/fortuner.jpg'
import imgMercedes from '../assets/cars/mercedes-e.jpg'
import imgAudi from '../assets/cars/audi.jpg'
import imgInnova from '../assets/cars/innova-crysta.jpg'

const MODELS = [
  { file: '/models/toyota_fortuner_2021.glb', name: 'Toyota Fortuner', fallbackImg: imgFortuner },
  { file: '/models/mercedes_s65.glb', name: 'Mercedes S65', fallbackImg: imgMercedes },
  { file: '/models/audi_a5.glb', name: 'Audi A5', fallbackImg: imgAudi },
  { file: '/models/innova_zenix.glb', name: 'Innova Hycross', fallbackImg: imgInnova },
]

function Car({ url, isMobile }) {
  const { scene } = useGLTF(url, true)
  const { size, camera } = useThree()
  const w = size.width

  useEffect(() => {
    if (w < 480) camera.position.set(3.2, 1.6, 7.8)
    else if (w < 768) camera.position.set(3.8, 1.7, 7.0)
    else camera.position.set(4.5, 1.8, 6.5)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [w, camera])

  useEffect(() => {
    const disposeMaterial = (material) => {
      material.dispose()
      for (const key of Object.keys(material)) {
        const value = material[key]
        if (value && typeof value.dispose === 'function') {
          value.dispose()
        }
      }
    }

    return () => {
      if (scene) {
        scene.traverse((object) => {
          if (object.isMesh) {
            if (object.geometry) {
              object.geometry.dispose()
            }
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((material) => disposeMaterial(material))
              } else {
                disposeMaterial(object.material)
              }
            }
          }
        })
      }
      useGLTF.clear(url)
    }
  }, [scene, url])

  let scale = 1.2
  if (w < 480) scale = 0.8
  else if (w < 768) scale = 1.0

  return (
    <>
      <Center>
        <primitive object={scene} scale={scale} />
      </Center>
      {!isMobile && (
        <ContactShadows
          position={[0, -0.78, 0]}
          opacity={0.6}
          scale={10}
          blur={2.5}
          far={1.5}
        />
      )}
    </>
  )
}

function Loader() {
  return (
    <Html center>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        color: 'rgba(255,255,255,0.5)',
      }}>
        <div style={{
          width: 36,
          height: 36,
          border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <span style={{ fontSize: '0.8rem' }}>Loading model…</span>
      </div>
    </Html>
  )
}

export default function FortunerModel() {
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [inView, setInView] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia('(max-width: 991px)').matches ||
        ('ontouchstart' in window) ||
        navigator.maxTouchPoints > 0
      )
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {inView ? (
        <Canvas
          camera={{ position: [4.5, 1.8, 6.5], fov: 40 }}
          style={{ background: 'transparent', touchAction: 'pan-y' }}
          dpr={isMobile ? [1, 1.5] : window.devicePixelRatio}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow={!isMobile} />
          <directionalLight position={[-3, 2, 4]} intensity={0.4} />
          <Environment preset="city" />
          <Suspense fallback={<Loader />}>
            <Car key={active} url={MODELS[active].file} isMobile={isMobile} />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!isMobile}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      ) : (
        /* Viewport Placeholder static image when off-screen to use 0% graphics/memory resources */
        <div style={{ width: '100%', height: 'calc(100% - 60px)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          <img
            src={MODELS[active].fallbackImg}
            alt={MODELS[active].name}
            style={{
              maxWidth: '90%',
              maxHeight: '80%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 25px rgba(0,0,0,0.55))',
            }}
          />
        </div>
      )}

      {/* Switcher */}
      <div 
        className="cr-model-switcher"
        style={{
          position: 'absolute',
          bottom: '0.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 10,
          flexWrap: 'nowrap',
          justifyContent: 'center',
          maxWidth: '92%',
          overflowX: 'auto',
          padding: '6px 12px',
          background: 'rgba(13, 13, 13, 0.65)',
          backdropFilter: 'blur(16px)',
          borderRadius: '100px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
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