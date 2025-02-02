import { expect, test } from 'bun:test'
import { Animation, animate } from '../index'

test('Methods are available.', () => {
  expect(animate).toBeDefined()
  expect(Animation.line).toBe('l')
  expect(Animation.show).toBe('show')
})
