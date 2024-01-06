import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, PositionalAudio, Html } from "@react-three/drei";
import MacbookBody from './MacbookBody'
import MacbookScreen from './MacbookScreen'
import { useFrame, useThree } from "@react-three/fiber";

export default function Model(props) {
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  return (
    <group>
      <MacbookBody setHovered={setHovered} />
      <MacbookScreen setHovered={setHovered} />
    </group>

  );
}
useGLTF.preload("./macbook.glb");
