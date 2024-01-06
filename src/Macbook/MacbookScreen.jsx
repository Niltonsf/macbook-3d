import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useTexture, Html } from "@react-three/drei";
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import gsap from 'gsap';
import { useControls } from "leva";

export default function Model({ setHovered }) {
  const bakedTexture = useTexture("./baked-screen.jpg");
  const meshRef = useRef()
  const frameRef = useRef()
  const [isClosed, setIsClosed] = useState(true)
  bakedTexture.flipY = false;

  // Controls
  const controls = useControls({
    animationSpeed: {
      value: 2,
      min: 0.5,
      max: 10,
      step: 0.5,
    }
  })

  const group = useRef();
  const groupHtmlRef = useRef()
  const { nodes } = useGLTF("/macbook-screen.glb");

  const animateScreenOpen = () => {
    gsap.to(meshRef.current.rotation, {
      x: 0,
      duration: controls.animationSpeed
    })
    gsap.to(frameRef.current.rotation, {
      x: 0.009,
      duration: controls.animationSpeed
    })
    gsap.to(frameRef.current.position, {
      z: -0.0,
      duration: controls.animationSpeed
    })
  }

  const animateScreenClose = () => {
    gsap.to(meshRef.current.rotation, {
      x: 1.87,
      duration: controls.animationSpeed
    })
    gsap.to(frameRef.current.rotation, {
      x: 0.013,
      duration: controls.animationSpeed
    })
    gsap.to(frameRef.current.position, {
      z: -0.022,
      duration: controls.animationSpeed
    })
  }

  const onClick = () => {
    if (isClosed) {
      animateScreenOpen()
      setIsClosed(false)
    } else {
      animateScreenClose()
      setIsClosed(true)
    }
  }

  useEffect(() => {
    groupHtmlRef.current.position.set(meshRef.current.position.x, meshRef.current.position.y + 1, meshRef.current.position.z)
    setTimeout(() => {
      animateScreenOpen()
      setIsClosed(false)
    }, 500)
  }, [])

  useFrame(() => {
    groupHtmlRef.current.rotation.x = (meshRef.current.rotation.x) + -0.310
  })

  return (
    <>
      <group ref={group} dispose={null}>
        <group position={[0, -1, -0.05]}>
          <group ref={groupHtmlRef}>
            <rectAreaLight width={10.5} height={10.65} intensity={10.5} color={'#FFF000'} />
            <Html
              transform
              prepend
              wrapperClass="htmlScreen"
              scale={0.94}
              distanceFactor={1.17}
              zIndexRange={[0, 0]}
              position-y={1.7}
            >
              <iframe
                id="iframe"
                src="https://bruno-simon.com/html"
                title="myStaticWebsite"
                style={{
                  width: 1650,
                  height: 1050,
                }}
              />
            </Html>

            <mesh ref={frameRef} position-y={1.7} position-z={0} rotation-x={0.009}>
              <planeGeometry args={[4.65, 3]} />
              <meshPhysicalMaterial
                blending={THREE.NoBlending}
                opacity={0}
                color={"black"}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        </group>
        <mesh
          ref={meshRef}
          name="screen"
          geometry={nodes.screen.geometry}
          material={new THREE.MeshBasicMaterial({ map: bakedTexture })}
          position={[0.009, 0.001, -1.623]}
          rotation-x={1.87}
          onClick={onClick}
          onPointerEnter={(event) => {
            console.log('in')
            setHovered(true)
            event.stopPropagation()
          }}
          onPointerLeave={(event) => {
            console.log('out')
            setHovered(false)
            event.stopPropagation()
          }}
        />
      </group >
    </>
  )
}
useGLTF.preload("./macbook.glb");