import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { RigidBody, Physics, CuboidCollider } from "@react-three/rapier";
import Webcam from "react-webcam";
import HandPoints from "./../components/Handpoints";

const Play = () => {
  const webcamRef = useRef();
  const [avatarPosition, setAvatarPosition] = useState([3, 0, 3]);
  // state variable for avatarPosition

  const handleHandPositionUpdate = (r) => {
    setAvatarPosition(r);
  };

  return (
    <div className="Play">
      <div className="Webcam" style={{ position: "fixed", left: 0, top: 0 }}>
        <Webcam ref={webcamRef} mirrored />
      </div>

      <Canvas orthographic camera={{ zoom: 50, position: [100, 100, 100] }}>
        <ambientLight intensity={0.5} />
        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
        <pointLight position={[10, 10, -10]} intensity={0.5} />

        <HandPoints
          webcamRef={webcamRef}
          onHandPositionUpdate={handleHandPositionUpdate}
        />
        <Physics>
          <RigidBody type="fixed" restitution={1} position={[0, -1.25, 0]}>
            <mesh receiveShadow>
              <boxGeometry args={[10, 0.5, 10]} />
              <meshStandardMaterial color="#81B29A" />
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
            <mesh>
              <sphereGeometry />
              <meshStandardMaterial color="#E07A5F" />
            </mesh>
          </RigidBody>
              
              <mesh scale={[0.05, 3, 0.05]} position={[5, 0, 5]}>
                <boxGeometry />
                <meshStandardMaterial color="gray" />
              </mesh>
              <mesh scale={[0.05, 3, 0.05]} position={[-5, 0, 5]}>
                <boxGeometry />
                <meshStandardMaterial color="gray" />
              </mesh>
              <mesh scale={[0.05, 3, 0.05]} position={[-5, 0, -5]}>
                <boxGeometry />
                <meshStandardMaterial color="gray" />
              </mesh>
              <mesh scale={[0.05, 3, 0.05]} position={[5, 0, -5]}>
                <boxGeometry />
                <meshStandardMaterial color="gray" />
              </mesh>

          {avatarPosition && (
            <RigidBody
              position={avatarPosition}
              friction={0}
              type="kinematicPosition"
              restitution={1}
            >
              <mesh scale={[0.4, 2, 0.4]}>
                <boxGeometry />
                <meshStandardMaterial color="red" />
              </mesh>
            </RigidBody>
          )}
        </Physics>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Play;
