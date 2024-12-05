<template>
  <div ref="canvasContainer" class="three-d-model"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect'

const canvasContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!canvasContainer.value) return

  const backgroundScene = new THREE.Scene()
  const modelScene = new THREE.Scene()
  backgroundScene.background = null
  modelScene.background = new THREE.Color(0x000000)

  const camera = new THREE.PerspectiveCamera(
    75,
    canvasContainer.value.clientWidth / canvasContainer.value.clientHeight,
    0.1,
    1000
  )
  camera.position.z = 3
  camera.position.y = 1

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })
  renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight)
  renderer.shadowMap.enabled = true
  renderer.domElement.style.position = 'absolute'
  canvasContainer.value.appendChild(renderer.domElement)

  const asciiRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })
  const effect = new AsciiEffect(asciiRenderer, ' .@x:й-=', { invert: true })
  effect.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight)
  effect.domElement.style.color = 'white'
  effect.domElement.style.backgroundColor = 'transparent'
  effect.domElement.style.position = 'absolute'
  effect.domElement.style.top = '0'
  effect.domElement.style.left = '0'
  effect.domElement.style.pointerEvents = 'none'
  canvasContainer.value.appendChild(effect.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(5, 5, 5)

  modelScene.add(ambientLight.clone())
  modelScene.add(directionalLight.clone())

  const loader = new GLTFLoader()

  loader.load(
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb',
    (gltf) => {
      const model = gltf.scene
      model.scale.set(0.48, 0.48, 0.48)
      model.position.set(-0.2, 0, 0)

      model.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          node.castShadow = true
          node.receiveShadow = true
        }
      })

      modelScene.add(model)

      const animate = () => {
        requestAnimationFrame(animate)

        model.rotation.y += 0.01

        controls.update()

        renderer.render(backgroundScene, camera)
        effect.render(modelScene, camera)
      }

      animate()
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
      console.error('An error happened:', error)
    }
  )

  const handleResize = () => {
    if (!canvasContainer.value) return

    camera.aspect = canvasContainer.value.clientWidth / canvasContainer.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight)
    effect.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight)
  }

  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<style scoped>
.three-d-model {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  margin-top: 68px;
  height: calc(100vh - 68px);
  z-index: -1;
  overflow: hidden;
}
</style>
