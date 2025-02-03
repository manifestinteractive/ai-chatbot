const approval = {
  camera: {
    intensity: 2,
    maxPitch: 2,
    maxRoll: 2,
    maxYaw: 2,
    pitchFrequency: 2,
    rollFrequency: 2,
    yawFrequency: 2
  },
  orbit: {
    autoRotate: true,
    autoRotateSpeed: -0.5
  },
  particles: {
    aperture: 0,
    blending: 2,
    color: { r: 209, g: 232, b: 154, a: 1 },
    curl: 0.25,
    focus: 4.3,
    fov: 210,
    size: 512,
    speed: 3,
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

export default approval;
