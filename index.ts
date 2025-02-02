import { reportFps, status } from './performance'
import { Animation, type AnimationKey } from './types'

export { Animation, status }

type RunningAnimation = {
  duration: number | 'infinite'
  nextValue: (frame: number, value: number) => number
  value: number
  direction: number
  property: keyof CSSStyleDeclaration
  element: HTMLElement
  size: Size
}

type Size = 'pixel' | 'number'

function formatSize(value: number, size: Size) {
  if (size === 'number') {
    return String(value.toFixed(4))
  }

  return `${value}px`
}

const animations = new Set<RunningAnimation>()

let isAnimating = false

function startAnimations() {
  if (!isAnimating) {
    isAnimating = true
    requestAnimationFrame(animateFrame)
  }
}

function animateFrame(frame: number) {
  reportFps()
  for (const animation of animations) {
    const currentValue = animation.value
    const newValue = animation.nextValue(frame, currentValue)
    // biome-ignore lint/suspicious/noExplicitAny: Temporary workaround.
    animation.element.style[animation.property as any] = formatSize(newValue, animation.size)
    animation.value = newValue

    if (typeof animation.duration === 'number') {
      animation.duration -= 1

      if (animation.duration < 0) {
        animations.delete(animation)
      }
    }
  }

  if (animations.size > 0) {
    requestAnimationFrame(animateFrame)
  }
}

export function animate(element: HTMLElement, animation: AnimationKey) {
  if (animation === Animation.circle) {
    animations.add({
      duration: 'infinite',
      value: 0,
      nextValue: (frame) => {
        const angle = (frame * 0.002) % (2 * Math.PI) // 360 deg
        return 100 + 50 * Math.cos(angle)
      },
      direction: 0.01,
      property: 'top',
      size: 'pixel',
      element,
    })
    animations.add({
      duration: 'infinite',
      value: 0,
      nextValue: (frame) => {
        const angle = (frame * 0.002) % (2 * Math.PI) // 360 deg
        return 100 + 50 * Math.sin(angle)
      },
      direction: 0.01,
      property: 'left',
      size: 'pixel',
      element,
    })
  }

  if (animation === Animation.show) {
    animations.add({
      duration: 60,
      value: 0,
      nextValue: (_frame, value) => value + 1 / 60,
      direction: 0.01,
      property: 'opacity',
      size: 'number',
      element,
    })
  }

  if (animation === Animation.hide) {
    animations.add({
      duration: 60,
      value: 1,
      nextValue: (_frame, value) => value - 1 / 60,
      direction: 0.01,
      property: 'opacity',
      size: 'number',
      element,
    })
  }

  if (animation === Animation.blink) {
    animations.add({
      duration: 'infinite',
      value: 1,
      nextValue: (frame) => {
        const oscillation = Math.sin(frame * (Math.PI / 500)) // 500ms is half the duration.
        return (oscillation + 1) / 2
      },
      direction: 0.01,
      property: 'opacity',
      size: 'number',
      element,
    })
  }

  startAnimations()
}
