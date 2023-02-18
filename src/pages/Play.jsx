import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Webcam from "react-webcam";
import Stadium from "./../components/Stadium";
import HandPoints from "./../components/Handpoints";

const Play = ({ gameId }) => {
  console.log("gameId", gameId);

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
        <Stadium avatarPosition={avatarPosition} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Play;
