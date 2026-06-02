// src/components/FortunerModel.jsx
import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Html, Center, ContactShadows } from "@react-three/drei";

function Car() {
  const { scene } = useGLTF("/models/toyota_fortuner_2021.glb");
  const { size, camera } = useThree();
  const width = size.width;

  // Determine dynamic scale and shadow position based on canvas width
  let scale = 1.25;
  let shadowY = -0.78;

  if (width < 480) {
    scale = 0.82;
    shadowY = -0.51;
  } else if (width < 768) {
    scale = 1.05;
    shadowY = -0.66;
  }

  // Adjust camera position and aspect ratio dynamically on resize
  useEffect(() => {
    if (width < 480) {
      camera.position.set(3.2, 1.6, 7.8);
    } else if (width < 768) {
      camera.position.set(3.8, 1.7, 7.0);
    } else {
      camera.position.set(4.5, 1.8, 6.5);
    }
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [width, camera]);

  return (
    <>
      <Center>
        <primitive object={scene} scale={scale} />
      </Center>
      <ContactShadows
        position={[0, shadowY, 0]}
        opacity={0.7}
        scale={10}
        blur={2.5}
        far={1.5}
      />
    </>
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