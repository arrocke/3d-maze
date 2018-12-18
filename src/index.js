import loop from './loop'

loop({
  selector: '#app',
  setup: ({ gl }) => {
    console.log('SETUP')
  },
  update: ({ gl, dt, state }) => {
    console.log('UPDATE: ', dt)
  },
  draw: ({ gl, state }) => {
    console.log('DRAW')
  },
  resize: ({ gl, state }) => {
    console.log('RESIZE')
  }
})