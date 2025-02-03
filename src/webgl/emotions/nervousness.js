const nervousness = {
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
    autoRotateSpeed: 0.5
  },
  particles: {
    aperture: 1.4,
    blending: 1,
    color: { r: 204, g: 222, b: 240, a: 1 },
    curl: 0.36,
    focus: 3.73,
    fov: 145,
    size: 412,
    speed: 0.1,
    p: {
      x: { a: 1.5, b: 15 },
      y: { a: 1.5, b: 7.5 },
      z: { a: 1, b: 15 }
    },
    r: {
      x: { a: 0.5, b: 7.5 },
      y: { a: 1.05, b: 10 },
      z: { a: 1.25, b: 7.5 }
    }
  }
};

export default nervousness;
