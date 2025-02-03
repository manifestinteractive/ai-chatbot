const realization = {
  camera: {
    intensity: 0,
    maxPitch: 0,
    maxRoll: 0,
    maxYaw: 0,
    pitchFrequency: 0,
    rollFrequency: 0,
    yawFrequency: 0
  },
  orbit: {
    autoRotate: true,
    autoRotateSpeed: 0.15
  },
  particles: {
    aperture: 0,
    blending: 2,
    color: { r: 145, g: 113, b: 206, a: 1 },
    curl: 0.5,
    focus: 4.8,
    fov: 95,
    size: 485,
    speed: 0.5,
    p: {
      x: { a: 1.5, b: 20 },
      y: { a: 1.5, b: 10 },
      z: { a: 1, b: 20 }
    },
    r: {
      x: { a: 0.5, b: 5 },
      y: { a: 1.05, b: 6 },
      z: { a: 1.25, b: 5 }
    }
  }
};

export default realization;
