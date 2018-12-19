export default ({ selector, setup, update, draw, resize }) => {
  // Get WebGL context.
  const canvas = document.querySelector(selector)
  const gl = canvas.getContext('webgl')

  if (!gl) {
    throw new Error('WebGL not supported')
  }

  let state = setup({ gl })
  let t = 0

  const doResize = () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    gl.viewport(0, 0, canvas.width, canvas.height)

    state = resize({ gl, canvas, state })
  }
  doResize()

  const animate = (t1) => {
    // Calculate the change in time and save the current timestamp.
    const dt = t1 - t
    t = t1

    state = update({ gl, dt, state })

    // Resize the canvas to the screen size.
    if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
      doResize()
    }

    // Clear the canvas and redraw.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    state = draw({ gl, state }) 

    // Wait to render next frame.
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}
