// NPM Dependencies
import * as THREE from 'three';
import { createRoot, events, extend } from '@react-three/fiber';

// Static Assets
import './assets/css/styles.scss';

// React Components
import App from './App';

extend(THREE);

// Create a react root
const $canvas = document.querySelector('#ai-bot');
const root = createRoot($canvas);

// Camera Settings for WebGL
const getCameraSettings = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  if (w <= 320 || h <= 320) {
    return {
      fov: 70,
      position: [0, 0, 5.3]
    };
  }
  if (w <= 468 || h <= 468) {
    return {
      fov: 55,
      position: [0, 0, 5.2]
    };
  }
  if (w <= 768 || h <= 768) {
    return {
      fov: 50,
      position: [0, 0, 5.1]
    };
  }

  return {
    fov: 40,
    position: [0, 0, 5],
    fog: false
  };
};

// Create WebGL Camera
const camera = getCameraSettings();

// Configure the root, inject events optionally, set camera, etc
root.configure({
  events,
  linear: true,
  camera: camera,
  gl: new THREE.WebGLRenderer({
    canvas: $canvas,
    antialias: true,
    depth: true,
    alpha: true,
    powerPreference: 'low-power',
    precision: 'lowp'
  }),
  size: {
    width: window.innerWidth,
    height: window.innerHeight
  }
});

// createRoot by design is not responsive, you have to take care of resize yourself
window.addEventListener('resize', () => {
  const camera = getCameraSettings();

  root.configure({
    camera: camera,
    size: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  });
});

// Render entry point
root.render(<App />);
