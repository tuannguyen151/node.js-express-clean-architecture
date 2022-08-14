import logger from '../../../logger'

export default (controller) => (req, res) => {
  const httpRequest = {
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip,
    method: req.method,
    path: req.path,
    user: req.user,
    logger: req.logger,
    files: req.files,
    file: req.file,
    source: {
      ip: req.ip,
      browser: req.get('User-Agent')
    },
    headers: {
      'Content-Type': req.get('Content-Type'),
      Referer: req.get('referer'),
      'User-Agent': req.get('User-Agent')
    }
  }

  controller(httpRequest)
    .then((data) => {
      res.set('Content-Type', 'application/json')
      res.type('json')
      const body = {
        success: true,
        code: 200,
        data
      }
      res.status(200).send(body)
    })
    .catch((e) => {
      const statusCode = e.statusCode || 500

      res.status(statusCode).send({
        success: false,
        code: statusCode,
        error: {
          type: e.type || 'SERVER_ERROR',
          description: e.message
        }
      })

      if (e.statusCode) logger.error(req, e)
    })
}
