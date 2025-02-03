const pride = {
  camera: {
    intensity: 1,
    maxPitch: 1,
    maxRoll: 1,
    maxYaw: 1,
    pitchFrequency: 1,
    rollFrequency: 1,
    yawFrequency: 1
  },
  orbit: {
    autoRotate: true,
    autoRotateSpeed: 1.5
  },
  particles: {
    aperture: 0.3,
    blending: 1,
    color: { r: 246, g: 239, b: 251, a: 1 },
    curl: 0.25,
    focus: 4,
    fov: 100,
    size: 350,
    speed: 5,
    p: {
      x: { a: 1.5, b: 20 },
      y: { a: 1.5, b: 10 },
      z: { a: 1, b: 20 }
    },
    r: {
      x: { a: 0.5, b: 10 },
      y: { a: 1.05, b: 15 },
      z: { a: 1.25, b: 10 }
    }
  }
};

export default pride;
