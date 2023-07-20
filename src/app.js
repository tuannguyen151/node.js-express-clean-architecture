import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import createMicroserviceProxy from './create_microservice_proxy'

const corsOptions = {
  origin(origin, callback) {
    if (
      process.env.CORS_WHITELIST.split(' ').indexOf(origin) !== -1 ||
      (process.env.NODE_ENV !== 'production' && !origin)
    ) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const app = express()

app.use(morgan('common'))
app.use(cors(corsOptions))
app.use(helmet())
app.use(compression())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  })
)

createMicroserviceProxy(app)

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PATCH, DELETE'
  )

  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-type, Authorization, Cache-control, Pragma'
  )

  next()
})

export default app
