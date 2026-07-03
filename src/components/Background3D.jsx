import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Starfield({ count = 900 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 70
      arr[i + 1] = (Math.random() - 0.5) * 45
      arr[i + 2] = (Math.random() - 0.5) * 50 - 5
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.008
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.055} transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function TorusKnot() {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.x = t * 0.12
    ref.current.rotation.y = t * 0.18
  })
  return (
    <mesh ref={ref} position={[6.5, 0.5, -4]}>
      <torusKnotGeometry args={[3.2, 0.9, 180, 26]} />
      <meshStandardMaterial color="#0a0a0a" emissive="#3a3a3a" metalness={0.85} roughness={0.25} wireframe />
    </mesh>
  )
}

function FloatingShapes({ count = 14 }) {
  const group = useRef()
  const shapes = useMemo(() => {
    const geos = ['icosahedron', 'octahedron', 'tetrahedron', 'torus', 'dodecahedron']
    return Array.from({ length: count }, (_, i) => ({
      geo: geos[i % geos.length],
      position: [(Math.random() - 0.5) * 34, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 16 - 4],
      rotSpeed: { x: (Math.random() - 0.5) * 0.7, y: (Math.random() - 0.5) * 0.7 },
      floatSpeed: 0.3 + Math.random() * 0.7,
      floatAmp: 0.4 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
      light: i % 2 === 0,
    }))
  }, [count])

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime()
    group.current.children.forEach((mesh, i) => {
      const s = shapes[i]
      mesh.rotation.x += s.rotSpeed.x * delta
      mesh.rotation.y += s.rotSpeed.y * delta
      mesh.position.y = s.position[1] + Math.sin(t * s.floatSpeed + s.phase) * s.floatAmp
    })
  })

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.position}>
          {s.geo === 'icosahedron' && <icosahedronGeometry args={[0.9, 0]} />}
          {s.geo === 'octahedron' && <octahedronGeometry args={[0.8, 0]} />}
          {s.geo === 'tetrahedron' && <tetrahedronGeometry args={[0.9, 0]} />}
          {s.geo === 'torus' && <torusGeometry args={[0.7, 0.26, 14, 40]} />}
          {s.geo === 'dodecahedron' && <dodecahedronGeometry args={[0.8, 0]} />}
          <meshPhysicalMaterial
            color={s.light ? '#e5e5e5' : '#8a8a8a'}
            emissive={s.light ? '#2e2e2e' : '#161616'}
            metalness={0.4}
            roughness={0.1}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 })
  const scroll = useRef(0)

  useMemo(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('mousemove', (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    })
    window.addEventListener('scroll', () => { scroll.current = window.scrollY }, { passive: true })
  }, [])

  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x * 1.6 - camera.position.x) * 0.04
    camera.position.y += (-mouse.current.y * 1.2 - scroll.current * 0.0022 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Background3D() {
  return (
    <div className="bg-canvas-wrap">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <fogExp2 attach="fog" args={['#050505', 0.035]} />
        <pointLight color="#ffffff" intensity={50} distance={60} position={[-8, 6, 4]} />
        <pointLight color="#bfbfbf" intensity={40} distance={60} position={[9, -5, 6]} />
        <ambientLight intensity={0.12} />
        <Starfield />
        <TorusKnot />
        <FloatingShapes />
        <CameraRig />
      </Canvas>
    </div>
  )
}
