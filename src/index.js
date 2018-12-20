import * as THREE from 'three'

const canvas = document.querySelector('canvas')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
document.body.appendChild(renderer.domElement)

// Ambient light
const light = new THREE.AmbientLight(0x404040)
scene.add(light)

// Daylight
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.y = 1
scene.add(directionalLight)

// Maze
const rows = 4
const cols = 4
const postWidth = 0.3
const postSpacing = 2
const wallHeight = 2
const wallLength = postSpacing - postWidth
const wallWidth = 0.1

const rowData = [
  true, true, false, false, true,
  true, true, false, false, true,
  true, true, false, false, true,
  true, false, true, false, true
]

const colData = [
  true, false, false, false, true,
  true, false, true, false, true,
  true, true, true, true, true,
  true, true, false, false, true
]

const mazeMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 })
const maze = new THREE.Group()
maze.rotation.y = 0.2
maze.rotation.x = 0.4

// Posts
const mazePost = new THREE.Mesh(
  new THREE.BoxGeometry(postWidth, wallHeight, postWidth),
  mazeMaterial
)
for (let i = 0; i <= rows; i++) {
  for (let j = 0; j <= cols; j++) {
    const post = mazePost.clone()
    post.position.set(postSpacing * i, 0, postSpacing * j)
    maze.add(post)
  }
}

// Walls
const mazeWallH = new THREE.Mesh(
  new THREE.BoxGeometry(wallLength, wallHeight, wallWidth),
  mazeMaterial
)
for (let i = 0; i < rows; i++) {
  for (let j = 0; j <= cols; j++) {
    if (colData[(cols + 1) * i + j]) {
      const wall = mazeWallH.clone()
      wall.position.set(1 + postSpacing * i, 0, postSpacing * j)
      maze.add(wall)
    }
  }
}

const mazeWallV = new THREE.Mesh(
  new THREE.BoxGeometry(wallWidth, wallHeight, wallLength),
  mazeMaterial
)
mazeWallV.updateMatrix()
for (let i = 0; i < cols; i++) {
  for (let j = 0; j <= rows; j++) {
    if (rowData[(rows + 1) * i + j]) {
      const wall = mazeWallH.clone()
      wall.rotation.y = Math.PI / 2
      wall.position.set(postSpacing * j, 0, 1 + postSpacing * i)
      maze.add(wall)
    }
  }
}

scene.add(maze)

camera.position.z = 15;

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()