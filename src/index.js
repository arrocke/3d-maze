import loop from './loop'
import shaderProgram from './shader-program'
import vertexSource from './shaders/default.vert'
import fragmentSource from './shaders/default.frag'

loop({
  selector: '#app',
  setup: ({ gl }) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    const program = shaderProgram(gl, vertexSource, fragmentSource)
    const positionAttrib = gl.getAttribLocation(program, 'position')
    const colorUniform = gl.getUniformLocation(program, 'color')

    const triangle = {
      vertices: new Float32Array([
        0.0, 0.0, -1.0,
        0.0, 0.5, -1.0,
        0.7, 0.0, -1.0
      ]),
      color: new Float32Array([
        1.0, 0.0, 0.0, 1.0
      ]),
      buffer: gl.createBuffer()
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, triangle.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, triangle.vertices, gl.STATIC_DRAW)

    return {
      triangle,
      program,
      attributes: {
        position: positionAttrib
      },
      uniforms: {
        color: colorUniform
      }
    }
  },
  update: ({ gl, dt, state }) => {
    state.triangle.color[0] = (state.triangle.color[0] + 0.005) % 1.0
    return state
  },
  draw: ({ gl, state }) => {
    gl.useProgram(state.program)
    gl.enableVertexAttribArray(state.attributes.position)
    gl.bindBuffer(gl.ARRAY_BUFFER, state.triangle.buffer)
    gl.vertexAttribPointer(state.attributes.position, 3, gl.FLOAT, false, 0, 0)
    gl.uniform4fv(state.uniforms.color, state.triangle.color)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    return state
  },
  resize: ({ gl, state }) => {
    return state
  }
})