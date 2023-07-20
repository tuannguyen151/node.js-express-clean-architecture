import { rateLimit } from 'express-rate-limit'
import { createProxyMiddleware } from 'http-proxy-middleware'

import CONFIG from './config'

const { MICROSERVICES } = CONFIG

export default function createMicroserviceProxy(app, apiPrefix = '/api/v1') {
  MICROSERVICES.forEach((route) => {
    const { name, auth, rateLimit: rateLimitPassedOptions, proxy } = route

    const middlewares = []

    // Add authentication middleware if required
    if (auth) {
      middlewares.push((req, res, next) => {
        // Your authentication logic goes here
        // Example: Check if the request contains a valid JWT token
        const token = req.headers.authorization
        if (!token) {
          return res
            .status(401)
            .json({ error: 'Unauthorized: Missing authentication token' })
        }
        // TODO: Your authentication logic here... (maybe get user from users microservice)
        // TODO: Remove this mock user
        const user = {
          id: 1,
          name: 'John Doe',
          role: 'admin'
        }

        // send user to request headers for microservices
        req.headers.user = JSON.stringify(user)

        return next()
      })
    }

    // Add rate limiting middleware if required
    if (rateLimitPassedOptions) {
      middlewares.push(rateLimit(rateLimitPassedOptions))
    }

    // Create the proxy middleware
    const proxyMiddleware = createProxyMiddleware(proxy)

    // Mount the proxy middleware to the corresponding URL with optional middlewares
    app.use(apiPrefix + name, ...middlewares, proxyMiddleware)
  })
}
