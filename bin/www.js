/* eslint-disable no-console */
/* eslint-disable import/extensions */

import 'dotenv/config'
import { exit } from 'process'
import app from '../src/app.js'

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
  console.log(`Webserver is ready and listening on port ${PORT}`)
})

// shut down server
function shutdown() {
  server.close((err) => {
    if (err) {
      console.error(err)
      process.exitCode = 1
    }
    exit()
  })
}

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', () => {
  console.info(
    'Got SIGINT (aka ctrl-c in docker). Graceful shutdown ',
    new Date().toISOString()
  )
  shutdown()
})

// quit properly on docker stop
process.on('SIGTERM', () => {
  console.info(
    'Got SIGTERM (docker container stop). Graceful shutdown ',
    new Date().toISOString()
  )
  shutdown()
})
