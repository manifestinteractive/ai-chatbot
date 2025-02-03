const admiration = {
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
    aperture: 3,
    blending: 2,
    color: { r: 76, g: 174, b: 79, a: 1 },
    curl: 0.5,
    focus: 4.5,
    fov: 10,
    size: 300,
    speed: 1,
    p: {
      x: { a: 1.5, b: 10 },
      y: { a: 1.5, b: 5 },
      z: { a: 1, b: 10 }
    },
    r: {
      x: { a: 0.5, b: 5 },
      y: { a: 1.05, b: 7 },
      z: { a: 1.25, b: 5 }
    }
  }
};

export default admiration;
