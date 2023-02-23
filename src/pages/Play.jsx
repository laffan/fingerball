import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import Webcam from "react-webcam";
import Stadium from "./../components/Stadium";

const Play = ({ gameId, deviceId }) => {
  const webcamRef = useRef();

  useEffect(() => {
    console.log("gameId", gameId);
    console.log("deviceId", deviceId);
  }, []);

  useEffect(() => {
    webcamRef.current.video.width = 370 / 2;
    webcamRef.current.video.height = 280 / 2;
  }, []);

  return (
    <div className="Play">
      <div
        className="Webcam"
        style={{ zIndex: 10, position: "fixed", left: 0, top: 0 }}
      >
        <Webcam
          ref={webcamRef}
          mirrored
          videoConstraints={{
            deviceId: deviceId,
          }}
        />
      </div>

      <Canvas orthographic camera={{ zoom: 50, position: [100, 100, 100] }}>
        {/* <Stats /> */}
        <color attach="background" args={["#f5efe6"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, -10]} intensity={0.5} />

        <Stadium webcamRef={webcamRef} />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
};

export default Play;
