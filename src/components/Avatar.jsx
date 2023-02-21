import { useRef, useEffect, useMemo, useState } from "react";
import ml5 from "ml5";
import { throttle } from "lodash";

import { RigidBody, Physics, CuboidCollider } from "@react-three/rapier";

//stack overflow
function mapRange (value, a, b, c, d) {
    // first map value from (a..b) to (0..1)
    value = (value - a) / (b - a);
    // then map it from (0..1) to (c..d) and return it
    return c + value * (d - c);
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


  // Use a memo'd throttle to prevent state updates
  // from occuring each frame.
  // Samir wants to try skipping
  const throttledStateUpdate = useMemo(
    () =>
      throttle((p) => {
        console.log(p)
        setFingerPosition([p[0],1,p[2]]);
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
            return ((truncate(p,2)/100) *-1)+2;
           }));
          
        }
      });
    };
    const handpose = ml5.handpose(webcamRef.current.video, modelLoaded);
  }, []);
  

  return (
    <RigidBody position={ fingerPosition} friction={0} type="kinematicPosition" restitution={1}>
      <mesh scale={[0.4, 3, 0.4]}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
};
export default Avatar;
