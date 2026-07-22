import { useEffect, useRef } from 'react'
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import * as THREE from 'three'
import { sectionPadding, sectionHeaderGap, eyebrowStyles } from '../styles/section'

function PyramidCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0.6, 5.2)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    const geometry = new THREE.ConeGeometry(1.3, 1.9, 4)
    const material = new THREE.MeshStandardMaterial({
      color: 0x1d2731,
      metalness: 0.25,
      roughness: 0.55,
      flatShading: true,
    })
    const mesh = new THREE.Mesh(geometry, material)

    const edgeGeometry = new THREE.EdgesGeometry(geometry)
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x4fb894 })
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial)

    group.add(mesh)
    group.add(edges)
    group.rotation.y = Math.PI / 4
    group.rotation.x = 0.12
    scene.add(group)

    scene.add(new THREE.AmbientLight(0xffffff, 0.45))

    const keyLight = new THREE.DirectionalLight(0x9be2ca, 1.5)
    keyLight.position.set(3, 4, 2)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0x4fb894, 0.7)
    rimLight.position.set(-3, -1, -2)
    scene.add(rimLight)

    const resize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      if (width === 0 || height === 0) return
      renderer.setSize(width, height)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    resize()

    const observer = new ResizeObserver(resize)
    observer.observe(mount)

    let dragging = false
    let lastX = 0
    let lastY = 0
    let velocityX = 0.004
    let velocityY = 0

    const onPointerDown = (event: PointerEvent) => {
      dragging = true
      lastX = event.clientX
      lastY = event.clientY
      mount.style.cursor = 'grabbing'
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return
      const deltaX = event.clientX - lastX
      const deltaY = event.clientY - lastY
      lastX = event.clientX
      lastY = event.clientY
      velocityX = deltaX * 0.005
      velocityY = deltaY * 0.005
      group.rotation.y += velocityX
      group.rotation.x = Math.max(-0.9, Math.min(0.9, group.rotation.x + velocityY))
    }

    const onPointerUp = () => {
      dragging = false
      mount.style.cursor = 'grab'
    }

    mount.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let frameId = 0
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      if (!dragging) {
        velocityX += ((reducedMotion ? 0 : 0.004) - velocityX) * 0.03
        velocityY *= 0.92
        group.rotation.y += velocityX
        group.rotation.x = Math.max(-0.9, Math.min(0.9, group.rotation.x + velocityY))
        group.rotation.x += (0.12 - group.rotation.x) * 0.01
      }
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      mount.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      geometry.dispose()
      material.dispose()
      edgeGeometry.dispose()
      edgeMaterial.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <Box
      ref={mountRef}
      w="100%"
      h={{ base: '260px', md: '340px' }}
      cursor="grab"
      position="relative"
      overflow="hidden"
      style={{ touchAction: 'none' }}
    />
  )
}

export default function PyramidSection() {
  return (
    <Box
      bg="panelBg"
      borderTop="1px solid"
      borderColor="hairline"
      py={sectionPadding}
      w="100%"
    >
      <Container maxW="container.md">
        <VStack gap={sectionHeaderGap} mb={8} textAlign="center">
          <Text {...eyebrowStyles}>Drag it</Text>
          <Heading
            fontSize={{ base: '2xl', md: '4xl' }}
            letterSpacing="0.12em"
            color="textPrimary"
          >
            THE MONOLITH
          </Heading>
          <Text color="textMuted" fontSize="md" maxW="480px" lineHeight="1.8">
            Whatever they built, they built it to last.
          </Text>
        </VStack>

        <Box
          border="1px solid"
          borderColor="hairline"
          borderRadius="sm"
          bg="panelBgAlt"
          overflow="hidden"
        >
          <PyramidCanvas />
        </Box>
      </Container>
    </Box>
  )
}