import * as THREE from 'three';
import { useMemo, useState, useRef, useEffect } from 'react';
import { createPortal, useFrame } from '@react-three/fiber';
import { useFBO } from '@react-three/drei';

import './shaders/simulationMaterial';
import './shaders/dofPointsMaterial';

export function Particles({ speed, fov, aperture, focus, curl, color, size = 512, ...props }) {
  const simRef = useRef();
  const renderRef = useRef();
  const ref = useRef();
  // Set up FBO
  const [scene] = useState(() => new THREE.Scene());
  const [camera] = useState(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1));
  const [positions] = useState(() => new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]));
  const [uvs] = useState(() => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]));
  const target = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType
  });

  // Normalize points
  const particles = useMemo(() => {
    const length = size * size;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      let i3 = i * 3;
      particles[i3 + 0] = (i % size) / size;
      particles[i3 + 1] = i / size / size;
    }
    return particles;
  }, [size]);

  // Listen for Color Change
  const [colorChanged, setColorChanged] = useState(false);
  useEffect(() => {
    setColorChanged(true);
  }, [color]);

  // Update FBO and pointcloud every frame
  useFrame((state) => {
    state.gl.setRenderTarget(target);
    state.gl.clear();
    state.gl.render(scene, camera);
    state.gl.setRenderTarget(null);

    // Move the ball up and down
    const t = state.clock.getElapsedTime();
    ref.current.position.x = Math.sin(t / props.p.x.a) / props.p.x.b;
    ref.current.position.y = 0.1 + (1 + Math.sin(t / props.p.y.a)) / props.p.y.b;
    ref.current.position.z = Math.cos(t / props.p.z.a) / props.p.z.b;
    ref.current.rotation.x = Math.cos(t / props.r.x.a) / props.r.x.b;
    ref.current.rotation.y = Math.sin(t / props.r.y.a) / props.r.y.b;
    ref.current.rotation.z = Math.cos(t / props.r.z.a) / props.r.z.b;

    renderRef.current.blending = props.blending; // Set Blending
    renderRef.current.uniforms.positions.value = target.texture;
    renderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    renderRef.current.uniforms.uFocus.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uFocus.value, focus, 0.1);
    renderRef.current.uniforms.uFov.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uFov.value, fov, 0.1);
    renderRef.current.uniforms.uBlur.value = THREE.MathUtils.lerp(renderRef.current.uniforms.uBlur.value, (5.6 - aperture) * 9, 0.1);

    if (colorChanged) {
      setColorChanged(false);
      const colors = new THREE.Color(color.r / 255, color.g / 255, color.b / 255);
      renderRef.current.fragmentShader = `uniform float uOpacity;
      varying float vDistance;
      void main() {
        vec2 cxy = 2.0 * gl_PointCoord - 1.0;
        if (dot(cxy, cxy) > 1.0) discard;
        gl_FragColor = vec4(${colors.r}, ${colors.g}, ${colors.b}, (1.04 - clamp(vDistance * 1.5, 0.25, 1.0)));
      }`;
      renderRef.current.needsUpdate = true;
    }

    simRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed;
    simRef.current.uniforms.uCurlFreq.value = THREE.MathUtils.lerp(simRef.current.uniforms.uCurlFreq.value, curl, 0.1);
  });
  return (
    <>
      {/* Simulation goes into a FBO/Off-buffer */}
      {createPortal(
        <mesh>
          <simulationMaterial ref={simRef} />
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
            <bufferAttribute attach="attributes-uv" count={uvs.length / 2} array={uvs} itemSize={2} />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      {/* The result of which is forwarded into a pointcloud via data-texture */}
      <group ref={ref} dispose={null}>
        <points {...props}>
          <dofPointsMaterial ref={renderRef} />
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
          </bufferGeometry>
        </points>
      </group>
    </>
  );
}
