import React from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import MacbookKeys from './MacbookKeys'

export default function Model({ setHovered }) {
  const { nodes } = useGLTF("/macbook-body.glb");
  const bakedTexture = useTexture("./baked-body.jpg");
  bakedTexture.flipY = false;

  return (
    <group>
      <mesh
        geometry={nodes.body.geometry}
        receiveShadow
        castShadow
        onPointerOver={() => {
          setHovered(true)
        }}
        onPointerOut={() => {
          setHovered(false)
        }}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <MacbookKeys />
    </group>
  );
}
useGLTF.preload("./macbook.glb");
