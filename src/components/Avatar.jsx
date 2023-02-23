import { useRef, useEffect, useMemo, useState } from "react";
import ml5 from "ml5";
import { throttle } from "lodash";
import Webcam from "react-webcam";

import { RigidBody, Physics, CuboidCollider } from "@react-three/rapier";

//stack overflow
function mapRange (value, a, b, c, d) {
    // first map value from (a..b) to (0..1)
    value = (value - a) / (b - a);
    // then map it from (0..1) to (c..d) and return it
    return c + value * (d - c);
}
//a classic mattdesl
function lerp(v0, v1, t) {
  return v0*(1-t)+v1*t
}
// thanks chat gpt for letting me be lazy
function averageCoordinates(arr) {
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;

  for (let i = 0; i < arr.length; i++) {
    sumX += arr[i][0];
    sumY += arr[i][1];
    sumZ += arr[i][2];
  }

  const avgX = sumX / arr.length;
  const avgY = sumY / arr.length;
  const avgZ = sumZ / arr.length;

  return [avgX, avgY, avgZ];
}

//stack overflow
function truncate (number, digits) {
  var multiplier = Math.pow(10, digits),
      adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

  return truncatedNum / multiplier;
};

const Avatar = ({ webcamRef }) => {
  const [fingerPosition, setFingerPosition] = useState([0,1.5,0]);
  const vidSize = { width: 370 / 2, height: 280 / 2 };
  const sample = [[0,1.5,0],[0,1.5,0],[0,1.5,0]]

  // Use a memo'd throttle to prevent state updates
  // from occuring each frame.
  // Samir wants to try skipping
  const throttledStateUpdate = useMemo(
    () =>
      throttle((p) => {
        let x = mapRange(p[0],560,90,-5,5)
        let y = 1
        let z = mapRange(p[1],400,60,5,-5)
        let s = [x,y,z]
        sample.pop()
        sample.unshift(s)
        setFingerPosition(averageCoordinates(sample));
      }, 150),
    []
  );

  useEffect(() => {
    // Set video size once
    webcamRef.current.video.width = vidSize.width;
    webcamRef.current.video.height = vidSize.height;
    // Once model is updated, ping throttledStateUpdate
    // with new updated state each frame.
    const modelLoaded = () => {
      handpose.on("hand", (results) => {
        if (results && typeof results[0] !== "undefined") {
            // const raw = results[0].annotations.indexFinger[0] //this is the index finger
            const raw = results[0].landmarks[0]

        // //    throttledStateUpdate([
        // //         mapRange(raw[0],560,90,-5,5),
        // //         mapRange(raw[1],430,60,-5,5),
        // //         raw[2]]);

           throttledStateUpdate(raw.map((p)=>{
            return truncate(p,2);
           }));
          
        }
      });
    };
    const handpose = ml5.handpose(webcamRef.current.video, modelLoaded);
  }, []);
  

  return (
      <RigidBody position={ fingerPosition} friction={0} type="kinematicPosition" restitution={2}>
      <mesh scale={[0.4, 3, 0.4]}>
        <boxGeometry />
        <meshStandardMaterial color="#0067b9" />
      </mesh>
    </RigidBody>
    
  );
};
export default Avatar;
