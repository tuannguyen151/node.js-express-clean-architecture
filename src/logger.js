import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const { format } = winston
const { combine, timestamp, json } = format

const infoLogger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: 'info.log',
      dirname: 'logs/%DATE%',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '5m',
      maxFiles: '7d'
    })
  ],
  exitOnError: false
})

const errorLogger = winston.createLogger({
  level: 'error',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: 'error.log',
      dirname: 'logs/%DATE%',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '5m',
      maxFiles: '14d'
    })
  ],
  exitOnError: false
})

const debugLogger = winston.createLogger({
  level: 'debug',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      level: 'debug',
      filename: 'debug.log',
      dirname: 'logs/%DATE%',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '5m',
      maxFiles: '7d'
    })
  ],
  exitOnError: false
})

const parsingHttpRequest = (req) => {
  // Exclude emal, password
  const { email, password, ...bodyLog } = req.body

  const filesLog = []
  req?.files?.forEach((file) => {
    const { buffer, ...fileExclude } = file
    filesLog.push(fileExclude)
  })

  let fileLog = null
  if (req.file) {
    const { buffer, ...file } = req.file
    fileLog = file
  }

  const logRequest = {
    body: bodyLog,
    query: req.query,
    params: req.params,
    ip: req.ip,
    method: req.method,
    path: req.path,
    user: req.user,
    logger: req.logger,
    source: {
      ip: req.ip,
      browser: req.get('User-Agent')
    },
    headers: {
      'Content-Type': req.get('Content-Type'),
      Referer: req.get('referer')
    }
  }

  if (fileLog) {
    logRequest.file = fileLog
  }

  if (filesLog.length) {
    logRequest.files = filesLog
  }

  return logRequest
}

export default {
  info: (request, info) => {
    infoLogger.info({ request: parsingHttpRequest(request), info })
  },
  error: (request, error) => {
    errorLogger.error({
      request: parsingHttpRequest(request),
      error: {
        message: error.message,
        stack: error.stack
      }
    })
  },
  debug: (request, debug) => {
    debugLogger.debug({ request: parsingHttpRequest(request), debug })
  }
}
