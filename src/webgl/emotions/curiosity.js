const curiosity = {
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
    autoRotateSpeed: 0.05
  },
  particles: {
    aperture: 0,
    blending: 5,
    color: { r: 182, g: 161, b: 222, a: 1 },
    curl: 0.3,
    focus: 4.5,
    fov: 300,
    size: 512,
    speed: 1,
    p: {
      x: { a: 1.5, b: 10 },
      y: { a: 1.5, b: 5 },
      z: { a: 1, b: 10 }
    },
    r: {
      x: { a: 0.5, b: 5 },
      y: { a: 1.05, b: 7.5 },
      z: { a: 1.25, b: 5 }
    }
  }
};

export default curiosity;
