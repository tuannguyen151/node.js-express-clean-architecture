/* eslint-disable no-param-reassign */
import authService from '../../../services/auth.service'

export default (io) => {
  io.use(async (socket, next) => {
    const { token } = socket.handshake.auth

    if (!token) return next(new Error('TOKEN_NOT_FOUND'))

    try {
      const decoded = authService.verify(token)
      socket.user = decoded.user

      return next()
    } catch (err) {
      if (err.name === 'TokenExpiredError')
        return next(new Error('TOKEN_EXPIRED'))

      return next(new Error('TOKEN_INVALID'))
    }
  })
}
