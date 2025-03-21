const embarrassment = {
  camera: {
    intensity: 3,
    maxPitch: 3,
    maxRoll: 3,
    maxYaw: 3,
    pitchFrequency: 3,
    rollFrequency: 3,
    yawFrequency: 3
  },
  orbit: {
    autoRotate: true,
    autoRotateSpeed: 0.05
  },
  particles: {
    aperture: 1.5,
    blending: 1,
    color: { r: 255, g: 255, b: 255, a: 1 },
    curl: 0.5,
    focus: 3.5,
    fov: 145,
    size: 400,
    speed: 0.1,
    p: {
      x: { a: 1.5, b: 20 },
      y: { a: 1.5, b: 10 },
      z: { a: 1, b: 20 }
    },
    r: {
      x: { a: 0.5, b: 5 },
      y: { a: 1.05, b: 5 },
      z: { a: 1.25, b: 5 }
    }
  }
};

export default embarrassment;
