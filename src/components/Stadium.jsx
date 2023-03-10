import { RigidBody, Physics, CuboidCollider } from "@react-three/rapier";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import Avatar from "./Avatar";

// Thanks to https://sbcode.net/react-three-fiber/lerp/
// function lerp(x, y, a) {
//   const r = (1 - a) * x + a * y;
//   return Math.abs(x - y) < 0.001 ? y : r;
// }

const Stadium = ({ webcamRef }) => {
  const avatarRef = useRef();

  // useEffect(()=>{
  //   if ( typeof avatarPosition !== "undefined" ) {
  //     console.log( avatarRef.current.position )
  //   // avatarRef.current.position.x = lerp(avatarRef.current.position.x, avatarPosition[0], 0.025)
  //   }

  // }, [ avatarPosition ])

  // useFrame(() => {
  //   avatarRef.current.position.x = lerp(avatarRef.current.position.x, avatarPosition[1], 0.25)
  //   avatarRef.current.position.z = lerp(avatarRef.current.position.z, avatarPosition[0], 0.25)

  //   // console.log(avatarRef.current.posi);
  // });

  return (
    
    <Physics>
      
      <RigidBody type="fixed" restitution={1} position={[0, -1.25, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[10, 0.5, 10]} />
          <meshStandardMaterial color="bisque" />
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
          <meshStandardMaterial color="#ffb30f" />
        </mesh>
      </RigidBody>
      <RigidBody
        colliders="ball"
        restitution={1}
        position={[2, 2, 0]}
        scale={[0.5, 0.5, 0.5]}
      >
        <mesh>
          <sphereGeometry />
          <meshStandardMaterial color="#ffb30f" />
        </mesh>
      </RigidBody>
      <RigidBody
        colliders="ball"
        restitution={1}
        position={[0, 3, 2]}
        scale={[0.5, 0.5, 0.5]}
      >
        <mesh>
          <sphereGeometry />
          <meshStandardMaterial color="#ffb30f" />
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

      <Avatar webcamRef={webcamRef}/>
    </Physics>
  );
};

export default Stadium;
