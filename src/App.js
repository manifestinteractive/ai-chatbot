import { OrbitControls, CameraShake } from '@react-three/drei'
import { Leva, useControls } from 'leva'
import { Particles } from './Particles'
import { GreaterEqualDepth, LessDepth, NormalBlending } from 'three'
import { useState, useEffect } from 'react'

export default function App() {
  const blending = {
    'NormalBlending': NormalBlending,
    'LessDepth': LessDepth,
    'GreaterEqualDepth': GreaterEqualDepth,
  }

  const cameraProps = useControls('Camera', {
    intensity: { value: 0, min: 0, max: 5, step: 0.1 },
    maxPitch: { value: 0, min: 0, max: 5, step: 0.05 },
    maxRoll: { value: 0, min: 0, max: 5, step: 0.1 },
    maxYaw: { value: 0, min: 0, max: 5, step: 0.05 },
    pitchFrequency: { value: 0, min: 0, max: 5, step: 0.1 },
    rollFrequency: { value: 0, min: 0, max: 5, step: 0.1 },
    yawFrequency: { value: 0, min: 0, max: 5, step: 0.1 },
  })

  const orbitProps = useControls('Orbit', {
    autoRotate: true,
    autoRotateSpeed: { value: 0.5, min: -10, max: 10, step: 0.1 },
  })

  const particleProps = useControls('Particles', {
    aperture: { value: 1, min: 0, max: 5.6, step: 0.1 },
    blending: {
      value: blending['NormalBlending'],
      options: blending
    },
    color: { r: 255, b: 255, g: 255, a: 1 },
    curl: { value: 0.3, min: 0.01, max: 0.5, step: 0.01 },
    focus: { value: 5, min: 3, max: 7, step: 0.01 },
    fov: { value: 200, min: 0, max: 500 },
    size: { value: 512, min: 0, max: 512 },
    speed: { value: 1, min: 0, max: 100, step: 0.1 },
  })

  return (
    <>
      <OrbitControls makeDefault zoomSpeed={0.1} {...orbitProps} />
      {/* TODO: Map rollFrequency & maxRoll to WAV file input */}
      <CameraShake {...cameraProps} />
      <Particles {...particleProps} />
      {/* <Leva hidden={false} /> */}
    </>
  )
}
