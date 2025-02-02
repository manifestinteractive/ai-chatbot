const surprise = {
  colors: {
    fg: '#c3effb',
    bg: '#006185'
  },
  camera: {
    intensity: 5,
    maxPitch: 5,
    maxRoll: 5,
    maxYaw: 5,
    pitchFrequency: 5,
    rollFrequency: 5,
    yawFrequency: 5
  },
  orbit: {
    autoRotate: true,
    autoRotateSpeed: 5
  },
  particles: {
    aperture: 1.5,
    blending: 5,
    color: { r: 195, g: 239, b: 251, a: 1 },
    curl: 0.35,
    focus: 4.75,
    fov: 60,
    size: 425,
    speed: 50,
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

export default surprise;
