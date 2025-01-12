import * as THREE from 'three'
import { createRoot, events, extend } from '@react-three/fiber'
import './styles.css'
import App from './App'

extend(THREE)

// Create a react root
const $canvas = document.querySelector('#ai-bot')
const root = createRoot($canvas)

// Configure the root, inject events optionally, set camera, etc
root.configure({ 
  events,
  linear: true,
  camera: { fov: 35, position: [0, 0, 5] },
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
    size: { 
      width: window.innerWidth, 
      height: window.innerHeight,
    }
  })
})

// Trigger resize
window.dispatchEvent(new Event('resize'))

// Render entry point
root.render(<App />)

window.dispatchEvent(new Event('resize'))
