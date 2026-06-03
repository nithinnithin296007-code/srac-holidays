import { Suspense, useState, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, Html, Center, ContactShadows } from '@react-three/drei'

const MODELS = [
  { file: '/models/toyota_fortuner_2021.glb', name: 'Toyota Fortuner' },
  { file: '/models/mercedes_s65.glb', name: 'Mercedes S65' },
  { file: '/models/audi_a5.glb', name: 'Audi A5' },
  { file: '/models/innova_zenix.glb', name: 'Innova Hycross' },
]

function Car({ url }) {
  const { scene } = useGLTF(url)
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
      <ContactShadows
        position={[0, -0.78, 0]}
        opacity={0.6}
        scale={10}
        blur={2.5}
        far={1.5}
      />
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

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [4.5, 1.8, 6.5], fov: 40 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow />
        <directionalLight position={[-3, 2, 4]} intensity={0.4} />
        <Environment preset="city" />
        <Suspense fallback={<Loader />}>
          <Car key={active} url={MODELS[active].file} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>

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