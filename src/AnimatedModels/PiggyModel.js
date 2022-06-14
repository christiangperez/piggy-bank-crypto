import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { animated } from '@react-spring/three';

export default function PiggyModel({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/piggy.gltf');

  const mesh = useRef();
  useFrame(() => (mesh.current.rotation.y += 0.01));

  return (
    <animated.group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} ref={mesh}>
          <group position={[-0.37, 0, 0]}>
            <group position={[0.37, 0, 0]}>
              <animated.mesh
                geometry={nodes.Object_5.geometry}
                material={materials.pigskin}
                scale={1}
              />
            </group>
          </group>
          <group
            position={[1.7, 0.99, -0.54]}
            rotation={[-0.65, -0.03, 0.46]}
            scale={[0.08, 0.11, 0.09]}
          >
            <animated.mesh
              geometry={nodes.Object_7.geometry}
              material={materials.Black}
            />
          </group>
        </group>
      </group>
    </animated.group>
  );
}

useGLTF.preload('/piggy.gltf');
