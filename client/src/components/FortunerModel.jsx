// src/components/FortunerModel.jsx
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Html, Center } from "@react-three/drei";

function Car() {
  const { scene } = useGLTF("/models/toyota_fortuner_2021.glb");

  // Enable shadows for the model's meshes
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <Center>
      <primitive object={scene} scale={1.8} />
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
        shadows
        camera={{ position: [4, 2, 6], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Environment preset="city" />
        <Suspense fallback={<Loader />}>
          <Car />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.6}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/toyota_fortuner_2021.glb");