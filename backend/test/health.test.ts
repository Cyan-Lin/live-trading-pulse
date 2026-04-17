import { afterEach, describe, expect, it } from 'vitest'

import { buildApp } from '../src/app.js'

let app = buildApp()

afterEach(async () => {
  await app.close()
  app = buildApp()
})

describe('health route', () => {
  it('returns an ok status payload', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      status: 'ok',
    })
  })
})