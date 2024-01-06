import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import Placeholder from './Placeholder.jsx'
import Macbook from './Macbook/Macbook.jsx'
import { useRef } from 'react'
import { useEffect } from 'react'

export default function Experience() {
    const orbitControlsRef = useRef()

    useEffect(() => {
        orbitControlsRef.current.target.set(0, 1, 0)
    }, [])

    return (<>

        <color attach="background" args={["black"]} />

        <Perf position="top-left" />

        <OrbitControls ref={orbitControlsRef} makeDefault />

        <Suspense fallback={<></>}>
            <Macbook />
        </Suspense>

    </>)
}