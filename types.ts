export const Animation = {
  circle: 'c',
  line: 'l',
  show: 'show',
  hide: 'hide',
} as const

export type AnimationKey = (typeof Animation)[keyof typeof Animation]
