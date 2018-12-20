import * as THREE from 'three'
import Maze from './maze'

const canvas = document.querySelector('canvas')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({ canvas })
const dpi = window.devicePixelRatio || 1
renderer.setSize(canvas.clientWidth * dpi, canvas.clientHeight * dpi, false)
document.body.appendChild(renderer.domElement)

// Ambient light
const light = new THREE.AmbientLight(0x404040)
scene.add(light)

// Daylight
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.y = 1
scene.add(directionalLight)

// Maze
const rows = 1
const cols = 1

const rowData = [
  [true, true, false, false, true],
  [true, true, false, false, true],
  [true, true, false, false, true],
  [true, false, true, false, true]
]

const colData = [
  [true, false, false, false, true],
  [true, false, true, false, true],
  [true, true, true, true, true],
  [true, true, false, false, true]
]

const maze = new Maze({
  rows,
  cols,
  rowData,
  colData
})

scene.add(maze.object)

const center = new THREE.Mesh(
  new THREE.SphereGeometry(.4),
  new THREE.MeshPhongMaterial({ color: 0x00FF00 })
)
//scene.add(center)

camera.position.z = 2

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()