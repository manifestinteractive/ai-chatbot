const disgust = {
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
    autoRotateSpeed: -7.5
  },
  particles: {
    aperture: 2.5,
    blending: 1,
    color: { r: 255, g: 255, b: 255, a: 1 },
    curl: 0.5,
    focus: 4.5,
    fov: 100,
    size: 512,
    speed: 0.1,
    p: {
      x: { a: 1.5, b: 5 },
      y: { a: 1.5, b: 5 },
      z: { a: 1.5, b: 5 }
    },
    r: {
      x: { a: 1.5, b: 5 },
      y: { a: 1.5, b: 5 },
      z: { a: 1.5, b: 5 }
    }
  }
};

export default disgust;
