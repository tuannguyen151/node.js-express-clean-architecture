/* eslint-disable no-console */
/* eslint-disable import/extensions */

import 'dotenv/config'
import { exit } from 'process'
import app from '../src/app.js'

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
  console.log(`Webserver is ready and listening on port ${PORT}`)
})

const sockets = []
let nextSocketId = 0
server.on('connection', (socket) => {
  const socketId = nextSocketId

  sockets[socketId] = socket

  socket.once('close', () => {
    delete sockets[socketId]
  })

  nextSocketId += 1
})

const waitForSocketsToClose = (counter) => {
  if (counter > 0) {
    console.log(
      `Waiting ${counter} more ${
        counter !== 1 ? 'seconds' : 'second'
      } for all connections to close...`
    )
    return setTimeout(waitForSocketsToClose, 1000, counter - 1)
  }

  console.log('Forcing all connections to close now')
  sockets.forEach((socket) => {
    socket.destroy()
  })

  return false
}

// shut down server
function shutdown() {
  waitForSocketsToClose(10)

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
