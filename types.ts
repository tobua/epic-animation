export const Animation = {
  circle: 'c',
  line: 'l',
  show: 'show',
  hide: 'hide',
  blink: 'blink',
} as const

export type AnimationKey = (typeof Animation)[keyof typeof Animation]
