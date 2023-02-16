import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RigidBody, Physics, CuboidCollider } from "@react-three/rapier";
import Webcam from "react-webcam";
import HandPoints from "./components/Handpoints";

const App = () => {
  const webcamRef = useRef();

  return (
    <div className="App">
      <div className="Webcam" style={{ position: "fixed", left: 0, top: 0 }}>
        <Webcam ref={webcamRef} mirrored />
      </div>

      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />

        <HandPoints webcamRef={webcamRef} />
        <Physics>
          <RigidBody type="fixed" restitution={1} position={[0, -1.25, 0]}>
            <mesh receiveShadow>
              <boxGeometry args={[10, 0.5, 10]} />
              <meshStandardMaterial color="greenyellow" />
            </mesh>
            <RigidBody type="fixed">
              <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
              <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
              <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
              <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
            </RigidBody>
          </RigidBody>
          <RigidBody
            colliders="ball"
            restitution={1}
            position={[-2, 2, 0]}
            scale={[0.5, 0.5, 0.5]}
          >
            <mesh castShadow>
              <sphereGeometry />
              <meshStandardMaterial color="orange" />
            </mesh>
          </RigidBody>

          <RigidBody
            position={[0, -0.8, 0]}
            friction={0}
            type="kinematicPosition"
          >
            <mesh castShadow scale={[0.4, 2, 0.4]}>
              <boxGeometry />
              <meshStandardMaterial color="red" />
            </mesh>
          </RigidBody>
        </Physics>

        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default App;
