import { RigidBody, Physics, CuboidCollider } from "@react-three/rapier";

const Stadium = ({ avatarPosition }) => {
  return (<Physics>
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
  </Physics>);
};

export default Stadium;