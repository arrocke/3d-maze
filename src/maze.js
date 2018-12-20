import * as THREE from 'three'

const POST_WIDTH = 0.1
const POST_SPACING = 2
const HEIGHT = 2
const WALL_LENGTH = POST_SPACING - POST_WIDTH
const WALL_WIDTH = 0.1

const mazeMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 })

const postMesh = new THREE.Mesh(
  new THREE.BoxGeometry(POST_WIDTH, HEIGHT, POST_WIDTH),
  mazeMaterial
)
const wallMesh = new THREE.Mesh(
  new THREE.BoxGeometry(WALL_LENGTH, HEIGHT, WALL_WIDTH),
  mazeMaterial
)

export default class Maze {
  constructor (options) {
    this._config = options
    this._geometry = new THREE.Geometry()

    this._construct()

    this._mesh = new THREE.Mesh(
      this._geometry,
      mazeMaterial
    )

    this._mesh.rotation.x = 0.4
    this._mesh.rotation.y = 0.3

  }

  get object() {
    return this._mesh
  }

  _construct () {
        const x = 0 * POST_SPACING
        const y = 0 * POST_SPACING
        const d = POST_WIDTH / 2
        this._geometry.vertices.push(
          new THREE.Vector3(x - d, 0, y - d),
          new THREE.Vector3(x + d, 0, y - d),
          new THREE.Vector3(x + d, 0, y + d),
          new THREE.Vector3(x - d, 0, y + d),
          new THREE.Vector3(x - d, 1, y - d),
          new THREE.Vector3(x + d, 1, y - d),
          new THREE.Vector3(x + d, 1, y + d),
          new THREE.Vector3(x - d, 1, y + d)
        )
        const k = 0
        this._geometry.faces.push(
          // Bottom
          new THREE.Face3(k, k + 1, k + 2),
          new THREE.Face3(k, k + 2, k + 3),
          // Back
          new THREE.Face3(k + 4, k + 5, k + 1),
          new THREE.Face3(k + 5, k + 6, k + 1),
          // Right
          new THREE.Face3(k + 1, k + 5, k + 6),
          new THREE.Face3(k + 1, k + 6, k + 2),
          // Left
          new THREE.Face3(k, k + 7, k + 4),
          new THREE.Face3(k, k + 3, k + 7),
          // Top
          new THREE.Face3(k + 4, k + 6, k + 5),
          new THREE.Face3(k + 7, k + 6, k + 4),
          // Front
          new THREE.Face3(k + 2, k + 6, k + 7),
          new THREE.Face3(k + 3, k + 2, k + 7),
        )
    // const rows = this._config.rows
    // const cols = this._config.cols
    // for (let i = 0; i <= rows; i++) {
    //   for (let j = 0; j <= cols; j++) {
    //     const x = i * POST_SPACING
    //     const y = j * POST_SPACING
    //     const d = POST_WIDTH / 2
    //     this._geometry.vertices.push(
    //       new THREE.Vector3(x - d, 0, y - d),
    //       new THREE.Vector3(x + d, 0, y - d),
    //       new THREE.Vector3(x + d, 0, y + d),
    //       new THREE.Vector3(x - d, 0, y + d),
    //       new THREE.Vector3(x - d, 1, y - d),
    //       new THREE.Vector3(x + d, 1, y - d),
    //       new THREE.Vector3(x + d, 1, y + d),
    //       new THREE.Vector3(x - d, 1, y + d)
    //     )
    //     const k = i * (cols + 1) + j
    //     this._geometry.faces.push(
    //       new THREE.Face4(k, k + 1, k + 2, k + 3),
    //     )
    //   }
    // }
  }

  addPosts () {
    const rows = this._config.rows
    const cols = this._config.cols
    const group = this._group

    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= cols; j++) {
        const post = postMesh.clone()
        post.position.set(POST_SPACING * i, 0, POST_SPACING * j)
        group.add(post)
      }
    }
  }

  addWalls () {
    const rows = this._config.rows
    const cols = this._config.cols
    const rowData = this._config.rowData
    const colData = this._config.colData
    const group = this._group

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j <= cols; j++) {
        if (colData[i][j]) {
          const wall = wallMesh.clone()
          wall.position.set(1 + POST_SPACING * i, 0, POST_SPACING * j)
          group.add(wall)
        }
      }
    }
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j <= rows; j++) {
        if (rowData[i][j]) {
          const wall = wallMesh.clone()
          wall.rotation.y = Math.PI / 2
          wall.position.set(POST_SPACING * j, 0, 1 + POST_SPACING * i)
          group.add(wall)
        }
      }
    }
  }
}