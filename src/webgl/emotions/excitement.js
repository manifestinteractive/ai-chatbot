const excitement = {
  colors: {
    fg: '#fe9e5b',
    bg: '#0c2446'
  },
  camera: {
    intensity: 4,
    maxPitch: 4,
    maxRoll: 4,
    maxYaw: 4,
    pitchFrequency: 4,
    rollFrequency: 4,
    yawFrequency: 4
  },
  orbit: {
    autoRotate: true,
    autoRotateSpeed: 4
  },
  particles: {
    aperture: 0.1,
    blending: 2,
    color: { r: 254, g: 158, b: 91, a: 1 },
    curl: 0.25,
    focus: 5,
    fov: 85,
    size: 512,
    speed: 4,
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

export default excitement;
