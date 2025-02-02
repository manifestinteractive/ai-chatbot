const sadness = {
  colors: {
    fg: '#8ebbec',
    bg: '#112650'
  },
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
    aperture: 4.5,
    blending: 5,
    color: { r: 142, g: 187, b: 236, a: 1 },
    curl: 0.3,
    focus: 4.95,
    fov: 195,
    size: 512,
    speed: 9,
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

export default sadness;
