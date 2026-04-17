import Fastify, { type FastifyInstance } from 'fastify'

import { registerHealthRoutes } from './modules/health/index.js'

export const buildApp = (): FastifyInstance => {
  const app = Fastify()

  app.register(registerHealthRoutes)

  return app
}