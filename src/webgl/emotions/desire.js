const desire = {
  colors: {
    fg: '#bd71a0',
    bg: '#2d1d3f'
  },
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

export default desire;
