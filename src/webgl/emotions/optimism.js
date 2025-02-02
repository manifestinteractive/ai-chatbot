const optimism = {
  colors: {
    fg: '#ffc091',
    bg: '#244c7f'
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
    aperture: 1,
    blending: 2,
    color: { r: 255, g: 192, b: 145, a: 1 },
    curl: 0.2,
    focus: 4,
    fov: 50,
    size: 400,
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

export default optimism;
