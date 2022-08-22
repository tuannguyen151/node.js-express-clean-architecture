import authService from '../../../services/auth.service'
import config from '../../../../config'

const { middleware: middlewareError } = config.errorMessages.auth

const handleResponseError = (res, type, message) => {
  res.set('Content-Type', 'application/json')
  res.type('json')
  const body = {
    success: false,
    code: 401,
    error: {
      type,
      description: message
    }
  }

  return res.status(401).send(body)
}

export default async function authMiddleware(req, res, next) {
  const token = req.header('Authorization')

  if (!token)
    return handleResponseError(
      res,
      'TOKEN_NOT_FOUND',
      middlewareError.tokenNotFound
    )

  if (token.split(' ')[0] !== 'Bearer')
    return handleResponseError(
      res,
      'INVALID_TOKEN_FORMAT',
      middlewareError.tokenInvalidFormat
    )

  try {
    const decoded = authService.verify(token.split(' ')[1])
    req.user = decoded.admin

    return next()
  } catch (err) {
    if (err.name === 'TokenExpiredError')
      return handleResponseError(
        res,
        'TOKEN_EXPIRED',
        middlewareError.tokenExpired
      )

    return handleResponseError(
      res,
      'TOKEN_INVALID',
      middlewareError.tokenInvalid
    )
  }
}
