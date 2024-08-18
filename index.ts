import { Animation } from './types'

export { Animation }

type RunningAnimation = {
  duration: number | 'infinite'
  nextValue: (value: number) => number
  value: number
  direction: number
  property: keyof CSSStyleDeclaration
  element: HTMLElement
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
  for (const animation of animations) {
    const currentValue = animation.value
    const newValue = animation.nextValue(frame)
    // biome-ignore lint/suspicious/noExplicitAny: Temporary workaround.
    animation.element.style[animation.property as any] = `${newValue}px`
    animation.value = currentValue

    // TODO remove animation if finished.
  }

  if (animations.size !== 0) {
    requestAnimationFrame(animateFrame)
  }
}

export function animate(element: HTMLElement, animation: Animation) {
  if (animation === Animation.Circle) {
    animations.add({
      duration: 'infinite',
      value: 0,
      nextValue: (frame) => {
        const angle = (frame * 0.002) % (2 * Math.PI) // 360 deg
        return 100 + 50 * Math.cos(angle)
      },
      direction: 0.01,
      property: 'top',
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
      element,
    })
  }

  startAnimations()
}
