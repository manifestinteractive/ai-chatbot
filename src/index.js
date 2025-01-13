import * as THREE from 'three'
import { createRoot, events, extend } from '@react-three/fiber'
import './styles.css'
import App from './App'
import reportWebVitals from './reportWebVitals';

extend(THREE)

// Create a react root
const $canvas = document.querySelector('#ai-bot')
const root = createRoot($canvas)

const getFOV = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  if (w <= 320 || h <= 320) {
    return 75
  } if (w <= 468 || h <= 468) {
    return 60
  } if (w <= 768 || h <= 768) {
    return 45
  }

  return 40
}

// Configure the root, inject events optionally, set camera, etc
root.configure({ 
  events,
  linear: true,
  camera: { fov: getFOV(), position: [0, 0, 5] },
  gl: new THREE.WebGL1Renderer({
    canvas: $canvas,
    antialias: true,
    alpha: true
  }),
  size: { 
    width: window.innerWidth, 
    height: window.innerHeight,
  }
})

// createRoot by design is not responsive, you have to take care of resize yourself
window.addEventListener('resize', () => {
  root.configure({ 
    camera: { fov: getFOV(), position: [0, 0, 5] },
    size: { 
      width: window.innerWidth, 
      height: window.innerHeight,
    }
  })
})

// Render entry point
root.render(<App />)

reportWebVitals(console.log);