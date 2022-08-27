/* eslint-disable node/no-unsupported-features/es-syntax */

import * as fs from 'fs'
import authIoMiddleware from '../../io-middlewares/v1/auth.io-middleware'

export default function initPublicIoNamespace(io) {
  fs.readdirSync(new URL('./', import.meta.url)).forEach(async (fileName) => {
    if (fileName !== 'index' && fileName.includes('.io-route')) {
      const { default: gateway } = await import(
        new URL(fileName, import.meta.url)
      )

      authIoMiddleware(gateway(io))
    }
  })
}
