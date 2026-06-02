// src/components/FortunerModel.jsx
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Html, Center, ContactShadows } from "@react-three/drei";

function Car() {
  const { scene } = useGLTF("/models/toyota_fortuner_2021.glb");
  return (
    <Center>
      <primitive object={scene} scale={1.25} />
    </Center>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="cr-model-loader">
        <div className="cr-model-loader__spinner"></div>
        <span>Loading 3D SUV...</span>
      </div>
    </Html>
  );
}

export default function FortunerModel() {
  return (
    <div className="cr-model-container">
      <Canvas
        camera={{ position: [4.5, 1.8, 6.5], fov: 40 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
        />
        <Environment preset="city" />
        <Suspense fallback={<Loader />}>
          <Car />
          <ContactShadows
            position={[0, -0.78, 0]}
            opacity={0.7}
            scale={10}
            blur={2.5}
            far={1.5}
          />
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
  );
}

useGLTF.preload("/models/toyota_fortuner_2021.glb");