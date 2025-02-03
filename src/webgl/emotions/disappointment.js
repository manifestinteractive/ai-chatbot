const disappointment = {
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
    autoRotateSpeed: -0.05
  },
  particles: {
    aperture: 3,
    blending: 2,
    color: { r: 73, g: 179, b: 236, a: 1 },
    curl: 0.36,
    focus: 4,
    fov: 125,
    size: 512,
    speed: 0.1,
    p: {
      x: { a: 1.5, b: 25 },
      y: { a: 1.5, b: 15 },
      z: { a: 1, b: 25 }
    },
    r: {
      x: { a: 0.5, b: 20 },
      y: { a: 1.05, b: 20 },
      z: { a: 1.25, b: 20 }
    }
  }
};

export default disappointment;
