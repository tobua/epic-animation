import { expect, test } from 'bun:test'
import { Animation, animate } from '../index'

test('Methods are available.', () => {
  expect(animate).toBeDefined()
  expect(Animation.Line).toBe(1)
})
