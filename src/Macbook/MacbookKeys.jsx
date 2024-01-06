import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useTexture, PositionalAudio } from "@react-three/drei";
import * as THREE from 'three'
import { keysMapped } from "./keyMap";
import fragmentShader from '../shaders/Macbook/Keys/fragment.js'
import vertexShader from '../shaders/Macbook/Keys/vertex.js'
import { useControls } from "leva";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/macbook-keys.glb");
  const keysRef = useRef({});

  // Controls
  const controls = useControls({
    keyboardLight: {
      value: 0.5,
      min: 0.0,
      max: 1.0,
      step: 0.1,
    }
  })

  // Sound
  const sound = useRef();
  const sound2 = useRef();

  // Texture
  const bakedTexture = useTexture("./baked-keys.jpg");
  const bakedLightTexture = useTexture("./baked-keys-0.jpg");
  bakedTexture.flipY = false;
  bakedLightTexture.flipY = false

  // Function to handle key press
  const handleKeyPress = (key, action, location) => {
    const keyWithLocation = `${key}${location !== 0 ? location : ''}`

    const keyRef = keysRef.current[keysMapped[keyWithLocation]];

    if (action === 'DOWN') {
      if (sound.current.isPlaying) {
        sound2.current.play();
      } else {
        sound.current.play()
      }
    }

    if (keyRef && action === 'DOWN') {
      keyRef.position.set(0, -0.008, 0);
    } else if (keyRef && action === 'UP') {
      keyRef.position.set(0, 0, 0);
    }
  };

  useEffect(() => {
    const keyDownHandler = event => {
      event.preventDefault();
      handleKeyPress(event.key, 'DOWN', event.location)
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  useEffect(() => {
    const keyUpHandler = event => {
      event.preventDefault();
      handleKeyPress(event.key, 'UP', event.location)
    };
    document.addEventListener('keyup', keyUpHandler);
    return () => {
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uBakedTexture: { value: bakedTexture },
        uLightMapTexture: { value: bakedLightTexture },
        uMix: { value: controls.keyboardLight }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    })
  }, [controls.keyboardLight])

  return (
    <>

      <PositionalAudio ref={sound} loop={false} url="./sequence.mp3" distance={1} />
      <PositionalAudio ref={sound2} loop={false} url="./sequence.mp3" distance={1} />

      <group ref={group} {...props} dispose={null} receiveShadow>
        <>
          {Object.keys(nodes).map((keyName) => (
            <mesh
              key={keyName}
              ref={(mesh) => {
                keysRef.current[keyName] = mesh;
              }}
              name={`key${keyName}`}
              geometry={nodes[keyName].geometry}
              material={shaderMaterial}
            />
          ))}
        </>
      </group>
    </>
  );
}
useGLTF.preload("./macbook.glb");
