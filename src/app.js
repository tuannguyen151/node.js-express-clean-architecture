import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'

import router from './routes/v1'

const app = express()

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
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )

  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-type, Authorization, Cache-control, Pragma'
  )

  next()
})
app.use(morgan('common'))

app.use('/api/v1', router)

export default app
