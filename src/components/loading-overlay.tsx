"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface LoadingOverlayProps {
  isLoading?: boolean
}

export function LoadingOverlay({ isLoading = true }: LoadingOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    controls: OrbitControls
    cleanup: () => void
  }>()

  useEffect(() => {
    if (!containerRef.current || !isLoading) return

    const container = containerRef.current
    
    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0xffffff, 0.01)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: "high-performance",
      alpha: true
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0xffffff, 0)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5
    controls.minDistance = 10
    controls.maxDistance = 30
    controls.enableZoom = false
    controls.enablePan = false

    camera.position.z = 15
    camera.position.y = 5
    controls.target.set(0, 0, 0)
    controls.update()

    // Shader setup
    const pointMaterialShader = {
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        varying float vDistance;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vDistance = -mvPosition.z;
          float pulse = sin(time * 2.0 + length(position)) * 0.15 + 1.0;
          vec3 pos = position;
          pos.x += sin(time + position.z * 0.5) * 0.05;
          pos.y += cos(time + position.x * 0.5) * 0.05;
          pos.z += sin(time + position.y * 0.5) * 0.05;
          mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z) * pulse;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vDistance;
        uniform float time;
        
        void main() {
          vec2 cxy = 2.0 * gl_PointCoord - 1.0;
          float r = dot(cxy, cxy);
          if (r > 1.0) discard;
          float glow = exp(-r * 2.5);
          float outerGlow = exp(-r * 1.5) * 0.3;
          vec3 finalColor = vColor * (1.2 + sin(time * 0.5) * 0.1);
          finalColor += vec3(0.2, 0.4, 0.6) * outerGlow;
          float distanceFade = 1.0 - smoothstep(0.0, 50.0, vDistance);
          float intensity = mix(0.7, 1.0, distanceFade);
          gl_FragColor = vec4(finalColor * intensity, (glow + outerGlow) * distanceFade);
        }
      `
    }

    function createSpiralSphere(radius: number, particleCount: number, colors: THREE.Color[]) {
      const geometry = new THREE.BufferGeometry()
      const positions: number[] = []
      const particleColors: number[] = []
      const sizes: number[] = []
      
      for (let i = 0; i < particleCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / particleCount)
        const theta = Math.sqrt(particleCount * Math.PI) * phi
        const x = radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.sin(phi) * Math.sin(theta)
        const z = radius * Math.cos(phi)
        positions.push(x, y, z)
        
        const colorPos = i / particleCount
        const color1 = colors[Math.floor(colorPos * (colors.length - 1))]
        const color2 = colors[Math.ceil(colorPos * (colors.length - 1))]
        const mixRatio = (colorPos * (colors.length - 1)) % 1
        const finalColor = new THREE.Color().lerpColors(color1, color2, mixRatio)
        particleColors.push(finalColor.r, finalColor.g, finalColor.b)
        sizes.push(Math.random() * 0.15 + 0.08)
      }
      
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3))
      geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
      
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: pointMaterialShader.vertexShader,
        fragmentShader: pointMaterialShader.fragmentShader,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
      
      return new THREE.Points(geometry, material)
    }

    function createOrbitRings(radius: number, count: number, thickness: number) {
      const group = new THREE.Group()
      
      // Theme colors
      const themeColors = [
        new THREE.Color("#00ffff"), // cyan
        new THREE.Color("#4169e1"), // royal blue
        new THREE.Color("#0ea5e9"), // sky blue
        new THREE.Color("#3b82f6"), // blue
        new THREE.Color("#60a5fa")  // lighter blue
      ]
      
      for (let i = 0; i < count; i++) {
        const ringGeometry = new THREE.BufferGeometry()
        const positions: number[] = []
        const colors: number[] = []
        const sizes: number[] = []
        const particleCount = 3000
        
        for (let j = 0; j < particleCount; j++) {
          const angle = (j / particleCount) * Math.PI * 2
          const radiusVariation = radius + (Math.random() - 0.5) * thickness
          const x = Math.cos(angle) * radiusVariation
          const y = (Math.random() - 0.5) * thickness
          const z = Math.sin(angle) * radiusVariation
          positions.push(x, y, z)
          
          // Use theme colors for a more cohesive look
          const colorIndex = Math.floor((i / count) * themeColors.length)
          const nextColorIndex = (colorIndex + 1) % themeColors.length
          const mixRatio = (i / count) * themeColors.length - colorIndex
          const color = new THREE.Color()
          color.lerpColors(themeColors[colorIndex], themeColors[nextColorIndex], mixRatio)
          color.multiplyScalar(1.2) // Make it slightly brighter
          
          colors.push(color.r, color.g, color.b)
          sizes.push(Math.random() * 0.12 + 0.06)
        }
        
        ringGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        ringGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
        ringGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
        
        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 }
          },
          vertexShader: pointMaterialShader.vertexShader,
          fragmentShader: pointMaterialShader.fragmentShader,
          vertexColors: true,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        })
        
        const ring = new THREE.Points(ringGeometry, material)
        ring.rotation.x = Math.random() * Math.PI
        ring.rotation.y = Math.random() * Math.PI
        group.add(ring)
      }
      
      return group
    }

    const sphereColors = [
      new THREE.Color(0x00ffff).multiplyScalar(1.2),
      new THREE.Color(0xff1493).multiplyScalar(1.1),
      new THREE.Color(0x4169e1).multiplyScalar(1.2),
      new THREE.Color(0xff69b4).multiplyScalar(1.1),
      new THREE.Color(0x00bfff).multiplyScalar(1.2)
    ]

    // Remove sphere creation and only create rings with smaller radius
    const orbitRings = createOrbitRings(4.2, 6, 0.3)

    const mainGroup = new THREE.Group()
    mainGroup.scale.set(1.0, 1.0, 1.0) // Slightly reduce overall scale
    mainGroup.add(orbitRings)
    scene.add(mainGroup)

    let time = 0
    let animationFrameId: number

    function animate() {
      animationFrameId = requestAnimationFrame(animate)
      time += 0.005

      orbitRings.children.forEach((ring) => {
        if (ring instanceof THREE.Points) {
          ;(ring.material as THREE.ShaderMaterial).uniforms.time.value = time
        }
      })

      orbitRings.children.forEach((ring, index) => {
        if (ring instanceof THREE.Points) {
          const dynamicSpeed = 0.003 * (Math.sin(time * 0.2) + 2.0) * (index + 1)
          ring.rotation.z += dynamicSpeed
          ring.rotation.x += dynamicSpeed * 0.8
          ring.rotation.y += dynamicSpeed * 0.6

          // Fast pulse with smaller scale range
          const pulsePhase = time * 6 + index * 0.8
          const pulseScale = 1 + Math.sin(pulsePhase) * 0.35
          ring.scale.set(pulseScale, pulseScale, pulseScale)
        }
      })

      controls.update()
      renderer.render(scene, camera)
    }

    function handleResize() {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)
    animate()

    // Store scene references for cleanup
    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      cleanup: () => {
        window.removeEventListener('resize', handleResize)
        cancelAnimationFrame(animationFrameId)
        renderer.dispose()
        container.removeChild(renderer.domElement)
      }
    }

    return () => {
      if (sceneRef.current) {
        sceneRef.current.cleanup()
      }
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div 
        ref={containerRef} 
        className="h-screen w-screen"
      />
    </div>
  )
} 