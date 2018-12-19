const createShader = (gl, type, source) => {
  // Compile the shader.
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  // Check if shader compiled succeeded.
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(`Could not compile shader: \n\n${info}`)
  } else {
    return shader
  }
}

export const create = (gl, vertexSource, fragmentSource) => {
  // Create and link program with two shaders.
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  // Check if linking succeeded.
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program)
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    gl.deleteProgram(program)
    throw new Error(`Could not link shader program: \n\n${info}`)
  } else {
    return program
  }
}

export const setAttribute = (gl, program, attribute, data) => {
  const attrib = gl.getAttributeLocation(program, attribute)
  
}