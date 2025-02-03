const confusion = {
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
    aperture: 1.4,
    blending: 1,
    color: { r: 255, g: 255, b: 255, a: 1 },
    curl: 0.36,
    focus: 4,
    fov: 145,
    size: 412,
    speed: 0.1,
    p: {
      x: { a: 1.5, b: 25 },
      y: { a: 1.5, b: 15 },
      z: { a: 1, b: 25 }
    },
    r: {
      x: { a: 0.5, b: 7.5 },
      y: { a: 1.05, b: 10 },
      z: { a: 1.25, b: 7.5 }
    }
  }
};

export default confusion;
