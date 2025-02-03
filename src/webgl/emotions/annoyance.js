const annoyance = {
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
    autoRotateSpeed: 3.5
  },
  particles: {
    aperture: 0,
    blending: 5,
    color: { r: 255, g: 245, b: 224, a: 1 },
    curl: 0.6,
    focus: 5,
    fov: 150,
    size: 512,
    speed: 1,
    p: {
      x: { a: 1.5, b: 2.5 },
      y: { a: 1.5, b: 5 },
      z: { a: 1, b: 2.5 }
    },
    r: {
      x: { a: 0.5, b: 2.5 },
      y: { a: 0.5, b: 3.5 },
      z: { a: 0.5, b: 2.5 }
    }
  }
};

export default annoyance;
