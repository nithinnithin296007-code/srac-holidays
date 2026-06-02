import { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Html, Center, ContactShadows } from "@react-three/drei";

const MODELS = [
  { file: "/models/toyota_fortuner_2021.glb", name: "Toyota Fortuner", scale: 1.25, shadowY: -0.78 },
  { file: "/models/mercedes_s65.glb", name: "Mercedes S65", scale: 1.1, shadowY: -0.70 },
  { file: "/models/bmw_m4.glb", name: "BMW M4", scale: 0.8, shadowY: -0.65 },
  { file: "/models/land_rover_defender.glb", name: "Land Rover Defender", scale: 1.15, shadowY: -0.72 },
  { file: "/models/range_rover_evoque.glb", name: "Range Rover Evoque", scale: 110.0, shadowY: -0.70 },
]

function Car({ model }) {
  const { scene } = useGLTF(model.file)

  // Clean up outlier node in Land Rover Defender if it exists to center the car body correctly
  if (model.name === "Land Rover Defender") {
    const outlier = scene.getObjectByName("Object_61_143")
    if (outlier && outlier.parent) {
      outlier.parent.remove(outlier)
    }
  }

  const { size, camera } = useThree()
  const width = size.width

  let scale = model.scale
  let shadowY = model.shadowY

  if (width < 480) { scale *= 0.65; shadowY *= 0.65 }
  else if (width < 768) { scale *= 0.84; shadowY *= 0.84 }

  useEffect(() => {
    if (width < 480) camera.position.set(3.2, 1.6, 7.8)
    else if (width < 768) camera.position.set(3.8, 1.7, 7.0)
    else camera.position.set(4.5, 1.8, 6.5)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [width, camera])

  return (
    <>
      <Center>
        <primitive object={scene} scale={scale} />
      </Center>
      <ContactShadows position={[0, shadowY, 0]} opacity={0.7} scale={10} blur={2.5} far={1.5} />
    </>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="cr-model-loader">
        <div className="cr-model-loader__spinner"></div>
        <span>Loading model...</span>
      </div>
    </Html>
  )
}


export default function FortunerModel() {
  const [active, setActive] = useState(0)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className="cr-model-container">
        <Canvas camera={{ position: [4.5, 1.8, 6.5], fov: 40 }} style={{ background: 'transparent' }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 5]} intensity={1.8} />
          <Environment preset="city" />
          <Suspense fallback={<Loader />}>
            <Car key={active} model={MODELS[active]} />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </div>

      {/* Model switcher */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 10,
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