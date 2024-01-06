import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const onCreated = (state) => {
    state.gl.domElement.style.position = "absolute";
    state.gl.domElement.style.zIndex = 1;
    state.gl.toneMapping = THREE.NoToneMapping
};

root.render(
    <Canvas
        eventSource={document.getElementById("root")}
        camera={{
            fov: 55,
            near: 0.1,
            far: 200,
            position: [0, 3, 6]
        }}
        gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
        linear
        onCreated={onCreated}
    >
        <Experience />
    </Canvas>
)