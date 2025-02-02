const relief = {
  colors: {
    fg: '#d1e89a',
    bg: '#4d7bac'
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
    autoRotateSpeed: 0.15
  },
  particles: {
    aperture: 1,
    blending: 2,
    color: { r: 209, g: 232, b: 154, a: 1 },
    curl: 0.3,
    focus: 5,
    fov: 200,
    size: 350,
    speed: 1,
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

export default relief;
