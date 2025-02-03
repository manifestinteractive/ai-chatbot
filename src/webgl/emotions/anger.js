const anger = {
  camera: {
    intensity: 0.5,
    maxPitch: 0.7,
    maxRoll: 2.0,
    maxYaw: 0.05,
    pitchFrequency: 1,
    rollFrequency: 2,
    yawFrequency: 1
  },
  orbit: {
    autoRotate: true,
    autoRotateSpeed: 7.5
  },
  particles: {
    aperture: 3,
    blending: 2,
    color: { r: 233, g: 112, b: 112, a: 1 },
    curl: 0.35,
    focus: 4.5,
    fov: 30,
    size: 512,
    speed: 75,
    p: {
      x: { a: 1.5, b: 5 },
      y: { a: 1.5, b: 2.5 },
      z: { a: 1, b: 5 }
    },
    r: {
      x: { a: 0.25, b: 2.5 },
      y: { a: 0.55, b: 3.75 },
      z: { a: 0.75, b: 2.5 }
    }
  }
};

export default anger;
