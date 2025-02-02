let lastFrameTime = performance.now()
let frameCount = 0

export const status = {
  fps: '60',
}

export function reportFps() {
  const currentTime = performance.now()
  frameCount++
  const elapsed = currentTime - lastFrameTime

  if (elapsed >= 300) {
    status.fps = ((frameCount * 1000) / elapsed).toFixed(1)
    lastFrameTime = currentTime
    frameCount = 0
  }
}
