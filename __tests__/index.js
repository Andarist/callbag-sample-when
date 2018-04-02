import forEach from 'callbag-for-each'
import pipe from 'callbag-pipe'
import subject from 'callbag-subject'

import sampleWhen from '../src'

test('works', () => {
  const actual = []
  let next

  const source = subject()
  const sampler = subject()

  pipe(
    source,
    sampleWhen(sampler),
    forEach(data => {
      actual.push(data)
    }),
  )

  return Promise.resolve()
    .then(() => sampler(1, 0))
    .then(() => sampler(1, 1))
    .then(() => sampler(1, 2))
    .then(() => {
      expect(actual).toEqual([])
    })
    .then(() => source(1, 0))
    .then(() => source(1, 1))
    .then(() => source(1, 2))
    .then(() => {
      expect(actual).toEqual([])
    })
    .then(() => sampler(1, 3))
    .then(() => {
      expect(actual).toEqual([2])
    })
    .then(() => sampler(1, 4))
    .then(() => sampler(1, 5))
    .then(() => {
      expect(actual).toEqual([2, 2, 2])
    })
    .then(() => source(1, 3))
    .then(() => source(1, 4))
    .then(() => sampler(1, 6))
    .then(() => {
      expect(actual).toEqual([2, 2, 2, 4])
    })
    .then(() => source(1, 5))
    .then(() => sampler(1, 7))
    .then(() => {
      expect(actual).toEqual([2, 2, 2, 4, 5])
    })
})
