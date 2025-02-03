const desire = {
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
    autoRotateSpeed: 5
  },
  particles: {
    aperture: 2,
    blending: 2,
    color: { r: 189, g: 113, b: 160, a: 1 },
    curl: 0.35,
    focus: 5,
    fov: 25,
    size: 350,
    speed: 25,
    p: {
      x: { a: 1.5, b: 20 },
      y: { a: 1.5, b: 10 },
      z: { a: 1, b: 20 }
    },
    r: {
      x: { a: 0.5, b: 5 },
      y: { a: 1.05, b: 7.5 },
      z: { a: 1.25, b: 5 }
    }
  }
};

export default desire;
